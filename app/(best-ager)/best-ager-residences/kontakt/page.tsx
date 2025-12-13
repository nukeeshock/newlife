import { Metadata } from "next";
import Image from "next/image";
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
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg-kontakt.png"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-zinc-950/85" />
      </div>
      <BestAgerKontaktForm />
    </main>
  );
}
