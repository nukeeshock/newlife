import Link from "next/link";

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
              href="/goldzeit"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-orange-400 transition-colors hover:text-orange-300"
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
                href="mailto:contact@newlifevietnam.com"
                className="text-white/80 transition-colors hover:text-[--primary]"
              >
                contact@newlifevietnam.com
              </a>
              <a
                href="https://wa.me/84832114684"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-[--primary]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/60">
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
