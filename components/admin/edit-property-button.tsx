"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { buttonClasses } from "@/components/ui/button";
import { ImageUpload } from "./image-upload";
import { eurToVnd, vndToEur } from "@/lib/format";
import type { Property, PropertyType, PropertyStatus, ListingType } from "@/lib/types";

interface City {
  id: string;
  name: string;
  country: string;
}

interface EditPropertyButtonProps {
  property: Property;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "private_residence", label: "Private Residence" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "Haus" },
  { value: "commercial", label: "Gewerbe" },
];

const LISTING_TYPES = [
  { value: "rent", label: "Mieten" },
  { value: "buy", label: "Kaufen" },
];

const PROPERTY_STATUSES = [
  { value: "available", label: "Verfügbar" },
  { value: "reserved", label: "Reserviert" },
  { value: "rented", label: "Vermietet" },
  { value: "sold", label: "Verkauft" },
];

export function EditPropertyButton({ property }: EditPropertyButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Form state mit neuen Feldern
  const [formData, setFormData] = useState({
    title: property.title,
    description: property.description,
    city: property.city,
    type: property.type,
    status: property.status,
    listingType: property.listingType || "rent",
    priceEUR: property.priceEUR?.toString() || property.price?.toString() || "",
    priceVND: property.priceVND?.toString() || "",
    area: property.area?.toString() || "",
    bedrooms: property.bedrooms?.toString() || "",
    bathrooms: property.bathrooms?.toString() || "",
    amenities: property.amenities?.join(", ") || "",
    images: property.images || [],
    recommended: property.recommended,
  });

  // Für Portal: erst nach Mount rendern
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCities = async () => {
      try {
        const res = await fetch("/api/cities");
        const data = await res.json();
        if (isMounted) {
          setCities(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    if (isOpen) {
      fetchCities();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      isMounted = false;
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-Berechnung VND wenn EUR sich ändert
  const handlePriceEURChange = (value: string) => {
    const eur = parseInt(value) || 0;
    const vnd = eur > 0 ? eurToVnd(eur) : BigInt(0);
    setFormData({
      ...formData,
      priceEUR: value,
      priceVND: vnd.toString(),
    });
  };

  // Auto-Berechnung EUR wenn VND sich ändert
  const handlePriceVNDChange = (value: string) => {
    const vnd = parseInt(value) || 0;
    const eur = vnd > 0 ? vndToEur(vnd) : 0;
    setFormData({
      ...formData,
      priceVND: value,
      priceEUR: eur.toString(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          city: formData.city,
          type: formData.type,
          status: formData.status,
          listingType: formData.listingType,
          priceEUR: parseInt(formData.priceEUR) || 0,
          priceVND: parseInt(formData.priceVND) || 0,
          price: parseInt(formData.priceEUR) || 0, // Legacy
          area: formData.area ? parseInt(formData.area) : null,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          amenities: formData.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
          images: formData.images,
          recommended: formData.recommended,
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Fehler beim Speichern");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Fehler beim Speichern");
    }
    setLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const inputClasses =
    "w-full bg-white border border-[--border] px-4 py-3 text-sm text-[--text] outline-none transition-all focus:border-[--primary]/50 placeholder:text-[--muted]/60";

  const selectClasses =
    "w-full bg-white border border-[--border] px-4 py-3 text-sm text-[--text] outline-none transition-all focus:border-[--primary]/50 appearance-none cursor-pointer";

  const labelClasses = "text-xs font-medium uppercase tracking-[0.2em] text-[--muted]";

  const priceLabel = formData.listingType === "buy" ? "Kaufpreis" : "Monatsmiete";

  const modal = isOpen && mounted ? (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-[--border] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-[--border] bg-white px-6 py-4">
          <h2 className="font-serif text-xl font-light text-[--text]">
            Expose bearbeiten
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-2xl text-[--muted] transition-colors hover:text-[--text]"
          >
            x
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Title */}
          <div className="space-y-2">
            <label className={labelClasses}>Titel *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="z.B. Lakeside Villa Son Tra"
              required
              className={inputClasses}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className={labelClasses}>Beschreibung *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ausführliche Beschreibung des Objekts..."
              required
              rows={4}
              className={inputClasses}
            />
          </div>

          {/* Listing Type & Property Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClasses}>Angebots-Art *</label>
              <div className="relative">
                <select
                  value={formData.listingType}
                  onChange={(e) => setFormData({ ...formData, listingType: e.target.value as ListingType })}
                  required
                  className={selectClasses}
                >
                  {LISTING_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[--muted]">
                  v
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Objekt-Typ *</label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                  required
                  className={selectClasses}
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[--muted]">
                  v
                </div>
              </div>
            </div>
          </div>

          {/* Price EUR & VND */}
          <div className="space-y-2">
            <label className={labelClasses}>{priceLabel} *</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  value={formData.priceEUR}
                  onChange={(e) => handlePriceEURChange(e.target.value)}
                  placeholder="z.B. 3000"
                  required
                  className={inputClasses}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[--muted] text-sm">EUR</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={formData.priceVND}
                  onChange={(e) => handlePriceVNDChange(e.target.value)}
                  placeholder="z.B. 79500000"
                  required
                  className={inputClasses}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[--muted] text-sm">VND</span>
              </div>
            </div>
            <p className="text-xs text-[--muted]">
              Gib einen Wert ein - der andere wird automatisch umgerechnet (Kurs: ~26.500 VND/EUR)
            </p>
          </div>

          {/* Status & City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClasses}>Status *</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                  required
                  className={selectClasses}
                >
                  {PROPERTY_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[--muted]">
                  v
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Stadt *</label>
              <div className="relative">
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className={selectClasses}
                >
                  <option value="">Stadt auswaehlen...</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                  {!cities.find(c => c.name === formData.city) && formData.city && (
                    <option value={formData.city}>{formData.city}</option>
                  )}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[--muted]">
                  v
                </div>
              </div>
            </div>
          </div>

          {/* Area, Bedrooms, Bathrooms */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className={labelClasses}>Fläche (m²)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="z.B. 420"
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Schlafzimmer</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                placeholder="z.B. 5"
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Bäder</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                placeholder="z.B. 4"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <label className={labelClasses}>Ausstattung (kommagetrennt)</label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              placeholder="z.B. Pool, Garage, Klimaanlage"
              className={inputClasses}
            />
          </div>

          {/* Recommended Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="edit-recommended"
              checked={formData.recommended}
              onChange={(e) => setFormData({ ...formData, recommended: e.target.checked })}
              className="h-4 w-4 accent-[--primary]"
            />
            <label htmlFor="edit-recommended" className="text-sm text-[--text]">
              Als empfohlen markieren (erscheint auf Startseite)
            </label>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className={labelClasses}>Bilder</label>
            <ImageUpload
              images={formData.images}
              onChange={(images) => setFormData({ ...formData, images })}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-[--border] pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-sm font-medium text-[--muted] transition-colors hover:text-[--text]"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[--accent] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[--accent-warm] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Wird gespeichert..." : "Speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Edit Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonClasses({
          variant: "ghost",
          className: "gap-2 w-full justify-center",
        })}
      >
        <span>✏️</span>
        <span>Bearbeiten</span>
      </button>

      {/* Modal via Portal */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
