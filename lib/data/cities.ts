/**
 * City Data - Static content for city landing pages
 *
 * This data is used by generateStaticParams for SSG and
 * the city page component for rendering.
 */

export interface CityHighlight {
  title: string;
  description: string;
  icon: string;
}

export interface CitySection {
  title: string;
  content: string;
}

export interface CityActivity {
  title: string;
  description: string;
}

export interface CityImages {
  hero: string;
  grid1: string;
  grid2: string;
  grid3: string;
}

export interface InvestmentPoint {
  title: string;
  highlight: string;
  content: string;
  icon: "tax" | "port" | "trend" | "users";
}

export interface CityInvestment {
  title: string;
  intro: string;
  points: InvestmentPoint[];
}

export interface CityData {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  highlights: CityHighlight[];
  sections: CitySection[];
  activities: CityActivity[];
  propertyType: string;
  images: CityImages;
  investment?: CityInvestment;
}

export const CITY_DATA: Record<string, CityData> = {
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
      hero: "/danang_hero_luxury_1765620939544.png",
      grid1: "/danang_dragon_bridge_night_1765621738383.png",
      grid2: "/danang_lifestyle_luxury_1765620989756.png",
      grid3: "/danang_marble_mountains_1765621752595.png",
    },
    investment: {
      title: "Standortvorteil Da Nang: Der Sweetspot für Investoren",
      intro:
        "Da Nang bietet massive Chancen, erfordert aber eine präzise Standortwahl für die maximalen Incentives. Hier die Faktenlage – ohne Marketing-Blabla.",
      points: [
        {
          title: "Steuer-Incentives",
          highlight: "Der Hebel",
          content:
            "Fast steuerfrei starten: Nutzen Sie das 10/15-Modell im High-Tech Park & FTZ. 4 Jahre 0% Steuer, 9 Jahre 50% Rabatt (effektiv 5%). Ideal für Tech-, R&D- und Export-Unternehmen.",
          icon: "tax",
        },
        {
          title: "Freihandelszone (FTZ)",
          highlight: "First Mover",
          content:
            "Vietnams erstes echtes urbanes FTZ-Pilotprojekt (Res. 136/2024). Direkt verbunden mit Tiefseehafen Lien Chieu und Airport. Eigene Zollabwicklung vor Ort und One-Stop-Admin.",
          icon: "port",
        },
        {
          title: "Investitionsklima",
          highlight: "Singapur Vietnams",
          content:
            "Top-Platzierungen im Competitiveness Index (PCI). Transparente Verwaltung, weniger Bürokratie als im Norden/Süden und 15–20% geringere Lohnkosten bei hoher Verfügbarkeit von IT-Talenten.",
          icon: "trend",
        },
        {
          title: "Retention & Lebensqualität",
          highlight: "Hidden Champion",
          content:
            "Kein Smog, kein Stau, Strand & Berge in 15 Min. Das hält Talente in der Region (geringe Fluktuation) und macht Da Nang zum attraktivsten Standort für Expats und Management.",
          icon: "users",
        },
      ],
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
      hero: "/hoian_hero_river_clean_1765622183752.png",
      grid1: "/hoian_japanese_bridge_1765621769977.png",
      grid2: "/hoian_hero_lanterns_1765621004745.png",
      grid3: "/hoian_an_bang_beach_1765621798731.png",
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
      hero: "/hcmc_hero_skyline_realistic_1765622166570.png",
      grid1: "/hcmc_ben_thanh_market_1765621815224.png",
      grid2: "/hcmc_lifestyle_luxury_1765621044893.png",
      grid3: "/hcmc_notre_dame_1765621829407.png",
    },
  },
};

/**
 * Get all city slugs for generateStaticParams
 */
export function getCitySlugs(): string[] {
  return Object.keys(CITY_DATA);
}

/**
 * Get city data by slug
 */
export function getCityBySlug(slug: string): CityData | undefined {
  return CITY_DATA[slug];
}
