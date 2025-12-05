"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Property, PropertyType } from "@/lib/types";
import { PropertyGrid } from "./property-grid";
import { SortDropdown } from "./sort-dropdown";

const ITEMS_PER_PAGE = 15;
const DEBOUNCE_MS = 400;

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
  propertyType: string;
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
  propertyType: "",
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

interface PropertyListingPageProps {
  properties: Property[];
}

// Filters aus URL-Params lesen
function getFiltersFromParams(params: URLSearchParams): Filters {
  return {
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    city: params.get("city") || "",
    listingType: params.get("listingType") || "",
    propertyType: params.get("type") || "",
    minBedrooms: params.get("minBedrooms") || "",
    minBathrooms: params.get("minBathrooms") || "",
    minArea: params.get("minArea") || "",
    maxArea: params.get("maxArea") || "",
  };
}

const propertyTypes: { value: PropertyType | ""; label: string }[] = [
  { value: "", label: "Alle Typen" },
  { value: "private_residence", label: "Residenzen" },
  { value: "house", label: "Villen" },
  { value: "apartment", label: "Apartments" },
  { value: "commercial", label: "Gewerbeflächen" },
];

// Felder die Debouncing brauchen (Texteingabe)
const debouncedFields: (keyof Filters)[] = ["minPrice", "maxPrice", "minArea", "maxArea"];

