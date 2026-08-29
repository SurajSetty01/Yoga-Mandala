"use client";

/**
 * FilterChip — an accessible toggle chip for directory/index filters. Uses aria-pressed;
 * ≥44px target; visible active state (not colour-only — active adds a check mark + fill).
 */
export function FilterChip({
  label,
  active,
  onToggle,
  count,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={[
        "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 py-1.5 text-small transition-colors duration-fast ease-standard",
        active
          ? "border-forest bg-forest text-sand"
          : "border-bark/25 text-bark hover:border-forest hover:text-forest",
      ].join(" ")}
    >
      {active && (
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden fill="none">
          <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
      <span>{label}</span>
      {typeof count === "number" && <span className="tnum opacity-60">{count}</span>}
    </button>
  );
}
