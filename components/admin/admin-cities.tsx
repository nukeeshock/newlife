"use client";

import { FormEvent } from "react";

interface City {
  id: string;
  name: string;
  country: string;
}

interface AdminCitiesProps {
  cities: City[];
  newCityName: string;
  addingCity: boolean;
  onNewCityNameChange: (name: string) => void;
  onAddCity: (e: FormEvent) => void;
  onDeleteCity: (id: string, name: string) => void;
}

export function AdminCities({
  cities,
  newCityName,
  addingCity,
  onNewCityNameChange,
  onAddCity,
  onDeleteCity,
}: AdminCitiesProps) {
  return (
    <>
      {/* Add City Form */}
      <form onSubmit={onAddCity} className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={newCityName}
          onChange={(e) => onNewCityNameChange(e.target.value)}
          placeholder="Neue Stadt hinzufügen..."
          className="flex-1 border border-[--glass-border] bg-[--surface] px-4 py-3 text-[--text] placeholder:text-[--muted]/50 focus:border-[--primary]/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={addingCity || !newCityName.trim()}
          className="border border-[--primary]/30 bg-[--primary]/10 px-6 py-3 text-sm font-medium text-[--primary] transition-colors hover:bg-[--primary]/20 disabled:opacity-50"
        >
          {addingCity ? "..." : "+ Hinzufügen"}
        </button>
      </form>

      {/* Cities List */}
      {cities.length === 0 ? (
        <div className="border border-[--glass-border] bg-[--card] p-12 text-center">
          <div className="text-4xl">🏙️</div>
          <h3 className="mt-4 font-serif text-xl text-[--text]">
            Keine Städte vorhanden
          </h3>
          <p className="mt-2 text-sm text-[--muted]">
            Füge Städte hinzu, die im Standort-Filter und bei der
            Exposé-Erstellung erscheinen sollen.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <div
              key={city.id}
              className="flex items-center justify-between border border-[--glass-border] bg-[--card] px-4 py-3 transition-colors hover:border-[--primary]/20"
            >
              <div>
                <span className="font-medium text-[--text]">{city.name}</span>
                <span className="ml-2 text-xs text-[--muted]">
                  {city.country}
                </span>
              </div>
              <button
                onClick={() => onDeleteCity(city.id, city.name)}
                className="text-[--muted] transition-colors hover:text-red-400"
                title="Stadt löschen"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-12 border border-[--glass-border] bg-[--surface] p-6">
        <h3 className="font-medium text-[--text]">ℹ️ Über Städte</h3>
        <ul className="mt-3 space-y-2 text-sm text-[--muted]">
          <li>
            • Städte erscheinen im Standort-Filter auf den Kategorie-Seiten
          </li>
          <li>
            • Beim Erstellen eines Exposés kannst du eine Stadt aus dieser Liste
            wählen
          </li>
          <li>
            • Lösche Städte nur, wenn keine Exposés mehr damit verknüpft sind
          </li>
        </ul>
      </div>
    </>
  );
}
