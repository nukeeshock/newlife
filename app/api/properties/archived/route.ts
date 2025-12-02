import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth } from "@/lib/middleware/admin-auth";

// BigInt zu Number konvertieren für JSON-Serialisierung
function serializeProperties(properties: Record<string, unknown>[]) {
  return JSON.parse(
    JSON.stringify(properties, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

// GET: Alle archivierten Properties abrufen (Admin only)
async function getArchivedHandler() {
  try {
    const properties = await prisma.property.findMany({
      where: { status: "archived" },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(serializeProperties(properties));
  } catch (error) {
    console.error("[ARCHIVED_PROPERTIES_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getArchivedHandler);
