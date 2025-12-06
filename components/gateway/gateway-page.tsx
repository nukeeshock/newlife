"use client";

import Image from "next/image";
import Link from "next/link";

export function GatewayPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Floating Logo Header */}
      <header className="absolute left-0 right-0 top-0 z-30 flex justify-center px-4 pt-6 sm:pt-8 lg:pt-12">
        <div className="group flex flex-col items-center">
          {/* Logo with glow effect */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-amber-500/30 to-transparent opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
            <Image
              src="/LOGO_NLV.png"
              alt="NewLife Vietnam"
              width={72}
              height={72}
              className="relative h-16 w-16 rounded-full shadow-2xl ring-2 ring-white/20 transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
              priority
            />
          </div>

          {/* Brand Text */}
          <div className="mt-3 flex flex-col items-center sm:mt-4">
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-md sm:text-[10px] sm:tracking-[0.4em]">
              Willkommen bei
            </span>
            <h1 className="mt-1 font-serif text-xl font-normal tracking-[0.08em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-2xl sm:tracking-[0.1em] lg:text-3xl">
              <span className="font-semibold">NewLife</span> Vietnam
            </h1>
          </div>
        </div>
      </header>

      {/* Split Screen Container */}
      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Left: Goldzeit Living */}
        <Link
          href="/goldzeit"
          className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-end px-4 pb-12 pt-40 sm:pb-16 sm:pt-48 lg:min-h-screen lg:justify-center lg:px-8 lg:pb-0 lg:pt-0"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url(/gateway-goldzeit.jpg)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-zinc-950/20 transition-all duration-500 group-hover:via-zinc-950/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon Badge */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/40 bg-zinc-950/60 text-orange-400 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-orange-400/60 group-hover:bg-orange-500/20 sm:mb-6 sm:h-14 sm:w-14">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>

            {/* Label */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-orange-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-xs sm:tracking-[0.3em]">
              Co-Living Konzept
            </span>

            {/* Title */}
            <h2 className="mt-2 font-serif text-2xl font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:mt-3 sm:text-3xl lg:text-4xl">
              Goldzeit Living
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-[280px] text-sm font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:mt-4 sm:max-w-xs sm:text-base">
              Pool-Villen, Gemeinschaft, Vollpension - Das Co-Living Konzept für Best Ager
            </p>

            {/* CTA */}
            <div className="mt-6 inline-flex items-center gap-2 border-b-2 border-orange-300/80 pb-1 text-sm font-bold text-orange-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:gap-4 group-hover:border-orange-200 group-hover:text-orange-200 sm:mt-8 sm:text-base">
              <span>Entdecken</span>
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Center Divider */}
        <div className="relative z-20 hidden lg:flex lg:items-center">
          {/* Vertical Gold Line */}
          <div className="h-2/3 w-px bg-gradient-to-b from-transparent via-amber-600/60 to-transparent" />

          {/* Center Diamond */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-2 w-2 rotate-45 bg-amber-600/80" />
          </div>
        </div>

        {/* Mobile Divider */}
        <div className="relative z-20 flex items-center justify-center py-2 lg:hidden">
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
          <div className="mx-4 h-1.5 w-1.5 rotate-45 bg-amber-600/80" />
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
        </div>

        {/* Right: Real Estate */}
        <Link
          href="/immobilien"
          className="group relative flex min-h-[50vh] flex-1 flex-col items-center justify-end px-4 pb-12 sm:pb-16 lg:min-h-screen lg:justify-center lg:px-8 lg:pb-0"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url(/gateway-realestate.jpg)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-zinc-950/20 transition-all duration-500 group-hover:via-zinc-950/30" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon Badge */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-zinc-950/60 text-amber-400 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-amber-400/60 group-hover:bg-amber-500/20 sm:mb-6 sm:h-14 sm:w-14">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>

            {/* Label */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-xs sm:tracking-[0.3em]">
              Premium Immobilien
            </span>

            {/* Title */}
            <h2 className="mt-2 font-serif text-2xl font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:mt-3 sm:text-3xl lg:text-4xl">
              NLV Real Estate
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-[280px] text-sm font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:mt-4 sm:max-w-xs sm:text-base">
              Exklusive Villen, Apartments & Residenzen - Ihre Traumimmobilie in Vietnam
            </p>

            {/* CTA */}
            <div className="mt-6 inline-flex items-center gap-2 border-b-2 border-amber-300/80 pb-1 text-sm font-bold text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:gap-4 group-hover:border-amber-200 group-hover:text-amber-200 sm:mt-8 sm:text-base">
              <span>Entdecken</span>
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-gradient-to-r from-orange-500/0 via-amber-600/40 to-amber-500/0" />
    </div>
  );
}
