import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  createAccessToken,
  createRefreshToken,
  verifyPassword,
  hashToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";
import { loginSchema, validate, formatZodErrors } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting prüfen
    const rateLimit = checkRateLimit(request, RATE_LIMITS.login);
    if (!rateLimit.success) {
      return rateLimitExceededResponse(rateLimit.resetAt);
    }

    // Body parsen
    const body = await request.json();

    // Input validieren
    const validation = validate(loginSchema, body);
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

    const { email, password } = validation.data;

    // Admin suchen
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Generische Fehlermeldung (keine Information ob Email existiert)
      return NextResponse.json(
        {
          error: "E-Mail oder Passwort falsch",
          code: "INVALID_CREDENTIALS",
        },
        { status: 401 }
      );
    }

    // Passwort prüfen (NUR bcrypt-Hash erlaubt!)
    if (!admin.password.startsWith("$2")) {
      // Klartext-Passwort gefunden - Sicherheitsrisiko!
      console.error(
        `[SECURITY] Admin ${admin.email} hat Klartext-Passwort! ` +
        "Bitte 'pnpm db:seed' ausführen um Passwort zu hashen."
      );
      return NextResponse.json(
        {
          error: "Account-Konfiguration fehlerhaft. Bitte Administrator kontaktieren.",
          code: "ACCOUNT_CONFIG_ERROR",
        },
        { status: 500 }
      );
    }

    const passwordValid = await verifyPassword(password, admin.password);

    if (!passwordValid) {
      return NextResponse.json(
        {
          error: "E-Mail oder Passwort falsch",
          code: "INVALID_CREDENTIALS",
        },
        { status: 401 }
      );
    }

    // JWT Tokens erstellen
    const accessToken = await createAccessToken(admin);
    const refreshToken = await createRefreshToken(admin);

    // Refresh Token in DB speichern (für Revocation)
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 Tage
    
    await prisma.refreshToken.create({
      data: {
        token: tokenHash,
        adminId: admin.id,
        expiresAt,
      },
    });

    // Alte abgelaufene Tokens aufräumen (async, nicht blockierend)
    prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { revokedAt: { not: null } },
        ],
      },
    }).catch((err) => console.warn("[REFRESH_TOKEN_CLEANUP_ERROR]", err));

    // Response mit Cookies
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Access Token Cookie (15 min) - SameSite=Strict für CSRF-Schutz
    response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    // Refresh Token Cookie (7 Tage) - SameSite=Strict für CSRF-Schutz
    response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      {
        error: "Fehler beim Login",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
