"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRIMARY_NAV, JOIN_HREF } from "@/lib/nav";
import { Wordmark } from "@/components/ui/Wordmark";
import { MegaPanel } from "./MegaPanel";
import { MobileMenu } from "./MobileMenu";

/**
 * Editorial masthead. Transparent (light text) over a dark hero; on scroll past a threshold
 * it transitions to a solid sand bar with a gold hairline, backdrop blur and reduced height.
 * Pages without a hero render the solid bar immediately. Learn/Connect open mega-panels on
 * hover/focus (desktop). Mobile uses a full-screen overlay.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect whether this route declared a dark hero (via body data attribute).
  useEffect(() => {
    // Defer to next tick so the page's OverHero effect can set the attribute.
    const id = requestAnimationFrame(() => {
      setOverHero(document.body.dataset.overHero === "true");
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega-panel on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero;
  const lightText = overHero && !scrolled;

  const openWithDelay = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter,box-shadow] duration-base ease-standard",
        solid
          ? "border-b bg-sand/90 backdrop-blur-md rule-gold"
          : "border-b border-sand/20 bg-transparent",
      ].join(" ")}
      onMouseLeave={scheduleClose}
    >
      <div
        className={[
          "mx-auto flex max-w-content items-center justify-between px-6 transition-[padding] duration-base ease-standard",
          solid ? "py-3.5" : "py-5",
        ].join(" ")}
      >
        <Wordmark tone={lightText ? "sand" : "ink"} />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {PRIMARY_NAV.map((item) => {
            const hasPanel = Boolean(item.children);
            const isOpen = openMenu === item.label;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasPanel && openWithDelay(item.label)}
                onFocus={() => hasPanel && openWithDelay(item.label)}
              >
                <Link
                  href={item.href}
                  aria-expanded={hasPanel ? isOpen : undefined}
                  aria-haspopup={hasPanel ? "true" : undefined}
                  className={[
                    "group relative py-2 text-label uppercase tracking-[0.12em] transition-colors duration-fast",
                    lightText ? "text-sand/90 hover:text-sand" : "text-bark hover:text-terracotta",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    className={[
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-fast ease-standard group-hover:scale-x-100",
                      isOpen ? "scale-x-100" : "",
                    ].join(" ")}
                  />
                </Link>

                {hasPanel && isOpen && (
                  <div
                    className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4"
                    onMouseEnter={() => openWithDelay(item.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="rounded-[4px] border bg-sand p-7 shadow-[0_20px_60px_-30px_rgba(24,42,29,0.5)] rule-gold">
                      <MegaPanel items={item.children!} onNavigate={() => setOpenMenu(null)} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href={JOIN_HREF}
            className={[
              "ml-1 inline-flex min-h-[40px] items-center rounded-[3px] px-5 py-2 text-label uppercase tracking-[0.12em] transition-all duration-fast ease-standard",
              lightText
                ? "border border-sand/60 text-sand hover:bg-sand hover:text-forest-deep"
                : "bg-forest text-sand hover:bg-forest-deep",
            ].join(" ")}
          >
            Join the Sangha
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className={[
            "flex h-11 w-11 items-center justify-center lg:hidden",
            lightText ? "text-sand" : "text-bark",
          ].join(" ")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
