"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface GalleryProps {
  images: string[];
  propertyTitle: string;
  propertyType?: string;
}

export function Gallery({ images, propertyTitle, propertyType }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Guard: No images → show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex h-[450px] items-center justify-center border border-[--glass-border] bg-[--card] text-[--muted] md:h-[550px]">
          <span>Keine Bilder verfügbar</span>
        </div>
      </div>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      touchStartX.current = null;
      return;
    }
    const delta = touch.clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    }
    touchStartX.current = null;
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="group relative h-[450px] overflow-hidden border border-[--glass-border] bg-[--card] md:h-[550px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={activeImage}
          alt={`${propertyTitle} - Bild ${activeIndex + 1} von ${images.length}${propertyType ? ` - ${propertyType}` : ""}`}
          fill
          className="object-cover transition-transform duration-700"
          sizes="(min-width: 1024px) 900px, 100vw"
          priority={activeIndex === 0}
        />
        
        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[--bg]/40 via-transparent to-transparent" />
        
        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-[--glass-border] bg-[--bg]/70 text-[--text] opacity-0 backdrop-blur transition-all hover:border-[--primary]/50 hover:text-[--primary] group-hover:opacity-100"
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-[--glass-border] bg-[--bg]/70 text-[--text] opacity-0 backdrop-blur transition-all hover:border-[--primary]/50 hover:text-[--primary] group-hover:opacity-100"
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </>
        )}
        
        {/* Counter */}
        <div className="absolute bottom-4 right-4 border border-[--glass-border] bg-[--bg]/70 px-4 py-2 text-xs text-[--text] backdrop-blur">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, index) => (
          <button
            key={img + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-28 flex-shrink-0 overflow-hidden border transition-all ${
              index === activeIndex
                ? "border-[--primary]"
                : "border-[--glass-border] hover:border-[--primary]/50"
            }`}
          >
            <Image src={img} alt={`${propertyTitle} - Vorschau ${index + 1}`} fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
