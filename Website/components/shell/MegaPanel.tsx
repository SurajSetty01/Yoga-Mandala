"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavChild } from "@/lib/nav";

/**
 * Desktop mega-panel for Learn / Connect. Child links on the left; an editorial
 * "preview" pane on the right whose character changes as you move between links —
 * previewing the section before you enter it. Fully keyboard operable.
 */
export function MegaPanel({
  items,
  onNavigate,
}: {
  items: NavChild[];
  onNavigate?: () => void;
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid grid-cols-[1.1fr_0.9fr] gap-10">
      <ul className="flex flex-col gap-1">
        {items.map((child, i) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={onNavigate}
              className="group block border-b border-bark/10 py-3 transition-colors duration-fast hover:border-terracotta/50"
            >
              <span className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                {child.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Preview pane — a composed panel, not a boxed card. */}
      <div
        aria-hidden
        className="relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[3px] bg-forest p-6 text-sand"
      >
        <div className="img-graded pointer-events-none absolute inset-0 opacity-30">
          <div className="duotone h-full w-full bg-gradient-to-tr from-forest-deep via-forest to-moss/40" />
        </div>
        <p className="section-label relative text-sand/70">— {current.label}</p>
        <p className="relative mt-2 font-display text-lead leading-snug text-sand">
          {current.blurb}
        </p>
      </div>
    </div>
  );
}
