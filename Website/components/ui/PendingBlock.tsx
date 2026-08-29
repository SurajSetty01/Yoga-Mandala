/**
 * PendingBlock — a visibly-marked placeholder for content that genuinely requires the client
 * (founding story, who runs it, the Pranava wording, legal policies). It never contains
 * plausible-sounding filler; it states plainly what is awaited, so the page composition is
 * complete while the gap is honest and obvious.
 */
export function PendingBlock({
  title,
  awaiting,
  className = "",
}: {
  title: string;
  awaiting: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-dashed border-terracotta/50 bg-terracotta/[0.04] p-6 ${className}`}
      role="note"
    >
      <p className="inline-flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.14em] text-terracotta">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
        Content pending
      </p>
      <p className="mt-3 font-display text-title text-bark">{title}</p>
      <p className="mt-2 measure text-small text-bark-soft">{awaiting}</p>
    </div>
  );
}
