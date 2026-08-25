import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark",

  secondary:
    "bg-secondary text-white hover:opacity-90",

  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary-light",

  ghost:
    "bg-transparent text-primary hover:bg-primary-light",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-6 text-sm",
  lg: "min-h-13 px-7 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-50";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}