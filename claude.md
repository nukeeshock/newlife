# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# NEW LIFE VIETNAM – NLV Real Estate

## Projektübersicht

Eine **Next.js 16** Real Estate Listing-Plattform für Premium-Mietobjekte in Vietnam. Die Website präsentiert Villas, Apartments, Private Residences und Commercial-Flächen in Da Nang, Hoi An und Ho Chi Minh City.

**Zielgruppe**: Wohlhabende Auswanderer (45+ Software Devs, Rentner), die eine "Private Concierge Service"-Erfahrung erwarten.

### Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| Next.js | 16.0.7 | Framework (Turbopack) |
| React | 19.2.1 | UI Library |
| Tailwind CSS | 4 | Styling |
| TypeScript | 5 | Type Safety |
| Prisma | 5.22.0 | ORM |
| PostgreSQL | Neon.tech | Datenbank |
| Vercel Blob | - | Bild-Storage |
| **Upstash Redis** | @upstash/redis, @upstash/ratelimit | **Rate Limiting (Serverless)** |
| Sentry | @sentry/nextjs 10.x | Error Tracking |
| jose | 6.1.3 | JWT |
| bcrypt | 6.0.0 | Passwort-Hashing |
| zod | 4.1.13 | Validierung |
| sharp | 0.34.5 | Bildverarbeitung |
| pnpm | - | Package Manager |

---

## Entwicklung

```bash
pnpm dev          # Starten (Turbopack)
pnpm build        # Build
pnpm lint         # ESLint
pnpm tsc --noEmit # TypeScript Check (ohne Build)
pnpm db:push      # Schema pushen
pnpm db:seed      # Testdaten + Admin (mit bcrypt Hash!)
pnpm db:studio    # Prisma Studio
```

---

## App-Struktur (Route Groups)

```
app/
├── (goldzeit)/      # Goldzeit Living Theme (Orange-Akzente)
│   └── goldzeit/    # /goldzeit/* Seiten
├── (immobilien)/    # NLV Real Estate (Standard Theme)
│   └── immobilien/  # /immobilien/* Seiten
├── admin/           # Admin Dashboard
├── api/             # API Routes
└── login/           # Versteckter Login
```

Route Groups `(goldzeit)` und `(immobilien)` ermöglichen unterschiedliche Layouts/Themes ohne URL-Präfix.

---

## Datenbank Schema (Prisma)

### Models
- **Property**: slug, title, description, city, country, **listingType** (rent/buy), **priceEUR**, **priceVND**, status (available/reserved/rented/sold/archived), type, recommended, area, bedrooms, bathrooms, amenities[], images[], popularity
- **Admin**: email, password (bcrypt gehashed!), name
- **City**: name (unique), country
- **ContactInquiry**: name, email, phone?, message, propertyId?, read (für Admin-Dashboard)
- **RefreshToken**: token (gehashed), adminId, expiresAt, revokedAt?

### Enums
- **ListingType**: `rent` (Mieten), `buy` (Kaufen)
- **PropertyStatus**: `available`, `reserved`, `rented`, `sold`, `archived`
- **PropertyType**: `private_residence`, `apartment`, `house`, `commercial`
- **AnalyticsSession**: startedAt, endedAt, userAgent, ipHash (SHA-256), referrer
- **AnalyticsPageview**: sessionId, path, occurredAt
- **AnalyticsEvent**: sessionId, eventType ("whatsapp_click"), propertyId, occurredAt

---

## Authentication System

### JWT-basierte Auth (lib/auth.ts)
- **Access Token**: 15 Min Gültigkeit (HTTP-only Cookie `nlv_access`)
- **Refresh Token**: 7 Tage Gültigkeit (HTTP-only Cookie `nlv_refresh`)
- Automatisches Token-Renewal über `/api/auth/check` und `/api/auth/refresh`
- **bcrypt** mit 12 Rounds für Passwort-Hashing

