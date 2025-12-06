import Link from "next/link";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "@/components/contact-buttons";

export function GoldzeitCta() {
  return (
    <section className="bg-[--bg] py-24">
      <div className="container mx-auto max-w-xl px-6 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-serif text-3xl font-light text-[--text]">
            Interesse geweckt?
          </h2>
          <p className="text-[--muted]">Fordern Sie unverbindlich das Expose an.</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/goldzeit/kontakt"
            className="flex w-full items-center justify-center gap-3 bg-[--primary] py-4 font-bold text-white transition-all hover:bg-[--primary-hover]"
          >
            Kostenlose Beratung anfordern
          </Link>

          {/* Messenger Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href={CONTACT_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 bg-[#25D366] py-4 text-white transition-all hover:scale-105 hover:bg-[#20BD5A] active:scale-95"
            >
              <WhatsAppIcon className="h-6 w-6" />
              <span className="text-xs font-medium">WhatsApp</span>
            </a>
            <a
              href={CONTACT_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 bg-[#00B900] py-4 text-white transition-all hover:scale-105 hover:bg-[#00A000] active:scale-95"
            >
              <LineIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Line</span>
            </a>
            <a
              href={CONTACT_LINKS.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 bg-[#0068FF] py-4 text-white transition-all hover:scale-105 hover:bg-[#0058DD] active:scale-95"
            >
              <ZaloIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
