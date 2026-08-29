import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource, getResources } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArtPlate } from "@/components/ui/Plate";
import { Caption } from "@/components/ui/Caption";
import { ButtonLink } from "@/components/ui/Button";
import { LEVELS } from "@/lib/taxonomy";

export function generateStaticParams() {
  return getResources().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getResource(params.slug);
  if (!r) return { title: "Resource" };
  return { title: r.title, description: r.description };
}

/**
 * Library detail — a catalogue record treated with the seriousness of one. Framed plate with a
 * real source caption; the §6.3 metadata explicit; rights + a clearly-labelled outbound access
 * link. Related records in the same subject, typographic only.
 */
export default function ResourceDetail({ params }: { params: { slug: string } }) {
  const r = getResource(params.slug);
  if (!r) notFound();

  const levelLabel = LEVELS.find((l) => l.value === r.level)?.label ?? r.level;
  const related = getResources()
    .filter((x) => x.subject === r.subject && x.slug !== r.slug)
    .slice(0, 4);

  return (
    <>
      <PageHeader label={`Library · ${r.subject}`} title={r.title}>
        <p className="mt-4 text-body text-bark-soft">{r.author}</p>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <figure className="mx-auto max-w-xs lg:mx-0">
            <div className="border border-gold/70 p-2">
              <ArtPlate variant="manuscript" label={`Title page of ${r.title}`} ratio="3 / 4" rounded={false} />
            </div>
            <Caption className="mt-3">
              {r.plate?.credit ?? r.author} · {r.rights}
            </Caption>
          </figure>

          <div>
            <p className="measure text-lead text-bark-soft">{r.description}</p>

            <dl className="mt-10 max-w-lg border-t rule-gold text-small">
              {[
                ["Author", r.author],
                ["Subject", r.subject],
                ["Tradition / context", r.tradition],
                ["Recommended level", levelLabel],
                ["Rights", r.rights],
                ["Access", `${r.source.name}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-8 border-b rule-gold py-3">
                  <dt className="section-label whitespace-nowrap">{k}</dt>
                  <dd className="text-right text-bark">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <ButtonLink href={r.source.url} variant="solid" target="_blank" rel="noopener noreferrer">
                Read at {r.source.name} ↗
              </ButtonLink>
              <p className="mt-3 text-small text-bark-soft">
                This opens a legitimate external source. The Library links to texts; it never
                hosts files.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-section-sm border-t rule-gold pt-10">
            <p className="section-label">More in {r.subject}</p>
            <ul className="mt-4">
              {related.map((x) => (
                <li key={x.slug} className="border-b rule-gold">
                  <Link href={`/learn/library/${x.slug}`} className="group flex items-baseline justify-between gap-4 py-3">
                    <span className="font-display text-title transition-colors duration-fast group-hover:text-terracotta">
                      {x.title}
                    </span>
                    <span className="text-small text-bark-soft">{x.author}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
