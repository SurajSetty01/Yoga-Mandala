import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArtPlate } from "@/components/ui/Plate";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * Shared Community Principles content — a charter, not a T&C page. Rendered by both
 * /about/principles and /guidelines. §14 principles verbatim, §11 claims distinction + medical
 * caution, and the eight-state submission lifecycle published for transparency. The single
 * site-wide arch mask (T7) appears in the claims section.
 */

// §14, verbatim (short restatement + the framework wording).
const PRINCIPLES: { short: string; text: string }[] = [
  {
    short: "Respect the diversity of traditions",
    text: "Respect Yoga's diversity of traditions while allowing thoughtful disagreement.",
  },
  { short: "No harassment", text: "No harassment, personal attacks or targeted hostility." },
  { short: "No spam", text: "No spam or repeated unsolicited promotion." },
  {
    short: "No misleading claims",
    text: "No misleading claims about qualifications, outcomes or therapeutic benefits.",
  },
  {
    short: "No impersonation",
    text: "No impersonation or unnecessary personal information.",
  },
  {
    short: "Respect copyright",
    text: "No copyright infringement or unauthorised distribution.",
  },
  {
    short: "Use the right route to offer",
    text: "Commercial offerings use the appropriate submission or listing route.",
  },
  {
    short: "Moderation is consistent and documented",
    text: "Moderators act consistently and document significant decisions.",
  },
];

const CLAIMS = [
  { term: "Personal experience", note: "What you have found in your own practice and teaching." },
  { term: "Professional opinion", note: "A considered view, offered as such." },
  { term: "Traditional interpretation", note: "What a lineage or text has held." },
  { term: "Evidence-supported information", note: "Claims a body of research supports." },
];

const LIFECYCLE = [
  { state: "Draft", note: "Being written." },
  { state: "Submitted", note: "Sent for review." },
  { state: "Under review", note: "A moderator is reading it." },
  { state: "Approved", note: "Accepted; a category and badge are assigned." },
  { state: "Changes requested", note: "Returned to you with notes." },
  { state: "Rejected", note: "Declined, with a reason, logged." },
  { state: "Published", note: "Live, with a review or expiry date." },
  { state: "Expired / archived", note: "Retired when its time has passed." },
];

export function Principles() {
  return (
    <>
      {/* S2 · The principles — a numbered charter */}
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <SectionLabel>The principles</SectionLabel>
        <ol className="mt-10 border-t rule-gold">
          {PRINCIPLES.map((p, i) => (
            <li key={i} className="border-b rule-gold">
              <Reveal>
                <div className="grid gap-4 py-8 md:grid-cols-[auto_1fr] md:gap-10">
                  <span className="font-display text-display-m leading-none text-gold/60 tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-title">{p.short}</h3>
                    <p className="measure mt-2 text-body text-bark-soft">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* S3 · On claims and traditions — arch mask (T7, used once here) */}
      <section className="bg-sand-deep py-section">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.5fr] lg:items-center">
            <div>
              <SectionLabel>On claims &amp; traditions</SectionLabel>
              <h2 className="mt-4 max-w-2xl font-display text-display-m">
                Say clearly what kind of thing you are saying.
              </h2>
              <p className="measure mt-6 text-body text-bark-soft">
                When you share something, distinguish which of these it is — so that a personal
                view is never mistaken for settled evidence:
              </p>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                {CLAIMS.map((c) => (
                  <div key={c.term} className="border-t-2 border-gold/50 pt-3">
                    <dt className="font-display text-title">{c.term}</dt>
                    <dd className="mt-1 text-small text-bark-soft">{c.note}</dd>
                  </div>
                ))}
              </dl>
              <p className="measure mt-8 border-l-2 border-terracotta pl-4 text-small text-bark-soft">
                Therapeutic and medical claims require appropriate care and must not be presented
                as diagnosis or medical advice.
              </p>
            </div>

            <div className="mx-auto w-56 lg:w-full">
              <div className="arch-mask">
                <ArtPlate variant="manuscript" label="A manuscript niche (archival motif)" ratio="3 / 4" rounded={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S4 · The submission lifecycle — published (dark) */}
      <section className="bg-forest-deep py-section text-sand">
        <div className="mx-auto max-w-content px-6">
          <SectionLabel tone="sand">What happens when you submit something</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-display-m">
            Nothing appears until a person has read it.
          </h2>
          <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {LIFECYCLE.map((s, i) => (
              <li key={s.state} className="border-t border-sand/25 pt-4">
                <span className="section-label text-gold tnum">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-title text-sand">{s.state}</p>
                <p className="mt-1 text-small text-sand/70">{s.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* S5 · Moderation & contact */}
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="measure-wide">
          <SectionLabel>Moderation &amp; raising a concern</SectionLabel>
          <p className="mt-5 text-lead text-bark-soft">
            Moderators act consistently and document significant decisions. Human moderators keep
            final authority over what is published.
          </p>
          <p className="mt-6 measure text-small text-bark-soft">
            An appeals and dispute process will be published here before member submissions open —
            the framework raises this question and does not yet answer it, so we are not inventing
            one. In the meantime, concerns can be raised with the moderation contact.
          </p>
        </div>
      </section>
    </>
  );
}
