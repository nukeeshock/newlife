import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { createPropertySchema, validate, formatZodErrors } from "@/lib/validations";
import { serializeBigInt } from "@/lib/serialize";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";

// Property Types (enum values)
type PropertyType = "private_residence" | "apartment" | "house" | "commercial";
type PropertyStatus = "available" | "reserved" | "rented" | "sold" | "archived";

// Validierung für Query-Parameter
const VALID_PROPERTY_TYPES: PropertyType[] = ["private_residence", "apartment", "house", "commercial"];
const VALID_PROPERTY_STATUSES: PropertyStatus[] = ["available", "reserved", "rented", "sold", "archived"];

function isValidPropertyType(value: string | null): value is PropertyType {
  return value !== null && VALID_PROPERTY_TYPES.includes(value as PropertyType);
}

function isValidPropertyStatus(value: string | null): value is PropertyStatus {
  return value !== null && VALID_PROPERTY_STATUSES.includes(value as PropertyStatus);
}

// GET: Alle Properties abrufen (öffentlich)
export async function GET(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimit = await checkRateLimit(request, RATE_LIMITS.api);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type");
    const recommended = searchParams.get("recommended");
    const statusParam = searchParams.get("status");
    const includeArchived = searchParams.get("includeArchived") === "true";

    const where: {
      type?: PropertyType;
      recommended?: boolean;
      status?: PropertyStatus | { not: PropertyStatus };
    } = {};

    // Nur gültige Typen akzeptieren
    if (isValidPropertyType(typeParam)) where.type = typeParam;
    if (recommended === "true") where.recommended = true;
    
    // Archivierte ausschließen, es sei denn explizit angefordert
    if (isValidPropertyStatus(statusParam)) {
      where.status = statusParam;
    } else if (!includeArchived) {
      where.status = { not: "archived" };
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: [{ recommended: "desc" }, { popularity: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(serializeBigInt(properties));
  } catch (error) {
    console.error("[PROPERTIES_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Properties", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// POST: Neue Property erstellen (Admin only)
async function createPropertyHandler(request: AuthenticatedRequest) {
  let parsedImages: string[] = [];

  try {
    const body = await request.json();

    // Store images for potential cleanup in case of error
    if (body?.images && Array.isArray(body.images)) {
      parsedImages = body.images.filter(
        (url: unknown) => typeof url === "string" && url.includes("vercel-storage.com")
      );
    }

    // Input validieren
    const validation = validate(createPropertySchema, body);
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

    const data = validation.data;

    // Slug generieren wenn nicht vorhanden
    let baseSlug = data.slug;
    if (!baseSlug) {
      baseSlug = data.title
        .toLowerCase()
        .replace(/[äöüß]/g, (c: string) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] || c)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Slug-Eindeutigkeit prüfen und ggf. nummerieren
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await prisma.property.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!existing) break;

      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    // Property erstellen mit Retry bei Race Condition (Unique Constraint)
    let property;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        property = await prisma.property.create({
          data: {
            slug,
            title: data.title,
            description: data.description,
            city: data.city,
            country: data.country,
            address: data.address,
            listingType: data.listingType,
            priceEUR: data.priceEUR,
            priceVND: data.priceVND || 0,
            price: data.priceEUR,
            currency: "EUR",
            status: data.status,
            type: data.type,
            recommended: data.recommended,
            area: data.area,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            amenities: data.amenities,
            images: data.images,
            popularity: data.popularity,
          },
        });
        break; // Erfolgreich erstellt
      } catch (createError) {
        // Prisma P2002 = Unique Constraint Violation (Race Condition)
        if (
          createError instanceof Error &&
          "code" in createError &&
          (createError as { code: string }).code === "P2002"
        ) {
          retryCount++;
          // Neuen Slug mit Timestamp generieren
          slug = `${baseSlug}-${Date.now().toString(36)}`;
        } else {
          throw createError;
        }
      }
    }

    if (!property) {
      return NextResponse.json(
        { error: "Slug-Generierung fehlgeschlagen", code: "SLUG_GENERATION_FAILED" },
        { status: 500 }
      );
    }

    // Revalidate cached property pages
    revalidateTag("properties", "default");

    return NextResponse.json(serializeBigInt(property), { status: 201 });
  } catch (error) {
    // Clean up uploaded images on failure
    if (parsedImages.length > 0) {
      try {
        const { del } = await import("@vercel/blob");
        await Promise.all(
          parsedImages.map((url) => del(url).catch(() => {}))
        );
      } catch {
        // Ignore cleanup errors
      }
    }

    console.error("[PROPERTIES_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Property", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(createPropertyHandler);
