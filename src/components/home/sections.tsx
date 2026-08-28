import Link from "next/link";
import { ArchivalPlate, Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import {
  ArrowLink,
  Badge,
  Colophon,
  SampleMark,
  SectionLabel,
  feeLabel,
  longDate,
  parts,
} from "@/components/ui";
import type { CommunityEvent, Initiative, Person, Resource } from "@/content/types";
import { AUDIENCE_LABEL, EVENT_TYPE_LABEL } from "@/content/types";

/* ══ S3 — Featured Learning Initiative ═══════════════════
   "A magazine feature, not a course tile." T2 editorial inset.
   The ten §6.1 fields are typeset as a colophon rather than icon rows —
   that is what makes it read as scholarly instead of as a course listing. */

export function FeaturedInitiative({ item }: { item: Initiative }) {
  const d = parts(item.schedule.date);
  return (
    <section className="g-paper-deep section overflow-hidden">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="wipe" className="lg:col-span-6 lg:-ml-[8vw] lg:w-[calc(100%+8vw)]">
          <Plate spec={item.plate} ratio="5 / 6" sizes="(max-width:1024px) 100vw, 50vw" />
        </Reveal>

        <div className="lg:col-span-6 lg:pt-10">
          <SectionLabel>A Yoga Mandala initiative</SectionLabel>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge badge={item.badge} />
            {item.sample && <SampleMark />}
          </div>

          <h2 className="t-display-m mt-5 mb-0">
            <Link href={`/learn/initiatives/${item.slug}`} className="link-rule">
              {item.title}
            </Link>
          </h2>

          <p className="t-small mt-3 mb-0 opacity-70">Facilitated by {item.facilitator.name}</p>

          <div className="mt-8">
            <Colophon
              rows={[
                ["Type", item.initiativeType.replace(/-/g, " ")],
                ["Schedule", `${longDate(item.schedule.date)} · ${item.schedule.time} ${item.schedule.timezone}`],
                ["Format", item.format],
                ["Fee", feeLabel(item.fee)],
                ["Audience", AUDIENCE_LABEL[item.audience]],
              ]}
            />
          </div>

          <p className="t-body mt-8 mb-0 measure">{item.description[0]}</p>

          <div className="mt-8">
            <ArrowLink href={`/learn/initiatives/${item.slug}`}>
              About this initiative · {d.day} {d.month}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ S4 — Upcoming event ═════════════════════════════════
   "The date is the image." Giant numeral + T5 column strips at varied
   offsets. Deliberately a different rhythm from S3. */

export function NextEventSection({ event }: { event: CommunityEvent }) {
  const d = parts(event.date);
  const strips: { subject: string; tone: "paper" | "sage" | "indigo"; offset: string }[] = [
    { subject: `Venue — ${event.location.city ?? "online"}`, tone: "paper", offset: "0px" },
    { subject: "A past gathering, people arriving", tone: "sage", offset: "56px" },
    { subject: "Detail — tea, shoes at the door, notes", tone: "indigo", offset: "24px" },
  ];

  return (
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
              {d.day}
            </span>

            <div className="-mt-6 md:-mt-12">
              <p className="t-label m-0 opacity-70">
                {d.weekday} {d.day} {d.month} {d.year} · {event.time} {event.timezone}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge badge={event.badge} />
                <span className="t-label opacity-55">{EVENT_TYPE_LABEL[event.eventType]}</span>
                {event.sample && <SampleMark />}
              </div>

              <h2 className="t-display-m mt-5 mb-0 measure-tight">
                <Link href={`/events/${event.slug}`} className="link-rule">
                  {event.title}
                </Link>
              </h2>

              <p className="t-small mt-5 mb-0 measure opacity-75">{event.description[0]}</p>

              <hr className="rule mt-7" />
              <p className="t-label mt-4 mb-0 opacity-70">
                {event.host.name} · {event.location.online ? "Online" : event.location.city} ·{" "}
                {AUDIENCE_LABEL[event.audience]} · {feeLabel(event.fee)}
              </p>

              <div className="mt-7">
                <ArrowLink href="/events">All events</ArrowLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex gap-4 md:gap-6">
              {strips.map((s, i) => (
                <Reveal key={s.subject} delay={i * 90} className="flex-1">
                  <div style={{ transform: `translateY(${s.offset})` }}>
                    <Plate spec={{ subject: s.subject, tone: s.tone }} ratio="2 / 5" sizes="16vw" showCaption={false} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ S5 — Featured teacher ═══════════════════════════════
   "An editorial portrait spread." T3 layered pair on the first dark ground —
   a pause in the scroll. Placeholder identity per the integrity rules:
   no invented person, no invented quote, and an archival portrait study
   rather than a stock photograph that could be mistaken for a real member. */

export function FeaturedTeacher({ person }: { person: Person }) {
  return (
    <section className="g-indigo-deep section overflow-hidden">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <Reveal variant="wipe">
            <Plate
              spec={person.plate ?? { subject: `Portrait — ${person.tradition}`, tone: "indigo" }}
              ratio="4 / 5"
              sizes="(max-width:1024px) 100vw, 46vw"
              showCaption={false}
            />
          </Reveal>
          <Reveal delay={220} className="absolute -bottom-8 -right-4 w-[42%] md:-right-8">
            <Plate
              spec={{ subject: "Detail — hands, a book, a mat rolled at the edge of frame", tone: "clay" }}
              ratio="1 / 1"
              sizes="20vw"
              showCaption={false}
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pt-8">
          <SectionLabel>From the directory</SectionLabel>

          <h2 className="t-display-l mt-6 mb-0">
            <Link href={`/connect/directory/${person.slug}`} className="link-rule">
              {person.name}
            </Link>
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {person.verified && (
              <span
                className="t-label border px-2 py-[3px]"
                title="Submitted information has been reviewed against published criteria. This is not an endorsement."
                style={{ borderColor: "var(--color-brass)", color: "var(--color-brass)" }}
              >
                Verified Teacher
              </span>
            )}
            {person.sample && <SampleMark />}
          </div>

          <p className="t-lead mt-7 mb-0 measure">{person.bio}</p>

          <hr className="rule mt-8" />
          <div className="mt-5 grid gap-2">
            <p className="t-label m-0 opacity-70">
              {person.tradition} · {person.location.city}, {person.location.region}
            </p>
            <p className="t-label m-0 opacity-70">
              {person.experience} · {person.languages.join(", ")} · teaches {person.teachingFormat}
            </p>
          </div>

          <p className="t-small mt-7 mb-0 measure opacity-60">
            &ldquo;Verified Teacher&rdquo; means the submitted information has been reviewed against published
            criteria. It is not a blanket endorsement.
          </p>

          <div className="mt-8">
            <ArrowLink href="/connect/directory">Find a teacher</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ S7 — Featured library resource ══════════════════════
   "An archival plate." T6. Real public-domain content with genuine
   rights information — the section that proves the site is scholarly. */

export function FeaturedResource({ resource }: { resource: Resource }) {
  return (
    <section className="g-paper-deep section">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <ArchivalPlate
              spec={resource.plate ?? { subject: resource.title, tone: "archive" }}
              ratio="3 / 4"
              sizes="(max-width:1024px) 60vw, 26vw"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <SectionLabel>From the library</SectionLabel>

          <h2 className="t-display-m mt-6 mb-0">
            <Link href={`/learn/library/${resource.slug}`} className="link-rule">
              {resource.title}
            </Link>
          </h2>
          {resource.titleDeva && <p className="t-deva mt-2 mb-0 text-2xl opacity-70">{resource.titleDeva}</p>}

          <p className="t-small mt-4 mb-0 opacity-70">{resource.author}</p>

          <p className="t-body mt-7 mb-0 measure">{resource.description}</p>

          <div className="mt-8">
            <Colophon
              rows={[
                ["Subject", resource.subject],
                ["Tradition", resource.tradition],
                ["Level", AUDIENCE_LABEL[resource.level]],
                ["Rights", resource.rights],
                [
                  "Access",
                  <a key="a" href={resource.source.url} className="link-rule" target="_blank" rel="noreferrer">
                    {resource.source.name} ↗
                  </a>,
                ],
              ]}
            />
          </div>

          <div className="mt-8">
            <ArrowLink href="/learn/library">The library</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══ S8 — Invitation ═════════════════════════════════════
   "A quiet dark room." T10 duotone ground, almost empty.
   §5 asks for an invitation; the framework forbids sales language.
   After seven dense sections, restraint reads as confidence. */

export function Invitation() {
  const routes = [
    { label: "An event", href: "/submit/event" },
    { label: "A learning opportunity", href: "/submit/learning-opportunity" },
    { label: "A resource", href: "/submit/resource" },
    { label: "A community listing", href: "/submit/listing" },
  ];

  return (
    <section className="g-indigo-deep section-lg relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.12]">
        <Plate
          spec={{ subject: "Abstract ground — worn paper, ink, low contrast", tone: "indigo" }}
          ratio="auto"
          className="!aspect-auto h-full"
          sizes="100vw"
          showCaption={false}
        />
      </div>

      <div className="shell relative">
        <Reveal>
          <p className="t-display-m m-0 mx-auto max-w-3xl text-center">Share something with the Sangha.</p>
          <p className="t-small mx-auto mt-6 mb-0 max-w-xl text-center opacity-70">
            Everything submitted is read by a person before it is published.
          </p>

          <ul className="mx-auto mt-12 flex max-w-3xl list-none flex-wrap justify-center gap-x-10 gap-y-4 p-0">
            {routes.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="t-label link-rule">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
