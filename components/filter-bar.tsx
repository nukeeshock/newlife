"use client";

import type { ChangeEvent } from "react";
import type { Filters } from "./type-page-shell";

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

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.city || filters.listingType || filters.minBedrooms || filters.minBathrooms || filters.minArea || filters.maxArea;

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

        {/* Filter Fields - Row 1 */}
        <div className="grid grid-cols-1 gap-6 p-6 pb-0 md:grid-cols-2 lg:grid-cols-4">
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
              min="0"
              placeholder="Min. EUR"
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
              min="0"
              placeholder="Max. EUR"
              value={filters.maxPrice}
              onChange={handleInput("maxPrice")}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Filter Fields - Row 2 */}
        <div className="grid grid-cols-1 gap-6 p-6 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Min Bedrooms */}
          <div className="space-y-2">
            <label className={labelClasses}>Schlafzimmer</label>
            <select
              value={filters.minBedrooms}
              onChange={handleInput("minBedrooms")}
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
              onChange={handleInput("minBathrooms")}
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
            <label className={labelClasses}>Fläche von</label>
            <input
              type="number"
              min="0"
              placeholder="Min. m²"
              value={filters.minArea}
              onChange={handleInput("minArea")}
              className={inputClasses}
            />
          </div>

          {/* Max Area */}
          <div className="space-y-2">
            <label className={labelClasses}>Fläche bis</label>
            <input
              type="number"
              min="0"
              placeholder="Max. m²"
              value={filters.maxArea}
              onChange={handleInput("maxArea")}
              className={inputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
