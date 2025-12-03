import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth } from "@/lib/middleware/admin-auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET - Einzelne Anfrage laden
async function getInquiryHandler(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!inquiry) {
      return NextResponse.json(
        {
          error: "Anfrage nicht gefunden",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("[INQUIRY_GET_ERROR]", error);
    return NextResponse.json(
      {
        error: "Fehler beim Laden der Anfrage",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

// PATCH - Anfrage aktualisieren (read Status)
async function updateInquiryHandler(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // Prüfen ob Anfrage existiert
    const existing = await prisma.contactInquiry.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Anfrage nicht gefunden",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    // Nur read-Status aktualisieren
    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: {
        read: typeof body.read === "boolean" ? body.read : existing.read,
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[INQUIRY_PATCH_ERROR]", error);
    return NextResponse.json(
      {
        error: "Fehler beim Aktualisieren der Anfrage",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

// DELETE - Anfrage löschen
async function deleteInquiryHandler(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    // Prüfen ob Anfrage existiert
    const existing = await prisma.contactInquiry.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Anfrage nicht gefunden",
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    await prisma.contactInquiry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Anfrage wurde gelöscht",
    });
  } catch (error) {
    console.error("[INQUIRY_DELETE_ERROR]", error);
    return NextResponse.json(
      {
        error: "Fehler beim Löschen der Anfrage",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getInquiryHandler);
export const PATCH = withAdminAuth(updateInquiryHandler);
export const DELETE = withAdminAuth(deleteInquiryHandler);
