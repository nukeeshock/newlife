"use client";

import { buttonClasses } from "./ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 md:min-h-[90vh] md:px-8">
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle corner accents */}
        <div className="absolute left-0 top-0 h-32 w-px bg-gradient-to-b from-[--primary]/30 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-[--primary]/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-32 w-px bg-gradient-to-t from-[--primary]/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-px w-32 bg-gradient-to-l from-[--primary]/30 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-[--primary]/60 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            New Life Vietnam
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-[--primary]/60 to-transparent" />
        </div>

        {/* Main Headline - Elegant Serif */}
        <h1 className="font-serif text-5xl font-light leading-[1.1] tracking-tight text-[--text] md:text-6xl lg:text-7xl xl:text-8xl">
          Ihr neues Kapitel
          <br />
          <span className="italic text-[--primary]">beginnt hier</span>
        </h1>

        {/* Subline */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[--muted] md:text-xl">
          Exklusive Mietobjekte in Vietnam – handverlesen, persönlich vermittelt,
          <br className="hidden md:block" />
          für Menschen, die mehr vom Leben erwarten.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/4915112345678?text=Ich%20interessiere%20mich%20für%20Ihre%20exklusiven%20Objekte%20in%20Vietnam."
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({
              variant: "primary",
              className: "min-w-[240px] px-8 py-4 text-base",
            })}
          >
            Persönliche Beratung anfragen
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
          <div className="flex items-center gap-3 text-sm text-[--muted]">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
            </span>
            <span>12 Exklusive Objekte</span>
          </div>
          <div className="hidden h-4 w-px bg-[--border] sm:block" />
          <div className="flex items-center gap-3 text-sm text-[--muted]">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
            </span>
            <span>Da Nang · Hoi An · Saigon</span>
          </div>
          <div className="hidden h-4 w-px bg-[--border] sm:block" />
          <div className="flex items-center gap-3 text-sm text-[--muted]">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
            </span>
            <span>Persönlicher Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
