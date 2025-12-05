"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./image-upload";
import { eurToVnd, vndToEur } from "@/lib/format";
import type { PropertyType } from "@/lib/types";

interface City {
  id: string;
  name: string;
  country: string;
}

interface AddPropertyButtonProps {
  type?: PropertyType;
}

const LISTING_TYPES = [
  { value: "rent", label: "Mieten" },
  { value: "buy", label: "Kaufen" },
];

const PROPERTY_TYPES = [
  { value: "private_residence", label: "Residenz" },
  { value: "house", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Gewerbefläche" },
];

export function AddPropertyButton({ type: propType }: AddPropertyButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    propertyType: propType || ("apartment" as PropertyType),
    listingType: "rent",
    priceEUR: "",
    priceVND: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    images: [] as string[],
  });

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
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          city: formData.city,
          type: propType || formData.propertyType,
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
          images: formData.images.length > 0 ? formData.images : ["/da-nang.jpg"],
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        setFormData({
          title: "",
          description: "",
          city: "",
          propertyType: propType || ("apartment" as PropertyType),
          listingType: "rent",
          priceEUR: "",
          priceVND: "",
          area: "",
          bedrooms: "",
          bathrooms: "",
          amenities: "",
          images: [],
        });
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Fehler beim Erstellen");
      }
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Fehler beim Erstellen");
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
            Neues Objekt hinzufuegen
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

          {/* Property Type, Listing Type & City */}
          <div className={`grid gap-4 ${propType ? "grid-cols-2" : "grid-cols-3"}`}>
            {/* Property Type - only show if not provided as prop */}
            {!propType && (
              <div className="space-y-2">
                <label className={labelClasses}>Objektart *</label>
                <div className="relative">
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
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
            )}
            <div className="space-y-2">
              <label className={labelClasses}>Angebots-Art *</label>
              <div className="relative">
                <select
                  value={formData.listingType}
                  onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
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
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[--muted]">
                  v
                </div>
              </div>
              {cities.length === 0 && (
                <p className="text-xs text-[--muted]">
                  Keine Staedte vorhanden. <a href="/admin" className="text-[--primary] hover:underline">Staedte verwalten</a>
                </p>
              )}
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
              {loading ? "Wird erstellt..." : "Erstellen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Add Button - Admin Style */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mb-8 inline-flex items-center gap-2 border-2 border-dashed border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-semibold tracking-wide text-emerald-700 transition-all hover:border-solid hover:bg-emerald-500 hover:text-white"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>Neues Objekt hinzufügen</span>
      </button>

      {/* Modal via Portal */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
