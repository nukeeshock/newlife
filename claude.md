# NEW LIFE VIETNAM – NLV Real Estate

## Projektübersicht

Eine **Next.js 16** Real Estate Listing-Plattform für Premium-Mietobjekte in Vietnam. Die Website präsentiert Villas, Apartments, Private Residences und Commercial-Flächen in Da Nang, Hoi An und Ho Chi Minh City.

**Zielgruppe**: Wohlhabende Auswanderer (45+ Software Devs, Rentner), die eine "Private Concierge Service"-Erfahrung erwarten.

### Tech Stack

| Technologie | Version | Zweck |
|-------------|---------|-------|
| Next.js | 16.0.6 | Framework (Turbopack) |
| React | 19.2.0 | UI Library |
| Tailwind CSS | 4 | Styling |
| TypeScript | 5 | Type Safety |
| Prisma | 5.22.0 | ORM |
| PostgreSQL | Neon.tech | Datenbank |
| Vercel Blob | - | Bild-Storage |
| Sentry | @sentry/nextjs 10.x | Error Tracking |
| jose | 6.1.3 | JWT |
| bcrypt | 6.0.0 | Passwort-Hashing |
| zod | 4.1.13 | Validierung |
| sharp | 0.34.5 | Bildverarbeitung |
| pnpm | - | Package Manager |

---

## Datenbank Schema (Prisma)

### Models
- **Property**: slug, title, description, city, country, **listingType** (rent/buy), **priceEUR**, **priceVND**, status (available/reserved/rented/sold/archived), type, recommended, area, bedrooms, bathrooms, amenities[], images[], popularity
- **Admin**: email, password (bcrypt gehashed!), name
- **City**: name (unique), country

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

### Rate Limiting (lib/rate-limit.ts, In-Memory)
- Login: 5 Versuche/Min
- Upload: 10 Requests/Min
- Analytics: 100 Requests/Min
- API allgemein: 60 Requests/Min

### Admin Middleware (lib/middleware/admin-auth.ts)
```typescript
import { withAdminAuth } from "@/lib/middleware/admin-auth";
export const POST = withAdminAuth(handler);
```

---

## API Routes

### Auth
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/auth/login` | POST | - | Login (Rate Limited, Zod Validation) |
| `/api/auth/logout` | POST | - | Logout (Cookies löschen) |
| `/api/auth/check` | GET | - | Status + Auto Token-Refresh |
| `/api/auth/refresh` | POST | - | Manuelles Token-Refresh |

### Properties
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/properties` | GET | - | Alle aktiven Properties |
| `/api/properties` | POST | Admin | Property erstellen (Zod) |
| `/api/properties/count` | GET | - | Anzahl aktiver Properties |
| `/api/properties/archived` | GET | Admin | Archivierte Properties |
| `/api/properties/[id]` | GET | - | Einzelne Property |
| `/api/properties/[id]` | PATCH | Admin | Property aktualisieren (Zod) |
| `/api/properties/[id]` | DELETE | Admin | Soft Delete (→ archived) |
| `/api/properties/[id]/restore` | POST | Admin | Wiederherstellen |
| `/api/properties/[id]/permanent` | DELETE | Admin | Endgültig löschen |

### Cities
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/cities` | GET | - | Alle Städte abrufen |
| `/api/cities` | POST | Admin | Stadt hinzufügen (Zod) |
| `/api/cities/[id]` | PATCH | Admin | Stadt bearbeiten |
| `/api/cities/[id]` | DELETE | Admin | Stadt löschen (prüft ob Properties verknüpft) |

### Upload (Vercel Blob)
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/upload` | POST | Admin | Bild hochladen (Magic Bytes, Sharp Resize, WebP) |
| `/api/upload` | DELETE | Admin | Bild löschen |

### Analytics (⚠️ umbenannt wegen Ad-Blocker!)
| Route | Method | Auth | Beschreibung |
|-------|--------|------|--------------|
| `/api/t/s` | POST | - | Session erstellen |
| `/api/t/s/end` | POST | - | Session beenden (sendBeacon) |
| `/api/t/pv` | POST | - | Pageview loggen |
| `/api/t/e` | POST | - | Event loggen |
| `/api/t/stats` | GET | Admin | Aggregierte Stats |

**WICHTIG**: Die alten Routes `/api/analytics/*` existieren noch als Backup, aber der Client verwendet `/api/t/*`!

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
- `createSessionSchema`, `createPageviewSchema`, `createEventSchema`, `endSessionSchema`

---

## Bild-Upload

- **Validierung**: Magic Bytes (JPEG, PNG, GIF, WebP)
- **Resize**: Max 2000px mit `sharp`
- **Format**: Auto WebP-Konvertierung (Quality 85)
- **Storage**: Vercel Blob
- **Rate Limit**: 10 Uploads/Min

---

