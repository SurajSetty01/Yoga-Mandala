"use client";

import { useState } from "react";
import Link from "next/link";
import type { Resource, LibrarySubject } from "@/lib/types";
import { ArtPlate } from "@/components/ui/Plate";
import { LEVELS } from "@/lib/taxonomy";

/**
 * The collection: a subject "spine" (typographic index with counts) that filters an editorial
 * record list. Roughly one in three records carries a plate, at varied placement, so the rhythm
 * is naturally editorial rather than a uniform grid. Real content; link-out only.
 */
export function LibraryCollection({
  resources,
  counts,
}: {
  resources: Resource[];
  counts: { subject: LibrarySubject; count: number }[];
}) {
  const [subject, setSubject] = useState<LibrarySubject | "all">("all");
  const shown = subject === "all" ? resources : resources.filter((r) => r.subject === subject);

  return (
    <section className="mx-auto max-w-content px-6 py-section-sm">
      <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        {/* Subject spine */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="section-label">Subjects</p>
          <ul className="mt-4">
            <li>
              <button
                onClick={() => setSubject("all")}
                aria-pressed={subject === "all"}
                className={`flex w-full items-baseline justify-between gap-4 border-b rule-gold py-2.5 text-left transition-colors duration-fast ${
                  subject === "all" ? "text-terracotta" : "text-bark hover:text-forest"
                }`}
              >
                <span className="font-display text-title">All texts</span>
                <span className="tnum text-small text-bark-soft">{resources.length}</span>
              </button>
            </li>
            {counts.map((c) => (
              <li key={c.subject}>
                <button
                  onClick={() => setSubject(c.subject)}
                  aria-pressed={subject === c.subject}
                  className={`flex w-full items-baseline justify-between gap-4 border-b rule-gold py-2.5 text-left transition-colors duration-fast ${
                    subject === c.subject ? "text-terracotta" : "text-bark hover:text-forest"
                  }`}
                >
                  <span className="text-body">{c.subject}</span>
                  <span className="tnum text-small text-bark-soft">{c.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Records */}
        <div className="border-t rule-gold">
          {shown.map((r, i) => {
            const withPlate = i % 3 === 0;
            const levelLabel = LEVELS.find((l) => l.value === r.level)?.label ?? r.level;
            return (
              <article key={r.slug} className="border-b rule-gold py-8">
                <div className={withPlate ? "grid gap-6 sm:grid-cols-[0.32fr_0.68fr]" : ""}>
                  {withPlate && (
                    <Link href={`/learn/library/${r.slug}`} className="block max-w-[180px]">
                      <div className="border border-gold/60 p-1.5">
                        <ArtPlate variant="manuscript" label={`Plate for ${r.title}`} ratio="3 / 4" rounded={false} />
                      </div>
                    </Link>
                  )}
                  <div>
                    <Link href={`/learn/library/${r.slug}`} className="group">
                      <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                        {r.title}
                      </h2>
                    </Link>
                    <p className="mt-1 text-small text-bark-soft">
                      {r.author} · {r.tradition}
                    </p>
                    <p className="measure mt-3 text-small text-bark-soft">{r.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.6875rem] uppercase tracking-[0.1em] text-bark-soft">
                      <span>Level · {levelLabel}</span>
                      <span>Subject · {r.subject}</span>
                      <span>Source · {r.source.name} (public domain)</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
