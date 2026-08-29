import type { Metadata } from "next";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, SampleMark, SectionLabel } from "@/components/ui";
import { ClosingBand } from "@/components/page";
import { PEOPLE } from "@/content/samples";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Find fellow teachers, practitioners and experts. A directory organised by place, tradition and practice — built to help you find the right person quickly.",
};

const FILTERS: { legend: string; options: { label: string; q: string }[] }[] = [
  {
    legend: "Tradition",
    options: [
      { label: "Ashtanga Vinyasa", q: "tradition=ashtanga" },
      { label: "Krishnamacharya lineage", q: "tradition=krishnamacharya" },
      { label: "Iyengar-influenced", q: "tradition=iyengar" },
      { label: "Classical Haṭha", q: "tradition=hatha" },
    ],
  },
  {
    legend: "Format",
    options: [
      { label: "Online", q: "format=online" },
      { label: "Offline", q: "format=offline" },
      { label: "Both", q: "format=both" },
    ],
  },
  {
    legend: "Role",
    options: [
      { label: "Teacher", q: "role=teacher" },
      { label: "Therapist", q: "role=therapist" },
      { label: "Researcher", q: "role=researcher" },
    ],
  },
];

export default function ConnectHubPage() {
  const strips = PEOPLE.filter((p) => p.plate).slice(0, 5);
  const previews = PEOPLE.slice(0, 3);
  const count = PEOPLE.length;

  return (
    <>
      {/* S1 — faces at scale, CONNECT crossing in front */}
      <header className="g-paper relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden className="absolute inset-x-0 bottom-0 top-24 opacity-70">
          <div className="shell flex h-full items-end gap-4 md:gap-6">
            {strips.map((p, i) => (
              <div
                key={p.slug}
                className="flex-1"
                style={{ transform: `translateY(${[0, -40, 24, -16, 40][i] ?? 0}px)` }}
              >
                <Plate spec={{ subject: p.plate!.subject, tone: "indigo" }} ratio="2 / 5" sizes="18vw" showCaption={false} />
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 overflow-hidden">
          <div className="shell">
            <span
              className="block leading-[0.78]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 21vw, 20rem)",
                color: "transparent",
                WebkitTextStroke: "1px color-mix(in srgb, var(--color-brass) 55%, transparent)",
                letterSpacing: "-0.05em",
              }}
            >
              CONNECT
            </span>
          </div>
        </div>
        <div className="shell relative">
          <div className="max-w-3xl">
            <SectionLabel>People and relationships</SectionLabel>
            <h1 className="t-display-xl mt-7 mb-0">Find the right person, quickly.</h1>
            <p className="t-lead mt-7 mb-0 measure-wide">
              A community is only as useful as the connections you can actually make in it. This is where you find
              a teacher to learn from, a collaborator to build with, or an expert to ask.
            </p>
          </div>
        </div>
      </header>

      {/* S2 — the search, embedded */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>Find a teacher</SectionLabel>
          <p className="t-body mt-6 mb-10 measure">
            Start from any of these and land straight in a filtered directory. Or open the directory and search.
          </p>
          <div className="grid gap-8">
            {FILTERS.map((f) => (
              <div key={f.legend} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="t-label w-full opacity-50 md:w-28">{f.legend}</span>
                {f.options.map((o) => (
                  <Link
                    key={o.label}
                    href={`/connect/directory?${o.q}`}
                    className="t-label border border-[color-mix(in_srgb,var(--color-ink)_22%,transparent)] px-3 py-[6px] transition-colors hover:border-[var(--color-indigo)] hover:bg-[var(--color-indigo)] hover:text-[var(--color-paper)]"
                  >
                    {o.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ArrowLink href="/connect/directory">Open the full directory</ArrowLink>
          </div>
        </div>
      </section>

      {/* S3 — directory previewed, unequal editorial fragments */}
      <section className="g-paper section">
        <div className="shell">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <SectionLabel>From the directory</SectionLabel>
            <p className="t-label opacity-60">
              {count} profiles listed <SampleMark className="ml-2" />
            </p>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            {previews.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 100}
                className={i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-4 lg:pt-16" : "lg:col-span-3 lg:pt-8"}
              >
                <Link href={`/connect/directory/${p.slug}`} className="group block">
                  <Plate
                    spec={p.plate ?? { subject: `Portrait — ${p.tradition}`, tone: "indigo" }}
                    ratio={i === 0 ? "4 / 5" : "3 / 4"}
                    sizes="(max-width:1024px) 90vw, 30vw"
                    showCaption={false}
                  />
                  <h3 className="t-title mt-4 mb-0">
                    <span className="link-rule">{p.name}</span>
                  </h3>
                  <p className="t-label mt-2 mb-0 opacity-65">
                    {p.tradition} · {p.location.city} · {p.experience}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* S4 — experts */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Plate
              spec={{ subject: "Two teachers in conversation after a session, seated on the floor", tone: "indigo" }}
              ratio="4 / 3"
              sizes="(max-width:1024px) 100vw, 48vw"
              showCaption={false}
            />
          </div>
          <div className="lg:col-span-6 lg:pt-6">
            <SectionLabel>Experts</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">Members who offer their time.</h2>
            <p className="t-body mt-6 mb-0 measure">
              A curated list of experienced members willing to contribute to Q&amp;A, study circles, expert
              conversations or mentoring.
            </p>
            <p className="t-small mt-6 mb-0 measure" style={{ opacity: 0.9 }}>
              <strong>Verification is transparent, and does not imply blanket endorsement.</strong> Being listed
              here means someone has offered to help — nothing more, and nothing less.
            </p>
            <div className="mt-8">
              <ArrowLink href="/connect/experts">The experts</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <ClosingBand
        lead="Membership is a profile, participation and a place to be found."
        sub="Joining lists you in the directory, lets you register for events, and lets you submit to the community."
        links={[
          { label: "Join the Sangha", href: "/join" },
          { label: "The directory", href: "/connect/directory" },
        ]}
      />
    </>
  );
}