### Token Rotation (Security!)
Beim Token-Refresh wird der alte Token **revoked** und ein neuer erstellt:
```typescript
// In /api/auth/refresh und /api/auth/check:
// 1. Alten Token revoken
await prisma.refreshToken.update({
  where: { token: tokenHash },
  data: { revokedAt: new Date() },
});
// 2. Neuen Token in DB speichern
await prisma.refreshToken.create({
  data: { token: newTokenHash, adminId, expiresAt },
});
```
**Warum?** Ohne Rotation könnte ein gestohlenes Token ewig genutzt werden.

### Admin Middleware (lib/middleware/admin-auth.ts)
```typescript
import { withAdminAuth } from "@/lib/middleware/admin-auth";
export const POST = withAdminAuth(handler);
```

---

## Rate Limiting (lib/rate-limit.ts)

### Upstash Redis (Serverless-kompatibel!)

**WICHTIG**: Rate Limiting nutzt Upstash Redis, NICHT In-Memory!

```typescript
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
```

**Warum Redis statt In-Memory?**
```
In-Memory auf Vercel (Serverless):
Request 1 → Server A (count=1)
Request 2 → Server B (count=1)  ← Neuer Server, weiß nichts!
→ Rate Limit funktioniert NIE

Mit Redis:
Request 1 → Server A → Redis (count=1)
Request 2 → Server B → Redis (count=2)  ← Gleiche DB!
→ Funktioniert!
```

### Konfigurierte Limits (RATE_LIMITS)
| Name | Limit | Zeitfenster | Prefix |
|------|-------|-------------|--------|
| `login` | 5 | 60s | `ratelimit:login:` |
| `upload` | 10 | 60s | `ratelimit:upload:` |
| `analytics` | 100 | 60s | `ratelimit:analytics:` |
| `api` | 60 | 60s | `ratelimit:api:` |
| `contact` | 5 | 3600s (1h) | `ratelimit:contact:` |

### Verwendung in API Routes (ASYNC!)
```typescript
import { checkRateLimit, RATE_LIMITS, rateLimitExceededResponse } from "@/lib/rate-limit";

// WICHTIG: await ist erforderlich!
const rateLimit = await checkRateLimit(request, RATE_LIMITS.login);
if (!rateLimit.success) {
  return rateLimitExceededResponse(rateLimit.resetAt);
}
```

### IP-Extraktion (getClientIP)
- Prüft `x-real-ip` (Vercel setzt dies)
- Fallback auf `x-forwarded-for` (von rechts nach links, erste nicht-vertrauenswürdige IP)
- IP wird sanitized (nur erlaubte Zeichen)

### Fail-Open Strategie
Bei Redis-Fehlern werden Requests durchgelassen (nicht blockiert):
```typescript
catch (error) {
  console.warn("[RATE-LIMIT] Redis error, allowing request:", error);
  return { success: true, ... };
}
```

---

## Security Headers (next.config.ts)

Automatisch auf allen Routes:
```typescript
async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ];
},
```

| Header | Schutz gegen |
|--------|--------------|
| `X-Content-Type-Options: nosniff` | MIME-Sniffing Attacks |
| `X-Frame-Options: DENY` | Clickjacking |
| `X-XSS-Protection` | Reflected XSS |
| `Referrer-Policy` | Referrer Leaks |
| `Permissions-Policy` | Unerlaubte Browser-APIs |

---

## API Routes

### Auth
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/auth/login` | POST | - | Login (Rate Limited, Zod, E-Mail maskiert in Logs) |
| `/api/auth/logout` | POST | - | Logout (Cookies löschen) |
| `/api/auth/check` | GET | - | Status + Auto Token-Refresh + Token Rotation |
| `/api/auth/refresh` | POST | - | Manuelles Token-Refresh + Token Rotation |

### Properties
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/properties` | GET | - | Alle aktiven Properties |
| `/api/properties` | POST | Admin | Property erstellen (Zod, Image Cleanup bei Fehler) |
| `/api/properties/count` | GET | - | Anzahl aktiver Properties |
| `/api/properties/archived` | GET | Admin | Archivierte Properties |
| `/api/properties/[id]` | GET | - | Einzelne Property |
| `/api/properties/[id]` | PATCH | Admin | Property aktualisieren (Zod) |
| `/api/properties/[id]` | DELETE | Admin | Soft Delete (→ archived) |
| `/api/properties/[id]/restore` | POST | Admin | Wiederherstellen |
| `/api/properties/[id]/permanent` | DELETE | Admin | Endgültig löschen + **Blob Images löschen** |

