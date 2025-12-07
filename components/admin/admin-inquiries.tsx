"use client";

import { useState } from "react";
import Link from "next/link";

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

interface AdminInquiriesProps {
  inquiries: ContactInquiry[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onToggleRead: (inquiry: ContactInquiry) => void;
  onDelete: (id: string) => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getRelativeTime(dateString: string) {
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
}

// XSS-sichere Encodierung für mailto/tel Links
const safeEmail = (email: string) => encodeURIComponent(email);
const safePhone = (phone: string) => encodeURIComponent(phone);

export function AdminInquiries({
  inquiries,
  loading,
  error,
  onRetry,
  onToggleRead,
  onDelete,
}: AdminInquiriesProps) {
  const [selectedInquiry, setSelectedInquiry] =
    useState<ContactInquiry | null>(null);

  const handleOpenInquiry = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.read) {
      onToggleRead(inquiry);
    }
  };

  const handleCloseModal = () => {
    setSelectedInquiry(null);
  };

  const handleToggleRead = (inquiry: ContactInquiry) => {
    onToggleRead(inquiry);
    if (selectedInquiry?.id === inquiry.id) {
      setSelectedInquiry({ ...inquiry, read: !inquiry.read });
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-[--muted]">Laden...</div>;
  }

  if (error) {
    return (
      <div className="border border-red-500/30 bg-red-500/10 p-6">
        <h3 className="font-medium text-red-400">Fehler beim Laden</h3>
        <p className="mt-2 text-sm text-[--muted]">{error}</p>
        <button
          onClick={onRetry}
          className="mt-4 border border-[--primary]/30 bg-[--primary]/10 px-4 py-2 text-sm text-[--primary] hover:bg-[--primary]/20"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="border border-[--glass-border] bg-[--card] p-12 text-center">
        <div className="text-4xl">📬</div>
        <h3 className="mt-4 font-serif text-xl text-[--text]">
          Keine Anfragen vorhanden
        </h3>
        <p className="mt-2 text-sm text-[--muted]">
          Kontaktanfragen von der Website werden hier angezeigt.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`cursor-pointer border bg-[--card] p-4 transition-colors hover:border-[--primary]/20 ${
              inquiry.read
                ? "border-[--glass-border]"
                : "border-[--primary]/30"
            }`}
            onClick={() => handleOpenInquiry(inquiry)}
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
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`truncate font-medium ${
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
                <p className="mt-2 line-clamp-2 text-sm text-[--muted]/70">
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
                {inquiry.read
                  ? "Als ungelesen markieren"
                  : "Als gelesen markieren"}
              </button>
              <span className="text-[--glass-border]">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Anfrage wirklich löschen?")) {
                    handleDelete(inquiry.id);
                  }
                }}
                className="text-xs text-[--muted] transition-colors hover:text-red-400"
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-12 border border-[--glass-border] bg-[--surface] p-6">
        <h3 className="font-medium text-[--text]">ℹ️ Über Anfragen</h3>
        <ul className="mt-3 space-y-2 text-sm text-[--muted]">
          <li>• Neue Anfragen werden mit einem goldenen Punkt markiert</li>
          <li>• Klicke auf eine Anfrage um die Details anzuzeigen</li>
          <li>
            • Anfragen werden beim Öffnen automatisch als gelesen markiert
          </li>
        </ul>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80" />

          {/* Modal */}
          <div
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border border-[--glass-border] bg-[--card] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl text-[--text]">
                Anfrage von {selectedInquiry.name}
              </h2>
              <button
                onClick={handleCloseModal}
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
                <p className="text-[--text]">
                  {formatDate(selectedInquiry.createdAt)}
                </p>
              </div>
              {selectedInquiry.property && (
                <div>
                  <span className="text-xs text-[--muted]">
                    Bezug auf Objekt
                  </span>
                  <p>
                    <Link
                      href={`/immobilien/property/${selectedInquiry.property.slug}`}
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
                  if (confirm("Anfrage wirklich löschen?")) {
                    handleDelete(selectedInquiry.id);
                  }
                }}
                className="border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
