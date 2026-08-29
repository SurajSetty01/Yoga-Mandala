import type { Metadata } from "next";
import Link from "next/link";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { SampleMark, SectionLabel } from "@/components/ui";
import { Crumbs } from "@/components/page";
import { PEOPLE } from "@/content/samples";

export const metadata: Metadata = {
  title: "Experts",
  description:
    "Experienced members willing to contribute to Q&A, study circles, expert conversations and mentoring. Organised by subject and contribution, not by ranking.",
};

const CONTRIBUTION_LABEL: Record<string, string> = {
  qa: "Q&A",
  "study-circle": "Study circles",
  "expert-conversation": "Expert conversations",
  mentoring: "Mentoring",
};

const CONTRIB_ORDER = ["qa", "study-circle", "expert-conversation", "mentoring"] as const;

export default function ExpertsPage() {
  const experts = PEOPLE.filter((p) => p.isExpert);
  const subjects = Array.from(new Set(experts.flatMap((e) => e.expertise ?? []))).sort();

  return (
    <>
      {/* S1 — opener with the caveat at equal weight */}
      <header className="g-paper pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Crumbs trail={[{ label: "Connect", href: "/connect" }, { label: "Experts" }]} />
            <div className="mt-8">
              <SectionLabel>The expert network</SectionLabel>
              <h1 className="t-display-l mt-7 mb-0">Members who offer their knowledge.</h1>
              <p className="t-lead mt-7 mb-0 measure-wide">
                A curated list of experienced members willing to contribute to Q&amp;A, study circles, expert
                conversations or mentoring.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-24">
            <div className="border-l-2 pl-6" style={{ borderColor: "var(--color-clay)" }}>
              <p className="t-small m-0 measure">
                <strong>This is not a ranking, and not an endorsement.</strong> Verification is transparent and
                does not imply blanket endorsement. Being listed here means only that someone has offered to help
                the community in a specific way.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* S2 — by contribution */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>Four ways members help</SectionLabel>
          <div className="mt-10 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {CONTRIB_ORDER.map((c) => {
              const list = experts.filter((e) => e.contributions?.includes(c));
              return (
                <div key={c}>
                  <h2 className="t-display-m mt-0 mb-5">{CONTRIBUTION_LABEL[c]}</h2>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {list.length ? (
                      list.map((e) => (
                        <li key={e.slug} className="border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] py-3 last:border-b">
                          <Link href={`/connect/directory/${e.slug}`} className="group flex items-baseline justify-between gap-3">
                            <span className="t-title"><span className="link-rule">{e.name}</span></span>
                            <span className="t-label opacity-55">{(e.expertise ?? [])[0]}</span>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="t-small opacity-55">No one listed for this yet.</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* S3 — by subject */}
      <section className="g-paper section-sm">
        <div className="shell">
          <SectionLabel>By subject</SectionLabel>
          <div className="mt-6 flex flex-wrap gap-2">
            {subjects.map((s) => (
              <span key={s} className="t-label border border-[color-mix(in_srgb,var(--color-ink)_22%,transparent)] px-3 py-[6px] opacity-80">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* S4 — the experts, generous space, alternating alignment */}
      <section className="g-paper section pt-0">
        <div className="shell grid gap-20">
          {experts.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal
                key={e.slug}
                variant="rise"
                className="grid items-center gap-8 md:grid-cols-12 md:gap-14"
              >
                <div className={`md:col-span-5 ${left ? "md:order-1" : "md:order-2 md:col-start-8"}`}>
                  <Plate
                    spec={e.plate ?? { subject: `Portrait — ${e.tradition}`, tone: "indigo" }}
                    ratio="4 / 3"
                    sizes="(max-width:768px) 100vw, 40vw"
                    showCaption={false}
                  />
                </div>
                <div className={`md:col-span-6 ${left ? "md:order-2 md:col-start-7" : "md:order-1 md:col-start-1"}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="t-label opacity-55">{(e.expertise ?? []).join(" · ")}</span>
                    {e.sample && <SampleMark />}
                  </div>
                  <h3 className="t-display-m mt-4 mb-0">
                    <Link href={`/connect/directory/${e.slug}`} className="link-rule">
                      {e.name}
                    </Link>
                  </h3>
                  <p className="t-small mt-3 mb-0 opacity-70">
                    {e.tradition} · {e.location.city}
                  </p>
                  <p className="t-body mt-5 mb-0 measure">
                    Offers: {(e.contributions ?? []).map((c) => CONTRIBUTION_LABEL[c]).join(", ")}.
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* S5 — how someone becomes an expert (criteria pending) */}
      <section className="g-indigo-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>Becoming an expert</SectionLabel>
          <div className="mt-8 border border-dashed border-[color-mix(in_srgb,var(--color-paper)_28%,transparent)] px-6 py-12">
            <p className="t-label mb-4 opacity-55">Criteria pending</p>
            <p className="t-body mt-0 mb-0 measure">
              The framework requires that inclusion be transparent, so we will publish the criteria here rather
              than invent them now. What is settled: being listed is about offering to contribute, in specific
              named ways — never about status.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
