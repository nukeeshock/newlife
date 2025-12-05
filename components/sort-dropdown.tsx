"use client";

import type { SortOption } from "./property-listing-page";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
        Sortieren nach
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="border border-[--glass-border] bg-[--surface] px-4 py-2.5 text-sm text-[--text] outline-none transition-colors focus:border-[--primary]/50"
      >
        <option value="popular">Beliebtheit</option>
        <option value="newest">Neueste zuerst</option>
        <option value="price_asc">Preis: Niedrig → Hoch</option>
        <option value="price_desc">Preis: Hoch → Niedrig</option>
        <option value="city_asc">Standort A-Z</option>
      </select>
    </div>
  );
}
