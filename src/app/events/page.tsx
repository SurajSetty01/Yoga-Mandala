import type { Metadata } from "next";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Badge, SampleMark, SectionLabel, feeLabel, parts } from "@/components/ui";
import { ChipRow, Crumbs, IndexRow } from "@/components/page";
import { EVENTS, upcomingEvents } from "@/content/samples";
import { AUDIENCE_LABEL, EVENT_TYPE_LABEL } from "@/content/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Sangha meetups, study circles, expert conversations, workshops, reading circles and partner events. Yoga Mandala's own gatherings are never blurred with external ones.",
};

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const next = upcoming[0];
  const rest = upcoming.slice(1);
  const past = EVENTS.filter((e) => e.status === "past").sort((a, b) => b.date.localeCompare(a.date));

  const locationLine = (e: (typeof EVENTS)[number]) =>
    e.location.online ? (e.location.platform ?? "Online") : [e.location.venue, e.location.city].filter(Boolean).join(", ");

  return (
    <>
      <header className="g-paper pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="shell">
          <Crumbs trail={[{ label: "Events" }]} />
          <div className="mt-8 max-w-4xl">
            <SectionLabel>What the community is doing</SectionLabel>
            <h1 className="t-display-l mt-7 mb-0">The page that proves the community is alive.</h1>
            <p className="t-lead mt-7 mb-0 measure-wide">
              Meetups, study circles, expert conversations, workshops and reading circles. A badge on every
              entry says whether it is ours or a partner&rsquo;s — the two are never made to look the same.
            </p>
          </div>
        </div>
      </header>

      {/* S1 — the next event, at full scale, with a giant date numeral */}
      {next && (
        <section className="g-paper section relative overflow-hidden">
          <div className="shell">
            <SectionLabel>Next in the community</SectionLabel>
            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="relative lg:col-span-7">
                <span
                  aria-hidden
                  className="tabnum pointer-events-none block leading-[0.8]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(7rem, 21vw, 17rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px color-mix(in srgb, var(--color-brass) 85%, transparent)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {parts(next.date).day}
                </span>
                <div className="-mt-6 md:-mt-12">
                  <p className="t-label m-0 opacity-70">
                    {parts(next.date).weekday} {parts(next.date).day} {parts(next.date).month}{" "}
                    {parts(next.date).year} · {next.time} {next.timezone}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Badge badge={next.badge} />
                    <span className="t-label opacity-55">{EVENT_TYPE_LABEL[next.eventType]}</span>
                    {next.sample && <SampleMark />}
                  </div>
                  <h2 className="t-display-m mt-5 mb-0 measure-tight">
                    <Link href={`/events/${next.slug}`} className="link-rule">
                      {next.title}
                    </Link>
                  </h2>
                  <p className="t-small mt-5 mb-0 measure opacity-75">{next.description[0]}</p>
                  <hr className="rule mt-7" />
                  <p className="t-label mt-4 mb-0 opacity-70">
                    {next.host.organisation ?? next.host.name} · {locationLine(next)} ·{" "}
                    {AUDIENCE_LABEL[next.audience]} · {feeLabel(next.fee)}
                  </p>
                  <div className="mt-7">
                    <ArrowLink href={`/events/${next.slug}`}>About this event</ArrowLink>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                {next.plate ? (
                  <Reveal variant="wipe">
                    <Plate spec={next.plate} ratio="4 / 5" sizes="(max-width:1024px) 100vw, 40vw" priority />
                  </Reveal>
                ) : (
                  <div className="flex h-full items-end border-l border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pl-6">
                    <p className="t-small mb-0 opacity-60">
                      A typographic entry — this event carries no image, and that is intentional.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* S2 + S3 — filters and the upcoming timeline */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>Upcoming</SectionLabel>
          <div className="mt-6">
            <ChipRow
              groups={[
                {
                  legend: "Type",
                  options: [
                    "Sangha Meetup",
                    "Learning Initiative",
                    "Study Circle",
                    "Expert Conversation",
                    "Community Workshop",
                    "Reading Circle",
                    "Partner / External",
                  ],
                },
                { legend: "Place", options: ["Online", "In person"] },
                { legend: "Fee", options: ["Free", "Paid", "By contribution"] },
              ]}
            />
          </div>

          <div className="mt-10">
            {rest.length ? (
              rest.map((e) => {
                const d = parts(e.date);
                return (
                  <IndexRow
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    day={d.day}
                    month={d.month}
                    eyebrow={
                      <>
                        <Badge badge={e.badge} />
                        <span className="t-label opacity-55">{EVENT_TYPE_LABEL[e.eventType]}</span>
                        {e.sample && <SampleMark />}
                      </>
                    }
                    title={e.title}
                    meta={`${e.host.organisation ?? e.host.name} · ${locationLine(e)} · ${AUDIENCE_LABEL[e.audience]} · ${feeLabel(e.fee)}`}
                    strip={e.plate}
                  />
                );
              })
            ) : (
              <p className="t-small opacity-70">Nothing further is scheduled just now.</p>
            )}
          </div>

          <p className="t-small mt-12 mb-0 opacity-70">
            Somewhere the community should gather?{" "}
            <Link href="/submit/event" className="link-rule">
              Suggest a meetup or event
            </Link>
            .
          </p>
        </div>
      </section>

      {/* S4 — past events, quiet desaturated rail (hidden until there are 3) */}
      {past.length >= 3 && (
        <section className="g-paper section">
          <div className="shell">
            <SectionLabel>Previously</SectionLabel>
            <div className="rail rail-clean rail-quiet mt-8">
              {past.map((e) => {
                const d = parts(e.date);
                return (
                  <Link key={e.slug} href={`/events/${e.slug}`} className="block w-64">
                    {e.plate ? (
                      <Plate spec={e.plate} ratio="4 / 3" sizes="256px" showCaption={false} />
                    ) : (
                      <div
                        className="flex items-end p-4"
                        style={{
                          aspectRatio: "4 / 3",
                          border: "1px solid color-mix(in srgb, var(--color-brass) 45%, transparent)",
                        }}
                      >
                        <span className="t-label opacity-55">{EVENT_TYPE_LABEL[e.eventType]}</span>
                      </div>
                    )}
                    <p className="t-label mt-3 mb-0 opacity-70">
                      {d.day} {d.month} {d.year}
                    </p>
                    <h3 className="t-small mt-1 mb-0">{e.title}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
