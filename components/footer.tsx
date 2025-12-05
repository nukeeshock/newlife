import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#8B7355] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
                NLV Real
              </span>
              <span className="font-serif text-xl font-light tracking-wide text-white">
                Estate
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/80">
              Exklusive Mietobjekte fuer Menschen,
              die mehr vom Leben erwarten.
            </p>
            <Link
              href="/goldzeit"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#D4AF37] transition-colors hover:text-white"
            >
              NLV Goldzeit Living
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
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Navigation
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                Startseite
              </Link>
              <Link
                href="/immobilien"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                Alle Immobilien
              </Link>
              <Link
                href="/immobilien/ueber-uns"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                Ueber uns
              </Link>
              <Link
                href="/immobilien/faq"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Kontakt */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:contact@newlifevietnam.com"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                contact@newlifevietnam.com
              </a>
              <a
                href="tel:+4915112345678"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                +49 151 123 456 78
              </a>
              <a
                href="https://wa.me/4915112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                WhatsApp
              </a>
            </div>

            {/* Standorte */}
            <h4 className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Standorte
            </h4>
            <div className="flex flex-col gap-1 text-sm text-white/90">
              <span>Da Nang</span>
              <span>Hoi An</span>
              <span>Ho Chi Minh City</span>
            </div>
          </div>

          {/* Rechtliches */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Rechtliches
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/immobilien/impressum"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                Impressum
              </Link>
              <Link
                href="/immobilien/datenschutz"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                Datenschutz
              </Link>
              <Link
                href="/immobilien/kontakt"
                className="text-white/90 transition-colors hover:text-[#D4AF37]"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-xs text-white/60">
            &copy; {new Date().getFullYear()} NLV Real Estate. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
