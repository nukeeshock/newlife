import type { Property } from "@/lib/types";
import { PropertyCard } from "./property-card";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            Ausgewählte Objekte
          </span>
          <h2 className="font-serif text-4xl font-light text-[--text] md:text-5xl">
            Unsere <span className="italic">Empfehlungen</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-[--muted]">
            Handverlesen von unserem Team – Objekte, die wir persönlich kennen und empfehlen.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              showRecommendedFlag={false}
              variant="featured"
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 flex justify-center">
          <a
            href="/type/private_residence"
            className="group flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[--muted] transition-colors hover:text-[--primary]"
          >
            <span>Alle Objekte ansehen</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
