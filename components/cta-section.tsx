import { buttonClasses } from "./ui/button";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "./contact-buttons";

const messengerButtons = [
  { href: `${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent("Ich möchte mehr über Ihre Objekte erfahren.")}`, Icon: WhatsAppIcon, label: "WhatsApp", bg: "#25D366", hover: "#20BD5A" },
  { href: CONTACT_LINKS.line, Icon: LineIcon, label: "Line", bg: "#00B900", hover: "#00A000" },
  { href: CONTACT_LINKS.zalo, Icon: ZaloIcon, label: "Zalo", bg: "#0068FF", hover: "#0058DD" },
];

export function CtaSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.06),transparent_70%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6 text-center md:px-8">
        {/* Decorative Lines */}
        <div className="animate-fadeInDown opacity-0-initial mb-12 flex items-center justify-center gap-4">
          <span className="animate-drawLine delay-200 opacity-0-initial h-px w-16 origin-right bg-gradient-to-r from-transparent to-[--primary]/40" />
          <span className="animate-pulse-subtle h-1.5 w-1.5 rotate-45 border border-[--primary]/40" />
          <span className="animate-drawLine delay-200 opacity-0-initial h-px w-16 origin-left bg-gradient-to-l from-transparent to-[--primary]/40" />
        </div>

        {/* Content */}
        <h2 className="animate-fadeInUp delay-100 opacity-0-initial font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
          Bereit für
          <br />
          <span className="italic text-[--primary]">Ihr neues Leben?</span>
        </h2>

        <p className="animate-fadeInUp delay-200 opacity-0-initial mx-auto mt-6 max-w-xl text-lg text-[--muted]">
          Vereinbaren Sie ein unverbindliches Gespräch. Wir zeigen Ihnen,
          welche Möglichkeiten Vietnam für Sie bereithält.
        </p>

        {/* Messenger Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {messengerButtons.map((btn, i) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fadeInUp opacity-0-initial group relative inline-flex min-w-[160px] items-center justify-center gap-2 overflow-hidden px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                backgroundColor: btn.bg,
                animationDelay: `${300 + i * 100}ms`,
              }}
            >
              <btn.Icon className="h-5 w-5" />
              {btn.label}
            </a>
          ))}
        </div>

        {/* Email Alternative */}
        <div className="animate-fadeInUp delay-600 opacity-0-initial mt-6">
          <a
            href="mailto:contact@newlifevietnam.de"
            className={buttonClasses({
              variant: "ghost",
              className: "px-8 py-3 text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
            })}
          >
            Oder per E-Mail
          </a>
        </div>

        {/* Trust Note */}
        <p className="animate-fadeInUp delay-700 opacity-0-initial mt-12 text-sm text-[--muted]">
          Diskretion und Vertraulichkeit sind für uns selbstverständlich.
        </p>
      </div>
    </section>
  );
}


