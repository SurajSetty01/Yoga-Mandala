import Link from "next/link";

/**
 * Wordmark set typographically until a real logo (A1) is supplied. Swapping to a real
 * logo is a one-component change. Two stacked words in the display face, tightly tracked.
 */
export function Wordmark({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "sand";
  className?: string;
}) {
  const color = tone === "sand" ? "text-sand" : "text-bark";
  return (
    <Link
      href="/"
      aria-label="Yoga Mandala — home"
      className={`group inline-flex flex-col leading-none ${color} ${className}`}
    >
      <span className="font-display text-[0.95rem] uppercase tracking-[0.34em] transition-opacity duration-fast group-hover:opacity-80">
        Yoga
      </span>
      <span className="font-display text-[0.95rem] uppercase tracking-[0.34em] transition-opacity duration-fast group-hover:opacity-80">
        Mandala
      </span>
    </Link>
  );
}
