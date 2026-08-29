import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge, SampleMark, SectionLabel, longDate } from "@/components/ui";
import { ChipRow, Crumbs } from "@/components/page";
import { BULLETIN } from "@/content/samples";

export const metadata: Metadata = {
  title: "Curation & Learning Bulletin",
  description:
    "Relevant external programmes, workshops, retreats, trainings, books, research and events selected for the community. These are not Yoga Mandala programmes.",
};

const CATEGORY_LABEL: Record<string, string> = {
  programme: "Programme",
  workshop: "Workshop",
  retreat: "Retreat",
  "teacher-training": "Teacher training",
  book: "Book",
  research: "Research",
  event: "Event",
};

const WORKFLOW = [
  "A member submits a listing, or the curation team discovers one",
  "It enters the moderation queue",
  "A curator checks relevance, accuracy, presentation and community fit",
  "An approved listing receives its category and the correct badge",
  "It is published with an expiry date",
  "Expired items are archived",
];

const EXCLUDED = [
  "Unsolicited self-promotion",
  "Repeated advertising",
  "Referral spam",
  "Unrelated commercial posts",
];

export default function BulletinPage() {
  const entries = [...BULLETIN].sort((a, b) => b.posted.localeCompare(a.posted));

  return (
    <>
      {/* S1 — a masthead, no hero image */}
      <header className="g-paper pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="shell">
          <Crumbs trail={[{ label: "Learn", href: "/learn" }, { label: "Curation & Learning Bulletin" }]} />
          <div className="mt-8 max-w-4xl">
            <SectionLabel>Curated · reviewed before listing</SectionLabel>
            <h1 className="t-display-l mt-7 mb-0">A reading list of what is out there.</h1>
            <p className="t-lead mt-7 mb-0 measure-wide">
              Relevant external programmes, workshops, retreats, trainings, books, research and events — submitted
              by members or found by the curation team, and selected for relevance.
            </p>
          </div>
          <div className="mt-8 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-5">
            <p className="t-small m-0 measure-wide opacity-75">
              <strong>These are not Yoga Mandala programmes.</strong> They are external offerings we think are
              worth knowing about. The badge on each entry says exactly what it is.
            </p>
          </div>
        </div>
      </header>

      {/* S2 — filters */}
      <section className="g-paper pb-8">
        <div className="shell">
          <ChipRow
            groups={[
              {
                legend: "Category",
                options: ["Programmes", "Workshops", "Retreats", "Teacher trainings", "Books", "Research", "Events"],
              },
              { legend: "Place", options: ["Online", "In person"] },
            ]}
          />
        </div>
      </section>

      {/* S3 — the curated index */}
      <section className="g-paper section-lg pt-4">
        <div className="shell">
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {entries.map((b, i) => (
              <Reveal
                as="li"
                key={b.slug}
                delay={Math.min(i, 6) * 60}
                className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
              >
                <Link href={`/learn/bulletin/${b.slug}`} className="group block py-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge badge={b.badge} />
                      {b.sample && <SampleMark />}
                    </div>
                    <span className="t-label opacity-55">
                      {CATEGORY_LABEL[b.category]} · {b.location}
                    </span>
                  </div>
                  <h2 className="t-title mt-4 mb-0 measure-wide">
                    <span className="link-rule">{b.title}</span>
                  </h2>
                  <p className="t-label mt-3 mb-0 opacity-60">
                    {b.source.organisation} · expires {longDate(b.expiry)}
                  </p>
                  <p className="t-small mt-3 mb-0 measure opacity-80">{b.note}</p>
                </Link>
              </Reveal>
            ))}
          </ol>

          <p className="t-small mt-12 mb-0 opacity-70">
            Know something worth listing?{" "}
            <Link href="/submit/learning-opportunity" className="link-rule">
              Submit a learning opportunity
            </Link>
            .
          </p>
        </div>
      </section>

      {/* S4 — the curation workflow, published */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel>How things get here</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">Publishing the criteria is what separates curation from advertising.</h2>
            <ol className="mt-10" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {WORKFLOW.map((step, i) => (
                <li
                  key={step}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-4 last:border-b"
                >
                  <span className="tabnum t-title" style={{ color: "var(--color-brass)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-body">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <SectionLabel>What we will not publish</SectionLabel>
            <ul className="mt-6" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {EXCLUDED.map((x) => (
                <li key={x} className="t-body flex items-baseline gap-3 py-2">
                  <span aria-hidden style={{ color: "var(--color-clay)" }}>
                    ✕
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="t-small mt-6 mb-0 measure opacity-60">
              A listing is a service to the community, not a marketing channel. Anything that reads as an
              advertisement is declined.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
