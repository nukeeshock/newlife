import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse, getClientIP } from "@/lib/rate-limit";
import { hashIP, createSessionFingerprint, removeSessionFromCache } from "@/lib/analytics";
import { endSessionSchema, validate } from "@/lib/validations";

// POST: Session beenden (via sendBeacon)
export async function POST(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimit = await checkRateLimit(request, RATE_LIMITS.analytics);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    // Body parsen (kann text/plain oder application/json sein)
    let body: { sessionId?: string };
    try {
      const text = await request.text();
      body = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Ungültiger Request-Body", code: "INVALID_BODY" },
        { status: 400 }
      );
    }

    // Validierung
    const validation = validate(endSessionSchema, body);
    if (!validation.success) {
      // Bei sendBeacon einfach ignorieren
      return NextResponse.json({ success: false });
    }

    const { sessionId } = validation.data;

    // Session beenden (fehlertoleranter)
    try {
      await prisma.analyticsSession.update({
        where: { id: sessionId },
        data: { endedAt: new Date() },
      });
    } catch {
      // Session nicht gefunden - ignorieren
    }

    // Aus Cache entfernen
    const userAgent = request.headers.get("user-agent");
    const ip = getClientIP(request);
    const ipHash = hashIP(ip);
    const fingerprint = createSessionFingerprint(ipHash, userAgent);
    removeSessionFromCache(fingerprint);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ANALYTICS_SESSION_END_ERROR]", error);
    // Bei sendBeacon immer 200 zurückgeben
    return NextResponse.json({ success: false });
  }
}

