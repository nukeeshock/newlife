import { Metadata } from "next";
import { GoldzeitHero } from "@/components/goldzeit/goldzeit-hero";
import { GoldzeitConcept } from "@/components/goldzeit/goldzeit-concept";
import { GoldzeitFeatures } from "@/components/goldzeit/goldzeit-features";
import { GoldzeitPricing } from "@/components/goldzeit/goldzeit-pricing";
import { GoldzeitTeam } from "@/components/goldzeit/goldzeit-team";
import { GoldzeitCta } from "@/components/goldzeit/goldzeit-cta";

export const metadata: Metadata = {
  title: "NLV Goldzeit Living | Co-Living in Vietnam fuer Best Ager",
  description:
    "Das exklusive Shared Living Konzept fuer Menschen ab 50+ in Da Nang, Vietnam. Pool-Villen, Vollpension, deutschsprachige Betreuung. Ab 999 EUR pro Monat.",
  keywords: [
    "Co-Living Vietnam",
    "Senioren WG Vietnam",
    "Auswandern Vietnam",
    "Best Ager Vietnam",
    "Shared Living Da Nang",
    "Betreutes Wohnen Ausland",
  ],
  openGraph: {
    title: "NLV Goldzeit Living | Gemeinsam leben in Vietnam",
    description:
      "Pool-Villen, Vollpension, 24/7 Betreuung. Das Shared Living Konzept fuer Best Ager in Da Nang.",
    type: "website",
    locale: "de_DE",
  },
};

export default function GoldzeitPage() {
  return (
    <>
      <GoldzeitHero />
      <GoldzeitConcept />
      <GoldzeitFeatures />
      <GoldzeitPricing />
      <GoldzeitTeam />
      <GoldzeitCta />
    </>
  );
}
