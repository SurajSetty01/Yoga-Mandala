import type { Metadata } from "next";
import Link from "next/link";
import { Badge, SectionLabel, ArrowLink } from "@/components/ui";
import { PageMasthead } from "@/components/page";
import { SubmitForm, type FieldGroup } from "@/components/submit/SubmitForm";
import { EVENT_TYPE_LABEL, AUDIENCE_LABEL, type EventType, type Audience } from "@/content/types";

export const metadata: Metadata = {
  title: "Submit an event",
  description:
    "Submit a meetup, workshop, study circle or conversation for the Events listing. Every submission is reviewed by a person before it is published. Yoga Mandala does not automatically endorse submitted events.",
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
    legend: "The event",
    fields: [
      { kind: "text", name: "title", label: "Event title", required: true },
      {
        kind: "select",
        name: "eventType",
        label: "Event type",
        required: true,
        span: "half",
        options: (Object.keys(EVENT_TYPE_LABEL) as EventType[]).map((k) => ({
          value: k,
          label: EVENT_TYPE_LABEL[k],
        })),
      },
      {
        kind: "select",
        name: "audience",
        label: "Audience",
        required: true,
        span: "half",
        options: (Object.keys(AUDIENCE_LABEL) as Audience[]).map((k) => ({
          value: k,
          label: AUDIENCE_LABEL[k],
        })),
      },
      { kind: "text", name: "host", label: "Host name", hint: "Person or organisation running it.", required: true },
    ],
  },
  {
    legend: "When",
    fields: [
      { kind: "date", name: "date", label: "Date", required: true, span: "half" },
      { kind: "time", name: "time", label: "Start time", required: true, span: "half" },
      {
        kind: "text",
        name: "timezone",
        label: "Timezone",
        hint: "e.g. IST, GMT+5:30.",
        required: true,
        span: "half",
      },
    ],
  },
  {
    legend: "Where",
    note: "Give a venue and city for an in-person event, or the platform for an online one.",
    fields: [
      { kind: "text", name: "venue", label: "Venue", hint: "Leave blank if online.", span: "half" },
      { kind: "text", name: "city", label: "City", span: "half" },
      { kind: "text", name: "platform", label: "Online platform", hint: "e.g. Zoom. Leave blank if in person.", span: "half" },
    ],
  },
  {
    legend: "Attending",
    fields: [
      {
        kind: "select",
        name: "fee",
        label: "Fee",
        required: true,
        span: "half",
        options: [
          { value: "free", label: "Free" },
          { value: "contribution", label: "By contribution" },
          { value: "paid", label: "Paid" },
        ],
      },
      {
        kind: "text",
        name: "amount",
        label: "Amount, if paid",
        hint: "Include the currency, e.g. ₹800.",
        span: "half",
      },
      { kind: "url", name: "registration", label: "Registration link", hint: "Where people sign up." },
      {
        kind: "textarea",
        name: "description",
        label: "Description",
        hint: "What happens, who it is for, what to bring. Plain and complete, not promotional.",
        required: true,
      },
    ],
  },
];

export default function SubmitEventPage() {
  return (
    <>
      <PageMasthead
        kicker="Submit · An event"
        word="Event"
        title="Submit an event for the community's calendar."
        standfirst="A meetup, workshop, study circle or conversation. Once reviewed, it appears in Events with a badge that states what kind of event it is."
        crumbs={[{ label: "Submit", href: "/submit" }, { label: "An event" }]}
      />

      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Before you begin</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              Your event will be listed as a member contribution. Yoga Mandala does not automatically endorse
              submitted events — the badge below makes that clear to everyone who reads the listing.
            </p>
            <div className="mt-6">
              <Badge badge="community-listing" />
            </div>
            <p className="t-small mt-6 mb-0 opacity-70">
              A partner or an event we organise carries a different badge, decided at review.
            </p>
            <div className="mt-8">
              <ArrowLink href="/guidelines">What we publish</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SubmitForm kind="event" groups={GROUPS} />
          </div>
        </div>
      </section>

      <section className="g-indigo-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>After you submit</SectionLabel>
          <p className="t-body mt-6 mb-0 measure">
            The event enters review, where it is checked for relevance, accuracy, presentation and community
            fit. You may be asked for changes. Nothing is published automatically. See the full lifecycle on
            the{" "}
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