## Analytics System (lib/analytics.ts)

### Features
- **Session-Deduplication**: Gleiche IP + User-Agent innerhalb 30 Min = gleiche Session
- **Bot-Filtering**: 30+ User-Agent Patterns (Googlebot, curl, etc.)
- **DSGVO**: IP wird SHA-256 gehashed, kein Tracking ohne Session

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

### Code (type-page-shell.tsx)
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
- **DSN**: Hardcoded in `sentry.client.config.ts`
- **Tunnel**: `/api/monitoring` (umgeht Ad-Blocker) - aktuell auskommentiert
- **Init**: Via `instrumentation.ts` (Server/Edge) + `sentry.client.config.ts`

### Dateien
- `sentry.client.config.ts` - Browser
- `sentry.server.config.ts` - Node Server
- `sentry.edge.config.ts` - Edge Runtime
- `instrumentation.ts` - Runtime Registration

### Test-Seite
`/sentry-test` - Buttons zum Testen der Integration

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

### Logging
Alle API-Fehler werden mit Prefix geloggt: `[ROUTE_NAME_ERROR]`

---

## Design System "Midnight Champagne"

```css
--bg: #08090d;           /* Tiefes Midnight */
--surface: #0d0f14;      /* Oberflächen */
--card: #12141a;         /* Karten */
--text: #f5f3ef;         /* Cremeweiß */
--muted: #a09a90;        /* Warmes Grau */
--primary: #c9a962;      /* Champagner-Gold */
--glass: rgba(245, 243, 239, 0.03);
--glass-border: rgba(245, 243, 239, 0.08);
```

- **Headlines**: Cormorant Garamond (Serif)
- **Body**: Geist Sans
- **Keine rounded corners** = Premium Look
- **Hintergrund**: `/da-nang.jpg` mit 35% Opacity

### Native Select Styling
```css
select option {
  background-color: #1a1a1a;
  color: #f5f3ef;
}
```

---

## Environment Variables (.env)

```env
# Datenbank
DATABASE_URL="postgresql://..."

# JWT (min. 32 Zeichen!)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars!"

# Vercel Blob
BLOB_READ_WRITE_TOKEN="..."

# Analytics
ANALYTICS_SALT="zufälliger-string"

# Sentry
NEXT_PUBLIC_SENTRY_DSN="https://..."
SENTRY_DSN="https://..."
SENTRY_AUTH_TOKEN="..." # Source Maps Upload

# Optional
ADMIN_PASSWORD="..." # Für Seed (Standard: Passwort123123)
```

---

## Admin-Funktionen

### Nach Login:
1. **Admin-Bar** (unten): Logout, /admin, /admin/analytics Links
2. **Property Actions**: ★ Empfehlen, Status ändern, Soft Delete
3. **Admin Dashboard** (`/admin`): Archiv + Städte Tabs
4. **Analytics** (`/admin/analytics`): Stats & Charts

### Slug Auto-Numbering
- "Villa Da Nang" → `villa-da-nang`
- Duplikat → `villa-da-nang-lxyz123` (mit Timestamp-Suffix)

---

## Entwicklung

```bash
pnpm dev          # Starten (Turbopack)
pnpm build        # Build
pnpm db:push      # Schema pushen
pnpm db:seed      # Testdaten + Admin (mit bcrypt Hash!)
pnpm db:studio    # Prisma Studio
```

### Turbopack Config (next.config.ts)
```typescript
turbopack: {
  root: process.cwd(),
},
```

---

## Wichtige Hinweise

### 🔐 Security (KRITISCH!)
1. **JWT_SECRET** MUSS gesetzt sein (min. 32 Zeichen) - App crasht sonst!
2. **ANALYTICS_SALT** sollte gesetzt sein für DSGVO-Konformität
3. **Passwörter** MÜSSEN bcrypt-gehashed sein (Klartext wird abgelehnt!)
4. **Admin-Accounts** nur via `pnpm db:seed` oder Prisma Studio erstellen

### Architektur
5. **Analytics API** ist `/api/t/*` (NICHT `/api/analytics/*`) wegen Ad-Blocker
6. **Login** versteckt unter `/login` (nicht im Menü)
7. **Soft Delete**: Properties werden archiviert, nicht gelöscht
8. **priceVND**: Gespeichert in Millionen (500 = 500.000.000 VND)

### Troubleshooting
9. **.next Ordner löschen** bei Turbopack-Problemen: `rm -rf .next`
10. **Prisma regenerieren** nach Schema-Änderung: `pnpm prisma generate`

---

## 📋 TODO / Später geplant

### Priorität HOCH (bei >1000 Visits/Tag)
- [ ] **Vercel KV oder Upstash Redis** - Rate Limiting + Session-Cache
  - Aktuell: In-Memory (funktioniert für kleine Projekte)
  - Später: Vercel KV (Free Tier: 3.000 Req/Tag) oder Upstash
  - Betrifft: `lib/rate-limit.ts` + `lib/analytics.ts`

