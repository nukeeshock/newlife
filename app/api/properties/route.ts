import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { createPropertySchema, validate, formatZodErrors } from "@/lib/validations";

// Property Types (enum values)
type PropertyType = "private_residence" | "apartment" | "house" | "commercial";
type PropertyStatus = "available" | "reserved" | "rented" | "sold" | "archived";

// BigInt zu Number konvertieren für JSON-Serialisierung
function serializeProperties(properties: Record<string, unknown>[]) {
  return JSON.parse(
    JSON.stringify(properties, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

function serializeProperty(property: Record<string, unknown>) {
  return JSON.parse(
    JSON.stringify(property, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

// GET: Alle Properties abrufen (öffentlich)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as PropertyType | null;
    const recommended = searchParams.get("recommended");
    const status = searchParams.get("status") as PropertyStatus | null;
    const includeArchived = searchParams.get("includeArchived") === "true";

    const where: {
      type?: PropertyType;
      recommended?: boolean;
      status?: PropertyStatus | { not: PropertyStatus };
    } = {};

    if (type) where.type = type;
    if (recommended === "true") where.recommended = true;
    
    // Archivierte ausschließen, es sei denn explizit angefordert
    if (status) {
      where.status = status;
    } else if (!includeArchived) {
      where.status = { not: "archived" };
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: [{ recommended: "desc" }, { popularity: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(serializeProperties(properties));
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
  try {
    const body = await request.json();

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

    const property = await prisma.property.create({
      data: {
        slug,
        title: data.title,
        description: data.description,
        city: data.city,
        country: data.country,
        address: data.address,
        // Neue Preisfelder
        listingType: data.listingType,
        priceEUR: data.priceEUR,
        priceVND: data.priceVND || 0,
        // Legacy-Felder für Rückwärtskompatibilität
        price: data.priceEUR, // Legacy: price = priceEUR
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

    return NextResponse.json(serializeProperty(property), { status: 201 });
  } catch (error) {
    console.error("[PROPERTIES_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen der Property", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(createPropertyHandler);
