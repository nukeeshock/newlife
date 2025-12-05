import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TypePageWrapper } from "@/components/type-page-wrapper";
import { prisma } from "@/lib/db";
import { propertyTypeCopy, type PropertyType } from "@/lib/types";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { formatType } from "@/lib/format";

export const dynamic = "force-dynamic";

interface TypePageProps {
  params: Promise<{ property_type: string }>;
}

const validTypes: PropertyType[] = ["private_residence", "apartment", "house", "commercial"];

// SEO Metadata für Type-Seiten
const typeMetadata: Record<PropertyType, { title: string; description: string }> = {
  private_residence: {
    title: "Private Residenzen in Vietnam mieten",
    description:
      "Exklusive Private Residenzen in Da Nang, Hoi An und Ho Chi Minh City. Luxuriöse Rückzugsorte mit Privatsphäre, Strandnähe und tropischen Gärten.",
  },
  apartment: {
    title: "Luxus Apartments in Vietnam mieten",
    description:
      "Moderne Apartments in Da Nang und Saigon. Premium-Wohnungen mit Concierge-Service, Balkon und atemberaubender Aussicht auf Meer oder Stadt.",
  },
  house: {
    title: "Villen zur Miete in Vietnam",
    description:
      "Großzügige Villen und Häuser in Vietnam. Komplett möblierte Luxus-Villen für längere Aufenthalte in Da Nang, Hoi An und Ho Chi Minh City.",
  },
  commercial: {
    title: "Gewerbeflächen in Vietnam",
    description:
      "Repräsentative Gewerbeflächen in Top-Lagen Vietnams. Büros, Showrooms und Gastronomieflächen in Da Nang und Ho Chi Minh City.",
  },
};

export async function generateMetadata({ params }: TypePageProps): Promise<Metadata> {
  const { property_type } = await params;

  if (!validTypes.includes(property_type as PropertyType)) {
    return { title: "Nicht gefunden" };
  }

  const type = property_type as PropertyType;
  const meta = typeMetadata[type];

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://newlifevietnam.com/type/${type}`,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://newlifevietnam.com/type/${type}`,
    },
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { property_type } = await params;
  
  if (!validTypes.includes(property_type as PropertyType)) {
    notFound();
  }

  const type = property_type as PropertyType;
  
  const properties = await prisma.property.findMany({
    where: {
      type,
      status: { not: "archived" }
    },
    orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
  });

  const typeName = formatType(type);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://newlifevietnam.com" },
          { name: typeName, url: `https://newlifevietnam.com/type/${type}` },
        ]}
      />
      <div className="pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: typeName },
            ]}
          />
          <TypePageWrapper
            properties={properties}
            type={type}
            summary={propertyTypeCopy[type].summary}
          />
        </div>
      </div>
    </>
  );
}
