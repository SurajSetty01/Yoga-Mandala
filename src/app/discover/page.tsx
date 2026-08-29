import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge, SampleMark, SectionLabel, longDate, parts } from "@/components/ui";
import { ChipRow, Crumbs } from "@/components/page";
import { BULLETIN, EVENTS, LISTINGS } from "@/content/samples";
import {
  BADGE_MEANING,
  EVENT_TYPE_LABEL,
  LISTING_CATEGORY,
  type Badge as BadgeType,
} from "@/content/types";

export const metadata: Metadata = {
  title: "Discover",
  description:
    "Everything recently added across the community — events, learning initiatives, curated listings and board posts — in one feed, with a badge on each item saying where it comes from.",
};

/* A unified feed item — Discover queries across three content types and
   sorts by recency. Each item keeps a canonical URL; Discover only surfaces. */
type FeedItem = {
  slug: string;
  source: "event" | "bulletin" | "listing";
  kind: string;
  title: string;
  note: string;
  meta: string;
  date: string;
  expiry?: string;
  badge: BadgeType;
  href: string;
  wide: boolean;
  sample: boolean;
};

const FEED: FeedItem[] = [
  ...EVENTS.filter((e) => e.status === "upcoming").map<FeedItem>((e) => ({
    slug: e.slug,
    source: "event",
    kind: EVENT_TYPE_LABEL[e.eventType],
    title: e.title,
    note: e.description[0],
    meta: `${e.location.online ? e.location.platform ?? "Online" : e.location.city ?? "In person"} · ${longDate(e.date)}`,
    date: e.date,
    badge: e.badge,
    href: `/events/${e.slug}`,
    wide: true,
    sample: e.sample,
  })),
  ...BULLETIN.map<FeedItem>((b) => ({
    slug: b.slug,
    source: "bulletin",
    kind: "Bulletin",
    title: b.title,
    note: b.note,
    meta: `${b.source.organisation} · ${b.location}`,
    date: b.posted,
    expiry: b.expiry,
    badge: b.badge,
    href: `/learn/bulletin/${b.slug}`,
    wide: false,
    sample: b.sample,
  })),
  ...LISTINGS.filter((l) => l.status === "published").map<FeedItem>((l) => ({
    slug: l.slug,
    source: "listing",
    kind: LISTING_CATEGORY[l.category].label,
    title: l.title,
    note: l.description,
    meta: `${l.location} · posted by ${l.poster.name}`,
    date: l.posted,
    expiry: l.expiry,
    badge: l.badge,
    href: `/collaborate/${l.slug}`,
    wide: false,
    sample: l.sample,
  })),
];

const BADGE_ORDER: BadgeType[] = [
  "yoga-mandala-learning-initiative",
  "curated-community-listing",
  "community-listing",
  "partner-guest",
];

/* Group by month marker for the broadsheet rhythm. */
function monthKey(iso: string) {
  const p = parts(iso);
  return `${p.month} ${p.year}`;
}

