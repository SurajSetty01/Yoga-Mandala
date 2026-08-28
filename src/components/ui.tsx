import Link from "next/link";
import type { ReactNode } from "react";
import { BADGE_LABEL, type Badge as BadgeType } from "@/content/types";

/**
 * The small shared vocabulary. Deliberately few components — novelty lives in
 * composition, not in a component zoo (docs/02-DESIGN-SYSTEM.md §7).
 *
 * There is no generic Card. That absence is the main structural guard
 * against a boxy site.
 */

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <hr className="rule mb-3" />
      <span className="t-label opacity-70">{children}</span>
    </div>
  );
}

const BADGE_STYLE: Record<BadgeType, string> = {
  "yoga-mandala-learning-initiative":
    "bg-[var(--color-indigo)] text-[var(--color-paper)] border-[var(--color-indigo)]",
  "curated-community-listing": "text-current border-[var(--color-brass)]",
  "community-listing": "text-current border-[var(--color-sage)]",
  "partner-guest": "text-current border-current opacity-75",
};

export function Badge({ badge, className = "" }: { badge: BadgeType; className?: string }) {
  return (
    <span className={`t-label inline-flex items-center border px-2 py-[3px] ${BADGE_STYLE[badge]} ${className}`}>
      {BADGE_LABEL[badge]}
    </span>
  );
}

export function SampleMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`t-label inline-flex items-center gap-1.5 border border-dashed px-2 py-[3px] opacity-55 ${className}`}
      title="Placeholder content — replaced at content handover"
    >
      Sample content
    </span>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`link-arrow t-label ${className}`}>
      <span className="link-rule">{children}</span>
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
        <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1" />
      </svg>
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  return (
    <Link href={href} className={`btn ${variant === "solid" ? "btn-solid" : "btn-ghost"} ${className}`}>
      <span>{children}</span>
    </Link>
  );
}

export function Colophon({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="colophon">
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt className="t-label opacity-60">{term}</dt>
          <dd className="t-small m-0 text-current">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return {
    day: String(d).padStart(2, "0"),
    month: MONTHS[m - 1],
    year: String(y),
    weekday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dt.getUTCDay()],
  };
}

export function longDate(iso: string) {
  const p = parts(iso);
  return `${Number(p.day)} ${p.month} ${p.year}`;
}

export function feeLabel(fee: { kind: string; amount?: number; currency?: string }) {
  if (fee.kind === "free") return "Free";
  if (fee.kind === "contribution") return "By contribution";
  if (fee.amount) return `${fee.currency === "INR" ? "₹" : ""}${fee.amount.toLocaleString("en-IN")}`;
  return "Paid";
}
