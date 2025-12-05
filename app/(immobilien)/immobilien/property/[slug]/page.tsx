import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Gallery } from "@/components/gallery";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { buttonClasses } from "@/components/ui/button";
import {
  formatPriceEUR,
  formatPriceVND,
  formatStatus,
  formatType,
  formatListingType,
  getPriceLabel,
  getStatusTone
} from "@/lib/format";
import { prisma } from "@/lib/db";
import { PropertyDetailAdmin } from "@/components/admin/property-detail-admin";
import { PropertySchema, BreadcrumbSchema } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/breadcrumb";
import type { Property } from "@/lib/types";

export const dynamic = "force-dynamic";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({
    where: { slug },
    select: { title: true, description: true, city: true, images: true, priceEUR: true },
  });

  if (!property) {
    return { title: "Property nicht gefunden" };
  }

  const description = property.description.slice(0, 160);

  return {
    title: `${property.title} | NEW LIFE VIETNAM`,
    description,
    openGraph: {
      title: property.title,
      description,
      images: property.images[0] ? [property.images[0]] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}


export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  
  const property = await prisma.property.findUnique({
    where: { slug },
  });

  if (!property) {
    notFound();
  }

  // Property für Client-Komponente konvertieren (BigInt → Number)
  const propertyData: Property = {
    id: property.id,
    slug: property.slug,
    title: property.title,
    description: property.description,
    city: property.city,
    country: property.country,
    address: property.address || "",
    listingType: property.listingType,
    priceEUR: property.priceEUR || property.price || 0,
    priceVND: Number(property.priceVND || 0),
    price: property.price,
    currency: property.currency,
    status: property.status,
    type: property.type,
    recommended: property.recommended,
    images: property.images,
    area: property.area || null,
    bedrooms: property.bedrooms || null,
    bathrooms: property.bathrooms || null,
    amenities: property.amenities,
    popularity: property.popularity,
  };

  const listingType = property.listingType || "rent";
  const priceLabel = getPriceLabel(listingType);
  const priceEUR = property.priceEUR || property.price || 0;
  const priceVND = Number(property.priceVND || 0);

  return (
    <>
      {/* SEO: Schema.org Structured Data */}
      <PropertySchema
        property={{
          title: property.title,
          description: property.description,
          slug: property.slug,
          city: property.city,
          country: property.country,
          priceEUR: priceEUR,
          listingType: listingType as "rent" | "buy",
          type: property.type,
          area: property.area,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          images: property.images,
          status: property.status,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://newlifevietnam.com" },
          { name: formatType(property.type), url: `https://newlifevietnam.com/type/${property.type}` },
          { name: property.city, url: `https://newlifevietnam.com/stadt/${property.city.toLowerCase().replace(/\s+/g, "-")}` },
          { name: property.title, url: `https://newlifevietnam.com/property/${property.slug}` },
        ]}
      />

      <div className="pt-24">
        {/* Admin Panel (nur für eingeloggte Admins) */}
        <PropertyDetailAdmin property={propertyData} />
      
      <div className="mx-auto w-full max-w-6xl space-y-12 px-6 py-12 md:px-8 md:py-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: formatType(property.type), href: `/type/${property.type}` },
            { label: property.city, href: `/stadt/${property.city.toLowerCase().replace(/\s+/g, "-")}` },
            { label: property.title },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[--muted]">
              <span>{formatListingType(listingType)}</span>
              <span className="h-px w-3 bg-[--muted]/50" />
              <span>{formatType(property.type)}</span>
              <span className="h-px w-3 bg-[--muted]/50" />
              <span>{property.city}</span>
            </div>
            <h1 className="font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
              {property.title}
            </h1>
            {property.address && (
              <p className="text-base text-[--muted]">
                {property.address}, {property.city}, {property.country}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={listingType === "buy" ? "info" : "gold"}>
                {formatListingType(listingType)}
              </Badge>
              <Badge tone={getStatusTone(property.status)}>
                {formatStatus(property.status)}
              </Badge>
              {property.recommended && <Badge tone="gold">Empfohlen</Badge>}
            </div>
          </div>
          
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="text-right">
              <span className="block text-xs uppercase tracking-[0.15em] text-[--muted]">
                {priceLabel}
              </span>
              <div className="font-serif text-3xl text-[--primary] md:text-4xl">
                {formatPriceEUR(priceEUR)}
              </div>
              {priceVND > 0 && (
                <div className="text-sm text-[--muted] mt-1">
                  ≈ {formatPriceVND(priceVND)}
                </div>
              )}
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
        <Gallery
          images={property.images}
          propertyTitle={property.title}
          propertyType={formatType(property.type)}
        />

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
                  {property.amenities.map((item: string, index: number) => (
                    <span
                      key={`${item}-${index}`}
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
              <div className="flex justify-between border-b border-[--glass-border] pb-4 text-sm">
                <dt className="text-[--muted]">Angebot</dt>
                <dd className="font-medium text-[--text]">{formatListingType(listingType)}</dd>
              </div>
              <div className="flex justify-between border-b border-[--glass-border] pb-4 text-sm">
                <dt className="text-[--muted]">{priceLabel}</dt>
                <dd className="font-medium text-[--primary]">{formatPriceEUR(priceEUR)}</dd>
              </div>
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
    </>
  );
}