### Cities
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/cities` | GET | - | Alle Städte abrufen (Rate Limited) |
| `/api/cities` | POST | Admin | Stadt hinzufügen (Zod) |
| `/api/cities/[id]` | PATCH | Admin | Stadt bearbeiten |
| `/api/cities/[id]` | DELETE | Admin | Stadt löschen (prüft ob Properties verknüpft) |

### Upload (Vercel Blob)
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/upload` | POST | Admin | Bild hochladen (Magic Bytes, Sharp Resize, WebP) |
| `/api/upload` | DELETE | Admin | Bild löschen |

### Contact
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/contact` | POST | - | Kontaktanfrage senden (Zod, Rate Limited: 5/Stunde) |
| `/api/contact/inquiries` | GET | Admin | Alle Anfragen abrufen |
| `/api/contact/inquiries/[id]` | PATCH | Admin | Als gelesen markieren |
| `/api/contact/inquiries/[id]` | DELETE | Admin | Anfrage löschen |

### Analytics (⚠️ umbenannt wegen Ad-Blocker!)
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/t/s` | POST | - | Session erstellen (Rate Limited) |
| `/api/t/s/end` | POST | - | Session beenden (sendBeacon, Rate Limited) |
| `/api/t/pv` | POST | - | Pageview loggen (Rate Limited) |
| `/api/t/e` | POST | - | Event loggen (Rate Limited) |
| `/api/t/stats` | GET | Admin | Aggregierte Stats (Promise.all optimiert) |

### Admin-Benutzer
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/admins` | GET | Admin | Alle Admins abrufen |
| `/api/admins` | POST | Admin | Neuen Admin erstellen (bcrypt Hash) |
| `/api/admins/[id]` | PATCH | Admin | Admin bearbeiten (inkl. Passwort ändern) |
| `/api/admins/[id]` | DELETE | Admin | Admin löschen (Selbstlöschung verhindert) |

### Monitoring (Sentry Tunnel)
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/monitoring` | POST | - | Sentry Tunnel (umgeht Ad-Blocker) |

**WICHTIG**: Analytics API ist `/api/t/*` (NICHT `/api/analytics/*`) wegen Ad-Blocker!

---

## Input Validierung (lib/validations.ts)

Alle API-Routes verwenden **Zod** für typsichere Validierung:

```typescript
import { validate, formatZodErrors, loginSchema } from "@/lib/validations";

const validation = validate(loginSchema, body);
if (!validation.success) {
  return NextResponse.json({
    error: "Ungültige Eingabe",
    code: "VALIDATION_ERROR",
    details: formatZodErrors(validation.errors),
  }, { status: 400 });
}
```

Verfügbare Schemas:
- `loginSchema` - Email + Passwort
- `createPropertySchema` / `updatePropertySchema`
- `createCitySchema` / `updateCitySchema`
- `createAdminSchema` / `updateAdminSchema` - Admin CRUD (Passwort optional bei Update)
- `contactFormSchema` - Name, Email, Phone?, Message
- `createSessionSchema`, `createPageviewSchema`, `createEventSchema`, `endSessionSchema`

---

## Bild-Upload (components/admin/image-upload.tsx)

### Features
- **Drag & Drop**: Bilder per Drag & Drop hochladen
- **Validierung (Client)**: Nur JPEG, PNG, GIF, WebP erlaubt
- **Validierung (Server)**: Magic Bytes Check
- **Resize**: Max 2000px mit `sharp`
- **Format**: Auto WebP-Konvertierung (Quality 85)
- **Storage**: Vercel Blob
- **Rate Limit**: 10 Uploads/Min
- **Timeout**: 30 Sekunden mit AbortController

