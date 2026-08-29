import type { Metadata } from "next";
import Link from "next/link";
import { ArchivalPlate, Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Badge, SampleMark, SectionLabel } from "@/components/ui";
import { PageMasthead } from "@/components/page";
import { featuredResource } from "@/content/library";
import { BULLETIN, featuredInitiative, READING_CIRCLE } from "@/content/samples";
import { BADGE_MEANING, type Badge as BadgeType } from "@/content/types";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Learning Initiatives, the Curation & Learning Bulletin, the Library and the Reading Circle — four different kinds of learning, kept deliberately distinct.",
};

const BADGES: BadgeType[] = [
  "yoga-mandala-learning-initiative",
  "curated-community-listing",
  "community-listing",
  "partner-guest",
];

export default function LearnHubPage() {
  const initiative = featuredInitiative();
  const resource = featuredResource();
  const bulletin = BULLETIN.slice(0, 3);
  const rc = READING_CIRCLE;

  return (
    <>
      <PageMasthead
        kicker="The learning layer"
        word="Learn"
        title="Four different objects, not four cards."
        standfirst="Knowledge and development. Some of it is ours, some of it we point you toward, some of it is centuries old. This page exists to keep those distinct — because the difference between an initiative we run and a listing we merely selected is the whole point."
      />

      {/* S2 — the four routes, each at its own scale and treatment */}
      <section className="g-paper section">
        <div className="shell">
          {/* Learning Initiatives — largest, editorial, dated */}
          <Reveal variant="wipe">
            <div className="grid gap-8 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <Plate spec={initiative.plate} ratio="16 / 10" sizes="(max-width:1024px) 100vw, 58vw" />
              </div>
              <div className="lg:col-span-5 lg:pt-4">
                <SectionLabel>Learning Initiatives</SectionLabel>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Badge badge="yoga-mandala-learning-initiative" />
                  {initiative.sample && <SampleMark />}
                </div>
                <h2 className="t-display-m mt-5 mb-0">
                  <Link href="/learn/initiatives" className="link-rule">
                    Programmes we organise or endorse
                  </Link>
                </h2>
                <p className="t-body mt-5 mb-0 measure">
                  Workshops, study circles, lectures, series and mentorships that carry Yoga Mandala&rsquo;s own
                  name. Currently featured: <em>{initiative.title}</em>.
                </p>
                <div className="mt-7">
                  <ArrowLink href="/learn/initiatives">All initiatives</ArrowLink>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bulletin — a textual feed, no image */}
          <div className="mt-20 grid gap-8 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionLabel>Curation &amp; Learning Bulletin</SectionLabel>
              <h2 className="t-display-m mt-5 mb-0">
                <Link href="/learn/bulletin" className="link-rule">
                  What we point you toward
                </Link>
              </h2>
              <p className="t-small mt-5 mb-0 measure opacity-75">
                External offerings selected for relevance. These are <strong>not</strong> Yoga Mandala programmes —
                the badge on each one says exactly what it is.
              </p>
              <div className="mt-7">
                <ArrowLink href="/learn/bulletin">The bulletin</ArrowLink>
              </div>
            </div>
            <ol className="lg:col-span-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {bulletin.map((b, i) => (
                <Reveal
                  as="li"
                  key={b.slug}
                  delay={i * 80}
                  className="border-t border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)] first:border-t-0"
                >
                  <Link href={`/learn/bulletin/${b.slug}`} className="group block py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge badge={b.badge} />
                      {b.sample && <SampleMark />}
                    </div>
                    <h3 className="t-title mt-3 mb-0">
                      <span className="link-rule">{b.title}</span>
                    </h3>
                    <p className="t-label mt-2 mb-0 opacity-60">
                      {b.source.organisation} · {b.location}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Library + Reading Circle — a collection and an event, side by side */}
          <div className="mt-20 grid gap-8 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="grid grid-cols-[auto_1fr] items-start gap-6">
                <div className="w-32 md:w-40">
                  <Reveal>
                    <ArchivalPlate spec={resource.plate ?? { subject: resource.title, tone: "archive" }} ratio="3 / 4" sizes="160px" />
                  </Reveal>
                </div>
                <div>
                  <SectionLabel>Library</SectionLabel>
                  <h2 className="t-title mt-5 mb-0">
                    <Link href="/learn/library" className="link-rule">
                      A catalogue of texts and research
                    </Link>
                  </h2>
                  <p className="t-small mt-4 mb-0 opacity-75">
                    Public-domain sources with genuine rights information. Nothing is hosted that shouldn&rsquo;t
                    be.
                  </p>
                  <div className="mt-6">
                    <ArrowLink href="/learn/library">The library</ArrowLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative">
                <SectionLabel>Reading Circle</SectionLabel>
                <h2 className="t-title mt-5 mb-0">
                  <Link href="/learn/reading-circle" className="link-rule">
                    One text, read together, over a season
                  </Link>
                </h2>
                {rc.text.titleDeva && <p className="t-deva mt-2 mb-0 text-xl opacity-70">{rc.text.titleDeva}</p>}
                <p className="t-small mt-4 mb-0 measure opacity-75">
                  Currently reading <em>{rc.text.title}</em>. A slow, shared reading rather than a lecture.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <ArrowLink href="/learn/reading-circle">This season&rsquo;s reading</ArrowLink>
                  {rc.sample && <SampleMark />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S3 — the distinction: the badge system explained publicly */}
      <section className="g-indigo-deep section">
        <div className="shell">
          <Reveal>
            <SectionLabel>Ours, and not ours</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              Every listing carries a badge. Here is what each one means.
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-0">
            {BADGES.map((badge, i) => (
              <Reveal
                as="div"
                key={badge}
                delay={i * 70}
                className="grid gap-3 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-6 last:border-b md:grid-cols-[minmax(0,20rem)_1fr] md:items-baseline md:gap-8"
              >
                <dt>
                  <Badge badge={badge} />
                </dt>
                <dd className="t-body m-0">{BADGE_MEANING[badge]}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="t-small mt-8 mb-0 measure opacity-60">
            We never blur these categories. A programme we run and a book we happened to recommend should never
            look like the same kind of thing.
          </p>
        </div>
      </section>

      {/* S4 — Teacher's Desk, forthcoming */}
      <section className="g-paper-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-label mb-4 opacity-55">Forthcoming</p>
            <h2 className="t-display-m mt-0 mb-0">Teacher&rsquo;s Desk</h2>
            <p className="t-body mt-6 mb-0 measure">
              A space for knowledge and discussion between teachers — the questions that don&rsquo;t belong in a
              public class description and don&rsquo;t fit a listing. It is a real plan, not a placeholder; it
              simply isn&rsquo;t open yet.
            </p>
            <div className="mt-8">
              <ArrowLink href="/learn/teachers-desk">What it will be</ArrowLink>
            </div>
          </div>
          <ul
            className="lg:col-span-7 lg:pt-2"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {[
                "Handling injury and referral",
                "Fees, contracts and saying no",
                "Sequencing for real rooms",
                "Working with beginners",
                "Language about the body",
                "Teaching the texts honestly",
              ].map((t) => (
                <li key={t} className="t-small flex gap-3 opacity-80">
                  <span aria-hidden style={{ color: "var(--color-brass)" }}>
                    —
                  </span>
                  {t}
                </li>
              ))}
            </div>
          </ul>
        </div>
      </section>
    </>
  );
}
