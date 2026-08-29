import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchivalPlate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Colophon, SectionLabel } from "@/components/ui";
import { Crumbs } from "@/components/page";
import { LIBRARY } from "@/content/library";
import { AUDIENCE_LABEL } from "@/content/types";

export function generateStaticParams() {
  return LIBRARY.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = LIBRARY.find((x) => x.slug === slug);
  return { title: r ? r.title : "Resource", description: r?.description };
}

export default async function ResourceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = LIBRARY.find((x) => x.slug === slug);
  if (!r) notFound();

  const related = LIBRARY.filter((x) => x.slug !== r.slug && x.subject === r.subject).slice(0, 3);

  return (
    <>
      <header className="g-paper-deep pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="shell grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <ArchivalPlate
                spec={r.plate ?? { subject: r.title, tone: "archive" }}
                ratio="3 / 4"
                sizes="(max-width:1024px) 60vw, 30vw"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Crumbs
              trail={[
                { label: "Learn", href: "/learn" },
                { label: "Library", href: "/learn/library" },
                { label: r.title },
              ]}
            />
            <h1 className="t-display-m mt-8 mb-0">{r.title}</h1>
            {r.titleDeva && <p className="t-deva mt-2 mb-0 text-2xl opacity-70">{r.titleDeva}</p>}
            <p className="t-lead mt-5 mb-0">{r.author}</p>
          </div>
        </div>
      </header>

      <section className="g-paper section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="t-body measure mt-0 mb-0" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                {r.description}
              </p>
            </Reveal>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <SectionLabel>Catalogue record</SectionLabel>
            <div className="mt-6">
              <Colophon
                rows={[
                  ["Author", r.author],
                  ["Subject", r.subject],
                  ["Tradition", r.tradition],
                  ["Level", AUDIENCE_LABEL[r.level]],
                  ["Rights", r.rights],
                  [
                    "Access",
                    <a key="a" href={r.source.url} target="_blank" rel="noreferrer" className="link-rule">
                      {r.source.name} ↗
                    </a>,
                  ],
                ]}
              />
            </div>
            <p className="t-small mt-6 mb-0 measure opacity-60">
              This work is in the public domain. We link to the scan rather than hosting a copy.
            </p>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="g-paper-deep section">
          <div className="shell">
            <SectionLabel>Also in {r.subject.toLowerCase()}</SectionLabel>
            <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {related.map((x) => (
                <li
                  key={x.slug}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] last:border-b"
                >
                  <Link href={`/learn/library/${x.slug}`} className="group block py-5">
                    <h3 className="t-title m-0">
                      <span className="link-rule">{x.title}</span>
                    </h3>
                    <p className="t-label mt-2 mb-0 opacity-60">{x.author}</p>
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
