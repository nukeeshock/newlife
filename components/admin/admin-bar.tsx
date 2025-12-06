"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminBar() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();

  if (isLoading || !isAuthenticated) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="relative">
        {/* Main bar */}
        <div className="relative flex items-center gap-1 rounded-full border-2 border-[#c9a962] bg-[#1a1a1f] px-2 py-2 shadow-2xl shadow-black/80">
          {/* Status indicator */}
          <div className="flex items-center gap-2 rounded-full bg-[#c9a962]/20 px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-[#c9a962]">
              Admin
            </span>
          </div>

          {/* Divider */}
          <div className="mx-2 h-6 w-px bg-white/30" />

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              href="/admin"
              className={`group relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                isActive("/admin")
                  ? "bg-[#c9a962] text-black"
                  : "border border-white/30 bg-white/20 text-white hover:border-[#c9a962] hover:bg-[#c9a962]/40 hover:text-[#c9a962]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                Dashboard
              </span>
            </Link>

            <Link
              href="/admin/analytics"
              className={`group relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                isActive("/admin/analytics")
                  ? "bg-[#c9a962] text-black"
                  : "border border-white/30 bg-white/20 text-white hover:border-[#c9a962] hover:bg-[#c9a962]/40 hover:text-[#c9a962]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                Analytics
              </span>
            </Link>

            <Link
              href="/admin/users"
              className={`group relative rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                isActive("/admin/users")
                  ? "bg-[#c9a962] text-black"
                  : "border border-white/30 bg-white/20 text-white hover:border-[#c9a962] hover:bg-[#c9a962]/40 hover:text-[#c9a962]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                Benutzer
              </span>
            </Link>
          </nav>

          {/* Divider */}
          <div className="mx-2 h-6 w-px bg-white/30" />

          {/* Logout */}
          <button
            onClick={logout}
            className="group flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-bold text-white transition-all duration-200 hover:border-red-400 hover:bg-red-500/40 hover:text-red-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>
      </div>
    </div>
  );
}
