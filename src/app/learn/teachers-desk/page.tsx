import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { PageMasthead } from "@/components/page";

export const metadata: Metadata = {
  title: "Teacher's Desk",
  description:
    "A forthcoming space for knowledge and discussion between teachers. This page describes what it will be — the feature is not open yet.",
};

const SUBJECTS = [
  "Teaching methodology",
  "Asana and sequencing",
  "Anatomy and biomechanics",
  "Yoga therapy",
  "Pranayama",
  "Philosophy and texts",
  "Ayurveda",
  "Teaching ethics",
  "Student management",
  "Professional development",
  "Career and community building",
  "Practice and self-study",
];

const CLAIMS = [
  { term: "Personal experience", body: "What has worked, or not worked, in this teacher's own practice or room." },
  { term: "Professional opinion", body: "A considered view, offered as a view — not as settled fact." },
  { term: "Traditional interpretation", body: "What a lineage or text holds, attributed to that source." },
  { term: "Evidence-supported information", body: "Claims that can be traced to research, cited plainly." },
];

export default function TeachersDeskPage() {
  return (
    <>
      <PageMasthead
        kicker="Forthcoming"
        word="Desk"
        title="A structured alternative to letting teacher discussions vanish in WhatsApp."
        standfirst="Teacher's Desk will be a space for knowledge and discussion between teachers. It is a real plan — the sections below describe it honestly — but it is not open yet. We are not going to fake a forum."
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "Teacher's Desk" }]}
      />

      {/* S2 — the twelve subjects */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>What it will hold</SectionLabel>
          <ol
            className="mt-10 grid gap-x-16 gap-y-0 md:grid-cols-2"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {SUBJECTS.map((s, i) => (
              <Reveal
                as="li"
                key={s}
                delay={(i % 6) * 50}
                className="flex items-baseline gap-4 border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] py-4"
              >
                <span className="tabnum t-label opacity-50">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-title">{s}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* S3 — Ask the Sangha */}
      <section className="g-paper section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Ask the Sangha</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">How it will work</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="t-body mt-0 mb-0 measure">
              Members will submit questions; qualified members will respond. Valuable discussions can later be
              curated into knowledge-base articles, after review. There is no interface to show yet, because the
              decisions that shape it — who counts as qualified, how answers are moderated — have not been made.
              We will not mock up a screen that implies otherwise.
            </p>
          </div>
        </div>
      </section>

      {/* S4 — the claims standard */}
      <section className="g-indigo-deep section">
        <div className="shell">
          <SectionLabel>The standard answers will be held to</SectionLabel>
          <h2 className="t-display-m mt-6 mb-0 measure-tight">
            The difference between this and every other yoga forum is that answers will state what kind of claim
            they are.
          </h2>
          <dl className="mt-12 grid gap-0">
            {CLAIMS.map((c, i) => (
              <Reveal
                as="div"
                key={c.term}
                delay={i * 70}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-7 last:border-b md:grid-cols-[5rem_minmax(0,22rem)_1fr] md:gap-10"
              >
                <dt className="tabnum" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-brass)" }}>
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dt className="t-title">{c.term}</dt>
                <dd className="t-body m-0">{c.body}</dd>
              </Reveal>
            ))}
          </dl>
          <div className="mt-10 border border-[color-mix(in_srgb,var(--color-paper)_28%,transparent)] p-6">
            <p className="t-label m-0 opacity-60">A caution we will keep</p>
            <p className="t-body mt-3 mb-0 measure">
              Therapeutic and medical claims require appropriate care and must never be presented as diagnosis or
              medical advice. This holds whether or not the feature is live.
            </p>
          </div>
        </div>
      </section>

      {/* S5 — when */}
      <section className="g-paper section">
        <div className="shell max-w-3xl">
          <SectionLabel>When</SectionLabel>
          <p className="t-body mt-6 mb-0 measure">
            This is planned for a later phase, once the community&rsquo;s habit of careful moderation is
            established on smaller things first. We are not promising a date — a missed date would be worse than
            none. In the meantime, the{" "}
            <Link href="/collaborate" className="link-rule">
              Sangha Board
            </Link>{" "}
            and the{" "}
            <Link href="/learn/bulletin" className="link-rule">
              Bulletin
            </Link>{" "}
            are open.
          </p>
        </div>
      </section>
    </>
  );
}
