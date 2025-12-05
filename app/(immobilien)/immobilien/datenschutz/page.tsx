import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – NEW LIFE VIETNAM",
  description:
    "Datenschutzerklärung und Informationen zum Umgang mit Ihren Daten bei New Life Vietnam.",
};

export default function DatenschutzPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
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
        <div className="space-y-10 text-[--text]">
          {/* Einleitung */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              Allgemeine Hinweise
            </h3>
            <p className="text-[--muted]">
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          {/* Verantwortlicher */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              2. Verantwortlicher
            </h2>
            <div className="space-y-1 text-[--muted]">
              <p className="font-medium text-[--text]">[FIRMENNAME]</p>
              <p>[STRASSE HAUSNUMMER]</p>
              <p>[PLZ ORT]</p>
              <p>[LAND]</p>
              <p className="mt-4">
                E-Mail:{" "}
                <a
                  href="mailto:contact@newlifevietnam.com"
                  className="text-[--primary] transition-colors hover:text-[--primary]/80"
                >
                  contact@newlifevietnam.com
                </a>
              </p>
            </div>
            <p className="mt-4 text-[--muted]">
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          {/* Datenerfassung */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              Cookies
            </h3>
            <p className="text-[--muted]">
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien,
              die auf Ihrem Endgerät gespeichert werden. Sie richten keinen
              Schaden an und enthalten keine Viren. Wir setzen Cookies ein, um
              unsere Website nutzerfreundlicher zu gestalten und um anonyme
              Nutzungsstatistiken zu erheben.
            </p>
            <p className="mt-4 text-[--muted]">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen
              von Cookies informiert werden und Cookies nur im Einzelfall
              erlauben, die Annahme von Cookies für bestimmte Fälle oder
              generell ausschließen sowie das automatische Löschen der Cookies
              beim Schließen des Browsers aktivieren.
            </p>

            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              Server-Log-Dateien
            </h3>
            <p className="text-[--muted]">
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-[--muted]">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse (anonymisiert)</li>
            </ul>
            <p className="mt-4 text-[--muted]">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen.
            </p>

            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              Kontaktformular
            </h3>
            <p className="text-[--muted]">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Formular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          {/* Analyse-Tools */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              4. Analyse-Tools
            </h2>

            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              Eigene Analyse-Lösung
            </h3>
            <p className="text-[--muted]">
              Diese Website nutzt eine eigene, datenschutzfreundliche
              Analyse-Lösung zur statistischen Auswertung der Besucherzugriffe.
              Dabei werden folgende Daten erhoben:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-[--muted]">
              <li>Anonymisierte IP-Adresse (SHA-256 Hash)</li>
              <li>Besuchte Seiten</li>
              <li>Referrer (woher Sie kamen)</li>
              <li>Browsertyp</li>
              <li>Verweildauer</li>
            </ul>
            <p className="mt-4 text-[--muted]">
              Die Datenverarbeitung erfolgt nur nach Ihrer ausdrücklichen
              Einwilligung über unseren Cookie-Banner. Sie können Ihre
              Einwilligung jederzeit widerrufen.
            </p>
            <p className="mt-4 text-[--muted]">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung)
            </p>
          </section>

          {/* Externe Dienste */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              5. Externe Dienste
            </h2>

            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              WhatsApp
            </h3>
            <p className="text-[--muted]">
              Auf dieser Website bieten wir die Möglichkeit, uns über WhatsApp
              zu kontaktieren. WhatsApp ist ein Dienst der Meta Platforms Inc.
              (USA). Wenn Sie uns über WhatsApp kontaktieren, werden Ihre Daten
              gemäß den Datenschutzbestimmungen von WhatsApp verarbeitet.
            </p>
            <p className="mt-4 text-[--muted]">
              Weitere Informationen finden Sie in der{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--primary] transition-colors hover:text-[--primary]/80"
              >
                Datenschutzerklärung von WhatsApp
              </a>
              .
            </p>

            <h3 className="mb-2 mt-6 text-lg font-medium text-[--text]">
              Vercel (Hosting)
            </h3>
            <p className="text-[--muted]">
              Diese Website wird bei Vercel Inc. (USA) gehostet. Vercel
              verarbeitet Daten im Rahmen des Hostings, einschließlich
              IP-Adressen und Zugriffsprotokolle. Vercel ist unter dem
              EU-US-Datenschutzrahmen zertifiziert.
            </p>
          </section>

          {/* Ihre Rechte */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              6. Ihre Rechte
            </h2>
            <p className="text-[--muted]">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
              Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
              Berichtigung oder Löschung dieser Daten.
            </p>
            <p className="mt-4 text-[--muted]">Im Einzelnen haben Sie:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-[--muted]">
              <li>
                <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Recht auf Löschung</strong> (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art.
                18 DSGVO)
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)
              </li>
            </ul>
            <p className="mt-4 text-[--muted]">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
              sich jederzeit an uns wenden:{" "}
              <a
                href="mailto:contact@newlifevietnam.com"
                className="text-[--primary] transition-colors hover:text-[--primary]/80"
              >
                contact@newlifevietnam.com
              </a>
            </p>
          </section>

          {/* Beschwerderecht */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              7. Beschwerderecht bei der Aufsichtsbehörde
            </h2>
            <p className="text-[--muted]">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
              Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem
              Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
              oder des Orts des mutmaßlichen Verstoßes.
            </p>
          </section>

          {/* SSL/TLS */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              8. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <p className="text-[--muted]">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf
              &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>
          </section>

          {/* Aktualität */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
              9. Aktualität und Änderung dieser Datenschutzerklärung
            </h2>
            <p className="text-[--muted]">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              Dezember 2024.
            </p>
            <p className="mt-4 text-[--muted]">
              Durch die Weiterentwicklung unserer Website oder aufgrund
              geänderter gesetzlicher bzw. behördlicher Vorgaben kann es
              notwendig werden, diese Datenschutzerklärung zu ändern.
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
