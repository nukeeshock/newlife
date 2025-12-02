import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { updateCitySchema, validate, formatZodErrors } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE: Stadt löschen (Admin only)
async function deleteCityHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Prüfen ob Stadt existiert
    const existing = await prisma.city.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Stadt nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    // Prüfen ob Properties mit dieser Stadt existieren
    const propertiesWithCity = await prisma.property.count({
      where: { city: existing.name },
    });

    if (propertiesWithCity > 0) {
      return NextResponse.json(
        {
          error: `Diese Stadt kann nicht gelöscht werden, da ${propertiesWithCity} Property/Properties damit verknüpft sind.`,
          code: "CITY_IN_USE",
        },
        { status: 409 }
      );
    }

    await prisma.city.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CITY_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen der Stadt", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// PATCH: Stadt aktualisieren (Admin only)
async function updateCityHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Input validieren
    const validation = validate(updateCitySchema, body);
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

    // Stadt existiert?
    const existing = await prisma.city.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Stadt nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    const city = await prisma.city.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(city);
  } catch (error) {
    console.error("[CITY_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren der Stadt", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const DELETE = withAdminAuth(deleteCityHandler);
export const PATCH = withAdminAuth(updateCityHandler);
