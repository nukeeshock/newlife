"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-light text-[--text]">
          Etwas ist schiefgelaufen
        </h1>
        <p className="mt-4 text-[--muted]">
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="border border-[--primary] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wider text-[--primary] transition-colors hover:bg-[--primary]/10"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="border border-[--glass-border] bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wider text-[--muted] transition-colors hover:text-[--text]"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

