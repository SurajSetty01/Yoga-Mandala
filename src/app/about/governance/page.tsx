import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SampleMark, SectionLabel } from "@/components/ui";
import { ClosingBand, PageMasthead } from "@/components/page";

export const metadata: Metadata = {
  title: "Governance & Ownership",
  description:
    "Who holds what, and why. Yoga Mandala is an independent, community-led network — this page sets out how it is governed, who decides, and who owns the data.",
};

/** §15 governance principles, expanded into an editorial list. */
const PRINCIPLES = [
  {
    short: "Community-led, not developer-led",
    body: "Yoga Mandala should be community-led rather than developer-led. The people who use and sustain it set its direction; those who build and maintain it serve that direction rather than own it.",
  },
  {
    short: "Independent of any single interest",
    body: "The platform stays independent of any single organisation, lineage or commercial interest. No one buys influence over what is published, and no tradition is elevated above the rest.",
  },
  {
    short: "Decisions are documented",
    body: "Significant decisions — what is published, how a rule is applied, how the community changes course — are documented, so the reasoning is legible and consistent over time.",
  },
  {
    short: "Members own their contributions",
    body: "Members keep ownership of what they contribute. Sharing something here does not sign it away; it is offered to the community on terms members can see.",
  },
  {
    short: "Members control their data",
    body: "Members control their own data — what is public, what is private, and the ability to edit or remove it. Data is held in trust, not treated as an asset.",
  },
  {
    short: "The rules are public",
    body: "The principles, guidelines and this policy are published openly before substantial member data is collected. Trust is not asked for on faith; it is earned by showing the terms in advance.",
  },
];

export default function GovernancePage() {
  return (
    <>
      <PageMasthead
        kicker="Governance & Ownership"
        word="Governance"
        title="Who holds what, and why — set out in the open."
        standfirst="Yoga Mandala is an independent, community-led network. Publishing how it is governed is not a formality; it is one of the clearest ways a community earns the trust of the people it asks to join."
        crumbs={[{ label: "About", href: "/about" }, { label: "Governance & Ownership" }]}
      />

      {/* S2 — the governance principles */}
      <section className="g-paper section">
        <div className="shell">
          <Reveal>
            <SectionLabel>Governance principles</SectionLabel>
          </Reveal>
          <ol className="mt-10 grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal
                as="li"
                key={p.short}
                delay={(i % 3) * 70}
                className="grid grid-cols-[3.5rem_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] py-10 last:border-b md:grid-cols-[6rem_minmax(0,18rem)_1fr] md:gap-12"
              >
                <span
                  className="tabnum"
                  style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", lineHeight: 1, color: "var(--color-brass)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="t-title m-0">{p.short}</h2>
                <p className="t-body m-0 measure">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* S3 — data ownership, stated plainly */}
      <section className="g-indigo-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>On your data</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">Held in trust, not owned by us.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:pt-16">
            <p className="t-body mt-0 mb-6 measure">
              Member information is collected only where there is a clear purpose, and never exposed publicly by
              default. You decide which profile fields are visible, and you can edit or delete what you have shared.
            </p>
            <p className="t-body mt-0 mb-0 measure">
              Who can access member data is documented, access is limited by role, and the database is backed up
              with a recovery process on record. When the privacy policy is finalised it will name a data
              controller and set out retention plainly. Data questions can be raised through the{" "}
              <Link href="/about/contact" className="link-rule">
                data &amp; privacy route
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* S4 — continuity & the people (blocked, honestly marked) */}
      <section className="g-paper section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Continuity</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">Who keeps it running</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-center gap-3">
              <span className="t-label opacity-55">Content pending</span>
              <SampleMark />
            </div>
            <p className="t-body mt-4 mb-0 measure">
              Governance names real people and a real structure — the administrators responsible for continuity,
              and whether the project is held by an entity, a trust or an informal collective. We will not invent
              any of it. This block stays visibly open until that is confirmed.
            </p>
            <div className="mt-8 border border-dashed border-[color-mix(in_srgb,var(--color-brass)_50%,transparent)] px-6 py-12 md:py-16">
              <p className="t-small m-0 opacity-70">
                Continuity administrators, the holding structure and the decision-making body to be published here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* S5 — the governing principle */}
      <section className="g-paper-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>The principle behind the policy</SectionLabel>
          <blockquote className="m-0 mt-8 border-y border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-10">
            <p className="t-lead m-0">
              Build the simplest useful version first. Let the community reveal what needs to exist next.
            </p>
          </blockquote>
          <p className="t-body mt-8 mb-0 measure">
            Governance grows the same way. Rather than write elaborate structures before they are needed, we
            publish what is settled, name what is not, and let the community shape the rest as it grows into them.
          </p>
        </div>
      </section>

      <ClosingBand
        lead="Community-led, independent, and answerable to its members."
        links={[
          { label: "About Yoga Mandala", href: "/about" },
          { label: "Community Principles", href: "/about/principles" },
          { label: "Community Guidelines", href: "/guidelines" },
          { label: "Contact", href: "/about/contact" },
        ]}
      />
    </>
  );
}
