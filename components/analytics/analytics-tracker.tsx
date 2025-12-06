"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { hasAnalyticsConsent } from "@/components/cookie-banner";

const STORAGE_KEY = "nlv_session_id";
const TIMESTAMP_KEY = "nlv_session_timestamp";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 Minuten Inaktivität = neue Session

// Check if analytics is enabled (consent given)
function isAnalyticsEnabled(): boolean {
  return hasAnalyticsConsent();
}

// Prüft ob die Session noch gültig ist (innerhalb 30 Min)
function isSessionValid(): boolean {
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  if (!timestamp) return false;
  const elapsed = Date.now() - parseInt(timestamp, 10);
  return elapsed < SESSION_TIMEOUT;
}

// Session-Timestamp aktualisieren
function updateSessionTimestamp(): void {
  localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
}

// Session ID aus localStorage holen oder neue erstellen
async function getOrCreateSessionId(): Promise<string | null> {
  if (!isAnalyticsEnabled()) return null;

  try {
    // Prüfen ob localStorage verfügbar ist
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    // Prüfen ob bereits eine gültige Session existiert
    const existingId = localStorage.getItem(STORAGE_KEY);
    if (existingId && isSessionValid()) {
      // Session noch gültig, Timestamp aktualisieren
      updateSessionTimestamp();
      return existingId;
    }

    // Session abgelaufen oder nicht vorhanden - alte ID entfernen
    if (existingId) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
    }

    // Neue Session erstellen
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s Timeout

    const response = await fetch("/api/t/s", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer: document.referrer || null,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.sessionId) {
      localStorage.setItem(STORAGE_KEY, data.sessionId);
      updateSessionTimestamp();
      return data.sessionId;
    }
    return null;
  } catch {
    // Alle Fehler still ignorieren
    return null;
  }
}

// Pageview tracken - komplett still
async function trackPageview(sessionId: string, path: string): Promise<boolean> {
  if (!isAnalyticsEnabled()) return true;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s Timeout

    const response = await fetch("/api/t/pv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, path }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Bei 404 (Session nicht gefunden) - Session-ID löschen
    if (response.status === 404) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
      return false;
    }

    // Bei Erfolg: Timestamp aktualisieren (Session bleibt aktiv)
    if (response.ok) {
      updateSessionTimestamp();
    }

    return response.ok;
  } catch {
    // Alle Fehler still ignorieren (Netzwerk, Timeout, etc.)
    return false;
  }
}

// Event tracken (exportiert für externe Nutzung)
export async function trackEvent(
  eventType: string,
  propertyId?: string
): Promise<void> {
  if (!isAnalyticsEnabled()) return;
  
  try {
    const sessionId = localStorage.getItem(STORAGE_KEY);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    await fetch("/api/t/e", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId || undefined,
        eventType,
        propertyId: propertyId || undefined,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
  } catch {
    // Alle Fehler still ignorieren
  }
}

// Session beenden (beim Tab schließen)
function endSession(): void {
  if (!isAnalyticsEnabled()) return;
  
  try {
    const sessionId = localStorage.getItem(STORAGE_KEY);
    if (sessionId) {
      const blob = new Blob(
        [JSON.stringify({ sessionId, action: "end" })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/t/s/end", blob);
    }
  } catch {
    // Ignorieren
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const initializedRef = useRef(false);
  const lastTrackedPathRef = useRef<string | null>(null);

  // Session initialisieren
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      // Only initialize if consent given - jetzt sicher nach Mount
      if (!isAnalyticsEnabled()) return;
      if (initializedRef.current) return;
      initializedRef.current = true;

      let sessionId = await getOrCreateSessionId();
      if (!isMounted) return;
      sessionIdRef.current = sessionId;

      // Erste Pageview tracken (nur wenn noch nicht getrackt)
      if (sessionId && pathname && pathname !== lastTrackedPathRef.current) {
        lastTrackedPathRef.current = pathname;
        const success = await trackPageview(sessionId, pathname);

        // Falls Session nicht mehr existiert, neue erstellen
        if (!isMounted) return;
        if (!success && !localStorage.getItem(STORAGE_KEY)) {
          sessionId = await getOrCreateSessionId();
          if (!isMounted) return;
          sessionIdRef.current = sessionId;
          if (sessionId && pathname) {
            await trackPageview(sessionId, pathname);
          }
        }
      }
    };

    // Kleines Delay um sicherzustellen dass Cookie-Banner geladen ist
    const initTimeout = setTimeout(() => {
      init();
    }, 100);

    // Listen for consent changes
    const handleConsentChange = () => {
      if (isAnalyticsEnabled() && !initializedRef.current) {
        init();
      }
    };
    window.addEventListener("cookie-consent-changed", handleConsentChange);

    // Session beenden beim Verlassen
    const handleBeforeUnload = () => endSession();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
      window.removeEventListener("cookie-consent-changed", handleConsentChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  // Bei Route-Wechsel neue Pageview tracken
  useEffect(() => {
    if (!initializedRef.current || !sessionIdRef.current) return;

    let isMounted = true;

    // Kleines Delay um sicherzustellen dass die Session initialisiert ist
    const timeout = setTimeout(async () => {
      if (!isMounted) return;

      // Nur tracken wenn sich der Pfad geändert hat
      if (sessionIdRef.current && pathname && pathname !== lastTrackedPathRef.current) {
        lastTrackedPathRef.current = pathname;
        const success = await trackPageview(sessionIdRef.current, pathname);

        // Falls Session nicht mehr existiert, neue erstellen
        if (!isMounted) return;
        if (!success && !localStorage.getItem(STORAGE_KEY)) {
          const newSessionId = await getOrCreateSessionId();
          if (!isMounted) return;
          sessionIdRef.current = newSessionId;
          if (newSessionId && pathname) {
            await trackPageview(newSessionId, pathname);
          }
        }
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [pathname]);

  // Diese Komponente rendert nichts
  return null;
}

