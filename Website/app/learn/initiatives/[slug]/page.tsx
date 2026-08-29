import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInitiative, getInitiatives } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { ArtPlate } from "@/components/ui/Plate";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return getInitiatives().map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const i = getInitiative(params.slug);
  if (!i) return { title: "Initiative" };
  return { title: i.title, description: i.description };
}

export default function InitiativeDetail({ params }: { params: { slug: string } }) {
  const it = getInitiative(params.slug);
  if (!it) notFound();

  const meta: [string, string][] = [
    ["Type", it.initiativeType],
    ["Facilitator", it.facilitator],
    ["Schedule", `${it.schedule} · ${it.timezone}`],
    ["Format", it.format === "hybrid" ? "Online & in person" : it.format === "online" ? "Online" : "In person"],
    ["Fee", it.fee],
    ["Audience", it.audience],
  ];

  return (
    <>
      <PageHeader label="Learning · Initiative" title={it.title}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge origin={it.origin} />
          {it.sample && <SampleTag />}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.6fr_0.4fr]">
          <div>
            <p className="measure text-lead text-bark-soft">{it.description}</p>
            {it.facilitatorNote && (
              <p className="mt-6 text-small text-bark-soft">
                <span className="section-label">Facilitator</span> {it.facilitatorNote}
              </p>
            )}
            {it.registration && (
              <div className="mt-10">
                <ButtonLink href={it.registration.url} variant="solid">
                  {it.registration.name}
                </ButtonLink>
                <p className="mt-3 text-small text-bark-soft">
                  Registration links out; no payment is taken on this site.
                </p>
              </div>
            )}
          </div>

          <aside>
            <ArtPlate variant="study" label={`Illustration for ${it.title}`} ratio="4 / 5" />
            <dl className="mt-6 border-t rule-gold text-small">
              {meta.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b rule-gold py-2.5">
                  <dt className="section-label">{k}</dt>
                  <dd className="text-right text-bark">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
