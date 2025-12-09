"use client";

import Link from "next/link";
import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon, EmailIcon } from "@/components/contact-buttons";

const contactButtons = [
  { href: CONTACT_LINKS.whatsapp, Icon: WhatsAppIcon, label: "WhatsApp", bg: "#25D366" },
  { href: CONTACT_LINKS.line, Icon: LineIcon, label: "Line", bg: "#00B900" },
  { href: CONTACT_LINKS.zalo, Icon: ZaloIcon, label: "Zalo", bg: "#0068FF" },
  { href: CONTACT_LINKS.email, Icon: EmailIcon, label: "E-Mail", bg: "#38BDF8" },
];

export function BestAgerCta() {
  return (
    <section className="bg-[--bg] py-24">
      <div className="container mx-auto max-w-xl px-6 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="animate-fadeInUp opacity-0-initial mb-2 font-serif text-3xl font-light text-[--text]">
            Interesse geweckt?
          </h2>
          <p className="animate-fadeInUp delay-100 opacity-0-initial text-[--muted]">
            Vereinbaren Sie ein unverbindliches Gespräch.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/best-ager-residences/kontakt"
            className="animate-fadeInUp delay-200 opacity-0-initial flex w-full items-center justify-center gap-3 bg-[--primary] py-4 font-bold text-white transition-all duration-300 hover:bg-[--primary-hover] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Kostenlose Beratung anfordern
          </Link>

          {/* Contact Buttons - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            {contactButtons.map((btn, i) => (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.label === "E-Mail" ? undefined : "_blank"}
                rel={btn.label === "E-Mail" ? undefined : "noopener noreferrer"}
                className="animate-fadeInUp opacity-0-initial flex items-center justify-center gap-2.5 py-4 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.97]"
                style={{
                  backgroundColor: btn.bg,
                  animationDelay: `${300 + i * 80}ms`,
                }}
              >
                <btn.Icon className="h-5 w-5" />
                <span className="text-sm font-semibold">{btn.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
