/**
 * Formatiert einen Preis in Euro
 */
export function formatPriceEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatiert einen Preis in Vietnamesischen Dong
 */
export function formatPriceVND(value: number | bigint): string {
  const numValue = typeof value === "bigint" ? Number(value) : value;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(numValue);
}

/**
 * Formatiert den Listing-Typ
 */
export function formatListingType(type: string): string {
  const map: Record<string, string> = {
    rent: "Mieten",
    buy: "Kaufen",
  };
  return map[type] ?? type;
}

/**
 * Gibt das Preis-Label zurück (Monatsmiete vs Kaufpreis)
 */
export function getPriceLabel(listingType: string): string {
  return listingType === "buy" ? "Kaufpreis" : "Monatsmiete";
}

export function formatStatus(status: string): string {
  const map: Record<string, string> = {
    available: "Verfügbar",
    reserved: "Reserviert",
    rented: "Vermietet",
    sold: "Verkauft",
    archived: "Archiviert",
  };
  return map[status] ?? status;
}

/**
 * Status-Badge Tone Mapping für UI-Komponenten
 */
export type BadgeTone = "success" | "warning" | "info" | "muted";

export function getStatusTone(status: string): BadgeTone {
  const map: Record<string, BadgeTone> = {
    available: "success",
    reserved: "warning",
    rented: "info",
    sold: "info",
    archived: "muted",
  };
  return map[status] ?? "muted";
}

export function formatType(type: string): string {
  const map: Record<string, string> = {
    private_residence: "Residenz",
    apartment: "Apartment",
    house: "Villa",
    commercial: "Gewerbefläche",
  };
  return map[type] ?? type;
}

/**
 * Konvertiert EUR zu VND (ungefährer Wechselkurs)
 * Aktueller Kurs: ~30,700 VND = 1 EUR (Stand: Dezember 2024)
 * TODO: Move this to an environment variable or fetch dynamically
 */
export const VND_EUR_RATE = 30700;

export function eurToVnd(eur: number): bigint {
  return BigInt(Math.round(eur * VND_EUR_RATE));
}

/**
 * Konvertiert VND zu EUR (ungefährer Wechselkurs)
 */
export function vndToEur(vnd: number | bigint): number {
  const numValue = typeof vnd === "bigint" ? Number(vnd) : vnd;
  return Math.round(numValue / VND_EUR_RATE);
}
