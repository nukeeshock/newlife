
import Link from 'next/link';
import { prisma } from "@/lib/db";
import { serializeBigInt } from "@/lib/serialize";
import { SiteHeader } from '@/components/layout/header';
import { SiteFooter } from '@/components/layout/footer';
import { Property } from '@prisma/client';

const ImmobilienHero = ({ propertyCount }: { propertyCount: number }) => (
    <section className="h-[60vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1593696140826-c58b0213d423?q=80&w=2070&auto=format&fit=crop)' }}>
        <div>
            <h1 className="text-6xl font-normal text-white" style={{ textShadow: '2px 2px 10px #000' }}>Finden Sie Ihr Traumdomizil</h1>
            <p className="font-sans text-lg text-white">{propertyCount} exklusive Immobilien warten auf Sie.</p>
            {/* Placeholder for the filter bar */}
            <div className="mt-8 bg-black/50 p-4 inline-block">
                <p className="font-sans">Filter bar placeholder</p>
            </div>
        </div>
    </section>
);

const ImmobilienFeatured = ({ properties }: { properties: Property[] }) => (
    <section className="py-24 px-[5%]">
        <h2 className="text-5xl font-normal text-center mb-12">Empfohlene Objekte</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
            {properties.map(prop => (
                <div key={prop.id} className="border border-border bg-surface text-text font-sans">
                    <div className="h-[250px] bg-[#444]" /* Img Placeholder */></div>
                    <div className="p-6">
                        <h3 className="font-serif text-2xl">{prop.title}</h3>
                        <p className="text-primary text-lg">{prop.city}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default async function ImmobilienPage() {
  const [featured, totalCount] = await Promise.all([
    prisma.property.findMany({
      where: {
        recommended: true,
        status: { not: "archived" }
      },
      orderBy: [{ popularity: "asc" }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.property.count({
      where: { status: { not: "archived" } },
    }),
  ]);

  return (
    <div className="bg-bg text-text font-serif">
        <SiteHeader>
            <Link href="/immobilien/kaufen"><span className="cursor-pointer">Kaufen</span></Link>
            <Link href="/immobilien/mieten"><span className="cursor-pointer">Mieten</span></Link>
            <Link href="/ueber-uns"><span className="cursor-pointer">Über Uns</span></Link>
            <Link href="/kontakt" passHref>
                <span className="bg-primary text-bg px-6 py-3 rounded-md cursor-pointer transition-opacity duration-300 hover:opacity-90">
                Kontakt
                </span>
            </Link>
        </SiteHeader>
      <main>
        <ImmobilienHero propertyCount={totalCount} />
        <ImmobilienFeatured properties={serializeBigInt(featured)} />
        {/* CtaSection can be added here later */}
      </main>
      <SiteFooter />
    </div>
  );
}
