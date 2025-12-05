import Script from "next/script";

// =============================================================================
// Organization Schema - für Root Layout (RealEstateAgent)
// =============================================================================

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "NEW LIFE VIETNAM",
    url: "https://newlifevietnam.com",
    description:
      "Premium Immobilien-Concierge für Luxus-Mietobjekte in Vietnam. Spezialisiert auf Da Nang, Hoi An und Ho Chi Minh City.",
    areaServed: [
      { "@type": "City", name: "Da Nang" },
      { "@type": "City", name: "Hoi An" },
      { "@type": "City", name: "Ho Chi Minh City" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "VN",
    },
    priceRange: "$$$$",
    telephone: "+84 83 211 4684",
    email: "contact@newlifevietnam.de",
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// Property Schema - für Property-Detail-Seiten (RealEstateListing)
// =============================================================================

interface PropertySchemaProps {
  property: {
    title: string;
    description: string;
    slug: string;
    city: string;
    country: string;
    priceEUR: number | null;
    listingType: "rent" | "buy";
    type: string;
    area?: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    images: string[];
    status: string;
  };
}

export function PropertySchema({ property }: PropertySchemaProps) {
  const isForRent = property.listingType === "rent";
  const price = property.priceEUR || 0;

  // Berechne Datumsfelder einmalig (vermeidet impure Date.now() im Schema-Objekt)
  const now = new Date();
  const datePosted = now.toISOString();
  const priceValidUntilDate = new Date(now);
  priceValidUntilDate.setDate(priceValidUntilDate.getDate() + 30);
  const priceValidUntil = priceValidUntilDate.toISOString().split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://newlifevietnam.com/immobilien/property/${property.slug}`,
    image: property.images,
    datePosted,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "EUR",
      ...(isForRent && { priceValidUntil }),
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressCountry: property.country,
    },
    ...(property.area && {
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.area,
        unitCode: "MTK",
      },
    }),
    ...(property.bedrooms && { numberOfRooms: property.bedrooms }),
    ...(property.bathrooms && { numberOfBathroomsTotal: property.bathrooms }),
  };

  return (
    <Script
      id={`property-schema-${property.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// Breadcrumb Schema - für Navigation-Struktur
// =============================================================================

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// FAQ Schema - für FAQ-Seite (Featured Snippets)
// =============================================================================

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// =============================================================================
// WebSite Schema - für Sitelinks Search Box (optional)
// =============================================================================

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NEW LIFE VIETNAM",
    url: "https://newlifevietnam.com",
    description: "Premium Immobilien in Vietnam",
    inLanguage: "de-DE",
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
