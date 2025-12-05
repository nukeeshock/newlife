import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "soft";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleProps {
  icon?: ReactNode;
}

export function buttonClasses({
  variant = "primary",
  fullWidth,
  className = "",
}: ButtonStyleProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-none text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--primary] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[--accent] text-white hover:bg-[--accent-warm] shadow-md hover:shadow-lg",
    ghost:
      "border border-[--border] bg-transparent text-[--accent] hover:border-[--primary] hover:text-[--primary]",
    soft:
      "bg-[--bg] text-[--accent] border border-[--border] hover:bg-white hover:border-[--primary]/30",
  };

  return `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} px-6 py-3 ${className}`;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  fullWidth,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, fullWidth, className })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
