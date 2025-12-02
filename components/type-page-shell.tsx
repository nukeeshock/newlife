"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/lib/properties";
import { FilterBar } from "./filter-bar";
import { PropertyGrid } from "./property-grid";
import { SortDropdown } from "./sort-dropdown";
import { formatType, formatTypePlural } from "@/lib/format";

export type SortOption = "popular" | "price_asc" | "price_desc" | "city_asc" | "newest";

export interface Filters {
  minPrice: string;
  maxPrice: string;
  city: string;
  listingType: string;
}

interface TypePageShellProps {
  properties: Property[];
  type: Property["type"];
  summary?: string;
}

export function TypePageShell({ properties, type, summary }: TypePageShellProps) {
  const [filters, setFilters] = useState<Filters>({
    minPrice: "",
    maxPrice: "",
    city: "",
    listingType: "",
  });
  const [sort, setSort] = useState<SortOption>("popular");

  const availableCities = useMemo(
    () => Array.from(new Set(properties.map((p) => p.city))).sort(),
    [properties],
  );

  const filtered = useMemo(() => {
    return properties
      .filter((property) => {
        const min = filters.minPrice ? parseInt(filters.minPrice, 10) : null;
        const max = filters.maxPrice ? parseInt(filters.maxPrice, 10) : null;
        const cityMatch = filters.city
          ? property.city.toLowerCase() === filters.city.toLowerCase()
          : true;

        const minOk = min ? property.price >= min : true;
        const maxOk = max ? property.price <= max : true;

        // Listing type filter (for future: rent vs buy)
        // Currently all are rentals, so this is a placeholder
        const listingTypeOk = true;

        return cityMatch && minOk && maxOk && listingTypeOk;
      })
      .sort((a, b) => {
        if (sort === "popular") {
          return (a.popularity ?? 999) - (b.popularity ?? 999);
        }
        if (sort === "price_asc") {
          return a.price - b.price;
        }
        if (sort === "price_desc") {
          return b.price - a.price;
        }
        if (sort === "newest") {
          return 0; // Placeholder for date sorting
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
        onChange={setFilters}
        onReset={() => setFilters({ minPrice: "", maxPrice: "", city: "", listingType: "" })}
        availableCities={availableCities}
      />

      {/* Sort & Results Info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SortDropdown value={sort} onChange={setSort} />
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
