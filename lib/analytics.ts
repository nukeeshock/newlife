import crypto from "crypto";
import { redis } from "@/lib/rate-limit";

// ============================================
// ANALYTICS UTILITIES
// ============================================

// ============================================
// SICHERHEIT: ANALYTICS_SALT MUSS gesetzt sein!
// ============================================
const ANALYTICS_SALT = process.env.ANALYTICS_SALT;
if (!ANALYTICS_SALT && process.env.NODE_ENV === "production") {
  console.error(
    "FATAL: ANALYTICS_SALT nicht gesetzt!\n" +
    "Füge ANALYTICS_SALT zu deiner .env Datei hinzu (min. 32 Zeichen)."
  );
}
// Statischer Fallback für Development (deterministisch!)
const FALLBACK_SALT = "nlv-dev-analytics-salt-do-not-use-in-prod";

/**
 * IP-Adresse hashen für DSGVO-Konformität
 */
export function hashIP(ip: string): string {
  const salt = ANALYTICS_SALT || FALLBACK_SALT;
  return crypto
    .createHash("sha256")
    .update(ip + salt)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Session-Fingerprint für Deduplication
 * Kombiniert IP-Hash + User-Agent-Hash
 */
export function createSessionFingerprint(ipHash: string, userAgent: string | null): string {
  const uaHash = userAgent
    ? crypto.createHash("sha256").update(userAgent).digest("hex").slice(0, 8)
    : "unknown";
  return `${ipHash}:${uaHash}`;
}

// ============================================
// BOT DETECTION
// ============================================

const BOT_USER_AGENT_PATTERNS = [
  // Suchmaschinen
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /baiduspider/i,
  /slurp/i, // Yahoo

  // Social Media Crawlers
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /pinterestbot/i,
  /telegrambot/i,
  /whatsapp/i,

  // SEO & Monitoring Tools
  /semrushbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /uptimerobot/i,
  /pingdom/i,
  /statuscake/i,

  // Allgemeine Bot-Muster
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,

  // Curl, wget, etc.
  /curl/i,
  /wget/i,
  /httpie/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /go-http-client/i,

  // Leere oder verdächtige User-Agents
  /^$/,
  /^-$/,
  /^Mozilla\/5\.0$/,
];

/**
 * Prüft ob ein User-Agent von einem Bot stammt
 */
export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  if (userAgent.length < 10) return true;

  return BOT_USER_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

// ============================================
// SESSION DEDUPLICATION (REDIS-BASIERT!)
// Funktioniert zuverlässig auf Vercel Serverless!
// ============================================

const SESSION_DEDUP_WINDOW = 30 * 60 * 1000; // 30 Minuten
const SESSION_KEY_PREFIX = "analytics:session:";

interface SessionCacheEntry {
  sessionId: string;
}

/**
 * Prüft ob bereits eine Session für diesen Fingerprint existiert (async!)
 */
export async function getExistingSession(fingerprint: string): Promise<string | null> {
  try {
    const cached = await redis.get<SessionCacheEntry>(`${SESSION_KEY_PREFIX}${fingerprint}`);
    return cached?.sessionId || null;
  } catch (error) {
    console.warn("[ANALYTICS] Redis get error, assuming no existing session:", error);
    return null;
  }
}

/**
 * Session im Redis Cache speichern (async!)
 */
export async function cacheSession(fingerprint: string, sessionId: string): Promise<void> {
  try {
    await redis.set(
      `${SESSION_KEY_PREFIX}${fingerprint}`,
      { sessionId } as SessionCacheEntry,
      { px: SESSION_DEDUP_WINDOW }
    );
  } catch (error) {
    console.warn("[ANALYTICS] Redis set error:", error);
  }
}

/**
 * Session aus Cache entfernen (bei Session-Ende)
 */
export async function removeSessionFromCache(fingerprint: string): Promise<void> {
  try {
    await redis.del(`${SESSION_KEY_PREFIX}${fingerprint}`);
  } catch (error) {
    console.warn("[ANALYTICS] Redis del error:", error);
  }
}
