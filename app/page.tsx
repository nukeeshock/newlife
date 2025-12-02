import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { CtaSection } from "@/components/cta-section";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Empfohlene Properties und Gesamtzahl aus der Datenbank laden
  const [featured, totalCount] = await Promise.all([
    prisma.property.findMany({
      where: { 
        recommended: true,
        status: { not: "archived" }
      },
      orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
    }),
    prisma.property.count({
      where: { status: { not: "archived" } },
    }),
  ]);

  return (
    <>
      <Hero propertyCount={totalCount} />
      
      {/* Divider */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="divider-gold" />
      </div>

      <FeaturedProperties properties={featured} />

      <CtaSection />
    </>
  );
}
