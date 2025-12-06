"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "@/components/contact-buttons";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  privacy?: string;
  general?: string;
}

export function KontaktForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
    website: "", // Honeypot
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side Validierung
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name ist erforderlich";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Nachricht ist erforderlich";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Nachricht muss mindestens 10 Zeichen lang sein";
    }
    if (!formData.privacy) {
      newErrors.privacy = "Bitte akzeptieren Sie die Datenschutzerklärung";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch {
          // Server gab kein JSON zurück (z.B. 502 HTML-Seite)
          setErrors({
            general: `Server-Fehler (${response.status}). Bitte versuchen Sie es später erneut.`,
          });
          setStatus("error");
          return;
        }

        if (data.code === "VALIDATION_ERROR" && data.details) {
          setErrors({ general: data.details.join(", ") });
        } else if (data.code === "RATE_LIMIT_EXCEEDED") {
          setErrors({
            general: "Zu viele Anfragen. Bitte warten Sie eine Stunde.",
          });
        } else {
          setErrors({
            general: data.error || "Ein Fehler ist aufgetreten",
          });
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
        website: "",
      });
    } catch {
      setErrors({
        general: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      });
      setStatus("error");
    }
  };

  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Kontakt
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
            Sprechen Sie mit <span className="italic text-[--primary]">uns</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[--muted]">
            Ob Sie eine konkrete Immobilie im Blick haben oder erst einmal Ihre
            Möglichkeiten erkunden möchten – wir sind für Sie da.
          </p>
        </div>

        {/* Messenger Buttons - Prominent */}
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="mb-6 text-center font-serif text-2xl font-light text-[--text]">
            Schreiben Sie uns direkt
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent("Hallo, ich interessiere mich für Ihre Immobilien in Vietnam.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 bg-[#25D366] py-8 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] active:scale-95"
            >
              <WhatsAppIcon className="h-10 w-10" />
              <span className="text-lg font-semibold">WhatsApp</span>
            </a>
            <a
              href={CONTACT_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 bg-[#00B900] py-8 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#00A000] active:scale-95"
            >
              <LineIcon className="h-10 w-10" />
              <span className="text-lg font-semibold">Line</span>
            </a>
            <a
              href={CONTACT_LINKS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 bg-[#0068FF] py-8 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0058DD] active:scale-95"
            >
              <ZaloIcon className="h-10 w-10" />
              <span className="text-lg font-semibold">Zalo</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto my-16 max-w-xs">
          <div className="divider-gold" />
        </div>

        {/* Main Content - Centered Form */}
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
            Oder per Kontaktformular
          </h2>

          {status === "success" ? (
            <div className="border border-emerald-500/30 bg-emerald-500/10 p-6">
              <h3 className="font-serif text-xl font-light text-emerald-400">
                Vielen Dank!
              </h3>
              <p className="mt-2 text-sm text-[--muted]">
                Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns
                schnellstmöglich bei Ihnen.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className={buttonClasses({
                  variant: "ghost",
                  className: "mt-4 text-sm",
                })}
              >
                Weitere Nachricht senden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.general && (
                <div className="border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {errors.general}
                </div>
              )}

              {/* Honeypot - unsichtbar für echte User, Bots füllen es aus */}
              <div
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-[--muted]"
                >
                  Name <span className="text-[--primary]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full border bg-[--surface] px-4 py-3 text-[--text] placeholder-[--muted]/50 outline-none transition-colors focus:border-[--primary] ${
                    errors.name
                      ? "border-red-500"
                      : "border-[--glass-border]"
                  }`}
                  placeholder="Ihr vollständiger Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-[--muted]"
                >
                  E-Mail <span className="text-[--primary]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full border bg-[--surface] px-4 py-3 text-[--text] placeholder-[--muted]/50 outline-none transition-colors focus:border-[--primary] ${
                    errors.email
                      ? "border-red-500"
                      : "border-[--glass-border]"
                  }`}
                  placeholder="ihre@email.de"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm text-[--muted]"
                >
                  Telefon <span className="text-[--muted]/50">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-[--glass-border] bg-[--surface] px-4 py-3 text-[--text] placeholder-[--muted]/50 outline-none transition-colors focus:border-[--primary]"
                  placeholder="+49 123 456789"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm text-[--muted]"
                >
                  Nachricht <span className="text-[--primary]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full resize-none border bg-[--surface] px-4 py-3 text-[--text] placeholder-[--muted]/50 outline-none transition-colors focus:border-[--primary] ${
                    errors.message
                      ? "border-red-500"
                      : "border-[--glass-border]"
                  }`}
                  placeholder="Erzählen Sie uns von Ihren Wünschen und Vorstellungen..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) =>
                      setFormData({ ...formData, privacy: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 cursor-pointer accent-[--primary]"
                  />
                  <span className="text-sm text-[--muted]">
                    Ich habe die{" "}
                    <Link
                      href="/immobilien/datenschutz"
                      className="text-[--primary] underline-offset-2 hover:underline"
                    >
                      Datenschutzerklärung
                    </Link>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zu.{" "}
                    <span className="text-[--primary]">*</span>
                  </span>
                </label>
                {errors.privacy && (
                  <p className="mt-1 text-sm text-red-400">{errors.privacy}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className={buttonClasses({
                  variant: "primary",
                  fullWidth: true,
                  className: "py-3",
                })}
              >
                {status === "submitting" ? "Wird gesendet..." : "Nachricht senden"}
              </button>
            </form>
          )}

        </div>

        {/* Trust Badges */}
        <div className="mx-auto mt-16 max-w-2xl border border-[--glass-border] bg-[--glass] p-8 text-center">
          <h3 className="font-serif text-xl font-light text-[--text]">
            Persönliche Beratung
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[--muted]">
            Wir nehmen uns Zeit für Sie. Erzählen Sie uns von Ihren Vorstellungen,
            Ihrem Budget und Ihrem Zeitrahmen – wir finden das passende Objekt für Sie.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-[--muted]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
              Diskret & vertraulich
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
              Keine Verpflichtungen
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
              Deutsch & Englisch
            </span>
          </div>
        </div>

        {/* Link to FAQ */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-[--muted]">
            Haben Sie Fragen zu Vietnam, Visa oder Immobilienkauf?{" "}
            <Link
              href="/immobilien/faq"
              className="text-[--primary] underline-offset-2 hover:underline"
            >
              Besuchen Sie unsere FAQ-Seite
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
