import { z } from "zod";

// ============================================
// AUTH VALIDATIONS
// ============================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail ist erforderlich")
    .email("Ungültige E-Mail-Adresse"),
  password: z
    .string()
    .min(1, "Passwort ist erforderlich")
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
});

// ============================================
// PROPERTY VALIDATIONS
// ============================================

export const propertyTypeEnum = z.enum([
  "private_residence",
  "apartment",
  "house",
  "commercial",
]);

export const propertyStatusEnum = z.enum([
  "available",
  "reserved",
  "rented",
  "sold",
  "archived",
]);

export const listingTypeEnum = z.enum([
  "rent",
  "buy",
]);

export const createPropertySchema = z.object({
  title: z
    .string()
    .min(1, "Titel ist erforderlich")
    .max(200, "Titel darf maximal 200 Zeichen lang sein"),
  description: z
    .string()
    .min(1, "Beschreibung ist erforderlich")
    .max(5000, "Beschreibung darf maximal 5000 Zeichen lang sein"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten")
    .optional(),
  city: z
    .string()
    .min(1, "Stadt ist erforderlich")
    .max(100, "Stadtname darf maximal 100 Zeichen lang sein"),
  country: z.string().max(100).default("Vietnam"),
  address: z.string().max(500).optional().nullable(),
  
  // Listing Type: Mieten oder Kaufen
  listingType: listingTypeEnum.default("rent"),
  
  // Neue Preisfelder
  priceEUR: z
    .number()
    .int("Preis muss eine ganze Zahl sein")
    .nonnegative("Preis darf nicht negativ sein")
    .max(100000000, "Preis zu hoch"),
  priceVND: z
    .number()
    .int("Preis muss eine ganze Zahl sein")
    .nonnegative("Preis darf nicht negativ sein")
    .max(2000000000, "Preis zu hoch")
    .optional()
    .default(0),
    
  // Legacy (optional für Rückwärtskompatibilität)
  price: z.number().int().optional().default(0),
  currency: z.enum(["USD", "EUR"]).default("EUR"),
  
  status: propertyStatusEnum.default("available"),
  type: propertyTypeEnum,
  recommended: z.boolean().default(false),
  area: z.number().int().positive().max(100000).optional().nullable(),
  bedrooms: z.number().int().min(0).max(100).optional().nullable(),
  bathrooms: z.number().int().min(0).max(100).optional().nullable(),
  amenities: z.array(z.string().max(100)).max(50).default([]),
  images: z.array(z.string()).max(50).default([]),
  popularity: z.number().int().min(0).default(0),
});

export const updatePropertySchema = createPropertySchema.partial().extend({
  // Alle Felder optional für Updates
});

// ============================================
// CITY VALIDATIONS
// ============================================

export const createCitySchema = z.object({
  name: z
    .string()
    .min(1, "Stadtname ist erforderlich")
    .max(100, "Stadtname darf maximal 100 Zeichen lang sein")
    .transform((val) => val.trim()),
  country: z.string().max(100).default("Vietnam"),
});

export const updateCitySchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .transform((val) => val.trim())
    .optional(),
  country: z
    .string()
    .max(100)
    .transform((val) => val.trim())
    .optional(),
});

// ============================================
// CONTACT FORM VALIDATIONS
// ============================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name ist erforderlich")
    .max(100, "Name darf maximal 100 Zeichen lang sein")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "E-Mail ist erforderlich")
    .email("Ungültige E-Mail-Adresse")
    .max(200, "E-Mail darf maximal 200 Zeichen lang sein")
    .transform((val) => val.trim()),
  phone: z
    .string()
    .max(30, "Telefonnummer darf maximal 30 Zeichen lang sein")
    .regex(
      /^$|^[+]?[\d\s\-().]{7,30}$/,
      "Ungültige Telefonnummer"
    )
    .optional()
    .nullable()
    .transform((val) => val?.trim() || null),
  message: z
    .string()
    .min(10, "Nachricht muss mindestens 10 Zeichen lang sein")
    .max(5000, "Nachricht darf maximal 5000 Zeichen lang sein")
    .transform((val) => val.trim()),
  propertyId: z.string().optional().nullable(),
  privacy: z.literal(true, {
    message: "Bitte akzeptieren Sie die Datenschutzerklärung",
  }),
  // Honeypot-Feld: Wird im API-Handler geprüft (nicht hier, damit Bot Fake-Success bekommt)
  website: z.string().optional(),
});

// ============================================
// CONTACT INQUIRY ADMIN VALIDATIONS
// ============================================

export const updateInquirySchema = z.object({
  read: z.boolean(),
});

// ============================================
// ADMIN USER VALIDATIONS
// ============================================

export const createAdminSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail ist erforderlich")
    .email("Ungültige E-Mail-Adresse")
    .max(200, "E-Mail darf maximal 200 Zeichen lang sein")
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .max(100, "Passwort darf maximal 100 Zeichen lang sein"),
  name: z
    .string()
    .max(100, "Name darf maximal 100 Zeichen lang sein")
    .transform((val) => val.trim())
    .optional()
    .nullable(),
});

export const updateAdminSchema = z.object({
  email: z
    .string()
    .email("Ungültige E-Mail-Adresse")
    .max(200)
    .transform((val) => val.trim().toLowerCase())
    .optional(),
  name: z
    .string()
    .max(100)
    .transform((val) => val.trim())
    .optional()
    .nullable(),
});

// ============================================
// ANALYTICS VALIDATIONS
// ============================================

// CUID Regex Pattern (Prisma default IDs)
const cuidRegex = /^c[a-z0-9]{24,}$/i;

export const createSessionSchema = z.object({
  referrer: z.string().url().optional().nullable(),
});

export const createPageviewSchema = z.object({
  sessionId: z
    .string()
    .min(1, "Session ID ist erforderlich")
    .regex(cuidRegex, "Ungültige Session ID"),
  path: z
    .string()
    .min(1, "Pfad ist erforderlich")
    .max(2000, "Pfad zu lang")
    .regex(/^\//, "Pfad muss mit / beginnen"),
});

export const createEventSchema = z.object({
  sessionId: z
    .string()
    .regex(cuidRegex, "Ungültige Session ID")
    .optional()
    .nullable(),
  eventType: z
    .string()
    .min(1, "Event-Typ ist erforderlich")
    .max(100, "Event-Typ zu lang"),
  propertyId: z.string().optional().nullable(),
});

export const endSessionSchema = z.object({
  sessionId: z
    .string()
    .min(1, "Session ID ist erforderlich")
    .regex(cuidRegex, "Ungültige Session ID"),
});

// ============================================
// HELPER: Validation Result Type
// ============================================

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: z.ZodError };

/**
 * Schema validieren und typisiertes Ergebnis zurückgeben
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Zod-Fehler in lesbare Fehlermeldungen umwandeln
 */
export function formatZodErrors(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}

