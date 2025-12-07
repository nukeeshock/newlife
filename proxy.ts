import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// JWT Secret für Proxy Runtime (Node.js)
const jwtSecretRaw = process.env.JWT_SECRET;
const JWT_SECRET = jwtSecretRaw
  ? new TextEncoder().encode(jwtSecretRaw)
  : null;

const ACCESS_TOKEN_COOKIE = "nlv_access";

/**
 * Proxy für Server-Side Route Protection (Next.js 16+)
 *
 * WARUM: Client-Side Auth Checks (useAdmin Hook) erlauben Usern, die Admin-UI
 * zu sehen, bevor der Redirect greift. Mit Proxy wird NIEMALS
 * eine Admin-Seite an nicht-authentifizierte User ausgeliefert.
 *
 * NOTE: In Next.js 16 wurde "middleware" zu "proxy" umbenannt, um die
 * Network-Boundary-Funktion zu verdeutlichen. Proxy läuft auf Node.js Runtime.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nur /admin/* Routen schützen
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // JWT_SECRET muss gesetzt sein
  if (!JWT_SECRET) {
    console.error("[PROXY] JWT_SECRET nicht konfiguriert!");
    return redirectToLogin(request);
  }

  // Access Token aus Cookie holen
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return redirectToLogin(request);
  }

  // Token verifizieren
  try {
    const { payload } = await jose.jwtVerify(accessToken, JWT_SECRET);

    // Token muss vom Typ "access" sein
    if (payload.type !== "access") {
      return redirectToLogin(request);
    }

    // Admin ID muss vorhanden sein
    if (!payload.sub) {
      return redirectToLogin(request);
    }

    // Alles OK - Request durchlassen
    return NextResponse.next();
  } catch (error) {
    // Token ungültig oder abgelaufen
    // Bei abgelaufenem Token könnte der Client über /api/auth/check refreshen
    // Aber zur Sicherheit redirecten wir - der Client kann dann refreshen und zurückkommen
    if (error instanceof jose.errors.JWTExpired) {
      // Token abgelaufen - Redirect mit Hint für Client
      return redirectToLogin(request, "expired");
    }

    // Ungültiger Token (manipuliert, falsches Secret, etc.)
    return redirectToLogin(request);
  }
}

/**
 * Redirect zu /login mit optionalem Grund
 */
function redirectToLogin(request: NextRequest, reason?: string): NextResponse {
  const loginUrl = new URL("/login", request.url);

  // Ursprüngliche URL als Redirect-Ziel speichern
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

  if (reason) {
    loginUrl.searchParams.set("reason", reason);
  }

  return NextResponse.redirect(loginUrl);
}

/**
 * Matcher: Nur auf /admin/* anwenden
 *
 * Nicht auf statische Dateien (_next, favicon, etc.) anwenden
 */
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
