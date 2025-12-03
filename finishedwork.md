# NewLife Vietnam - Arbeitsprotokoll

**Letzte Aktualisierung:** 03.12.2024

---

## Session: Content-Seiten & Navigation

### 1. Header-Navigation erweitert

**Datei:** `components/header.tsx`

**Änderungen:**
- Neuer Menüpunkt **"Städte"** mit Dropdown (Da Nang, Hoi An, Ho Chi Minh City)
- Neuer Menüpunkt **"Wer wir sind"** → `/ueber-uns`
- Desktop: Dropdown öffnet bei Hover, undurchsichtiger Hintergrund (`#0a0b10`)
- Mobile: Akkordeon-Menü mit Location-Icon, goldene Punkte bei Untermenü

---

### 2. Städte-Seiten erstellt

**Route:** `/stadt/[city]`
**Datei:** `app/stadt/[city]/page.tsx`

**Verfügbare Städte:**
- `/stadt/da-nang`
- `/stadt/hoi-an`
- `/stadt/ho-chi-minh`

**Seitenaufbau:**
1. Hero Section mit Titel & Untertitel
2. Intro-Text (aufpoliert aus Vorlage)
3. Bento-Grid mit 4 Highlight-Kacheln + 2 Bildplatzhaltern
4. Content-Sections mit alternierenden Bild/Text Layouts
5. Aktivitäten-Grid (asymmetrisch)
6. CTA-Section mit Links zu Apartments, Villen, Residenzen

**Bento-Grid Layout:**
- Mobile: Gestapelt (1 Spalte)
- Desktop: 12-Spalten Grid, Bilder 7 Spalten / Kacheln 5 Spalten

**Platzhalter-Bilder:**
| Stadt | Bilder |
|-------|--------|
| Da Nang | Dragon Bridge, Skyline, Marble Mountains, My Khe Beach |
| Hoi An | Japanische Brücke, Altstadt, An Bang Beach, Laternen |
| HCMC | Ben Thanh Market, Rooftop Bar, Notre Dame, Skyline |

---

### 3. "Wer wir sind" Seite erstellt

**Route:** `/ueber-uns`
**Datei:** `app/ueber-uns/page.tsx`

**Sektionen:**
1. Hero: "Neue Chancen. Neues Zuhause. NewLife Vietnam"
2. Mission Statement
3. Was wir bieten (3 Kacheln: Wohnimmobilien, Kaufobjekte, Rundum-Betreuung)
4. Für wen wir arbeiten (4 Kacheln: Rentner, Auswanderer, Digitale Nomaden, Investoren)
5. Unser Team (DE + VN + Lokale Expertise)
6. Warum Vietnam? (6 Icons)
7. Unser Anspruch
8. CTA mit Kontakt & WhatsApp

---

### 4. Senioren-Wohnmodell auf Homepage

**Datei:** `components/senior-living-section.tsx`
**Eingebunden in:** `app/page.tsx`

**Position:** Nach Featured Properties, vor CTA Section

**Inhalt:**
- Headline: "Gemeinsam wohnen, gemeinsam aufleben"
- 6 Features mit Checkmarks
- Preiskarte: 999€/Monat (Einzelzimmer), 849€/Monat (Paare p.P.)
- WhatsApp-CTA mit vorbelegter Nachricht

---

### 5. Entfernte Elemente

- "Mehr erfahren" Link (redundant)
- Senioren-Wohnmodell von /ueber-uns (jetzt nur auf Homepage)

---

### 6. Spätere Anpassung (durch User/Linter)

**Datei:** `app/stadt/[city]/page.tsx`

CTA-Buttons auf Städte-Seiten erweitert:
- Vorher: "Alle Objekte ansehen" + "Beratung anfordern"
- Nachher: "Apartments" + "Villen" + "Residenzen" + "Beratung anfordern"

---

## Geänderte Dateien

| Datei | Status |
|-------|--------|
| `components/header.tsx` | Erweitert |
| `app/stadt/[city]/page.tsx` | Neu erstellt |
| `app/ueber-uns/page.tsx` | Neu erstellt |
| `components/senior-living-section.tsx` | Neu erstellt |
| `app/page.tsx` | Erweitert |

---

## Design-Konsistenz

Alle Komponenten folgen dem "Midnight Champagne" Design:
- Hintergrund: `#08090d`
- Karten: `#12141a`
- Text: `#f5f3ef`
- Akzent: `#c9a962` (Gold)
- Headlines: Cormorant Garamond
- Body: Geist Sans
- Keine abgerundeten Ecken

---

## Offene Punkte

- [ ] Echte Bilder für Städte-Seiten hochladen
- [ ] WhatsApp-Nummer aktualisieren
- [ ] SEO Meta-Descriptions prüfen

---

## Build-Status

```
✓ Compiled successfully
✓ TypeScript: Keine Fehler
```

---

## Sentry Debug-Logs Fix

**Datei:** `sentry.client.config.ts`

**Problem:** Sehr verbose Logs in der Konsole durch `debug: true`

**Fix:** Debug-Mode nur in Development aktivieren:
```typescript
debug: process.env.NODE_ENV === "development",
```

**Hinweis:** Die Turbopack-Warnungen (`import-in-the-middle can't be external`) sind bekannte Kompatibilitätsprobleme zwischen Sentry und Turbopack. Sie beeinträchtigen die Funktionalität nicht.

**Für Production empfohlen:**
- `tracesSampleRate: 0.1` (statt 1.0)
- `debug: false`
