import type { Metadata } from "next";
import Link from "next/link";
import { Badge, SectionLabel, ArrowLink } from "@/components/ui";
import { PageMasthead } from "@/components/page";
import { SubmitForm, type FieldGroup } from "@/components/submit/SubmitForm";
import { LISTING_CATEGORY, type ListingCategory } from "@/content/types";

export const metadata: Metadata = {
  title: "Submit a community listing",
  description:
    "Post to the Sangha Board — looking for a collaborator, offering teaching, a space, a project or a referral. Community listings are reviewed. Spam and self-promotion are not published.",
};

const GROUPS: FieldGroup[] = [
  {
    legend: "Your details",
    fields: [
      { kind: "text", name: "name", label: "Your name", required: true, autoComplete: "name", span: "half" },
      { kind: "email", name: "email", label: "Your email", required: true, autoComplete: "email", span: "half" },
    ],
  },
  {
    legend: "The listing",
    fields: [
      {
        kind: "select",
        name: "category",
        label: "Category",
        required: true,
        span: "half",
        options: (Object.keys(LISTING_CATEGORY) as ListingCategory[]).map((k) => ({
          value: k,
          label: `${LISTING_CATEGORY[k].label} — ${LISTING_CATEGORY[k].purpose}`,
        })),
      },
      { kind: "text", name: "location", label: "Location", hint: "City, region, or 'Online'.", required: true, span: "half" },
      { kind: "text", name: "title", label: "Title", hint: "A plain, specific line. What this is, in a few words.", required: true },
      {
        kind: "textarea",
        name: "description",
        label: "Description",
        hint: "What you are looking for or offering, and what a good response looks like. Keep it specific.",
        required: true,
      },
    ],
  },
];

const RULES = [
  "It is a genuine request, offer, space, project, referral or exchange within the community.",
  "It is specific — a vague post helps no one and is unlikely to pass review.",
  "It is not advertising, mass self-promotion or a commercial pitch dressed as a listing.",
  "Contact happens through the community, not by publishing anyone's phone number or email.",
];

export default function SubmitListingPage() {
  return (
    <>
      <PageMasthead
        kicker="Submit · A community listing"
        word="Board"
        title="Post to the Sangha Board."
        standfirst="Looking for a collaborator, offering teaching, a space to share, a project seeking hands, a referral worth passing on. The board is where members find each other."
        crumbs={[{ label: "Submit", href: "/submit" }, { label: "A community listing" }]}
      />

      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Before you begin</SectionLabel>
            <p className="t-body mt-6 mb-0 measure">
              A community listing is member-to-member. Once reviewed, it appears on the Sangha Board carrying the
              badge below — a member submission that meets the community rules.
            </p>
            <div className="mt-6">
              <Badge badge="community-listing" />
            </div>
            <div className="mt-8">
              <p className="t-label mb-4 opacity-55">What is allowed</p>
              <ul className="grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {RULES.map((r) => (
                  <li
                    key={r}
                    className="t-small flex gap-3 border-t border-[color-mix(in_srgb,var(--color-brass)_45%,transparent)] py-4 opacity-80 last:border-b"
                  >
                    <span aria-hidden style={{ color: "var(--color-brass)" }}>
                      —
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <ArrowLink href="/collaborate">See the Sangha Board</ArrowLink>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SubmitForm kind="listing" groups={GROUPS} />
          </div>
        </div>
      </section>

      <section className="g-indigo-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>After you submit</SectionLabel>
          <p className="t-body mt-6 mb-0 measure">
            A moderator checks the listing against the community rules. Spam and self-promotion are declined.
            Approved listings run until they expire, then archive. See the full lifecycle and the standards on
            the{" "}
            <Link href="/guidelines" className="link-rule">
              Community Guidelines
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
