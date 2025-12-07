import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { serializeBigInt } from "@/lib/serialize";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST: Archivierte Property wiederherstellen (Admin only)
async function restorePropertyHandler(
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

    if (existing.status !== "archived") {
      return NextResponse.json(
        { error: "Property ist nicht archiviert", code: "NOT_ARCHIVED" },
        { status: 400 }
      );
    }

    // Stadt wieder ins System holen, falls sie gelöscht wurde
    const cityExists = await prisma.city.findFirst({
      where: { name: existing.city },
    });

    if (!cityExists) {
      await prisma.city.create({
        data: {
          name: existing.city,
          country: existing.country,
        },
      });
    }

    const property = await prisma.property.update({
      where: { id },
      data: { status: "available" },
    });

    // Revalidate cached property pages (on-demand ISR)
    revalidateTag("properties", "max");

    return NextResponse.json(serializeBigInt(property));
  } catch (error) {
    console.error("[PROPERTY_RESTORE_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Wiederherstellen", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(restorePropertyHandler);
