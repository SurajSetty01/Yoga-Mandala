/**
 * Caption — for archival plates and images. Gold-ruled above, label styling. Always states
 * the real source/rights for archival imagery (integrity rule).
 */
export function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`border-t rule-gold pt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-bark-soft ${className}`}>
      {children}
    </p>
  );
}
