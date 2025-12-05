import { GatewaySection } from "./gateway-section";

export function GatewayPage() {
  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Left: Goldzeit Living */}
      <GatewaySection
        href="/goldzeit"
        theme="orange"
        title="NLV Goldzeit Living"
        subtitle="Gemeinsam leben in Vietnam"
        description="Pool-Villen, Gemeinschaft, Vollpension - Das Co-Living Konzept für Best Ager"
        backgroundImage="/gateway-goldzeit.jpg"
        icon={
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        }
      />

      {/* Center Divider with Logo */}
      <div className="relative z-20 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm lg:flex-col">
        {/* Horizontal line (mobile) / Vertical line (desktop) */}
        <div className="h-px w-full bg-white/10 lg:h-full lg:w-px" />

        {/* Logo Container */}
        <div className="absolute flex flex-col items-center bg-zinc-950 px-6 py-4 lg:px-4 lg:py-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]">
            New Life
          </span>
          <span className="font-serif text-lg font-light tracking-wide text-white">
            Vietnam
          </span>
        </div>
      </div>

      {/* Right: Real Estate */}
      <GatewaySection
        href="/immobilien"
        theme="gold"
        title="NLV Real Estate"
        subtitle="Exklusive Immobilien in Vietnam"
        description="Villen, Apartments, Residenzen - Ihr Traumhaus in Da Nang, Hoi An & Ho Chi Minh"
        backgroundImage="/gateway-realestate.jpg"
        icon={
          <svg
            className="h-12 w-12"
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
        }
      />
    </div>
  );
}
