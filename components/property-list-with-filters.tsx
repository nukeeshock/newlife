"use client";

import { useState, useMemo } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./property-card";
import { formatType } from "@/lib/format";

interface PropertyListWithFiltersProps {
  properties: Property[];
}

const propertyTypes = [
  { value: "all", label: "Alle Typen" },
  { value: "house", label: "Villen" },
  { value: "private_residence", label: "Residenzen" },
  { value: "apartment", label: "Apartments" },
  { value: "commercial", label: "Gewerbe" },
];

const listingTypes = [
  { value: "all", label: "Alle" },
  { value: "rent", label: "Mieten" },
  { value: "buy", label: "Kaufen" },
];

export function PropertyListWithFilters({ properties }: PropertyListWithFiltersProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [listingFilter, setListingFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Get unique cities from properties
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(properties.map((p) => p.city))].sort();
    return [{ value: "all", label: "Alle Staedte" }, ...uniqueCities.map((c) => ({ value: c, label: c }))];
  }, [properties]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = properties.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (listingFilter !== "all" && p.listingType !== listingFilter) return false;
      if (cityFilter !== "all" && p.city !== cityFilter) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = result.sort((a, b) => (a.priceEUR || 0) - (b.priceEUR || 0));
        break;
      case "price-desc":
        result = result.sort((a, b) => (b.priceEUR || 0) - (a.priceEUR || 0));
        break;
      case "newest":
        result = result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "recommended":
      default:
        result = result.sort((a, b) => {
          if (a.recommended && !b.recommended) return -1;
          if (!a.recommended && b.recommended) return 1;
          return (a.popularity || 999) - (b.popularity || 999);
        });
    }

    return result;
  }, [properties, typeFilter, listingFilter, cityFilter, sortBy]);

  const activeFiltersCount = [typeFilter, listingFilter, cityFilter].filter((f) => f !== "all").length;

  const clearFilters = () => {
    setTypeFilter("all");
    setListingFilter("all");
    setCityFilter("all");
  };

  return (
    <section className="pb-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* Filter Bar */}
        <div className="mb-8 border border-[--glass-border] bg-[--glass] p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Property Type Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[--muted]">
                Immobilientyp
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border border-[--glass-border] bg-[--bg] px-3 py-2 text-sm text-[--text] focus:border-[--primary] focus:outline-none"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Listing Type Filter */}
            <div className="flex-1 min-w-[120px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[--muted]">
                Angebot
              </label>
              <select
                value={listingFilter}
                onChange={(e) => setListingFilter(e.target.value)}
                className="w-full border border-[--glass-border] bg-[--bg] px-3 py-2 text-sm text-[--text] focus:border-[--primary] focus:outline-none"
              >
                {listingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="flex-1 min-w-[150px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[--muted]">
                Stadt
              </label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full border border-[--glass-border] bg-[--bg] px-3 py-2 text-sm text-[--text] focus:border-[--primary] focus:outline-none"
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex-1 min-w-[150px]">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-[--muted]">
                Sortieren
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-[--glass-border] bg-[--bg] px-3 py-2 text-sm text-[--text] focus:border-[--primary] focus:outline-none"
              >
                <option value="recommended">Empfohlen</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
                <option value="newest">Neueste</option>
              </select>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-5 text-sm text-[--primary] hover:underline"
              >
                Filter zuruecksetzen ({activeFiltersCount})
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-[--muted]">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Immobilie" : "Immobilien"} gefunden
          </p>
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {typeFilter !== "all" && (
                <span className="inline-flex items-center gap-1 border border-[--primary]/30 bg-[--primary]/10 px-2 py-1 text-xs text-[--primary]">
                  {formatType(typeFilter)}
                  <button onClick={() => setTypeFilter("all")} className="ml-1 hover:text-white">×</button>
                </span>
              )}
              {listingFilter !== "all" && (
                <span className="inline-flex items-center gap-1 border border-[--primary]/30 bg-[--primary]/10 px-2 py-1 text-xs text-[--primary]">
                  {listingFilter === "rent" ? "Mieten" : "Kaufen"}
                  <button onClick={() => setListingFilter("all")} className="ml-1 hover:text-white">×</button>
                </span>
              )}
              {cityFilter !== "all" && (
                <span className="inline-flex items-center gap-1 border border-[--primary]/30 bg-[--primary]/10 px-2 py-1 text-xs text-[--primary]">
                  {cityFilter}
                  <button onClick={() => setCityFilter("all")} className="ml-1 hover:text-white">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-6xl">🏠</div>
            <h3 className="font-serif text-2xl text-[--text]">Keine Immobilien gefunden</h3>
            <p className="mt-2 text-[--muted]">
              Versuchen Sie, Ihre Filterkriterien anzupassen.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 border border-[--primary] px-6 py-2 text-sm font-medium text-[--primary] transition-colors hover:bg-[--primary] hover:text-[--bg]"
            >
              Alle Filter zuruecksetzen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
