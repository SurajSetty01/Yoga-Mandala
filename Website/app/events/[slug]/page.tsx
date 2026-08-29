import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent, getEvents } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { ArtPlate } from "@/components/ui/Plate";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEvent(params.slug);
  if (!e) return { title: "Event" };
  return { title: e.title, description: e.description };
}

function longDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetail({ params }: { params: { slug: string } }) {
  const e = getEvent(params.slug);
  if (!e) notFound();
  const isPartner = e.origin === "partner_guest";

  return (
    <>
      <PageHeader label={`Events · ${e.category}`} title={e.title}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge origin={e.origin} />
          {e.sample && <SampleTag />}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-12 lg:grid-cols-[0.6fr_0.4fr]">
          <div>
            <p className="tnum font-display text-display-m">{longDate(e.date)}</p>
            <p className="mt-2 text-lead text-bark-soft tnum">
              {e.time} · {e.online ? e.location : e.location}
            </p>

            <p className="measure mt-8 text-lead text-bark-soft">{e.description}</p>

            {e.registration && (
              <div className="mt-10">
                <ButtonLink href={e.registration.url} variant="solid" target="_blank" rel="noopener noreferrer">
                  {e.registration.name} ↗
                </ButtonLink>
                <p className="mt-3 text-small text-bark-soft">
                  {isPartner
                    ? "This is a partner event; registration is on the organiser's site."
                    : "Registration links out; no payment is taken here."}
                </p>
              </div>
            )}
          </div>

          <aside>
            <ArtPlate variant="field" label={`Setting for ${e.title}`} ratio="4 / 5" />
            <dl className="mt-6 border-t rule-gold text-small">
              {[
                ["Host", e.host],
                ["Type", e.category],
                ["Audience", e.audience],
                ["Fee", e.fee],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b rule-gold py-2.5">
                  <dt className="section-label">{k}</dt>
                  <dd className="text-right text-bark">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <Link href="/events" className="group mt-section-sm inline-flex items-center gap-2 text-small text-forest">
          <span aria-hidden className="transition-transform duration-fast group-hover:-translate-x-1">←</span>
          All events
        </Link>
      </section>
    </>
  );
}
