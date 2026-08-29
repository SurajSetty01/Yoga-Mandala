/**
 * Section label — the connective tissue of the site. A tracked uppercase marker preceded by
 * an em dash, sitting above a section. Lets compositions differ wildly while feeling like one
 * publication.
 */
export function SectionLabel({
  children,
  tone = "ink",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "ink" | "sand";
  className?: string;
}) {
  const color = tone === "sand" ? "text-sand/70" : "text-bark-soft";
  return <p className={`section-label ${color} ${className}`}>— {children}</p>;
}