export function PropertyListingPage({ properties }: PropertyListingPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Filter-State aus URL initialisieren
  const [filters, setFilters] = useState<Filters>(() => getFiltersFromParams(searchParams));
  const [sort, setSort] = useState<SortOption>(() => {
    const sortParam = searchParams.get("sort");
    return (sortParam as SortOption) || "popular";
  });
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  });
  const [dbCities, setDbCities] = useState<City[]>([]);

  // URL aktualisieren wenn Filter sich ändern
  const updateURL = useCallback((newFilters: Filters, newSort: SortOption, newPage: number) => {
    const params = new URLSearchParams();

    // Filter in URL schreiben
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
    if (newFilters.city) params.set("city", newFilters.city);
    if (newFilters.listingType) params.set("listingType", newFilters.listingType);
    if (newFilters.propertyType) params.set("type", newFilters.propertyType);
    if (newFilters.minBedrooms) params.set("minBedrooms", newFilters.minBedrooms);
    if (newFilters.minBathrooms) params.set("minBathrooms", newFilters.minBathrooms);
    if (newFilters.minArea) params.set("minArea", newFilters.minArea);
    if (newFilters.maxArea) params.set("maxArea", newFilters.maxArea);

    // Sort nur wenn nicht default
    if (newSort !== "popular") {
      params.set("sort", newSort);
    }

    // Page nur wenn nicht 1
    if (newPage > 1) {
      params.set("page", String(newPage));
    }

    const queryString = params.toString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;

    // URL ohne Reload aktualisieren
    router.replace(newURL, { scroll: false });
  }, [pathname, router]);

  // Filter-Handler mit URL-Sync (Reset zu Seite 1)
  // Debounced für Texteingaben, sofort für Dropdowns
  const handleFilterChange = useCallback((key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);

    // Debounce für Texteingabefelder (Preis, Fläche)
    if (debouncedFields.includes(key)) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        updateURL(newFilters, sort, 1);
      }, DEBOUNCE_MS);
    } else {
      // Dropdowns sofort aktualisieren
      updateURL(newFilters, sort, 1);
    }
  }, [filters, sort, updateURL]);

  // Sort-Handler mit URL-Sync (Reset zu Seite 1)
  const handleSortChange = useCallback((newSort: SortOption) => {
    setSort(newSort);
    setCurrentPage(1);
    updateURL(filters, newSort, 1);
  }, [filters, updateURL]);

  // Page-Handler mit URL-Sync
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    updateURL(filters, sort, newPage);
    // Scroll to top of listings
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters, sort, updateURL]);

  // Reset-Handler mit URL-Sync
  const handleReset = useCallback(() => {
    setFilters(emptyFilters);
    setCurrentPage(1);
    updateURL(emptyFilters, sort, 1);
  }, [sort, updateURL]);

  // Sync mit URL bei externen Änderungen (z.B. Browser-Back)
  const searchParamsString = searchParams.toString();
  useEffect(() => {
    const newFilters = getFiltersFromParams(searchParams);
    const newSort = (searchParams.get("sort") as SortOption) || "popular";
    const newPage = searchParams.get("page") ? Math.max(1, parseInt(searchParams.get("page")!, 10)) : 1;
    setFilters(newFilters);
    setSort(newSort);
    setCurrentPage(newPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

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

  // Filtered & Sorted Properties
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
        const propertyTypeMatch = filters.propertyType
          ? property.type === filters.propertyType
          : true;

        const minOk = min ? property.priceEUR >= min : true;
        const maxOk = max ? property.priceEUR <= max : true;
        const bedroomsOk = minBedrooms ? (property.bedrooms ?? 0) >= minBedrooms : true;
        const bathroomsOk = minBathrooms ? (property.bathrooms ?? 0) >= minBathrooms : true;
        const minAreaOk = minArea ? (property.area ?? 0) >= minArea : true;
        const maxAreaOk = maxArea ? (property.area ?? 0) <= maxArea : true;

        return cityMatch && minOk && maxOk && listingTypeMatch && propertyTypeMatch && bedroomsOk && bathroomsOk && minAreaOk && maxAreaOk;
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

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages, handlePageChange]);

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.city || filters.listingType || filters.propertyType || filters.minBedrooms || filters.minBathrooms || filters.minArea || filters.maxArea;

  const inputClasses =
    "w-full bg-[--surface] border border-[--glass-border] px-4 py-3 text-sm text-[--text] outline-none transition-all focus:border-[--primary]/50 placeholder:text-[--muted]/60";
  const labelClasses = "text-xs font-medium uppercase tracking-[0.2em] text-[--muted]";

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
              Alle <span className="italic text-[--primary]">Objekte</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[--muted]">
              Entdecken Sie unsere exklusiven Immobilien in Vietnam.
            </p>
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

      {/* Filter Bar */}
      <div className="space-y-6">
        <div className="border border-[--glass-border] bg-[--card]">
          {/* Filter Header */}
          <div className="flex items-center justify-between border-b border-[--glass-border] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
                Filter
              </span>
              {hasActiveFilters && (
                <span className="h-1.5 w-1.5 rounded-full bg-[--primary]" />
              )}
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium uppercase tracking-wider text-[--muted] transition-colors hover:text-[--primary]"
              >
                Zurücksetzen
              </button>
            )}
          </div>

          {/* Filter Fields - Row 1 */}
          <div className="grid grid-cols-1 gap-6 p-6 pb-0 md:grid-cols-2 lg:grid-cols-4">
            {/* Property Type - NEU */}
            <div className="space-y-2">
              <label className={labelClasses}>Immobilienart</label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                className={inputClasses}
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Listing Type */}
            <div className="space-y-2">
              <label className={labelClasses}>Angebot</label>
              <select
                value={filters.listingType}
                onChange={(e) => handleFilterChange("listingType", e.target.value)}
                className={inputClasses}
              >
                <option value="">Alle</option>
                <option value="rent">Mieten</option>
                <option value="buy">Kaufen</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className={labelClasses}>Standort</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className={inputClasses}
              >
                <option value="">Alle Standorte</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="space-y-2">
              <label className={labelClasses}>Preis von</label>
              <input
                type="number"
                min="0"
                placeholder="Min. EUR"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Filter Fields - Row 2 */}
          <div className="grid grid-cols-1 gap-6 p-6 pt-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Max Price */}
            <div className="space-y-2">
              <label className={labelClasses}>Preis bis</label>
              <input
                type="number"
                min="0"
                placeholder="Max. EUR"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className={inputClasses}
              />
            </div>

            {/* Min Bedrooms */}
            <div className="space-y-2">
              <label className={labelClasses}>Schlafzimmer</label>
              <select
                value={filters.minBedrooms}
                onChange={(e) => handleFilterChange("minBedrooms", e.target.value)}
                className={inputClasses}
              >
                <option value="">Beliebig</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Min Bathrooms */}
            <div className="space-y-2">
              <label className={labelClasses}>Badezimmer</label>
              <select
                value={filters.minBathrooms}
                onChange={(e) => handleFilterChange("minBathrooms", e.target.value)}
                className={inputClasses}
              >
                <option value="">Beliebig</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Min Area */}
            <div className="space-y-2">
              <label className={labelClasses}>Fläche ab</label>
              <input
                type="number"
                min="0"
                placeholder="Min. m²"
                value={filters.minArea}
                onChange={(e) => handleFilterChange("minArea", e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>

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
      <PropertyGrid properties={paginatedProperties} showRecommendedFlag={false} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 border-t border-[--glass-border] pt-8">
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center border border-[--glass-border] text-[--muted] transition-all hover:border-[--primary] hover:text-[--primary] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[--glass-border] disabled:hover:text-[--muted]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and adjacent pages
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  return false;
                })
                .map((page, index, arr) => {
                  // Add ellipsis if there's a gap
                  const showEllipsisBefore = index > 0 && page - arr[index - 1] > 1;
                  return (
                    <span key={page} className="flex items-center">
                      {showEllipsisBefore && (
                        <span className="px-2 text-[--muted]">...</span>
                      )}
                      <button
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`flex h-10 min-w-[2.5rem] items-center justify-center border px-3 text-sm font-medium transition-all ${
                          page === currentPage
                            ? "border-[--primary] bg-[--primary] text-white"
                            : "border-[--glass-border] text-[--muted] hover:border-[--primary] hover:text-[--primary]"
                        }`}
                      >
                        {page}
                      </button>
                    </span>
                  );
                })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center border border-[--glass-border] text-[--muted] transition-all hover:border-[--primary] hover:text-[--primary] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[--glass-border] disabled:hover:text-[--muted]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-[--muted]">
            Seite {currentPage} von {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
