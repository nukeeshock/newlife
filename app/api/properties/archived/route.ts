import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth } from "@/lib/middleware/admin-auth";
import { serializeBigInt } from "@/lib/serialize";

// GET: Alle archivierten Properties abrufen (Admin only)
async function getArchivedHandler() {
  try {
    const properties = await prisma.property.findMany({
      where: { status: "archived" },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(serializeBigInt(properties));
  } catch (error) {
    console.error("[ARCHIVED_PROPERTIES_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getArchivedHandler);
