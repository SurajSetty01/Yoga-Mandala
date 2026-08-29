import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SampleTag } from "@/components/ui/SampleTag";
import { ArtPlate } from "@/components/ui/Plate";
import { getReadingCircle, getResource } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reading Circle",
  description: "A slow, shared reading of one foundational text at a time.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long" });
}

/**
 * Reading Circle — one page: the current text, reading period, facilitator, discussion prompts
 * and meeting date. A layered pair (a text plate behind a gathering plate). References a real
 * public-domain text; the circle details are marked sample.
 */
export default function ReadingCircle() {
  const rc = getReadingCircle();
  const text = getResource(rc.textSlug);

  return (
    <>
      <PageHeader
        label="Learning · Reading Circle"
        title="One text, read slowly, together."
        standfirst="A shared reading of a single foundational text over several weeks — closely, with time for discussion and for what it means in practice."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
          {/* Layered pair */}
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <ArtPlate variant="botanical" label="A gathering around a reading" ratio="4 / 5" />
            <div className="absolute -bottom-8 -right-6 w-2/5 border border-gold/70 p-1.5">
              <ArtPlate variant="manuscript" label={`The current text: ${rc.textTitle}`} ratio="3 / 4" rounded={false} />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel>Currently reading</SectionLabel>
              {rc.sample && <SampleTag />}
            </div>
            <h2 className="mt-3 font-display text-display-m">{rc.textTitle}</h2>
            <p className="mt-2 text-small text-bark-soft">{rc.textEdition}</p>

            <dl className="mt-8 max-w-md border-t rule-gold text-small">
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Reading period</dt>
                <dd className="text-right text-bark">{rc.period}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Facilitator</dt>
                <dd className="text-right text-bark">{rc.facilitator}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Next meeting</dt>
                <dd className="tnum text-right text-bark">{formatDate(rc.meetingDate)}</dd>
              </div>
            </dl>

            {text && (
              <Link href={`/learn/library/${text.slug}`} className="group mt-6 inline-flex items-center gap-2 text-small text-forest">
                The text in the library
                <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Prompts */}
        <div className="mt-section-sm border-t rule-gold pt-10">
          <SectionLabel>Discussion prompts</SectionLabel>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {rc.prompts.map((p, i) => (
              <li key={i} className="border-t-2 border-gold/50 pt-4">
                <span className="font-display text-display-m text-gold/70 tnum">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-body text-bark-soft">{p}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-small text-bark-soft">{rc.note}</p>
        </div>
      </section>
    </>
  );
}
