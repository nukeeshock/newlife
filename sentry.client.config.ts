import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = "https://11d77422bf34323aa0e848da12aca2fb@o4510467287810048.ingest.de.sentry.io/4510467289251920";

console.log("🔴 Sentry Client Config wird geladen...");
console.log("🔴 DSN:", SENTRY_DSN);

Sentry.init({
  dsn: SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 1.0,

  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Debug nur in Development
  debug: process.env.NODE_ENV === "development",

  // Environment
  environment: process.env.NODE_ENV || "development",

  // Callback wenn initialisiert
  beforeSend(event) {
    console.log("🔴 Sentry sendet Event:", event.event_id);
    if (event.exception?.values?.[0]?.type === "ChunkLoadError") {
      return null;
    }
    return event;
  },
});

console.log("🔴 Sentry initialisiert!");

