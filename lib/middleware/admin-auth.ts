import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  verifyToken,
  createAccessToken,
  createRefreshToken,
  getTokensFromRequest,
  hashToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  JWTPayload,
} from "@/lib/auth";

// ============================================
// ADMIN AUTH MIDDLEWARE
// ============================================

export interface AuthenticatedRequest extends NextRequest {
  admin: JWTPayload;
}

type RouteHandler<T = unknown> = (
  request: AuthenticatedRequest,
  context: T
) => Promise<NextResponse> | NextResponse;

/**
 * Prüft ob ein Refresh Token in der DB revoked wurde
 */
async function isTokenRevoked(refreshToken: string): Promise<boolean> {
  const tokenHash = hashToken(refreshToken);
  
  const dbToken = await prisma.refreshToken.findUnique({
    where: { token: tokenHash },
    select: { revokedAt: true, expiresAt: true },
  });

  // Token nicht in DB = revoked (oder nie gespeichert)
  if (!dbToken) return true;
  
  // Token explizit revoked
  if (dbToken.revokedAt) return true;
  
  // Token abgelaufen
  if (dbToken.expiresAt < new Date()) return true;
  
  return false;
}

/**
 * Middleware für Admin-only Routes
 * Prüft JWT Token und fügt Admin-Daten zum Request hinzu
 */
export function withAdminAuth<T = unknown>(
  handler: RouteHandler<T>
): (request: NextRequest, context: T) => Promise<NextResponse> {
  return async (request: NextRequest, context: T) => {
    const { accessToken, refreshToken } = getTokensFromRequest(request);

    // Kein Token vorhanden
    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        {
          error: "Nicht autorisiert",
          code: "UNAUTHORIZED",
        },
        { status: 401 }
      );
    }

    // Access Token prüfen
    if (accessToken) {
      const payload = await verifyToken(accessToken);
      if (payload && payload.type === "access") {
        // Token gültig - Request durchführen
        const authenticatedRequest = request as AuthenticatedRequest;
        authenticatedRequest.admin = payload;
        return handler(authenticatedRequest, context);
      }
    }

    // Access Token abgelaufen - Refresh Token prüfen
    if (refreshToken) {
      // Prüfen ob Token revoked wurde
      const revoked = await isTokenRevoked(refreshToken);
      if (revoked) {
        return NextResponse.json(
          {
            error: "Session wurde beendet. Bitte erneut anmelden.",
            code: "TOKEN_REVOKED",
          },
          { status: 401 }
        );
      }

      const refreshPayload = await verifyToken(refreshToken);
      if (refreshPayload && refreshPayload.type === "refresh") {
        // Neue Tokens generieren
        const newAccessToken = await createAccessToken({
          id: refreshPayload.sub,
          email: refreshPayload.email,
          name: refreshPayload.name,
        });
        const newRefreshToken = await createRefreshToken({
          id: refreshPayload.sub,
          email: refreshPayload.email,
          name: refreshPayload.name,
        });

        // Altes Token revoken und neues speichern
        const oldTokenHash = hashToken(refreshToken);
        const newTokenHash = hashToken(newRefreshToken);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // Transaction: Altes revoken, neues erstellen
        await prisma.$transaction([
          prisma.refreshToken.updateMany({
            where: { token: oldTokenHash },
            data: { revokedAt: new Date() },
          }),
          prisma.refreshToken.create({
            data: {
              token: newTokenHash,
              adminId: refreshPayload.sub,
              expiresAt,
            },
          }),
        ]);

        // Request durchführen
        const authenticatedRequest = request as AuthenticatedRequest;
        authenticatedRequest.admin = {
          ...refreshPayload,
          type: "access",
        };
        
        const response = await handler(authenticatedRequest, context);

        // Neue Cookies setzen - SameSite=Strict für CSRF-Schutz
        const isProduction = process.env.NODE_ENV === "production";
        response.headers.append(
          "Set-Cookie",
          `${ACCESS_TOKEN_COOKIE}=${newAccessToken}; HttpOnly; ${
            isProduction ? "Secure; " : ""
          }SameSite=Strict; Path=/; Max-Age=${15 * 60}`
        );
        response.headers.append(
          "Set-Cookie",
          `${REFRESH_TOKEN_COOKIE}=${newRefreshToken}; HttpOnly; ${
            isProduction ? "Secure; " : ""
          }SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`
        );

        return response;
      }
    }

    // Alle Tokens ungültig
    return NextResponse.json(
      {
        error: "Session abgelaufen. Bitte erneut anmelden.",
        code: "SESSION_EXPIRED",
      },
      { status: 401 }
    );
  };
}

/**
 * Einfache Auth-Prüfung ohne automatisches Token-Refresh
 * Für Endpoints wo keine Cookies gesetzt werden können (z.B. GET)
 */
export async function requireAdmin(
  request: NextRequest
): Promise<{ admin: JWTPayload } | { error: NextResponse }> {
  const { accessToken, refreshToken } = getTokensFromRequest(request);

  // Access Token prüfen
  if (accessToken) {
    const payload = await verifyToken(accessToken);
    if (payload && payload.type === "access") {
      return { admin: payload };
    }
  }

  // Refresh Token prüfen (ohne Rotation)
  if (refreshToken) {
    const revoked = await isTokenRevoked(refreshToken);
    if (!revoked) {
      const payload = await verifyToken(refreshToken);
      if (payload && payload.type === "refresh") {
        return {
          admin: {
            ...payload,
            type: "access",
          },
        };
      }
    }
  }

  return {
    error: NextResponse.json(
      {
        error: "Nicht autorisiert",
        code: "UNAUTHORIZED",
      },
      { status: 401 }
    ),
  };
}
