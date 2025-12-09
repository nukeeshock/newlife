import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AdminBar } from "@/components/admin/admin-bar";
import { AdminProvider } from "@/lib/context/admin-context";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { SentryInit } from "@/components/sentry-init";
import { CookieBanner } from "@/components/cookie-banner";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newlifevietnam.com"),
  title: {
    default: "NewLife Vietnam - Immobilien & Co-Living in Vietnam",
    template: "%s | NewLife Vietnam",
  },
  description:
    "NLV Real Estate für exklusive Immobilien und Best Ager Residences für Co-Living in Da Nang, Hoi An und Ho Chi Minh City.",
  keywords: [
    "Immobilien Vietnam",
    "Co-Living Vietnam",
    "Da Nang Apartment",
    "Hoi An Villa",
    "Ho Chi Minh Wohnung",
    "Auswandern Vietnam",
    "Expat Vietnam",
    "Senioren Vietnam",
  ],
  authors: [{ name: "NewLife Vietnam" }],
  creator: "NewLife Vietnam",
  publisher: "NewLife Vietnam",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://newlifevietnam.com",
    siteName: "NewLife Vietnam",
    title: "NewLife Vietnam - Immobilien & Co-Living in Vietnam",
    description:
      "NLV Real Estate und Best Ager Residences - Ihr Partner in Vietnam.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NewLife Vietnam Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NewLife Vietnam",
    description: "Immobilien & Co-Living in Vietnam",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        <AdminProvider>
          <OrganizationSchema />
          <WebSiteSchema />
          <SentryInit />
          <AnalyticsTracker />
          {children}
          <AdminBar />
          <CookieBanner />
        </AdminProvider>
      </body>
    </html>
  );
}
