import type { Property } from "@/lib/properties";
import { PropertyCard } from "./property-card";

interface PropertyGridProps {
  properties: Property[];
  showRecommendedFlag?: boolean;
}

export function PropertyGrid({
  properties,
  showRecommendedFlag = true,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-[--muted]">
          Keine Objekte gefunden.
        </p>
        <p className="mt-2 text-sm text-[--muted]">
          Passen Sie Ihre Filter an oder setzen Sie sie zurück.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {properties.map((property) => (
        <PropertyCard
          key={property.slug}
          property={property}
          showRecommendedFlag={showRecommendedFlag}
        />
      ))}
    </div>
  );
}
