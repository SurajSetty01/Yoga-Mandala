import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowLink, SampleMark, SectionLabel } from "@/components/ui";
import { ClosingBand, PageMasthead } from "@/components/page";
import { PILLARS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Yoga Mandala is, and what it is not. An independent, community-led network for Yoga teachers and serious practitioners — not a certification body, a marketplace or a guru platform.",
};

/** §3 comparison, rendered as a typographic table. */
const CHANNELS: { whatsapp: string; portal: string }[] = [
  { whatsapp: "Fast conversation", portal: "Permanent information home" },
  { whatsapp: "Easily lost in the scroll", portal: "Findable, structured, kept" },
  { whatsapp: "Who is who is unclear", portal: "Profiles, traditions, places" },
  { whatsapp: "Announcements disappear", portal: "A durable public record" },
  { whatsapp: "Belongs to a platform", portal: "Belongs to the community" },
];

const IS = [
  "A community-led network for Yoga teachers and serious practitioners.",
  "A permanent home for knowledge, learning and genuine collaboration.",
  "A place that keeps traditions distinct and attributes them honestly.",
  "A directory where members are found by place, tradition and practice.",
  "An independent project, accountable to its members rather than a platform.",
];

const IS_NOT = [
  "A certification body — we do not accredit teachers or issue qualifications.",
  "A marketplace — we are not here to sell courses, take commissions or rank sellers.",
  "A guru platform — no single teacher, lineage or organisation is elevated above the rest.",
  "An endorsement engine — a listing is never a blanket recommendation.",
  "A social feed — we are not competing for attention or optimising for engagement.",
];

/** §15 governance principles, set as a numbered editorial list. */
const GOVERNANCE = [
  "Yoga Mandala should be community-led rather than developer-led.",
  "The platform stays independent of any single organisation, lineage or commercial interest.",
  "Members keep ownership of what they contribute, and control over their own data.",
  "Significant decisions are documented, and the rules that bind members are published openly.",
];

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        kicker="About"
        word="About"
        title="A permanent, community-led home for Yoga teaching — built to last, not to trend."
        standfirst={SITE.description}
        crumbs={[{ label: "About" }]}
      />

      {/* S2 — the four pillars, expanded */}
      <section className="g-paper-deep section">
        <div className="shell">
          <Reveal>
            <SectionLabel>What it is built on</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">Four pillars, held apart on purpose.</h2>
          </Reveal>
          <dl className="mt-12 grid gap-0">
            {PILLARS.map((p, i) => (
              <Reveal
                as="div"
                key={p.name}
                delay={i * 70}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] py-7 last:border-b md:grid-cols-[5rem_minmax(0,12rem)_1fr] md:gap-10"
              >
                <dt
                  className="tabnum"
                  style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-brass)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dt className="t-title">
                  <Link href={p.href} className="link-rule">
                    {p.name}
                  </Link>
                </dt>
                <dd className="t-body m-0 measure">{p.meaning}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* S3 — WhatsApp and the portal: two columns, one argument */}
      <section className="g-paper section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Why a portal, not just a group</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">The conversation happens elsewhere. The record lives here.</h2>
            <p className="t-body mt-6 mb-0 measure">
              A messaging group is where a community talks. It is a poor place for a community to remember. This
              site exists to hold the things worth keeping.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-2 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)]">
              <div className="border-r border-[color-mix(in_srgb,var(--color-brass)_35%,transparent)] pb-4 pt-5 pr-6">
                <span className="t-label opacity-55">A messaging group</span>
              </div>
              <div className="pb-4 pt-5 pl-6">
                <span className="t-label opacity-55">This portal</span>
              </div>
              {CHANNELS.map((row) => (
                <div key={row.portal} className="contents">
                  <div className="border-t border-r border-[color-mix(in_srgb,var(--color-brass)_35%,transparent)] py-5 pr-6">
                    <span className="t-body">{row.whatsapp}</span>
                  </div>
                  <div className="border-t border-[color-mix(in_srgb,var(--color-brass)_35%,transparent)] py-5 pl-6">
                    <span className="t-body">{row.portal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S4 — what we are / what we are not */}
      <section className="g-indigo-deep section">
        <div className="shell">
          <Reveal>
            <SectionLabel>The pivot</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              The clearest way to say what this is, is to be exact about what it is not.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="t-label mb-6 opacity-60">Yoga Mandala is</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {IS.map((line, i) => (
                  <Reveal
                    as="li"
                    key={line}
                    delay={i * 60}
                    className="t-title border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-6 first:border-t-0 first:pt-0"
                  >
                    {line}
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal className="bg-[var(--color-paper)] text-[var(--color-ink)] p-8 md:p-10 lg:-mr-6 lg:mt-8">
              <div>
                <p className="t-label mb-6 opacity-60">Yoga Mandala is not</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {IS_NOT.map((line) => (
                    <li
                      key={line}
                      className="t-body border-t border-[color-mix(in_srgb,var(--color-ink)_16%,transparent)] py-5 first:border-t-0 first:pt-0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* S5 — independence & neutrality */}
      <section className="g-paper section">
        <div className="shell max-w-3xl">
          <SectionLabel>Independence and neutrality</SectionLabel>
          <blockquote className="m-0 mt-8 border-y border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-10">
            <p className="t-lead m-0">
              Yoga Mandala stays independent of any single organisation, lineage or commercial interest. This
              distinction protects neutrality, trust and long-term credibility.
            </p>
          </blockquote>
          <p className="t-body mt-8 mb-0 measure">
            In practice this means every organisation&rsquo;s offerings are labelled for what they are. A programme
            we run, a listing we merely selected and a partner&rsquo;s external event are never made to look like
            the same kind of thing — the badge on each says exactly what it is.
          </p>
        </div>
      </section>

      {/* S6 — the people (blocked, honestly marked) */}
      <section className="g-paper-deep section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>The people</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0">Who runs it</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-center gap-3">
              <span className="t-label opacity-55">Content pending</span>
              <SampleMark />
            </div>
            <p className="t-body mt-4 mb-0 measure">
              The founding story and the people behind Yoga Mandala belong here. We are not going to invent them.
              This block stays visibly empty until the community supplies real names, roles and history — a
              community&rsquo;s origin is not a placeholder decision.
            </p>
            <div className="mt-8 border border-dashed border-[color-mix(in_srgb,var(--color-brass)_50%,transparent)] px-6 py-12 md:py-16">
              <p className="t-small m-0 opacity-70">Founders, roles and founding story to be published here.</p>
            </div>
          </div>
        </div>
      </section>

      {/* S7 — governance & ownership */}
      <section className="g-indigo section">
        <div className="shell">
          <Reveal>
            <SectionLabel>Governance &amp; ownership</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              Publishing how it is governed is itself a way of being trustworthy.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {GOVERNANCE.map((line, i) => (
              <Reveal
                as="li"
                key={line}
                delay={i * 70}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-7 last:border-b md:grid-cols-[5rem_1fr] md:gap-10"
              >
                <span
                  className="tabnum"
                  style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-brass)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-title measure-wide">{line}</span>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <ArrowLink href="/about/governance">The full governance policy</ArrowLink>
          </div>
        </div>
      </section>

      {/* S8 — closing principle */}
      <ClosingBand
        lead="Build the simplest useful version first. Let the community reveal what needs to exist next."
        sub="The principle that shapes every decision here."
        links={[
          { label: "Community Principles", href: "/about/principles" },
          { label: "Community Guidelines", href: "/guidelines" },
          { label: "Governance & Ownership", href: "/about/governance" },
          { label: "Contact", href: "/about/contact" },
        ]}
      />
    </>
  );
}
