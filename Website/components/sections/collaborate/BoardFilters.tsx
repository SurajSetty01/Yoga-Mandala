"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing, ListingCategory } from "@/lib/types";
import { LISTING_CATEGORIES } from "@/lib/taxonomy";
import { FilterChip } from "@/components/ui/FilterChip";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";

/**
 * Sangha Board — the unified `listing` type (§8) presented as a filterable notice board.
 * Category chips filter a typographic list; every post carries the Community Listing badge and
 * an expiry. Not a card grid — posts are ruled rows with a category flag.
 */
function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function BoardFilters({ listings }: { listings: Listing[] }) {
  const [category, setCategory] = useState<ListingCategory | "all">("all");
  const shown = category === "all" ? listings : listings.filter((l) => l.category === category);

  const counts = LISTING_CATEGORIES.map((c) => ({
    category: c,
    count: listings.filter((l) => l.category === c).length,
  }));

  return (
    <section className="mx-auto max-w-content px-6 py-section-sm">
      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip label="All" active={category === "all"} onToggle={() => setCategory("all")} count={listings.length} />
        {counts.map((c) => (
          <FilterChip
            key={c.category}
            label={c.category}
            active={category === c.category}
            onToggle={() => setCategory((cur) => (cur === c.category ? "all" : c.category))}
            count={c.count}
          />
        ))}
      </div>

      {/* Posts */}
      <ul className="mt-10 border-t rule-gold">
        {shown.map((l) => (
          <li key={l.slug} className="border-b rule-gold">
            <Link href={`/collaborate/${l.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6">
              {/* Category flag */}
              <span className="section-label text-forest sm:w-36">{l.category}</span>
              <div>
                <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                  {l.title}
                </h2>
                <p className="measure mt-2 text-small text-bark-soft">{l.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge origin={l.origin} />
                  <span className="text-small text-bark-soft">{l.online ? "Online" : l.location}</span>
                  {l.sample && <SampleTag />}
                </div>
              </div>
              <span className="text-small text-bark-soft sm:text-right">
                <span className="section-label block">Open until</span>
                <span className="tnum">{formatDate(l.expiry)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="mt-8 text-lead text-bark-soft">Nothing in this category right now.</p>
      )}
    </section>
  );
}
