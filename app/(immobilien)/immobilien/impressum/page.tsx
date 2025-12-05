import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – NEW LIFE VIETNAM",
  description: "Impressum und rechtliche Informationen von New Life Vietnam.",
};

export default function ImpressumPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Rechtliches
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
            Impressum
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-10 text-[--text]">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="space-y-1 text-[--muted]">
              <p className="font-medium text-[--text]">[FIRMENNAME]</p>
              <p>[STRASSE HAUSNUMMER]</p>
              <p>[PLZ ORT]</p>
              <p>[LAND]</p>
            </div>
          </section>

          {/* Vertreten durch */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Vertreten durch
            </h2>
            <p className="text-[--muted]">[VORNAME NACHNAME], Geschäftsführer</p>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Kontakt
            </h2>
            <div className="space-y-1 text-[--muted]">
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:contact@newlifevietnam.com"
                  className="text-[--primary] transition-colors hover:text-[--primary]/80"
                >
                  contact@newlifevietnam.com
                </a>
              </p>
              <p>Telefon: [TELEFONNUMMER]</p>
            </div>
          </section>

          {/* Registereintrag */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Registereintrag
            </h2>
            <div className="space-y-1 text-[--muted]">
              <p>Eintragung im Handelsregister.</p>
              <p>Registergericht: [REGISTERGERICHT]</p>
              <p>Registernummer: [REGISTERNUMMER]</p>
            </div>
          </section>

          {/* Umsatzsteuer-ID */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Umsatzsteuer-ID
            </h2>
            <p className="text-[--muted]">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              <br />
              [UST-IDNR]
            </p>
          </section>

          {/* Verantwortlich für den Inhalt */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="space-y-1 text-[--muted]">
              <p className="font-medium text-[--text]">[VORNAME NACHNAME]</p>
              <p>[STRASSE HAUSNUMMER]</p>
              <p>[PLZ ORT]</p>
            </div>
          </section>

          {/* Streitschlichtung */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Streitschlichtung
            </h2>
            <p className="text-[--muted]">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--primary] transition-colors hover:text-[--primary]/80"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p className="mt-4 text-[--muted]">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          {/* Haftung für Inhalte */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Haftung für Inhalte
            </h2>
            <p className="text-[--muted]">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-4 text-[--muted]">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </section>

          {/* Haftung für Links */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Haftung für Links
            </h2>
            <p className="text-[--muted]">
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
            <p className="mt-4 text-[--muted]">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>
          </section>

          {/* Urheberrecht */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              Urheberrecht
            </h2>
            <p className="text-[--muted]">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-4 text-[--muted]">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
              bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-16 border-t border-[--glass-border] pt-8">
          <Link
            href="/"
            className="text-sm text-[--muted] transition-colors hover:text-[--primary]"
          >
            &larr; Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
