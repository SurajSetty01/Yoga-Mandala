"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PRIMARY_NAV, JOIN_HREF } from "@/lib/nav";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Full-screen forest overlay (not a slide-down list). Nav items set large, stacked,
 * sequenced fade-and-rise. Focus is trapped; Esc closes; body scroll locked.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  // Flatten to a single sequence: top-level items + a few key children.
  const items = PRIMARY_NAV;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[70] flex flex-col bg-forest-deep text-sand lg:hidden"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="section-label text-sand/70">Menu</span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-sand transition-opacity duration-fast hover:opacity-70"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 pb-10">
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li
              key={item.href}
              style={
                reduced
                  ? undefined
                  : {
                      animation: `revealUp 520ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`,
                    }
              }
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="block border-b border-sand/15 py-4 font-display text-display-m transition-colors duration-fast hover:text-terracotta"
              >
                {item.label}
              </Link>
              {item.children && (
                <ul className="pb-4 pl-1 pt-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block py-1.5 text-body text-sand/75 transition-colors duration-fast hover:text-sand"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <Link
          href={JOIN_HREF}
          onClick={onClose}
          className="mt-8 inline-flex min-h-[44px] items-center rounded-[3px] bg-sand px-6 py-3 text-label uppercase tracking-[0.12em] text-forest-deep"
        >
          Join the Sangha
        </Link>
      </nav>

      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes revealUp { from { opacity: 1; } to { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}
