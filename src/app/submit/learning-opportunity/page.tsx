import type { Metadata } from "next";
import Link from "next/link";
import { Badge, SectionLabel, ArrowLink } from "@/components/ui";
import { PageMasthead } from "@/components/page";
import { SubmitForm, type FieldGroup } from "@/components/submit/SubmitForm";

export const metadata: Metadata = {
  title: "Submit a learning opportunity",
  description:
    "Suggest a programme, retreat, training, book or piece of research for the Curation & Learning Bulletin. It becomes a Curated Community Listing — selected for relevance, not a Yoga Mandala programme.",
};

const GROUPS: FieldGroup[] = [
  {
    legend: "Your details",
    fields: [
      { kind: "text", name: "name", label: "Your name", required: true, autoComplete: "name", span: "half" },
      { kind: "email", name: "email", label: "Your email", required: true, autoComplete: "email", span: "half" },
    ],
  },
  {
    legend: "The opportunity",
    fields: [
      { kind: "text", name: "title", label: "Title", required: true },
      {
        kind: "select",
        name: "category",
        label: "Category",
        required: true,
        span: "half",
        options: [
          { value: "programme", label: "Programme" },
          { value: "workshop", label: "Workshop" },
          { value: "retreat", label: "Retreat" },
          { value: "teacher-training", label: "Teacher training" },
          { value: "book", label: "Book" },
          { value: "research", label: "Research" },
          { value: "event", label: "Event" },
        ],
      },
      { kind: "text", name: "location", label: "Location", hint: "City, or 'Online'.", span: "half" },
    ],
  },
  {
    legend: "The source",
    note: "The Bulletin always attributes the organisation behind an offering.",
    fields: [
      { kind: "text", name: "organisation", label: "Source organisation", required: true, span: "half" },
      { kind: "url", name: "sourceUrl", label: "Link to the source", required: true, span: "half" },
      {
        kind: "date",
        name: "expiry",
        label: "Expires on",
        hint: "When this stops being relevant, so it can be archived.",
        span: "half",
      },
    ],
  },
  {
    legend: "Why it belongs here",
    fields: [
      {
        kind: "textarea",
        name: "note",
        label: "Curator note — why it is relevant",
        hint: "A short, honest note on why the community should know about this. This is what a reader sees. Not marketing copy.",
        required: true,
      },
    ],
  },
];

export default function SubmitLearningOpportunityPage() {
  return (
    <>
      <PageMasthead
        kicker="Submit · A learning opportunity"
        word="Learn"
        title="Point the community at something worth learning from."
        standfirst="A programme, retreat, training, book or piece of research. Once reviewed, it appears in the Curation & Learning Bulletin as a Curated Community Listing."
        crumbs={[{ label: "Submit", href: "/submit" }, { label: "A learning opportunity" }]}
      />

      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Before you begin</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              This becomes a Curated Community Listing — an external opportunity selected for relevance. It is
              reviewed, and it is explicitly <em>not</em> a Yoga Mandala programme. The badge below carries that
              distinction wherever the listing appears.
            </p>
            <div className="mt-6">
              <Badge badge="curated-community-listing" />
            </div>
            <p className="t-small mt-6 mb-0 opacity-70">
              Selection is not endorsement. We list what is relevant; we do not vouch for every detail of an
              external offering.
            </p>
            <div className="mt-8">
              <ArrowLink href="/learn/bulletin">See the Bulletin</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SubmitForm kind="learning-opportunity" groups={GROUPS} />
          </div>
        </div>
      </section>

      <section className="g-indigo-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>After you submit</SectionLabel>
          <p className="t-body mt-6 mb-0 measure">
            A curator reviews the suggestion against relevance, accuracy, presentation and community fit. If it
            is listed, it appears clearly attributed to its source. Nothing is published automatically, and a
            listing is never presented as ours. Read how curation works on the{" "}
            <Link href="/submit" className="link-rule">
              submission hub
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
