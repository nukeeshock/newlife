"use client";

import Image from "next/image";
import { Property } from "@/lib/types";
import { formatPriceEUR } from "@/lib/format";

interface AdminArchiveProps {
  properties: Property[];
  loading: boolean;
  restoring: string | null;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

export function AdminArchive({
  properties,
  loading,
  restoring,
  onRestore,
  onPermanentDelete,
}: AdminArchiveProps) {
  if (loading) {
    return <div className="py-12 text-center text-[--muted]">Laden...</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="border border-[--glass-border] bg-[--card] p-12 text-center">
        <div className="text-4xl">📦</div>
        <h3 className="mt-4 font-serif text-xl text-[--text]">
          Keine archivierten Exposés
        </h3>
        <p className="mt-2 text-sm text-[--muted]">
          Gelöschte Exposés werden hier angezeigt und können wiederhergestellt
          werden.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex flex-col gap-4 border border-[--glass-border] bg-[--card] p-4 transition-colors hover:border-[--primary]/20 sm:flex-row sm:items-center"
          >
            {/* Top row on mobile: Thumbnail + Info */}
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden bg-[--surface] sm:h-20 sm:w-32">
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
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-[--text]">
                  {property.title}
                </h3>
                <p className="text-sm text-[--muted]">
                  {property.city} • {formatPriceEUR(property.priceEUR)}
                </p>
                <p className="mt-1 text-xs text-[--muted]/60">
                  Archiviert am{" "}
                  {property.updatedAt
                    ? new Date(property.updatedAt).toLocaleDateString("de-DE")
                    : "Unbekannt"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:flex-shrink-0">
              <button
                onClick={() => onRestore(property.id)}
                disabled={restoring === property.id}
                className="flex-1 border border-[--primary]/30 bg-[--primary]/10 px-3 py-2 text-sm font-medium text-[--primary] transition-colors hover:bg-[--primary]/20 disabled:opacity-50 sm:flex-none sm:px-4"
              >
                {restoring === property.id ? "..." : "Wiederherstellen"}
              </button>
              <button
                onClick={() => onPermanentDelete(property.id)}
                className="flex-1 border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 sm:flex-none sm:px-4"
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>

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
  );
}
