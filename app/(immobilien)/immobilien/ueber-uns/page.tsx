import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wer wir sind | NewLife Vietnam",
  description:
    "NewLife Vietnam ist Ihre deutschsprachige Immobilien- und Beratungsagentur für Vietnam. Wir begleiten Sie auf dem Weg zu Ihrem neuen Leben.",
};

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-32 pb-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Neue Chancen. Neues Zuhause.
          </p>
          <h1 className="font-serif text-5xl font-light leading-tight text-[--text] md:text-7xl">
            NewLife{" "}
            <span className="italic text-[--primary]">Vietnam</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[--muted] md:text-xl">
            Ihr Neustart beginnt hier. Wir sind eine deutschsprachige
            Immobilien- und Beratungsagentur, die Menschen aus Deutschland und
            Europa auf ihrem Weg nach Vietnam begleitet.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-[--surface] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-[--text] md:text-xl">
            Wir vermitteln geprüfte Immobilien zum Mieten und Kaufen – vom
            Apartment bis zur Luxusvilla, vom Grundstück bis zum Resort.
            Gleichzeitig unterstützen wir Sie in allen Bereichen, die für einen
            sicheren Neustart entscheidend sind.
          </p>
          <p className="mt-6 font-serif text-2xl font-light italic text-[--primary]">
            Unser Ziel: Ihnen ein neues Leben in Vietnam ermöglichen –
            unkompliziert, ehrlich und mit persönlicher Betreuung.
          </p>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="divider-gold" />

      {/* Was wir bieten */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
            Was wir bieten
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[--muted]">
            Von der ersten Anfrage bis lange nach Ihrem Einzug – wir sind an
            Ihrer Seite
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Wohnimmobilien */}
            <div className="border border-[--glass-border] bg-[--card] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-medium text-[--text]">
                Wohnimmobilien & Langzeitmieten
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[--muted]">
                Apartments, Häuser, Villen und Langzeit-Unterkünfte an der
                zentralen Küste Vietnams, vor allem in Da Nang und Hoi An.
              </p>
              <ul className="space-y-2 text-sm text-[--muted]">
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Langzeiturlaub ab vier Wochen
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Überwintern im warmen Klima
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Digitale Nomaden
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Auswanderer mit langfristigen Plänen
                </li>
              </ul>
            </div>

            {/* Kaufobjekte */}
            <div className="border border-[--glass-border] bg-[--card] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-medium text-[--text]">
                Kaufobjekte & Investitionen
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[--muted]">
                Geprüfte Objekte für Kapitalanleger, Existenzgründer und alle,
                die sich in Vietnam ein neues Standbein aufbauen möchten.
              </p>
              <ul className="space-y-2 text-sm text-[--muted]">
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Wohnungen und Häuser
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Luxusvillen
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Grundstücke
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Hotels, Resorts & Geschäfte
                </li>
              </ul>
            </div>

            {/* Rundum-Betreuung */}
            <div className="border border-[--glass-border] bg-[--card] p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-medium text-[--text]">
                Rundum-Betreuung
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[--muted]">
                Ein neues Leben beginnt nicht mit einer Wohnung – sondern mit
                Orientierung und Sicherheit. Wir sind Ihre Brücke zwischen
                Europa und Vietnam.
              </p>
              <ul className="space-y-2 text-sm text-[--muted]">
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Kontakt zu Anwälten & Behörden
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Visa, Aufenthalt & Formalitäten
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Ärzte & Krankenhäuser
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[--primary]">—</span>
                  Banken, Versicherungen, Alltag
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Für wen wir arbeiten */}
      <section className="bg-[--surface] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
            Für wen wir arbeiten
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[--muted]">
            NewLife Vietnam ist ideal für alle, die den Schritt nach
            Südostasien wagen möchten
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Rentner */}
            <div className="group flex gap-6 border border-[--glass-border] bg-[--card] p-6 transition-all hover:border-[--primary]/30">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[--text] transition-colors group-hover:text-[--primary]">
                  Rentner & Senioren
                </h3>
                <p className="text-sm leading-relaxed text-[--muted]">
                  Den Ruhestand im warmen, sicheren und günstigen Vietnam
                  verbringen. Wir helfen bei der Auswahl der passenden Unterkunft
                  und bleiben auch nach dem Einzug Ihr Ansprechpartner.
                </p>
              </div>
            </div>

            {/* Auswanderer */}
            <div className="group flex gap-6 border border-[--glass-border] bg-[--card] p-6 transition-all hover:border-[--primary]/30">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[--text] transition-colors group-hover:text-[--primary]">
                  Auswanderer & Existenzgründer
                </h3>
                <p className="text-sm leading-relaxed text-[--muted]">
                  Wer sich etwas aufbauen möchte, braucht Unterstützung. Wir
                  vermitteln nicht nur Immobilien, sondern auch wichtige
                  Kontakte: Anwälte, Behörden, Krankenhäuser und lokale
                  Dienstleister.
                </p>
              </div>
            </div>

            {/* Digitale Nomaden */}
            <div className="group flex gap-6 border border-[--glass-border] bg-[--card] p-6 transition-all hover:border-[--primary]/30">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[--text] transition-colors group-hover:text-[--primary]">
                  Digitale Nomaden
                </h3>
                <p className="text-sm leading-relaxed text-[--muted]">
                  Schnelles Internet, niedrige Lebenshaltungskosten und hoher
                  Lebensstandard machen Vietnam zum Top-Ziel für Remote-Arbeit.
                  Wir finden Wohnungen, die funktionieren – nicht nur optisch.
                </p>
              </div>
            </div>

            {/* Investoren */}
            <div className="group flex gap-6 border border-[--glass-border] bg-[--card] p-6 transition-all hover:border-[--primary]/30">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[--primary]/30 text-[--primary]">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-[--text] transition-colors group-hover:text-[--primary]">
                  Investoren & Kapitalanleger
                </h3>
                <p className="text-sm leading-relaxed text-[--muted]">
                  Der vietnamesische Immobilienmarkt ist dynamisch und attraktiv.
                  Wir prüfen Objekte sorgfältig und beraten transparent über
                  Chancen, Risiken und Abläufe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unser Team */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
            Ihr Vorteil: Betreuung in Deutschland & Vietnam
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[--muted]">
            Dieses Modell verbindet Vertrauen, Sprache, Erfahrung und lokale
            Kompetenz – ein starkes Fundament für Ihren Neustart
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Deutschland */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[--primary] text-[--primary]">
                <span className="text-2xl">DE</span>
              </div>
              <h3 className="mb-3 text-lg font-medium text-[--text]">
                In Deutschland
              </h3>
              <p className="text-sm leading-relaxed text-[--muted]">
                Ein deutschsprachiger Ansprechpartner klärt vorab alle Fragen,
                berät transparent und bereitet alles vor.
              </p>
            </div>

            {/* Vietnam */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[--primary] text-[--primary]">
                <span className="text-2xl">VN</span>
              </div>
              <h3 className="mb-3 text-lg font-medium text-[--text]">
                In Vietnam
              </h3>
              <p className="text-sm leading-relaxed text-[--muted]">
                Ein deutscher Ansprechpartner begleitet Sie persönlich vor Ort,
                organisiert Besichtigungen und hilft bei allen praktischen
                Themen.
              </p>
            </div>

            {/* Lokale Expertise */}
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-[--primary] text-[--primary]">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-medium text-[--text]">
                Lokale Expertise
              </h3>
              <p className="text-sm leading-relaxed text-[--muted]">
                Ein erfahrener vietnamesischer Makler mit über zehn Jahren
                Marktkenntnis sorgt für professionelle Abläufe und sichere
                Verträge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Vietnam */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
            Warum Vietnam?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[--muted]">
            Vietnam ist eines der sichersten Länder Asiens mit warmem Klima,
            niedrigen Lebenshaltungskosten und einem entspannten Lebensstil
          </p>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Schöne Strände", icon: "beach" },
              { label: "Moderne Infrastruktur", icon: "building" },
              { label: "Gute medizinische Versorgung", icon: "medical" },
              { label: "Internationale Community", icon: "globe" },
              { label: "Sicherheit & Ruhe", icon: "shield" },
              { label: "Gastfreundschaft", icon: "heart" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center border border-[--glass-border] bg-[--card] p-4 text-center"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center text-[--primary]">
                  <WhyVietnamIcon icon={item.icon} />
                </div>
                <span className="text-xs font-medium text-[--text]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-[--muted]">
            Viele unserer Kunden entscheiden sich nach dem ersten Aufenthalt
            dauerhaft für Vietnam.
          </p>
        </div>
      </section>

      {/* Unser Anspruch */}
      <section className="bg-[--surface] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 font-serif text-3xl font-light text-[--text] md:text-4xl">
            Unser Anspruch
          </h2>
          <div className="space-y-4 font-serif text-xl text-[--text] md:text-2xl">
            <p>Ehrliche Beratung.</p>
            <p>Geprüfte Objekte.</p>
            <p>Persönliche Begleitung.</p>
            <p className="text-[--primary]">
              Ein neues Leben, das wirklich funktioniert.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-light text-[--text] md:text-4xl">
            Ihr Weg zu uns
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[--muted]">
            Ob Sie kaufen, mieten, investieren oder einfach mehrere Monate im
            warmen Klima verbringen möchten – unsere Agentur begleitet Sie
            zuverlässig und verständlich.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/immobilien/kontakt"
              className="inline-flex items-center border border-[--primary] bg-[--primary] px-8 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
            >
              Jetzt Kontakt aufnehmen
            </Link>
            <a
              href="https://wa.me/4915112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[--glass-border] px-8 py-4 text-sm font-medium tracking-wide text-[--text] transition-all hover:border-[--primary] hover:text-[--primary]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Icon component for Why Vietnam section
function WhyVietnamIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    beach: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    building: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    medical: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    globe: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    shield: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    heart: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  };

  return icons[icon] || icons.globe;
}
