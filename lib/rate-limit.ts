import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// ============================================
// UPSTASH REDIS RATE LIMITER
// Funktioniert zuverlässig auf Serverless!
// ============================================

// Redis-Instanz (Upstash REST API)
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

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
 * Rate Limit prüfen (async mit Vercel KV)
 */
export async function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const key = `ratelimit:${config.prefix}:${ip}`;
  const now = Date.now();

  try {
    const existing = await redis.get<RateLimitEntry>(key);

    // Kein Eintrag oder abgelaufen -> neuen erstellen
    if (!existing || existing.resetAt < now) {
      const resetAt = now + config.windowSeconds * 1000;
      await redis.set(key, { count: 1, resetAt }, { px: config.windowSeconds * 1000 });
      return {
        success: true,
        remaining: config.limit - 1,
        resetAt,
      };
    }

    // Limit erreicht?
    if (existing.count >= config.limit) {
      return {
        success: false,
        remaining: 0,
        resetAt: existing.resetAt,
      };
    }

    // Counter erhöhen
    const ttl = existing.resetAt - now;
    await redis.set(
      key,
      { count: existing.count + 1, resetAt: existing.resetAt },
      { px: ttl > 0 ? ttl : 1000 }
    );

    return {
      success: true,
      remaining: config.limit - existing.count - 1,
      resetAt: existing.resetAt,
    };
  } catch (error) {
    // Bei Redis-Fehlern: Request durchlassen (fail-open)
    console.warn("[RATE-LIMIT] Redis error, allowing request:", error);
    return {
      success: true,
      remaining: config.limit,
      resetAt: now + config.windowSeconds * 1000,
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
        "Retry-After": String(retryAfter),
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
