import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { CtaSection } from "@/components/cta-section";
import { prisma } from "@/lib/db";
import { serializeBigInt } from "@/lib/serialize";
import Link from "next/link";

// ISR: Cache featured properties for 1 hour
const getFeaturedData = unstable_cache(
  async () => {
    const [featured, totalCount] = await Promise.all([
      prisma.property.findMany({
        where: {
          recommended: true,
          status: { not: "archived" },
        },
        orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
        take: 6,
      }),
      prisma.property.count({
        where: { status: { not: "archived" } },
      }),
    ]);
    return { featured: serializeBigInt(featured), totalCount };
  },
  ["featured-properties"],
  { tags: ["properties"], revalidate: 3600 }
);

export const metadata: Metadata = {
  title: "NLV Real Estate - Exklusive Immobilien in Vietnam",
  description:
    "Handverlesene Luxus-Mietobjekte in Da Nang, Hoi An und Ho Chi Minh City. Ihr persönlicher Concierge für exklusive Immobilien in Vietnam.",
};

export default async function ImmobilienPage() {
  const { featured, totalCount } = await getFeaturedData();

  return (
    <>
      <Hero propertyCount={totalCount} />

      {/* Divider */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="divider-gold" />
      </div>

      <FeaturedProperties properties={featured} />

      {/* Divider */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="divider-gold" />
      </div>

      {/* Best Ager Residences Teaser Section */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="border border-[--border] bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
                  Best Ager Residences
                </span>
                <h2 className="mt-2 font-serif text-2xl font-light text-[--accent] md:text-3xl">
                  Gemeinsam leben in Vietnam
                </h2>
                <p className="mt-4 text-[--muted]">
                  Unser Co-Living Konzept für Best Ager: Pool-Villen, Vollpension,
                  deutschsprachige Betreuung - ab 999 EUR pro Monat.
                </p>
              </div>
              <Link
                href="/best-ager-residences"
                className="flex items-center gap-2 border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
              >
                Mehr erfahren
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
