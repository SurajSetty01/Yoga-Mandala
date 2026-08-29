import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui";
import { PageMasthead } from "@/components/page";

export const metadata: Metadata = {
  title: "Participation & Terms",
  description:
    "The terms of taking part in Yoga Mandala — who may join, acceptable use, what members keep and what they grant, what verification does and does not mean, moderation, and the limits of what an independent community can promise.",
};

const INDEX = [
  { href: "#status", label: "Status of these terms" },
  { href: "#who", label: "Who may join" },
  { href: "#use", label: "Acceptable use" },
  { href: "#your-content", label: "Your content, and what you grant" },
  { href: "#our-role", label: "What we may publish, edit or remove" },
  { href: "#verification", label: "What verification means" },
  { href: "#external", label: "External offerings" },
  { href: "#claims", label: "Health and therapeutic claims" },
  { href: "#moderation", label: "Moderation and enforcement" },
  { href: "#liability", label: "The limits of what we promise" },
  { href: "#independence", label: "Who we are" },
];

export default function TermsPage() {
  return (
    <>
      <PageMasthead
        kicker="Participation & Terms"
        word="Terms"
        title="What taking part asks of you, and what it asks of us."
        standfirst="Yoga Mandala is an independent, community-led project. These terms describe how we participate together honestly — including the things a community like this cannot and should not promise."
        crumbs={[{ label: "Home", href: "/" }, { label: "Participation & Terms" }]}
      />

      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>On this page</SectionLabel>
              <nav aria-label="Sections" className="mt-6">
                <ol className="grid gap-3 p-0" style={{ listStyle: "none" }}>
                  {INDEX.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="t-small link-rule opacity-75">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="prose">
              <div
                id="status"
                className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6"
                style={{ scrollMarginTop: "7rem" }}
              >
                <p className="t-label m-0 opacity-60">Status</p>
                <p className="t-body mt-3 mb-0">
                  This is a working draft, published so the terms of participation are visible before you join.
                  It is being finalised with legal review, and some clauses — governing law in particular —
                  depend on decisions still being made. We will not present template legal text as final. No
                  clause here is written to trap you; where a point is unsettled, it says so.
                </p>
              </div>

              <h2 id="who" style={{ scrollMarginTop: "7rem" }}>
                Who may join
              </h2>
              <p>
                Membership is intended for Yoga teachers and serious practitioners. Joining makes you a Member.
                Appearing in the Teacher Directory as a Verified Teacher is a separate step, reviewed against
                published criteria. You are responsible for keeping your account details accurate and for
                anything done through your account.
              </p>

              <h2 id="use" style={{ scrollMarginTop: "7rem" }}>
                Acceptable use
              </h2>
              <p>
                Taking part means following the{" "}
                <Link href="/guidelines">Community Guidelines</Link>. In short: contribute honestly, respect
                other members, and do not use the community for spam, harassment, misrepresentation or
                commercial exploitation. The guidelines are the working detail; these terms make them binding.
              </p>

              <h2 id="your-content" style={{ scrollMarginTop: "7rem" }}>
                Your content, and what you grant
              </h2>
              <p>
                You keep ownership of what you submit — your profile, listings, resources and contributions
                remain yours. By submitting, you grant Yoga Mandala a non-exclusive licence to display, edit for
                clarity, and distribute that content within the community and its public pages, for as long as
                it is published. You confirm you have the right to submit it, and that it does not infringe
                anyone else&rsquo;s rights. For resources in particular, you must provide accurate source and
                rights information.
              </p>

              <h2 id="our-role" style={{ scrollMarginTop: "7rem" }}>
                What we may publish, edit or remove
              </h2>
              <p>
                Every submission is reviewed by a person before it is published. We may accept a submission,
                request changes, or decline it. We may edit for clarity, accuracy or presentation, and we may
                remove content that breaches these terms or the guidelines. We do not guarantee that any
                submission will be published, and confirmation of receipt is never a promise of publication.
              </p>

              <h2 id="verification" style={{ scrollMarginTop: "7rem" }}>
                What verification means
              </h2>
              <p>
                A &ldquo;Verified Teacher&rdquo; badge means the information submitted has been reviewed against
                the directory&rsquo;s published criteria. It should not be read as a blanket endorsement of that
                teacher, their methods, or any service they offer. Verification is a check of stated information,
                not a guarantee of quality, and you remain responsible for your own decisions about who you
                learn from or work with.
              </p>

              <h2 id="external" style={{ scrollMarginTop: "7rem" }}>
                External offerings
              </h2>
              <p>
                Curated Community Listings and other external opportunities are selected for relevance. They are{" "}
                <strong>not</strong> automatically Yoga Mandala programmes, and listing them is not endorsement.
                Any arrangement you enter into with an external organiser — a retreat, a training, a paid
                programme — is between you and them. We are not a party to it and are not responsible for its
                delivery, refunds or outcomes.
              </p>

              <h2 id="claims" style={{ scrollMarginTop: "7rem" }}>
                Health and therapeutic claims
              </h2>
              <p>
                Content on Yoga Mandala, including anything shared by members or verified teachers, is for
                educational and community purposes. It is not medical advice, diagnosis or treatment, and must
                not be presented as such. Yoga therapy and health-related practices carry real risks; consult a
                qualified professional before acting on anything you read here. Members must not make medical or
                therapeutic claims they cannot support, and doing so is grounds for removal.
              </p>

              <h2 id="moderation" style={{ scrollMarginTop: "7rem" }}>
                Moderation and enforcement
              </h2>
              <p>
                Moderators may edit, decline, remove or unpublish content, and may suspend or end membership for
                serious or repeated breaches. If you believe a decision was wrong, you can raise it through the
                moderation route on the <Link href="/about/contact">Contact page</Link>. The appeals process is
                still being defined; we would rather say that plainly than describe a process that does not yet
                exist.
              </p>

              <h2 id="liability" style={{ scrollMarginTop: "7rem" }}>
                The limits of what we promise
              </h2>
              <p>
                We run this community carefully, but we cannot guarantee that every piece of content is
                accurate, that the site is always available, or that connections made here will work out. To the
                extent the law allows, Yoga Mandala is not liable for losses arising from your use of the site,
                from content submitted by members, or from dealings with other members or external organisers.
                Nothing in these terms limits any liability that cannot lawfully be limited. The governing law
                will be stated here once confirmed.
              </p>

              <h2 id="independence" style={{ scrollMarginTop: "7rem" }}>
                Who we are
              </h2>
              <p>
                Yoga Mandala is independent and community-led. It is not a certifying body, a school, or an agent
                for any teacher or organiser listed here. What it offers is a carefully moderated place for
                teachers and serious practitioners to learn, connect and contribute. How the project is held and
                governed is described in <Link href="/about/governance">Governance &amp; Ownership</Link>.
              </p>

              <hr />
              <p className="t-small opacity-70">
                These terms sit alongside the <Link href="/privacy">Privacy Policy</Link> and the{" "}
                <Link href="/guidelines">Community Guidelines</Link>. Questions about any of them can be sent
                through the <Link href="/about/contact">Contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
