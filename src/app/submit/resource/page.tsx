import type { Metadata } from "next";
import Link from "next/link";
import { Badge, SectionLabel, ArrowLink } from "@/components/ui";
import { PageMasthead } from "@/components/page";
import { SubmitForm, type FieldGroup } from "@/components/submit/SubmitForm";
import { LIBRARY_SUBJECTS, AUDIENCE_LABEL, type Audience } from "@/content/types";

export const metadata: Metadata = {
  title: "Submit a resource",
  description:
    "Suggest a text, commentary, article or recording for the Library. We link to resources where they already live — we never host files. Source and rights information is required.",
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
    legend: "The resource",
    fields: [
      { kind: "text", name: "title", label: "Title", required: true, span: "half" },
      { kind: "text", name: "author", label: "Author", required: true, span: "half" },
      {
        kind: "select",
        name: "subject",
        label: "Subject",
        required: true,
        span: "half",
        options: LIBRARY_SUBJECTS.map((s) => ({ value: s, label: s })),
      },
      {
        kind: "select",
        name: "level",
        label: "Level",
        required: true,
        span: "half",
        options: (Object.keys(AUDIENCE_LABEL) as Audience[]).map((k) => ({
          value: k,
          label: AUDIENCE_LABEL[k],
        })),
      },
      {
        kind: "text",
        name: "tradition",
        label: "Tradition or context",
        hint: "The lineage, school or context this belongs to.",
      },
      {
        kind: "textarea",
        name: "description",
        label: "Description",
        hint: "What it is, and why it is worth a reader's time.",
        required: true,
      },
    ],
  },
  {
    legend: "Source and rights — required",
    note: "We catalogue and link; we never host files. A resource cannot be listed without a clear, lawful source and its rights stated. This is checked at entry, not left to review.",
    fields: [
      { kind: "text", name: "sourceName", label: "Source name", hint: "Publisher, archive, journal or site.", required: true, span: "half" },
      { kind: "url", name: "sourceUrl", label: "Link to the resource", hint: "Where it already lives.", required: true, span: "half" },
      {
        kind: "textarea",
        name: "rights",
        label: "Rights information",
        hint: "How this may lawfully be shared — public domain, open access, licence held, permission granted. Required.",
        required: true,
      },
    ],
  },
];

export default function SubmitResourcePage() {
  return (
    <>
      <PageMasthead
        kicker="Submit · A resource"
        word="Library"
        title="Add a text, commentary or study to the Library."
        standfirst="The Library is a catalogue, not a file store. You submit a link and its details; once reviewed, it becomes a catalogue record that points to where the resource already lives."
        crumbs={[{ label: "Submit", href: "/submit" }, { label: "A resource" }]}
      />

      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Before you begin</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              Two rules shape this form. First, we link only — we never upload or host files. Second, source and
              rights information is required, so nothing enters the Library without a lawful basis for sharing
              it.
            </p>
            <div className="mt-6">
              <Badge badge="curated-community-listing" />
            </div>
            <p className="t-small mt-6 mb-0 opacity-70">
              Respecting copyright is a condition of the catalogue, not an afterthought at review.
            </p>
            <div className="mt-8">
              <ArrowLink href="/learn/library">Browse the Library</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SubmitForm kind="resource" groups={GROUPS} />
          </div>
        </div>
      </section>

      <section className="g-indigo-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>After you submit</SectionLabel>
          <p className="t-body mt-6 mb-0 measure">
            A reviewer confirms the resource is relevant, well described and lawfully shareable before it is
            catalogued. Anything without clear rights is declined rather than risked. Read the standards on the{" "}
            <Link href="/guidelines" className="link-rule">
              Community Guidelines
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
