import "dotenv/config";
import { PrismaClient, PropertyStatus, PropertyType } from "@prisma/client";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================
  // SICHERHEIT: Alle sensiblen Daten aus .env!
  // ============================================
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Admin";

  if (!adminEmail || !adminPassword) {
    console.error("❌ FATAL: ADMIN_EMAIL und ADMIN_PASSWORD müssen in .env gesetzt sein!");
    console.error("Beispiel:");
    console.error("  ADMIN_EMAIL=admin@example.com");
    console.error("  ADMIN_PASSWORD=sicheres-passwort-min-12-zeichen");
    process.exit(1);
  }

  if (adminPassword.length < 12) {
    console.error("❌ FATAL: ADMIN_PASSWORD muss mindestens 12 Zeichen lang sein!");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, BCRYPT_ROUNDS);
  console.log("🔐 Passwort gehasht");

  // Admin erstellen
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: adminName,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
    },
  });
  console.log("✅ Admin erstellt:", admin.email);

  // Beispiel-Städte erstellen
  const cities = ["Da Nang", "Ho Chi Minh City", "Hoi An", "Hanoi", "Nha Trang"];
  for (const cityName of cities) {
    await prisma.city.upsert({
      where: { name: cityName },
      update: {},
      create: {
        name: cityName,
        country: "Vietnam",
      },
    });
  }
  console.log("✅ Städte erstellt:", cities.join(", "));

  // Beispiel-Properties erstellen
  const properties = [
    {
      slug: "lakeside-villa-son-tra",
      title: "Lakeside Villa Son Tra",
      description:
        "Zeitlose Villa mit offenem Grundriss, bodentiefen Fenstern und Blick auf die Bucht von Da Nang. Möbliert, inkl. Housekeeping-Option.",
      city: "Da Nang",
      address: "Vo Nguyen Giap 18",
      price: 36000,
      status: PropertyStatus.available,
      type: PropertyType.house,
      recommended: true,
      popularity: 1,
      area: 420,
      bedrooms: 5,
      bathrooms: 4,
      amenities: ["Seeterrasse", "Home Spa", "Garage für 3 Fahrzeuge", "Wöchentliche Reinigung inklusive"],
      images: ["/da-nang.jpg", "/da-nang.jpg", "/da-nang.jpg"],
    },
    {
      slug: "skyline-apartment-saigon",
      title: "Skyline Apartment Saigon",
      description:
        "Penthouse mit umlaufender Terrasse, Concierge-Service und Blick über Saigon River. Maßgefertigte Küche, integriertes Lichtkonzept.",
      city: "Ho Chi Minh City",
      address: "Nguyen Hue 22",
      price: 26400,
      status: PropertyStatus.reserved,
      type: PropertyType.apartment,
      recommended: true,
      popularity: 2,
      area: 210,
      bedrooms: 3,
      bathrooms: 3,
      amenities: ["Concierge", "Terrasse", "Privater Stellplatz", "Wöchentliche Reinigung inklusive"],
      images: ["/da-nang.jpg", "/da-nang.jpg", "/da-nang.jpg"],
    },
    {
      slug: "courtyard-residence-hoi-an",
      title: "Courtyard Residence Hoi An",
      description:
        "Innenhof-Residenz nahe Altstadt Hoi An. Ruhiger Garten, hohe Decken, Atelier-Licht, ideal für längere Aufenthalte.",
      city: "Hoi An",
      address: "Tran Hung Dao 10",
      price: 42000,
      status: PropertyStatus.available,
      type: PropertyType.private_residence,
      recommended: true,
      popularity: 3,
      area: 380,
      bedrooms: 5,
      bathrooms: 3,
      amenities: ["Garteninnenhof", "Weinkeller", "Kamin", "Wöchentliche Reinigung inklusive"],
      images: ["/da-nang.jpg", "/da-nang.jpg", "/da-nang.jpg"],
    },
    {
      slug: "marina-penthouse-da-nang",
      title: "Marina Penthouse Da Nang",
      description:
        "Top-floor Penthouse mit Doppel-Loggia und Blick über den Hafen von Da Nang. Offene Küche, integrierter Kamin, Abendlicht von Westen.",
      city: "Da Nang",
      address: "Truong Sa 15",
      price: 34800,
      status: PropertyStatus.available,
      type: PropertyType.apartment,
      recommended: true,
      popularity: 4,
      area: 240,
      bedrooms: 3,
      bathrooms: 3,
      amenities: ["Doppelterrasse", "Kamin", "Hafenblick", "Wöchentliche Reinigung inklusive"],
      images: ["/da-nang.jpg", "/da-nang.jpg", "/da-nang.jpg"],
    },
    {
      slug: "boutique-office-d1",
      title: "Boutique Office District 1",
      description:
        "Repräsentative Gewerbefläche mit 5,5m Decken im District 1. Große Fensterfront, flexible Raumteilung für Studio/Showroom.",
      city: "Ho Chi Minh City",
      address: "Le Loi 5",
      price: 48000,
      status: PropertyStatus.available,
      type: PropertyType.commercial,
      recommended: false,
      popularity: 6,
      area: 280,
      amenities: ["Hohe Decken", "Eckeinheit", "Premium-Lage", "Wöchentliche Reinigung inklusive"],
      images: ["/da-nang.jpg", "/da-nang.jpg", "/da-nang.jpg"],
    },
  ];

  for (const property of properties) {
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: property,
      create: property,
    });
    console.log("✅ Property erstellt:", property.title);
  }

  console.log("🎉 Seeding abgeschlossen!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