export default function DiscoverPage() {
  const today = "2026-08-15";
  const feed = FEED.filter((i) => !i.expiry || i.expiry >= today).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  const groups: { key: string; items: FeedItem[] }[] = [];
  for (const item of feed) {
    const key = monthKey(item.date);
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.items.push(item);
    else groups.push({ key, items: [item] });
  }

  const expiringSoon = FEED.filter((i) => i.expiry && i.expiry >= today)
    .sort((a, b) => (a.expiry ?? "").localeCompare(b.expiry ?? ""))
    .slice(0, 5);

  const updated = feed[0]?.date;

  return (
    <>
      {/* S1 — a dateline */}
      <header className="g-paper pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="shell">
          <Crumbs trail={[{ label: "Discover" }]} />
          <div className="mt-8 max-w-4xl">
            <SectionLabel>The discovery layer</SectionLabel>
            <h1 className="t-display-l mt-7 mb-0">What&rsquo;s happened lately.</h1>
            <p className="t-lead mt-7 mb-0 measure-wide">
              Everything recently added across the community, in one place — events, curated listings and board
              posts. The badge on each item says exactly where it comes from.
            </p>
            {updated && <p className="t-label mt-6 mb-0 opacity-60">Updated {longDate(updated)}</p>}
          </div>
        </div>
      </header>

      {/* S2 — the badge key, doubling as the filter vocabulary */}
      <section className="g-paper pb-10">
        <div className="shell">
          <SectionLabel>Learn the language once</SectionLabel>
          <p className="t-small mt-5 mb-8 measure-wide opacity-75">
            Four badges run through everything here. This is the one page where all four appear side by side.
            They are never blurred: a Yoga Mandala initiative and an external listing must never look
            interchangeable.
          </p>
          <dl className="grid gap-x-14 gap-y-6 md:grid-cols-2">
            {BADGE_ORDER.map((b) => (
              <div
                key={b}
                className="flex flex-col gap-2 border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] pt-4"
              >
                <dt>
                  <Badge badge={b} />
                </dt>
                <dd className="t-small m-0 measure opacity-75">{BADGE_MEANING[b]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* S3 — the feed, a chronological broadsheet */}
      <section className="g-paper section-lg pt-4">
        <div className="shell">
          <SectionLabel>The feed</SectionLabel>
          <div className="mt-6">
            <ChipRow
              groups={[
                {
                  legend: "Type",
                  options: ["Events", "Bulletin", "Community listings"],
                },
                {
                  legend: "Badge",
                  options: ["Yoga Mandala", "Curated", "Community", "Partner / Guest"],
                },
              ]}
            />
          </div>

          <div className="mt-12 grid gap-14">
            {groups.map((group) => (
              <div key={group.key}>
                <p className="t-label mb-6 opacity-55">{group.key}</p>
                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {group.items.map((item, i) => (
                    <Reveal
                      as="li"
                      key={`${item.source}-${item.slug}`}
                      delay={Math.min(i, 6) * 50}
                      className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                    >
                      <Link href={item.href} className="group block py-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge badge={item.badge} />
                            {item.sample && <SampleMark />}
                          </div>
                          <span className="t-label opacity-55">{item.kind}</span>
                        </div>
                        <h2 className={`${item.wide ? "t-display-m" : "t-title"} mt-4 mb-0 measure-wide`}>
                          <span className="link-rule">{item.title}</span>
                        </h2>
                        <p className="t-label mt-3 mb-0 opacity-60">{item.meta}</p>
                        {item.wide && <p className="t-small mt-3 mb-0 measure opacity-80">{item.note}</p>}
                      </Link>
                    </Reveal>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              type="button"
              className="btn btn-ghost"
              aria-label="Load more items"
            >
              <span>Load more</span>
            </button>
            <p className="t-label mt-5 mb-0 opacity-50">
              No infinite scroll. This is a community feed, not an engagement metric.
            </p>
          </div>
        </div>
      </section>

      {/* S4 — expiring soon */}
      {expiringSoon.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>Expiring soon</SectionLabel>
            <p className="t-small mt-5 mb-8 measure-wide opacity-75">
              Items approaching their expiry date. Every listing carries one; expired items are archived and
              leave the feed automatically.
            </p>
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {expiringSoon.map((item) => (
                <li
                  key={`exp-${item.source}-${item.slug}`}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] last:border-b"
                >
                  <Link href={item.href} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                    <span className="t-small">
                      <span className="link-rule">{item.title}</span>
                    </span>
                    <span className="t-label opacity-55">expires {longDate(item.expiry!)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* S5 — how things get here */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel>How things get here</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              Everything here was read by a person before it appeared.
            </h2>
            <p className="t-body mt-8 mb-0 measure">
              Discover does not own content. It aggregates what already lives elsewhere — the bulletin, the
              events index, the Sangha Board — and orders it by recency. Each item keeps a single canonical
              page; this feed is only another route to reach it.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel>Add to the feed</SectionLabel>
            <ul className="mt-6" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { label: "Submit an event", href: "/submit/event" },
                { label: "Submit a learning opportunity", href: "/submit/learning-opportunity" },
                { label: "Submit a community listing", href: "/submit/listing" },
                { label: "Submit a resource", href: "/submit/resource" },
              ].map((r) => (
                <li
                  key={r.href}
                  className="border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-3 last:border-b"
                >
                  <Link href={r.href} className="t-label link-rule">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
