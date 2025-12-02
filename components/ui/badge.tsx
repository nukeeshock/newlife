import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "info" | "muted" | "gold";
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-[--glass] text-[--text] border border-[--glass-border]",
  success: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  info: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
  muted: "bg-[--glass] text-[--muted] border border-[--glass-border]",
  gold: "bg-[--primary-muted] text-[--primary] border border-[--primary]/20",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium uppercase tracking-wider ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