### Image Cleanup
```typescript
// Bei fehlgeschlagener Property-Erstellung:
// Bereits hochgeladene Bilder werden aus Blob gelöscht
const cleanupImages = async (imageUrls: string[]) => {
  await Promise.all(
    imageUrls
      .filter((url) => url.includes("vercel-storage.com"))
      .map((url) => fetch("/api/upload", { method: "DELETE", body: JSON.stringify({ url }) }))
  );
};
```

### Permanent Delete Cleanup
Beim endgültigen Löschen einer Property werden auch alle Bilder aus Vercel Blob gelöscht:
```typescript
// In /api/properties/[id]/permanent/route.ts
if (property.images?.length > 0) {
  await Promise.all(
    property.images
      .filter((url) => url.includes("vercel-storage.com"))
      .map((url) => del(url).catch(() => {}))
  );
}
```

---

## Analytics System (lib/analytics.ts)

### Features
- **Session-Deduplication**: Gleiche IP + User-Agent innerhalb 30 Min = gleiche Session
- **Bot-Filtering**: 30+ User-Agent Patterns (Googlebot, curl, etc.)
- **DSGVO**: IP wird SHA-256 gehashed, kein Tracking ohne Session
- **N+1 Query Optimierung**: Property-Queries parallelisiert mit Promise.all

### Client Tracking (`components/analytics/analytics-tracker.tsx`)
- Session-ID in localStorage (`nlv_session_id`)
- Auto-Validierung bei jedem Laden (erstellt neue Session wenn alte ungültig)
- Auto Pageview bei Route-Wechsel
- 5s Timeout auf alle Requests
- **Komplett still** - keine console.error, keine UI-Blockierung

### Event Tracking
```typescript
import { trackEvent } from "@/components/analytics/analytics-tracker";
await trackEvent("whatsapp_click", propertyId);
```

### Admin Dashboard (`/admin/analytics`)
- KPIs: Visitors, Pageviews, Avg. Session Duration, WhatsApp Clicks
- Chart: Pageviews/Tag (30 Tage)
- Tabelle: Property Performance

---

## Städte-System

### Funktionsweise
1. **Admin verwaltet Städte** unter `/admin` → Tab "Städte"
2. **Property-Dropdown** zeigt alle Städte aus DB
3. **Filter auf Type-Seiten** kombiniert:
   - Städte aus existierenden Properties
   - PLUS alle Städte aus der Datenbank (auch ohne Properties)

### Code (property-listing-page.tsx)
```typescript
const availableCities = useMemo(() => {
  const propertyCities = properties.map((p) => p.city);
  const allDbCityNames = dbCities.map((c) => c.name);
  const combined = new Set([...propertyCities, ...allDbCityNames]);
  return Array.from(combined).sort();
}, [properties, dbCities]);
```

---

## Sentry Integration

### Konfiguration
- **DSN**: Via ENV (`NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN`)
- **Tunnel**: `/api/monitoring` (umgeht Ad-Blocker, aktiv in next.config.ts)
- **Init**: Via `instrumentation.ts` (Server/Edge) + `sentry.client.config.ts`

### Tunnel Route (`/api/monitoring/route.ts`)
```typescript
const SENTRY_HOST = process.env.SENTRY_HOST || "o4510467287810048.ingest.de.sentry.io";
const SENTRY_PROJECT_ID = process.env.SENTRY_PROJECT_ID || "4510467289251920";
```

### Dateien
- `sentry.client.config.ts` - Browser
- `sentry.server.config.ts` - Node Server
- `sentry.edge.config.ts` - Edge Runtime
- `instrumentation.ts` - Runtime Registration

---

## Error Handling

### Strukturierte Error-Responses
```typescript
{
  error: "Beschreibung für User",
  code: "ERROR_CODE",
  details?: ["Feld: Fehlermeldung"]
}
```

