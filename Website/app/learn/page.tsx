import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { ArtPlate } from "@/components/ui/Plate";
import { Reveal } from "@/lib/motion/Reveal";
import { ALL_BADGES } from "@/lib/badges";
import { getFeaturedInitiative, getLatestBulletin, getFeaturedResource, getReadingCircle } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Structured learning, curated opportunities, a catalogue of foundational texts, and a shared reading circle — with a clear line between Yoga Mandala's own programmes and external offerings.",
};

/**
 * Learn hub — a routing page with a point of view. Four genuinely different things, each with
 * its own treatment and scale (no equal card grid), plus a public explainer of the badge
 * system so the Initiative-vs-external distinction is legible everywhere else.
 */
export default function LearnHub() {
  const initiative = getFeaturedInitiative();
  const bulletin = getLatestBulletin(3);
  const resource = getFeaturedResource();
  const reading = getReadingCircle();

  return (
    <>
      <PageHeader
        label="Learning"
        title="Four ways to keep learning."
        standfirst="Yoga Mandala's own initiatives, a curated bulletin of external opportunities, a catalogue of foundational texts, and a shared reading circle. They look different here because they are different — and the difference between our programmes and everything else is never blurred."
      />

      {/* S2 · Four routes, four treatments, unequal sizes */}
      <section className="mx-auto max-w-content px-6 py-section-sm">
        {/* Initiatives — largest, editorial inset (T2) */}
        {initiative && (
          <Reveal>
            <Link href="/learn/initiatives" className="group grid gap-8 border-b rule-gold pb-section-sm lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <ArtPlate variant="study" label="A Yoga Mandala study circle" ratio="16 / 10" />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge origin="yoga_mandala_initiative" />
                  {initiative.sample && <SampleTag />}
                </div>
                <h2 className="mt-4 font-display text-display-m transition-colors duration-fast group-hover:text-terracotta">
                  Learning Initiatives
                </h2>
                <p className="measure mt-4 text-body text-bark-soft">
                  Yoga Mandala&rsquo;s own study circles, mentorships and lectures — organised by
                  the community, for the community. Currently featured: {initiative.title}.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-small text-forest">
                  Explore initiatives
                  <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Bulletin — a textual index, no image */}
        <Reveal>
          <div className="border-b rule-gold py-section-sm">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel>A feed, not a programme</SectionLabel>
                <h2 className="mt-3 font-display text-display-m">Curation &amp; Learning Bulletin</h2>
              </div>
              <Link href="/learn/bulletin" className="group inline-flex items-center gap-2 text-small text-forest">
                Open the bulletin
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <ul className="mt-8 border-t rule-gold">
              {bulletin.map((b) => (
                <li key={b.slug} className="flex flex-wrap items-center justify-between gap-3 border-b rule-gold py-4">
                  <Link href="/learn/bulletin" className="font-display text-title transition-colors duration-fast hover:text-terracotta">
                    {b.title}
                  </Link>
                  <span className="flex items-center gap-3">
                    <Badge origin={b.origin} />
                    {b.sample && <SampleTag />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Library — a framed plate, medium */}
        {resource && (
          <Reveal>
            <Link href="/learn/library" className="group grid gap-8 border-b rule-gold py-section-sm md:grid-cols-[0.5fr_1fr] md:items-center">
              <figure className="mx-auto max-w-[220px] border border-gold/70 p-2">
                <ArtPlate variant="manuscript" label="A public-domain title page" ratio="3 / 4" rounded={false} />
              </figure>
              <div>
                <SectionLabel>A collection</SectionLabel>
                <h2 className="mt-3 font-display text-display-m transition-colors duration-fast group-hover:text-terracotta">
                  Library
                </h2>
                <p className="measure mt-4 text-body text-bark-soft">
                  A catalogue of foundational Yoga texts — links to legitimate public-domain
                  editions, never hosted files. {resource.title} and more.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-small text-forest">
                  Enter the library
                  <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Reading Circle — smallest, layered pair */}
        <Reveal>
          <Link href="/learn/reading-circle" className="group grid gap-8 py-section-sm md:grid-cols-[1fr_0.4fr] md:items-center">
            <div>
              <SectionLabel>An event around a text</SectionLabel>
              <h2 className="mt-3 font-display text-title transition-colors duration-fast group-hover:text-terracotta md:text-display-m">
                Reading Circle
              </h2>
              <p className="measure mt-4 text-body text-bark-soft">
                A slow, shared reading of one text at a time. Currently: {reading.textTitle}.
                {reading.sample ? "" : ""}
              </p>
              {reading.sample && <SampleTag className="mt-3" />}
            </div>
            <div className="relative mx-auto w-40 md:w-full">
              <ArtPlate variant="botanical" label="A gathering around a reading" ratio="1 / 1" />
            </div>
          </Link>
        </Reveal>
      </section>

      {/* S3 · The distinction — badge explainer (dark) */}
      <section className="bg-forest-deep py-section text-sand">
        <div className="mx-auto max-w-content px-6">
          <SectionLabel tone="sand">Ours, and everything else</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-display-m">
            Every listing wears a label. We never blur them.
          </h2>
          <p className="measure mt-6 text-body text-sand/80">
            Some things here are organised by Yoga Mandala. Most are external opportunities we
            curate or that members submit. So that the difference is always plain, four labels
            appear across the whole site:
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-sand/15 bg-sand/15 sm:grid-cols-2">
            {ALL_BADGES.map((b) => (
              <div key={b.label} className="bg-forest-deep p-6">
                <dt>
                  <Badge def={b} />
                </dt>
                <dd className="mt-3 text-small text-sand/80">{b.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* S4 · Teacher's Desk — forthcoming, honest */}
      <section className="bg-sand-deep py-section-sm">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <SectionLabel>Forthcoming</SectionLabel>
              <h2 className="mt-3 font-display text-display-m">Teacher&rsquo;s Desk</h2>
              <p className="measure mt-4 text-body text-bark-soft">
                A place for teachers to ask and answer among themselves, with every question and
                answer read by a moderator before it appears. It is a real plan, not a promise —
                and it opens once the community&rsquo;s moderation habit is established.
              </p>
              <Link href="/learn/teachers-desk" className="group mt-6 inline-flex items-center gap-2 text-small text-forest">
                What it will be
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <ArtPlate variant="field" label="A quiet desk, forthcoming" ratio="16 / 9" className="opacity-90" />
          </div>
        </div>
      </section>
    </>
  );
}
