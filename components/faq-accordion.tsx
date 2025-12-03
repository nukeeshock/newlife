"use client";

import { useState, useCallback, useRef, KeyboardEvent } from "react";
import type { FAQItem } from "@/lib/faq-data";

// Re-export für Backwards-Compatibility
export { vietnamFAQs, type FAQItem } from "@/lib/faq-data";

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
          <div key={item.question} className="py-4">
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
