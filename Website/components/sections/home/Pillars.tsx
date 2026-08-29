"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * S2 · Four pillars — "The four words are the interface" (T4 type-crossing).
 * Full-width display lines; hovering/focusing a word fills it solid and reveals its meaning
 * (framework §1, verbatim) plus a faint ground keyed to that pillar. The strongest anti-card
 * move available — the typography itself is the interactive object.
 */
const PILLARS = [
  { word: "Learn", href: "/learn", meaning: "Structured learning, resources, study and teacher development." },
  { word: "Connect", href: "/connect", meaning: "Find fellow teachers, practitioners, experts and community members." },
  { word: "Collaborate", href: "/collaborate", meaning: "Share opportunities, spaces, projects, referrals and professional needs." },
  { word: "Serve", href: "/join", meaning: "Contribute knowledge, volunteer, mentor and strengthen the wider Yoga ecosystem." },
];

export function Pillars() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-sand py-section" aria-label="The four pillars">
      {/* faint ground that shifts with the active pillar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: active === null ? 0 : 0.06,
          backgroundImage:
            "radial-gradient(80% 60% at 20% 30%, #26402c 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-content px-6">
        <p className="section-label text-bark-soft">— The promise</p>

        <ul className="mt-10">
          {PILLARS.map((p, i) => (
            <li key={p.word} className="border-t rule-gold last:border-b">
              <Link
                href={p.href}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-1 items-baseline gap-x-8 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:py-7"
              >
                <span
                  className={[
                    "font-display text-display-l leading-none transition-all duration-300 ease-standard md:text-display-xl",
                    active === i ? "text-forest md:translate-x-2" : "text-bark",
                  ].join(" ")}
                  style={{
                    WebkitTextStroke: active === i ? "0" : undefined,
                  }}
                >
                  {p.word}
                </span>
                <span
                  className={[
                    "text-body text-bark-soft transition-all duration-300 md:text-lead",
                    active === i ? "opacity-100 md:translate-x-0" : "opacity-70 md:translate-x-2 md:opacity-0",
                  ].join(" ")}
                >
                  {p.meaning}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
