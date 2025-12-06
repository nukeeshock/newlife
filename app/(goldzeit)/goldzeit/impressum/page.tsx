import Link from "next/link";

export const metadata = {
  title: "Impressum | NLV Goldzeit Living",
  description: "Impressum und rechtliche Informationen zu NLV Goldzeit Living",
};

export default function GoldzeitImpressumPage() {
  return (
    <div className="py-16">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
            Rechtliches
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
            Impressum
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[--muted]">
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-2">
              <p className="font-semibold text-[--text]">NLV Goldzeit Living</p>
              <p>Ein Angebot von New Life Vietnam</p>
              <p>[Straße und Hausnummer]</p>
              <p>[PLZ] [Stadt]</p>
              <p>Vietnam</p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Kontakt
            </h2>
            <div className="space-y-2">
              <p>Telefon: +84 83 211 4684</p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:contact@newlifevietnam.de"
                  className="text-orange-400 hover:underline"
                >
                  contact@newlifevietnam.de
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Vertreten durch
            </h2>
            <p>[Name des Vertretungsberechtigten]</p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              [USt-IdNr. falls vorhanden]
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Haftungsausschluss
            </h2>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">Haftung für Inhalte</h3>
            <p className="leading-relaxed">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
              keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG
              für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
              nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
              überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">Haftung für Links</h3>
            <p className="leading-relaxed">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
              Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
              verantwortlich.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">Urheberrecht</h3>
            <p className="leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
              Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
              des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
              Autors bzw. Erstellers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Streitschlichtung
            </h2>
            <p className="leading-relaxed">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          {/* Back Link */}
          <div className="mt-12 border-t border-[--glass-border] pt-8">
            <Link
              href="/goldzeit"
              className="inline-flex items-center gap-2 text-sm text-orange-400 transition-colors hover:text-orange-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück zu Goldzeit Living
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
