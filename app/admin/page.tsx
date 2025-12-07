"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/lib/context/admin-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Property } from "@/lib/types";
import { AdminArchive } from "@/components/admin/admin-archive";
import { AdminCities } from "@/components/admin/admin-cities";
import { AdminInquiries } from "@/components/admin/admin-inquiries";

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

  // Archive state
  const [archivedProperties, setArchivedProperties] = useState<Property[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);

  // Cities state
  const [cities, setCities] = useState<City[]>([]);
  const [newCityName, setNewCityName] = useState("");
  const [addingCity, setAddingCity] = useState(false);

  // Inquiries state
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
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

  // ============================================
  // ARCHIVE HANDLERS
  // ============================================

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
      setArchiveLoading(false);
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
    if (
      !confirm(
        "Exposé ENDGÜLTIG löschen? Diese Aktion kann nicht rückgängig gemacht werden!"
      )
    )
      return;

    try {
      const res = await fetch(`/api/properties/${id}/permanent`, {
        method: "DELETE",
      });

      if (res.ok) {
        setArchivedProperties((prev) => prev.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim endgültigen Löschen");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Fehler beim endgültigen Löschen. Bitte versuche es erneut.");
    }
  };

  // ============================================
  // CITIES HANDLERS
  // ============================================

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
        setCities((prev) =>
          [...prev, city].sort((a, b) => a.name.localeCompare(b.name))
        );
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
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim Löschen der Stadt");
      }
    } catch (error) {
      console.error("Error deleting city:", error);
      alert("Fehler beim Löschen der Stadt. Bitte versuche es erneut.");
    }
  };

  // ============================================
  // INQUIRIES HANDLERS
  // ============================================

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
      setInquiriesError(
        error instanceof Error ? error.message : "Unbekannter Fehler"
      );
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
      }
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/inquiries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  const unreadCount = inquiries.filter((i) => !i.read).length;

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
      <div className="mb-8 flex flex-wrap gap-1 border-b border-[--glass-border] sm:gap-4">
        <button
          onClick={() => setActiveTab("archive")}
          className={`whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
            activeTab === "archive"
              ? "border-b-2 border-[--primary] text-[--primary]"
              : "text-[--muted] hover:text-[--text]"
          }`}
        >
          Archiv ({archivedProperties.length})
        </button>
        <button
          onClick={() => setActiveTab("cities")}
          className={`whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
            activeTab === "cities"
              ? "border-b-2 border-[--primary] text-[--primary]"
              : "text-[--muted] hover:text-[--text]"
          }`}
        >
          Städte ({cities.length})
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
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
          className="whitespace-nowrap px-3 py-3 text-sm font-medium text-[--muted] transition-colors hover:text-[--text] sm:px-4"
        >
          Analytics
        </Link>
      </div>

      {/* Tab Content */}
      {activeTab === "archive" && (
        <AdminArchive
          properties={archivedProperties}
          loading={archiveLoading}
          restoring={restoring}
          onRestore={handleRestore}
          onPermanentDelete={handlePermanentDelete}
        />
      )}

      {activeTab === "cities" && (
        <AdminCities
          cities={cities}
          newCityName={newCityName}
          addingCity={addingCity}
          onNewCityNameChange={setNewCityName}
          onAddCity={handleAddCity}
          onDeleteCity={handleDeleteCity}
        />
      )}

      {activeTab === "inquiries" && (
        <AdminInquiries
          inquiries={inquiries}
          loading={loadingInquiries}
          error={inquiriesError}
          onRetry={fetchInquiries}
          onToggleRead={handleToggleRead}
          onDelete={handleDeleteInquiry}
        />
      )}
    </div>
  );
}
