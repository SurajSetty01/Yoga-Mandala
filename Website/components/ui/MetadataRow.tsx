/**
 * MetadataRow — a hairline-ruled row of label/value pairs (dates, host, format, fee...).
 * Used across index entries and detail pages. Values with tabular figures where numeric.
 */
export interface MetaItem {
  label?: string;
  value: React.ReactNode;
}

export function MetadataRow({
  items,
  tone = "ink",
  className = "",
}: {
  items: MetaItem[];
  tone?: "ink" | "sand";
  className?: string;
}) {
  const color = tone === "sand" ? "text-sand/75" : "text-bark-soft";
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-1.5 text-small ${color} ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="flex items-baseline gap-1.5">
          {it.label && <span className="section-label opacity-70">{it.label}</span>}
          <span className="tnum">{it.value}</span>
        </li>
      ))}
    </ul>
  );
}
