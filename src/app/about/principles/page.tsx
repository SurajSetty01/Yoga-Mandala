import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { ClosingBand, PageMasthead } from "@/components/page";

export const metadata: Metadata = {
  title: "Community Principles",
  description:
    "How we participate together — the charter that governs conduct, claims and contributions across Yoga Mandala. Read as values, not legalese.",
};

/** §14, verbatim, restated as a charter. */
const PRINCIPLES = [
  {
    short: "Respect the diversity of traditions",
    body: "Respect Yoga's diversity of traditions while allowing thoughtful disagreement. Difference is not a problem to be resolved; a lineage is not diminished by another sitting beside it.",
  },
  {
    short: "No harassment",
    body: "No harassment, personal attacks or targeted hostility. Disagree with an argument, never demean the person making it.",
  },
  {
    short: "No spam or unsolicited promotion",
    body: "No spam or repeated unsolicited promotion. This is a shared record, not an advertising channel.",
  },
  {
    short: "No misleading claims",
    body: "No misleading claims about qualifications, outcomes or therapeutic benefits. Say plainly what you can and cannot support.",
  },
  {
    short: "No impersonation",
    body: "No impersonation, and no unnecessary personal information. Be who you say you are, and share no more of others than you need to.",
  },
  {
    short: "Respect copyright",
    body: "No copyright infringement or unauthorised distribution. Credit sources, and share only what you have the right to share.",
  },
  {
    short: "Use the right route",
    body: "Commercial offerings use the appropriate submission and listing route, so that what is being offered — and by whom — is always clear.",
  },
  {
    short: "Moderate consistently",
    body: "Moderators act consistently and document significant decisions. The same rules apply to everyone, and the reasoning is kept on record.",
  },
];

/** §11 claims standard. */
const CLAIMS = [
  { term: "Personal experience", body: "What has worked, or not, in your own practice or room." },
  { term: "Professional opinion", body: "A considered view, offered as a view — not as settled fact." },
  { term: "Traditional interpretation", body: "What a lineage or text holds, attributed to that source." },
  { term: "Evidence-supported", body: "Claims that can be traced to research, cited plainly." },
];

/** §14 submission lifecycle. */
const LIFECYCLE = [
  { state: "Draft", note: "Yours alone, not yet submitted." },
  { state: "Submitted", note: "Handed to moderation for review." },
  { state: "Under review", note: "Read against the community rules." },
  { state: "Approved / Changes / Rejected", note: "Accepted, returned with notes, or declined — with a reason.", branch: true },
  { state: "Published", note: "Live in the public record." },
  { state: "Expired / Archived", note: "Retired when its time has passed, but kept." },
];

export default function PrinciplesPage() {
  return (
    <>
      <PageMasthead
        kicker="Community Principles"
        word="Principles"
        title="How we participate together."
        standfirst="These are the values that hold the community together — a charter, not a terms-of-service page. They are published openly because members deserve to know the rules before they join, and because publishing them is itself a matter of trust."
        crumbs={[{ label: "About", href: "/about" }, { label: "Community Principles" }]}
      />

      {/* S2 — the eight principles, as a charter */}
      <section className="g-paper section">
        <div className="shell">
          <Reveal>
            <SectionLabel>The charter</SectionLabel>
          </Reveal>
          <ol className="mt-10 grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal
                as="li"
                key={p.short}
                delay={(i % 4) * 60}
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

      {/* S3 — on claims and traditions */}
      <section className="g-paper-deep section">
        <div className="shell">
          <Reveal>
            <SectionLabel>On claims and traditions</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              The most important habit here: say what kind of claim you are making.
            </h2>
          </Reveal>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CLAIMS.map((c, i) => (
              <Reveal
                as="div"
                key={c.term}
                delay={i * 70}
                className="border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] pt-5"
              >
                <dt className="t-title m-0">{c.term}</dt>
                <dd className="t-small mt-3 mb-0">{c.body}</dd>
              </Reveal>
            ))}
          </dl>
          <div className="mt-12 border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6 md:p-8">
            <p className="t-label m-0 opacity-60">A caution we keep</p>
            <p className="t-body mt-3 mb-0 measure-wide">
              Therapeutic and medical claims require appropriate care and should not be presented as diagnosis or
              medical advice. This is the site&rsquo;s clearest safety statement, and it holds everywhere — in a
              listing, a discussion or a profile.
            </p>
          </div>
        </div>
      </section>

      {/* S4 — the submission lifecycle */}
      <section className="g-indigo-deep section">
        <div className="shell">
          <Reveal>
            <SectionLabel>What happens when you submit something</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">
              Publishing the process is the strongest answer to &ldquo;who decides what gets published?&rdquo;
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {LIFECYCLE.map((l, i) => (
              <Reveal
                as="li"
                key={l.state}
                delay={i * 60}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-6 last:border-b md:grid-cols-[3rem_minmax(0,22rem)_1fr] md:gap-10"
              >
                <span
                  className="tabnum t-label opacity-50"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`t-title ${l.branch ? "measure-tight" : ""}`}>{l.state}</span>
                <span className="t-body">{l.note}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* S5 — moderation & contact, with the appeals gap flagged honestly */}
      <section className="g-paper section">
        <div className="shell max-w-3xl">
          <SectionLabel>Moderation and raising a concern</SectionLabel>
          <p className="t-body mt-8 mb-0 measure">
            Moderators act consistently and document significant decisions. If you believe something breaches these
            principles, or you want to question a decision, you can raise it through the{" "}
            <Link href="/about/contact" className="link-rule">
              moderation route on the contact page
            </Link>
            . The fuller policy lives in the{" "}
            <Link href="/guidelines" className="link-rule">
              Community Guidelines
            </Link>
            .
          </p>
          <div className="mt-8 border-l-2 border-[color-mix(in_srgb,var(--color-brass)_60%,transparent)] pl-5">
            <p className="t-small m-0 opacity-75">
              A note on appeals: a formal appeals process has not yet been defined. Rather than describe one that
              does not exist, we are naming the gap — it will be published here once the community has settled how
              moderation disputes should be handled.
            </p>
          </div>
        </div>
      </section>

      <ClosingBand
        lead="Values, not fine print. Read them, then help keep them."
        links={[
          { label: "Community Guidelines", href: "/guidelines" },
          { label: "Governance & Ownership", href: "/about/governance" },
          { label: "Contact & Moderation", href: "/about/contact" },
          { label: "About Yoga Mandala", href: "/about" },
        ]}
      />
    </>
  );
}
