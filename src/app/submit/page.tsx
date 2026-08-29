import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Badge, SectionLabel, ArrowLink } from "@/components/ui";
import { PageMasthead, ClosingBand } from "@/components/page";
import { BADGE_MEANING, type Badge as BadgeType } from "@/content/types";

export const metadata: Metadata = {
  title: "Submit to Yoga Mandala",
  description:
    "One submission engine for events, learning opportunities, resources and community listings. Everything is read by a person and reviewed before it is published. This is the Serve pillar in practice.",
};

type Route = {
  href: string;
  label: string;
  blurb: string;
  goesTo: string;
  becomes: string;
  badge: BadgeType;
};

const ROUTES: Route[] = [
  {
    href: "/submit/event",
    label: "An event",
    blurb: "A meetup, workshop, study circle or conversation, online or in a room.",
    goesTo: "Events",
    becomes: "An event listing, badged by type.",
    badge: "community-listing",
  },
  {
    href: "/submit/learning-opportunity",
    label: "A learning opportunity",
    blurb: "A programme, retreat, training, book or piece of research worth others' attention.",
    goesTo: "Curation & Learning Bulletin",
    becomes: "A Curated Community Listing — selected, not endorsed.",
    badge: "curated-community-listing",
  },
  {
    href: "/submit/resource",
    label: "A resource",
    blurb: "A text, commentary, article or recording, linked from where it already lives.",
    goesTo: "Library",
    becomes: "A catalogue record, with rights and source recorded.",
    badge: "curated-community-listing",
  },
  {
    href: "/submit/listing",
    label: "A community listing",
    blurb: "Looking for something, offering something, a space, a project, a referral.",
    goesTo: "Sangha Board",
    becomes: "A Community Listing meeting the community rules.",
    badge: "community-listing",
  },
];

const LIFECYCLE = [
  "Draft",
  "Submitted",
  "Under Review",
  "Approved · Changes Requested · Rejected",
  "Published",
  "Expired · Archived",
];

const CRITERIA = [
  { term: "Relevance", body: "It serves teachers and serious practitioners, not a general audience." },
  { term: "Accuracy", body: "Claims are honest and, where they matter, traceable to a source." },
  { term: "Presentation", body: "It is clear, complete and free of promotional inflation." },
  { term: "Community fit", body: "It respects the guidelines and the character of the community." },
];

export default function SubmitHubPage() {
  return (
    <>
      <PageMasthead
        kicker="Serve"
        word="Submit"
        title="Contribute what you know. One door, and a person on the other side of it."
        standfirst="This is the Serve pillar in practice — contributing knowledge, opportunities and connections that strengthen the wider Yoga ecosystem. There is one submission engine, with a form for each kind of thing you can share."
        crumbs={[{ label: "Home", href: "/" }, { label: "Submit" }]}
      />

      {/* S2 — what you can share */}
      <section className="g-paper section">
        <div className="shell">
          <SectionLabel>What you can share</SectionLabel>
          <p className="t-lead mt-8 mb-0 measure-wide">
            Four contributions, each with a home. Knowing where a submission ends up, before you fill anything
            in, is the most useful thing this page can tell you.
          </p>
          <div className="mt-12 grid gap-0">
            {ROUTES.map((r, i) => (
              <Reveal as="div" key={r.href} delay={i * 60}>
                <Link
                  href={r.href}
                  className="index-row group block border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                >
                  <div className="grid grid-cols-1 items-baseline gap-x-10 gap-y-4 py-8 md:grid-cols-[minmax(0,20rem)_1fr_auto]">
                    <div>
                      <h2 className="t-display-m m-0">
                        <span className="link-rule">{r.label}</span>
                      </h2>
                      <p className="t-small mt-3 mb-0 opacity-70 measure">{r.blurb}</p>
                    </div>
                    <div>
                      <p className="t-label m-0 opacity-55">Goes to {r.goesTo}</p>
                      <p className="t-body mt-2 mb-0 measure">{r.becomes}</p>
                    </div>
                    <div className="md:pt-1">
                      <Badge badge={r.badge} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="t-small mt-8 mb-0 opacity-70">
            Two further contributions live elsewhere: applying for a{" "}
            <Link href="/connect/directory" className="link-rule">
              teacher directory profile
            </Link>{" "}
            is reviewed for verification, and joining as a Member starts on the{" "}
            <Link href="/join" className="link-rule">
              Join the Sangha
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* S3 — the badges */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>What your submission becomes</SectionLabel>
          <h2 className="t-display-m mt-6 mb-0 measure-tight">
            Every published item carries a badge that states what it is — and what it is not.
          </h2>
          <p className="t-body mt-6 mb-0 measure">
            We never blur these categories. A submitted external retreat is a Curated Community Listing, not a
            Yoga Mandala programme. You see the badge that will apply before you submit.
          </p>
          <dl className="mt-12 grid gap-0">
            {(Object.keys(BADGE_MEANING) as BadgeType[]).map((b, i) => (
              <Reveal
                as="div"
                key={b}
                delay={i * 60}
                className="grid grid-cols-1 items-baseline gap-x-10 gap-y-3 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-6 last:border-b md:grid-cols-[minmax(0,20rem)_1fr]"
              >
                <dt>
                  <Badge badge={b} />
                </dt>
                <dd className="t-body m-0 measure">{BADGE_MEANING[b]}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* S4 — what happens after you submit */}
      <section className="g-indigo-deep section">
        <div className="shell">
          <SectionLabel>What happens after you submit</SectionLabel>
          <h2 className="t-display-m mt-6 mb-0 measure-tight">
            Nothing is published automatically. Everything is read by a person.
          </h2>
          <ol
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 p-0"
            style={{ listStyle: "none" }}
          >
            {LIFECYCLE.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="t-label border border-[color-mix(in_srgb,var(--color-paper)_28%,transparent)] px-3 py-[5px]">
                  {step}
                </span>
                {i < LIFECYCLE.length - 1 && (
                  <span aria-hidden style={{ color: "var(--color-brass)" }}>
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <p className="t-label mb-6 opacity-55">Reviewed against</p>
            <dl className="grid gap-0">
              {CRITERIA.map((c, i) => (
                <Reveal
                  as="div"
                  key={c.term}
                  delay={i * 60}
                  className="grid grid-cols-1 items-baseline gap-x-10 gap-y-2 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-5 last:border-b md:grid-cols-[minmax(0,16rem)_1fr]"
                >
                  <dt className="t-title">{c.term}</dt>
                  <dd className="t-body m-0 measure">{c.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <p className="t-small mt-10 mb-0 opacity-70">
            Submissions are read against the{" "}
            <Link href="/guidelines" className="link-rule">
              Community Guidelines
            </Link>{" "}
            and the{" "}
            <Link href="/about/principles" className="link-rule">
              principles we hold
            </Link>
            . Confirmation never promises publication — review may ask for changes, or decline.
          </p>
          <div className="mt-8">
            <ArrowLink href="/guidelines" className="text-[var(--color-paper)]">
              Read what we publish and what we don&rsquo;t
            </ArrowLink>
          </div>
        </div>
      </section>

      <ClosingBand
        lead="Pick the door that fits what you have to share."
        links={[
          { label: "An event", href: "/submit/event" },
          { label: "A learning opportunity", href: "/submit/learning-opportunity" },
          { label: "A resource", href: "/submit/resource" },
          { label: "A community listing", href: "/submit/listing" },
        ]}
      />
    </>
  );
}
