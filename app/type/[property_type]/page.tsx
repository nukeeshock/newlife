import { notFound } from "next/navigation";
import { TypePageWrapper } from "@/components/type-page-wrapper";
import { prisma } from "@/lib/db";
import { propertyTypeCopy, type PropertyType } from "@/lib/types";

export const dynamic = "force-dynamic";

interface TypePageProps {
  params: Promise<{ property_type: string }>;
}

const validTypes: PropertyType[] = ["private_residence", "apartment", "house", "commercial"];

export default async function TypePage({ params }: TypePageProps) {
  const { property_type } = await params;
  
  if (!validTypes.includes(property_type as PropertyType)) {
    notFound();
  }

  const type = property_type as PropertyType;
  
  const properties = await prisma.property.findMany({
    where: { type },
    orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <TypePageWrapper
          properties={properties}
          type={type}
          summary={propertyTypeCopy[type].summary}
        />
      </div>
    </div>
  );
}