### Error Codes
- `UNAUTHORIZED` - Nicht eingeloggt
- `SESSION_EXPIRED` - Token abgelaufen
- `VALIDATION_ERROR` - Zod Validierung fehlgeschlagen
- `NOT_FOUND` - Resource nicht gefunden
- `RATE_LIMIT_EXCEEDED` - Zu viele Requests
- `INTERNAL_ERROR` - Server-Fehler
- `ACCOUNT_CONFIG_ERROR` - Passwort nicht gehashed

### Logging
- Alle API-Fehler werden mit Prefix geloggt: `[ROUTE_NAME_ERROR]`
- **E-Mail-Adressen werden maskiert**: `ma***@domain.com`

---

## Design System "Warm Light Premium"

```css
/* NLV Real Estate (Standard) */
--bg: #F9F9F7;           /* Warmes Off-White */
--surface: #FFFFFF;      /* Reine Oberflächen */
--card: #FFFFFF;         /* Karten */
--text: #0A2239;         /* Deep Navy */
--text-secondary: #1A3A52;
--muted: #5A6B7A;        /* Warmes Grau */
--primary: #B8860B;      /* Warm Gold */
--primary-hover: #DAA520;
--border: #E5E0D8;       /* Subtle warmth */
--glass: rgba(10, 34, 57, 0.03);
--glass-border: rgba(10, 34, 57, 0.08);
```

### Goldzeit Living Theme (Orange-Akzente)
```css
.goldzeit-theme {
  --bg: #FDF8F3;
  --primary: #ea580c;      /* Orange */
  --primary-hover: #f97316;
  --accent: #c2410c;
}
```
Aktiviert auf `/goldzeit/*` Seiten via `<html class="goldzeit-theme">`.

- **Headlines**: Cormorant Garamond (Serif)
- **Body**: Geist Sans
- **Keine rounded corners** = Premium Look

### Portal/Modal Styling (WICHTIG!)
CSS-Variablen funktionieren nicht zuverlässig in `createPortal`-Modals. Für Modals explizite Hex-Farben verwenden:
```typescript
// ❌ Nicht in Modals:
className="bg-[--card] text-[--text]"

// ✅ Stattdessen:
className="bg-white text-[#0A2239]"
```

---

## Environment Variables (.env)

```env
# Datenbank (Neon.tech)
DATABASE_URL="postgresql://..."

# JWT (min. 32 Zeichen!)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars!"

# Vercel Blob
BLOB_READ_WRITE_TOKEN="..."

# Upstash Redis (Rate Limiting)
KV_REST_API_URL="https://xxx.upstash.io"
KV_REST_API_TOKEN="AW7cAAI..."

# Analytics
ANALYTICS_SALT="zufälliger-string"

# Sentry
NEXT_PUBLIC_SENTRY_DSN="https://..."
SENTRY_DSN="https://..."
SENTRY_AUTH_TOKEN="..." # Source Maps Upload
SENTRY_HOST="o4510467287810048.ingest.de.sentry.io" # Optional
SENTRY_PROJECT_ID="4510467289251920" # Optional

# Optional
ADMIN_PASSWORD="..." # Für Seed (Standard: Passwort123123)
```

---

## Admin-Funktionen

### Nach Login:
1. **Admin-Bar** (unten): Dashboard, Analytics, Benutzer, Logout
2. **Property Actions**: ★ Empfehlen, Status ändern (inkl. "Verkauft"), Soft Delete
3. **Admin Dashboard** (`/admin`): Archiv + Städte Tabs
4. **Analytics** (`/admin/analytics`): Stats & Charts
5. **Benutzer** (`/admin/users`): Admin-Accounts verwalten

### Admin-Benutzer-Verwaltung (`/admin/users`)
- **Admins hinzufügen**: E-Mail, Passwort (min. 8 Zeichen), Name (optional)
- **Admins bearbeiten**: E-Mail, Name, Passwort ändern (optional)
- **Admins löschen**: Selbstlöschung verhindert, Sessions werden beendet
- **Stats**: Gesamt Admins, Mit Namen, Neuester Admin

