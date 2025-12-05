export function GoldzeitPricing() {
  return (
    <section id="pricing" className="bg-[--bg] py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl font-light text-[--text]">
            Transparent &amp; Fair
          </h2>
          <p className="text-[--muted]">Monatliche All-Inclusive Preise. Keine versteckten Kosten.</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Standard Package */}
          <div className="relative border border-[--glass-border] bg-[--surface] p-8 md:p-12">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border border-[--glass-border] bg-[--card] px-4 py-1 text-xs uppercase tracking-widest text-[--text]">
              Basis Paket
            </div>

            <div className="mb-8 space-y-6 border-b border-white/5 pb-8 text-center">
              <div>
                <p className="mb-2 text-sm uppercase tracking-wide text-[--muted]">Einzelperson</p>
                <p className="text-5xl font-bold text-[--text]">
                  1.399 EUR
                  <span className="text-lg font-normal text-[--muted]"> / Monat</span>
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm uppercase tracking-wide text-[--muted]">Paare (pro Person)</p>
                <p className="text-3xl font-bold text-[--primary]">
                  999 EUR
                  <span className="text-sm font-normal text-[--muted]"> / Monat</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="mb-4 font-bold text-[--text]">Alles Inklusive:</p>
              <div className="grid grid-cols-1 gap-3 text-sm text-[--muted]">
                {[
                  "Möbliertes Zimmer + Bad",
                  "Halbpension (2 Mahlzeiten)",
                  "8h Haushaltshilfe Service",
                  "Bettwäsche-Service",
                  "Strom, Wasser, WLAN",
                  "24/7 Deutsche Betreuung",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-[--primary]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Upgrade */}
          <div className="relative overflow-hidden border border-[--primary]/30 bg-gradient-to-b from-[--card] to-[--surface] p-8 md:p-12">
            <div className="pointer-events-none absolute -mr-10 -mt-10 right-0 top-0 h-32 w-32 rounded-full bg-[--primary]/10 blur-3xl" />

            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[--text]">Premium Upgrade</h3>
                <p className="mt-1 text-sm text-[--muted]">Gönnen Sie sich das Extra an Luxus.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[--primary]">+ 199 EUR</p>
                <p className="text-xs text-[--muted]">pro Monat</p>
              </div>
            </div>

            <div className="space-y-6 border-t border-white/10 pt-6">
              <div className="flex gap-4">
                <div className="h-fit bg-[--bg] p-2 text-[--primary]">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[--text]">Wellness &amp; Beauty</h4>
                  <p className="mt-1 text-xs text-[--muted]">
                    1x Massage/Woche, 1x Yoga/Woche, 1x Maniküre/Pediküre &amp; Haarschnitt pro Monat.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit bg-[--bg] p-2 text-[--primary]">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[--text]">Persönliche Wäsche</h4>
                  <p className="mt-1 text-xs text-[--muted]">
                    Waschen &amp; Bügeln Ihrer privaten Kleidung inklusive.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-fit bg-[--bg] p-2 text-[--primary]">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[--text]">Shopping Service</h4>
                  <p className="mt-1 text-xs text-[--muted]">
                    Einkaufsservice inkl. Transport für persönliche Wünsche.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/goldzeit/kontakt"
              className="mt-10 block w-full bg-white py-4 text-center text-sm font-bold uppercase tracking-wider text-[--bg] transition-colors hover:bg-[--text]"
            >
              Upgrade Anfragen
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
