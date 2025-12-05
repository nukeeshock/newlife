"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/goldzeit", label: "Start" },
  { href: "/goldzeit/konzept", label: "Das Konzept" },
  { href: "/goldzeit/kontakt", label: "Kontakt" },
];

export function GoldzeitHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[--glass-border] bg-[--bg]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        {/* Logo */}
        <Link href="/goldzeit" className="group flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[--primary]">
              NLV Goldzeit
            </span>
            <span className="font-serif text-lg font-light tracking-wide text-[--text]">
              Living
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-[--muted] transition-colors duration-300 hover:text-[--primary]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA - Right */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/immobilien"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[--muted] transition-colors duration-300 hover:text-[--text]"
          >
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            NLV Real Estate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center text-[--muted] transition-colors hover:text-[--primary] lg:hidden"
          aria-label={mobileOpen ? "Menu schliessen" : "Menu oeffnen"}
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
        className={`overflow-hidden border-t border-[--glass-border] bg-[--bg]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-[--glass-border] py-5 text-base font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
            >
              {link.label}
            </Link>
          ))}

          {/* Link to Real Estate */}
          <Link
            href="/immobilien"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 border border-[--glass-border] py-4 text-sm font-medium tracking-wide text-[--muted] transition-colors hover:border-[--primary] hover:text-[--primary]"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            NLV Real Estate
          </Link>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/84832114684"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-3 border border-[--primary] bg-[--primary] py-4 text-base font-medium tracking-wide text-white transition-all hover:bg-transparent hover:text-[--primary]"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}
