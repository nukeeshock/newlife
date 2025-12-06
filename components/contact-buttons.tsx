"use client";

import { trackEvent } from "@/components/analytics/analytics-tracker";

// Kontaktdaten zentral definiert
export const CONTACT_LINKS = {
  whatsapp: "https://wa.me/84832114684",
  line: "https://line.me/ti/p/JUBHZJdgBg",
  zalo: "https://zaloapp.com/qr/p/qc1vj9pyvb78",
};

// WhatsApp Icon SVG
export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Line Icon SVG
export function LineIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

// Zalo Icon SVG
export function ZaloIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor">
      <path d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm6.525 32.065c-.195.585-.975 1.065-1.62 1.2-.435.09-.99.165-2.88-.615-2.415-.99-3.975-3.42-4.095-3.585-.12-.15-.99-1.32-.99-2.52s.63-1.785.855-2.025c.195-.21.465-.3.63-.3.15 0 .315 0 .45.015.15.015.345-.06.54.405.195.48.675 1.65.735 1.77.06.12.105.27.015.42-.075.165-.12.255-.24.39-.12.15-.24.33-.345.435-.12.12-.24.255-.105.495.15.24.645 1.065 1.38 1.725.945.855 1.74 1.125 1.995 1.245.24.12.39.105.54-.06.135-.165.6-.705.765-.945.165-.24.33-.195.555-.12.225.09 1.44.675 1.68.795.255.12.42.195.48.285.075.105.075.585-.12 1.17zm-3.72-6.585c-.87-1.065-2.115-1.695-3.525-1.695-2.49 0-4.515 2.025-4.515 4.515 0 .795.21 1.545.57 2.19l-1.26 3.72 3.855-1.23c.615.33 1.32.525 2.07.525h.015c2.49 0 4.515-2.025 4.515-4.515 0-1.41-.615-2.73-1.695-3.615l-.03.105z" />
      <path d="M35.4 12.6H12.6c-1.65 0-3 1.35-3 3v16.8c0 1.65 1.35 3 3 3h22.8c1.65 0 3-1.35 3-3V15.6c0-1.65-1.35-3-3-3zm-19.665 15.3H12.9v-6.75h.885v5.895h1.95v.855zm4.965 0h-.81l-.09-.69c-.39.54-.855.81-1.395.81-.465 0-.825-.165-1.095-.51-.255-.33-.39-.795-.39-1.395v-4.065h.87v3.885c0 .39.075.69.21.885.135.195.345.285.615.285.195 0 .39-.06.57-.195.195-.12.345-.3.45-.51v-4.35h.87v5.85h.195zm4.35-2.295c0 .72-.15 1.29-.465 1.695-.3.405-.735.615-1.29.615-.54 0-.975-.195-1.29-.585l-.06.495h-.795v-8.025h.87v2.79c.315-.375.72-.57 1.215-.57.57 0 1.005.21 1.32.63.315.42.48 1.005.48 1.77v1.185h.015zm4.29 2.295h-.87v-.57c-.315.435-.75.66-1.305.66-.435 0-.78-.135-1.02-.42-.24-.27-.36-.66-.36-1.155 0-.54.165-.975.51-1.29.33-.315.795-.48 1.38-.48.285 0 .555.03.795.105v-.36c0-.36-.075-.615-.225-.78-.15-.165-.39-.24-.72-.24-.375 0-.795.105-1.26.315l-.27-.66c.54-.255 1.08-.375 1.635-.375.585 0 1.02.15 1.32.45.285.3.435.75.435 1.35v3.45h-.045z" />
    </svg>
  );
}

// Animierter Button-Stil
const animatedButtonBase = `
  group relative inline-flex items-center justify-center gap-2
  overflow-hidden transition-all duration-300
  hover:scale-105 active:scale-95
`;

// Pulsierender Hintergrund-Effekt
const pulseEffect = `
  before:absolute before:inset-0 before:bg-white/20
  before:scale-0 before:rounded-full before:transition-transform before:duration-500
  hover:before:scale-150
`;

interface MessengerButtonProps {
  type: "whatsapp" | "line" | "zalo";
  message?: string;
  propertyId?: string;
  variant?: "icon" | "full" | "compact";
  className?: string;
}

export function MessengerButton({
  type,
  message,
  propertyId,
  variant = "full",
  className = "",
}: MessengerButtonProps) {
  const config = {
    whatsapp: {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#20BD5A]",
      baseUrl: CONTACT_LINKS.whatsapp,
    },
    line: {
      icon: LineIcon,
      label: "Line",
      color: "bg-[#00B900] hover:bg-[#00A000]",
      baseUrl: CONTACT_LINKS.line,
    },
    zalo: {
      icon: ZaloIcon,
      label: "Zalo",
      color: "bg-[#0068FF] hover:bg-[#0058DD]",
      baseUrl: CONTACT_LINKS.zalo,
    },
  };

  const { icon: Icon, label, color, baseUrl } = config[type];

  // URL mit optionaler Nachricht (nur WhatsApp unterstützt text param)
  const href =
    type === "whatsapp" && message
      ? `${baseUrl}?text=${encodeURIComponent(message)}`
      : baseUrl;

  const handleClick = () => {
    trackEvent(`${type}_click`, propertyId);
  };

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${animatedButtonBase} ${pulseEffect} ${color} h-12 w-12 rounded-full text-white shadow-lg ${className}`}
        aria-label={label}
      >
        <Icon className="h-6 w-6 relative z-10" />
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${animatedButtonBase} ${color} gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white shadow-md ${className}`}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </a>
    );
  }

  // Full variant
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${animatedButtonBase} ${pulseEffect} ${color} rounded-sm px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg ${className}`}
    >
      <Icon className="h-5 w-5 relative z-10" />
      <span className="relative z-10">{label}</span>
    </a>
  );
}

// Floating Buttons für Property Pages
export function FloatingContactButtons({ propertyId }: { propertyId?: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <MessengerButton type="zalo" variant="icon" propertyId={propertyId} />
      <MessengerButton type="line" variant="icon" propertyId={propertyId} />
      <MessengerButton type="whatsapp" variant="icon" propertyId={propertyId} />
    </div>
  );
}

// Inline Button Group für CTAs
export function ContactButtonGroup({
  message,
  propertyId,
  variant = "full",
  className = "",
}: {
  message?: string;
  propertyId?: string;
  variant?: "icon" | "full" | "compact";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MessengerButton
        type="whatsapp"
        message={message}
        propertyId={propertyId}
        variant={variant}
      />
      <MessengerButton
        type="line"
        propertyId={propertyId}
        variant={variant}
      />
      <MessengerButton
        type="zalo"
        propertyId={propertyId}
        variant={variant}
      />
    </div>
  );
}
