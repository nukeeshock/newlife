"use client";

import Image from "next/image";
import { buttonClasses } from "./ui/button";

interface HeroProps {
  propertyCount: number;
}

export function Hero({ propertyCount }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:min-h-[90vh] md:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_immobilien.jpg"
          alt="Exklusive Immobilien in Vietnam"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/90" />
      </div>

      {/* Decorative Elements - Animated corner accents */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {/* Top-left corner */}
        <div className="animate-drawLineY delay-200 opacity-0-initial absolute left-0 top-0 h-32 w-px origin-top bg-gradient-to-b from-[--primary]/40 to-transparent" />
        <div className="animate-drawLine delay-300 opacity-0-initial absolute left-0 top-0 h-px w-32 origin-left bg-gradient-to-r from-[--primary]/40 to-transparent" />
        {/* Bottom-right corner */}
        <div className="animate-drawLineY delay-400 opacity-0-initial absolute bottom-0 right-0 h-32 w-px origin-bottom bg-gradient-to-t from-[--primary]/40 to-transparent" />
        <div className="animate-drawLine delay-500 opacity-0-initial absolute bottom-0 right-0 h-px w-32 origin-right bg-gradient-to-l from-[--primary]/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="animate-fadeInDown opacity-0-initial mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-[--primary]/70 to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[--primary]">
            New Life Vietnam
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-[--primary]/70 to-transparent" />
        </div>

        {/* Main Headline - Elegant Serif */}
        <h1 className="animate-fadeInUp delay-100 opacity-0-initial font-serif text-5xl font-light leading-[1.1] tracking-tight text-[--accent] md:text-6xl lg:text-7xl xl:text-8xl">
          Ihr neues Kapitel
          <br />
          <span className="italic text-[--primary]">beginnt hier</span>
        </h1>

        {/* Subline */}
        <p className="animate-fadeInUp delay-200 opacity-0-initial mt-8 max-w-2xl text-lg font-medium leading-relaxed text-[--muted] md:text-xl">
          Exklusive Mietobjekte in Vietnam – handverlesen, persönlich vermittelt,
          <br className="hidden md:block" />
          für Menschen, die mehr vom Leben erwarten.
        </p>

        {/* CTA */}
        <div className="animate-fadeInUp delay-300 opacity-0-initial mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/84832114684?text=Ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20exklusiven%20Objekte%20in%20Vietnam."
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({
              variant: "primary",
              className: "min-w-[240px] px-8 py-4 text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
            })}
          >
            Persönliche Beratung anfragen
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="animate-scaleIn delay-400 opacity-0-initial mt-16 flex flex-col items-center gap-6 rounded-sm bg-white/80 px-8 py-4 shadow-sm backdrop-blur-sm sm:flex-row sm:gap-12">
          <div className="flex items-center gap-3 text-sm font-medium text-[--accent]">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="animate-pulse-subtle h-2 w-2 rounded-full bg-[--primary]" />
            </span>
            <span>{propertyCount} Exklusive Objekte</span>
          </div>
          <div className="hidden h-5 w-px bg-[--border] sm:block" />
          <div className="flex items-center gap-3 text-sm font-medium text-[--accent]">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="animate-pulse-subtle h-2 w-2 rounded-full bg-[--primary]" />
            </span>
            <span>Da Nang · Hoi An · Saigon</span>
          </div>
          <div className="hidden h-5 w-px bg-[--border] sm:block" />
          <div className="flex items-center gap-3 text-sm font-medium text-[--accent]">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="animate-pulse-subtle h-2 w-2 rounded-full bg-[--primary]" />
            </span>
            <span>Persönlicher Service</span>
          </div>
        </div>
      </div>
    </section>
  );
}
