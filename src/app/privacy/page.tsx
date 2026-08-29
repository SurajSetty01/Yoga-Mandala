import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui";
import { PageMasthead } from "@/components/page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Yoga Mandala collects, uses and protects member data — what is public, what is never shown, and how to edit or remove your information. A working draft, being finalised before member data is collected at scale.",
};

const INDEX = [
  { href: "#status", label: "Status of this policy" },
  { href: "#collect", label: "What we collect, and why" },
  { href: "#public", label: "What is public, what is private" },
  { href: "#control", label: "Your control over your profile" },
  { href: "#access", label: "Who can access member data" },
  { href: "#retention", label: "Retention" },
  { href: "#cookies", label: "Cookies and analytics" },
  { href: "#third-parties", label: "Third parties and data location" },
  { href: "#rights", label: "Your rights, and how to use them" },
  { href: "#contact", label: "Questions about your data" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageMasthead
        kicker="Privacy"
        word="Privacy"
        title="Your data, and the small amount of it we hold."
        standfirst="Yoga Mandala is built on trust between members, so how we handle personal information is not a footnote. This page states our principles plainly and describes the policy that governs them."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky section index */}
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

          {/* Prose body */}
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="prose">
              <div
                id="status"
                className="border border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] p-6"
                style={{ scrollMarginTop: "7rem" }}
              >
                <p className="t-label m-0 opacity-60">Status</p>
                <p className="t-body mt-3 mb-0">
                  This is a working draft, published so you can see how we intend to handle your data before you
                  are asked for any. It is being finalised with legal review, and the applicable
                  data-protection law depends on where members are located. We will not present template or
                  placeholder legal text as final — where a detail is still being settled, it says so. No
                  substantial member data is collected until this policy is complete.
                </p>
              </div>

              <h2 id="collect" style={{ scrollMarginTop: "7rem" }}>
                What we collect, and why
              </h2>
              <p>
                We collect only information that has a clear, stated purpose. Nothing is gathered because it might
                one day be useful.
              </p>
              <ul>
                <li>
                  <strong>Membership details</strong> — your name, email and location, and how you fit the
                  community. Your name and location form your member profile; your email is how we contact you.
                </li>
                <li>
                  <strong>Directory profile</strong> — if you apply for a Teacher Directory profile, the fields
                  you choose to provide, such as tradition, experience, qualifications and links. This is a
                  separate, optional step.
                </li>
                <li>
                  <strong>Submissions</strong> — the content you submit for review, such as events, resources and
                  listings, together with your name and email so a moderator can reach you.
                </li>
                <li>
                  <strong>Enquiries</strong> — messages you send through the site, relayed without exposing
                  either party&rsquo;s contact details.
                </li>
              </ul>

              <h2 id="public" style={{ scrollMarginTop: "7rem" }}>
                What is public, and what is never shown
              </h2>
              <p>
                We do not publish private phone numbers or email addresses by default, and we do not publish
                sensitive personal information at all. Contact between members happens through the site, so no
                one has to reveal an address to be reachable.
              </p>
              <ul>
                <li>Public by default: your name, general location and role.</li>
                <li>Public only if you choose: the fields you add to a directory profile.</li>
                <li>Never public: your email, and any contact detail you have not chosen to display.</li>
              </ul>

              <h2 id="control" style={{ scrollMarginTop: "7rem" }}>
                Your control over your profile
              </h2>
              <p>
                You decide which of your profile fields are visible. You can edit your profile at any time, and
                you can delete it. Deletion removes your public profile and the personal information we hold,
                subject to any records we are legally required to keep, which this policy will name once the
                jurisdiction is settled.
              </p>

              <h2 id="access" style={{ scrollMarginTop: "7rem" }}>
                Who can access member data
              </h2>
              <p>
                Access is limited by role. Moderators see the submissions and contact details they need to
                review content. A small number of administrators can access member records to run the site.
                Access is controlled by role-based permissions and secure authentication, and the full list of
                who holds what access will be documented here.
              </p>

              <h2 id="retention" style={{ scrollMarginTop: "7rem" }}>
                Retention
              </h2>
              <p>
                We keep member data for as long as you are a member, and submission records for as long as the
                content is published or under review. When you delete your profile, associated personal data is
                removed on a defined schedule. The exact retention periods are being confirmed and will be stated
                here.
              </p>

              <h2 id="cookies" style={{ scrollMarginTop: "7rem" }}>
                Cookies and analytics
              </h2>
              <p>
                The site uses only the cookies needed for it to work, such as keeping you signed in. If we
                introduce analytics, we will name the tool, say what it measures, and describe how to opt out
                before it is switched on. We do not use advertising trackers.
              </p>

              <h2 id="third-parties" style={{ scrollMarginTop: "7rem" }}>
                Third parties and where data is held
              </h2>
              <p>
                We do not sell member data, and we do not share it for marketing. Where a service provider helps
                us run the site — hosting, email delivery — they process data only on our instructions. The
                providers we rely on, and the country your data is stored in, will be listed here once
                confirmed.
              </p>

              <h2 id="rights" style={{ scrollMarginTop: "7rem" }}>
                Your rights, and how to use them
              </h2>
              <p>
                You can ask to see the data we hold about you, correct it, or have it deleted. You can withdraw
                consent for anything you previously agreed to. The precise set of rights depends on the law that
                applies to you, which this policy will confirm. In every case, a request reaches a person, not a
                form that goes nowhere.
              </p>

              <h2 id="contact" style={{ scrollMarginTop: "7rem" }}>
                Questions about your data
              </h2>
              <p>
                Data and privacy questions have their own route on the{" "}
                <Link href="/about/contact">Contact page</Link>, separate from general and moderation enquiries,
                so they reach the right person directly. We never publish an email address for this — the request
                is relayed to us through the site. For how these principles apply to participation more broadly,
                see the <Link href="/terms">Participation &amp; Terms</Link>.
              </p>

              <hr />
              <p className="t-small opacity-70">
                This policy sits alongside the{" "}
                <Link href="/terms">Participation &amp; Terms</Link> and the{" "}
                <Link href="/guidelines">Community Guidelines</Link>. Together they describe how we run the
                community and hold ourselves to it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
