import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
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
  allowedDevOrigins: ["http://192.168.0.92:3000"],
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

  // Tunnel Route für Ad-Blocker-Umgehung (optional)
  // tunnelRoute: "/monitoring",

  // Tree-shaking für kleinere Bundles (in Produktion aktivieren)
  disableLogger: process.env.NODE_ENV === "production",

  // Source Maps nur in Produktion hochladen
  hideSourceMaps: true,
});
