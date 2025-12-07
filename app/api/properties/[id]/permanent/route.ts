import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE: Property ENDGÜLTIG löschen (Admin only, nur aus Archiv)
async function permanentDeleteHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Property existiert?
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    if (property.status !== "archived") {
      return NextResponse.json(
        {
          error: "Nur archivierte Properties können endgültig gelöscht werden",
          code: "NOT_ARCHIVED",
        },
        { status: 400 }
      );
    }

    // Bilder aus Vercel Blob löschen
    if (property.images && property.images.length > 0) {
      await Promise.all(
        property.images
          .filter((url) => url.includes("vercel-storage.com"))
          .map((url) => del(url).catch(() => {}))
      );
    }

    // Endgültig löschen
    await prisma.property.delete({
      where: { id },
    });

    // Revalidate cached property pages
    revalidateTag("properties", "default");

    return NextResponse.json({
      success: true,
      message: "Property endgültig gelöscht",
    });
  } catch (error) {
    console.error("[PROPERTY_PERMANENT_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const DELETE = withAdminAuth(permanentDeleteHandler);
