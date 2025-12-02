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
    "inline-flex items-center justify-center gap-2 rounded-none text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--primary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg]";
  
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[--primary] text-[--bg] hover:bg-[--primary-hover] shadow-[0_4px_20px_rgba(201,169,98,0.25)] hover:shadow-[0_6px_30px_rgba(201,169,98,0.35)]",
    ghost:
      "border border-[--glass-border] bg-transparent text-[--text] hover:border-[--primary]/50 hover:text-[--primary]",
    soft:
      "bg-[--glass] text-[--text] border border-[--glass-border] hover:bg-[--glass-hover] hover:border-[--glass-border-hover]",
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
