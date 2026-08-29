import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Badge, Colophon, SampleMark, SectionLabel, longDate } from "@/components/ui";
import { Crumbs } from "@/components/page";
import { BULLETIN } from "@/content/samples";

const CATEGORY_LABEL: Record<string, string> = {
  programme: "Programme",
  workshop: "Workshop",
  retreat: "Retreat",
  "teacher-training": "Teacher training",
  book: "Book",
  research: "Research",
  event: "Event",
};

export function generateStaticParams() {
  return BULLETIN.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = BULLETIN.find((b) => b.slug === slug);
  return { title: entry ? entry.title : "Bulletin", description: entry?.note };
}

export default async function BulletinDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = BULLETIN.find((b) => b.slug === slug);
  if (!entry) notFound();

  const more = BULLETIN.filter((b) => b.slug !== entry.slug && b.category === entry.category).slice(0, 3);

  return (
    <>
      <header className="g-paper pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="shell max-w-4xl">
          <Crumbs
            trail={[
              { label: "Learn", href: "/learn" },
              { label: "Bulletin", href: "/learn/bulletin" },
              { label: entry.title },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge badge={entry.badge} />
            {entry.sample && <SampleMark />}
          </div>
          <h1 className="t-display-m mt-6 mb-0">{entry.title}</h1>
          <p className="t-lead mt-6 mb-0 measure">{entry.note}</p>
        </div>
      </header>

      <section className="g-paper section pt-0">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              {/* Persistent neutrality statement */}
              <div className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6">
                <p className="t-label m-0 opacity-60">A note on this listing</p>
                <p className="t-body mt-3 mb-0 measure">
                  This is an external offering, listed because it is relevant to the community. Yoga Mandala does
                  not organise, run or endorse it. Please assess it on its own terms, as you would anything you
                  found elsewhere.
                </p>
              </div>
            </Reveal>

            <div className="mt-10">
              <SectionLabel>Access</SectionLabel>
              {entry.source.url ? (
                <a
                  href={entry.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="t-label link-rule mt-5 inline-block"
                >
                  Visit {entry.source.organisation} ↗
                </a>
              ) : (
                <p className="t-small mt-5 mb-0 opacity-75">
                  No public link was supplied. Contact the source organisation directly for details.
                </p>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <SectionLabel>The record</SectionLabel>
            <div className="mt-6">
              <Colophon
                rows={[
                  ["Category", CATEGORY_LABEL[entry.category]],
                  ["Source", entry.source.organisation],
                  ["Location", entry.location],
                  ["Posted", longDate(entry.posted)],
                  ["Expires", longDate(entry.expiry)],
                  ...(entry.rights ? ([["Rights", entry.rights]] as [string, string][]) : []),
                ]}
              />
            </div>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>More in {CATEGORY_LABEL[entry.category].toLowerCase()}</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {more.map((m) => (
                <li
                  key={m.slug}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                >
                  <Link href={`/learn/bulletin/${m.slug}`} className="group block py-5">
                    <Badge badge={m.badge} />
                    <h3 className="t-title mt-3 mb-0">
                      <span className="link-rule">{m.title}</span>
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
