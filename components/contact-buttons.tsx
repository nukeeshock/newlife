"use client";

import { trackEvent } from "@/components/analytics/analytics-tracker";

// Kontaktdaten zentral definiert
export const CONTACT_LINKS = {
  whatsapp: "https://wa.me/84832114684",
  line: "https://line.me/ti/p/JUBHZJdgBg",
  zalo: "https://zaloapp.com/qr/p/qc1vj9pyvb78",
  email: "mailto:contact@newlifevietnam.de",
};

// Email Icon SVG - Elegant envelope
export function EmailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v.217l7 4.2 7-4.2V5H5zm14 2.383l-7 4.2-7-4.2V19h14V7.383z" />
    </svg>
  );
}

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

// Zalo Icon SVG - Speech bubble with Z
export function ZaloIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Speech bubble shape */}
      <path d="M12 2C6.48 2 2 5.92 2 10.68c0 2.72 1.46 5.14 3.74 6.7-.1.95-.54 2.47-1.27 3.68-.14.24.08.52.35.44 1.72-.48 3.58-1.26 4.86-2.1.73.14 1.5.22 2.32.22 5.52 0 10-3.92 10-8.76S17.52 2 12 2z" />
      {/* Bold Z letterform */}
      <path
        d="M8 7.2h8v1.6h-5.4l5.4 5.2v1.8H8v-1.6h5.4L8 9V7.2z"
        fill="white"
      />
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
  type: "whatsapp" | "line" | "zalo" | "email";
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
    email: {
      icon: EmailIcon,
      label: "E-Mail",
      color: "bg-[#38BDF8] hover:bg-[#7DD3FC]",
      baseUrl: CONTACT_LINKS.email,
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
