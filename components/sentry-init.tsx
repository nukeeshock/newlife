"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

let initialized = false;

export function SentryInit() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    if (!SENTRY_DSN && process.env.NODE_ENV === "production") {
      console.error("Sentry DSN not found");
      return;
    }

    Sentry.init({
      dsn: SENTRY_DSN,
      tunnel: "/api/monitoring", // Umgeht Ad-Blocker
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      environment: process.env.NODE_ENV || "development",
    });
  }, []);

  return null;
}

