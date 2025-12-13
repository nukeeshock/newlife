import Link from "next/link";

export const metadata = {
  title: "Datenschutz | NLV Real Estate",
  description: "Datenschutzerklärung von NLV Real Estate",
};

export default function DatenschutzPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Rechtliches
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
            Datenschutzerklärung
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[--muted]">
          {/* 1. Datenschutz auf einen Blick */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-[--text]">
              Allgemeine Hinweise
            </h3>
            <p className="leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Datenerfassung auf dieser Website
            </h3>
            <p className="mb-3 leading-relaxed">
              <strong className="text-[--text]">
                Wer ist verantwortlich für die Datenerfassung?
              </strong>{" "}
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber (Impressum).
            </p>
            <p className="mb-3 leading-relaxed">
              <strong className="text-[--text]">
                Wie erfassen wir Ihre Daten?
              </strong>{" "}
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen (z. B. durch das Kontaktformular). Andere Daten werden
              automatisch beim Besuch der Website durch unsere IT-Systeme
              erfasst. Das sind vor allem technische Daten (z. B.
              Internetbrowser, Betriebssystem, IP-Adresse oder Uhrzeit des
              Seitenaufrufs) sowie Nutzungsdaten unserer eigenen
              Analyse-Software.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[--text]">
                Wofür nutzen wir Ihre Daten?
              </strong>{" "}
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
              der Website zu gewährleisten. Andere Daten werden zur Analyse
              Ihres Nutzerverhaltens verwendet.
            </p>
          </section>

          {/* 2. Hosting und Infrastruktur */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              2. Hosting und Infrastruktur
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-[--text]">
              Hosting bei Vercel
            </h3>
            <p className="mb-4 leading-relaxed">
              Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA. Der Anbieter verarbeitet Ihre IP-Adresse
              und technische Zugriffsdaten, um die Auslieferung der Website zu
              gewährleisten (Content Delivery Network).
            </p>
            <p className="mb-4 leading-relaxed">
              Da Vercel ein US-Unternehmen ist, werden Daten in die USA
              übertragen. Wir haben mit Vercel einen Auftragsverarbeitungsvertrag
              (Data Processing Agreement) geschlossen. Die Datenübermittlung in
              die USA stützen wir auf die Standardvertragsklauseln (Standard
              Contractual Clauses – SCC) der EU-Kommission sowie – soweit
              anwendbar – auf das Data Privacy Framework (DPF). Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
              schnellen und sicheren Bereitstellung des Online-Angebots).
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Datenbank-Hosting (Neon)
            </h3>
            <p className="leading-relaxed">
              Für die Speicherung von Anwendungsdaten (z. B. Analysedaten)
              nutzen wir den Datenbank-Dienst Neon Inc., USA. Auch hierbei
              werden Daten auf Servern in den USA verarbeitet. Wir haben mit dem
              Anbieter entsprechende Vereinbarungen zur Datensicherheit und
              Einhaltung der DSGVO-Standards (SCCs) getroffen.
            </p>
          </section>

          {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-[--text]">Datenschutz</h3>
            <p className="mb-4 leading-relaxed">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p className="mb-2 leading-relaxed">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <div className="mb-4 space-y-1">
              <p className="font-semibold text-[--text]">
                Palmara Reisekunst LLC
              </p>
              <p>1209 Mountain Road PL NE STE N</p>
              <p>Albuquerque, NM 87110 USA</p>
              <p className="mt-2">Vertreten durch: Taylor Newman</p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:contact@newlifevietnam.de"
                  className="text-[--primary] hover:underline"
                >
                  contact@newlifevietnam.de
                </a>
              </p>
              <p>Telefon: +84 83 211 4684</p>
            </div>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Hinweis zur Datenübermittlung in die USA
            </h3>
            <p className="mb-4 leading-relaxed">
              Unsere IT-Infrastruktur (Hosting, Datenbank) befindet sich
              teilweise in den USA. Die USA werden vom Europäischen Gerichtshof
              derzeit als Land mit einem nach EU-Standards unzureichenden
              Datenschutzniveau eingeschätzt. Es besteht insbesondere das
              Risiko, dass Ihre Daten durch US-Behörden zu Kontroll- und
              Überwachungszwecken verarbeitet werden können, ohne dass Ihnen
              dagegen wirksame Rechtsbehelfe zustehen. Wir sichern die
              Datenübermittlung durch Standardvertragsklauseln und technische
              Maßnahmen (z. B. Hashing von IP-Adressen) bestmöglich ab.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Widerruf Ihrer Einwilligung zur Datenverarbeitung
            </h3>
            <p className="mb-4 leading-relaxed">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
              Einwilligung möglich. Sie können eine bereits erteilte
              Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Beschwerderecht
            </h3>
            <p className="mb-4 leading-relaxed">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
              Beschwerderecht bei einer Aufsichtsbehörde zu.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Recht auf Auskunft, Löschung und Berichtigung
            </h3>
            <p className="mb-4 leading-relaxed">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
              Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
              Berichtigung oder Löschung dieser Daten.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              SSL- bzw. TLS-Verschlüsselung
            </h3>
            <p className="leading-relaxed">
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von &quot;http://&quot;
              auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in
              Ihrer Browserzeile.
            </p>
          </section>

          {/* 4. Datenerfassung auf dieser Website */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              4. Datenerfassung auf dieser Website
            </h2>

            <h3 className="mb-2 mt-4 font-semibold text-[--text]">
              Speichertechnologien auf dem Endgerät (Local Storage & Cookies)
            </h3>
            <p className="mb-4 leading-relaxed">
              Unsere Website nutzt zur Bereitstellung grundlegender Funktionen
              (z. B. Session-Management) den lokalen Speicher Ihres Browsers
              (Local Storage) sowie technisch notwendige Cookies. Diese Daten
              werden nicht an Dritte weitergegeben und dienen ausschließlich der
              technischen Funktionalität der Seite. Die Rechtsgrundlage für
              diese Speicherung ist § 25 Abs. 2 Nr. 2 TTDSG (technische
              Notwendigkeit) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse am Betrieb der Website).
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Server-Log-Dateien
            </h3>
            <p className="mb-2 leading-relaxed">
              Der Provider der Seiten (Vercel) erhebt und speichert automatisch
              Informationen in sogenannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="leading-relaxed">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf
              Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="mb-2 mt-6 font-semibold text-[--text]">
              Kontaktformular / E-Mail
            </h3>
            <p className="leading-relaxed">
              Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen
              lassen, werden Ihre Angaben inklusive der Kontaktdaten zwecks
              Bearbeitung der Anfrage bei uns gespeichert. Diese Daten geben wir
              nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf
              Grundlage von Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung/vorvertragliche Maßnahmen) oder Art. 6 Abs. 1
              lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von
              Anfragen).
            </p>
          </section>

          {/* 5. Analyse-Tools */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              5. Analyse-Tools
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-[--text]">
              Eigene Analyse-Software (Self-Hosted Custom Analytics)
            </h3>
            <p className="mb-4 leading-relaxed">
              Wir verwenden auf dieser Website eine selbst entwickelte
              Analysefunktion, um die Nutzung unserer Website statistisch
              auszuwerten und unser Angebot zu optimieren. Dieses Tool arbeitet
              besonders datenschutzfreundlich (&quot;Privacy First&quot;):
            </p>
            <ul className="mb-4 list-inside list-disc space-y-2">
              <li>
                <strong className="text-[--text]">Keine Drittanbieter:</strong>{" "}
                Die Daten werden nicht an Google oder Facebook übertragen.
              </li>
              <li>
                <strong className="text-[--text]">Keine Analyse-Cookies:</strong>{" "}
                Wir setzen keine Cookies für Tracking-Zwecke. Zur Wiedererkennung
                einer Sitzung wird lediglich ein technischer Eintrag im Local
                Storage verwendet.
              </li>
              <li>
                <strong className="text-[--text]">Anonymisierung:</strong> Ihre
                IP-Adresse wird vor der Speicherung mittels eines
                kryptografischen Verfahrens (SHA-256 Hash) unwiderruflich
                anonymisiert. Ein Rückschluss auf Ihre Person ist uns nicht
                möglich.
              </li>
              <li>
                <strong className="text-[--text]">Datenspeicherung:</strong> Die
                anonymisierten Analysedaten (z. B. aufgerufene Seiten, Klicks auf
                Buttons) werden in unserer Datenbank bei Neon Inc. gespeichert.
              </li>
            </ul>
            <p className="leading-relaxed">
              Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
              f DSGVO. Unser berechtigtes Interesse liegt in der anonymisierten
              Analyse des Nutzerverhaltens zur Verbesserung unseres Webangebots,
              ohne dabei die Privatsphäre der Nutzer durch umfassendes Tracking
              zu verletzen.
            </p>
          </section>

          {/* 6. Plugins und Tools */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              6. Plugins und Tools
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-[--text]">
              Google Fonts (Lokales Hosting)
            </h3>
            <p className="mb-4 leading-relaxed">
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten
              sogenannte Google Fonts. Wir verwenden hierbei die Technologie
              &quot;Next.js Font Optimization&quot;. Das bedeutet: Die
              Schriftarten werden nicht direkt von den Servern von Google
              geladen, wenn Sie unsere Seite aufrufen. Stattdessen werden die
              Schriften lokal von unserem eigenen Server (bzw. unserem CDN)
              ausgeliefert. Es findet keine Verbindung zu Google-Servern statt,
              und es werden somit auch keine Daten (wie Ihre IP-Adresse) an
              Google im Zusammenhang mit der Schriftartendarstellung übermittelt.
            </p>
            <p className="leading-relaxed">
              Die Nutzung von Google Fonts erfolgt im Interesse einer
              einheitlichen und ansprechenden Darstellung unserer Online-Angebote.
              Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1
              lit. f DSGVO dar.
            </p>
          </section>

          {/* Back Link */}
          <div className="mt-12 border-t border-[--glass-border] pt-8">
            <Link
              href="/immobilien"
              className="inline-flex items-center gap-2 text-sm text-[--primary] transition-colors hover:text-[--primary]/80"
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
              Zurück zu NLV Real Estate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
