"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Property, PropertyType } from "@/lib/types";
import { FilterBar } from "./filter-bar";
import { PropertyGrid } from "./property-grid";
import { SortDropdown } from "./sort-dropdown";
import { formatTypePlural } from "@/lib/format";

/**
 * Parst einen String zu Number, gibt null bei ungültigen Werten zurück
 */
function parseFilterNumber(value: string): number | null {
  if (!value) return null;
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? null : num;
}

export type SortOption = "popular" | "price_asc" | "price_desc" | "city_asc" | "newest";

export interface Filters {
  minPrice: string;
  maxPrice: string;
  city: string;
  listingType: string;
  minBedrooms: string;
  minBathrooms: string;
  minArea: string;
  maxArea: string;
}

const emptyFilters: Filters = {
  minPrice: "",
  maxPrice: "",
  city: "",
  listingType: "",
  minBedrooms: "",
  minBathrooms: "",
  minArea: "",
  maxArea: "",
};

interface City {
  id: string;
  name: string;
  country: string;
}

interface TypePageShellProps {
  properties: Property[];
  type: PropertyType;
  summary?: string;
}

// Filters aus URL-Params lesen
function getFiltersFromParams(params: URLSearchParams): Filters {
  return {
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    city: params.get("city") || "",
    listingType: params.get("listingType") || "",
    minBedrooms: params.get("minBedrooms") || "",
    minBathrooms: params.get("minBathrooms") || "",
    minArea: params.get("minArea") || "",
    maxArea: params.get("maxArea") || "",
  };
}

export function TypePageShell({ properties, type, summary }: TypePageShellProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Filter-State aus URL initialisieren
  const [filters, setFilters] = useState<Filters>(() => getFiltersFromParams(searchParams));
  const [sort, setSort] = useState<SortOption>(() => {
    const sortParam = searchParams.get("sort");
    return (sortParam as SortOption) || "popular";
  });
  const [dbCities, setDbCities] = useState<City[]>([]);

  // URL aktualisieren wenn Filter sich ändern
  const updateURL = useCallback((newFilters: Filters, newSort: SortOption) => {
    const params = new URLSearchParams();

    // Nur nicht-leere Filter in URL schreiben
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Sort nur wenn nicht default
    if (newSort !== "popular") {
      params.set("sort", newSort);
    }

    const queryString = params.toString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;

    // URL ohne Reload aktualisieren
    router.replace(newURL, { scroll: false });
  }, [pathname, router]);

  // Filter-Handler mit URL-Sync
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    updateURL(newFilters, sort);
  }, [sort, updateURL]);

  // Sort-Handler mit URL-Sync
  const handleSortChange = useCallback((newSort: SortOption) => {
    setSort(newSort);
    updateURL(filters, newSort);
  }, [filters, updateURL]);

  // Reset-Handler mit URL-Sync
  const handleReset = useCallback(() => {
    setFilters(emptyFilters);
    updateURL(emptyFilters, sort);
  }, [sort, updateURL]);

  // Sync mit URL bei externen Änderungen (z.B. Browser-Back)
  useEffect(() => {
    const newFilters = getFiltersFromParams(searchParams);
    const newSort = (searchParams.get("sort") as SortOption) || "popular";
    setFilters(newFilters);
    setSort(newSort);
  }, [searchParams]);

  // Städte aus der Datenbank laden
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const data = await res.json();
        setDbCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Kombiniere Städte aus Properties UND Datenbank
  const availableCities = useMemo(() => {
    const propertyCities = properties.map((p) => p.city);
    const allDbCityNames = dbCities.map((c) => c.name);
    const combined = new Set([...propertyCities, ...allDbCityNames]);
    return Array.from(combined).sort();
  }, [properties, dbCities]);

  const filtered = useMemo(() => {
    return properties
      .filter((property) => {
        const min = parseFilterNumber(filters.minPrice);
        const max = parseFilterNumber(filters.maxPrice);
        const minBedrooms = parseFilterNumber(filters.minBedrooms);
        const minBathrooms = parseFilterNumber(filters.minBathrooms);
        const minArea = parseFilterNumber(filters.minArea);
        const maxArea = parseFilterNumber(filters.maxArea);

        const cityMatch = filters.city
          ? property.city.toLowerCase() === filters.city.toLowerCase()
          : true;
        const listingTypeMatch = filters.listingType
          ? property.listingType === filters.listingType
          : true;

        const minOk = min ? property.priceEUR >= min : true;
        const maxOk = max ? property.priceEUR <= max : true;

        // Schlafzimmer Filter
        const bedroomsOk = minBedrooms
          ? (property.bedrooms ?? 0) >= minBedrooms
          : true;

        // Badezimmer Filter
        const bathroomsOk = minBathrooms
          ? (property.bathrooms ?? 0) >= minBathrooms
          : true;

        // Fläche Filter
        const minAreaOk = minArea
          ? (property.area ?? 0) >= minArea
          : true;
        const maxAreaOk = maxArea
          ? (property.area ?? 0) <= maxArea
          : true;

        return cityMatch && minOk && maxOk && listingTypeMatch && bedroomsOk && bathroomsOk && minAreaOk && maxAreaOk;
      })
      .sort((a, b) => {
        if (sort === "popular") {
          return (a.popularity ?? 999) - (b.popularity ?? 999);
        }
        if (sort === "price_asc") {
          return a.priceEUR - b.priceEUR;
        }
        if (sort === "price_desc") {
          return b.priceEUR - a.priceEUR;
        }
        if (sort === "newest") {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        }
        return a.city.localeCompare(b.city);
      });
  }, [filters, properties, sort]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
          Immobilien
        </span>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
              <span className="italic text-[--primary]">{formatTypePlural(type)}</span>
            </h1>
            {summary && (
              <p className="max-w-2xl text-base leading-relaxed text-[--muted]">{summary}</p>
            )}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-[--muted]">
              <span className="font-serif text-2xl text-[--text]">{filtered.length}</span>
              <span>von {properties.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gold" />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        availableCities={availableCities}
      />

      {/* Sort & Results Info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SortDropdown value={sort} onChange={handleSortChange} />
        <p className="text-sm text-[--muted]">
          {filtered.length === 0
            ? "Keine Objekte gefunden"
            : `${filtered.length} ${filtered.length === 1 ? "Objekt" : "Objekte"} gefunden`}
        </p>
      </div>

      {/* Property Grid */}
      <PropertyGrid properties={filtered} showRecommendedFlag={false} />
    </div>
  );
}
