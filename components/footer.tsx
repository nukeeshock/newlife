"use client";

import Link from "next/link";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon, EmailIcon } from "./contact-buttons";

export function Footer() {
  return (
    <footer className="bg-[#0A2239] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[--primary]">
                NLV Real
              </span>
              <span className="font-serif text-2xl font-light tracking-wide text-white">
                Estate
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Exklusive Mietobjekte für Menschen,
              die mehr vom Leben erwarten.
            </p>
            <Link
              href="/best-ager-residences"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-orange-400 transition-colors hover:text-orange-300"
            >
              Best Ager Residences
              <svg
                aria-hidden="true"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary]">
              Schnellzugriff
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/immobilien/objekte"
                className="text-white/80 transition-colors hover:text-[--primary]"
              >
                Alle Objekte
              </Link>
              <Link
                href="/immobilien/objekte?type=private_residence"
                className="text-white/80 transition-colors hover:text-[--primary]"
              >
                Residenzen
              </Link>
              <Link
                href="/immobilien/objekte?type=house"
                className="text-white/80 transition-colors hover:text-[--primary]"
              >
                Villen
              </Link>
              <Link
                href="/immobilien/objekte?type=apartment"
                className="text-white/80 transition-colors hover:text-[--primary]"
              >
                Apartments
              </Link>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary]">
              Standorte
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <Link
                href="/immobilien/stadt/da-nang"
                className="transition-colors hover:text-[--primary]"
              >
                Da Nang
              </Link>
              <Link
                href="/immobilien/stadt/hoi-an"
                className="transition-colors hover:text-[--primary]"
              >
                Hoi An
              </Link>
              <Link
                href="/immobilien/stadt/ho-chi-minh"
                className="transition-colors hover:text-[--primary]"
              >
                Ho Chi Minh City
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--primary]">
              Kontakt
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={CONTACT_LINKS.email}
                className="inline-flex items-center gap-2 text-white/80 transition-all hover:text-white hover:scale-105"
              >
                <EmailIcon className="h-4 w-4" />
                E-Mail
              </a>
              <a
                href={CONTACT_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-all hover:text-[#25D366] hover:scale-105"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={CONTACT_LINKS.line}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-all hover:text-[#00B900] hover:scale-105"
              >
                <LineIcon className="h-4 w-4" />
                Line
              </a>
              <a
                href={CONTACT_LINKS.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-all hover:text-[#0068FF] hover:scale-105"
              >
                <ZaloIcon className="h-4 w-4" />
                Zalo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/60" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} NLV Real Estate. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/immobilien/ueber-uns"
              className="text-white/60 transition-colors hover:text-[--primary]"
            >
              Über uns
            </Link>
            <Link
              href="/immobilien/faq"
              className="text-white/60 transition-colors hover:text-[--primary]"
            >
              FAQ
            </Link>
            <Link
              href="/immobilien/impressum"
              className="text-white/60 transition-colors hover:text-[--primary]"
            >
              Impressum
            </Link>
            <Link
              href="/immobilien/datenschutz"
              className="text-white/60 transition-colors hover:text-[--primary]"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
