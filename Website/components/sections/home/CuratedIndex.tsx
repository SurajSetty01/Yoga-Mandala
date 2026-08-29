"use client";

import { useState } from "react";
import Link from "next/link";
import type { Bulletin } from "@/lib/types";
import { badgeForOrigin } from "@/lib/badges";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArtPlate, type PlateVariant } from "@/components/ui/Plate";

/**
 * S6 · Latest curated opportunities — "An index, not a grid" (T9 horizontal rail, inverted).
 * A plain typographic list, zero boxes. Hovering/focusing a row reveals an image at right that
 * follows the active row. Every entry carries its §10 badge (these are NOT YM programmes).
 * On small screens the image sits inline per row on hover/focus is replaced by always-visible
 * badge/meta (the list stays calm).
 */
const VARIANTS: PlateVariant[] = ["study", "manuscript", "botanical", "field", "portrait", "study"];

export function CuratedIndex({ items }: { items: Bulletin[] }) {
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;

  return (
    <section className="bg-sand py-section" aria-label="Latest curated opportunities">
      <div className="mx-auto max-w-content px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Curated learning</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-display-m">
              Opportunities worth a teacher&rsquo;s attention.
            </h2>
          </div>
          <Link
            href="/learn/bulletin"
            className="group inline-flex items-center gap-2 text-small text-forest transition-colors duration-fast hover:text-terracotta"
          >
            The full bulletin
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <ul className="border-t rule-gold">
            {items.map((b, i) => {
              const badge = badgeForOrigin(b.origin);
              return (
                <li key={b.slug} className="border-b rule-gold">
                  <Link
                    href={`/learn/bulletin`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block py-5 transition-colors duration-fast"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                        {b.title}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-bark-soft">
                        <Badge def={badge} />
                        <span>{b.category}</span>
                        <span>{b.source.name}</span>
                        {b.sample && <SampleTag />}
                      </span>
                      {/* inline image on small screens */}
                      <span className="mt-2 block lg:hidden">
                        <ArtPlate variant={VARIANTS[i % VARIANTS.length]} label={`Illustration for ${b.title}`} ratio="16 / 9" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Following image (desktop) */}
          <div className="sticky top-28 hidden self-start lg:block">
            <ArtPlate
              key={active}
              variant={VARIANTS[active % VARIANTS.length]}
              label={`Illustration for ${items[active].title}`}
              ratio="4 / 5"
            />
            <p className="mt-3 text-small text-bark-soft">{items[active].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
