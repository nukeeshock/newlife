import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[--muted]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span className="h-px w-3 bg-[--glass-border]" aria-hidden="true" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[--primary]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[--text]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
