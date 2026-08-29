import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { PageMasthead } from "@/components/page";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description:
    "The full community guidelines — purpose, expected conduct, what gets moderated, badge and listing rules, submission rules and the moderation lifecycle. The plain reference version of our Community Principles.",
};

export default function GuidelinesPage() {
  return (
    <>
      <PageMasthead
        kicker="Community Guidelines"
        word="Guidelines"
        title="The full guidelines, in plain terms."
        standfirst="This is the reference version of our Community Principles — the same values, written out in full for anyone who wants the detail. It is linked from every submission form and from the footer, so the rules are always one click away."
        crumbs={[{ label: "Community Guidelines" }]}
      />

      <section className="g-paper section">
        <div className="shell">
          <Reveal>
            <SectionLabel>Community Guidelines</SectionLabel>
          </Reveal>
          <div className="prose mt-10">
            <h2>Purpose</h2>
            <p>
              Yoga Mandala is an independent, community-led network for Yoga teachers and serious practitioners. It
              exists to be a permanent home for knowledge, learning and genuine collaboration — the things that get
              lost in the scroll of a messaging group. These guidelines describe how we participate together so
              that the record stays trustworthy and the space stays welcoming.
            </p>
            <p>
              They apply to everything published here: profiles, listings, discussions, submissions and messages.
              They are written as values first and rules second. Where a judgement call is needed, the spirit of
              these guidelines matters more than the letter.
            </p>

            <h2>Expected conduct</h2>
            <p>
              We hold a wide range of traditions and views. That breadth is a strength, not a problem to be
              resolved. Members are expected to:
            </p>
            <ul>
              <li>
                Respect Yoga&rsquo;s diversity of traditions while allowing thoughtful disagreement. Challenge ideas
                on their merits; a lineage is not diminished by another sitting beside it.
              </li>
              <li>
                Avoid harassment, personal attacks or targeted hostility. Disagree with an argument, never demean
                the person making it.
              </li>
              <li>
                Refrain from spam and repeated unsolicited promotion. This is a shared record, not an advertising
                channel.
              </li>
              <li>
                Represent yourself honestly. No impersonation, and no sharing of others&rsquo; personal information
                beyond what is genuinely needed.
              </li>
              <li>
                Respect copyright. Do not post infringing material or distribute work without the right to do so,
                and credit your sources.
              </li>
            </ul>

            <h2>Honesty about claims</h2>
            <p>
              Because so much of what is shared here shapes how others teach and practise, we ask members to be
              clear about the <em>kind</em> of claim they are making. Distinguish:
            </p>
            <ul>
              <li>
                <strong>Personal experience</strong> — what has worked, or not, in your own practice or room.
              </li>
              <li>
                <strong>Professional opinion</strong> — a considered view, offered as a view rather than settled
                fact.
              </li>
              <li>
                <strong>Traditional interpretation</strong> — what a lineage or text holds, attributed to that
                source.
              </li>
              <li>
                <strong>Evidence-supported information</strong> — claims that can be traced to research, cited
                plainly.
              </li>
            </ul>
            <p>
              Therapeutic and medical claims require particular care. They must never be presented as diagnosis or
              medical advice, and should carry the appropriate caution. Misleading claims about qualifications,
              outcomes or therapeutic benefits are not permitted.
            </p>

            <h2>What gets moderated</h2>
            <p>
              Moderation exists to keep the record trustworthy, not to enforce a single point of view. Content is
              likely to be edited, held or removed when it:
            </p>
            <ul>
              <li>Harasses, attacks or targets a person or group.</li>
              <li>Makes misleading claims about qualifications, outcomes or therapeutic and medical benefits.</li>
              <li>Is spam, or repeated unsolicited promotion.</li>
              <li>Impersonates someone, or exposes personal information without cause.</li>
              <li>Infringes copyright or distributes work without permission.</li>
              <li>Uses the wrong route — for example, a commercial offering posted outside the listing process.</li>
            </ul>
            <p>Moderators act consistently and document significant decisions, so the reasoning is on record.</p>

            <h2>Badges and listings</h2>
            <p>
              Every listing carries a badge that states exactly what it is. We never blur these categories: a
              programme we run and an opportunity we merely selected should never look like the same kind of thing.
            </p>
            <ul>
              <li>
                <strong>Yoga Mandala Learning Initiative</strong> — formally organised or endorsed by Yoga Mandala.
              </li>
              <li>
                <strong>Curated Community Listing</strong> — an external opportunity selected for relevance, not run
                by us.
              </li>
              <li>
                <strong>Community Listing</strong> — a member-submitted listing that meets the community rules.
              </li>
              <li>
                <strong>Partner / Guest</strong> — a legitimate external collaborator or organisation.
              </li>
            </ul>
            <p>
              A badge is a statement of what something is, never a blanket endorsement. Where a teacher is marked as
              reviewed, it means their submitted information was checked against the criteria — it does not imply we
              vouch for everything they do.
            </p>

            <h2>Submission rules</h2>
            <p>
              Anyone submitting an event, learning opportunity, resource or listing is asked to keep to a few
              straightforward rules:
            </p>
            <ul>
              <li>Submit through the route that matches what you are offering.</li>
              <li>Describe it accurately, including fees, format and who it is for.</li>
              <li>Only submit what you have the right to share, and credit sources.</li>
              <li>Do not present a commercial offering as a Yoga Mandala programme.</li>
              <li>Keep personal information — yours and others&rsquo; — to what the listing genuinely needs.</li>
            </ul>

            <h2>The moderation lifecycle</h2>
            <p>Everything submitted moves through a visible sequence, so you always know where it stands:</p>
            <ol>
              <li>
                <strong>Draft</strong> — yours alone, not yet submitted.
              </li>
              <li>
                <strong>Submitted</strong> — handed to moderation for review.
              </li>
              <li>
                <strong>Under review</strong> — read against these guidelines.
              </li>
              <li>
                <strong>Approved, changes requested, or rejected</strong> — accepted, returned with notes, or
                declined with a reason.
              </li>
              <li>
                <strong>Published</strong> — live in the public record.
              </li>
              <li>
                <strong>Expired or archived</strong> — retired when its time has passed, but kept on record.
              </li>
            </ol>

            <h2>Enforcement and appeals</h2>
            <p>
              Enforcement is proportionate. A first, minor issue usually means a note and a chance to correct it.
              Repeated or serious breaches can lead to content being removed and, in the most serious cases, to a
              member&rsquo;s access being limited. Significant actions are documented.
            </p>
            <p>
              A formal appeals process has not yet been defined. Rather than describe one that does not exist, we
              are naming the gap honestly — it will be published here once the community has settled how moderation
              disputes should be handled. In the meantime, if you believe a decision was wrong, you can raise it
              through the moderation route on the{" "}
              <Link href="/about/contact">contact page</Link>, and it will be read.
            </p>

            <hr />

            <p>
              These guidelines are the plain version of our{" "}
              <Link href="/about/principles">Community Principles</Link>. For how the project is run and who owns
              what, see <Link href="/about/governance">Governance &amp; Ownership</Link>. To reach us, use the{" "}
              <Link href="/about/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
