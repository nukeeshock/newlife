import { notFound } from "next/navigation";
import { TypePageShell } from "@/components/type-page-shell";
import {
  getPropertiesByType,
  propertyTypeCopy,
  type PropertyType,
} from "@/lib/properties";

interface TypePageProps {
  params: Promise<{ property_type: string }>;
}

export default async function TypePage({ params }: TypePageProps) {
  const { property_type } = await params;
  const type = property_type as PropertyType;

  if (!Object.prototype.hasOwnProperty.call(propertyTypeCopy, type)) {
    notFound();
  }

  const safeType = type as PropertyType;
  const properties = getPropertiesByType(safeType);

  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <TypePageShell
          properties={properties}
          type={safeType}
          summary={propertyTypeCopy[safeType].summary}
        />
      </div>
    </div>
  );
}
