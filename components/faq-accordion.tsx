"use client";

import { useState, useCallback, useRef, KeyboardEvent } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextIndex = (index + 1) % items.length;
          buttonRefs.current[nextIndex]?.focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevIndex = (index - 1 + items.length) % items.length;
          buttonRefs.current[prevIndex]?.focus();
          break;
        case "Home":
          event.preventDefault();
          buttonRefs.current[0]?.focus();
          break;
        case "End":
          event.preventDefault();
          buttonRefs.current[items.length - 1]?.focus();
          break;
      }
    },
    [items.length]
  );

  return (
    <div className="divide-y divide-[--glass-border]" role="region" aria-label="Häufige Fragen">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={index} className="py-4">
            <button
              ref={(el) => { buttonRefs.current[index] = el; }}
              id={buttonId}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[--primary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--card]"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="font-serif text-lg font-light text-[--text]">
                {item.question}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center text-[--primary] transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "mt-3 max-h-[800px]" : "max-h-0"
              }`}
              hidden={!isOpen}
            >
              <p className="text-sm leading-relaxed text-[--muted]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Vordefinierte FAQ-Items für Vietnam-Immobilien
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
