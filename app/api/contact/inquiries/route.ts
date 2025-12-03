import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAdminAuth } from "@/lib/middleware/admin-auth";

// GET - Alle Kontaktanfragen laden (Admin only)
async function getInquiriesHandler() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
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

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("[INQUIRIES_GET_ERROR]", error);
    return NextResponse.json(
      {
        error: "Fehler beim Laden der Anfragen",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getInquiriesHandler);
