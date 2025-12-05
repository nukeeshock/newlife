import { Metadata } from "next";
import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { CtaSection } from "@/components/cta-section";
import { prisma } from "@/lib/db";
import { serializeBigInt } from "@/lib/serialize";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NLV Real Estate - Exklusive Immobilien in Vietnam",
  description:
    "Handverlesene Luxus-Mietobjekte in Da Nang, Hoi An und Ho Chi Minh City. Ihr persoenlicher Concierge fuer exklusive Immobilien in Vietnam.",
};

export default async function ImmobilienPage() {
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

  return (
    <>
      <Hero propertyCount={totalCount} />

      {/* Divider */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="divider-gold" />
      </div>

      <FeaturedProperties properties={serializeBigInt(featured)} />

      {/* Divider */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="divider-gold" />
      </div>

      {/* Goldzeit Teaser Section */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="border border-[--glass-border] bg-[--glass] p-8 md:p-12">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex-1">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-orange-500">
                  NLV Goldzeit Living
                </span>
                <h2 className="mt-2 font-serif text-2xl font-light text-[--text] md:text-3xl">
                  Gemeinsam leben in Vietnam
                </h2>
                <p className="mt-4 text-[--muted]">
                  Unser Co-Living Konzept fuer Best Ager: Pool-Villen, Vollpension,
                  deutschsprachige Betreuung - ab 999 EUR pro Monat.
                </p>
              </div>
              <Link
                href="/goldzeit"
                className="flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-6 py-3 text-sm font-medium text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
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
