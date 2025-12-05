"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "nlv_cookie_consent";

export type ConsentStatus = "pending" | "accepted" | "rejected";

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === "accepted") return "accepted";
  if (consent === "rejected") return "rejected";
  return "pending";
}

export function hasAnalyticsConsent(): boolean {
  return getConsentStatus() === "accepted";
}

export function CookieBanner() {
  const [state, setState] = useState<{ mounted: boolean; visible: boolean }>({
    mounted: false,
    visible: false,
  });

  useEffect(() => {
    const consent = getConsentStatus();
    setState({
      mounted: true,
      visible: consent === "pending",
    });
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setState((prev) => ({ ...prev, visible: false }));
    // Dispatch event so analytics can start tracking
    window.dispatchEvent(new CustomEvent("cookie-consent-changed"));
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setState((prev) => ({ ...prev, visible: false }));
    window.dispatchEvent(new CustomEvent("cookie-consent-changed"));
  };

  // Don't render on server or if consent already given
  if (!state.mounted || !state.visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] p-4 md:p-6">
      <div className="mx-auto max-w-3xl border border-zinc-700/50 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          {/* Text */}
          <div className="flex-1">
            <h3 className="font-serif text-lg font-light text-white">
              Cookie-Einstellungen
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Wir verwenden Cookies, um unsere Website zu verbessern und
              anonyme Nutzungsstatistiken zu erheben. Sie können selbst
              entscheiden, ob Sie Cookies zulassen möchten.{" "}
              <Link
                href="/immobilien/datenschutz"
                className="text-[#D4AF37] underline-offset-2 transition-colors hover:underline"
              >
                Mehr erfahren
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
            <button
              onClick={handleReject}
              className="whitespace-nowrap border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Nur notwendige
            </button>
            <button
              onClick={handleAccept}
              className="whitespace-nowrap border border-[#D4AF37] bg-[#D4AF37] px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-[#C4A030]"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
