"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login fehlgeschlagen");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Ein Fehler ist aufgetreten");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-900/20 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <div className="mb-8 text-center animate-[fadeIn_0.6s_ease-out]">
          <Link href="/" className="group inline-block">
            <div className="relative mx-auto mb-6 h-20 w-20">
              {/* Logo glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-500/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/LOGO_NLV.png"
                alt="NewLife Vietnam"
                width={80}
                height={80}
                className="relative h-full w-full rounded-full ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Decorative line */}
          <div className="mx-auto mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600/50" />
            <div className="h-1 w-1 rotate-45 bg-amber-600/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>

          <h1 className="font-serif text-2xl font-light tracking-wide text-white">
            Admin Portal
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Nur für autorisierte Mitarbeiter
          </p>
        </div>

        {/* Login Card */}
        <div className="animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
          <div className="relative overflow-hidden rounded-sm border border-white/[0.08] bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm">
            {/* Card top accent */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 rounded-sm border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="group space-y-2">
                <label
                  htmlFor="email"
                  className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    focused === "email" ? "text-amber-500" : "text-zinc-500"
                  }`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-Mail
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="admin@newlifevietnam.de"
                    required
                    className="w-full border-0 border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-base text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-amber-500/50"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 ${
                      focused === "email" ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group space-y-2">
                <label
                  htmlFor="password"
                  className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    focused === "password" ? "text-amber-500" : "text-zinc-500"
                  }`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Passwort
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••••••"
                    required
                    className="w-full border-0 border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-base text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-amber-500/50"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 ${
                      focused === "password" ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-8 w-full overflow-hidden rounded-sm bg-gradient-to-r from-amber-600 to-amber-700 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-amber-900/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird geprüft...
                    </>
                  ) : (
                    <>
                      Anmelden
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Card bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center animate-[fadeIn_0.6s_ease-out_0.3s_both]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors duration-300 hover:text-amber-500"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </Link>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 animate-[fadeIn_0.6s_ease-out_0.4s_both]">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          SSL-verschlüsselte Verbindung
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
