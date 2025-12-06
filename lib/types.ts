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
