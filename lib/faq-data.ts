// FAQ-Daten für Vietnam-Immobilien
// Diese Datei kann sowohl von Client- als auch Server-Komponenten importiert werden

export interface FAQItem {
  question: string;
  answer: string;
}

export const vietnamFAQs: FAQItem[] = [
  {
    question: "Können Ausländer in Vietnam Immobilien kaufen oder mieten?",
    answer:
      "Ja, Ausländer können in Vietnam sowohl mieten als auch kaufen. Beim Kauf gilt: Ausländer können Apartments für bis zu 50 Jahre erwerben (verlängerbar), jedoch keine Grundstücke direkt besitzen. Beim Mieten gibt es keine Einschränkungen – Sie können jede Art von Immobilie mieten, von Apartments bis hin zu Villen.",
  },
  {
    question: "Wie läuft der Mietprozess ab?",
    answer:
      "Nach der Objektauswahl vereinbaren wir eine Besichtigung. Gefällt Ihnen die Immobilie, verhandeln wir die Konditionen mit dem Vermieter. Der Mietvertrag wird in der Regel auf 6 oder 12 Monate abgeschlossen. Sie zahlen typischerweise eine Kaution (1-2 Monatsmieten) und die erste Monatsmiete im Voraus. Wir begleiten Sie durch den gesamten Prozess und übersetzen alle Dokumente.",
  },
  {
    question: "Welche Dokumente werden benötigt?",
    answer:
      "Für die Anmietung benötigen Sie in der Regel nur Ihren gültigen Reisepass. Bei längerfristigen Mietverträgen kann zusätzlich ein Visum oder eine Arbeitsgenehmigung erforderlich sein. Wir informieren Sie vorab über alle benötigten Unterlagen.",
  },
  {
    question: "Wie sind die Nebenkosten in Vietnam?",
    answer:
      "Die Nebenkosten sind in Vietnam vergleichsweise gering. Strom kostet offiziell etwa 0,08€/kWh (Vermieter berechnen teils Pauschalen von 0,12-0,15€/kWh), Wasser ca. 0,25-0,40€/m³. Internet (Glasfaser, 100 Mbit) liegt bei ca. 8-12€/Monat. Klimaanlagen können den Stromverbrauch erhöhen – rechnen Sie mit 50-150€/Monat für Nebenkosten je nach Größe und Nutzung.",
  },
  {
    question: "Wie funktioniert die Kaution?",
    answer:
      "Die Kaution beträgt üblicherweise 1-2 Monatsmieten und wird bei Mietbeginn gezahlt. Sie wird am Ende des Mietverhältnisses zurückerstattet, sofern keine Schäden vorliegen. Wir dokumentieren den Zustand der Immobilie bei Ein- und Auszug gemeinsam mit Ihnen.",
  },
  {
    question: "Sprechen die Vermieter Deutsch oder Englisch?",
    answer:
      "Viele Vermieter sprechen Englisch, insbesondere in expat-freundlichen Gegenden wie Da Nang. Für die Kommunikation auf Deutsch stehen wir Ihnen zur Seite – wir übersetzen alle wichtigen Gespräche und Dokumente und sind Ihr Ansprechpartner für alle Fragen.",
  },
  {
    question: "Wie ist das Klima in Vietnam?",
    answer:
      "Vietnam hat ein tropisches Klima mit regionalen Unterschieden. Da Nang und Zentralvietnam haben eine Trockenzeit (Februar-August) mit Temperaturen um 25-35°C und eine Regenzeit (September-Dezember). Ho Chi Minh City im Süden ist ganzjährig warm (25-35°C) mit Regenzeit von Mai bis November. Klimaanlagen sind in allen unseren Objekten Standard.",
  },
  {
    question: "Ist Vietnam sicher für Ausländer?",
    answer:
      "Vietnam gilt als eines der sichersten Länder Südostasiens. Die Kriminalitätsrate ist niedrig, und Ausländer werden generell freundlich aufgenommen. Wie überall sollten Sie auf Ihre Wertsachen achten und grundlegende Vorsichtsmaßnahmen treffen. Die Expat-Communities in Da Nang und Ho Chi Minh City sind groß und hilfsbereit.",
  },
];
