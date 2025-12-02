"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/lib/context/admin-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/format";

interface City {
  id: string;
  name: string;
  country: string;
}

type TabType = "archive" | "cities";

export default function AdminPage() {
  const { isAdmin, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("archive");
  const [archivedProperties, setArchivedProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [newCityName, setNewCityName] = useState("");
  const [addingCity, setAddingCity] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, isLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchArchived();
      fetchCities();
    }
  }, [isAdmin]);

  const fetchArchived = async () => {
    try {
      const res = await fetch("/api/properties/archived");
      const data = await res.json();
      setArchivedProperties(data);
    } catch (error) {
      console.error("Error fetching archived:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await fetch("/api/cities");
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleRestore = async (id: string) => {
    if (!confirm("Exposé wiederherstellen?")) return;

    setRestoring(id);
    try {
      const res = await fetch(`/api/properties/${id}/restore`, {
        method: "POST",
      });

      if (res.ok) {
        setArchivedProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error restoring:", error);
    } finally {
      setRestoring(null);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm("Exposé ENDGÜLTIG löschen? Diese Aktion kann nicht rückgängig gemacht werden!")) return;

    try {
      const res = await fetch(`/api/properties/${id}/permanent`, {
        method: "DELETE",
      });

      if (res.ok) {
        setArchivedProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    setAddingCity(true);
    try {
      const res = await fetch("/api/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCityName.trim() }),
      });

      if (res.ok) {
        const city = await res.json();
        setCities((prev) => [...prev, city].sort((a, b) => a.name.localeCompare(b.name)));
        setNewCityName("");
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim Hinzufügen");
      }
    } catch (error) {
      console.error("Error adding city:", error);
    } finally {
      setAddingCity(false);
    }
  };

  const handleDeleteCity = async (id: string, name: string) => {
    if (!confirm(`Stadt "${name}" wirklich löschen?`)) return;

    try {
      const res = await fetch(`/api/cities/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCities((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  if (isLoading || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[--muted]">Laden...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-8">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/"
          className="mb-4 inline-block text-sm text-[--muted] transition-colors hover:text-[--primary]"
        >
          ← Zurück zur Startseite
        </Link>
        <h1 className="font-serif text-4xl font-light text-[--text]">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-[--muted]">
          Verwalte Exposés, Städte und Einstellungen
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 flex gap-4 border-b border-[--glass-border]">
        <button
          onClick={() => setActiveTab("archive")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "archive"
              ? "border-b-2 border-[--primary] text-[--primary]"
              : "text-[--muted] hover:text-[--text]"
          }`}
        >
          Archiv ({archivedProperties.length})
        </button>
        <button
          onClick={() => setActiveTab("cities")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "cities"
              ? "border-b-2 border-[--primary] text-[--primary]"
              : "text-[--muted] hover:text-[--text]"
          }`}
        >
          Städte ({cities.length})
        </button>
        <Link
          href="/admin/analytics"
          className="px-4 py-3 text-sm font-medium text-[--muted] transition-colors hover:text-[--text]"
        >
          📊 Analytics
        </Link>
      </div>

      {/* Archive Tab */}
      {activeTab === "archive" && (
        <>
          {loading ? (
            <div className="py-12 text-center text-[--muted]">Laden...</div>
          ) : archivedProperties.length === 0 ? (
            <div className="border border-[--glass-border] bg-[--card] p-12 text-center">
              <div className="text-4xl">📦</div>
              <h3 className="mt-4 font-serif text-xl text-[--text]">
                Keine archivierten Exposés
              </h3>
              <p className="mt-2 text-sm text-[--muted]">
                Gelöschte Exposés werden hier angezeigt und können wiederhergestellt werden.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {archivedProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 border border-[--glass-border] bg-[--card] p-4 transition-colors hover:border-[--primary]/20"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden bg-[--surface]">
                    {property.images?.[0] ? (
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[--muted]">
                        📷
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate font-medium text-[--text]">
                      {property.title}
                    </h3>
                    <p className="text-sm text-[--muted]">
                      {property.city} • {formatPrice(property.price, property.currency)}
                    </p>
                    <p className="mt-1 text-xs text-[--muted]/60">
                      Archiviert am {new Date(property.updatedAt).toLocaleDateString("de-DE")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRestore(property.id)}
                      disabled={restoring === property.id}
                      className="border border-[--primary]/30 bg-[--primary]/10 px-4 py-2 text-sm font-medium text-[--primary] transition-colors hover:bg-[--primary]/20 disabled:opacity-50"
                    >
                      {restoring === property.id ? "..." : "Wiederherstellen"}
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(property.id)}
                      className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                    >
                      Endgültig löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 border border-[--glass-border] bg-[--surface] p-6">
            <h3 className="font-medium text-[--text]">ℹ️ Über das Archiv</h3>
            <ul className="mt-3 space-y-2 text-sm text-[--muted]">
              <li>• Gelöschte Exposés landen automatisch im Archiv</li>
              <li>• Archivierte Exposés sind für Besucher nicht sichtbar</li>
              <li>• Du kannst Exposés jederzeit wiederherstellen</li>
              <li>• "Endgültig löschen" entfernt das Exposé unwiderruflich</li>
            </ul>
          </div>
        </>
      )}

      {/* Cities Tab */}
      {activeTab === "cities" && (
        <>
          {/* Add City Form */}
          <form onSubmit={handleAddCity} className="mb-8 flex gap-3">
            <input
              type="text"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
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
                Füge Städte hinzu, die im Standort-Filter und bei der Exposé-Erstellung erscheinen sollen.
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
                    <span className="ml-2 text-xs text-[--muted]">{city.country}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCity(city.id, city.name)}
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
              <li>• Städte erscheinen im Standort-Filter auf den Kategorie-Seiten</li>
              <li>• Beim Erstellen eines Exposés kannst du eine Stadt aus dieser Liste wählen</li>
              <li>• Lösche Städte nur, wenn keine Exposés mehr damit verknüpft sind</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

