/**
 * Visible marker for placeholder/sample content (integrity rule). Kept small but unmissable,
 * so no sample entry is ever mistaken for real data. Removed with the samples at handover.
 */
export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-terracotta/60 px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.14em] text-terracotta ${className}`}
      title="Placeholder content — replaced with real content at handover"
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
      Sample content
    </span>
  );
}
