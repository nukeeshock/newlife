import Link from "next/link";

export function GoldzeitHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center opacity-30 grayscale transition-all duration-[2s] hover:grayscale-0"
          style={{ backgroundImage: "url('/goldzeit-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[--bg] via-[--bg]/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto grid gap-12 px-6 md:grid-cols-2 md:items-center md:px-8">
        <div>
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-[--primary] backdrop-blur-md">
            <svg
              aria-hidden="true"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Shared Living Concept
          </div>

          {/* Headline */}
          <h1 className="mb-8 font-serif text-5xl font-light leading-[1.1] text-[--text] md:text-7xl">
            Gemeinsam wohnen.
            <br />
            <span className="text-[--muted]">Selbstbestimmt leben.</span>
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-xl text-xl font-light leading-relaxed text-[--muted]">
            Das exklusive WG-Konzept fuer Best Ager in Da Nang.
            Entfliehen Sie der Einsamkeit und geniessen Sie den Luxus einer Pool-Villa
            mit Full-Service - zu einem Preis, der in Europa unmoeglich waere.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="#pricing"
              className="bg-[--primary] px-8 py-4 text-center font-medium text-white transition-all hover:bg-[--primary-hover]"
            >
              Preise &amp; Verfuegbarkeit
            </Link>
            <div className="flex items-center gap-4 border-l border-[--glass-border] px-6 py-4">
              <div className="text-right">
                <span className="block text-2xl font-bold text-[--text]">Da Nang</span>
                <span className="text-xs uppercase tracking-widest text-[--muted]">Vietnam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Facts Card */}
        <div className="hidden border border-white/5 bg-[--surface]/50 p-8 backdrop-blur-sm md:block">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[--text]">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-[--primary]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Alles Inklusive Highlights
          </h3>
          <ul className="space-y-4">
            {[
              "Private Zimmer mit Bad in Pool-Villa",
              "Halbpension (2 Mahlzeiten taeglich)",
              "8h Haushaltshilfe pro Tag",
              "Deutschsprachige Betreuung 24/7",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[--text]">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-[--surface] text-[--primary]">
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
