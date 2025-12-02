"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "nlv_session_id";

// Analytics komplett still - keine Fehler werfen
const ANALYTICS_ENABLED = true;

// Session ID aus localStorage holen oder neue erstellen
async function getOrCreateSessionId(): Promise<string | null> {
  if (!ANALYTICS_ENABLED) return null;
  
  try {
    // Prüfen ob localStorage verfügbar ist
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    // Prüfen ob bereits eine Session existiert
    const existingId = localStorage.getItem(STORAGE_KEY);
    if (existingId) {
      // Prüfen ob Session noch gültig ist (schneller HEAD-Request)
      try {
        const checkResponse = await fetch("/api/t/pv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: existingId, path: "/" }),
        });
        
        if (checkResponse.status === 404) {
          // Session existiert nicht mehr - löschen und neue erstellen
          localStorage.removeItem(STORAGE_KEY);
        } else {
          return existingId;
        }
      } catch {
        // Bei Fehler trotzdem die alte ID verwenden
        return existingId;
      }
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
  if (!ANALYTICS_ENABLED) return true;
  
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
      return false;
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
  if (!ANALYTICS_ENABLED) return;
  
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
  if (!ANALYTICS_ENABLED) return;
  
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

  // Session initialisieren
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const init = async () => {
      let sessionId = await getOrCreateSessionId();
      sessionIdRef.current = sessionId;

      // Erste Pageview tracken
      if (sessionId && pathname) {
        const success = await trackPageview(sessionId, pathname);
        
        // Falls Session nicht mehr existiert, neue erstellen
        if (!success && !localStorage.getItem(STORAGE_KEY)) {
          sessionId = await getOrCreateSessionId();
          sessionIdRef.current = sessionId;
          if (sessionId && pathname) {
            await trackPageview(sessionId, pathname);
          }
        }
      }
    };

    init();

    // Session beenden beim Verlassen
    const handleBeforeUnload = () => endSession();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Bei Route-Wechsel neue Pageview tracken
  useEffect(() => {
    if (!initializedRef.current || !sessionIdRef.current) return;
    
    // Kleines Delay um sicherzustellen dass die Session initialisiert ist
    const timeout = setTimeout(async () => {
      if (sessionIdRef.current && pathname) {
        const success = await trackPageview(sessionIdRef.current, pathname);
        
        // Falls Session nicht mehr existiert, neue erstellen
        if (!success && !localStorage.getItem(STORAGE_KEY)) {
          const newSessionId = await getOrCreateSessionId();
          sessionIdRef.current = newSessionId;
          if (newSessionId && pathname) {
            await trackPageview(newSessionId, pathname);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Diese Komponente rendert nichts
  return null;
}

