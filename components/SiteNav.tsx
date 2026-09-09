'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { nav, links } from '@/content/site';

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
          Yoga&nbsp;Mandala
        </Link>
        <nav className="pill__nav" aria-label="Primary">
          <ul className="pill__links">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <a
            className="pill__cta"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join
          </a>
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
          <a
            className="sheet__cta"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Join the WhatsApp community
          </a>
        </nav>
      </div>
    </>
  );
}
