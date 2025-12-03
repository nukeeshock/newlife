import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { createCitySchema, validate, formatZodErrors } from "@/lib/validations";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";

// GET: Alle Städte abrufen (öffentlich)
export async function GET(request: NextRequest) {
  // Rate Limiting
  const rateLimit = checkRateLimit(request, RATE_LIMITS.api);
  if (!rateLimit.success) {
    return rateLimitExceededResponse(rateLimit.resetAt);
  }

  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(cities);
  } catch (error) {
    console.error("[CITIES_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Städte", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// POST: Neue Stadt hinzufügen (Admin only)
async function createCityHandler(request: AuthenticatedRequest) {
  try {
    const body = await request.json();

    // Input validieren
    const validation = validate(createCitySchema, body);
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

    const { name, country } = validation.data;

    // Prüfen ob Stadt bereits existiert
    const existing = await prisma.city.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Diese Stadt existiert bereits", code: "DUPLICATE_ENTRY" },
        { status: 409 }
      );
    }

    const city = await prisma.city.create({
      data: { name, country },
    });

    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error("[CITIES_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Stadt", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(createCityHandler);
