import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/json-ld";

// City data with content
const cityData: Record<
  string,
  {
    name: string;
    heroTitle: string;
    heroSubtitle: string;
    intro: string;
    highlights: { title: string; description: string; icon: string }[];
    sections: { title: string; content: string }[];
    activities: { title: string; description: string }[];
    propertyType: string;
    // Placeholder image descriptions for each city
    images: {
      hero: string;
      grid1: string;
      grid2: string;
      grid3: string;
    };
  }
> = {
  "da-nang": {
    name: "Da Nang",
    heroTitle: "Da Nang",
    heroSubtitle: "Vietnams Tor zur Zentralküste",
    intro:
      "Da Nang ist eine Stadt, die man sofort ins Herz schließt – modern, sauber und mit einer Lebensqualität, die in Südostasien ihresgleichen sucht. Kilometerlange weiße Sandstrände, kristallklares Meer und ein angenehm mildes Klima machen die Stadt zu einem der begehrtesten Lebens- und Investmentstandorte der Region.",
    highlights: [
      {
        title: "Erschwinglich",
        description:
          "Lebenshaltungskosten, Restaurants und hochwertige Wohnungen sind deutlich günstiger als in Europa – bei exzellenter Qualität.",
        icon: "wallet",
      },
      {
        title: "Sicher & Entspannt",
        description:
          "Extrem niedrige Kriminalitätsrate, keine Bettler und eine freundliche, entspannte Atmosphäre für alle Altersgruppen.",
        icon: "shield",
      },
      {
        title: "Perfekte Infrastruktur",
        description:
          "Internationaler Flughafen nur Minuten vom Zentrum und den Stränden entfernt. Hoi An und Son Tra direkt vor der Haustür.",
        icon: "plane",
      },
      {
        title: "Kulinarisches Paradies",
        description:
          "Authentische vietnamesische Küche, fantastische Seafood-Restaurants und eine wachsende internationale Gastro-Szene.",
        icon: "utensils",
      },
    ],
    sections: [
      {
        title: "Ideal für Rentner & Senioren",
        content:
          "Da Nang ist wie geschaffen für Menschen, die ihren Ruhestand in einem warmen, sicheren Umfeld genießen möchten. Die Stadt ist ruhig organisiert, bietet exzellente medizinische Versorgung im stetigen Ausbau und lädt zu täglichen Strandspaziergängen bei mildem Klima und frischer Meeresluft ein. Viele Rentner fühlen sich hier vom ersten Tag an wie zu Hause.",
      },
      {
        title: "Immobilien mit Zukunft",
        content:
          "Trotz des schnellen Wachstums bleibt Da Nang erstaunlich erschwinglich. Der Immobilienmarkt bietet hervorragende Qualität zu fairen Preisen – ob als Kapitalanlage, Ferienobjekt oder neuen Lebensmittelpunkt. Wer hier investiert, entscheidet sich für eine Stadt mit enormem Zukunftspotenzial.",
      },
    ],
    activities: [
      {
        title: "My Khe Beach",
        description:
          "Einer der schönsten Strände Asiens – kilometerlang, sauber und ideal zum Schwimmen, Surfen oder einfach Entspannen.",
      },
      {
        title: "Marble Mountains",
        description:
          "Fünf mystische Marmor-Berge mit Höhlen, Pagoden und atemberaubenden Aussichten über Stadt und Meer.",
      },
      {
        title: "Son Tra Halbinsel",
        description:
          "Naturschutzgebiet mit Wanderwegen, seltenen Affen und der beeindruckenden Lady Buddha Statue.",
      },
      {
        title: "Dragon Bridge",
        description:
          "Die ikonische Drachenbrücke speit am Wochenende Feuer und Wasser – ein Spektakel für die ganze Familie.",
      },
      {
        title: "Ba Na Hills",
        description:
          "Die berühmte Goldene Brücke und ein französisches Bergdorf auf 1.400 Metern Höhe – ca. 45 Minuten entfernt.",
      },
      {
        title: "Hoi An Altstadt",
        description:
          "UNESCO-Weltkulturerbe nur 30 Minuten entfernt. Laternenlichter, Schneiderkunst und kulinarische Vielfalt.",
      },
    ],
    propertyType: "Da Nang",
    images: {
      hero: "Strand My Khe",
      grid1: "Dragon Bridge bei Nacht",
      grid2: "Moderne Skyline",
      grid3: "Marble Mountains",
    },
  },
  "hoi-an": {
    name: "Hoi An",
    heroTitle: "Hoi An",
    heroSubtitle: "Die Stadt der Laternen",
    intro:
      "Hoi An verzaubert mit seinem UNESCO-geschützten Altstadtkern, romantischen Laternenstraßen und einer einzigartigen Mischung aus Geschichte und Moderne. Die kleine Küstenstadt ist ein Juwel der vietnamesischen Kultur und zieht Reisende aus aller Welt in ihren Bann.",
    highlights: [
      {
        title: "UNESCO Welterbe",
        description:
          "Die historische Altstadt ist eines der am besten erhaltenen Handelszentren Südostasiens aus dem 15.-19. Jahrhundert.",
        icon: "landmark",
      },
      {
        title: "Kulinarik-Hauptstadt",
        description:
          "Berühmt für Cao Lau, Banh Mi und White Rose – Hoi An gilt als kulinarisches Herz Vietnams.",
        icon: "utensils",
      },
      {
        title: "Maßschneider-Paradies",
        description:
          "Über 400 Schneider-Ateliers fertigen innerhalb von 24 Stunden maßgeschneiderte Kleidung zu günstigen Preisen.",
        icon: "scissors",
      },
      {
        title: "An Bang Beach",
        description:
          "Nur wenige Kilometer entfernt liegt einer der ruhigsten und schönsten Strände der Region.",
        icon: "umbrella-beach",
      },
    ],
    sections: [
      {
        title: "Leben im Künstlerparadies",
        content:
          "Hoi An ist der perfekte Ort für Menschen, die Ruhe, Schönheit und Kultur suchen. Die Stadt ist klein genug, um alles mit dem Fahrrad zu erreichen, und bietet dennoch alles, was man zum Leben braucht. Künstler, Schriftsteller und kreative Köpfe aus aller Welt haben hier ihr neues Zuhause gefunden.",
      },
      {
        title: "Immobilien mit Charme",
        content:
          "Von traditionellen Shophouses über moderne Villen bis hin zu charmanten Boutique-Hotels – der Immobilienmarkt in Hoi An bietet einzigartige Möglichkeiten für Investoren und Auswanderer, die das Besondere suchen.",
      },
    ],
    activities: [
      {
        title: "Altstadt bei Nacht",
        description:
          "Wenn tausende Laternen die Straßen erhellen, verwandelt sich die Altstadt in ein magisches Lichtermeer.",
      },
      {
        title: "Japanische Brücke",
        description:
          "Das Wahrzeichen der Stadt aus dem 16. Jahrhundert verbindet Geschichte mit fotogener Schönheit.",
      },
      {
        title: "Kochkurse",
        description:
          "Lernen Sie die Geheimnisse der vietnamesischen Küche direkt von lokalen Meisterköchen.",
      },
      {
        title: "Cua Dai Beach",
        description:
          "Weitläufiger Sandstrand ideal für entspannte Tage am Meer und spektakuläre Sonnenuntergänge.",
      },
    ],
    propertyType: "Hoi An",
    images: {
      hero: "Laternenstraße bei Nacht",
      grid1: "Japanische Brücke",
      grid2: "Altstadt Architektur",
      grid3: "An Bang Beach",
    },
  },
  "ho-chi-minh": {
    name: "Ho Chi Minh City",
    heroTitle: "Ho Chi Minh City",
    heroSubtitle: "Die pulsierende Metropole des Südens",
    intro:
      "Ho Chi Minh City – von Einheimischen liebevoll Saigon genannt – ist das wirtschaftliche Herz Vietnams. Eine Stadt, die niemals schläft, mit endlosen Möglichkeiten, einer pulsierenden Startup-Szene und einem Lifestyle, der Tradition und Moderne meisterhaft vereint.",
    highlights: [
      {
        title: "Wirtschaftszentrum",
        description:
          "Das finanzielle Zentrum Vietnams mit internationalem Flair, globalen Unternehmen und unbegrenzten Geschäftsmöglichkeiten.",
        icon: "building",
      },
      {
        title: "Nachtleben & Kultur",
        description:
          "Von Rooftop-Bars über Kunstgalerien bis hin zu historischen Tempeln – für jeden Geschmack ist etwas dabei.",
        icon: "moon",
      },
      {
        title: "Internationale Community",
        description:
          "Eine der größten Expat-Communities Asiens mit deutschen Stammtischen, internationalen Schulen und mehr.",
        icon: "globe",
      },
      {
        title: "Medizinische Exzellenz",
        description:
          "Erstklassige internationale Krankenhäuser und Kliniken mit westlichem Standard und deutschsprachigem Personal.",
        icon: "hospital",
      },
    ],
    sections: [
      {
        title: "Dynamisch & Kosmopolitisch",
        content:
          "Ho Chi Minh City ist die erste Wahl für Unternehmer, digitale Nomaden und alle, die das urbane Leben lieben. Die Stadt bietet erstklassige Co-Working Spaces, schnelles Internet und eine lebendige Startup-Szene. Hier entstehen täglich neue Ideen und Geschäftsmöglichkeiten.",
      },
      {
        title: "Premium-Immobilien",
        content:
          "Vom schicken Penthouse in District 1 über moderne Apartments in Thao Dien bis hin zu Gewerbeflächen für Ihr neues Business – der Immobilienmarkt in Ho Chi Minh City ist so vielfältig wie die Stadt selbst.",
      },
    ],
    activities: [
      {
        title: "Ben Thanh Market",
        description:
          "Der ikonische Markt der Stadt – perfekt für Street Food, Souvenirs und authentische vietnamesische Eindrücke.",
      },
      {
        title: "Cu Chi Tunnel",
        description:
          "Das beeindruckende Tunnelsystem aus dem Vietnamkrieg, ca. 1,5 Stunden von der Stadt entfernt.",
      },
      {
        title: "Rooftop-Bars",
        description:
          "Genießen Sie spektakuläre Ausblicke auf die Skyline von den besten Rooftop-Bars Südostasiens.",
      },
      {
        title: "Mekong Delta",
        description:
          "Tagesausflüge ins grüne Herz Vietnams mit schwimmenden Märkten und tropischer Landschaft.",
      },
    ],
    propertyType: "Ho Chi Minh City",
    images: {
      hero: "Skyline bei Nacht",
      grid1: "Ben Thanh Market",
      grid2: "Rooftop Bar Aussicht",
      grid3: "Notre Dame Kathedrale",
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(cityData).map((city) => ({
    city,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cityData[citySlug];

  if (!city) {
    return { title: "Stadt nicht gefunden | NEW LIFE VIETNAM" };
  }

  const description = city.intro.slice(0, 155) + "...";

  return {
    title: `Immobilien in ${city.name} – Luxus-Mietobjekte`,
    description,
    openGraph: {
      title: `${city.name} – Luxus-Immobilien in Vietnam`,
      description,
      type: "website",
      url: `https://newlifevietnam.com/stadt/${citySlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.name} – Immobilien`,
      description,
    },
    alternates: {
      canonical: `https://newlifevietnam.com/stadt/${citySlug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = cityData[citySlug];

  if (!city) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://newlifevietnam.com" },
          { name: city.name, url: `https://newlifevietnam.com/stadt/${citySlug}` },
        ]}
      />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-28">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: city.name },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative flex min-h-[50vh] items-center justify-center px-6 pt-8 pb-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Entdecken Sie
          </p>
          <h1 className="font-serif text-5xl font-light leading-tight text-[--text] md:text-7xl">
            {city.heroTitle}
          </h1>
          <p className="mt-4 font-serif text-xl italic text-[--muted] md:text-2xl">
            {city.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-[--text] md:text-xl">
            {city.intro}
          </p>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="divider-gold" />

      {/* Bento Grid - Highlights with Images */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
            Was {city.name} besonders macht
          </h2>

          {/* Bento Grid Layout - Mobile: stacked, Desktop: asymmetric grid */}
          <div className="grid gap-4 md:grid-cols-12 md:gap-6">
            {/* Large Image - spans 7 cols, 2 rows on desktop */}
            <div className="relative aspect-[4/3] overflow-hidden border border-[--glass-border] bg-[--card] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[400px]">
              <ImagePlaceholder label={city.images.grid1} />
            </div>

            {/* Card 1 - right side top */}
            <div className="md:col-span-5">
              <HighlightCard highlight={city.highlights[0]} />
            </div>

            {/* Card 2 - right side bottom */}
            <div className="md:col-span-5">
              <HighlightCard highlight={city.highlights[1]} />
            </div>

            {/* Card 3 - left side */}
            <div className="md:col-span-5">
              <HighlightCard highlight={city.highlights[2]} />
            </div>

            {/* Image 2 - spans 7 cols, 2 rows on desktop */}
            <div className="relative aspect-[4/3] overflow-hidden border border-[--glass-border] bg-[--card] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[400px]">
              <ImagePlaceholder label={city.images.grid2} />
            </div>

            {/* Card 4 - left side */}
            <div className="md:col-span-5">
              <HighlightCard highlight={city.highlights[3]} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections with alternating images */}
      {city.sections.map((section, index) => (
        <section
          key={section.title}
          className={`px-6 py-16 md:py-20 ${index % 2 === 0 ? "bg-[--surface]" : ""}`}
        >
          <div className="mx-auto max-w-6xl">
            <div
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <h2 className="mb-6 font-serif text-2xl font-light text-[--text] md:text-3xl">
                  {section.title}
                </h2>
                <p className="leading-relaxed text-[--muted]">
                  {section.content}
                </p>
              </div>

              {/* Image */}
              <div
                className={`relative aspect-[4/3] overflow-hidden border border-[--glass-border] bg-[--card] ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <ImagePlaceholder
                  label={index === 0 ? city.images.grid3 : city.images.hero}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Activities Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
            Entdecken & Erleben
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-[--muted]">
            {city.name} bietet unzählige Möglichkeiten für Ausflüge, Erholung
            und kulturelle Erlebnisse
          </p>

          {/* Activities Bento Grid */}
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {city.activities.map((activity, index) => (
              <div
                key={activity.title}
                className={`group border border-[--glass-border] bg-[--card] p-6 transition-all duration-300 hover:border-[--primary]/30 ${
                  index === 0 ? "md:col-span-2" : ""
                } ${index === 3 ? "md:col-span-2" : ""}`}
              >
                <h3 className="mb-2 font-medium text-[--text] transition-colors group-hover:text-[--primary]">
                  {activity.title}
                </h3>
                <p className="text-sm leading-relaxed text-[--muted]">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[--surface] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-serif text-3xl font-light text-[--text] md:text-4xl">
            Immobilien in {city.name}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[--muted]">
            Entdecken Sie unsere handverlesenen Objekte – von modernen
            Apartments über luxuriöse Villen bis hin zu attraktiven
            Gewerbeflächen.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3">
            <Link
              href={`/immobilien/objekte?type=apartment&city=${encodeURIComponent(city.propertyType)}`}
              className="inline-flex items-center border border-[--primary] bg-[--primary] px-6 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
            >
              Apartments
            </Link>
            <Link
              href={`/immobilien/objekte?type=house&city=${encodeURIComponent(city.propertyType)}`}
              className="inline-flex items-center border border-[--primary] bg-[--primary] px-6 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
            >
              Villen
            </Link>
            <Link
              href={`/immobilien/objekte?type=private_residence&city=${encodeURIComponent(city.propertyType)}`}
              className="inline-flex items-center border border-[--primary] bg-[--primary] px-6 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
            >
              Residenzen
            </Link>
            <Link
              href="/immobilien/kontakt"
              className="inline-flex items-center border border-[--glass-border] px-8 py-4 text-sm font-medium tracking-wide text-[--text] transition-all hover:border-[--primary] hover:text-[--primary]"
            >
              Beratung anfordern
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

// Highlight Card Component
function HighlightCard({
  highlight,
}: {
  highlight: { title: string; description: string; icon: string };
}) {
  return (
    <div className="border border-[--glass-border] bg-[--card] p-6 transition-all duration-300 hover:border-[--primary]/30 md:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[--primary]/30 text-[--primary]">
        <HighlightIcon icon={highlight.icon} />
      </div>
      <h3 className="mb-2 text-lg font-medium text-[--text]">
        {highlight.title}
      </h3>
      <p className="text-sm leading-relaxed text-[--muted]">
        {highlight.description}
      </p>
    </div>
  );
}

// Image Placeholder Component
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[--card] to-[--surface]">
      {/* Placeholder Icon */}
      <svg
        aria-hidden="true"
        className="mb-4 h-16 w-16 text-[--primary]/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      {/* Label */}
      <span className="px-4 text-center text-sm font-medium text-[--muted]">
        {label}
      </span>
      {/* Decorative border */}
      <div className="absolute inset-4 border border-dashed border-[--glass-border]" />
    </div>
  );
}

// Icon component for highlights
function HighlightIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    wallet: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        />
      </svg>
    ),
    shield: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
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
    ),
    plane: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    ),
    utensils: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12"
        />
      </svg>
    ),
    landmark: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>
    ),
    scissors: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
        />
      </svg>
    ),
    "umbrella-beach": (
      <svg
        aria-hidden="true"
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
    ),
    building: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    moon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    ),
    globe: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    hospital: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[icon] || icons.building;
}
