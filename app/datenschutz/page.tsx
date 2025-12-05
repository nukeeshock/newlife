
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';

export default function DatenschutzPage() {
  return (
    <div className="bg-bg text-text font-serif min-h-screen flex flex-col">
      <SiteHeader />
      <main className="py-24 px-[5%] flex-grow max-w-3xl mx-auto">
        <h1 className="text-5xl font-normal mb-8">Datenschutzerklärung</h1>
        <div className="font-sans text-muted leading-relaxed">
            <h2 className="font-serif text-3xl font-normal text-text mt-8">1. Datenschutz auf einen Blick</h2>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen...</p>
            {/* Add the rest of your privacy policy text here */}
        </div>
      </main>
      <SiteFooter showLinks={false} />
    </div>
  );
}
