import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://newlifevietnam.com";

  // Gateway (Startseite)
  const gatewayPage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // NLV Goldzeit Living Seiten
  const goldzeitPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/goldzeit`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/goldzeit/konzept`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/goldzeit/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // NLV Real Estate Statische Seiten
  const immobilienStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/immobilien`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/immobilien/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/immobilien/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/immobilien/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/immobilien/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/immobilien/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Property-Type Seiten
  const typePages: MetadataRoute.Sitemap = [
    "private_residence",
    "apartment",
    "house",
    "commercial",
  ].map((type) => ({
    url: `${baseUrl}/immobilien/type/${type}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Staedte-Seiten
  const cities = await prisma.city.findMany({
    select: { name: true },
  });
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/immobilien/stadt/${city.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Einzelne Properties
  const properties = await prisma.property.findMany({
    where: { status: { not: "archived" } },
    select: { slug: true, updatedAt: true },
  });
  const propertyPages: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${baseUrl}/immobilien/property/${property.slug}`,
    lastModified: property.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...gatewayPage,
    ...goldzeitPages,
    ...immobilienStaticPages,
    ...typePages,
    ...cityPages,
    ...propertyPages,
  ];
}
