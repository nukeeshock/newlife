/**
 * BigInt zu Number konvertieren für JSON-Serialisierung
 * Prisma verwendet BigInt für große Zahlen, JSON unterstützt das nicht
 */
export function serializeBigInt<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}
