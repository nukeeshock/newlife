"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/lib/context/admin-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/types";
import { formatPriceEUR } from "@/lib/format";

interface City {
  id: string;
  name: string;
  country: string;
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  propertyId: string | null;
  read: boolean;
  createdAt: string;
  property?: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

type TabType = "archive" | "cities" | "inquiries";

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
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [inquiriesError, setInquiriesError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login");
    }
  }, [isAdmin, isLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchArchived();
      fetchCities();
      fetchInquiries();
    }
  }, [isAdmin]);

  const fetchArchived = async () => {
    try {
      const res = await fetch("/api/properties/archived");
      if (!res.ok) {
        console.error("Error fetching archived properties:", res.status);
        setArchivedProperties([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setArchivedProperties(data);
      } else {
        console.error("Invalid archived response:", data);
        setArchivedProperties([]);
      }
    } catch (error) {
      console.error("Error fetching archived:", error);
      setArchivedProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await fetch("/api/cities");
      if (!res.ok) {
        console.error("Error fetching cities:", res.status);
        setCities([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setCities(data);
      } else {
        console.error("Invalid cities response:", data);
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    setInquiriesError(null);
    try {
      const res = await fetch("/api/contact/inquiries");
      if (!res.ok) {
        throw new Error("Fehler beim Laden der Anfragen");
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("Ungültiges Datenformat");
      }
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setInquiriesError(error instanceof Error ? error.message : "Unbekannter Fehler");
      setInquiries([]);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleToggleRead = async (inquiry: ContactInquiry) => {
    try {
      const res = await fetch(`/api/contact/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !inquiry.read }),
      });

      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) =>
          prev.map((i) => (i.id === inquiry.id ? updated : i))
        );
        if (selectedInquiry?.id === inquiry.id) {
          setSelectedInquiry(updated);
        }
      }
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Anfrage wirklich löschen?")) return;

    try {
      const res = await fetch(`/api/contact/inquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "gerade eben";
    if (diffMins < 60) return `vor ${diffMins} Min`;
    if (diffHours < 24) return `vor ${diffHours} Std`;
    if (diffDays < 7) return `vor ${diffDays} Tag${diffDays > 1 ? "en" : ""}`;
    return formatDate(dateString);
  };

  // XSS-sichere Encodierung für mailto/tel Links
  const safeEmail = (email: string) => encodeURIComponent(email);
  const safePhone = (phone: string) => encodeURIComponent(phone);

  const unreadCount = inquiries.filter((i) => !i.read).length;

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
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "inquiries"
              ? "border-b-2 border-[--primary] text-[--primary]"
              : "text-[--muted] hover:text-[--text]"
          }`}
        >
          Anfragen
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center bg-[--primary] px-1.5 text-xs font-semibold text-black">
              {unreadCount}
            </span>
          )}
        </button>
        <Link
          href="/admin/analytics"
          className="px-4 py-3 text-sm font-medium text-[--muted] transition-colors hover:text-[--text]"
        >
          Analytics
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
                      {property.city} • {formatPriceEUR(property.priceEUR)}
                    </p>
                    <p className="mt-1 text-xs text-[--muted]/60">
                      Archiviert am {property.updatedAt ? new Date(property.updatedAt).toLocaleDateString("de-DE") : "Unbekannt"}
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
              <li>• &quot;Endgültig löschen&quot; entfernt das Exposé unwiderruflich</li>
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

      {/* Inquiries Tab */}
      {activeTab === "inquiries" && (
        <>
          {loadingInquiries ? (
            <div className="py-12 text-center text-[--muted]">Laden...</div>
          ) : inquiriesError ? (
            <div className="border border-red-500/30 bg-red-500/10 p-6">
              <h3 className="font-medium text-red-400">Fehler beim Laden</h3>
              <p className="mt-2 text-sm text-[--muted]">{inquiriesError}</p>
              <button
                onClick={fetchInquiries}
                className="mt-4 border border-[--primary]/30 bg-[--primary]/10 px-4 py-2 text-sm text-[--primary] hover:bg-[--primary]/20"
              >
                Erneut versuchen
              </button>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="border border-[--glass-border] bg-[--card] p-12 text-center">
              <div className="text-4xl">📬</div>
              <h3 className="mt-4 font-serif text-xl text-[--text]">
                Keine Anfragen vorhanden
              </h3>
              <p className="mt-2 text-sm text-[--muted]">
                Kontaktanfragen von der Website werden hier angezeigt.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`border bg-[--card] p-4 transition-colors hover:border-[--primary]/20 cursor-pointer ${
                    inquiry.read
                      ? "border-[--glass-border]"
                      : "border-[--primary]/30"
                  }`}
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    if (!inquiry.read) {
                      handleToggleRead(inquiry);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Unread Indicator */}
                    <div className="mt-1.5 flex-shrink-0">
                      {!inquiry.read ? (
                        <span className="block h-2.5 w-2.5 rounded-full bg-[--primary]" />
                      ) : (
                        <span className="block h-2.5 w-2.5 rounded-full border border-[--muted]/30" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={`font-medium truncate ${
                            inquiry.read ? "text-[--text]" : "text-[--primary]"
                          }`}
                        >
                          {inquiry.name}
                        </h3>
                        <span className="flex-shrink-0 text-xs text-[--muted]">
                          {getRelativeTime(inquiry.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-[--muted]">{inquiry.email}</p>
                      <p className="mt-2 text-sm text-[--muted]/70 line-clamp-2">
                        &quot;{inquiry.message}&quot;
                      </p>
                      {inquiry.property && (
                        <p className="mt-2 text-xs text-[--primary]">
                          Objekt: {inquiry.property.title}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-3 flex gap-2 border-t border-[--glass-border] pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRead(inquiry);
                      }}
                      className="text-xs text-[--muted] transition-colors hover:text-[--text]"
                    >
                      {inquiry.read ? "Als ungelesen markieren" : "Als gelesen markieren"}
                    </button>
                    <span className="text-[--glass-border]">|</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteInquiry(inquiry.id);
                      }}
                      className="text-xs text-[--muted] transition-colors hover:text-red-400"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 border border-[--glass-border] bg-[--surface] p-6">
            <h3 className="font-medium text-[--text]">ℹ️ Über Anfragen</h3>
            <ul className="mt-3 space-y-2 text-sm text-[--muted]">
              <li>• Neue Anfragen werden mit einem goldenen Punkt markiert</li>
              <li>• Klicke auf eine Anfrage um die Details anzuzeigen</li>
              <li>• Anfragen werden beim Öffnen automatisch als gelesen markiert</li>
            </ul>
          </div>
        </>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInquiry(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Modal */}
          <div
            className="relative w-full max-w-lg border border-[--glass-border] bg-[--card] p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl text-[--text]">
                Anfrage von {selectedInquiry.name}
              </h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-[--muted] transition-colors hover:text-[--text]"
              >
                ✕
              </button>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <span className="text-xs text-[--muted]">Name</span>
                <p className="text-[--text]">{selectedInquiry.name}</p>
              </div>
              <div>
                <span className="text-xs text-[--muted]">E-Mail</span>
                <p className="text-[--text]">
                  <a
                    href={`mailto:${safeEmail(selectedInquiry.email)}`}
                    className="text-[--primary] hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </p>
              </div>
              {selectedInquiry.phone && (
                <div>
                  <span className="text-xs text-[--muted]">Telefon</span>
                  <p className="text-[--text]">
                    <a
                      href={`tel:${safePhone(selectedInquiry.phone)}`}
                      className="text-[--primary] hover:underline"
                    >
                      {selectedInquiry.phone}
                    </a>
                  </p>
                </div>
              )}
              <div>
                <span className="text-xs text-[--muted]">Datum</span>
                <p className="text-[--text]">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
              {selectedInquiry.property && (
                <div>
                  <span className="text-xs text-[--muted]">Bezug auf Objekt</span>
                  <p>
                    <Link
                      href={`/${selectedInquiry.property.slug}`}
                      className="text-[--primary] hover:underline"
                      target="_blank"
                    >
                      {selectedInquiry.property.title}
                    </Link>
                  </p>
                </div>
              )}

              <div className="border-t border-[--glass-border] pt-4">
                <span className="text-xs text-[--muted]">Nachricht</span>
                <p className="mt-2 whitespace-pre-wrap text-[--text]">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 border-t border-[--glass-border] pt-6">
              <button
                onClick={() => handleToggleRead(selectedInquiry)}
                className="flex-1 border border-[--glass-border] bg-[--surface] px-4 py-2 text-sm text-[--text] transition-colors hover:border-[--primary]/30"
              >
                {selectedInquiry.read ? "Als ungelesen" : "Als gelesen"}
              </button>
              <button
                onClick={() => {
                  handleDeleteInquiry(selectedInquiry.id);
                }}
                className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

