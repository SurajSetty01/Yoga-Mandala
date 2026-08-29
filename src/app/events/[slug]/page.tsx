import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Badge, Colophon, SampleMark, SectionLabel, feeLabel, longDate, parts } from "@/components/ui";
import { Crumbs, DetailLayout } from "@/components/page";
import { EVENTS, INITIATIVES } from "@/content/samples";
import { AUDIENCE_LABEL, BADGE_LABEL, EVENT_TYPE_LABEL } from "@/content/types";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = EVENTS.find((e) => e.slug === slug);
  return { title: item ? item.title : "Event", description: item?.description[0] };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = EVENTS.find((e) => e.slug === slug);
  if (!item) notFound();

  const d = parts(item.date);
  const isPartner = item.badge === "partner-guest";
  const locationLine = item.location.online
    ? (item.location.platform ?? "Online")
    : [item.location.venue, item.location.city].filter(Boolean).join(", ");
  const linked = item.linkedInitiative
    ? INITIATIVES.find((i) => i.slug === item.linkedInitiative)
    : undefined;
  const related = EVENTS.filter((e) => e.eventType === item.eventType && e.slug !== item.slug).slice(0, 2);

  return (
    <>
      {/* Header — full-bleed band, badge, giant date */}
      <header className="g-indigo-deep relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        {item.plate && (
          <div aria-hidden className="absolute inset-0 opacity-30">
            <Plate
              spec={item.plate}
              ratio="auto"
              className="!aspect-auto h-full"
              sizes="100vw"
              showCaption={false}
              priority
            />
          </div>
        )}
        <div className="shell relative">
          <Crumbs
            onDark
            trail={[{ label: "Events", href: "/events" }, { label: item.title }]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge badge={item.badge} />
            <span className="t-label opacity-70">{EVENT_TYPE_LABEL[item.eventType]}</span>
            {item.sample && <SampleMark />}
          </div>
          <p className="t-label mt-6 mb-0 opacity-70">
            {d.weekday} {d.day} {d.month} {d.year} · {item.time} {item.timezone}
          </p>
          <h1 className="t-display-l mt-3 mb-0 measure-tight">{item.title}</h1>
          {isPartner && (
            <p className="t-small mt-6 mb-0 measure opacity-80">
              This is a partner event. It is listed here for relevance to the community. Yoga Mandala does not
              organise or endorse it.
            </p>
          )}
        </div>
      </header>

      <section className="g-paper section">
        <DetailLayout
          aside={
            <div>
              <SectionLabel>The record</SectionLabel>
              <div className="mt-6">
                <Colophon
                  rows={[
                    ["Type", EVENT_TYPE_LABEL[item.eventType]],
                    ["Date", longDate(item.date)],
                    ["Time", `${item.time} ${item.timezone}`],
                    ["Location", locationLine],
                    [
                      "Host",
                      item.host.directorySlug ? (
                        <Link key="h" href={`/connect/directory/${item.host.directorySlug}`} className="link-rule">
                          {item.host.name}
                        </Link>
                      ) : (
                        item.host.organisation ?? item.host.name
                      ),
                    ],
                    ["Audience", AUDIENCE_LABEL[item.audience]],
                    ["Fee", feeLabel(item.fee)],
                    ["Badge", BADGE_LABEL[item.badge]],
                  ]}
                />
              </div>

              <div className="mt-8 border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-5">
                <p className="t-label m-0 opacity-60">Registration</p>
                {item.registration.mode === "external" ? (
                  <>
                    <p className="t-small mt-2 mb-4">
                      Registration is handled on an external page. You will leave this site.
                    </p>
                    <a
                      href={item.registration.url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="t-label link-rule"
                    >
                      Register externally ↗
                    </a>
                  </>
                ) : (
                  <p className="t-small mt-2 mb-0">
                    Registration through the member portal opens closer to the date.
                  </p>
                )}
              </div>
            </div>
          }
        >
          <Reveal>
            <p className="t-label mb-4 opacity-55">About this event</p>
            {item.description.map((p, i) => (
              <p key={i} className={`${i === 0 ? "t-lead" : "t-body"} mt-0 mb-6 measure`}>
                {p}
              </p>
            ))}
          </Reveal>

          {/* Location */}
          <div className="mt-12 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-8">
            <SectionLabel>{item.location.online ? "Online" : "Location"}</SectionLabel>
            <p className="t-body mt-5 mb-0 measure">
              {item.location.online
                ? `This is an online event${item.location.platform ? ` — ${item.location.platform}` : ""}. Joining details are shared with registered participants.`
                : `${locationLine}. Full address is confirmed with registered participants.`}
            </p>
          </div>

          {/* Host */}
          <div className="mt-12 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-8">
            <SectionLabel>Host</SectionLabel>
            <h2 className="t-title mt-5 mb-0">{item.host.organisation ?? item.host.name}</h2>
            <p className="t-body mt-4 mb-0 measure">
              {isPartner
                ? "An external organiser, stated plainly. This event carries the Partner / Guest badge and is not organised by Yoga Mandala."
                : "Organised within the community. If the host keeps a directory profile, it is linked in the record."}
            </p>
            {item.host.directorySlug && (
              <div className="mt-6">
                <ArrowLink href={`/connect/directory/${item.host.directorySlug}`}>
                  {item.host.name}&rsquo;s directory profile
                </ArrowLink>
              </div>
            )}
          </div>

          {/* Cross-link to the initiative this event belongs to */}
          {linked && (
            <div className="mt-12 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-8">
              <SectionLabel>Part of a Learning Initiative</SectionLabel>
              <h2 className="t-title mt-5 mb-0">{linked.title}</h2>
              <p className="t-body mt-4 mb-0 measure">
                This session is part of a longer initiative. It is the same record surfaced here and on the
                initiative&rsquo;s own page, never a duplicate.
              </p>
              <div className="mt-6">
                <ArrowLink href={`/learn/initiatives/${linked.slug}`}>About the initiative</ArrowLink>
              </div>
            </div>
          )}
        </DetailLayout>
      </section>

      {/* Related — same type */}
      {related.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>Other {EVENT_TYPE_LABEL[item.eventType].toLowerCase()} events</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {related.map((r) => (
                <li
                  key={r.slug}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                >
                  <Link href={`/events/${r.slug}`} className="group block py-6">
                    <p className="t-label mb-2 opacity-60">{longDate(r.date)}</p>
                    <h3 className="t-title m-0">
                      <span className="link-rule">{r.title}</span>
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
