import { buttonClasses } from "./ui/button";

interface WhatsAppCTAProps {
  propertyTitle: string;
  slug: string;
}

export function WhatsAppCTA({ propertyTitle, slug }: WhatsAppCTAProps) {
  const text = encodeURIComponent(
    `Guten Tag, ich interessiere mich für "${propertyTitle}" (${slug}). Können Sie mir weitere Informationen zusenden?`,
  );
  const href = `https://wa.me/4915112345678?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses({
        variant: "primary",
        className: "px-6 py-3",
      })}
    >
      WhatsApp Anfrage
    </a>
  );
}
