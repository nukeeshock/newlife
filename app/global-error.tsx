"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="de">
      <body className="bg-[#F9F9F7] text-[#0A2239]">
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-light">
              Etwas ist schiefgelaufen
            </h1>
            <p className="mt-4 text-[#5A6B7A]">
              Ein unerwarteter Fehler ist aufgetreten.
            </p>
            <button
              onClick={reset}
              className="mt-8 border border-[#B8860B] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wider text-[#B8860B] transition-colors hover:bg-[#B8860B]/10"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}


