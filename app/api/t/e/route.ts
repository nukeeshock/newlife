import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";
import { isBot } from "@/lib/analytics";
import { createEventSchema, validate, formatZodErrors } from "@/lib/validations";

// POST: Event loggen (z.B. WhatsApp-Click)
export async function POST(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimit = await checkRateLimit(request, RATE_LIMITS.analytics);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    // Bot-Filter
    const userAgent = request.headers.get("user-agent");
    if (isBot(userAgent)) {
      return NextResponse.json({ success: true, filtered: true });
    }

    const body = await request.json();

    // Validierung
    const validation = validate(createEventSchema, body);
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

    const { sessionId, eventType, propertyId } = validation.data;

    // Falls sessionId angegeben, prüfen ob sie existiert
    if (sessionId) {
      const session = await prisma.analyticsSession.findUnique({
        where: { id: sessionId },
      });

      if (!session) {
        // Session nicht gefunden - Event trotzdem loggen, aber ohne Session
        console.warn(`[ANALYTICS] Session ${sessionId} not found, logging event without session`);
      }
    }

    // Event erstellen
    await prisma.analyticsEvent.create({
      data: {
        sessionId: sessionId || null,
        eventType,
        propertyId: propertyId || null,
        occurredAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ANALYTICS_EVENT_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
