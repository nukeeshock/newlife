import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import {
  getCitySlugs,
  getCityBySlug,
  type CityInvestment,
} from "@/lib/data/cities";

export async function generateStaticParams() {
  return getCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return { title: "Stadt nicht gefunden | NewLife Vietnam" };
  }

  const description = city.intro.slice(0, 155) + "...";

  return {
    title: `Immobilien in ${city.name} – Luxus-Mietobjekte`,
    description,
    openGraph: {
      title: `${city.name} – Luxus-Immobilien in Vietnam`,
      description,
      type: "website",
      url: `https://newlifevietnam.com/stadt/${citySlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.name} – Immobilien`,
      description,
    },
    alternates: {
      canonical: `https://newlifevietnam.com/stadt/${citySlug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://newlifevietnam.com" },
          { name: city.name, url: `https://newlifevietnam.com/stadt/${citySlug}` },
        ]}
      />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto w-full max-w-6xl px-6 pt-28">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: city.name },
            ]}
          />
        </div>

        {/* Cinematic Hero Section */}
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0">
            {city.images.hero.startsWith("/") ? (
              <Image
                src={city.images.hero}
                alt={city.heroTitle}
                fill
                className="object-cover transition-transform duration-[2s] hover:scale-105"
                priority
                quality={90}
              />
            ) : (
              <div className="h-full w-full bg-[--surface]" />
            )}
            {/* Cinematic Overlay - Gradient for text readability */}
            {/* Stronger gradient at top and center for better text pop */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-white/90 drop-shadow-md md:mb-6 md:text-sm">
              Entdecken Sie
            </p>
            <h1 className="font-serif text-5xl font-light leading-none tracking-tight drop-shadow-2xl md:text-8xl lg:text-9xl">
              {city.heroTitle}
            </h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[--gateway-gold] to-transparent md:mt-12" />
            <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-white/95 drop-shadow-lg md:text-2xl">
              {city.heroSubtitle}
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Intro Section - Clean White Background */}
        <section className="relative z-20 px-6 pb-16 pt-16 md:pb-24">
          <div className="mx-auto max-w-4xl border border-[--glass-border] bg-[--bg] p-8 shadow-2xl shadow-black/10 md:p-12 md:text-center text-[--text]">
            <p className="text-lg leading-relaxed text-[--text-secondary] font-light md:text-xl">
              {city.intro}
            </p>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="divider-gold opacity-50" />

        {/* Bento Grid - Highlights with Images */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-16 text-center font-serif text-4xl font-light text-[--text] md:text-5xl">
              Was <span className="text-[--primary]">{city.name}</span> besonders macht
            </h2>

            {/* Bento Grid Layout - Mobile: stacked, Desktop: asymmetric grid */}
            <div className="grid gap-4 md:grid-cols-12 md:gap-6">
              {/* Large Image - spans 7 cols, 2 rows on desktop */}
              <div className="relative aspect-[4/3] overflow-hidden border border-[--glass-border] bg-[--card] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[500px] group">
                <SmartImage src={city.images.grid1} />
              </div>

              {/* Card 1 - right side top */}
              <div className="md:col-span-5">
                <HighlightCard highlight={city.highlights[0]} />
              </div>

              {/* Card 2 - right side bottom */}
              <div className="md:col-span-5">
                <HighlightCard highlight={city.highlights[1]} />
              </div>

              {/* Card 3 - left side */}
              <div className="md:col-span-5">
                <HighlightCard highlight={city.highlights[2]} />
              </div>

              {/* Image 2 - spans 7 cols, 2 rows on desktop */}
              <div className="relative aspect-[4/3] overflow-hidden border border-[--glass-border] bg-[--card] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[500px] group">
                <SmartImage src={city.images.grid2} />
              </div>

              {/* Card 4 - left side */}
              <div className="md:col-span-5">
                <HighlightCard highlight={city.highlights[3]} />
              </div>
            </div>
          </div>
        </section>

        {/* Investment Section (Only if data exists) */}
        {city.investment && <InvestmentSection data={city.investment} />}

        {/* Content Sections with alternating images */}
        {city.sections.map((section, index) => (
          <section
            key={section.title}
            className={`px-6 py-16 md:py-24 ${index % 2 === 0 ? "bg-[--surface]" : ""}`}
          >
            <div className="mx-auto max-w-6xl">
              <div
                className={`grid items-center gap-12 md:grid-cols-2 md:gap-20 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Text */}
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h2 className="mb-6 font-serif text-3xl font-light text-[--text] md:text-4xl">
                    {section.title}
                  </h2>
                  <div className="mb-6 h-px w-12 bg-[--primary]/50" />
                  <p className="text-lg leading-relaxed text-[--muted] font-light">
                    {section.content}
                  </p>
                </div>

                {/* Image */}
                <div
                  className={`relative aspect-[3/4] overflow-hidden border border-[--glass-border] bg-[--card] shadow-xl ${index % 2 === 1 ? "md:order-1" : ""
                    }`}
                >
                  <SmartImage
                    src={index === 0 ? city.images.grid3 : city.images.realEstate}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Activities Section */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center font-serif text-3xl font-light text-[--text] md:text-4xl">
              Entdecken & Erleben
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-[--muted]">
              {city.name} bietet unzählige Möglichkeiten für Ausflüge, Erholung
              und kulturelle Erlebnisse
            </p>

            {/* Activities Bento Grid */}
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {city.activities.map((activity, index) => (
                <div
                  key={activity.title}
                  className={`group border border-[--glass-border] bg-[--card] p-6 transition-all duration-300 hover:border-[--primary]/30 ${index === 0 ? "md:col-span-2" : ""
                    } ${index === 3 ? "md:col-span-2" : ""}`}
                >
                  <h3 className="mb-2 font-medium text-[--text] transition-colors group-hover:text-[--primary]">
                    {activity.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[--muted]">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[--surface] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-light text-[--text] md:text-4xl">
              Immobilien in {city.name}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[--muted]">
              Entdecken Sie unsere handverlesenen Objekte – von modernen
              Apartments über luxuriöse Villen bis hin zu attraktiven
              Gewerbeflächen.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3">
              <Link
                href={`/immobilien/objekte?type=apartment&city=${encodeURIComponent(
                  city.propertyType
                )}`}
                className="inline-flex items-center border border-[--primary] bg-[--primary] px-6 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
              >
                Apartments
              </Link>
              <Link
                href={`/immobilien/objekte?type=house&city=${encodeURIComponent(
                  city.propertyType
                )}`}
                className="inline-flex items-center border border-[--primary] bg-[--primary] px-6 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
              >
                Villen
              </Link>
              <Link
                href={`/immobilien/objekte?type=private_residence&city=${encodeURIComponent(
                  city.propertyType
                )}`}
                className="inline-flex items-center border border-[--primary] bg-[--primary] px-6 py-4 text-sm font-medium tracking-wide text-[--bg] transition-all hover:bg-transparent hover:text-[--primary]"
              >
                Residenzen
              </Link>
              <Link
                href="/immobilien/kontakt"
                className="inline-flex items-center border border-[--glass-border] px-8 py-4 text-sm font-medium tracking-wide text-[--text] transition-all hover:border-[--primary] hover:text-[--primary]"
              >
                Beratung anfordern
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Investment Section Component
function InvestmentSection({ data }: { data: CityInvestment }) {
  return (
    <section className="border-y border-[--border] bg-[--surface] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-light text-[--text] md:text-4xl">
            {data.title}
          </h2>
          <p className="text-lg leading-relaxed text-[--muted]">{data.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.points.map((point) => (
            <div
              key={point.title}
              className="group relative flex flex-col border border-[--glass-border] bg-[--card] p-6 transition-all duration-300 hover:border-[--primary]/50 hover:shadow-lg"
            >
              {/* Highlight Badge */}
              <div className="mb-6 inline-flex self-start bg-[--primary]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[--primary]">
                {point.highlight}
              </div>
              {/* Icon */}
              <div className="mb-4 text-[--text-secondary] transition-colors group-hover:text-[--primary]">
                <HighlightIcon icon={point.icon} />
              </div>
              {/* Content */}
              <h3 className="mb-3 font-serif text-xl text-[--text]">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-[--muted]">
                {point.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Highlight Card Component
function HighlightCard({
  highlight,
}: {
  highlight: { title: string; description: string; icon: string };
}) {
  return (
    <div className="border border-[--glass-border] bg-[--card] p-6 transition-all duration-300 hover:border-[--primary]/30 md:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[--primary]/30 text-[--primary]">
        <HighlightIcon icon={highlight.icon} />
      </div>
      <h3 className="mb-2 text-lg font-medium text-[--text]">
        {highlight.title}
      </h3>
      <p className="text-sm leading-relaxed text-[--muted]">
        {highlight.description}
      </p>
    </div>
  );
}

// Helper Component to decide between Real Image and Placeholder
function SmartImage({ src }: { src: string }) {
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt="City impression"
        fill
        className="object-cover transition-transform duration-[2s] group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }
  return <ImagePlaceholder label={src} />;
}

// Image Placeholder Component
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[--card] to-[--surface] transition-colors duration-500 group-hover:from-[--surface] group-hover:to-[--card]">
      {/* Placeholder Icon */}
      <svg
        aria-hidden="true"
        className="mb-4 h-16 w-16 text-[--primary]/20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      {/* Label */}
      <span className="px-4 text-center text-sm font-medium tracking-widest uppercase text-[--muted]">
        {label}
      </span>
      {/* Decorative border */}
      <div className="absolute inset-4 border border-dashed border-[--glass-border]" />
    </div>
  );
}

// Icon component for highlights
function HighlightIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    wallet: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        />
      </svg>
    ),
    shield: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    plane: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    ),
    utensils: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12"
        />
      </svg>
    ),
    landmark: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>
    ),
    scissors: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"
        />
      </svg>
    ),
    "umbrella-beach": (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
    building: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    moon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    ),
    globe: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
    hospital: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    tax: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    port: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        />
      </svg>
    ),
    trend: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
    users: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  };

  return icons[icon] || icons.building;
}
