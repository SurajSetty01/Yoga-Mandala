import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArtPlate } from "@/components/ui/Plate";
import { SampleTag } from "@/components/ui/SampleTag";
import { Reveal } from "@/lib/motion/Reveal";
import { getPeople } from "@/lib/content";
import { TRADITIONS, AREAS_OF_TEACHING, FORMATS } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Find fellow teachers and practitioners. Search the directory by tradition, place and more — a doorway into the community's core asset.",
};

/**
 * Connect hub — a doorway, not a landing page to be admired. Its one job is to get people into
 * the directory fast. Embedded filter chips link straight to a pre-filtered directory (one
 * click). The non-endorsement caveat (§7.2) is given real prominence, not fine print.
 */
export default function ConnectHub() {
  const people = getPeople();
  const previews = people.slice(0, 3);

  return (
    <>
      <PageHeader
        label="Connect"
        title="People, and the relationships between them."
        standfirst="The directory is the community's core long-term asset. This page has one job: help you find a relevant teacher quickly. Choose a starting point below and go straight to the results."
      />

      {/* S2 · Embedded filters — one click to a pre-filtered directory */}
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="rounded-[4px] bg-sand-deep p-8 sm:p-10">
          <SectionLabel>Start here</SectionLabel>

          <div className="mt-6 space-y-6">
            <FilterRow title="By tradition" params={TRADITIONS.slice(0, 6)} keyName="tradition" />
            <FilterRow title="By what they teach" params={AREAS_OF_TEACHING.slice(0, 6)} keyName="area" />
            <div>
              <p className="section-label mb-3 text-bark-soft">By format</p>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((f) => (
                  <Link
                    key={f.value}
                    href={`/connect/directory?format=${f.value}`}
                    className="inline-flex min-h-[40px] items-center rounded-full border border-bark/25 px-4 py-1.5 text-small text-bark transition-colors duration-fast hover:border-forest hover:text-forest"
                  >
                    {f.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/connect/directory"
            className="group mt-8 inline-flex items-center gap-2 text-small text-forest"
          >
            Or browse the whole directory
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* S3 · Previewed teachers — editorial fragments, unequal, not a card row */}
      <section className="mx-auto max-w-content px-6 pb-section-sm">
        <SectionLabel>A few from the directory</SectionLabel>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {previews.map((p, i) => (
            <li key={p.slug} className={i === 1 ? "md:mt-12" : i === 2 ? "md:mt-6" : ""}>
              <Reveal delay={i * 60}>
                <Link href={`/connect/directory/${p.slug}`} className="group block">
                  <ArtPlate variant="portrait" label={`Placeholder portrait for ${p.name}`} ratio={i === 0 ? "4 / 5" : "1 / 1"} />
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                      {p.name}
                    </h2>
                    {p.sample && <SampleTag />}
                  </div>
                  <p className="mt-1 text-small text-bark-soft">
                    {p.location} · {p.traditions[0]}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* S4 · Experts + non-endorsement caveat (DARK, prominent) */}
      <section className="bg-forest-deep py-section text-sand">
        <div className="mx-auto grid max-w-content gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionLabel tone="sand">The expert network</SectionLabel>
            <h2 className="mt-4 font-display text-display-m">
              Members willing to go a little further.
            </h2>
            <p className="measure mt-6 text-body text-sand/85">
              A curated list of experienced members willing to contribute to Q&amp;A, study
              circles, expert conversations or mentoring.
            </p>
            <Link href="/connect/experts" className="group mt-8 inline-flex items-center gap-2 text-small text-sand/90">
              See the experts
              <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
            </Link>
          </div>
          {/* Caveat at equal weight, not fine print */}
          <div className="border-l border-gold/50 pl-6">
            <p className="section-label text-sand/60">A word on verification</p>
            <p className="measure mt-4 text-lead text-sand/90">
              Verification is transparent and does not imply blanket endorsement. Being listed
              means the submitted information was reviewed against published criteria — nothing more.
            </p>
          </div>
        </div>
      </section>

      {/* S5 · Join */}
      <section className="bg-sand-deep py-section-sm">
        <div className="mx-auto max-w-content px-6 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-display-m">
            Membership is a profile, participation, and a place to contribute.
          </h2>
          <Link href="/join" className="group mt-8 inline-flex items-center gap-2 text-small text-forest">
            Join the Sangha
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function FilterRow({
  title,
  params,
  keyName,
}: {
  title: string;
  params: readonly string[];
  keyName: string;
}) {
  return (
    <div>
      <p className="section-label mb-3 text-bark-soft">{title}</p>
      <div className="flex flex-wrap gap-2">
        {params.map((v) => (
          <Link
            key={v}
            href={`/connect/directory?${keyName}=${encodeURIComponent(v)}`}
            className="inline-flex min-h-[40px] items-center rounded-full border border-bark/25 px-4 py-1.5 text-small text-bark transition-colors duration-fast hover:border-forest hover:text-forest"
          >
            {v}
          </Link>
        ))}
      </div>
    </div>
  );
}
