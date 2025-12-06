"use client";

import { useState, useEffect } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./property-card";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset activeIndex if it goes out of bounds when properties change
  useEffect(() => {
    if (activeIndex >= properties.length && properties.length > 0) {
      setActiveIndex(properties.length - 1);
    }
  }, [properties.length, activeIndex]);

  if (properties.length === 0) {
    return null;
  }

  // Safe current property (fallback to first if out of bounds)
  const currentProperty = properties[activeIndex] ?? properties[0];

  // Carousel navigation
  const next = () =>
    setActiveIndex((i) => Math.min(i + 1, properties.length - 1));
  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      setTouchStart(touch.clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touch = e.changedTouches[0];
    if (!touch) {
      setTouchStart(null);
      return;
    }
    const diff = touchStart - touch.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
    setTouchStart(null);
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="animate-fadeInDown opacity-0-initial mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Ausgewählte Objekte
          </span>
          <h2 className="animate-fadeInUp delay-100 opacity-0-initial font-serif text-4xl font-light text-[--text] md:text-5xl">
            Unsere <span className="italic">Empfehlungen</span>
          </h2>
          <p className="animate-fadeInUp delay-200 opacity-0-initial mt-4 max-w-xl text-base text-[--muted]">
            Handverlesen von unserem Team – Objekte, die wir persönlich kennen
            und empfehlen.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="animate-fadeInUp delay-300 opacity-0-initial md:hidden">
          {/* Single Property Display */}
          <div
            className="relative transition-transform duration-300"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <PropertyCard
              property={currentProperty}
              showRecommendedFlag={false}
              variant="default"
            />

            {/* Previous Arrow */}
            {activeIndex > 0 && (
              <button
                onClick={prev}
                className="absolute left-2 top-32 z-10 flex h-10 w-10 items-center justify-center bg-white/90 text-[--accent] shadow-md backdrop-blur-sm transition-colors hover:text-[--primary]"
                aria-label="Vorheriges Objekt"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {activeIndex < properties.length - 1 && (
              <button
                onClick={next}
                className="absolute right-2 top-32 z-10 flex h-10 w-10 items-center justify-center bg-white/90 text-[--accent] shadow-md backdrop-blur-sm transition-colors hover:text-[--primary]"
                aria-label="Nächstes Objekt"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Dot Indicators */}
          <div className="animate-fadeInUp delay-300 opacity-0-initial mt-6 flex flex-wrap justify-center gap-2">
            {properties.map((property, i) => (
              <button
                key={property.id}
                onClick={() => setActiveIndex(i)}
                className={`h-2 w-2 transition-all duration-300 ${
                  i === activeIndex ? "scale-125 bg-[--primary]" : "bg-[--muted]/30 hover:bg-[--muted]/50"
                }`}
                aria-label={`Gehe zu Objekt ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="animate-fadeInUp delay-400 opacity-0-initial mt-4 text-center text-sm text-[--muted]">
            {activeIndex + 1} / {properties.length}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-8 lg:gap-10">
            {properties.map((property, i) => (
              <div
                key={property.id}
                className="animate-fadeInUp opacity-0-initial"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <PropertyCard
                  property={property}
                  showRecommendedFlag={false}
                  variant="featured"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
