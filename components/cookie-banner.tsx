"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

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
      <div className="mx-auto max-w-3xl border border-[--glass-border] bg-[--card]/95 p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          {/* Text */}
          <div className="flex-1">
            <h3 className="font-serif text-lg font-light text-[--text]">
              Cookie-Einstellungen
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[--muted]">
              Wir verwenden Cookies, um unsere Website zu verbessern und
              anonyme Nutzungsstatistiken zu erheben. Sie können selbst
              entscheiden, ob Sie Cookies zulassen möchten.{" "}
              <Link
                href="/immobilien/datenschutz"
                className="text-[--primary] underline-offset-2 transition-colors hover:underline"
              >
                Mehr erfahren
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
            <button
              onClick={handleReject}
              className={buttonClasses({
                variant: "ghost",
                className: "whitespace-nowrap text-sm",
              })}
            >
              Nur notwendige
            </button>
            <button
              onClick={handleAccept}
              className={buttonClasses({
                variant: "primary",
                className: "whitespace-nowrap text-sm",
              })}
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
