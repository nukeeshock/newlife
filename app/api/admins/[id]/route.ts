import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/middleware/admin-auth";
import { updateAdminSchema, validate, formatZodErrors } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================
// PATCH: Admin aktualisieren (name, email, optional password)
// ============================================

async function updateAdminHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Input validieren
    const validation = validate(updateAdminSchema, body);
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

    // Admin existiert?
    const existing = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Admin nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    // Update-Daten vorbereiten
    const { password, ...otherData } = validation.data;
    const updateData: { email?: string; name?: string | null; password?: string } = { ...otherData };

    // Passwort hashen wenn mitgegeben
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const admin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(admin);
  } catch (error) {
    // Duplikat-Email abfangen (Unique Constraint)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ein Admin mit dieser E-Mail existiert bereits", code: "DUPLICATE_EMAIL" },
        { status: 409 }
      );
    }

    console.error("[ADMIN_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Aktualisieren des Admins", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE: Admin löschen
// ============================================

async function deleteAdminHandler(
  request: AuthenticatedRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const currentAdminId = request.admin.sub;

    // Selbstlöschung verhindern
    if (id === currentAdminId) {
      return NextResponse.json(
        { error: "Du kannst dich nicht selbst löschen", code: "SELF_DELETE_FORBIDDEN" },
        { status: 403 }
      );
    }

    // Admin existiert?
    const existing = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Admin nicht gefunden", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    // Prüfen ob dies der letzte Admin ist
    const adminCount = await prisma.admin.count();
    if (adminCount === 1) {
      return NextResponse.json(
        { error: "Der letzte Admin kann nicht gelöscht werden", code: "LAST_ADMIN" },
        { status: 403 }
      );
    }

    // Admin löschen (Cascade löscht auch RefreshTokens)
    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ADMIN_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Fehler beim Löschen des Admins", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

export const PATCH = withAdminAuth(updateAdminHandler);
export const DELETE = withAdminAuth(deleteAdminHandler);
