# NEW LIFE VIETNAM – NLV Real Estate

## Projektübersicht

Eine **Next.js 16** Real Estate Listing-Plattform für Premium-Mietobjekte in Vietnam. Die Website präsentiert Villas, Apartments, Private Residences und Commercial-Flächen in Da Nang, Hoi An und Ho Chi Minh City.

### Tech Stack

| Technologie | Version |
|-------------|---------|
| Next.js | 16.0.6 |
| React | 19.2.0 |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| Package Manager | pnpm |

---

## Dateistruktur

```
newlife/
├── app/
│   ├── layout.tsx              # Root Layout mit Header/Footer
│   ├── page.tsx                # Homepage mit Hero + Featured Properties
│   ├── globals.css             # Tailwind + CSS-Variablen (Midnight Champagne)
│   ├── login/page.tsx          # Login-Seite
│   ├── kontakt/page.tsx        # Kontakt-Seite (WhatsApp + Email)
│   ├── property/[slug]/page.tsx    # Property-Detailseite
│   └── type/[property_type]/page.tsx  # Listing-Seite pro Typ
├── components/
│   ├── ui/
│   │   ├── button.tsx          # Button mit variants: primary, ghost, soft
│   │   └── badge.tsx           # Badge mit tones: success, warning, info, muted, gold
│   ├── header.tsx              # Fixed Navigation mit Mobile-Menü
│   ├── footer.tsx              # Footer mit Kontaktdaten
│   ├── hero.tsx                # Hero-Section (minimalistisch, emotional)
│   ├── property-card.tsx       # Property-Karte mit WhatsApp Button
│   ├── property-grid.tsx       # Grid-Layout für Properties
│   ├── featured-properties.tsx # Featured Section für Homepage
│   ├── cta-section.tsx         # CTA Section für Homepage
│   ├── gallery.tsx             # Bildgalerie für Detailseite
│   ├── filter-bar.tsx          # Filter: Art, Standort, Preis
│   ├── sort-dropdown.tsx       # Sortierung: Popular, Preis, Standort, Neueste
│   ├── type-page-shell.tsx     # Container für Type-Seiten mit Filter/Sort
│   ├── whatsapp-cta.tsx        # WhatsApp-Kontakt CTA
│   └── layout/
│       └── section.tsx         # Wiederverwendbare Section
├── lib/
│   ├── properties.ts           # Property-Typen, Daten und Hilfsfunktionen
│   └── format.ts               # formatPrice, formatStatus, formatType
└── public/
    └── da-nang.jpg             # Hintergrundbild (35% opacity, sepia-toned)
```

---

## Datenmodell

### Property Interface (`lib/properties.ts`)

```typescript
interface Property {
  slug: string;           // URL-Slug
  title: string;          // Titel
  description: string;    // Beschreibung
  city: string;           // Stadt (Da Nang, Hoi An, Ho Chi Minh City, Nha Trang)
  country: string;        // "Vietnam"
  address: string;        // Straße
  price: number;          // Jahresmiete in USD
  currency: "EUR" | "USD";
  status: PropertyStatus; // available | reserved | rented | archived
  type: PropertyType;     // private_residence | apartment | house | commercial
  listingType?: "rent" | "buy";  // NEU: Mieten oder Kaufen
  recommended?: boolean;  // Empfohlen vom Agent
  images: string[];       // Bildpfade
  area?: number;          // Fläche in m²
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];   // Ausstattungsliste
  popularity?: number;    // Sortier-Score (1 = am beliebtesten)
}
```

### Property Types

| Key | Label | Beschreibung |
|-----|-------|--------------|
| `private_residence` | Private Residence | Rückzugsorte mit Privatsphäre, Strandnähe oder Garten |
| `apartment` | Apartment | Stadtleben mit Balkon, Concierge, Aussicht |
| `house` | House/Villen | Häuser und Villas für längere Aufenthalte |
| `commercial` | Commercial | Flächen für Office/Showroom |

### Property Status

| Status | Farbe | Badge Tone |
|--------|-------|------------|
| `available` | Grün | success |
| `reserved` | Gelb | warning |
| `rented` | Blau | info |
| `archived` | Grau | muted |

---

## Design System

### Farbpalette "Midnight Champagne" (Dark Theme)

```css
:root {
  /* Basis */
  --bg: #08090d;           /* Tiefes Midnight */
  --surface: #0d0f14;      /* Oberflächen */
  --card: #12141a;         /* Karten */
  --card-elevated: #181b23;/* Erhöhte Karten */
  
  /* Text - warm, einladend */
  --text: #f5f3ef;         /* Cremeweiß (nicht kalt) */
  --text-secondary: #e8e4dd;
  --muted: #a09a90;        /* Warmes Grau */
  
  /* Champagner-Gold als Primärfarbe */
  --primary: #c9a962;      /* Gold - Luxus, Exklusivität */
  --primary-hover: #d4b872;
  --primary-muted: rgba(201, 169, 98, 0.15);
  
  /* Akzente */
  --accent: #8b7355;       /* Bronze */
  
  /* Glassmorphism - subtil, warm */
  --glass: rgba(245, 243, 239, 0.03);
  --glass-border: rgba(245, 243, 239, 0.08);
}
```

