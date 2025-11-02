"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string; // optional for links
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className,
  href,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center uppercase font-manrope text-subtitle px-6 py-3 rounded-none transition-all duration-300";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]",
    secondary:
      "bg-transparent text-[var(--color-true-black)] border border-[var(--color-true-black)] hover:bg-[var(--color-true-black)] hover:text-white",
    ghost: "bg-transparent text-[var(--color-true-black)] hover:text-[var(--color-primary)]",
  };

  const styles = clsx(baseStyles, variants[variant], className);

  // If href is provided → render a link, else → render a button
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
