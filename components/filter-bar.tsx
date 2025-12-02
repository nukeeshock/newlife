"use client";

import type { ChangeEvent } from "react";
import type { Filters } from "./type-page-shell";
import { Button } from "./ui/button";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  availableCities: string[];
}

export function FilterBar({
  filters,
  onChange,
  onReset,
  availableCities,
}: FilterBarProps) {
  const handleInput =
    (key: keyof Filters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ ...filters, [key]: event.target.value });
    };

  const inputClasses =
    "w-full bg-[--surface] border border-[--glass-border] px-4 py-3 text-sm text-[--text] outline-none transition-all focus:border-[--primary]/50 placeholder:text-[--muted]/60";

  const labelClasses = "text-xs font-medium uppercase tracking-[0.2em] text-[--muted]";

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.city || filters.listingType;

  return (
    <div className="space-y-6">
      {/* Main Filter Bar */}
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
              onClick={onReset}
              className="text-xs font-medium uppercase tracking-wider text-[--muted] transition-colors hover:text-[--primary]"
            >
              Zurücksetzen
            </button>
          )}
        </div>

        {/* Filter Fields */}
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Listing Type */}
          <div className="space-y-2">
            <label className={labelClasses}>Art</label>
            <select
              value={filters.listingType || ""}
              onChange={handleInput("listingType")}
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
              onChange={handleInput("city")}
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
              placeholder="Min. Preis"
              value={filters.minPrice}
              onChange={handleInput("minPrice")}
              className={inputClasses}
            />
          </div>

          {/* Max Price */}
          <div className="space-y-2">
            <label className={labelClasses}>Preis bis</label>
            <input
              type="number"
              placeholder="Max. Preis"
              value={filters.maxPrice}
              onChange={handleInput("maxPrice")}
              className={inputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
