import { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq-accordion";
import { vietnamFAQs } from "@/lib/faq-data";
import { FAQSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Häufige Fragen – Immobilien & Leben in Vietnam",
  description:
    "Antworten auf häufige Fragen zu Immobilien in Vietnam: Mietprozess, Visum, Nebenkosten, Sicherheit und mehr. Alles was Sie über das Leben in Vietnam wissen müssen.",
  openGraph: {
    title: "FAQ – NewLife Vietnam",
    description:
      "Häufige Fragen zu Immobilien in Vietnam, Mietprozess, Visa und Lebenshaltungskosten.",
    type: "website",
    url: "https://newlifevietnam.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – NewLife Vietnam",
    description: "Häufige Fragen zu Immobilien in Vietnam",
  },
  alternates: {
    canonical: "https://newlifevietnam.com/faq",
  },
};

// FAQ-Daten für Schema.org (gleiche Daten wie vietnamFAQs)
const faqSchemaData = vietnamFAQs.map((faq) => ({
  question: faq.question,
  answer: faq.answer,
}));

export default function FAQPage() {
  return (
    <>
      {/* SEO: FAQ Schema für Rich Snippets */}
      <FAQSchema faqs={faqSchemaData} />

      <div className="pt-24">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
              FAQ
            </span>
            <h1 className="mt-4 font-serif text-4xl font-light text-[--text] md:text-5xl">
              Häufige <span className="italic text-[--primary]">Fragen</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[--muted]">
              Alles was Sie über Immobilien und das Leben in Vietnam wissen
              müssen – von Mietverträgen bis hin zu Visa-Fragen.
            </p>
          </div>

          {/* Divider */}
          <div className="mx-auto my-12 max-w-xs">
            <div className="divider-gold" />
          </div>

          {/* FAQ Accordion */}
          <div className="border border-[--glass-border] bg-[--card] p-6 md:p-8">
            <FAQAccordion items={vietnamFAQs} />
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <p className="text-[--muted]">
              Ihre Frage war nicht dabei? Wir helfen Ihnen gerne weiter.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/immobilien/kontakt"
                className="inline-flex items-center justify-center border border-[--primary] bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-[--primary] transition-all hover:bg-[--primary] hover:text-[--bg]"
              >
                Kontakt aufnehmen
              </Link>
              <a
                href="https://wa.me/84832114684?text=Hallo,%20ich%20habe%20eine%20Frage%20zu%20Vietnam."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[--glass-border] bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-[--text] transition-all hover:border-[--primary]/50 hover:text-[--primary]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
