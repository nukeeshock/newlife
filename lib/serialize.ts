/**
 * BigInt zu String konvertieren für JSON-Serialisierung (präzisionssicher)
 * Prisma verwendet BigInt für große Zahlen, JSON unterstützt das nicht
 * WICHTIG: Konvertiert zu String statt Number um Präzisionsverlust bei > 2^53 zu vermeiden
 */
export function serializeBigInt<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
