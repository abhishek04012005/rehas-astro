import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseClass = "button";
  const variantClass = `${baseClass} ${baseClass}--${variant}`;

  if (href) {
    return (
      <Link href={href} className={`${variantClass} ${className}`.trim()}>
        {children}
      </Link>
    );
  }

  return <button className={`${variantClass} ${className}`.trim()}>{children}</button>;
}
