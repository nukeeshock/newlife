export function GoldzeitConcept() {
  return (
    <section className="border-t border-white/5 bg-[--bg] py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-serif text-3xl font-light text-[--text]">
              Keine Lust auf Einsamkeit?
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[--muted]">
              Viele Menschen ab 50+ fühlen sich im Alltag isoliert. In unseren{" "}
              <strong className="text-[--text]">Shared Living Villen</strong> kombinieren wir
              Privatsphäre mit Gesellschaft.
            </p>
            <p className="text-lg leading-relaxed text-[--muted]">
              Sie haben Ihr eigenes Reich (Schlafzimmer &amp; Bad) als Rückzugsort, teilen
              sich aber großzügige Wohnbereiche, den Garten und den Pool mit gleichgesinnten
              Mitbewohnern.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/5 bg-[--surface] p-6">
              <svg
                aria-hidden="true"
                className="mb-4 h-8 w-8 text-[--primary]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <h3 className="mb-2 font-bold text-[--text]">Privatsphäre</h3>
              <p className="text-sm text-[--muted]">Eigenes Zimmer &amp; Bad in Top-Qualität.</p>
            </div>
            <div className="border border-white/5 bg-[--surface] p-6">
              <svg
                aria-hidden="true"
                className="mb-4 h-8 w-8 text-[--primary]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <h3 className="mb-2 font-bold text-[--text]">Gemeinschaft</h3>
              <p className="text-sm text-[--muted]">Gemeinsam essen, reden und entspannen.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
