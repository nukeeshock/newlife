import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  hashToken,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  const isProduction = process.env.NODE_ENV === "production";

  // Refresh Token aus Cookie holen und in DB revoken
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  
  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    
    // Token als revoked markieren (nicht löschen - für Audit-Trail)
    try {
      await prisma.refreshToken.updateMany({
        where: { token: tokenHash },
        data: { revokedAt: new Date() },
      });
    } catch (error) {
      // Fehler loggen aber nicht Response blockieren
      console.error("[LOGOUT] Token revocation failed:", error);
    }
  }

  // Access Token Cookie löschen - SameSite=Strict für CSRF-Schutz
  response.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // Refresh Token Cookie löschen - SameSite=Strict für CSRF-Schutz
  response.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
