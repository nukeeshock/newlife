
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';

export default function ImpressumPage() {
  return (
    <div className="bg-bg text-text font-serif min-h-screen flex flex-col">
      <SiteHeader />
      <main className="py-24 px-[5%] flex-grow max-w-3xl mx-auto">
        <h1 className="text-5xl font-normal mb-8">Impressum</h1>
        <div className="font-sans text-muted leading-relaxed">
            <p><strong>New Life Vietnam - NLV Real Estate</strong></p>
            <p>Vertreten durch: [Ihr Name / Firmenname]</p>
            <p>Adresse: [Ihre Adresse in Vietnam oder Deutschland]</p>
            <p>Telefon: [Ihre Telefonnummer]</p>
            <p>E-Mail: [Ihre E-Mail-Adresse]</p>
            <br />
            <h2 className="font-serif text-3xl font-normal text-text mt-8">Haftungsausschluss</h2>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen...</p>
            {/* Add the rest of your legal text here */}
        </div>
      </main>
      <SiteFooter showLinks={false} />
    </div>
  );
}
