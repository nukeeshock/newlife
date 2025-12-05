import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Das Konzept - NLV Goldzeit Living",
  description:
    "Erfahren Sie alles ueber unser Shared Living Konzept in Vietnam. Pool-Villen, Gemeinschaft, Vollpension und deutschsprachige Betreuung fuer Best Ager.",
  openGraph: {
    title: "Das Goldzeit Living Konzept",
    description:
      "Gemeinsam leben in Vietnam - das innovative Co-Living Konzept fuer Menschen ab 50+.",
    type: "website",
  },
};

export default function GoldzeitKonzeptPage() {
  return (
    <div className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Das Konzept
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
            Gemeinsam leben. <span className="italic text-[--primary]">Selbstbestimmt.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[--muted]">
            Stellen Sie sich vor: Sie wachen auf in einer luxurioesen Pool-Villa,
            umgeben von Gleichgesinnten, mit allem was Sie brauchen - und das zu einem
            Bruchteil dessen, was es in Europa kosten wuerde.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto my-16 max-w-xs">
          <div className="divider-gold" />
        </div>

        {/* Section: Das Problem */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
              Das Problem: Einsamkeit im Alter
            </h2>
            <p className="mb-4 leading-relaxed text-[--muted]">
              In Deutschland leben Millionen Menschen ueber 50 allein. Die Kinder sind
              ausgezogen, der Partner vielleicht verstorben, die sozialen Kontakte werden
              weniger. Altersheime sind teuer und unpersoenlich, betreutes Wohnen oft
              nicht viel besser.
            </p>
            <p className="leading-relaxed text-[--muted]">
              Gleichzeitig steigen die Lebenshaltungskosten, die Rente reicht kaum,
              und der Traum von einem erfuellten Ruhestand scheint in weite Ferne zu ruecken.
            </p>
          </div>
        </section>

        {/* Section: Die Loesung */}
        <section className="mb-20 border border-white/5 bg-[--surface] p-8 md:p-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
              Unsere Loesung: Shared Living in Vietnam
            </h2>
            <p className="mb-6 leading-relaxed text-[--muted]">
              NLV Goldzeit Living bietet Ihnen das Beste aus beiden Welten: Die Privatsphaere
              eines eigenen Zimmers mit Bad, kombiniert mit der Gemeinschaft einer
              Wohngruppe in einer luxurioesen Pool-Villa.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-white/5 bg-[--bg] p-6">
                <h3 className="mb-3 font-bold text-[--primary]">Privatsphaere</h3>
                <ul className="space-y-2 text-sm text-[--muted]">
                  <li>- Eigenes Schlafzimmer mit eigenem Bad</li>
                  <li>- Hochwertige Moebel und Ausstattung</li>
                  <li>- Klimaanlage und WLAN</li>
                  <li>- Abschliessbarer Rueckzugsort</li>
                </ul>
              </div>
              <div className="border border-white/5 bg-[--bg] p-6">
                <h3 className="mb-3 font-bold text-[--primary]">Gemeinschaft</h3>
                <ul className="space-y-2 text-sm text-[--muted]">
                  <li>- Grosszuegige Gemeinschaftsraeume</li>
                  <li>- Gemeinsame Mahlzeiten (2x taeglich)</li>
                  <li>- Tropischer Garten mit Pool</li>
                  <li>- Gesellschaft von Gleichgesinnten</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Der Standort */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
              Der Standort: Da Nang, Vietnam
            </h2>
            <p className="mb-4 leading-relaxed text-[--muted]">
              Da Nang ist eine der modernsten und sichersten Staedte Vietnams. Mit
              kilometerlangen Sandstraenden, exzellenter medizinischer Versorgung und
              einem eigenen internationalen Flughafen ist es der ideale Ort fuer Ihren
              neuen Lebensabschnitt.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[--primary]">30+</div>
                <div className="text-sm text-[--muted]">Grad Durchschnittstemperatur</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[--primary]">70%</div>
                <div className="text-sm text-[--muted]">Guenstigere Lebenshaltung</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-[--primary]">24/7</div>
                <div className="text-sm text-[--muted]">Deutsche Betreuung</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Der Alltag */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
              Ihr neuer Alltag
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-[--primary] pl-6">
                <h3 className="mb-2 font-bold text-[--text]">Morgens</h3>
                <p className="text-sm text-[--muted]">
                  Aufwachen ohne Wecker, ein erfrischendes Bad im Pool oder Yoga auf der
                  Terrasse. Gemeinsames Fruehstueck mit frischen tropischen Fruechten und
                  vietnamesischem Kaffee.
                </p>
              </div>
              <div className="border-l-2 border-[--primary] pl-6">
                <h3 className="mb-2 font-bold text-[--text]">Mittags</h3>
                <p className="text-sm text-[--muted]">
                  Zeit fuer sich - lesen, spazieren am Strand, Hobbys nachgehen oder
                  die Stadt erkunden. Die Haushaltshilfe kuemmert sich um alles Organisatorische.
                </p>
              </div>
              <div className="border-l-2 border-[--primary] pl-6">
                <h3 className="mb-2 font-bold text-[--text]">Abends</h3>
                <p className="text-sm text-[--muted]">
                  Gemeinsames Abendessen mit vietnamesischer oder internationaler Kueche.
                  Danach vielleicht ein Spieleabend, ein Film oder einfach gute Gespraeche
                  bei einem Glas Wein.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Das Team */}
        <section className="mb-20 border border-white/5 bg-[--surface] p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-2xl font-light text-[--text]">
              Wir sind fuer Sie da
            </h2>
            <p className="mb-8 leading-relaxed text-[--muted]">
              Unser Team besteht aus deutschen Ansprechpartnern in Deutschland (fuer
              Ihre Vorbereitung), deutschen Betreuern vor Ort in Vietnam und erfahrenen
              vietnamesischen Mitarbeitern. Sie sind nie allein.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="mb-2 text-lg font-bold text-[--text]">Beratung DE</div>
                <p className="text-sm text-[--muted]">
                  Ihre Ansprechpartner in Deutschland fuer alle Fragen vor der Abreise.
                </p>
              </div>
              <div>
                <div className="mb-2 text-lg font-bold text-[--text]">Betreuung VN</div>
                <p className="text-sm text-[--muted]">
                  Deutsche Betreuer vor Ort, 24/7 erreichbar fuer alle Anliegen.
                </p>
              </div>
              <div>
                <div className="mb-2 text-lg font-bold text-[--text]">Haushalt</div>
                <p className="text-sm text-[--muted]">
                  Vietnamesische Haushaltshilfen, 8h taeglich im Einsatz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: FAQ */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 font-serif text-2xl font-light text-[--text]">
              Haeufige Fragen
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-bold text-[--text]">
                  Brauche ich ein Visum fuer Vietnam?
                </h3>
                <p className="text-sm text-[--muted]">
                  Ja, aber wir helfen Ihnen dabei. Es gibt verschiedene Visum-Optionen,
                  die Aufenthalte von mehreren Monaten bis zu einem Jahr ermoeglichen.
                  Wir beraten Sie individuell.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-[--text]">
                  Wie ist die medizinische Versorgung?
                </h3>
                <p className="text-sm text-[--muted]">
                  Da Nang hat mehrere internationale Krankenhaeuser mit englisch- und
                  teilweise deutschsprachigen Aerzten. Wir haben ein Netzwerk von
                  Medizinern und begleiten Sie bei Bedarf zu Terminen.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-[--text]">
                  Kann ich jederzeit zurueck nach Deutschland?
                </h3>
                <p className="text-sm text-[--muted]">
                  Selbstverstaendlich. Es gibt keine Mindestaufenthaltsdauer. Viele unserer
                  Bewohner verbringen die Wintermonate in Vietnam und den Sommer in Deutschland.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-[--text]">
                  Was ist, wenn ich nicht (mehr) alleine reisen kann?
                </h3>
                <p className="text-sm text-[--muted]">
                  Wir organisieren auf Wunsch einen Begleitservice - sowohl fuer die Anreise
                  als auch fuer eventuelle Rueckfluege. Sie sind bei uns in guten Haenden.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-serif text-2xl font-light text-[--text]">
            Bereit fuer Ihr neues Leben?
          </h2>
          <p className="mb-8 text-[--muted]">
            Fordern Sie jetzt unverbindlich weitere Informationen an.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/goldzeit/kontakt"
              className="bg-[--primary] px-8 py-4 text-center font-bold text-white transition-all hover:bg-[--primary-hover]"
            >
              Kostenlose Beratung
            </Link>
            <a
              href="https://wa.me/4915112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[--glass-border] px-8 py-4 text-[--text] transition-colors hover:border-[--primary] hover:text-[--primary]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
