import { Metadata } from "next";
import { GoldzeitKontaktForm } from "./goldzeit-kontakt-form";

export const metadata: Metadata = {
  title: "Kontakt - NLV Goldzeit Living",
  description:
    "Kontaktieren Sie uns fuer eine kostenlose Beratung zum Co-Living in Vietnam. Wir beantworten alle Ihre Fragen zu unserem Shared Living Konzept.",
  openGraph: {
    title: "Kontakt - NLV Goldzeit Living",
    description:
      "Kostenlose Beratung zum Co-Living Konzept fuer Best Ager in Vietnam.",
    type: "website",
  },
};

export default function GoldzeitKontaktPage() {
  return <GoldzeitKontaktForm />;
}
