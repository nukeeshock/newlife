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
    const delta = event.changedTouches[0]?.clientX - touchStartX.current;
    const threshold = 30;
    if (delta > threshold) prev();
    if (delta < -threshold) next();
    touchStartX.current = null;
  };

  const handleWhatsAppClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Analytics Event tracken
    await trackEvent("whatsapp_click", property.id);
    
    const text = encodeURIComponent(
      `Hallo, ich interessiere mich für "${property.title}" in ${property.city}. Können Sie mir weitere Informationen zusenden?`
    );
    window.open(`https://wa.me/4915112345678?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const isFeatured = variant === "featured";

  return (
    <div className="flex flex-col">
      {/* Klickbare Card (Link) */}
      <Link
        href={`/property/${property.slug}`}
        className={`group relative flex flex-col overflow-hidden border border-[--glass-border] bg-[--card] transition-all duration-500 hover:border-[--primary]/30 hover:shadow-[--shadow-glow] ${
          isFeatured ? "md:flex-row" : ""
        }`}
      >
        {/* Image Section */}
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
            <div className="absolute inset-0 flex items-center justify-center bg-[--card] text-[--muted]">
              <span className="text-sm">Kein Bild</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[--card] via-transparent to-transparent opacity-60" />
          
          {/* Status Badge */}
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge tone={getStatusTone(property.status)}>{formatStatus(property.status)}</Badge>
          </div>

          {/* Type Label */}
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[--text]/80">
              {formatType(property.type)}
            </span>
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
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-[--bg]/60 text-[--text] opacity-0 backdrop-blur transition-opacity hover:bg-[--bg]/80 group-hover:opacity-100"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-[--bg]/60 text-[--text] opacity-0 backdrop-blur transition-opacity hover:bg-[--bg]/80 group-hover:opacity-100"
                aria-label="Nächstes Bild"
              >
                ›
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {images.map((_url: string, index: number) => (
                  <span
                    key={index}
                    className={`h-1 w-1 rounded-full transition-colors ${
                      index === activeImage ? "bg-[--primary]" : "bg-[--text]/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className={`flex flex-1 flex-col p-6 ${isFeatured ? "md:p-8" : ""}`}>
          {/* Location */}
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[--muted]">
            <span>{property.city}</span>
            <span className="h-px w-3 bg-[--muted]/50" />
            <span>{property.country}</span>
          </div>

          {/* Title */}
          <h3 className={`font-serif font-light text-[--text] ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}>
            {property.title}
          </h3>

          {/* Description (Featured only) */}
          {isFeatured && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[--muted]">
              {property.description}
            </p>
          )}

          {/* Details */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[--muted]">
            {property.area && (
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[--primary]/50" />
                {property.area} m²
              </span>
            )}
            {property.bedrooms && (
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[--primary]/50" />
                {property.bedrooms} Schlafzimmer
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[--primary]/50" />
                {property.bathrooms} Bäder
              </span>
            )}
          </div>

          {/* Price & Actions */}
          <div className="mt-auto pt-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-[0.15em] text-[--muted]">
                    {getPriceLabel(property.listingType || "rent")}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 uppercase tracking-wider ${
                    property.listingType === "buy" 
                      ? "bg-blue-500/20 text-blue-300" 
                      : "bg-[--primary]/20 text-[--primary]"
                  }`}>
                    {formatListingType(property.listingType || "rent")}
                  </span>
                </div>
                <div className="font-serif text-2xl text-[--primary]">
                  {formatPriceEUR(property.priceEUR || property.price || 0)}
                </div>
              </div>
              
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 border border-[--glass-border] bg-[--glass] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[--text] transition-all hover:border-[--primary]/50 hover:text-[--primary]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Admin Actions - AUSSERHALB des Links */}
      {isAuthenticated && (
        <div className="border border-t-0 border-[--glass-border] bg-[--card] p-4">
          <PropertyAdminActions property={property} />
        </div>
      )}
    </div>
  );
}
