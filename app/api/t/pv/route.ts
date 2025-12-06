import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";
import { isBot } from "@/lib/analytics";
import { createPageviewSchema, validate, formatZodErrors } from "@/lib/validations";

// POST: Pageview loggen
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
    const validation = validate(createPageviewSchema, body);
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

    const { sessionId, path } = validation.data;

    // Prüfen ob Session existiert
    const session = await prisma.analyticsSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session nicht gefunden", code: "SESSION_NOT_FOUND" },
        { status: 404 }
      );
    }

    // Pageview erstellen
    await prisma.analyticsPageview.create({
      data: {
        sessionId,
        path,
        occurredAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ANALYTICS_PAGEVIEW_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
