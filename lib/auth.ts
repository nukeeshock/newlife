import * as jose from "jose";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

// ============================================
// KONFIGURATION
// ============================================

// JWT Secret MUSS gesetzt sein - App crasht sonst beim Start
const jwtSecretRaw = process.env.JWT_SECRET;
if (!jwtSecretRaw) {
  throw new Error(
    "❌ FATAL: JWT_SECRET ist nicht gesetzt!\n" +
    "Füge JWT_SECRET zu deiner .env Datei hinzu (min. 32 Zeichen)."
  );
}
if (jwtSecretRaw.length < 32) {
  throw new Error(
    "❌ FATAL: JWT_SECRET muss mindestens 32 Zeichen lang sein!\n" +
    `Aktuell: ${jwtSecretRaw.length} Zeichen.`
  );
}
const JWT_SECRET = new TextEncoder().encode(jwtSecretRaw);

const ACCESS_TOKEN_EXPIRY = "15m"; // 15 Minuten
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 Tage

export const BCRYPT_ROUNDS = 12;

// Cookie-Namen
export const ACCESS_TOKEN_COOKIE = "nlv_access";
export const REFRESH_TOKEN_COOKIE = "nlv_refresh";

// ============================================
// JWT FUNKTIONEN
// ============================================

export interface JWTPayload {
  sub: string; // Admin ID
  email: string;
  name?: string;
  type: "access" | "refresh";
}

/**
 * Access Token erstellen (kurze Lebensdauer)
 */
export async function createAccessToken(admin: {
  id: string;
  email: string;
  name?: string | null;
}): Promise<string> {
  return new jose.SignJWT({
    sub: admin.id,
    email: admin.email,
    name: admin.name || undefined,
    type: "access",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * Refresh Token erstellen (lange Lebensdauer)
 */
export async function createRefreshToken(admin: {
  id: string;
  email: string;
  name?: string | null;
}): Promise<string> {
  return new jose.SignJWT({
    sub: admin.id,
    email: admin.email,
    name: admin.name || undefined,
    type: "refresh",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/**
 * JWT verifizieren
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// ============================================
// PASSWORT FUNKTIONEN
// ============================================

/**
 * Passwort verifizieren
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================
// TOKEN HASHING (für DB-Speicherung)
// ============================================

import crypto from "crypto";

/**
 * Token hashen für sichere DB-Speicherung
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// ============================================
// REQUEST HELPERS
// ============================================

/**
 * Token aus Request-Cookies extrahieren
 */
export function getTokensFromRequest(request: NextRequest): {
  accessToken?: string;
  refreshToken?: string;
} {
  return {
    accessToken: request.cookies.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: request.cookies.get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

