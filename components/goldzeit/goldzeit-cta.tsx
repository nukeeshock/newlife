import Link from "next/link";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "@/components/contact-buttons";

const messengerButtons = [
  { href: CONTACT_LINKS.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp", bg: "#25D366" },
  { href: CONTACT_LINKS.line, Icon: LineIcon, label: "Line", bg: "#00B900" },
  { href: CONTACT_LINKS.zalo, Icon: ZaloIcon, label: "Zalo", bg: "#0068FF" },
];

export function GoldzeitCta() {
  return (
    <section className="bg-[--bg] py-24">
      <div className="container mx-auto max-w-xl px-6 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="animate-fadeInUp opacity-0-initial mb-2 font-serif text-3xl font-light text-[--text]">
            Interesse geweckt?
          </h2>
          <p className="animate-fadeInUp delay-100 opacity-0-initial text-[--muted]">
            Fordern Sie unverbindlich das Expose an.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/goldzeit/kontakt"
            className="animate-fadeInUp delay-200 opacity-0-initial flex w-full items-center justify-center gap-3 bg-[--primary] py-4 font-bold text-white transition-all duration-300 hover:bg-[--primary-hover] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Kostenlose Beratung anfordern
          </Link>

          {/* Messenger Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {messengerButtons.map((btn, i) => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-fadeInUp opacity-0-initial flex flex-col items-center justify-center gap-2 py-4 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                style={{
                  backgroundColor: btn.bg,
                  animationDelay: `${300 + i * 100}ms`,
                }}
              >
                <btn.Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{btn.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
