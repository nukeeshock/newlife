import Link from "next/link";

export function GoldzeitFooter() {
  return (
    <footer className="border-t border-[--glass-border] bg-[--bg]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[--primary]">
                NLV Goldzeit
              </span>
              <span className="font-serif text-xl font-light tracking-wide text-[--text]">
                Living
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[--muted]">
              Gemeinsam leben in Vietnam.
              Das exklusive Co-Living Konzept fuer Best Ager.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
              Navigation
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[--text]">
              <Link
                href="/goldzeit"
                className="transition-colors hover:text-[--primary]"
              >
                Start
              </Link>
              <Link
                href="/goldzeit/konzept"
                className="transition-colors hover:text-[--primary]"
              >
                Das Konzept
              </Link>
              <Link
                href="/goldzeit/kontakt"
                className="transition-colors hover:text-[--primary]"
              >
                Kontakt
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[--text]">
              <a
                href="mailto:goldzeit@newlifevietnam.com"
                className="transition-colors hover:text-[--primary]"
              >
                goldzeit@newlifevietnam.com
              </a>
              <a
                href="https://wa.me/4915112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[--primary]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* NLV Real Estate Link */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
              Weitere Angebote
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[--text]">
              <Link
                href="/immobilien"
                className="flex items-center gap-2 transition-colors hover:text-[--primary]"
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
                className="text-[--muted] transition-colors hover:text-[--primary]"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[--glass-border] pt-8 md:flex-row">
          <p className="text-xs text-[--muted]">
            &copy; {new Date().getFullYear()} NLV Goldzeit Living. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6 text-xs text-[--muted]">
            <Link
              href="/immobilien/impressum"
              className="transition-colors hover:text-[--primary]"
            >
              Impressum
            </Link>
            <Link
              href="/immobilien/datenschutz"
              className="transition-colors hover:text-[--primary]"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
