import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { createAdminSchema, validate, formatZodErrors } from "@/lib/validations";
import { BCRYPT_ROUNDS } from "@/lib/auth";

// ============================================
// GET: Alle Admins abrufen (ohne Passwort!)
// ============================================

async function getAdminsHandler() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // password NICHT inkludieren!
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("[ADMINS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Admins", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// ============================================
// POST: Neuen Admin erstellen
// ============================================

async function createAdminHandler(request: AuthenticatedRequest) {
  try {
    const body = await request.json();

    // Input validieren
    const validation = validate(createAdminSchema, body);
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

    const { email, password, name } = validation.data;

    // Prüfen ob Admin bereits existiert
    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Ein Admin mit dieser E-Mail existiert bereits", code: "DUPLICATE_EMAIL" },
        { status: 409 }
      );
    }

    // Passwort mit bcrypt hashen (12 Rounds)
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ein Admin mit dieser E-Mail existiert bereits", code: "DUPLICATE_EMAIL" },
        { status: 409 }
      );
    }

    console.error("[ADMINS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Admins", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const GET = withAdminAuth(getAdminsHandler);
export const POST = withAdminAuth(createAdminHandler);
