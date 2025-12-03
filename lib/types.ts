import type { PropertyStatus, PropertyType, ListingType } from "@prisma/client";

// Re-export Prisma types
export type { PropertyStatus, PropertyType, ListingType };

// Property type for frontend use (with BigInt converted to number for JSON)
export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  city: string;
  country: string;
  address: string | null;
  listingType: ListingType;
  priceEUR: number;
  priceVND: number; // BigInt wird zu number für JSON
  price: number; // Legacy
  currency: string;
  status: PropertyStatus;
  type: PropertyType;
  recommended: boolean;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[];
  images: string[];
  popularity: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Property type copy for UI labels
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

