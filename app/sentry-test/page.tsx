"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  const throwError = () => {
    throw new Error("Sentry Frontend Test Error!");
  };

  const captureMessage = () => {
    Sentry.captureMessage("Test Message von der Test-Seite");
    alert("Message gesendet! Check Sentry Dashboard.");
  };

  const captureException = () => {
    try {
      throw new Error("Manueller Test Error");
    } catch (e) {
      Sentry.captureException(e);
      alert("Exception gesendet! Check Sentry Dashboard.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-serif text-3xl text-[--text]">Sentry Test Page</h1>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={captureMessage}
          className="border border-[--primary] px-6 py-3 text-[--primary] hover:bg-[--primary]/10"
        >
          Send Test Message
        </button>
        
        <button
          onClick={captureException}
          className="border border-yellow-500 px-6 py-3 text-yellow-500 hover:bg-yellow-500/10"
        >
          Capture Exception
        </button>
        
        <button
          onClick={throwError}
          className="border border-red-500 px-6 py-3 text-red-500 hover:bg-red-500/10"
        >
          Throw Unhandled Error (crashes page)
        </button>
      </div>

      <p className="mt-8 text-sm text-[--muted]">
        DSN: {process.env.NEXT_PUBLIC_SENTRY_DSN ? "✅ Loaded" : "❌ Not loaded"}
      </p>
    </div>
  );
}


