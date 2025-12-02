import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  getTokensFromRequest,
  createAccessToken,
  createRefreshToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/auth";

/**
 * Token Refresh Endpoint
 * Generiert neue Access + Refresh Tokens wenn der Refresh Token gültig ist
 */
export async function POST(request: NextRequest) {
  const { refreshToken } = getTokensFromRequest(request);

  if (!refreshToken) {
    return NextResponse.json(
      {
        error: "Kein Refresh Token vorhanden",
        code: "NO_REFRESH_TOKEN",
      },
      { status: 401 }
    );
  }

  const payload = await verifyToken(refreshToken);

  if (!payload || payload.type !== "refresh") {
    return NextResponse.json(
      {
        error: "Ungültiger Refresh Token",
        code: "INVALID_REFRESH_TOKEN",
      },
      { status: 401 }
    );
  }

  // Neue Tokens generieren
  const newAccessToken = await createAccessToken({
    id: payload.sub,
    email: payload.email,
    name: payload.name,
  });
  const newRefreshToken = await createRefreshToken({
    id: payload.sub,
    email: payload.email,
    name: payload.name,
  });

  const response = NextResponse.json({
    success: true,
    admin: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
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

