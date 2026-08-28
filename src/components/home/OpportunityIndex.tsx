"use client";

import Link from "next/link";
import { useState } from "react";
import { Plate } from "@/components/Plate";
import { ArrowLink, Badge, SampleMark, SectionLabel, longDate } from "@/components/ui";
import type { BulletinEntry } from "@/content/types";

/**
 * S6 — "An index, not a grid" (docs/pages/P01-home.md).
 * T9 inverted: a plain typographic list where hovering a row brings up that
 * entry's image beside it. Zero boxes.
 *
 * Every entry carries its §10 badge, because §6.2 is explicit that these
 * "are NOT automatically Yoga Mandala programmes".
 */


export function OpportunityIndex({ entries }: { entries: BulletinEntry[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? 0;

  return (
    <section className="g-paper section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel>Latest curated learning opportunities</SectionLabel>
          <ArrowLink href="/learn/bulletin">The full bulletin</ArrowLink>
        </div>

        <p className="t-small mt-6 mb-0 measure opacity-75">
          External programmes, books and research selected by the curation team for relevance. These are not
          Yoga Mandala programmes.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <ul className="m-0 list-none p-0 lg:col-span-7" onMouseLeave={() => setHover(null)}>
            {entries.map((e, i) => (
              <li
                key={e.slug}
                style={{ borderTop: "var(--rule)" }}
                className="last:border-b last:border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)]"
              >
                <Link
                  href={`/learn/bulletin/${e.slug}`}
                  className="block py-5"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge badge={e.badge} />
                    <span className="t-label opacity-55">{e.category.replace(/-/g, " ")}</span>
                    {e.sample && <SampleMark />}
                  </div>

                  <p
                    className="t-title mt-3 mb-0"
                    style={{
                      color: shown === i ? "var(--color-clay)" : "inherit",
                      transition: "color 240ms var(--ease-standard)",
                    }}
                  >
                    {e.title}
                  </p>

                  <p className="t-small mt-2 mb-0 opacity-60">
                    {e.source.organisation} · {e.location} · added {longDate(e.posted)}
                  </p>

                  <div className="mt-4 lg:hidden">
                    <Plate
                      spec={{ subject: `${e.category} — ${e.title}`, tone: i % 2 ? "paper" : "sage" }}
                      ratio="16 / 7"
                      sizes="100vw"
                      showCaption={false}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              {entries.map((e, i) => (
                <div key={e.slug} aria-hidden style={{ display: shown === i ? "block" : "none" }}>
                  <Plate
                    spec={{ subject: `${e.category} — ${e.title}`, tone: i % 2 ? "paper" : "sage" }}
                    ratio="4 / 5"
                    sizes="34vw"
                    showCaption={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
