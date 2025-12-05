import Link from "next/link";
import { ReactNode } from "react";

interface GatewaySectionProps {
  href: string;
  theme: "orange" | "gold";
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  backgroundImage: string;
}

export function GatewaySection({
  href,
  theme,
  title,
  subtitle,
  description,
  icon,
  backgroundImage,
}: GatewaySectionProps) {
  const accentColor = theme === "orange" ? "#ea580c" : "#c9a962";

  return (
    <Link
      href={href}
      className="group relative flex flex-1 flex-col items-center justify-center p-8 lg:p-16"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-zinc-950/40 transition-colors duration-500 group-hover:bg-zinc-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        {/* Icon */}
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ color: accentColor }}
        >
          {icon}
        </div>

        {/* Title */}
        <h2 className="font-serif text-4xl font-light text-white lg:text-5xl">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-lg text-zinc-100">{subtitle}</p>

        {/* Description */}
        <p className="mt-4 text-sm text-zinc-200">{description}</p>

        {/* CTA Arrow */}
        <div
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium tracking-wide"
          style={{ color: accentColor }}
        >
          <span>Entdecken</span>
          <svg
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
