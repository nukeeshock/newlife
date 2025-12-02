"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import type { Property } from "@/lib/types";

interface PropertyAdminActionsProps {
  property: Property;
  onUpdate?: () => void;
}

export function PropertyAdminActions({ property, onUpdate }: PropertyAdminActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleRecommended = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recommended: !property.recommended }),
      });
      onUpdate?.();
      router.refresh();
    } catch (error) {
      console.error("Error toggling recommended:", error);
    }
    setLoading(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateStatus(e.target.value);
  };

  const updateStatus = async (status: string) => {
    setLoading(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      onUpdate?.();
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
    setLoading(false);
  };

  const deleteProperty = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Möchten Sie dieses Objekt wirklich löschen?")) return;
    
    setLoading(true);
    try {
      await fetch(`/api/properties/${property.id}`, {
        method: "DELETE",
      });
      onUpdate?.();
      router.refresh();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
    setLoading(false);
  };

  // Container auch stoppen
  const handleContainerClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`flex flex-wrap items-center gap-2 ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Stern-Markierung */}
      <button
        type="button"
        onClick={toggleRecommended}
        className={`flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
          property.recommended
            ? "border-[--primary] bg-[--primary]/10 text-[--primary]"
            : "border-[--glass-border] bg-[--glass] text-[--muted] hover:border-[--primary]/50 hover:text-[--primary]"
        }`}
        title={property.recommended ? "Von Startseite entfernen" : "Auf Startseite zeigen"}
      >
        <span>{property.recommended ? "★" : "☆"}</span>
        <span className="hidden sm:inline">{property.recommended ? "Empfohlen" : "Empfehlen"}</span>
      </button>

      {/* Status ändern */}
      <select
        value={property.status}
        onChange={handleStatusChange}
        onMouseDown={(e) => e.stopPropagation()}
        className="border border-[--glass-border] bg-[--surface] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[--text] outline-none transition-colors focus:border-[--primary]/50 cursor-pointer"
      >
        <option value="available">Verfügbar</option>
        <option value="reserved">Reserviert</option>
        <option value="rented">Vermietet</option>
        <option value="archived">Archiviert</option>
      </select>

      {/* Löschen */}
      <button
        type="button"
        onClick={deleteProperty}
        className="flex items-center gap-1.5 border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-red-400 transition-all hover:bg-red-500/20"
        title="Objekt löschen"
      >
        <span>✕</span>
        <span className="hidden sm:inline">Löschen</span>
      </button>
    </div>
  );
}

