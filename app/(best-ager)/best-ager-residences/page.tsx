import { Metadata } from "next";
import { BestAgerHero } from "@/components/best-ager/best-ager-hero";
import { BestAgerConcept } from "@/components/best-ager/best-ager-concept";
import { BestAgerFeatures } from "@/components/best-ager/best-ager-features";
import { BestAgerPricing } from "@/components/best-ager/best-ager-pricing";
import { BestAgerTeam } from "@/components/best-ager/best-ager-team";
import { BestAgerCta } from "@/components/best-ager/best-ager-cta";

export const metadata: Metadata = {
  title: "Best Ager Residences | Co-Living in Vietnam für Best Ager",
  description:
    "Das exklusive Shared Living Konzept für Menschen ab 50+ in Da Nang, Vietnam. Pool-Villen, Vollpension, deutschsprachige Betreuung. Ab 999 EUR pro Monat.",
  keywords: [
    "Co-Living Vietnam",
    "Senioren WG Vietnam",
    "Auswandern Vietnam",
    "Best Ager Vietnam",
    "Shared Living Da Nang",
    "Betreutes Wohnen Ausland",
  ],
  openGraph: {
    title: "Best Ager Residences | Gemeinsam leben in Vietnam",
    description:
      "Pool-Villen, Vollpension, 24/7 Betreuung. Das Shared Living Konzept für Best Ager in Da Nang.",
    type: "website",
    locale: "de_DE",
  },
};

export default function BestAgerPage() {
  return (
    <>
      <BestAgerHero />
      <BestAgerConcept />
      <BestAgerFeatures />
      <BestAgerPricing />
      <BestAgerTeam />
      <BestAgerCta />
    </>
  );
}
