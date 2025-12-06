import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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

    // Prüfen ob AKTIVE Properties mit dieser Stadt existieren (archivierte ignorieren)
    const activePropertiesWithCity = await prisma.property.count({
      where: {
        city: existing.name,
        status: { not: "archived" }
      },
    });

    if (activePropertiesWithCity > 0) {
      return NextResponse.json(
        {
          error: `Diese Stadt kann nicht gelöscht werden, da ${activePropertiesWithCity} aktive Property/Properties damit verknüpft sind. Archiviere oder lösche diese zuerst.`,
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

    const oldName = existing.name;
    const newName = validation.data.name;

    // Transaktional: Stadt + Properties atomar aktualisieren
    const city = await prisma.$transaction(async (tx) => {
      const updatedCity = await tx.city.update({
        where: { id },
        data: validation.data,
      });

      // Wenn Name geändert wurde, alle Properties aktualisieren
      if (newName && newName !== oldName) {
        await tx.property.updateMany({
          where: { city: oldName },
          data: { city: newName },
        });
      }

      return updatedCity;
    });

    return NextResponse.json(city);
  } catch (error) {
    // Duplikat-Name abfangen (Unique Constraint)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Eine Stadt mit diesem Namen existiert bereits", code: "DUPLICATE_NAME" },
        { status: 409 }
      );
    }

    console.error("[CITY_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren der Stadt", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const DELETE = withAdminAuth(deleteCityHandler);
export const PATCH = withAdminAuth(updateCityHandler);
