import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBulletin, getBulletinEntry } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return getBulletin().map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBulletinEntry(params.slug);
  if (!b) return { title: "Bulletin entry" };
  return { title: b.title, description: b.description };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BulletinDetail({ params }: { params: { slug: string } }) {
  const b = getBulletinEntry(params.slug);
  if (!b) notFound();

  return (
    <>
      <PageHeader label={`Bulletin · ${b.category}`} title={b.title}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge origin={b.origin} />
          {b.sample && <SampleTag />}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="measure-wide">
          <p className="text-lead text-bark-soft">{b.description}</p>

          <dl className="mt-10 border-t rule-gold text-small">
            {[
              ["Category", b.category],
              ["Submitted by", b.submitter],
              ["Open until", formatDate(b.expiry)],
              ["Source", b.source.name],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b rule-gold py-3">
                <dt className="section-label">{k}</dt>
                <dd className="text-right text-bark">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <ButtonLink href={b.source.url} variant="solid">
              Visit the organiser ↗
            </ButtonLink>
            <p className="mt-3 text-small text-bark-soft">
              This is an external offering. Yoga Mandala has curated it for relevance but does not
              organise or endorse it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
