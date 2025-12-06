import { buttonClasses } from "./ui/button";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "./contact-buttons";

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.06),transparent_70%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6 text-center md:px-8">
        {/* Decorative Lines */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[--primary]/40" />
          <span className="h-1.5 w-1.5 rotate-45 border border-[--primary]/40" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[--primary]/40" />
        </div>

        {/* Content */}
        <h2 className="font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
          Bereit für
          <br />
          <span className="italic text-[--primary]">Ihr neues Leben?</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-[--muted]">
          Vereinbaren Sie ein unverbindliches Gespräch. Wir zeigen Ihnen,
          welche Möglichkeiten Vietnam für Sie bereithält.
        </p>

        {/* Messenger Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent("Ich möchte mehr über Ihre Objekte erfahren.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex min-w-[160px] items-center justify-center gap-2 overflow-hidden bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] active:scale-95"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href={CONTACT_LINKS.line}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex min-w-[160px] items-center justify-center gap-2 overflow-hidden bg-[#00B900] px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#00A000] active:scale-95"
          >
            <LineIcon className="h-5 w-5" />
            Line
          </a>
          <a
            href={CONTACT_LINKS.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex min-w-[160px] items-center justify-center gap-2 overflow-hidden bg-[#0068FF] px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0058DD] active:scale-95"
          >
            <ZaloIcon className="h-5 w-5" />
            Zalo
          </a>
        </div>

        {/* Email Alternative */}
        <div className="mt-6">
          <a
            href="mailto:contact@newlifevietnam.de"
            className={buttonClasses({
              variant: "ghost",
              className: "px-8 py-3 text-sm",
            })}
          >
            Oder per E-Mail
          </a>
        </div>

        {/* Trust Note */}
        <p className="mt-12 text-sm text-[--muted]">
          Diskretion und Vertraulichkeit sind für uns selbstverständlich.
        </p>
      </div>
    </section>
  );
}


