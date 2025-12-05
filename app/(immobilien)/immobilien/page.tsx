import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { serializeBigInt } from "@/lib/serialize";
import { PropertyListWithFilters } from "@/components/property-list-with-filters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alle Immobilien - NLV Real Estate",
  description:
    "Entdecken Sie unsere handverlesenen Luxus-Immobilien in Vietnam. Villen, Residenzen, Apartments und Gewerbeflaechen in Da Nang, Hoi An und Ho Chi Minh City.",
};

export default async function ImmobilienPage() {
  const properties = await prisma.property.findMany({
    where: {
      status: { not: "archived" },
    },
    orderBy: [{ recommended: "desc" }, { popularity: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="min-h-screen bg-[--bg]">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[--bg] via-transparent to-[--bg]" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 text-center md:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
            NLV Real Estate
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl lg:text-6xl">
            Alle Immobilien
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[--muted]">
            Entdecken Sie unsere handverlesene Auswahl an Premium-Immobilien in Vietnam.
            Filtern Sie nach Typ, Stadt oder Preis.
          </p>
        </div>
      </section>

      {/* Properties with Filters */}
      <PropertyListWithFilters properties={serializeBigInt(properties)} />
    </div>
  );
}
