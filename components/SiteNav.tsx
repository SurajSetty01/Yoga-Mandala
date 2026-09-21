'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { nav, site } from '@/content/site';

/**
 * The navigation pill.
 *
 * Its ground is opaque by measurement, not taste: Concept B's rgba(28,23,20,0.34) composites
 * over the hall's skylight to ~#7e7c76 and gives cream 3.91:1 — a fail. 0.74 composites to
 * ~#4b4743 and gives 8.6:1. No tint survives a backdrop that changes with every viewport, so
 * the bar owns a ground. See design/DESIGN-SYSTEM.md §1.
 *
 * `is-light` (inverted on paper) and `is-away` (lifted while scrolling down through the
 * picture) are applied by the hero choreography, which is the only thing that knows where the
 * picture ends. On pages with no hero, `light` pins it to the paper treatment from the start.
 */
export function SiteNav({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Focus moves into the sheet on open and back to the button on close, and the page behind
  // is locked. Escape closes. Without this the sheet is a visual overlay the keyboard cannot
  // reach — which is how one tournament candidate left three of four routes unreachable.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      sheetRef.current?.querySelector('a')?.focus();
    } else {
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`pill${light ? ' is-light' : ''}`} id="pill">
        <Link className="pill__mark" href="/">
          {site.wordmark}
        </Link>
        <nav className="pill__nav" aria-label="Primary">
          <ul className="pill__links">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
          {/*
            "Enquire", per the brief's navigation line, and it points at Contact rather than
            straight out to WhatsApp. The brief is explicit that "the current WhatsApp button
            can move into Contact/Enquire" — Praṇava takes enquiries about eight things now,
            not one community, so the button opens the page that can route them instead of
            dropping every visitor into one person's chat. It therefore no longer leaves the
            site, and carries no outbound arrow.
          */}
          <Link className="pill__cta" href="/contact/">
            Enquire
          </Link>
          <button
            ref={btnRef}
            className="pill__menu"
            type="button"
            aria-expanded={open}
            aria-controls="sheet"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="pill__bars" aria-hidden="true">
              <i />
              <i />
            </span>
            Menu
          </button>
        </nav>
      </header>

      <div className="sheet" id="sheet" ref={sheetRef} hidden={!open}>
        <nav className="sheet__nav" aria-label="Menu">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.full}
            </Link>
          ))}
          {/* The sheet's action matches the bar's: one destination that can route an
              enquiry, rather than two different ideas of what the primary action is. */}
          <Link className="sheet__cta" href="/contact/" onClick={() => setOpen(false)}>
            Enquire
          </Link>
        </nav>
      </div>
    </>
  );
}
