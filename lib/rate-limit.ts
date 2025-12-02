import { NextRequest, NextResponse } from "next/server";

// ============================================
// IN-MEMORY RATE LIMITER
// ⚠️ WARNUNG: Funktioniert NICHT zuverlässig auf Vercel Serverless!
// Jede Function-Instance hat eigenen Memory.
// Für Produktion: Redis/Upstash verwenden!
// ============================================

// Warnung beim Start loggen (nur einmal)
if (process.env.NODE_ENV === "production" && !process.env.REDIS_URL) {
  console.warn(
    "⚠️ [RATE-LIMIT] In-Memory Rate Limiting auf Serverless nicht zuverlässig! " +
    "Für Produktion Redis/Upstash empfohlen."
  );
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Globale Map für Rate Limiting (In-Memory)
const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup: Alte Einträge alle 5 Minuten entfernen
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

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
// In Produktion: Nur echte Proxy-IPs hier eintragen!
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
    const ips = forwarded.split(",").map(ip => ip.trim());
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
 * Rate Limit prüfen
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): RateLimitResult {
  const ip = getClientIP(request);
  const key = `${config.prefix}:${ip}`;
  const now = Date.now();

  const existing = rateLimitMap.get(key);

  // Kein Eintrag oder abgelaufen -> neuen erstellen
  if (!existing || existing.resetAt < now) {
    const resetAt = now + config.windowSeconds * 1000;
    rateLimitMap.set(key, { count: 1, resetAt });
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
  existing.count++;
  return {
    success: true,
    remaining: config.limit - existing.count,
    resetAt: existing.resetAt,
  };
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
} as const;

