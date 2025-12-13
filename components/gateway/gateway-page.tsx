"use client";

import Image from "next/image";
import Link from "next/link";

export function GatewayPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* Background Layer: Best Ager (left side, fades right) - Desktop only */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-center lg:block lg:[mask-image:linear-gradient(to_right,black_0%,black_40%,transparent_55%)]"
        style={{ backgroundImage: "url(/gateway-best-ager.jpg)" }}
      />

      {/* Background Layer: Real Estate (right side, fades left) - Desktop only */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-cover bg-center lg:block lg:[mask-image:linear-gradient(to_left,black_0%,black_40%,transparent_55%)]"
        style={{ backgroundImage: "url(/gateway-realestate.jpg)" }}
      />

      {/* Subtle darkening overlay for text readability - Desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden bg-black/15 lg:block" />

      {/* Central Welcome Overlay - Responsive positioning */}
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Mobile: Text only */}
          <div className="flex flex-col items-center lg:hidden">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 drop-shadow-lg">
              Willkommen bei
            </span>
            <p className="mt-1.5 font-serif text-2xl font-light tracking-[0.15em] text-white drop-shadow-xl">
              <span className="font-medium">NewLife</span> Vietnam
            </p>
          </div>

          {/* Desktop: Logo + Text */}
          <div className="hidden flex-col items-center lg:flex">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-b from-amber-500/30 to-transparent opacity-80 blur-2xl" />
              <Image
                src="/NLV_LOGO_BIG_NOBG.png"
                alt="NewLife Vietnam"
                width={160}
                height={160}
                className="relative h-40 w-40 drop-shadow-2xl transition-transform duration-700"
                priority
              />
            </div>
            <div className="mt-4 flex flex-col items-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/60">
                Willkommen bei
              </span>
              <h1 className="mt-1 font-serif text-2xl font-light tracking-[0.12em] text-white drop-shadow-lg">
                <span className="font-medium">NewLife</span> Vietnam
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Left/Top: Best Ager Residences */}
        <Link
          href="/best-ager-residences"
          className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-end px-6 pb-10 pt-16 sm:pb-14 lg:min-h-screen lg:justify-center lg:px-12 lg:pb-0 lg:pt-0"
        >
          {/* Mobile Background (stacked, not side-by-side) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 lg:hidden"
            style={{ backgroundImage: "url(/gateway-best-ager.jpg)" }}
          >
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Mobile: Section Logo - Larger */}
            <div className="relative mb-5 lg:hidden">
              <div className="absolute -inset-4 rounded-full bg-orange-500/25 blur-xl" />
              <div className="relative rounded-full border border-orange-400/40 bg-zinc-950/60 p-3.5 backdrop-blur-sm">
                <Image
                  src="/NLV_LOGO_BIG_NOBG.png"
                  alt="NewLife Vietnam"
                  width={64}
                  height={64}
                  className="h-14 w-14 drop-shadow-lg sm:h-16 sm:w-16"
                />
              </div>
            </div>

            {/* Label */}
            <span className="inline-block rounded-full border border-orange-400/30 bg-zinc-950/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300 backdrop-blur-sm sm:text-xs">
              Co-Living Konzept
            </span>

            {/* Title */}
            <h2 className="mt-4 font-serif text-3xl font-light text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              Best Ager Residences
            </h2>

            {/* Decorative line */}
            <div className="my-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent sm:my-5" />

            {/* Description */}
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/80 sm:text-base">
              Sicherheit, selbstbestimmtes Leben und gesunde Ernährung in wunderschönen Immobilien
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-3 text-sm font-medium text-orange-300 transition-all duration-500 group-hover:gap-5 sm:mt-8 sm:text-base">
              <span className="border-b border-orange-300/50 pb-0.5 transition-colors group-hover:border-orange-200 group-hover:text-orange-200">
                Entdecken
              </span>
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Center Divider - Desktop Only */}
        <div className="relative z-20 hidden lg:flex lg:items-center">
          <div className="h-1/2 w-px bg-gradient-to-b from-transparent via-amber-500/60 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-2 w-2 rotate-45 bg-amber-500/80" />
          </div>
        </div>

        {/* Right/Bottom: Real Estate */}
        <Link
          href="/immobilien"
          className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-start px-6 pb-16 pt-10 sm:pt-14 lg:min-h-screen lg:justify-center lg:px-12 lg:pb-0 lg:pt-0"
        >
          {/* Mobile Background (stacked, not side-by-side) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 lg:hidden"
            style={{ backgroundImage: "url(/gateway-realestate.jpg)" }}
          >
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Mobile: Section Logo - Larger */}
            <div className="relative mb-5 lg:hidden">
              <div className="absolute -inset-4 rounded-full bg-amber-500/25 blur-xl" />
              <div className="relative rounded-full border border-amber-400/40 bg-zinc-950/60 p-3.5 backdrop-blur-sm">
                <Image
                  src="/NLV_LOGO_BIG_NOBG.png"
                  alt="NewLife Vietnam"
                  width={64}
                  height={64}
                  className="h-14 w-14 drop-shadow-lg sm:h-16 sm:w-16"
                />
              </div>
            </div>

            {/* Label */}
            <span className="inline-block rounded-full border border-amber-400/30 bg-zinc-950/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300 backdrop-blur-sm sm:text-xs">
              Premium Immobilien
            </span>

            {/* Title */}
            <h2 className="mt-4 font-serif text-3xl font-light text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              NLV Real Estate
            </h2>

            {/* Decorative line */}
            <div className="my-4 h-px w-16 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent sm:my-5" />

            {/* Description */}
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/80 sm:text-base">
              Exklusive Villen, Apartments & Residenzen – Ihre Traumimmobilie in Vietnam
            </p>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-3 text-sm font-medium text-amber-300 transition-all duration-500 group-hover:gap-5 sm:mt-8 sm:text-base">
              <span className="border-b border-amber-300/50 pb-0.5 transition-colors group-hover:border-amber-200 group-hover:text-amber-200">
                Entdecken
              </span>
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  );
}
