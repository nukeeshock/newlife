import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PropertyListingPage } from "@/components/property-listing-page";
import { serializeBigInt } from "@/lib/serialize";
import { AddPropertyButton } from "@/components/admin/add-property-button";

export const dynamic = "force-dynamic";

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
  const properties = await prisma.property.findMany({
    where: {
      status: { not: "archived" },
    },
    orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        {/* Admin: Add Property Button */}
        <AddPropertyButton />

        <PropertyListingPage properties={serializeBigInt(properties)} />
      </div>
    </div>
  );
}
