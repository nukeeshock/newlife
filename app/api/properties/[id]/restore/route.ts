import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";

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

    const property = await prisma.property.update({
      where: { id },
      data: { status: "available" },
    });

    return NextResponse.json(serializeProperty(property));
  } catch (error) {
    console.error("[PROPERTY_RESTORE_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Wiederherstellen", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const POST = withAdminAuth(restorePropertyHandler);