### Property Status Optionen
- `available` - Verfügbar
- `reserved` - Reserviert
- `rented` - Vermietet
- `sold` - Verkauft
- `archived` - Archiviert (Soft Delete)

### Slug Auto-Numbering
- "Villa Da Nang" → `villa-da-nang`
- Duplikat → `villa-da-nang-2`, `villa-da-nang-3` etc.

### Archiv Links
Property-Links im Archiv zeigen auf `/immobilien/property/[slug]`

---

## Client Components Best Practices

### BigInt Serialisierung (WICHTIG!)
Prisma `BigInt` (z.B. `priceVND`) kann nicht direkt an Client Components übergeben werden:
```typescript
import { serializeBigInt } from "@/lib/serialize";

// Server Component → Client Component
<FeaturedProperties properties={serializeBigInt(featured)} />
```

### Touch Handler Guards
Immer prüfen ob Touch existiert:
```typescript
const handleTouchStart = (e: React.TouchEvent) => {
  const touch = e.touches[0];
  if (touch) {
    setTouchStart(touch.clientX);
  }
};
```

### Keys in `.map()`
- **Stabile IDs bevorzugen**: `key={property.id}`
- **Index OK** wenn Array zur Laufzeit nicht mutiert wird
- **Bei duplizierten Werten** (z.B. gleiche Bild-URLs): `key={index}` verwenden

### AbortController für Fetch in useEffect
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
await fetch(url, { signal: controller.signal });
clearTimeout(timeoutId);
```

---

## Wichtige Hinweise

### Security (KRITISCH!)
1. **JWT_SECRET** MUSS gesetzt sein (min. 32 Zeichen) - App crasht sonst!
2. **KV_REST_API_URL + KV_REST_API_TOKEN** für Rate Limiting erforderlich
3. **ANALYTICS_SALT** sollte gesetzt sein für DSGVO-Konformität
4. **Passwörter** werden automatisch bcrypt-gehashed (12 Rounds)
5. **Admin-Accounts** via `/admin/users`, `pnpm db:seed` oder Prisma Studio erstellen
6. **Refresh Token Rotation** ist aktiv - gestohlene Tokens werden ungültig

### Architektur
7. **Login** versteckt unter `/login` (nicht im Menü)
8. **Soft Delete**: Properties werden archiviert, nicht gelöscht
9. **Permanent Delete**: Löscht auch Bilder aus Vercel Blob
10. **priceVND**: Gespeichert in Millionen (500 = 500.000.000 VND)

### Troubleshooting
11. **.next Ordner löschen** bei Turbopack-Problemen: `rm -rf .next`
12. **Prisma regenerieren** nach Schema-Änderung: `pnpm prisma generate`
13. **Rate Limit testen**: 6+ Requests an `/api/auth/login` → 429 ab Request 6

---

## Kontaktdaten
- WhatsApp: +84 83 211 4684
- E-Mail: contact@newlifevietnam.com

## Sprache
- UI: Deutsch
- Code: Englisch
- Kommunikation: Deutsch
- # TECH STACK & CONSTRAINTS
- **Framework:** Next.js 16 (App Router).
- **Language:** TypeScript (Strict).
- **Database:** Prisma with PostgreSQL.
- **Styling:** Tailwind CSS.
- **Environment:** Node.js Runtime (mostly), Edge for Proxy.
- **React:** React 19 (RC).

# CRITICAL NEXT.JS 16 RULES
1. **Async Params:** In `page.tsx`, `params` and `searchParams` are Promises. ALWAYS use `const { slug } = await params;`. Never access them synchronously.
2. **Middleware:** We use `proxy.ts` instead of `middleware.ts`. Do not suggest creating `middleware.ts`.
3. **Caching:** We use `unstable_cache` or `revalidateTag("key", "max")`. NEVER use `export const dynamic = 'force-dynamic'` unless explicitly instructed.
4. **Image Component:** Always use `next/image`. Never `<img>`.