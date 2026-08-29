"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/types";
import { FilterChip } from "@/components/ui/FilterChip";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";

/**
 * Events — a date-led index. Each event is a ruled row whose day numeral carries the
 * composition (echoing the homepage's "date is the image" idea, but as a compact index rather
 * than a feature). Type chips filter by category. Badge from origin (YM vs partner).
 */
function parts(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
}

export function EventsList({ events }: { events: EventItem[] }) {
  const categories = useMemo(
    () => Array.from(new Set(events.map((e) => e.category))).sort(),
    [events],
  );
  const [cat, setCat] = useState<string | "all">("all");
  const shown = cat === "all" ? events : events.filter((e) => e.category === cat);

  return (
    <section className="mx-auto max-w-content px-6 py-section-sm">
      <div className="flex flex-wrap gap-2">
        <FilterChip label="All events" active={cat === "all"} onToggle={() => setCat("all")} count={events.length} />
        {categories.map((c) => (
          <FilterChip
            key={c}
            label={c}
            active={cat === c}
            onToggle={() => setCat((cur) => (cur === c ? "all" : c))}
          />
        ))}
      </div>

      <ul className="mt-10 border-t rule-gold">
        {shown.map((e) => {
          const { day, month } = parts(e.date);
          return (
            <li key={e.slug} className="border-b rule-gold">
              <Link href={`/events/${e.slug}`} className="group grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-8">
                {/* Date block */}
                <div className="flex items-baseline gap-2 sm:w-28 sm:flex-col sm:items-start sm:gap-0">
                  <span
                    className="font-display leading-[0.85] text-transparent tnum"
                    style={{ fontSize: "clamp(2.75rem, 2rem + 3vw, 4rem)", WebkitTextStroke: "1px #A6853F" }}
                  >
                    {day}
                  </span>
                  <span className="section-label text-bark-soft">{month}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge origin={e.origin} />
                    <span className="text-small text-bark-soft">{e.category}</span>
                    {e.sample && <SampleTag />}
                  </div>
                  <h2 className="mt-2 font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                    {e.title}
                  </h2>
                  <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-small text-bark-soft">
                    <span>{e.time}</span>
                    <span>{e.online ? e.location : e.location}</span>
                    <span>{e.audience}</span>
                    <span>{e.fee}</span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {shown.length === 0 && <p className="mt-8 text-lead text-bark-soft">No events of this type right now.</p>}
    </section>
  );
}
