
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';

export default function SeniorLivingPage() {
  return (
    <div className="bg-bg text-text font-serif">
        <SiteHeader>
            <span className="text-muted">Exklusives Langzeitwohnen</span>
            <Link href="/kontakt" passHref>
                <span className="bg-primary text-bg px-6 py-3 rounded-md cursor-pointer transition-opacity duration-300 hover:opacity-90">
                Kontakt
                </span>
            </Link>
        </SiteHeader>

      <main>
        {/* 1. Hero Section */}
        <section className="h-[70vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1588796123631-f3a3a2a3a16c?q=80&w=2070&auto=format&fit=crop)' }}>
          <h1 className="text-6xl font-normal text-white" style={{ textShadow: '2px 2px 10px #000' }}>
            Das Leben neu genießen. Unter der Sonne Vietnams.
          </h1>
        </section>

        {/* 2. The Promise Section */}
        <section className="py-24 px-[5%] text-center">
            <h2 className="text-5xl font-normal mb-4">Ihr sorgenfreier Lebensabschnitt</h2>
            <p className="text-lg font-sans text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
                Entdecken Sie eine Gemeinschaft, die Aktivität, Kultur und Entspannung in einem luxuriösen Umfeld vereint. Bei uns finden Sie nicht nur ein Zimmer, sondern ein Zuhause, in dem jeder Tag ein Erlebnis ist.
            </p>
        </section>

        {/* 3. Residences Section */}
        <section className="py-24 px-[5%] bg-surface">
            <h2 className="text-5xl font-normal text-center mb-12">Elegante Residenzen</h2>
            {/* Placeholder for a gallery component */}
            <div className="grid grid-cols-3 gap-8">
                <div className="h-[400px] bg-[#333]"></div>
                <div className="h-[400px] bg-[#333]"></div>
                <div className="h-[400px] bg-[#333]"></div>
            </div>
        </section>

        {/* 4. Service Section */}
        <section className="py-24 px-[5%] text-center">
            <h2 className="text-5xl font-normal mb-12">Exklusiver Service, der begeistert</h2>
            {/* Placeholder for service icons and text */}
            <div className="flex justify-around font-sans">
                <div>Icon & Text 1</div>
                <div>Icon & Text 2</div>
                <div>Icon & Text 3</div>
            </div>
        </section>
        
        {/* 5. Contact Section */}
        <section className="py-24 px-[5%] bg-primary text-bg">
             <div className="text-center">
                <h2 className="text-5xl font-normal mb-4">Beginnen Sie Ihr neues Kapitel.</h2>
                <p className="text-lg font-sans max-w-xl mx-auto mb-8">
                    Wir laden Sie herzlich zu einem persönlichen Gespräch ein. Kontaktieren Sie uns unverbindlich, um mehr über die Möglichkeiten zu erfahren.
                </p>
                <Link href="/kontakt" passHref>
                    <span className="bg-bg text-text px-8 py-4 rounded-md cursor-pointer inline-block font-sans">
                        Jetzt anfragen
                    </span>
                </Link>
            </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
