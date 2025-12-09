export function BestAgerFeatures() {
  return (
    <section className="relative overflow-hidden bg-[--surface] py-24">
      {/* Decorative BG element */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[--primary]/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="mb-16">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[--primary]">
            Sorglos-Paket
          </span>
          <h2 className="font-serif text-4xl font-light text-[--text] md:text-5xl">
            Ihr neuer Alltag.
          </h2>
          <p className="mt-4 max-w-xl text-[--muted]">
            Wir kümmern uns um den Haushalt, das Essen und die Bürokratie.
            Sie kümmern sich darum, das Leben zu genießen.
          </p>
        </div>

        <div className="grid gap-1 md:grid-cols-3">
          {/* Feature 1 - Haushalt */}
          <div className="group border border-white/5 bg-[--bg] p-10 transition-colors hover:border-[--primary]/30">
            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[--surface] text-[--text] transition-colors group-hover:bg-[--primary] group-hover:text-white">
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-[--text]">Haushalt &amp; Service</h3>
            <p className="mb-4 text-sm leading-relaxed text-[--muted]">
              Schluss mit Putzen. Eine Haushaltshilfe ist <strong className="text-[--text]">8 Stunden täglich</strong> vor Ort.
              Sie kümmert sich um Reinigung, kleine Erledigungen und sorgt für Ordnung.
            </p>
            <ul className="space-y-2 text-xs text-[--muted]">
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="h-3 w-3 text-[--primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Reinigung der Zimmer
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="h-3 w-3 text-[--primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Poolpflege &amp; Garten
              </li>
            </ul>
          </div>

          {/* Feature 2 - Verpflegung */}
          <div className="group border border-white/5 bg-[--bg] p-10 transition-colors hover:border-[--primary]/30">
            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[--surface] text-[--text] transition-colors group-hover:bg-[--primary] group-hover:text-white">
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-[--text]">Verpflegung</h3>
            <p className="mb-4 text-sm leading-relaxed text-[--muted]">
              Gesund und lecker. <strong className="text-[--text]">Halbpension inklusive</strong> (2 Mahlzeiten pro Tag).
              Genießen Sie vietnamesische und internationale Küche ohne selbst kochen zu müssen.
            </p>
            <ul className="space-y-2 text-xs text-[--muted]">
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="h-3 w-3 text-[--primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Frühstück &amp; Dinner
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="h-3 w-3 text-[--primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Frische lokale Zutaten
              </li>
            </ul>
          </div>

          {/* Feature 3 - Sicherheit */}
          <div className="group border border-white/5 bg-[--bg] p-10 transition-colors hover:border-[--primary]/30">
            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[--surface] text-[--text] transition-colors group-hover:bg-[--primary] group-hover:text-white">
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-[--text]">Sicherheit &amp; Support</h3>
            <p className="mb-4 text-sm leading-relaxed text-[--muted]">
              Deutsche Betreuung direkt vor Ort. Wir helfen bei Visa, Bankkonto und Arztbesuchen.
              24/7 Notfall-Erreichbarkeit.
            </p>
            <ul className="space-y-2 text-xs text-[--muted]">
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="h-3 w-3 text-[--primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Deutschsprachiger Ansprechpartner
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" className="h-3 w-3 text-[--primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ärzte-Netzwerk
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
