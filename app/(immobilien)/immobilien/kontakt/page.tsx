
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';

// Placeholder for the Contact Form Component
const KontaktForm = () => (
    <form className="flex flex-col gap-6 max-w-xl mx-auto">
        <input type="text" placeholder="Ihr Name" className="bg-surface border border-border text-text p-4 font-sans" />
        <input type="email" placeholder="Ihre E-Mail-Adresse" className="bg-surface border border-border text-text p-4 font-sans" />
        <textarea placeholder="Ihre Nachricht" rows={6} className="bg-surface border border-border text-text p-4 font-sans"></textarea>
        <button type="submit" className="bg-primary text-bg p-4 rounded-md cursor-pointer border-none font-sans text-base">
            Nachricht senden
        </button>
    </form>
);

export default function KontaktPage() {
  return (
    <div className="bg-bg text-text font-serif">
        <SiteHeader>
            <Link href="/immobilien"><span className="cursor-pointer">Immobilien</span></Link>
            <Link href="/wohnen"><span className="cursor-pointer">Langzeitwohnen</span></Link>
        </SiteHeader>
      <main className="py-24 px-[5%] text-center">
        <h1 className="text-6xl font-normal mb-4">Kontaktieren Sie uns</h1>
        <p className="text-lg font-sans text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Wir freuen uns darauf, von Ihnen zu hören. Ob Sie eine Frage zu unseren Residenzen haben oder eine Beratung für Ihr Immobilieninvestment wünschen – wir sind für Sie da.
        </p>
        <KontaktForm />
      </main>
      <SiteFooter />
    </div>
  );
}
