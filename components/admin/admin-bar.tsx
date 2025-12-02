"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";

export function AdminBar() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[--primary]/30 bg-[--bg]/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 md:px-8">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[--primary]">Admin-Modus</span>
          </div>
          <div className="h-4 w-px bg-[--glass-border]" />
          <Link
            href="/admin"
            className="text-[--muted] transition-colors hover:text-[--primary]"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/analytics"
            className="text-[--muted] transition-colors hover:text-[--primary]"
          >
            Analytics
          </Link>
        </div>
        <button
          onClick={logout}
          className="text-sm text-[--muted] transition-colors hover:text-[--primary]"
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}

