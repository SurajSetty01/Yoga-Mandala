import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "ghost" | "ghost-light";

const base =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-label uppercase tracking-[0.12em] transition-all duration-fast ease-standard rounded-[3px]";

const variants: Record<Variant, string> = {
  // solid forest — primary
  solid: "bg-forest text-sand hover:bg-forest-deep",
  // ghost hairline on light grounds
  ghost: "border border-bark/40 text-bark hover:border-terracotta hover:text-terracotta",
  // ghost hairline over dark/hero grounds
  "ghost-light": "border border-sand/50 text-sand hover:border-sand hover:bg-sand/10",
};

export function ButtonLink({
  href,
  variant = "solid",
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  children,
  className = "",
  ...rest
}: {
  variant?: Variant;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
