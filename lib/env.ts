import { z } from "zod";

/**
 * Type-Safe Environment Variables
 *
 * Diese Datei validiert alle Environment Variables beim App-Start.
 * Bei fehlenden oder ungültigen Werten wird ein klarer Fehler geworfen,
 * anstatt später zur Runtime zu crashen.
 *
 * VERWENDUNG:
 * import { env } from "@/lib/env";
 * const secret = env.JWT_SECRET;
 */

// ============================================
// SERVER-SIDE ENVIRONMENT VARIABLES
// ============================================

const serverSchema = z.object({
  // Auth (REQUIRED)
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET muss mindestens 32 Zeichen lang sein"),

  // Database (handled by Prisma, aber hier für Vollständigkeit)
  DATABASE_URL: z.string().url("DATABASE_URL muss eine gültige URL sein"),

  // Upstash Redis (REQUIRED for Rate Limiting)
  KV_REST_API_URL: z
    .string()
    .url("KV_REST_API_URL muss eine gültige URL sein"),
  KV_REST_API_TOKEN: z
    .string()
    .min(1, "KV_REST_API_TOKEN ist erforderlich"),

  // Analytics
  ANALYTICS_SALT: z
    .string()
    .min(1, "ANALYTICS_SALT ist erforderlich für DSGVO-konforme IP-Hashing")
    .optional()
    .transform((val) => val ?? "default-dev-salt"),

  // Vercel Blob (optional, nur für Uploads)
  BLOB_READ_WRITE_TOKEN: z.string().optional(),

  // Sentry (optional)
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Node Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// ============================================
// CLIENT-SIDE ENVIRONMENT VARIABLES
// ============================================

const clientSchema = z.object({
  // Sentry (optional)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

// ============================================
// VALIDATION & EXPORT
// ============================================

type ServerEnv = z.infer<typeof serverSchema>;
type ClientEnv = z.infer<typeof clientSchema>;

/**
 * Validiert Server-side Environment Variables
 * Wird nur einmal beim Module Load ausgeführt
 */
function validateServerEnv(): ServerEnv {
  // Skip validation during build in some edge cases
  if (typeof window !== "undefined") {
    throw new Error("Server env darf nicht im Browser verwendet werden!");
  }

  const parsed = serverSchema.safeParse({
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    ANALYTICS_SALT: process.env.ANALYTICS_SALT,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const errorMessages = Object.entries(errors)
      .map(([key, msgs]) => `  ${key}: ${msgs?.join(", ")}`)
      .join("\n");

    throw new Error(
      `❌ Environment Variable Validation fehlgeschlagen:\n${errorMessages}\n\n` +
        "Bitte prüfe deine .env Datei."
    );
  }

  return parsed.data;
}

/**
 * Validiert Client-side Environment Variables
 */
function validateClientEnv(): ClientEnv {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });

  if (!parsed.success) {
    console.warn(
      "[ENV] Client env validation warning:",
      parsed.error.flatten().fieldErrors
    );
    return { NEXT_PUBLIC_SENTRY_DSN: undefined };
  }

  return parsed.data;
}

// ============================================
// EXPORTS
// ============================================

/**
 * Server-side environment variables (type-safe)
 *
 * WICHTIG: Nur in Server Components, API Routes oder lib/ verwenden!
 */
export const env: ServerEnv = validateServerEnv();

/**
 * Client-side environment variables (type-safe)
 *
 * Nur NEXT_PUBLIC_* Variablen sind hier verfügbar.
 */
export const clientEnv: ClientEnv = validateClientEnv();

/**
 * Helper: Prüft ob wir in Production sind
 */
export const isProduction = env.NODE_ENV === "production";

/**
 * Helper: Prüft ob wir in Development sind
 */
export const isDevelopment = env.NODE_ENV === "development";
