import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  spacing?: "default" | "compact";
  actions?: ReactNode;
}

export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  spacing = "default",
  actions,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full ${spacing === "default" ? "py-20 md:py-28" : "py-12"}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:px-8">
        {(title || description || eyebrow) && (
          <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex-1 space-y-3">
              {eyebrow && (
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[--primary]">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2 className="font-serif text-3xl font-light text-[--text] md:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="max-w-2xl text-base text-[--muted]">{description}</p>
              )}
            </div>
            {actions && <div className="pt-2 md:pt-0">{actions}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
