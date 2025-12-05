import { buttonClasses } from "./ui/button";

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

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/84832114684?text=Ich%20m%C3%B6chte%20mehr%20%C3%BCber%20Ihre%20Objekte%20erfahren."
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({
              variant: "primary",
              className: "min-w-[220px] px-8 py-4 text-base",
            })}
          >
            WhatsApp Kontakt
          </a>
          <a
            href="mailto:contact@newlifevietnam.de"
            className={buttonClasses({
              variant: "ghost",
              className: "min-w-[220px] px-8 py-4 text-base",
            })}
          >
            E-Mail schreiben
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


