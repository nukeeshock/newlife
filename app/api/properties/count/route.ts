import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";

// GET: Anzahl aller aktiven Properties
export async function GET(request: NextRequest) {
  // Rate Limiting
  const rateLimit = await checkRateLimit(request, RATE_LIMITS.api);
  if (!rateLimit.success) {
    return rateLimitExceededResponse(rateLimit.resetAt);
  }

  try {
    const count = await prisma.property.count({
      where: {
        status: {
          not: "archived",
        },
      },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error counting properties:", error);
    return NextResponse.json({ error: "Fehler beim Zählen der Properties" }, { status: 500 });
  }
}


