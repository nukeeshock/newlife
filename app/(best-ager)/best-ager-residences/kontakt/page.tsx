import { Metadata } from "next";
import { BestAgerKontaktForm } from "./best-ager-kontakt-form";

export const metadata: Metadata = {
  title: "Kontakt - Best Ager Residences",
  description:
    "Kontaktieren Sie uns für eine kostenlose Beratung zum Co-Living in Vietnam. Wir beantworten alle Ihre Fragen zu unserem Shared Living Konzept.",
  openGraph: {
    title: "Kontakt - Best Ager Residences",
    description:
      "Kostenlose Beratung zum Co-Living Konzept für Best Ager in Vietnam.",
    type: "website",
  },
};

export default function BestAgerKontaktPage() {
  return <BestAgerKontaktForm />;
}
