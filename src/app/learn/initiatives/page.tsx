import type { Metadata } from "next";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Badge, Colophon, SampleMark, SectionLabel, feeLabel, longDate, parts } from "@/components/ui";
import { ChipRow, IndexRow, PageMasthead } from "@/components/page";
import { INITIATIVES } from "@/content/samples";
import { AUDIENCE_LABEL } from "@/content/types";

export const metadata: Metadata = {
  title: "Learning Initiatives",
  description:
    "Workshops, study circles, lectures, series and mentorships formally organised or endorsed by Yoga Mandala.",
};

export default function InitiativesPage() {
  const upcoming = INITIATIVES.filter((i) => i.status === "upcoming").sort((a, b) =>
    a.schedule.date.localeCompare(b.schedule.date),
  );
  const past = INITIATIVES.filter((i) => i.status === "past");
  const feature = upcoming.find((i) => i.featured) ?? upcoming[0];
  const rest = upcoming.filter((i) => i.slug !== feature?.slug);

  return (
    <>
      <PageMasthead
        kicker="Yoga Mandala Learning Initiatives"
        word="Ours"
        title="The programmes that carry our name."
        standfirst="Formally organised or endorsed by Yoga Mandala. Everything on this page — and only this page — is ours. If it is here, we stand behind it."
        crumbs={[{ label: "Learn", href: "/learn" }, { label: "Learning Initiatives" }]}
      />

      {/* S2 — the current initiative as a prospectus */}
      {feature && (
        <section className="g-paper section overflow-hidden">
          <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="wipe" className="lg:col-span-6 lg:-ml-[8vw] lg:w-[calc(100%+8vw)]">
              <Plate spec={feature.plate} ratio="5 / 6" sizes="(max-width:1024px) 100vw, 50vw" priority />
            </Reveal>
            <div className="lg:col-span-6 lg:pt-8">
              <SectionLabel>The current initiative</SectionLabel>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge badge={feature.badge} />
                {feature.sample && <SampleMark />}
              </div>
              <h2 className="t-display-m mt-5 mb-0">{feature.title}</h2>
              <p className="t-small mt-3 mb-0 opacity-70">Facilitated by {feature.facilitator.name}</p>
              <div className="mt-8">
                <Colophon
                  rows={[
                    ["Type", feature.initiativeType.replace(/-/g, " ")],
                    [
                      "Schedule",
                      `${longDate(feature.schedule.date)} · ${feature.schedule.time} ${feature.schedule.timezone}`,
                    ],
                    ["Format", feature.format],
                    ["Fee", feeLabel(feature.fee)],
                    ["Audience", AUDIENCE_LABEL[feature.audience]],
                  ]}
                />
              </div>
              <p className="t-body mt-8 mb-0 measure">{feature.description[0]}</p>
              <div className="mt-8">
                <ArrowLink href={`/learn/initiatives/${feature.slug}`}>About this initiative</ArrowLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* S3 — other initiatives, date-led rows with filters */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>Upcoming</SectionLabel>
          <div className="mt-6">
            <ChipRow
              groups={[
                { legend: "Type", options: ["Workshop", "Study circle", "Lecture", "Series", "Mentorship"] },
                { legend: "Format", options: ["Online", "Offline", "Hybrid"] },
                { legend: "Audience", options: ["Beginner", "Teacher", "Experienced teacher", "Open"] },
                { legend: "Fee", options: ["Free", "Paid", "Contribution"] },
              ]}
            />
          </div>
          <div className="mt-10">
            {rest.length ? (
              rest.map((i) => {
                const d = parts(i.schedule.date);
                return (
                  <IndexRow
                    key={i.slug}
                    href={`/learn/initiatives/${i.slug}`}
                    day={d.day}
                    month={d.month}
                    eyebrow={
                      <>
                        <Badge badge={i.badge} />
                        {i.sample && <SampleMark />}
                      </>
                    }
                    title={i.title}
                    meta={`${i.initiativeType.replace(/-/g, " ")} · ${i.format} · ${AUDIENCE_LABEL[i.audience]} · ${feeLabel(i.fee)}`}
                    strip={i.plate}
                  />
                );
              })
            ) : (
              <p className="t-small opacity-70">No further initiatives are scheduled just now.</p>
            )}
          </div>
        </div>
      </section>

      {/* S4 — past initiatives, quiet desaturated rail */}
      {past.length > 0 && (
        <section className="g-paper section">
          <div className="shell">
            <SectionLabel>Previously</SectionLabel>
            <div className="rail rail-clean rail-quiet mt-8">
              {past.map((i) => {
                const d = parts(i.schedule.date);
                return (
                  <a key={i.slug} href={`/learn/initiatives/${i.slug}`} className="block w-64">
                    <Plate spec={i.plate} ratio="4 / 3" sizes="256px" showCaption={false} />
                    <p className="t-label mt-3 mb-0 opacity-70">
                      {d.day} {d.month} {d.year}
                    </p>
                    <h3 className="t-small mt-1 mb-0">{i.title}</h3>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
