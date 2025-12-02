import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { updatePropertySchema, validate, formatZodErrors } from "@/lib/validations";

// BigInt zu Number konvertieren für JSON-Serialisierung
function serializeProperty(property: Record<string, unknown>) {
  return JSON.parse(
    JSON.stringify(property, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Einzelne Property abrufen (öffentlich)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeProperty(property));
  } catch (error) {
    console.error("[PROPERTY_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Property", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// PATCH: Property aktualisieren (Admin only)
async function updatePropertyHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Input validieren
    const validation = validate(updatePropertySchema, body);
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

    // Property existiert?
    const existing = await prisma.property.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Property nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    const property = await prisma.property.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(serializeProperty(property));
  } catch (error) {
    console.error("[PROPERTY_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren der Property", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// DELETE: Property archivieren (Admin only)
async function deletePropertyHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Property existiert?
    const existing = await prisma.property.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Property nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    // Soft Delete: Status auf "archived" setzen
    await prisma.property.update({
      where: { id },
      data: { 
        status: "archived",
        recommended: false,
      },
    });

    return NextResponse.json({ success: true, message: "Property archiviert" });
  } catch (error) {
    console.error("[PROPERTY_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Archivieren der Property", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const PATCH = withAdminAuth(updatePropertyHandler);
export const DELETE = withAdminAuth(deletePropertyHandler);
