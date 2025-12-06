import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// ============================================
// UPSTASH REDIS RATE LIMITER (ATOMIC!)
// Verwendet @upstash/ratelimit SDK für atomare Operationen
// ============================================

// Redis-Instanz (Upstash REST API)
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Re-export redis for use in other modules (analytics session dedup)
export { redis };

interface RateLimitConfig {
  /** Maximale Anzahl an Requests */
  limit: number;
  /** Zeitfenster in Sekunden */
  windowSeconds: number;
  /** Prefix für den Key (z.B. "login", "analytics") */
  prefix: string;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

// Cache für Ratelimit-Instanzen (eine pro Prefix)
const ratelimiters = new Map<string, Ratelimit>();

/**
 * Ratelimit-Instanz für einen Config holen/erstellen
 */
function getRatelimiter(config: RateLimitConfig): Ratelimit {
  const key = `${config.prefix}:${config.limit}:${config.windowSeconds}`;

  let limiter = ratelimiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.limit, `${config.windowSeconds} s`),
      prefix: `ratelimit:${config.prefix}`,
      analytics: false, // Keine eigenen Analytics
    });
    ratelimiters.set(key, limiter);
  }

  return limiter;
}

// Vertrauenswürdige Proxies (Vercel, Cloudflare, etc.)
const TRUSTED_PROXIES = new Set<string>([
  // Vercel Edge Network und Cloudflare IPs können hier hinzugefügt werden
]);

/**
 * IP-Adresse aus Request extrahieren
 * SICHERHEIT: x-forwarded-for kann gespoofed werden!
 * Auf Vercel ist der letzte Wert (vor Vercel's IP) der echte Client.
 */
export function getClientIP(request: NextRequest): string {
  // Auf Vercel: Vercel setzt x-real-ip auf die echte Client-IP
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return sanitizeIP(realIP);
  }

  // x-forwarded-for: Liste von IPs, Client ist der erste NICHT-vertrauenswürdige
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    // Von rechts nach links durchgehen, erste nicht-vertrauenswürdige IP nehmen
    for (let i = ips.length - 1; i >= 0; i--) {
      const ip = sanitizeIP(ips[i]);
      if (!TRUSTED_PROXIES.has(ip) && isValidIP(ip)) {
        return ip;
      }
    }
    // Fallback: Erste IP
    return sanitizeIP(ips[0]);
  }

  return "unknown";
}

/**
 * IP-Adresse sanitizen (keine bösartigen Zeichen)
 */
function sanitizeIP(ip: string): string {
  // Nur erlaubte Zeichen: 0-9, a-f, A-F, :, .
  return ip.replace(/[^0-9a-fA-F:.]/g, "").slice(0, 45); // Max IPv6 Länge
}

/**
 * Prüft ob eine IP-Adresse gültig aussieht
 */
function isValidIP(ip: string): boolean {
  // Einfache Prüfung: Enthält . (IPv4) oder : (IPv6)
  return (ip.includes(".") || ip.includes(":")) && ip.length >= 7;
}

/**
 * Rate Limit prüfen (atomic mit @upstash/ratelimit SDK)
 */
export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const identifier = ip;

  try {
    const limiter = getRatelimiter(config);
    const { success, remaining, reset } = await limiter.limit(identifier);

    return {
      success,
      remaining,
      resetAt: reset,
    };
  } catch (error) {
    // Bei Redis-Fehlern: Request durchlassen (fail-open)
    console.warn("[RATE-LIMIT] Redis error, allowing request:", error);
    return {
      success: true,
      remaining: config.limit,
      resetAt: Date.now() + config.windowSeconds * 1000,
    };
  }
}

/**
 * Rate Limit Response erstellen
 */
export function rateLimitExceededResponse(resetAt: number): NextResponse {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);

  return NextResponse.json(
    {
      error: "Zu viele Anfragen. Bitte später erneut versuchen.",
      code: "RATE_LIMIT_EXCEEDED",
      retryAfter,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter > 0 ? retryAfter : 1),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(resetAt),
      },
    }
  );
}

// ============================================
// VORKONFIGURIERTE RATE LIMITS
// ============================================

export const RATE_LIMITS = {
  /** Login: 5 Versuche pro Minute */
  login: {
    limit: 5,
    windowSeconds: 60,
    prefix: "login",
  },
  /** Analytics: 100 Requests pro Minute */
  analytics: {
    limit: 100,
    windowSeconds: 60,
    prefix: "analytics",
  },
  /** API allgemein: 60 Requests pro Minute */
  api: {
    limit: 60,
    windowSeconds: 60,
    prefix: "api",
  },
  /** Upload: 10 pro Minute */
  upload: {
    limit: 10,
    windowSeconds: 60,
    prefix: "upload",
  },
  /** Kontaktformular: 5 pro Stunde (gegen Spam) */
  contact: {
    limit: 5,
    windowSeconds: 3600,
    prefix: "contact",
  },
} as const;
