"use client";

import Link from "next/link";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon, EmailIcon } from "@/components/contact-buttons";

export function BestAgerFooter() {
  return (
    <footer className="bg-[#0A2239] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-orange-400">
                Best Ager
              </span>
              <span className="font-serif text-2xl font-light tracking-wide text-white">
                Residences
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Gemeinsam leben in Vietnam.
              Das exklusive Co-Living Konzept für Best Ager.
            </p>
            <Link
              href="/immobilien"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[--primary] transition-colors hover:text-[--primary]/80"
            >
              NLV Real Estate
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

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Navigation
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/best-ager-residences"
                className="text-white/80 transition-colors hover:text-orange-400"
              >
                Start
              </Link>
              <Link
                href="/best-ager-residences/konzept"
                className="text-white/80 transition-colors hover:text-orange-400"
              >
                Das Konzept
              </Link>
              <Link
                href="/best-ager-residences/kontakt"
                className="text-white/80 transition-colors hover:text-orange-400"
              >
                Kontakt
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
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

          {/* Weitere Angebote */}
          <div className="space-y-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Weitere Angebote
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/immobilien"
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-orange-400"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
                NLV Real Estate
              </Link>
              <Link
                href="/"
                className="text-white/60 transition-colors hover:text-orange-400"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Best Ager Residences. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/best-ager-residences/impressum"
              className="text-white/60 transition-colors hover:text-orange-400"
            >
              Impressum
            </Link>
            <Link
              href="/best-ager-residences/datenschutz"
              className="text-white/60 transition-colors hover:text-orange-400"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
