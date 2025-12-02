import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { CtaSection } from "@/components/cta-section";
import { properties } from "@/lib/properties";

export default function Home() {
  const featured = properties.filter((property) => property.recommended);

  return (
    <>
      <Hero />
      
      {/* Divider */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="divider-gold" />
      </div>

      <FeaturedProperties properties={featured} />

      <CtaSection />
    </>
  );
}
