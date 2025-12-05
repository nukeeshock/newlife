import Link from 'next/link';
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';

export default function SeniorLivingPage() {
  return (
    <div className="bg-[#F9F9F7] font-serif text-[#0A2239]">
        <SiteHeader>
            <span className="text-[#0A2239]/60">Exklusives Langzeitwohnen</span>
            <Link href="/goldzeit/kontakt" passHref>
                <span className="cursor-pointer rounded-sm bg-[#B8860B] px-6 py-3 text-white transition-opacity duration-300 hover:opacity-90">
                Kontakt
                </span>
            </Link>
        </SiteHeader>

      <main>
        {/* 1. Hero Section */}
        <section className="relative flex h-[70vh] items-center justify-center bg-cover bg-center text-center" style={{ backgroundImage: 'url(/hero_immobilien.jpg)' }}>
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="relative z-10 text-6xl font-light text-white drop-shadow-lg">
            Das Leben neu genießen. Unter der Sonne Vietnams.
          </h1>
        </section>

        {/* 2. The Promise Section */}
        <section className="px-[5%] py-24 text-center">
            <h2 className="mb-4 text-5xl font-light">Ihr sorgenfreier Lebensabschnitt</h2>
            <p className="mx-auto mb-8 max-w-3xl font-sans text-lg leading-relaxed text-[#0A2239]/70">
                Entdecken Sie eine Gemeinschaft, die Aktivität, Kultur und Entspannung in einem luxuriösen Umfeld vereint. Bei uns finden Sie nicht nur ein Zimmer, sondern ein Zuhause, in dem jeder Tag ein Erlebnis ist.
            </p>
        </section>

        {/* 3. Residences Section */}
        <section className="bg-white px-[5%] py-24">
            <h2 className="mb-12 text-center text-5xl font-light">Elegante Residenzen</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="h-[400px] bg-[#F9F9F7]" />
                <div className="h-[400px] bg-[#F9F9F7]" />
                <div className="h-[400px] bg-[#F9F9F7]" />
            </div>
        </section>

        {/* 4. Service Section */}
        <section className="px-[5%] py-24 text-center">
            <h2 className="mb-12 text-5xl font-light">Exklusiver Service, der begeistert</h2>
            <div className="flex flex-col justify-around gap-8 font-sans md:flex-row">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">24/7 Betreuung</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  </div>
                  <span className="font-medium">Vollpension</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">Pool & Garten</span>
                </div>
            </div>
        </section>

        {/* 5. Contact Section */}
        <section className="bg-[#0A2239] px-[5%] py-24 text-white">
             <div className="text-center">
                <h2 className="mb-4 text-5xl font-light">Beginnen Sie Ihr neues Kapitel.</h2>
                <p className="mx-auto mb-8 max-w-xl font-sans text-lg text-white/80">
                    Wir laden Sie herzlich zu einem persönlichen Gespräch ein. Kontaktieren Sie uns unverbindlich, um mehr über die Möglichkeiten zu erfahren.
                </p>
                <Link href="/goldzeit/kontakt" passHref>
                    <span className="inline-block cursor-pointer bg-[#D4AF37] px-8 py-4 font-sans text-[#0A2239] transition-colors hover:bg-[#D4AF37]/90">
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
