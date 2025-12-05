"use client";

import Image from "next/image";
import { useRef, useState, type TouchEvent, type MouseEvent } from "react";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPriceEUR, formatStatus, formatType, formatListingType, getPriceLabel, getStatusTone } from "@/lib/format";
import { Badge } from "./ui/badge";
import { useAuth } from "@/lib/hooks/use-auth";
import { PropertyAdminActions } from "./admin/property-admin-actions";
import { trackEvent } from "./analytics/analytics-tracker";

interface PropertyCardProps {
  property: Property;
  showRecommendedFlag?: boolean;
  variant?: "default" | "featured";
}

export function PropertyCard({
  property,
  showRecommendedFlag = true,
  variant = "default",
}: PropertyCardProps) {
  const { isAuthenticated } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const images = property.images ?? [];

  const next = () => {
    if (images.length === 0) return;
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    if (images.length === 0) return;
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      touchStartX.current = null;
      return;
    }
    const delta = touch.clientX - touchStartX.current;
    const threshold = 30;
    if (delta > threshold) prev();
    if (delta < -threshold) next();
    touchStartX.current = null;
  };

  const handleWhatsAppClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await trackEvent("whatsapp_click", property.id);

    const text = encodeURIComponent(
      `Hallo, ich interessiere mich fuer "${property.title}" in ${property.city}. Koennen Sie mir weitere Informationen zusenden?`
    );
    window.open(`https://wa.me/4915112345678?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const isFeatured = variant === "featured";

  return (
    <div className="flex flex-col">
      <Link
        href={`/immobilien/property/${property.slug}`}
        className={`group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-md transition-all duration-500 hover:shadow-xl ${
          isFeatured ? "md:flex-row" : ""
        }`}
      >
        {/* Image Section - Clean, no overlay */}
        <div
          className={`relative overflow-hidden ${
            isFeatured ? "h-64 md:h-auto md:w-1/2" : "h-56"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images[activeImage] ? (
            <Image
              src={images[activeImage]}
              alt={`${property.title} in ${property.city} - ${formatType(property.type)}${property.bedrooms ? `, ${property.bedrooms} Schlafzimmer` : ""}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={isFeatured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 360px, 100vw"}
              priority={showRecommendedFlag}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
              <span className="text-sm">Kein Bild</span>
            </div>
          )}

          {/* Status Badge - top left */}
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge tone={getStatusTone(property.status)}>{formatStatus(property.status)}</Badge>
          </div>

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Vorheriges Bild"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Naechstes Bild"
              >
                ›
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_url: string, index: number) => (
                  <span
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      index === activeImage ? "bg-[#D4AF37]" : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Section - Below image on white background */}
        <div className={`flex flex-1 flex-col p-5 ${isFeatured ? "md:p-6" : ""}`}>
          {/* Type Tag */}
          <div className="mb-2">
            <span className="inline-block rounded-sm bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]">
              {formatType(property.type)}
            </span>
          </div>

          {/* Title - Dark serif font */}
          <h3 className={`font-serif font-medium text-gray-900 ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}>
            {property.title}
          </h3>

          {/* Location - Dark sans-serif */}
          <div className="mt-1 flex items-center gap-2 text-xs font-medium text-gray-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>{property.city}, {property.country}</span>
          </div>

          {/* Description (Featured only) */}
          {isFeatured && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
              {property.description}
            </p>
          )}

          {/* Details */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            {property.area && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {property.area} m²
              </span>
            )}
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {property.bedrooms} Schlafzimmer
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                {property.bathrooms} Baeder
              </span>
            )}
          </div>

          {/* Price & Listing Type */}
          <div className="mt-auto pt-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    {getPriceLabel(property.listingType || "rent")}
                  </span>
                  <span className={`rounded-sm text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider ${
                    property.listingType === "buy"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-[#D4AF37]/10 text-[#D4AF37]"
                  }`}>
                    {formatListingType(property.listingType || "rent")}
                  </span>
                </div>
                <div className="font-serif text-2xl font-medium text-[#D4AF37]">
                  {formatPriceEUR(property.priceEUR || property.price || 0)}
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 rounded-sm bg-[#25D366] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#128C7E]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden sm:inline">Anfragen</span>
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Admin Actions - Outside Link */}
      {isAuthenticated && (
        <div className="rounded-b-sm border border-t-0 border-gray-200 bg-gray-50 p-4">
          <PropertyAdminActions property={property} />
        </div>
      )}
    </div>
  );
}
