"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = "https://11d77422bf34323aa0e848da12aca2fb@o4510467287810048.ingest.de.sentry.io/4510467289251920";

let initialized = false;

export function SentryInit() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    Sentry.init({
      dsn: SENTRY_DSN,
      tunnel: "/api/monitoring", // Umgeht Ad-Blocker
      tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
      environment: process.env.NODE_ENV || "development",
    });
  }, []);

  return null;
}

