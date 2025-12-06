"use client";

import { CONTACT_LINKS, WhatsAppIcon, LineIcon, ZaloIcon } from "./contact-buttons";
import { trackEvent } from "@/components/analytics/analytics-tracker";

interface PropertyContactCTAProps {
  propertyTitle: string;
  slug: string;
  propertyId?: string;
}

export function PropertyContactCTA({ propertyTitle, slug, propertyId }: PropertyContactCTAProps) {
  const message = `Guten Tag, ich interessiere mich für "${propertyTitle}" (${slug}). Können Sie mir weitere Informationen zusenden?`;
  const whatsappHref = `${CONTACT_LINKS.whatsapp}?text=${encodeURIComponent(message)}`;

  const handleClick = (type: string) => {
    trackEvent(`${type}_click`, propertyId);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("whatsapp")}
        className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] active:scale-95"
      >
        <WhatsAppIcon className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a
        href={CONTACT_LINKS.line}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("line")}
        className="inline-flex items-center gap-2 bg-[#00B900] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#00A000] active:scale-95"
      >
        <LineIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Line</span>
      </a>
      <a
        href={CONTACT_LINKS.zalo}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("zalo")}
        className="inline-flex items-center gap-2 bg-[#0068FF] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#0058DD] active:scale-95"
      >
        <ZaloIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Zalo</span>
      </a>
    </div>
  );
}
