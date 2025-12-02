export function Footer() {
  return (
    <footer className="border-t border-[--glass-border] bg-[--bg]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.35em] text-[--primary]">
                New Life
              </span>
              <span className="font-serif text-xl font-light tracking-wide text-[--text]">
                Vietnam
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[--muted]">
              Exklusive Mietobjekte für Menschen, 
              die mehr vom Leben erwarten.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[--text]">
              <a
                href="mailto:contact@newlifevietnam.com"
                className="transition-colors hover:text-[--primary]"
              >
                contact@newlifevietnam.com
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

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
              Standorte
            </h4>
            <div className="flex flex-col gap-2 text-sm text-[--text]">
              <span>Da Nang</span>
              <span>Hoi An</span>
              <span>Ho Chi Minh City</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[--glass-border] pt-8 md:flex-row">
          <p className="text-xs text-[--muted]">
            © {new Date().getFullYear()} New Life Vietnam. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6 text-xs text-[--muted]">
            <a href="#" className="transition-colors hover:text-[--primary]">
              Impressum
            </a>
            <a href="#" className="transition-colors hover:text-[--primary]">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
