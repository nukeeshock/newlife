import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry Build Options
  org: "newlife-vietnam",
  project: "newlife",

  // Upload Source Maps (optional, für bessere Stack Traces)
  silent: !process.env.CI, // Nur in CI loggen

  // Automatisch Releases erstellen
  widenClientFileUpload: true,

  // Tunnel Route für Ad-Blocker-Umgehung
  tunnelRoute: "/monitoring",

  // Tree-shaking für kleinere Bundles (in Produktion aktivieren)
  disableLogger: process.env.NODE_ENV === "production",

  // Source Maps Konfiguration
  sourcemaps: {
    disable: false,
  },
});
