"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonClasses } from "@/components/ui/button";

// Temporäre Admin-Credentials (später durch echte Auth ersetzen)
const ADMIN_CREDENTIALS = {
  email: "mauricebeaujean@web.de",
  password: "Passwort123123",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulierte Verzögerung
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Login erfolgreich - später durch echte Session ersetzen
      localStorage.setItem("nlv_admin_logged_in", "true");
      router.push("/");
    } else {
      setError("E-Mail oder Passwort falsch.");
    }

    setLoading(false);
  };

  const inputClasses =
    "w-full bg-[--surface] border border-[--glass-border] px-4 py-4 text-base text-[--text] outline-none transition-all focus:border-[--primary]/50 placeholder:text-[--muted]/60";

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block">
            <div className="flex flex-col items-center leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[--primary]">
                New Life
              </span>
              <span className="font-serif text-2xl font-light tracking-wide text-[--text]">
                Vietnam
              </span>
            </div>
          </Link>
          <h1 className="mt-8 font-serif text-3xl font-light text-[--text]">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-[--muted]">
            Nur für autorisierte Mitarbeiter
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-[--glass-border] bg-[--card] p-8">
            <div className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]"
                >
                  E-Mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className={inputClasses}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]"
                >
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={buttonClasses({
                variant: "primary",
                fullWidth: true,
                className: `mt-8 py-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`,
              })}
            >
              {loading ? "Wird geprüft..." : "Anmelden"}
            </button>
          </div>
        </form>

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm text-[--muted] transition-colors hover:text-[--primary]"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
