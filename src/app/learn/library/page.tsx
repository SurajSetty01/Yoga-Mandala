import type { Metadata } from "next";
import Link from "next/link";
import { ArchivalPlate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui";
import { ChipRow, Crumbs } from "@/components/page";
import { LIBRARY, LIBRARY_GAPS } from "@/content/library";
import { AUDIENCE_LABEL, LIBRARY_SUBJECTS } from "@/content/types";

export const metadata: Metadata = {
  title: "Library",
  description:
    "A catalogue of foundational Yoga texts, commentaries and research. Public-domain sources linked to legitimate scans — nothing hosted, everything credited.",
};

export default function LibraryPage() {
  const feature = LIBRARY.find((r) => r.featured) ?? LIBRARY[0];
  const present = LIBRARY_SUBJECTS.filter((s) => LIBRARY.some((r) => r.subject === s));

  return (
    <>
      {/* S1 — a reading room, oversized archival plate */}
      <header className="g-paper-deep pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="shell grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Crumbs trail={[{ label: "Learn", href: "/learn" }, { label: "Library" }]} />
            <div className="mt-8">
              <SectionLabel>The reading room</SectionLabel>
              <h1 className="t-display-l mt-7 mb-0">A catalogue, not a bookshop.</h1>
              <p className="t-lead mt-7 mb-0 measure-wide">
                Foundational texts, commentaries and research. Where a work is in the public domain we link to a
                legitimate scan and say so. We never host a file — the copyright principle is built into how the
                catalogue works, not bolted on afterwards.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <ArchivalPlate
                spec={feature.plate ?? { subject: feature.title, tone: "archive" }}
                ratio="3 / 4"
                sizes="(max-width:1024px) 60vw, 26vw"
              />
            </Reveal>
          </div>
        </div>
      </header>

      {/* S2 — subject spine */}
      <section className="g-paper section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Subjects</SectionLabel>
            <ul className="mt-6" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {LIBRARY_SUBJECTS.map((s) => {
                const count = LIBRARY.filter((r) => r.subject === s).length;
                const has = count > 0;
                return (
                  <li
                    key={s}
                    className="flex items-baseline justify-between gap-4 border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] py-3 last:border-b"
                  >
                    <span className={`t-title ${has ? "" : "opacity-40"}`}>{s}</span>
                    <span className="t-label tabnum opacity-60">
                      {has ? String(count).padStart(2, "0") : "—"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="t-small mt-6 mb-0 measure opacity-60">
              Some subjects are still empty. We would rather show an honest gap than fill it with weak entries.
              The gaps below are the ones we are actively looking to fill.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel>Filter the collection</SectionLabel>
            <div className="mt-6">
              <ChipRow
                groups={[
                  { legend: "Subject", options: [...present] },
                  { legend: "Level", options: ["Beginner", "Teacher", "Experienced teacher", "Open"] },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* S3 — the collection, asymmetric editorial column */}
      <section className="g-paper section pt-0">
        <div className="shell">
          <SectionLabel>The collection</SectionLabel>
          <div className="mt-10 grid gap-x-16 gap-y-0 md:grid-cols-2">
            {LIBRARY.map((r, i) => {
              const withPlate = i % 3 === 0;
              return (
                <Reveal
                  as="article"
                  key={r.slug}
                  className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-8"
                >
                  <div className={withPlate ? "grid grid-cols-[6rem_1fr] gap-5 sm:grid-cols-[7rem_1fr]" : ""}>
                    {withPlate && r.plate && (
                      <div className="w-24 sm:w-28">
                        <ArchivalPlate spec={r.plate} ratio="3 / 4" sizes="112px" />
                      </div>
                    )}
                    <div>
                      <h2 className="t-title m-0">
                        <Link href={`/learn/library/${r.slug}`} className="link-rule">
                          {r.title}
                        </Link>
                      </h2>
                      {r.titleDeva && <p className="t-deva mt-1 mb-0 text-lg opacity-70">{r.titleDeva}</p>}
                      <p className="t-small mt-2 mb-0 opacity-70">
                        {r.author} · {r.tradition}
                      </p>
                      <p className="t-body mt-3 mb-0 measure">{r.description}</p>
                      <p className="t-label mt-4 mb-0 opacity-60">
                        {AUDIENCE_LABEL[r.level]} · {r.rights}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* S4 — on rights and access */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionLabel>On rights and access</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">We link, we never host.</h2>
            <p className="t-body mt-7 mb-0 measure">
              We do not upload or redistribute protected books, recordings or documents. Where rights are
              unclear, we use legitimate links, bibliographic information or approved access methods. Every record
              here is a public-domain work linked to a verifiable scan, credited to its source.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-16">
            <p className="t-label mb-4 opacity-55">Gaps we are looking to fill</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {LIBRARY_GAPS.map((g) => (
                <li key={g} className="t-body border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-3 last:border-b">
                  {g}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ArrowLink href="/submit/resource">Suggest a resource</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
