import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { PropertyListingPage } from "@/components/property-listing-page";
import { serializeBigInt } from "@/lib/serialize";
import { AddPropertyButton } from "@/components/admin/add-property-button";

// ISR: Cache properties for 1 hour, revalidate on-demand via tag
const getProperties = unstable_cache(
  async () => {
    const properties = await prisma.property.findMany({
      where: {
        status: { not: "archived" },
      },
      orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
    });
    return serializeBigInt(properties);
  },
  ["properties-list"],
  { tags: ["properties"], revalidate: 3600 }
);

export const metadata: Metadata = {
  title: "Alle Immobilien | NLV Real Estate",
  description:
    "Entdecken Sie alle exklusiven Immobilien in Vietnam. Villen, Apartments, Residenzen und Gewerbeflächen in Da Nang, Hoi An und Ho Chi Minh City.",
  openGraph: {
    title: "Alle Immobilien | NLV Real Estate",
    description:
      "Exklusive Mietobjekte und Kaufimmobilien in Vietnam. Finden Sie Ihr Traumobjekt.",
    type: "website",
  },
};

export default async function ObjektePage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg-objekte.png"
            alt="Exklusive Immobilien in Vietnam"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-zinc-950/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
            Portfolio
          </span>
          <h1 className="mt-4 font-serif text-4xl font-light md:text-6xl">
            Exklusive <span className="italic text-amber-300">Immobilien</span>
          </h1>
          <p className="mt-6 text-lg font-light text-zinc-200 md:text-xl">
            Villen, Apartments & Residenzen in Vietnam
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {/* Admin: Add Property Button */}
        <AddPropertyButton />

        <Suspense fallback={<PropertyListingFallback />}>
          <PropertyListingPage properties={properties} />
        </Suspense>
      </div>
    </main>
  );
}

function PropertyListingFallback() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-48 bg-[--glass] rounded" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-[--glass] rounded" />
        ))}
      </div>
    </div>
  );
}
