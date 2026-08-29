/**
 * PullQuote — a standalone quoted line, gold-ruled top and bottom, set at lead scale.
 * Used for framework-verbatim statements (neutrality, closing principle, etc.).
 */
export function PullQuote({
  children,
  cite,
  tone = "ink",
  className = "",
}: {
  children: React.ReactNode;
  cite?: string;
  tone?: "ink" | "sand";
  className?: string;
}) {
  const text = tone === "sand" ? "text-sand" : "text-bark";
  const sub = tone === "sand" ? "text-sand/60" : "text-bark-soft";
  return (
    <figure className={`border-y rule-gold py-8 ${className}`}>
      <blockquote className={`measure-wide font-display text-lead italic leading-relaxed ${text}`}>
        {children}
      </blockquote>
      {cite && <figcaption className={`mt-4 section-label ${sub}`}>{cite}</figcaption>}
    </figure>
  );
}
