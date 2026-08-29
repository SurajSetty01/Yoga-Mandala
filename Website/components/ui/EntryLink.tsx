import Link from "next/link";
import type { ReactNode } from "react";

/**
 * EntryLink — a typographic index entry (title + metadata), NO box. The main building block of
 * index pages, replacing a generic card. Gold hairline separators are applied by the list.
 */
export function EntryLink({
  href,
  title,
  meta,
  lead,
  aside,
  className = "",
}: {
  href: string;
  title: string;
  /** metadata line (badges, category, dates) */
  meta?: ReactNode;
  /** optional short description */
  lead?: ReactNode;
  /** optional right-aligned element (e.g. a numeral or count) */
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group grid grid-cols-1 gap-x-8 py-6 sm:grid-cols-[1fr_auto] ${className}`}
    >
      <div>
        <h3 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
          {title}
        </h3>
        {meta && <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">{meta}</div>}
        {lead && <p className="measure mt-3 text-small text-bark-soft">{lead}</p>}
      </div>
      {aside && <div className="mt-3 sm:mt-0 sm:text-right">{aside}</div>}
    </Link>
  );
}
