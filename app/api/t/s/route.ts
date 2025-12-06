import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse, getClientIP } from "@/lib/rate-limit";
import {
  hashIP,
  createSessionFingerprint,
  isBot,
  getExistingSession,
  cacheSession,
  removeSessionFromCache,
} from "@/lib/analytics";
import { createSessionSchema, endSessionSchema, validate, formatZodErrors } from "@/lib/validations";

// POST: Neue Session erstellen oder existierende zurückgeben
export async function POST(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimit = await checkRateLimit(request, RATE_LIMITS.analytics);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    // User Agent und IP
    const userAgent = request.headers.get("user-agent");
    const ip = getClientIP(request);
    const ipHash = hashIP(ip);

    // Bot-Filter
    if (isBot(userAgent)) {
      // Stille Ablehnung - kein Fehler, aber keine Session
      return NextResponse.json({ sessionId: null, isBot: true });
    }

    // Session-Fingerprint für Deduplication
    const fingerprint = createSessionFingerprint(ipHash, userAgent);

    // Prüfen ob Session bereits existiert (innerhalb 30 Min Window)
    const existingSessionId = getExistingSession(fingerprint);
    if (existingSessionId) {
      return NextResponse.json({
        sessionId: existingSessionId,
        reused: true,
      });
    }

    // Body parsen (optional)
    let referrer: string | null = null;
    try {
      const text = await request.text();
      if (text) {
        const validation = validate(createSessionSchema, JSON.parse(text));
        if (validation.success && validation.data.referrer) {
          referrer = validation.data.referrer;
        }
      }
    } catch {
      // Body parsing fehler ignorieren
    }

    // Fallback Referrer aus Header
    if (!referrer) {
      referrer = request.headers.get("referer");
    }

    // Neue Session erstellen
    const session = await prisma.analyticsSession.create({
      data: {
        ipHash,
        userAgent,
        referrer,
        startedAt: new Date(),
      },
    });

    // Im Cache speichern für Deduplication
    cacheSession(fingerprint, session.id);

    return NextResponse.json({
      sessionId: session.id,
      reused: false,
    });
  } catch (error) {
    console.error("[ANALYTICS_SESSION_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// PATCH: Session beenden
export async function PATCH(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimit = await checkRateLimit(request, RATE_LIMITS.analytics);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    const body = await request.json();

    // Validierung
    const validation = validate(endSessionSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Ungültige Eingabe",
          code: "VALIDATION_ERROR",
          details: formatZodErrors(validation.errors),
        },
        { status: 400 }
      );
    }

    const { sessionId } = validation.data;

    // Session beenden
    await prisma.analyticsSession.update({
      where: { id: sessionId },
      data: { endedAt: new Date() },
    });

    // Aus Cache entfernen (ermöglicht neue Session bei erneutem Besuch)
    const userAgent = request.headers.get("user-agent");
    const ip = getClientIP(request);
    const ipHash = hashIP(ip);
    const fingerprint = createSessionFingerprint(ipHash, userAgent);
    removeSessionFromCache(fingerprint);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ANALYTICS_SESSION_END_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
