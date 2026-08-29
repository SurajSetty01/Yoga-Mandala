"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Person } from "@/lib/types";
import {
  DIRECTORY_FILTERS,
  type DirectoryFilterKey,
} from "@/lib/taxonomy";
import {
  countActive,
  filterPeople,
  toggleSelection,
  type DirectorySelection,
} from "@/lib/directory";
import { FilterChip } from "@/components/ui/FilterChip";
import { ArtPlate } from "@/components/ui/Plate";
import { SampleTag } from "@/components/ui/SampleTag";

/**
 * The live Teacher Directory: seven §7.1 filters as chip groups, filtering a list of treated
 * placeholder profiles. Deep-linkable — an initial selection can arrive via ?tradition=... etc.
 * (used for one-click filtering from the Connect hub). NOT a face grid: profiles are editorial
 * fragments at unequal sizes.
 */
function buildOptions(people: Person[]): Record<DirectoryFilterKey, string[]> {
  const collect = (fn: (p: Person) => string[]) =>
    Array.from(new Set(people.flatMap(fn))).sort();
  return {
    location: collect((p) => [p.location]),
    tradition: collect((p) => p.traditions),
    area: collect((p) => p.areasOfTeaching),
    experience: collect((p) => [p.experience]),
    format: collect((p) => [p.teachingFormat]),
    language: collect((p) => p.languages),
    role: collect((p) => [p.role]),
  };
}

function initialFromParams(params: URLSearchParams): DirectorySelection {
  const sel: DirectorySelection = {};
  for (const { key } of DIRECTORY_FILTERS) {
    const v = params.get(key);
    if (v) sel[key] = v.split(",");
  }
  return sel;
}

const FORMAT_LABELS: Record<string, string> = {
  online: "Online",
  offline: "In person",
  hybrid: "Online & in person",
};

export function DirectoryFilters({ people }: { people: Person[] }) {
  const params = useSearchParams();
  const options = useMemo(() => buildOptions(people), [people]);
  const [selection, setSelection] = useState<DirectorySelection>(() =>
    initialFromParams(new URLSearchParams(params.toString())),
  );

  const results = filterPeople(people, selection);
  const activeCount = countActive(selection);

  const toggle = (key: DirectoryFilterKey, value: string) =>
    setSelection((s) => toggleSelection(s, key, value));

  const label = (key: DirectoryFilterKey, value: string) =>
    key === "format" ? FORMAT_LABELS[value] ?? value : value;

  return (
    <section className="mx-auto max-w-content px-6 py-section-sm">
      <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr]">
        {/* Filters */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center justify-between">
            <p className="section-label">Filter the directory</p>
            {activeCount > 0 && (
              <button
                onClick={() => setSelection({})}
                className="text-small text-terracotta underline underline-offset-4"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>

          <div className="mt-6 space-y-6">
            {DIRECTORY_FILTERS.map(({ key, label: groupLabel }) => (
              <fieldset key={key}>
                <legend className="section-label mb-2 text-bark-soft">{groupLabel}</legend>
                <div className="flex flex-wrap gap-2">
                  {options[key].map((opt) => (
                    <FilterChip
                      key={opt}
                      label={label(key, opt)}
                      active={(selection[key] ?? []).includes(opt)}
                      onToggle={() => toggle(key, opt)}
                    />
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        {/* Results — editorial fragments, unequal sizes, NOT a face grid */}
        <div>
          <p aria-live="polite" className="section-label text-bark-soft">
            {results.length} {results.length === 1 ? "teacher" : "teachers"}
            {activeCount > 0 ? " matching" : " in the directory"}
          </p>

          {results.length === 0 ? (
            <p className="mt-8 text-lead text-bark-soft">
              No teachers match those filters yet. Try removing one.
            </p>
          ) : (
            <ul className="mt-6 border-t rule-gold">
              {results.map((p, i) => {
                const wide = i % 3 === 0;
                return (
                  <li key={p.slug} className="border-b rule-gold">
                    <Link
                      href={`/connect/directory/${p.slug}`}
                      className="group grid items-center gap-5 py-6 sm:grid-cols-[auto_1fr]"
                    >
                      <div className={wide ? "w-28" : "w-20"}>
                        <ArtPlate
                          variant="portrait"
                          label={`Placeholder portrait for ${p.name} (treated, not a real face)`}
                          ratio="1 / 1"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                            {p.name}
                          </h2>
                          {p.verified && (
                            <span className="border border-gold px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.1em] text-bark-soft">
                              Verified
                            </span>
                          )}
                          {p.sample && <SampleTag />}
                        </div>
                        <p className="mt-1 text-small text-bark-soft">
                          {p.location} · {p.traditions.join(", ")}
                        </p>
                        <p className="mt-1 text-small text-bark-soft">
                          {p.areasOfTeaching.slice(0, 3).join(" · ")} · {FORMAT_LABELS[p.teachingFormat]}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
