"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Plate } from "@/components/Plate";
import { SectionLabel } from "@/components/ui";
import { PILLARS } from "@/lib/site";

/**
 * S2 — "The four words are the interface" (docs/pages/P01-home.md).
 * T4 type-crossing + image reveal.
 *
 * This is the section that would default to four cards. Making the typography
 * itself the interactive object is the strongest anti-card move available, and
 * it serves the 30-second comprehension goal in framework §21.
 */
export function Pillars() {
  const [active, setActive] = useState(0);
  const [locked, setLocked] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(min-width: 900px)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (locked) return;
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = itemRefs.current.findIndex((n) => n === e.target);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, [locked]);

  return (
    <section className="g-paper section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {PILLARS.map((p, i) => (
          <div
            key={p.name}
            className="absolute inset-0"
            style={{
              opacity: active === i ? 0.22 : 0,
              transition: "opacity 700ms var(--ease-standard)",
              maskImage: "linear-gradient(to right, transparent 0%, black 38%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%, black 100%)",
            }}
          >
            <Plate
              spec={{ subject: p.subject, tone: i % 2 === 0 ? "sage" : "clay" }}
              ratio="auto"
              className="!aspect-auto h-full"
              sizes="100vw"
              showCaption={false}
            />
          </div>
        ))}
      </div>

      <div className="shell relative z-10">
        <SectionLabel className="max-w-xs">Four pillars</SectionLabel>

        <ul className="m-0 mt-10 list-none p-0">
          {PILLARS.map((p, i) => {
            const on = active === i;
            return (
              <li
                key={p.name}
                ref={(n) => {
                  itemRefs.current[i] = n;
                }}
                style={{ borderTop: "var(--rule)" }}
                className="last:border-b last:border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)]"
                onMouseEnter={() => {
                  setLocked(true);
                  setActive(i);
                }}
                onMouseLeave={() => setLocked(false)}
              >
                <Link
                  href={p.href}
                  className="grid items-baseline gap-2 py-5 md:grid-cols-12 md:gap-8 md:py-7"
                  onFocus={() => {
                    setLocked(true);
                    setActive(i);
                  }}
                  onBlur={() => setLocked(false)}
                >
                  <span
                    className="t-display-l md:col-span-7"
                    style={{
                      color: on ? "var(--color-indigo)" : "transparent",
                      WebkitTextStroke: on ? "0px" : "1px color-mix(in srgb, var(--color-ink) 55%, transparent)",
                      transition: "color 400ms var(--ease-standard)",
                      textTransform: "uppercase",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    className="t-small md:col-span-5 md:text-right"
                    style={{ opacity: on ? 1 : 0.5, transition: "opacity 400ms var(--ease-standard)" }}
                  >
                    {p.meaning}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
