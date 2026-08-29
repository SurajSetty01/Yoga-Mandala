import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArtPlate } from "@/components/ui/Plate";

export const metadata: Metadata = {
  title: "Teacher's Desk",
  description:
    "A forthcoming place for teachers to ask and answer among themselves, with a moderator reading every exchange before it appears.",
};

/**
 * Teacher's Desk — a concept page, not a forum. Honest about being forthcoming: no fake
 * "coming soon" countdown, no email capture. It describes what the space will be and the kinds
 * of questions it will hold, and why it opens after the community's moderation habit is proven.
 */
const TOPICS = [
  "Teaching methodology and sequencing",
  "Adapting practice for different bodies and needs",
  "Philosophy and reading the source texts",
  "Anatomy and safe adjustment",
  "Prāṇāyāma and meditation instruction",
  "The ethics and business of teaching",
  "Working with beginners",
  "Yoga in therapeutic contexts",
  "Sanskrit and terminology",
  "Continuing one's own study",
  "Difficult situations in the room",
  "Building a sustainable teaching life",
];

export default function TeachersDeskPage() {
  return (
    <>
      <PageHeader
        label="Learning · Teacher's Desk"
        title="A place for teachers' questions. Forthcoming."
        standfirst="A space where teachers ask and answer among themselves — with a moderator reading every question and every answer before it appears. It is a real plan, and it opens deliberately: after the community's moderation habit is established on simpler submissions, not before."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
          <div>
            <SectionLabel>What it will hold</SectionLabel>
            <p className="measure mt-5 text-body text-bark-soft">
              The kinds of questions teachers actually carry — practical, textual, ethical. Not a
              social feed, not a comment thread; a considered, moderated exchange that becomes a
              lasting resource.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {TOPICS.map((t) => (
                <li key={t} className="border-b rule-gold py-2 text-small text-bark">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-56 lg:w-full">
            <ArtPlate variant="study" label="A quiet desk, forthcoming" ratio="4 / 5" />
          </div>
        </div>

        <div className="mt-section-sm border-t rule-gold pt-10">
          <div className="measure-wide">
            <SectionLabel>Why it waits</SectionLabel>
            <p className="mt-5 text-lead text-bark-soft">
              A moderated forum is inexpensive to build and expensive to run — every post is read
              by a person before it appears. Opening it on day one, with no traffic, would make it
              look abandoned. So it follows the rest: prove the habit on submissions first, then
              open the desk.
            </p>
            <p className="mt-6 text-small text-bark-soft">
              In the meantime, the{" "}
              <Link href="/learn/reading-circle" className="underline decoration-gold underline-offset-4 hover:text-terracotta">
                Reading Circle
              </Link>{" "}
              and{" "}
              <Link href="/events" className="underline decoration-gold underline-offset-4 hover:text-terracotta">
                events
              </Link>{" "}
              are where teachers gather to think together.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
