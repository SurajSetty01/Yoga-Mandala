import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui";
import { PageMasthead, ClosingBand } from "@/components/page";
import { JoinForm } from "@/components/join/JoinForm";

export const metadata: Metadata = {
  title: "Join the Sangha",
  description:
    "Membership is for Yoga teachers and serious practitioners. Joining makes you a Member — profile, participation, submissions and event registration. A verified directory profile is a separate, reviewed step.",
};

const TIERS = [
  {
    tier: "Member",
    gain: "Profile, participation, submissions and event registration.",
    detail:
      "What joining gives you today. You take part in the community, register for events, and submit events, resources, listings and learning opportunities for review.",
  },
  {
    tier: "Verified Teacher",
    gain: "A teacher directory profile, after verification.",
    detail:
      "A separate, reviewed step. You join as a Member first, then apply for a directory profile, which is reviewed against published criteria. Verification confirms your information was reviewed — it is not a blanket endorsement.",
  },
];

const EXPECTATIONS = [
  {
    term: "It is read by a person",
    body: "Membership, like every submission on the site, passes through a human. This is a community, not a sign-up funnel.",
  },
  {
    term: "You are asked for little",
    body: "Name, email, location and how you fit the community. Nothing more at this stage. A phone number, bio, qualifications and photo belong to the directory application, not to joining.",
  },
  {
    term: "A profile comes next",
    body: "Once you are a Member, appearing in the Teacher Directory is a separate application, reviewed against criteria published on the directory page.",
  },
];

const PRIVACY = [
  "Your name, location and role become part of your public member profile.",
  "Your email is used to contact you and is never shown publicly.",
  "You control which of your profile fields are public, and you can edit or delete your profile at any time.",
  "Contact between members happens without exposing anyone's email or phone number.",
  "We do not sell member data, and we do not publish contact details by default.",
];

export default function JoinPage() {
  return (
    <>
      <PageMasthead
        kicker="Join the Sangha"
        word="Join"
        title="An open door for Yoga teachers and serious practitioners."
        standfirst="This community is built around careful practice and honest teaching. Joining makes you a Member. It takes a few minutes, and it asks for as little as it can."
        crumbs={[{ label: "Home", href: "/" }, { label: "Join the Sangha" }]}
      />

      {/* S2 — what membership means */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>What membership means</SectionLabel>
          <p className="t-lead mt-8 mb-0 measure-wide">
            Two tiers, stated plainly. Joining makes you a Member. A directory profile is a separate step, so
            that nobody joins expecting to appear in the directory the same day.
          </p>
          <dl className="mt-12 grid gap-0">
            {TIERS.map((t, i) => (
              <Reveal
                as="div"
                key={t.tier}
                delay={i * 70}
                className="grid grid-cols-1 items-baseline gap-x-10 gap-y-3 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-8 last:border-b md:grid-cols-[minmax(0,16rem)_1fr]"
              >
                <div>
                  <dt className="t-title m-0">{t.tier}</dt>
                  <p className="t-small mt-3 mb-0 opacity-70 measure">{t.gain}</p>
                </div>
                <dd className="t-body m-0 measure">{t.detail}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="t-small mt-8 mb-0 opacity-70">
            The path is explicit: join as a Member, then apply for a directory profile, reviewed against the
            criteria on the{" "}
            <Link href="/connect/directory" className="link-rule">
              Teacher Directory
            </Link>
            .
          </p>
        </div>
      </section>

      {/* S3 — the form */}
      <section className="g-paper section-lg">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Join</SectionLabel>
            <h2 className="t-display-m mt-6 mb-0 measure-tight">Short, and it says why it asks.</h2>
            <p className="t-body mt-6 mb-0 measure">
              Every field carries the reason we ask for it. Anything we cannot justify in a line is not here.
              Membership is free.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <JoinForm />
          </div>
        </div>
      </section>

      {/* S4 — what happens next */}
      <section className="g-paper-deep section">
        <div className="shell">
          <SectionLabel>What happens next</SectionLabel>
          <dl className="mt-10 grid gap-0">
            {EXPECTATIONS.map((e, i) => (
              <Reveal
                as="div"
                key={e.term}
                delay={i * 70}
                className="grid grid-cols-[3rem_1fr] items-baseline gap-6 border-t border-[color-mix(in_srgb,var(--color-brass)_55%,transparent)] py-7 last:border-b md:grid-cols-[5rem_minmax(0,20rem)_1fr] md:gap-10"
              >
                <dt
                  className="tabnum"
                  style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-brass)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dt className="t-title">{e.term}</dt>
                <dd className="t-body m-0 measure">{e.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* S5 — privacy in plain language */}
      <section className="g-indigo-deep section">
        <div className="shell max-w-3xl">
          <SectionLabel>Privacy, in plain language</SectionLabel>
          <h2 className="t-display-m mt-6 mb-0 measure-tight">
            A community of professionals reads this before joining. So it is written to be read.
          </h2>
          <ul className="mt-10 grid gap-0" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {PRIVACY.map((p) => (
              <li
                key={p}
                className="t-body flex gap-4 border-t border-[color-mix(in_srgb,var(--color-paper)_22%,transparent)] py-5 last:border-b"
              >
                <span aria-hidden style={{ color: "var(--color-brass)" }}>
                  —
                </span>
                <span className="measure">{p}</span>
              </li>
            ))}
          </ul>
          <p className="t-small mt-8 mb-0 opacity-70">
            The full detail is in the{" "}
            <Link href="/privacy" className="link-rule">
              Privacy Policy
            </Link>{" "}
            and the{" "}
            <Link href="/terms" className="link-rule">
              Participation &amp; Terms
            </Link>
            .
          </p>
        </div>
      </section>

      <ClosingBand
        lead="Practice is personal. A community is not."
        sub="Read how we participate together before you join, or see who is already here."
        links={[
          { label: "Community Guidelines", href: "/guidelines" },
          { label: "Teacher Directory", href: "/connect/directory" },
          { label: "What Yoga Mandala is", href: "/about" },
        ]}
      />
    </>
  );
}
