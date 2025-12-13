/**
 * City Data - Static content for city landing pages
 *
 * This data is used by generateStaticParams for SSG and
 * the city page component for rendering.
 */

export interface CityHighlight {
  title: string;
  subtitle: string;
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
  realEstate: string;
}

export interface InvestmentPoint {
  title: string;
  highlight: string;
  content: string;
  icon:
  | "tax"
  | "port"
  | "trend"
  | "users"
  | "building"
  | "globe"
  | "shield"
  | "utensils"
  | "landmark"
  | "plane"
  | "umbrella-beach";
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
    heroTitle: "Da Nang: Der Sweetspot für Investoren",
    heroSubtitle:
      "Die lebenswerteste Stadt Vietnams bietet die perfekte Balance aus Rendite und Lebensqualität. Mit aggressiven Steueranreizen, einer brandneuen Freihandelszone und Traumstränden vor der Bürotür ist Da Nang die smarteste Wahl für zukunftsorientierte Unternehmen und Expats.",
    intro:
      "Da Nang ist eine Stadt, die man sofort ins Herz schließt – modern, sauber und mit einer Lebensqualität, die in Südostasien ihresgleichen sucht. Kilometerlange weiße Sandstrände, kristallklares Meer und ein angenehm mildes Klima machen die Stadt zu einem der begehrtesten Lebens- und Investmentstandorte der Region.",
    highlights: [
      {
        title: "SMART MONEY",
        subtitle: "STEUER-PARADIES",
        description:
          "Maximieren Sie Ihren Gewinn durch die besten Incentives des Landes. Im High-Tech-Sektor und der neuen FTZ winken jahrelange Steuerbefreiungen (bis zu 0% für 4 Jahre). Wer clever kalkuliert, startet hier mit einem massiven Liquiditätsvorteil.",
        icon: "wallet", // Interpreted as tax/money
      },
      {
        title: "GLOBAL GATEWAY",
        subtitle: "FREIHANDELSZONE (FTZ)",
        description:
          "Nutzen Sie den 'First Mover'-Vorteil in Vietnams erster echter städtischer Freihandelszone. Mit direkter Anbindung an den Tiefseehafen und Flughafen ist Da Nang Ihr ultraschnelles Tor zu den Weltmärkten – effizient, modern und zollbegünstigt.",
        icon: "globe",
      },
      {
        title: "SINGAPORE VIBES",
        subtitle: "EFFIZIENZ & KLIMA",
        description:
          "Da Nang gilt als das 'Singapur Vietnams'. Freuen Sie sich auf transparente Behörden, digitale Prozesse und eine Business-Kultur, die Lösungen sucht statt Probleme. Weniger Bürokratie bedeutet für Sie: Mehr Zeit für Ihr Kerngeschäft.",
        icon: "shield", // Interpreted as efficiency/safety
      },
      {
        title: "MAGNET FOR TALENT",
        subtitle: "LEBENSQUALITÄT",
        description:
          "Kein Smog, kein Stau, dafür Strand und Berge in 15 Minuten. Diese Lebensqualität macht es Ihnen leicht, Top-Management und Fachkräfte zu gewinnen und langfristig zu halten. Ein Standort, an dem Ihr Team nicht nur arbeitet, sondern gerne lebt.",
        icon: "building", // Interpreted as lifestyle/place
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
      grid2: "/danang_grid2_rooftop_dining.png",
      grid3: "/danang_grid3_beachwalk.png",
      realEstate: "/danang_realestate_condo.png",
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
    heroTitle: "Hoi An: Zeitlose Eleganz & Lifestyle",
    heroSubtitle:
      "Entfliehen Sie der Hektik und tauchen Sie ein in eine Welt aus Kultur und Ästhetik. Hoi An ist weit mehr als ein Touristenziel – es ist ein Rückzugsort für Genießer, Kreative und Ruhesuchende. Immobilien hier sind rare Sammlerstücke, die ihren Wert durch Einzigartigkeit erhalten.",
    intro:
      "Hoi An verzaubert mit seinem UNESCO-geschützten Altstadtkern, romantischen Laternenstraßen und einer einzigartigen Mischung aus Geschichte und Moderne. Die kleine Küstenstadt ist ein Juwel der vietnamesischen Kultur und zieht Reisende aus aller Welt in ihren Bann.",
    highlights: [
      {
        title: "LIFESTYLE HAVEN",
        subtitle: "LEBENSQUALITÄT",
        description:
          "Der Gegenpol zur Hektik. Hoi An bietet eine weltweit einzigartige Mischung aus UNESCO-Weltkulturerbe, Reisfeldern und Traumstränden. Ideal für alle, die Ruhe, saubere Luft und eine ästhetische Umgebung für ihren (Un-)Ruhestand suchen.",
        icon: "utensils", // Keeping existing icons where possible or swapping. Using utensils for lifestyle/food part.
      },
      {
        title: "BOUTIQUE BUSINESS",
        subtitle: "KREATIVWIRTSCHAFT",
        description:
          "Der perfekte Standort für individuelle Konzepte: Boutique-Hotels, gehobene Gastronomie oder Kunsthandwerk. Sie erreichen hier kaufkräftige Touristen aus aller Welt, die das Besondere suchen, keine Massenware.",
        icon: "scissors", // Fits boutique/craft
      },
      {
        title: "HERITAGE & BEACH",
        subtitle: "BEST OF BOTH WORLDS",
        description:
          "Morgens Kaffee in der historischen Altstadt, nachmittags Baden am An Bang Beach. Diese seltene Kombination macht Immobilien hier extrem begehrt für die lukrative Ferienvermietung und als privater Zweitwohnsitz.",
        icon: "umbrella-beach",
      },
      {
        title: "SCARCITY VALUE",
        subtitle: "KNAPPHEIT",
        description:
          "Durch den UNESCO-Schutz und strikte Bauvorschriften ist das Angebot in Bestlagen natürlich begrenzt. Das schützt Ihr Investment vor Überbauung und sorgt für langfristige Wertsteigerung bei Villen und Boutique-Objekten.",
        icon: "landmark", // Fits heritage/scarcity
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
      grid2: "/hoian_grid2_beach_lounge.png",
      grid3: "/hoian_grid3_street.png",
      realEstate: "/hoian_realestate_villa.png",
    },

  },
  "ho-chi-minh": {
    name: "Ho Chi Minh City",
    heroTitle: "Ho Chi Minh City: The Pulse of Vietnam",
    heroSubtitle:
      "HCMC ist der Ort, an dem Ambition auf Lebensfreude trifft. Als wirtschaftlicher Motor des Landes bietet die Metropole unvergleichliche Karrierechancen, ein pulsierendes Nachtleben und Immobilien mit höchstem Wertsteigerungspotenzial. Hier investieren Sie in die Zukunft Asiens.",
    intro:
      "Ho Chi Minh City – von Einheimischen liebevoll Saigon genannt – ist das wirtschaftliche Herz Vietnams. Eine Stadt, die niemals schläft, mit endlosen Möglichkeiten, einer pulsierenden Startup-Szene und einem Lifestyle, der Tradition und Moderne meisterhaft vereint.",
    highlights: [
      {
        title: "THE POWERHOUSE",
        subtitle: "WIRTSCHAFTSMOTOR",
        description:
          "Hier schlägt das Herz der vietnamesischen Wirtschaft. HCMC ist der Ort für Karriere, Networking und Big Business. Wer hier investiert, zielt auf maximale Wertschöpfung in einem der dynamischsten Märkte Asiens. Ideal für HQs und High-End-Services.",
        icon: "building",
      },
      {
        title: "COSMOPOLITAN LIVING",
        subtitle: "LUXUS & LIFESTYLE",
        description:
          "Das 'New York' Vietnams: Rooftop-Bars, internationale Schulen, erstklassige Krankenhäuser und Shopping-Malls auf Weltniveau. In Vierteln wie Thao Dien leben Sie in einer internationalen 'Bubble' mit höchstem westlichen Komfort.",
        icon: "moon", // Nightlife/Lifestyle
      },
      {
        title: "PRIME REAL ESTATE",
        subtitle: "WERTSTABILITÄT",
        description:
          "Immobilien in Distrikt 1 oder 2 sind das 'Betongold' Vietnams. Zwar ist der Einstiegspreis höher, dafür profitieren Sie von exzellenter Vermietbarkeit an Expats und Manager sowie einer historisch starken Wertsteigerung.",
        icon: "shield", // Stability/Value
      },
      {
        title: "URBAN INNOVATION",
        subtitle: "TECH-HUB",
        description:
          "HCMC zieht die besten Talente des Landes an. Mit Zonen wie der Thu Duc City entsteht ein gigantisches Innovationszentrum. Perfekt für Investoren, die Zugang zu hochqualifizierten IT-Fachkräften und einem kreativen Ökosystem suchen.",
        icon: "globe", // Global/Innovation
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
      grid2: "/hcmc_grid2_landmark81.png",
      grid3: "/hcmc_grid3_business.png",
      realEstate: "/hcmc_realestate_penthouse.png",
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
