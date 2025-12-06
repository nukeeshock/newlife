"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "./contact-buttons";

const cityLinks = [
  { href: "/immobilien/stadt/da-nang", label: "Da Nang" },
  { href: "/immobilien/stadt/hoi-an", label: "Hoi An" },
  { href: "/immobilien/stadt/ho-chi-minh", label: "Ho Chi Minh City" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const citiesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (citiesDropdownRef.current && !citiesDropdownRef.current.contains(event.target as Node)) {
        setCitiesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[--border] bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        {/* Logo */}
        <Link href="/immobilien" className="group flex items-center gap-3">
          <Image
            src="/LOGO_NLV.png"
            alt="NLV Logo"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <div className="flex flex-col items-start leading-none">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[--primary]">
              NLV
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[--muted]">
              Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden items-center gap-8 lg:flex">
          {/* Städte Dropdown */}
          <div
            className="relative"
            ref={citiesDropdownRef}
            onMouseEnter={() => setCitiesOpen(true)}
            onMouseLeave={() => setCitiesOpen(false)}
          >
            <button
              type="button"
              className={`flex cursor-pointer items-center gap-1.5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                citiesOpen ? "text-[--primary]" : "text-[--muted] hover:text-[--primary]"
              }`}
            >
              Städte
              <svg
                aria-hidden="true"
                className={`h-3 w-3 transition-transform duration-200 ${citiesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu - pt-2 creates invisible bridge for hover */}
            <div
              className={`absolute left-0 top-full min-w-[180px] pt-2 transition-all duration-200 ${
                citiesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <div className="border border-[--border] bg-white shadow-lg">
                {cityLinks.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    onClick={() => setCitiesOpen(false)}
                    className="block px-5 py-3 text-sm font-medium tracking-wide text-[--text] transition-colors duration-200 hover:bg-[--bg] hover:text-[--primary]"
                  >
                    {city.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Immobilien - Direct Link */}
          <Link
            href="/immobilien/objekte"
            className="py-2 text-sm font-medium tracking-wide text-[--muted] transition-colors duration-300 hover:text-[--primary]"
          >
            Immobilien
          </Link>

          <Link
            href="/immobilien/ueber-uns"
            className="text-sm font-medium tracking-wide text-[--muted] transition-colors duration-300 hover:text-[--primary]"
          >
            Wer wir sind
          </Link>

          <Link
            href="/immobilien/faq"
            className="text-sm font-medium tracking-wide text-[--muted] transition-colors duration-300 hover:text-[--primary]"
          >
            Fragen
          </Link>
        </nav>

        {/* Desktop CTA - Right */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/goldzeit"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-orange-500 transition-colors duration-300 hover:text-orange-400"
          >
            NLV Goldzeit Living
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/immobilien/kontakt"
            className="text-sm font-medium tracking-wide text-[--muted] transition-colors duration-300 hover:text-[--primary]"
          >
            Kontakt
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center text-[--muted] transition-colors hover:text-[--primary] lg:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-px w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-[--border] bg-white/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          mobileOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-8">
          {/* Städte Accordion */}
          <div className="border-b border-[--border]">
            <button
              type="button"
              onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
              className={`flex w-full items-center justify-between py-5 text-base font-medium tracking-wide transition-colors ${
                mobileCitiesOpen ? "text-[--primary]" : "text-[--text] hover:text-[--primary]"
              }`}
            >
              <span className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-[--primary]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Städte
              </span>
              <svg
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-300 ${mobileCitiesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileCitiesOpen ? "max-h-[250px] opacity-100 pb-3" : "max-h-0 opacity-0"
              }`}
            >
              {cityLinks.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileCitiesOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 pl-8 text-sm font-medium tracking-wide text-[--muted] transition-colors hover:text-[--primary]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[--primary]/50" />
                  {city.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Immobilien - Direct Link */}
          <Link
            href="/immobilien/objekte"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 border-b border-[--border] py-5 text-base font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-[--primary]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
            Immobilien
          </Link>

          <Link
            href="/immobilien/ueber-uns"
            onClick={() => setMobileOpen(false)}
            className="border-b border-[--border] py-5 text-base font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
          >
            Wer wir sind
          </Link>

          <Link
            href="/immobilien/faq"
            onClick={() => setMobileOpen(false)}
            className="border-b border-[--border] py-5 text-base font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
          >
            Fragen
          </Link>

          <Link
            href="/immobilien/kontakt"
            onClick={() => setMobileOpen(false)}
            className="border-b border-[--border] py-5 text-base font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
          >
            Kontakt
          </Link>

          {/* Link to Goldzeit */}
          <Link
            href="/goldzeit"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 border border-orange-500/30 bg-orange-500/10 py-4 text-sm font-medium tracking-wide text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            NLV Goldzeit Living
          </Link>

          {/* Messenger Buttons */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center justify-center gap-2 bg-[#25D366] py-4 text-white transition-all hover:scale-105 hover:bg-[#20BD5A] active:scale-95"
            >
              <WhatsAppIcon className="h-6 w-6" />
              <span className="text-xs font-medium">WhatsApp</span>
            </a>
            <a
              href={CONTACT_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center justify-center gap-2 bg-[#00B900] py-4 text-white transition-all hover:scale-105 hover:bg-[#00A000] active:scale-95"
            >
              <LineIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Line</span>
            </a>
            <a
              href={CONTACT_LINKS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex flex-col items-center justify-center gap-2 bg-[#0068FF] py-4 text-white transition-all hover:scale-105 hover:bg-[#0058DD] active:scale-95"
            >
              <ZaloIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Zalo</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
