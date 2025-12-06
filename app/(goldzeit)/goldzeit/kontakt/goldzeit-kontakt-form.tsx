"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "@/components/contact-buttons";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  privacy?: string;
  general?: string;
}

export function GoldzeitKontaktForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "single",
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
      // Erstelle spezielle Nachricht für Goldzeit
      const goldzeitMessage = `[NLV GOLDZEIT LIVING ANFRAGE]

Interesse an: ${formData.interest === "single" ? "Einzelzimmer (1.399 EUR)" : formData.interest === "couple" ? "Paar-Zimmer (999 EUR p.P.)" : "Allgemeine Frage"}

Nachricht:
${formData.message}`;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: goldzeitMessage,
        }),
      });

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch {
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
        interest: "single",
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
    <div className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Kontakt
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
            Interesse <span className="italic text-[--primary]">geweckt?</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[--muted]">
            Fordern Sie unverbindlich weitere Informationen zu unserem
            Goldzeit Living Konzept an. Wir beraten Sie gerne.
          </p>
        </div>

        {/* Messenger Buttons - Prominent */}
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="mb-6 text-center font-serif text-2xl font-light text-[--text]">
            Schreiben Sie uns direkt
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent("Hallo, ich interessiere mich für das Goldzeit Living Konzept.")}`}
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

        {/* Form */}
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
                Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns
                schnellstmöglich bei Ihnen mit weiteren Informationen.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 border border-[--glass-border] px-4 py-2 text-sm text-[--text] transition-colors hover:border-[--primary] hover:text-[--primary]"
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

              {/* Honeypot */}
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

              {/* Interest Select */}
              <div>
                <label
                  htmlFor="interest"
                  className="mb-2 block text-sm text-[--muted]"
                >
                  Interesse an
                </label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="w-full appearance-none border border-[--glass-border] bg-[--surface] px-4 py-3 text-[--text] outline-none transition-colors focus:border-[--primary]"
                >
                  <option value="single">Einzelzimmer (1.399 EUR/Monat)</option>
                  <option value="couple">Paar-Zimmer (999 EUR p.P./Monat)</option>
                  <option value="general">Allgemeine Frage</option>
                </select>
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
                  placeholder="Erzählen Sie uns von Ihren Wünschen und stellen Sie Ihre Fragen..."
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
                className="w-full bg-[--primary] py-4 font-bold text-white transition-all hover:bg-[--primary-hover] disabled:opacity-50"
              >
                {status === "submitting" ? "Wird gesendet..." : "Kostenlose Beratung anfordern"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
