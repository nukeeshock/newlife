import crypto from "crypto";

// ============================================
// ANALYTICS UTILITIES
// ============================================

// ============================================
// SICHERHEIT: ANALYTICS_SALT MUSS gesetzt sein!
// ============================================
const ANALYTICS_SALT = process.env.ANALYTICS_SALT;
if (!ANALYTICS_SALT && process.env.NODE_ENV === "production") {
  console.error(
    "❌ FATAL: ANALYTICS_SALT nicht gesetzt!\n" +
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
// SESSION DEDUPLICATION
// ⚠️ WARNUNG: In-Memory Cache funktioniert NICHT auf Vercel Serverless!
// Für Produktion: Redis/Upstash verwenden!
// ============================================

// Warnung beim Start loggen
if (process.env.NODE_ENV === "production" && !process.env.REDIS_URL) {
  console.warn(
    "⚠️ [ANALYTICS] Session-Deduplication auf Serverless nicht zuverlässig! " +
    "Für Produktion Redis/Upstash empfohlen."
  );
}

// In-Memory Cache für Session-Deduplication
const sessionCache = new Map<string, { sessionId: string; expiresAt: number }>();

const SESSION_DEDUP_WINDOW = 30 * 60 * 1000; // 30 Minuten

// Cleanup alle 5 Minuten
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of sessionCache.entries()) {
    if (entry.expiresAt < now) {
      sessionCache.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Prüft ob bereits eine Session für diesen Fingerprint existiert
 */
export function getExistingSession(fingerprint: string): string | null {
  const cached = sessionCache.get(fingerprint);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.sessionId;
  }
  return null;
}

/**
 * Session im Cache speichern
 */
export function cacheSession(fingerprint: string, sessionId: string): void {
  sessionCache.set(fingerprint, {
    sessionId,
    expiresAt: Date.now() + SESSION_DEDUP_WINDOW,
  });
}

/**
 * Session aus Cache entfernen (bei Session-Ende)
 */
export function removeSessionFromCache(fingerprint: string): void {
  sessionCache.delete(fingerprint);
}

