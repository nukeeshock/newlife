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
 * Legacy: Formatiert einen Preis in EUR oder USD
 * @deprecated Use formatPriceEUR or formatPriceVND instead
 */
export function formatPrice(value: number, currency?: string): string {
  // Default to EUR, validate currency string
  const validCurrency = currency === "USD" ? "USD" : "EUR";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: validCurrency,
    maximumFractionDigits: 0,
  }).format(value);
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

export function formatType(type: string): string {
  const map: Record<string, string> = {
    private_residence: "Residenz",
    apartment: "Apartment",
    house: "Villa",
    commercial: "Gewerbefläche",
  };
  return map[type] ?? type;
}

export function formatTypePlural(type: string): string {
  const map: Record<string, string> = {
    private_residence: "Private Residenzen",
    apartment: "Apartments",
    house: "Villen",
    commercial: "Gewerbeflächen",
  };
  return map[type] ?? type;
}

/**
 * Konvertiert EUR zu VND (ungefährer Wechselkurs)
 * Aktueller Kurs: ~26,500 VND = 1 EUR
 */
export function eurToVnd(eur: number): bigint {
  const rate = 26500;
  return BigInt(Math.round(eur * rate));
}

/**
 * Konvertiert VND zu EUR (ungefährer Wechselkurs)
 */
export function vndToEur(vnd: number | bigint): number {
  const rate = 26500;
  const numValue = typeof vnd === "bigint" ? Number(vnd) : vnd;
  return Math.round(numValue / rate);
}