### Priorität MITTEL
- [ ] **Sentry Tunnel aktivieren** - `/api/monitoring` Route existiert, muss in next.config.ts aktiviert werden
- [ ] **Aggregierte Daily-Snapshots** für Analytics (Performance bei vielen Daten)
- [ ] **Alte Bilder löschen** beim Property-Update (Vercel Blob cleanup)

### Priorität NIEDRIG
- [ ] **E-Mail-Benachrichtigungen** bei neuen Kontaktanfragen
- [ ] **Multi-Admin Support** mit Rollen
- [ ] **Property-Änderungshistorie** (Audit Log)

### Nice-to-have
- [ ] **Kartenansicht** mit Google Maps oder Mapbox
- [ ] **Favoriten** für Besucher (localStorage)
- [ ] **PDF-Export** für Property-Exposés

---

## Kontaktdaten (Platzhalter)
- WhatsApp: +49 151 123 456 78
- E-Mail: contact@newlifevietnam.com

## Sprache
- UI: Deutsch
- Code: Englisch
- Kommunikation: Deutsch

---

## Changelog

### 2024-12-02

**Backend Security Roadmap implementiert:**
- ✅ JWT Auth mit Access + Refresh Tokens (jose)
- ✅ bcrypt Passwort-Hashing (12 Rounds)
- ✅ Rate Limiting auf Login, Upload, Analytics
- ✅ Admin-Middleware für geschützte Routes
- ✅ Zod Input-Validierung für alle API-Routes
- ✅ Strukturierte Error-Responses mit Codes

**Bild-Upload verbessert:**
- ✅ Magic Bytes Validierung (nicht nur MIME)
- ✅ Sharp Resize (max 2000px)
- ✅ WebP-Konvertierung (Quality 85)
- ✅ DELETE Endpoint für alte Bilder

**Analytics gehärtet:**
- ✅ Session-Deduplication (30 Min Window)
- ✅ Bot-Filtering (30+ Patterns)
- ✅ Routes umbenannt zu `/api/t/*` wegen Ad-Blocker
- ✅ Silent Error Handling (keine UI-Blockierung)

**Admin-Features:**
- ✅ Exposé bearbeiten Button auf Property-Detailseite (Modal mit allen Feldern)
- ✅ Add/Edit Formulare mit Portal (z-index 99999, über allem)

**Preis-System erweitert:**
- ✅ Neuer Listing-Typ: Mieten vs Kaufen
- ✅ Preise in EUR und VND (automatische Umrechnung ~26.500 VND/EUR)
- ✅ Monatsmiete vs Kaufpreis Label
- ✅ VND-Preis auf Property-Detailseite angezeigt

**Fixes:**
- ✅ Städte im Filter werden jetzt aus DB + Properties kombiniert
- ✅ Dropdown-Optionen sind jetzt im Dark Theme sichtbar
- ✅ Analytics-Tracker validiert Session bei jedem Laden
- ✅ Turbopack root Config für Next.js 16

### Security Audit & Fixes (Session 2)

**🔴 KRITISCHE Sicherheitslücken behoben:**
- ✅ JWT Secret: App crasht jetzt wenn `JWT_SECRET` fehlt oder <32 Zeichen
- ✅ Klartext-Passwörter: Support komplett entfernt (nur bcrypt erlaubt)
- ✅ Schema-Mismatch: `priceEUR`/`priceVND`/`listingType` werden jetzt korrekt gespeichert
- ✅ `sold` Status zu Prisma Schema hinzugefügt
- ✅ BigInt → Int für `priceVND` (JSON-Serialisierung funktioniert jetzt)

**🟡 Security Session 2 - Token Revocation & CSRF:**
- ✅ Refresh-Token Blacklist: Tokens werden in DB gespeichert (`RefreshToken` Model)
- ✅ Token-Revocation bei Logout: Token wird als `revokedAt` markiert
- ✅ Token-Rotation: Bei Refresh wird altes Token revoked, neues erstellt
- ✅ CSRF-Protection: Alle Cookies auf `SameSite=Strict` umgestellt
- ✅ Gestohlene Tokens können jetzt sofort invalidiert werden

**⚠️ Serverless-Warnungen hinzugefügt:**
- Rate Limiting loggt Warnung in Production wenn kein Redis
- Session-Cache loggt Warnung in Production wenn kein Redis
- Analytics Salt loggt Warnung wenn nicht gesetzt

**Datenbank Migration:**
- `priceVND` von `BigInt` zu `Int` geändert (speichert jetzt in Millionen VND)
- `PropertyStatus` Enum um `sold` erweitert
- `RefreshToken` Model für Token-Revocation hinzugefügt
