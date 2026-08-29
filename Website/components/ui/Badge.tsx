import type { Origin } from "@/lib/types";
import { badgeForOrigin, type BadgeDef } from "@/lib/badges";

/**
 * The §10 badge. Rendered from a structural `origin` (or a resolved BadgeDef) — never
 * hardcoded. Always carries text (no colour-only meaning). Four fixed styles.
 */
const styleClasses: Record<BadgeDef["style"], string> = {
  "forest-fill": "bg-forest text-sand border border-forest",
  "gold-hairline": "text-bark border border-gold",
  "moss-hairline": "text-bark border border-moss",
  "bark-hairline": "text-bark border border-bark/40",
};

export function Badge({
  origin,
  def,
  className = "",
}: {
  origin?: Origin;
  def?: BadgeDef;
  className?: string;
}) {
  const badge = def ?? (origin ? badgeForOrigin(origin) : undefined);
  if (!badge) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] ${styleClasses[badge.style]} ${className}`}
    >
      {badge.label}
    </span>
  );
}
