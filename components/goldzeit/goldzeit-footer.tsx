import Link from "next/link";

export function GoldzeitFooter() {
  return (
    <footer className="bg-[#0A2239] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-orange-400">
                NLV Goldzeit
              </span>
              <span className="font-serif text-2xl font-light tracking-wide text-white">
                Living
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
                href="/goldzeit"
                className="text-white/80 transition-colors hover:text-orange-400"
              >
                Start
              </Link>
              <Link
                href="/goldzeit/konzept"
                className="text-white/80 transition-colors hover:text-orange-400"
              >
                Das Konzept
              </Link>
              <Link
                href="/goldzeit/kontakt"
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
                href="mailto:contact@newlifevietnam.de"
                className="text-white/80 transition-colors hover:text-orange-400"
              >
                contact@newlifevietnam.de
              </a>
              <a
                href="https://wa.me/84832114684"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-orange-400"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
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
            &copy; {new Date().getFullYear()} NLV Goldzeit Living. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/immobilien/impressum"
              className="text-white/60 transition-colors hover:text-orange-400"
            >
              Impressum
            </Link>
            <Link
              href="/immobilien/datenschutz"
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
