"use client";

import { useState } from "react";
import Link from "next/link";

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

        {/* Divider */}
        <div className="mx-auto my-16 max-w-xs">
          <div className="divider-gold" />
        </div>

        {/* Form */}
        <div className="mx-auto max-w-2xl">
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

          {/* Alternative Contact */}
          <div className="mt-8 border-t border-[--glass-border] pt-8">
            <p className="text-sm text-[--muted]">
              Lieber direkt? Schreiben Sie uns auf WhatsApp:
            </p>
            <a
              href="https://wa.me/84832114684?text=Hallo,%20ich%20interessiere%20mich%20für%20das%20Goldzeit%20Living%20Konzept."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 border border-[--glass-border] px-4 py-2 text-sm text-[--text] transition-colors hover:border-[--primary] hover:text-[--primary]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Chat starten
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
