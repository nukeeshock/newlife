import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/gallery";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { buttonClasses } from "@/components/ui/button";
import { formatPrice, formatStatus, formatType } from "@/lib/format";
import { getPropertyBySlug, type PropertyStatus } from "@/lib/properties";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const statusTone: Record<PropertyStatus, "success" | "warning" | "info" | "muted"> = {
  available: "success",
  reserved: "warning",
  rented: "info",
  archived: "muted",
};

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-6 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[--muted]">
              <span>{formatType(property.type)}</span>
              <span className="h-px w-3 bg-[--muted]/50" />
              <span>{property.city}</span>
            </div>
            <h1 className="font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
              {property.title}
            </h1>
            <p className="text-base text-[--muted]">
              {property.address}, {property.city}, {property.country}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={statusTone[property.status]}>
                {formatStatus(property.status)}
              </Badge>
              {property.recommended && <Badge tone="gold">Empfohlen</Badge>}
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="text-right">
              <span className="block text-xs uppercase tracking-[0.15em] text-[--muted]">
                Jahresmiete
              </span>
              <div className="font-serif text-3xl text-[--primary] md:text-4xl">
                {formatPrice(property.price, property.currency)}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTA propertyTitle={property.title} slug={property.slug} />
              <button
                type="button"
                className={buttonClasses({
                  variant: "ghost",
                  className: "px-6 py-3",
                })}
              >
                Exposé anfordern
              </button>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <Gallery images={property.images} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Description */}
          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light text-[--text]">
                Beschreibung
              </h2>
              <p className="leading-relaxed text-[--muted]">
                {property.description}
              </p>
            </div>
            
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-light text-[--text]">
                  Ausstattung
                </h3>
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((item) => (
                    <span
                      key={item}
                      className="border border-[--glass-border] bg-[--glass] px-4 py-2 text-sm text-[--text]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Eckdaten Sidebar */}
          <div className="border border-[--glass-border] bg-[--card] p-6 lg:p-8">
            <h3 className="font-serif text-xl font-light text-[--text]">
              Eckdaten
            </h3>
            <dl className="mt-6 space-y-4">
              {property.area && (
                <div className="flex justify-between border-b border-[--glass-border] pb-4 text-sm">
                  <dt className="text-[--muted]">Fläche</dt>
                  <dd className="font-medium text-[--text]">{property.area} m²</dd>
                </div>
              )}
              {property.bedrooms && (
                <div className="flex justify-between border-b border-[--glass-border] pb-4 text-sm">
                  <dt className="text-[--muted]">Schlafzimmer</dt>
                  <dd className="font-medium text-[--text]">{property.bedrooms}</dd>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex justify-between border-b border-[--glass-border] pb-4 text-sm">
                  <dt className="text-[--muted]">Bäder</dt>
                  <dd className="font-medium text-[--text]">{property.bathrooms}</dd>
                </div>
              )}
              <div className="flex justify-between border-b border-[--glass-border] pb-4 text-sm">
                <dt className="text-[--muted]">Status</dt>
                <dd className="font-medium text-[--text]">{formatStatus(property.status)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-[--muted]">Typ</dt>
                <dd className="font-medium text-[--text]">{formatType(property.type)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
