import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, Badge, Colophon, SampleMark, SectionLabel, feeLabel, longDate } from "@/components/ui";
import { Crumbs, DetailLayout } from "@/components/page";
import { INITIATIVES } from "@/content/samples";
import { AUDIENCE_LABEL } from "@/content/types";

export function generateStaticParams() {
  return INITIATIVES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = INITIATIVES.find((i) => i.slug === slug);
  return { title: item ? item.title : "Initiative", description: item?.description[0] };
}

export default async function InitiativeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = INITIATIVES.find((i) => i.slug === slug);
  if (!item) notFound();

  const related = INITIATIVES.filter((i) => i.slug !== item.slug).slice(0, 2);

  return (
    <>
      {/* Header — full-bleed image band */}
      <header className="g-indigo-deep relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div aria-hidden className="absolute inset-0 opacity-30">
          <Plate spec={item.plate} ratio="auto" className="!aspect-auto h-full" sizes="100vw" showCaption={false} priority />
        </div>
        <div className="shell relative">
          <Crumbs
            onDark
            trail={[
              { label: "Learn", href: "/learn" },
              { label: "Initiatives", href: "/learn/initiatives" },
              { label: item.title },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge badge={item.badge} />
            {item.sample && <SampleMark />}
          </div>
          <h1 className="t-display-l mt-6 mb-0 measure-tight">{item.title}</h1>
          <p className="t-lead mt-6 mb-0 measure">Facilitated by {item.facilitator.name}</p>
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
                    ["Type", item.initiativeType.replace(/-/g, " ")],
                    ["Date", longDate(item.schedule.date)],
                    ["Time", `${item.schedule.time} ${item.schedule.timezone}`],
                    ["Format", item.format],
                    ["Fee", feeLabel(item.fee)],
                    ["Audience", AUDIENCE_LABEL[item.audience]],
                    ["Badge", "Yoga Mandala initiative"],
                  ]}
                />
              </div>
              <div className="mt-8 border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-5">
                <p className="t-label m-0 opacity-60">Registration</p>
                {item.registration.mode === "external" ? (
                  <>
                    <p className="t-small mt-2 mb-4">
                      Registration is handled by the facilitator on an external page. You will leave this site.
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
                  <p className="t-small mt-2 mb-0">Registration through the member portal opens closer to the date.</p>
                )}
              </div>
            </div>
          }
        >
          <Reveal>
            <p className="t-label mb-4 opacity-55">What participants will learn</p>
            {item.description.map((p, i) => (
              <p key={i} className={`${i === 0 ? "t-lead" : "t-body"} mt-0 mb-6 measure`}>
                {p}
              </p>
            ))}
          </Reveal>

          {/* Facilitator — layered pair */}
          <div className="mt-14 grid gap-8 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-10 sm:grid-cols-[10rem_1fr] sm:gap-10">
            <div className="relative w-40">
              <Plate
                spec={{ subject: `Portrait — ${item.facilitator.name}`, tone: "indigo" }}
                ratio="4 / 5"
                sizes="160px"
                showCaption={false}
              />
            </div>
            <div>
              <SectionLabel>The facilitator</SectionLabel>
              <h2 className="t-title mt-5 mb-0">{item.facilitator.name}</h2>
              <p className="t-body mt-4 mb-0 measure">{item.facilitator.shortProfile}</p>
              {item.facilitator.directorySlug && (
                <div className="mt-6">
                  <ArrowLink href={`/connect/directory/${item.facilitator.directorySlug}`}>
                    Their directory profile
                  </ArrowLink>
                </div>
              )}
            </div>
          </div>
        </DetailLayout>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>Other initiatives</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {related.map((r) => (
                <li
                  key={r.slug}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                >
                  <Link href={`/learn/initiatives/${r.slug}`} className="group block py-6">
                    <p className="t-label mb-2 opacity-60">{longDate(r.schedule.date)}</p>
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