### Hintergrund

- **Bild**: `/da-nang.jpg` mit 35% Opacity
- **Filter**: `saturate(0.5) brightness(0.7)`
- **Overlay**: Gradient von oben (50%) nach unten (95%)
- **Gold Radial Glow** oben für Wärme

### Typografie

- **Headlines**: Cormorant Garamond (Serif) - elegant, vertrauenswürdig
- **Body**: Geist Sans - modern, lesbar
- **Tracking**: `tracking-[0.3em]` für Eyebrows/Labels

### Button Variants

| Variant | Beschreibung |
|---------|--------------|
| `primary` | Gold-Hintergrund, dunkler Text, Glow-Shadow |
| `ghost` | Transparenter Hintergrund, Border |
| `soft` | Subtiler Glass-Hintergrund |

### Design-Elemente

- **Keine rounded corners** - scharfe Kanten für Premium-Look
- **Gold Divider**: `linear-gradient(90deg, transparent, var(--primary), transparent)`
- **WhatsApp Icon** auf jeder Property Card

---

## Filter-System

### Verfügbare Filter (auf Listing-Seiten)

| Filter | Typ | Beschreibung |
|--------|-----|--------------|
| Art | Dropdown | Mieten / Kaufen / Alle |
| Standort | Dropdown | Dynamisch aus Properties (ADMIN UI später) |
| Preis von | Number Input | Mindestpreis |
| Preis bis | Number Input | Maximalpreis |

### Sortierung

| Option | Key |
|--------|-----|
| Beliebtheit | `popular` |
| Neueste zuerst | `newest` |
| Preis: Niedrig → Hoch | `price_asc` |
| Preis: Hoch → Niedrig | `price_desc` |
| Standort A-Z | `city_asc` |

---

## Routen

| Route | Beschreibung |
|-------|--------------|
| `/` | Homepage mit Hero, Featured Properties, CTA |
| `/type/private_residence` | Residences Listings |
| `/type/house` | Villen Listings |
| `/type/apartment` | Apartments Listings |
| `/type/commercial` | Commercial Listings |
| `/property/[slug]` | Property-Detailseite mit Gallery |
| `/kontakt` | Kontakt-Seite (WhatsApp + Email) |
| `/login` | Admin Login (versteckt, nicht im Menü) |

### Admin-Zugang (temporär hardcoded)

```
E-Mail: mauricebeaujean@web.de
Passwort: Passwort123123
```

⚠️ **Hinweis**: Diese Credentials sind temporär im Frontend hardcoded. Für Produktion muss eine echte Authentifizierung implementiert werden.

---

## Navigation

### Header Links

1. Residences → `/type/private_residence`
2. Villen → `/type/house`
3. Apartments → `/type/apartment`
4. Commercial → `/type/commercial`
5. Kontakt → `/kontakt`

**Hinweis:** Login (`/login`) ist NICHT im Menü sichtbar – nur für Admins über direkte URL erreichbar.

---

## Wichtige Funktionen

### `lib/properties.ts`

- `getPropertiesByType(type)` – Filtert Properties nach Typ
- `getPropertyBySlug(slug)` – Findet Property per Slug

### `lib/format.ts`

- `formatPrice(value, currency)` – Formatiert Preise (de-DE Format)
- `formatStatus(status)` – Status-Labels
- `formatType(type)` – Typ-Labels

---

## Geschäftslogik

- **Miete**: Langzeitmiete, typischerweise 12 Monate im Voraus
- **Kontakt**: WhatsApp als primärer Kontaktkanal
- **WhatsApp**: +49 151 123 456 78 (Platzhalter)
- **E-Mail**: contact@newlifevietnam.com
- **Wöchentliche Reinigung** in vielen Objekten inklusive
- **Standorte**: Da Nang, Hoi An, Ho Chi Minh City, Nha Trang

---

## 🚧 GEPLANT: Admin UI

### Standort-Verwaltung

Das **Standort-Dropdown** im Filter soll später über ein Admin UI gepflegt werden:

- Admin kann Standorte hinzufügen/entfernen
- Standorte werden nur angezeigt, wenn es dort Immobilien gibt
- Automatische Sortierung A-Z

### Weitere Admin-Features (geplant)

- Property CRUD (Create, Read, Update, Delete)
- Bild-Upload
- Status-Änderungen
- Listing-Typ (Mieten/Kaufen) verwalten

---

## Entwicklung

```bash
# Starten
pnpm dev

# Build
pnpm build

# Lint
pnpm lint
```

---

## Hinweise für Weiterentwicklung

1. **Statische Daten**: Alle Properties sind derzeit in `lib/properties.ts` hardcoded
2. **Bilder**: Nur `/da-nang.jpg` vorhanden – echte Property-Bilder fehlen
3. **Login**: Route existiert, Authentifizierung nicht implementiert
4. **WhatsApp**: Platzhalter-Nummer verwendet
5. **Responsive**: Mobile-first Design mit Breakpoints für `md:` und `lg:`
6. **Admin UI**: Noch nicht implementiert – Standorte später dynamisch

---

## Sprache

- **UI-Sprache**: Deutsch (Beschreibungen, Labels)
- **Entwickler-Kommunikation**: Deutsch (gemäß User-Regel)
