import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: Anzahl aller aktiven Properties
export async function GET() {
  try {
    const count = await prisma.property.count({
      where: {
        status: {
          not: "archived",
        },
      },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error counting properties:", error);
    return NextResponse.json({ error: "Fehler beim Zählen der Properties" }, { status: 500 });
  }
}


