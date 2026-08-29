/** A gold hairline rule — the connective tissue of the site. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-t rule-gold ${className}`} />;
}
