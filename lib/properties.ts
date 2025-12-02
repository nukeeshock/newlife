export type PropertyStatus = "available" | "reserved" | "rented" | "archived";
export type PropertyType = "private_residence" | "apartment" | "house" | "commercial";

export interface Property {
  slug: string;
  title: string;
  description: string;
  city: string;
  country: string;
  address: string;
  price: number;
  currency: "EUR" | "USD";
  status: PropertyStatus;
  type: PropertyType;
  recommended?: boolean;
  images: string[];
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  popularity?: number;
}

export const propertyTypeCopy: Record<
  PropertyType,
  { label: string; summary: string }
> = {
  private_residence: {
    label: "Private Residenzen",
    summary: "Exklusive Rückzugsorte mit Privatsphäre, Strandnähe oder tropischem Garten.",
  },
  apartment: {
    label: "Apartments",
    summary: "Modernes Stadtleben in Da Nang oder Saigon mit Balkon, Concierge und Aussicht.",
  },
  house: {
    label: "Villen",
    summary: "Großzügige Häuser und Villen für längere Aufenthalte, teils komplett möbliert.",
  },
  commercial: {
    label: "Gewerbeflächen",
    summary: "Repräsentative Flächen in Top-Lagen für Büro, Showroom oder Gastronomie.",
  },
};

export const properties: Property[] = [
  {
    slug: "lakeside-villa-son-tra",
    title: "Lakeside Villa Son Tra",
    description:
      "Zeitlose Villa mit offenem Grundriss, bodentiefen Fenstern und Blick auf die Bucht von Da Nang. Möbliert, inkl. Housekeeping-Option.",
    city: "Da Nang",
    country: "Vietnam",
    address: "Vo Nguyen Giap 18",
    price: 36_000,
    currency: "USD",
    status: "available",
    type: "house",
    recommended: true,
    popularity: 1,
    area: 420,
    bedrooms: 5,
    bathrooms: 4,
    amenities: [
      "Seeterrasse",
      "Home Spa",
      "Garage für 3 Fahrzeuge",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/da-nang.jpg", "/trees.jpg", "/da-nang.jpg"],
  },
  {
    slug: "skyline-apartment-saigon",
    title: "Skyline Apartment Saigon",
    description:
      "Penthouse mit umlaufender Terrasse, Concierge-Service und Blick über Saigon River. Maßgefertigte Küche, integriertes Lichtkonzept.",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    address: "Nguyen Hue 22",
    price: 26_400,
    currency: "USD",
    status: "reserved",
    type: "apartment",
    recommended: true,
    popularity: 2,
    area: 210,
    bedrooms: 3,
    bathrooms: 3,
    amenities: [
      "Concierge",
      "Terrasse",
      "Privater Stellplatz",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/trees.jpg", "/da-nang.jpg", "/trees.jpg"],
  },
  {
    slug: "courtyard-residence-hoi-an",
    title: "Courtyard Residence Hoi An",
    description:
      "Innenhof-Residenz nahe Altstadt Hoi An. Ruhiger Garten, hohe Decken, Atelier-Licht, ideal für längere Aufenthalte.",
    city: "Hoi An",
    country: "Vietnam",
    address: "Tran Hung Dao 10",
    price: 42_000,
    currency: "USD",
    status: "available",
    type: "private_residence",
    recommended: true,
    popularity: 3,
    area: 380,
    bedrooms: 5,
    bathrooms: 3,
    amenities: [
      "Garteninnenhof",
      "Weinkeller",
      "Kamin",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/da-nang.jpg", "/trees.jpg", "/da-nang.jpg"],
  },
  {
    slug: "atelier-loft-thu-duc",
    title: "Atelier Loft Thu Duc",
    description:
      "Doppelgeschossiges Loft mit offenen Stahlträgern und 8m Fensterfront in Thu Duc City. Separate Studio-Tür für Live/Work.",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    address: "Pham Van Dong 88",
    price: 24_000,
    currency: "USD",
    status: "rented",
    type: "apartment",
    recommended: false,
    popularity: 4,
    area: 185,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      "Flussblick",
      "Separater Studioeingang",
      "Fußbodenheizung",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/trees.jpg", "/da-nang.jpg", "/trees.jpg"],
  },
  {
    slug: "terrace-house-nha-trang",
    title: "Terrace House Nha Trang",
    description:
      "Hanglage mit Blick aufs Meer, großzügige Terrasse und Outdoor-Kitchen. Naturmaterialien und energieeffiziente Technik.",
    city: "Nha Trang",
    country: "Vietnam",
    address: "Tran Phu 160",
    price: 30_000,
    currency: "USD",
    status: "available",
    type: "house",
    recommended: false,
    popularity: 5,
    area: 260,
    bedrooms: 4,
    bathrooms: 3,
    amenities: [
      "Bergblick",
      "Außenküche",
      "Sauna",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/da-nang.jpg", "/trees.jpg", "/da-nang.jpg"],
  },
  {
    slug: "boutique-office-d1",
    title: "Boutique Office District 1",
    description:
      "Repräsentative Gewerbefläche mit 5,5m Decken im District 1. Große Fensterfront, flexible Raumteilung für Studio/Showroom.",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    address: "Le Loi 5",
    price: 48_000,
    currency: "USD",
    status: "available",
    type: "commercial",
    recommended: false,
    popularity: 6,
    area: 280,
    amenities: [
      "Hohe Decken",
      "Eckeinheit",
      "Premium-Lage",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/trees.jpg", "/da-nang.jpg", "/trees.jpg"],
  },
  {
    slug: "garden-pavilion-an-bang",
    title: "Garden Pavilion An Bang",
    description:
      "Pavillon mit umlaufender Glasfassade und fließendem Übergang zum Garten, wenige Minuten zum An Bang Beach. Ideal als Gästehaus.",
    city: "Hoi An",
    country: "Vietnam",
    address: "An Bang Village",
    price: 18_000,
    currency: "USD",
    status: "archived",
    type: "private_residence",
    recommended: false,
    popularity: 7,
    area: 150,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      "Garten",
      "Bodentiefe Verglasung",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/da-nang.jpg", "/trees.jpg", "/da-nang.jpg"],
  },
  {
    slug: "marina-penthouse-da-nang",
    title: "Marina Penthouse Da Nang",
    description:
      "Top-floor Penthouse mit Doppel-Loggia und Blick über den Hafen von Da Nang. Offene Küche, integrierter Kamin, Abendlicht von Westen.",
    city: "Da Nang",
    country: "Vietnam",
    address: "Truong Sa 15",
    price: 34_800,
    currency: "USD",
    status: "available",
    type: "apartment",
    recommended: true,
    popularity: 4,
    area: 240,
    bedrooms: 3,
    bathrooms: 3,
    amenities: [
      "Doppelterrasse",
      "Kamin",
      "Hafenblick",
      "Wöchentliche Reinigung inklusive",
    ],
    images: ["/trees.jpg", "/da-nang.jpg", "/trees.jpg"],
  },
];

export function getPropertiesByType(type: PropertyType) {
  return properties.filter((property) => property.type === type);
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}
