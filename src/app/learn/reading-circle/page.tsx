import type { Metadata } from "next";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, SampleMark, SectionLabel, longDate, parts } from "@/components/ui";
import { Crumbs } from "@/components/page";
import { READING_CIRCLE } from "@/content/samples";

export const metadata: Metadata = {
  title: "Reading Circle",
  description: "One text, read together, over a season — with a facilitator, a reading schedule and discussion prompts.",
};

function todayFraction(startIso: string, endIso: string) {
  const start = Date.parse(startIso);
  const end = Date.parse(endIso);
  const now = Date.now();
  if (now <= start) return 0;
  if (now >= end) return 1;
  return (now - start) / (end - start);
}

export default function ReadingCirclePage() {
  const rc = READING_CIRCLE;
  const span = { start: Date.parse(rc.period.start), end: Date.parse(rc.period.end) };
  const total = span.end - span.start || 1;
  const nowPct = Math.round(todayFraction(rc.period.start, rc.period.end) * 100);

  return (
    <>
      {/* S1 — the text, at full scale (layered pair) */}
      <header className="g-paper-deep relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <Reveal variant="wipe">
              <Plate
                spec={rc.text.librarySlug ? { subject: rc.text.title, tone: "archive" } : { subject: rc.text.title, tone: "archive" }}
                ratio="3 / 4"
                sizes="(max-width:1024px) 70vw, 34vw"
                priority
              />
            </Reveal>
            <Reveal delay={220} className="absolute -bottom-6 -right-3 w-[46%] md:-right-6">
              <Plate
                spec={{ subject: "A small gathering around a table, one book open, tea", tone: "sage" }}
                ratio="1 / 1"
                sizes="18vw"
                showCaption={false}
              />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Crumbs trail={[{ label: "Learn", href: "/learn" }, { label: "Reading Circle" }]} />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SectionLabel>This season&rsquo;s reading</SectionLabel>
              {rc.sample && <SampleMark />}
            </div>
            <h1 className="t-display-l mt-6 mb-0">{rc.text.title}</h1>
            {rc.text.titleDeva && <p className="t-deva mt-3 mb-0 text-3xl opacity-70">{rc.text.titleDeva}</p>}
            <p className="t-lead mt-6 mb-0">{rc.text.author}</p>
            <p className="t-small mt-2 mb-0 opacity-70">{rc.text.edition}</p>
            <p className="t-label mt-6 mb-0 opacity-70">
              {longDate(rc.period.start)} — {longDate(rc.period.end)}
            </p>
            {rc.text.librarySlug && (
              <div className="mt-6">
                <ArrowLink href={`/learn/library/${rc.text.librarySlug}`}>Read the text in the Library</ArrowLink>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* S2 — the reading period, mapped */}
      <section className="g-paper section">
        <div className="shell">
          <SectionLabel>The season, mapped</SectionLabel>
          <div className="relative mt-16 mb-8 hidden md:block">
            <div className="relative h-px w-full" style={{ background: "color-mix(in srgb, var(--color-brass) 55%, transparent)" }}>
              {/* today marker */}
              <div
                className="absolute -top-2 h-4 w-px"
                style={{ left: `${nowPct}%`, background: "var(--color-clay)" }}
                aria-hidden
              />
              <span
                className="t-label absolute -top-8 -translate-x-1/2 whitespace-nowrap opacity-70"
                style={{ left: `${nowPct}%`, color: "var(--color-clay)" }}
              >
                Today
              </span>
              {rc.milestones.map((m) => {
                const pct = Math.round(((Date.parse(m.date) - span.start) / total) * 100);
                return (
                  <div key={m.label} className="absolute top-0" style={{ left: `${pct}%` }}>
                    <div className="h-3 w-px -translate-x-1/2" style={{ background: "var(--color-brass)" }} aria-hidden />
                    <div className="mt-3 w-40 -translate-x-1/2 text-center">
                      <p className="tabnum m-0" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                        {parts(m.date).day} {parts(m.date).month}
                      </p>
                      <p className="t-label mt-1 mb-0 opacity-65">{m.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* mobile: vertical list */}
          <ol className="mt-8 md:hidden" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rc.milestones.map((m) => (
              <li
                key={m.label}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-l-2 py-3"
                style={{ borderColor: "color-mix(in srgb, var(--color-brass) 55%, transparent)", paddingLeft: "1rem" }}
              >
                <span className="tabnum" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                  {parts(m.date).day} {parts(m.date).month}
                </span>
                <span className="t-small">{m.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* S3 — the facilitator */}
      <section className="g-paper-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="w-40 lg:col-span-3">
            <Plate spec={{ subject: `Portrait — ${rc.facilitator.name}`, tone: "indigo" }} ratio="4 / 5" sizes="160px" showCaption={false} />
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <SectionLabel>The facilitator</SectionLabel>
            <h2 className="t-title mt-5 mb-0">{rc.facilitator.name}</h2>
            <p className="t-body mt-4 mb-0 measure">{rc.facilitator.note}</p>
            {rc.facilitator.directorySlug && (
              <div className="mt-6">
                <ArrowLink href={`/connect/directory/${rc.facilitator.directorySlug}`}>Their directory profile</ArrowLink>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* S4 — discussion prompts as display type */}
      <section className="g-indigo-deep section relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.1]">
          <Plate spec={{ subject: "Manuscript page, low contrast", tone: "indigo" }} ratio="auto" className="!aspect-auto h-full" sizes="100vw" showCaption={false} />
        </div>
        <div className="shell relative">
          <SectionLabel>What we will sit with</SectionLabel>
          <ol className="mt-10" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rc.prompts.map((p, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 80}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-8 last:border-b md:grid-cols-[5rem_1fr]"
              >
                <span className="tabnum" style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-brass)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-display-m">{p}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* S5 — joining */}
      <section className="g-paper section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel>Joining</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              We meet {rc.meeting.format.toLowerCase()} on {longDate(rc.meeting.date)} at {rc.meeting.time}{" "}
              {rc.meeting.timezone}. Come having read the passage, and bring one question. Participation is open
              to members of the Sangha.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link href="/events" className="t-label link-rule">
                See the session in Events
              </Link>
              <Link href="/join" className="t-label link-rule">
                Join the Sangha
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S6 — community reflections, designed not built */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>Community reflections</SectionLabel>
          <div className="mt-8 border border-dashed border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] px-6 py-14 text-center md:py-20">
            <p className="t-label mb-4 opacity-55">Awaiting a product decision</p>
            <p className="t-title m-0 mx-auto max-w-xl">
              This is where members&rsquo; reflections on the text will appear.
            </p>
            <p className="t-small mx-auto mt-5 mb-0 max-w-lg opacity-70">
              We have designed the space, but how reflections are written, reviewed and shown is a decision we
              have not made yet. We would rather leave it visibly empty than fill it with invented quotes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
