"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/type/private_residence", label: "Residenzen" },
  { href: "/type/house", label: "Villen" },
  { href: "/type/apartment", label: "Apartments" },
  { href: "/type/commercial", label: "Gewerbeflächen" },
];

export function Header() {
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
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[--primary]">
              New Life
            </span>
            <span className="font-serif text-lg font-light tracking-wide text-[--text]">
              Vietnam
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
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/kontakt"
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
        className={`overflow-hidden border-t border-[--glass-border] bg-[--bg]/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-6 md:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-[--glass-border] py-4 text-sm font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setMobileOpen(false)}
            className="border-b border-[--glass-border] py-4 text-sm font-medium tracking-wide text-[--text] transition-colors hover:text-[--primary]"
          >
            Kontakt
          </Link>
          <a
            href="https://wa.me/4915112345678"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center border border-[--primary] bg-transparent py-4 text-sm font-medium tracking-wide text-[--primary] transition-colors hover:bg-[--primary] hover:text-[--bg]"
          >
            WhatsApp Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}
