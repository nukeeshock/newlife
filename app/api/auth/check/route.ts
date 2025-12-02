import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  getTokensFromRequest,
  createAccessToken,
  createRefreshToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { accessToken, refreshToken } = getTokensFromRequest(request);

  // Kein Token vorhanden
  if (!accessToken && !refreshToken) {
    return NextResponse.json({ authenticated: false });
  }

  // Access Token prüfen
  if (accessToken) {
    const payload = await verifyToken(accessToken);
    if (payload && payload.type === "access") {
      return NextResponse.json({
        authenticated: true,
        admin: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
        },
      });
    }
  }

  // Access Token abgelaufen - Refresh Token prüfen
  if (refreshToken) {
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

      const response = NextResponse.json({
        authenticated: true,
        admin: {
          id: refreshPayload.sub,
          email: refreshPayload.email,
          name: refreshPayload.name,
        },
      });

      const isProduction = process.env.NODE_ENV === "production";

      // Neue Cookies setzen
      response.cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      });

      response.cookies.set(REFRESH_TOKEN_COOKIE, newRefreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }
  }

  // Alle Tokens ungültig
  return NextResponse.json({ authenticated: false });
}
