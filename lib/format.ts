export function formatPrice(value: number, currency: "EUR" | "USD") {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export function formatStatus(status: string) {
  const map: Record<string, string> = {
    available: "Verfügbar",
    reserved: "Reserviert",
    rented: "Vermietet",
    archived: "Archiviert",
  };
  return map[status] ?? status;
}

export function formatType(type: string) {
  const map: Record<string, string> = {
    private_residence: "Residenz",
    apartment: "Apartment",
    house: "Villa",
    commercial: "Gewerbefläche",
  };
  return map[type] ?? type;
}

export function formatTypePlural(type: string) {
  const map: Record<string, string> = {
    private_residence: "Private Residenzen",
    apartment: "Apartments",
    house: "Villen",
    commercial: "Gewerbeflächen",
  };
  return map[type] ?? type;
}
