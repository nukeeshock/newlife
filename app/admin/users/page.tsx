"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useAdmin } from "@/lib/context/admin-context";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Admin {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ============================================
// KPI Card Component
// ============================================

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="group border border-[--glass-border] bg-[--card] p-6 transition-all duration-300 hover:border-[--primary]/30">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
            {title}
          </div>
          <div className="mt-2 font-serif text-4xl font-light text-[--primary]">
            {value}
          </div>
        </div>
        <div className="text-[--primary]/40 transition-colors group-hover:text-[--primary]">
          {icon}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Modal Component
// ============================================

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modal = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-md border border-[#E5E0D8] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E0D8] px-6 py-4">
          <h2 className="font-serif text-xl font-light text-[#0A2239]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#5A6B7A] transition-colors hover:text-[#0A2239]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// ============================================
// Add Admin Modal
// ============================================

function AddAdminModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Erstellen");
      }

      setFormData({ email: "", password: "", name: "" });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-[#F9F9F7] border border-[#E5E0D8] px-4 py-3 text-sm text-[#0A2239] outline-none transition-all focus:border-[#B8860B]/50 placeholder:text-[#5A6B7A]/60";
  const labelClasses =
    "text-xs font-medium uppercase tracking-[0.2em] text-[#5A6B7A]";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Neuen Admin hinzufügen">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className={labelClasses}>E-Mail *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="admin@example.com"
            required
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Passwort *</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Mindestens 8 Zeichen"
            required
            minLength={8}
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Name (optional)</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Max Mustermann"
            className={inputClasses}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-[#5A6B7A] transition-colors hover:text-[#0A2239]"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={loading}
            className="border border-[#B8860B] bg-[#B8860B] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-transparent hover:text-[#B8860B] disabled:opacity-50"
          >
            {loading ? "Wird erstellt..." : "Admin erstellen"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ============================================
// Edit Admin Modal
// ============================================

function EditAdminModal({
  admin,
  onClose,
  onSuccess,
}: {
  admin: Admin | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        email: admin.email,
        name: admin.name || "",
        password: "",
      });
      setShowPasswordField(false);
    }
  }, [admin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      // Nur Passwort mitsenden wenn es ausgefüllt wurde
      const payload: { email: string; name: string; password?: string } = {
        email: formData.email,
        name: formData.name,
      };
      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await fetch(`/api/admins/${admin.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Aktualisieren");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-[#F9F9F7] border border-[#E5E0D8] px-4 py-3 text-sm text-[#0A2239] outline-none transition-all focus:border-[#B8860B]/50 placeholder:text-[#5A6B7A]/60";
  const labelClasses =
    "text-xs font-medium uppercase tracking-[0.2em] text-[#5A6B7A]";

  return (
    <Modal
      isOpen={admin !== null}
      onClose={onClose}
      title="Admin bearbeiten"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className={labelClasses}>E-Mail</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="admin@example.com"
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Max Mustermann"
            className={inputClasses}
          />
        </div>

        <div className="border-t border-[#E5E0D8] pt-4">
          {!showPasswordField ? (
            <button
              type="button"
              onClick={() => setShowPasswordField(true)}
              className="flex items-center gap-2 text-sm text-[#B8860B] transition-colors hover:text-[#DAA520]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Passwort ändern
            </button>
          ) : (
            <div className="space-y-2">
              <label className={labelClasses}>Neues Passwort</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Mindestens 8 Zeichen"
                minLength={8}
                className={inputClasses}
              />
              <p className="text-xs text-[#5A6B7A]">
                Leer lassen um das Passwort nicht zu ändern
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-[#5A6B7A] transition-colors hover:text-[#0A2239]"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            disabled={loading}
            className="border border-[#B8860B] bg-[#B8860B] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-transparent hover:text-[#B8860B] disabled:opacity-50"
          >
            {loading ? "Wird gespeichert..." : "Speichern"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ============================================
// Delete Confirmation Modal
// ============================================

function DeleteConfirmModal({
  admin,
  onClose,
  onConfirm,
  loading,
}: {
  admin: Admin | null;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <Modal
      isOpen={admin !== null}
      onClose={onClose}
      title="Admin löschen"
    >
      <div className="space-y-6">
        <p className="text-[#0A2239]">
          Möchtest du{" "}
          <span className="font-medium text-[#B8860B]">
            {admin?.name || admin?.email}
          </span>{" "}
          wirklich löschen?
        </p>
        <p className="text-sm text-[#5A6B7A]">
          Diese Aktion kann nicht rückgängig gemacht werden. Alle zugehörigen
          Sessions werden ebenfalls gelöscht.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-[#5A6B7A] transition-colors hover:text-[#0A2239]"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="border border-red-500 bg-red-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-transparent hover:text-red-500 disabled:opacity-50"
          >
            {loading ? "Wird gelöscht..." : "Endgültig löschen"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ============================================
// Main Page Component
// ============================================

export default function AdminUsersPage() {
  const { isAdmin, isLoading: authLoading } = useAdmin();
  const { adminId } = useAuth();
  const router = useRouter();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Auth redirect
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, authLoading, router]);

  // Fetch admins
  const fetchAdmins = useCallback(async () => {
    try {
      const res = await fetch("/api/admins");
      if (!res.ok) throw new Error("Fehler beim Laden");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchAdmins();
    }
  }, [isAdmin, fetchAdmins]);

  // Delete handler
  const handleDelete = async () => {
    if (!deletingAdmin) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admins/${deletingAdmin.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Löschen");
      }

      setDeletingAdmin(null);
      fetchAdmins();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Fehler beim Löschen");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (authLoading || !isAdmin) {
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
          href="/admin"
          className="mb-4 inline-flex items-center gap-2 text-sm text-[--muted] transition-colors hover:text-[--primary]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Zurück zum Dashboard
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-light text-[--text]">
              Admin-Benutzer
            </h1>
            <p className="mt-2 text-[--muted]">
              Verwalte die Administratoren der Plattform
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 border border-[--primary] bg-[--primary] px-6 py-3 text-sm font-medium text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Admin hinzufügen
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[--muted]">Laden...</div>
      ) : error ? (
        <div className="border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              title="Gesamt Admins"
              value={admins.length}
              icon={
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
            <StatCard
              title="Mit Namen"
              value={admins.filter((a) => a.name).length}
              icon={
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />
            <StatCard
              title="Neuester Admin"
              value={
                admins.length > 0
                  ? formatDate(admins[admins.length - 1].createdAt)
                  : "—"
              }
              icon={
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
            />
          </div>

          {/* Admin Table */}
          <div className="border border-[--glass-border] bg-[--card]">
            <div className="border-b border-[--glass-border] px-6 py-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[--muted]">
                Alle Administratoren
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[--glass-border] text-left text-xs uppercase tracking-[0.15em] text-[--muted]">
                    <th className="px-6 py-4 font-medium">E-Mail</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Erstellt am</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-[--muted]"
                      >
                        Noch keine Admins vorhanden
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => {
                      const isCurrentUser = admin.id === adminId;

                      return (
                        <tr
                          key={admin.id}
                          className="group border-b border-[--glass-border]/50 transition-colors hover:bg-[--surface]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {/* Avatar */}
                              <div className="flex h-9 w-9 items-center justify-center border border-[--glass-border] bg-[--surface] text-sm font-medium text-[--primary]">
                                {(admin.name || admin.email)[0].toUpperCase()}
                              </div>
                              <div>
                                <span className="font-medium text-[--text]">
                                  {admin.email}
                                </span>
                                {isCurrentUser && (
                                  <span className="ml-2 inline-flex items-center border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                                    Du
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[--muted]">
                              {admin.name || "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm text-[--muted]">
                              {formatDate(admin.createdAt)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {/* Edit Button */}
                              <button
                                onClick={() => setEditingAdmin(admin)}
                                className="p-2 text-[--muted] transition-colors hover:text-[--primary]"
                                title="Bearbeiten"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>

                              {/* Delete Button - disabled for current user */}
                              <button
                                onClick={() =>
                                  !isCurrentUser && setDeletingAdmin(admin)
                                }
                                disabled={isCurrentUser}
                                className={`p-2 transition-colors ${
                                  isCurrentUser
                                    ? "cursor-not-allowed text-[--muted]/30"
                                    : "text-[--muted] hover:text-red-400"
                                }`}
                                title={
                                  isCurrentUser
                                    ? "Du kannst dich nicht selbst löschen"
                                    : "Löschen"
                                }
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Box */}
          <div className="border border-[--glass-border] bg-[--surface] p-6">
            <h3 className="font-medium text-[--text]">ℹ️ Hinweise</h3>
            <ul className="mt-3 space-y-2 text-sm text-[--muted]">
              <li>• Neue Admins erhalten sofort Zugang zur Plattform</li>
              <li>• Passwörter werden sicher verschlüsselt gespeichert</li>
              <li>• Du kannst deinen eigenen Account nicht löschen</li>
              <li>• Beim Löschen werden alle Sessions beendet</li>
            </ul>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddAdminModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchAdmins}
      />
      <EditAdminModal
        admin={editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onSuccess={fetchAdmins}
      />
      <DeleteConfirmModal
        admin={deletingAdmin}
        onClose={() => setDeletingAdmin(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
