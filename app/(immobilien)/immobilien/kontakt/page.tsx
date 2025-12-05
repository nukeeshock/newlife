import { Metadata } from "next";
import { KontaktForm } from "./kontakt-form";

export const metadata: Metadata = {
  title: "Kontakt – Persönliche Beratung",
  description:
    "Kontaktieren Sie NEW LIFE VIETNAM für eine persönliche Immobilienberatung. WhatsApp, E-Mail oder Kontaktformular – wir sind für Sie da.",
  openGraph: {
    title: "Kontakt – NEW LIFE VIETNAM",
    description:
      "Persönliche Beratung für Ihre Traumimmobilie in Vietnam. Wir sind für Sie da.",
    type: "website",
    url: "https://newlifevietnam.com/kontakt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt – NEW LIFE VIETNAM",
    description: "Persönliche Beratung für Ihre Traumimmobilie in Vietnam.",
  },
  alternates: {
    canonical: "https://newlifevietnam.com/kontakt",
  },
};

export default function KontaktPage() {
  return <KontaktForm />;
}
