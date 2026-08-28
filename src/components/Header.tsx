"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Plate } from "./Plate";

/**
 * Editorial masthead, not a navbar (docs/pages/P00-global-shell.md §2).
 * Transparent over a hero; resolves to paper with a brass hairline on scroll.
 * Learn and Connect open a mega-panel that previews the section's character.
 */

const PANEL_PLATE: Record<string, string> = {
  Learn: "Annotated pages and a Sanskrit text open on a low wooden desk",
  Connect: "Two teachers talking after a session, seated, unposed",
};

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const overHero = pathname === "/" || pathname === "/join" || pathname === "/events";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (overHero ? window.innerHeight * 0.7 : 24));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  useEffect(() => {
    setMobile(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || !overHero;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <a
        href="#main"
        className="t-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--color-indigo)] focus:px-4 focus:py-3 focus:text-[var(--color-paper)]"
      >
        Skip to content
      </a>

      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          background: solid ? "color-mix(in srgb, var(--color-paper) 92%, transparent)" : "transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
          borderBottom: solid
            ? "1px solid color-mix(in srgb, var(--color-brass) 45%, transparent)"
            : "1px solid color-mix(in srgb, #f4f1e9 18%, transparent)",
          color: solid ? "var(--color-ink)" : "var(--color-paper)",
          transition:
            "background 480ms var(--ease-standard), color 480ms var(--ease-standard), border-color 480ms var(--ease-standard)",
        }}
        onMouseLeave={scheduleClose}
      >
        <div
          className="shell flex items-center justify-between"
          style={{ height: solid ? 68 : 92, transition: "height 480ms var(--ease-standard)" }}
        >
          <Link href="/" className="t-label" style={{ letterSpacing: "0.16em", fontWeight: 500 }}>
            {SITE.name.toUpperCase()}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpen(item.children ? item.label : null);
                  }}
                >
                  <Link
                    href={item.href}
                    className="t-label link-rule"
                    aria-expanded={item.children ? open === item.label : undefined}
                    style={{ opacity: active ? 1 : 0.72 }}
                    onFocus={() => setOpen(item.children ? item.label : null)}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
            <Link
              href="/join"
              className={`btn ${solid ? "btn-solid" : "btn-ghost"}`}
              style={{ minHeight: 40, paddingInline: "1.1rem" }}
            >
              <span>Join the Sangha</span>
            </Link>
          </nav>

          <button
            type="button"
            className="t-label lg:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
          >
            {mobile ? "Close" : "Menu"}
          </button>
        </div>

        {NAV.filter((n) => n.children).map((item) => (
          <div
            key={item.label}
            hidden={open !== item.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="g-paper hidden border-t lg:block"
            style={{ borderColor: "color-mix(in srgb, var(--color-brass) 45%, transparent)" }}
          >
            <div className="shell grid grid-cols-12 gap-10 py-10">
              <ul className="col-span-7 m-0 list-none space-y-0 p-0">
                {item.children!.map((c) => (
                  <li key={c.href} style={{ borderTop: "var(--rule)" }}>
                    <Link href={c.href} className="group flex items-baseline justify-between gap-6 py-4">
                      <span className="t-title">
                        {c.label}
                        {c.forthcoming && <span className="t-label ml-3 align-middle opacity-50">Forthcoming</span>}
                      </span>
                      <span className="t-small max-w-[22rem] text-right opacity-60">{c.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="col-span-5">
                <Plate
                  spec={{ subject: PANEL_PLATE[item.label] ?? item.label, tone: "paper" }}
                  ratio="16 / 10"
                  sizes="30vw"
                  showCaption={false}
                />
              </div>
            </div>
          </div>
        ))}
      </header>

      <div
        id="mobile-menu"
        hidden={!mobile}
        className="g-indigo-deep fixed inset-0 z-40 flex flex-col overflow-y-auto pt-24 lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex-1">
          <ul className="m-0 list-none p-0">
            {NAV.map((item) => (
              <li key={item.label} style={{ borderTop: "var(--rule-paper)" }}>
                <Link href={item.href} className="t-display-m block py-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/join" className="btn btn-ghost w-full">
              <span>Join the Sangha</span>
            </Link>
          </div>
        </nav>
        <div className="mt-10 h-48">
          <Plate
            spec={{ subject: "A gathering of teachers, seated, mid-conversation", tone: "indigo" }}
            ratio="16 / 7"
            sizes="100vw"
            showCaption={false}
            className="h-full"
          />
        </div>
      </div>
    </>
  );
}
