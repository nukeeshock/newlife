import Link from "next/link";

export const metadata = {
  title: "Datenschutz | Best Ager Residences",
  description: "Datenschutzerklärung von Best Ager Residences",
};

export default function BestAgerDatenschutzPage() {
  return (
    <div className="py-16">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
            Rechtliches
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
            Datenschutzerklärung
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[--muted]">
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-[--text]">Allgemeine Hinweise</h3>
            <p className="leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
              Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
              identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              2. Verantwortliche Stelle
            </h2>
            <div className="space-y-2">
              <p className="font-semibold text-[--text]">Best Ager Residences</p>
              <p>Ein Angebot von NewLife Vietnam</p>
              <p>[Adresse]</p>
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
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="mb-2 mt-4 font-semibold text-[--text]">Cookies</h3>
            <p className="leading-relaxed">
              Unsere Website verwendet technisch notwendige Cookies. Diese sind
              erforderlich, um bestimmte Funktionen unserer Website zu ermöglichen.
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
              Cookies informiert werden.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">Server-Log-Dateien</h3>
            <p className="leading-relaxed">
              Der Provider der Seiten erhebt und speichert automatisch Informationen
              in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns
              übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes
              Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners,
              Uhrzeit der Serveranfrage und IP-Adresse.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">Kontaktformular</h3>
            <p className="leading-relaxed">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
              Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
              Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
              Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
              Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              4. Analyse-Tools
            </h2>
            <p className="leading-relaxed">
              Wir nutzen ein selbst gehostetes, datenschutzfreundliches
              Analyse-System, das keine personenbezogenen Daten an Dritte überträgt.
              IP-Adressen werden anonymisiert (gehasht) gespeichert und können nicht
              zu Ihnen zurückverfolgt werden.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              5. Ihre Rechte
            </h2>
            <p className="leading-relaxed">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
              und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
              Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen
              zum Thema personenbezogene Daten können Sie sich jederzeit unter der
              im Impressum angegebenen Adresse an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              6. SSL-Verschlüsselung
            </h2>
            <p className="leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte
              Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
              &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>
          </section>

          {/* Back Link */}
          <div className="mt-12 border-t border-[--glass-border] pt-8">
            <Link
              href="/best-ager-residences"
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
              Zurück zu Best Ager Residences
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
