import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "info" | "muted" | "gold";
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-white text-[--accent] border border-[--border] shadow-sm",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  info: "bg-sky-50 text-sky-700 border border-sky-200",
  muted: "bg-gray-100 text-[--muted] border border-gray-200",
  gold: "bg-[--primary-muted] text-[--primary] border border-[--primary]/20",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
