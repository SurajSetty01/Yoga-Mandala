import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { Reveal } from "@/lib/motion/Reveal";
import { getBulletin } from "@/lib/content";

export const metadata: Metadata = {
  title: "Curation & Learning Bulletin",
  description:
    "External programmes, workshops, retreats, trainings and study opportunities — curated for relevance. These are not Yoga Mandala programmes.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Bulletin index — a textual index of external offerings. The whole point is that these are
 * NOT Yoga Mandala programmes: every entry wears its curated/partner badge, and the standfirst
 * says so plainly. No image treatment — a calm feed.
 */
export default function BulletinIndex() {
  const items = getBulletin();
  return (
    <>
      <PageHeader
        label="Learning · Bulletin"
        title="Opportunities worth a teacher's attention."
        standfirst="External programmes, workshops, retreats, trainings, books and events — submitted by members or found by the curation team, and selected for relevance. These are curated external listings, not Yoga Mandala's own programmes."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <ul className="border-t rule-gold">
          {items.map((b) => (
            <li key={b.slug} className="border-b rule-gold">
              <Reveal>
                <Link href={`/learn/bulletin/${b.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                      {b.title}
                    </h2>
                    <p className="measure mt-2 text-small text-bark-soft">{b.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Badge origin={b.origin} />
                      <span className="text-small text-bark-soft">{b.category}</span>
                      {b.sample && <SampleTag />}
                    </div>
                  </div>
                  <div className="text-small text-bark-soft sm:text-right">
                    <span className="section-label">Open until</span>
                    <p className="tnum mt-1">{formatDate(b.expiry)}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
