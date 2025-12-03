import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
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

    // Filter uninteressante Errors
    beforeSend(event) {
      if (event.exception?.values?.[0]?.type === "ChunkLoadError") {
        return null;
      }
      return event;
    },
  });
}
