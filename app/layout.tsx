import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
    default: "NEW LIFE VIETNAM – Exklusive Immobilien in Vietnam",
    template: "%s | NEW LIFE VIETNAM",
  },
  description:
    "Handverlesene Luxus-Mietobjekte in Da Nang, Hoi An und Ho Chi Minh City. Ihr persönlicher Concierge für ein neues Leben in Vietnam.",
  keywords: [
    "Immobilien Vietnam",
    "Luxus Miete Vietnam",
    "Da Nang Apartment",
    "Hoi An Villa",
    "Ho Chi Minh Wohnung",
    "Auswandern Vietnam",
    "Expat Vietnam",
  ],
  authors: [{ name: "NEW LIFE VIETNAM" }],
  creator: "NEW LIFE VIETNAM",
  publisher: "NEW LIFE VIETNAM",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://newlifevietnam.com",
    siteName: "NEW LIFE VIETNAM",
    title: "NEW LIFE VIETNAM – Exklusive Immobilien in Vietnam",
    description:
      "Handverlesene Luxus-Mietobjekte in Da Nang, Hoi An und Ho Chi Minh City.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEW LIFE VIETNAM",
    description: "Exklusive Immobilien in Vietnam",
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
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16">{children}</main>
            <Footer />
            <AdminBar />
          </div>
          <CookieBanner />
        </AdminProvider>
      </body>
    </html>
  );
}
