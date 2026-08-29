import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PullQuote } from "@/components/ui/PullQuote";
import { PendingBlock } from "@/components/ui/PendingBlock";
import { ArtPlate } from "@/components/ui/Plate";
import { Reveal } from "@/lib/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Yoga Mandala is, what it is not, and the principle it is built on — a community-led network of Yoga teachers across India and abroad.",
};

const IS = [
  "A community-led network",
  "A learning ecosystem",
  "A teacher-to-teacher connection platform",
  "A curated discovery space",
  "A home for meetups, study circles and expert conversations",
];

const IS_NOT = [
  "A personal-brand website",
  "A disguised advertising channel for one organisation",
  "A social-media clone",
  "A place for unrestricted promotional posting",
  "A repository for unauthorised copyrighted material",
];

const WHATSAPP_VS_PORTAL: [string, string][] = [
  ["Fast conversation and announcements", "The permanent, searchable information home"],
  ["Where the day-to-day happens", "Where things stay findable in six months"],
  ["Drives people toward the portal", "Holds the structured record"],
];

export default function AboutPage() {
  return (
    <>
      {/* S1 · Mission as wall text — pure typography, no image */}
      <section className="mx-auto max-w-content px-6 pt-section-sm">
        <SectionLabel>About</SectionLabel>
        <Reveal>
          <p className="mt-8 max-w-[20ch] font-display text-display-l leading-[1.05]">
            A community and learning ecosystem for Yoga teachers and serious practitioners.
          </p>
        </Reveal>
        <p className="measure-wide mt-8 text-lead text-bark-soft">
          The portal is the digital home of the community — the structured, searchable, permanent
          layer beneath WhatsApp, which stays the fast conversation layer. Its promise is four
          words: learn, connect, collaborate, serve.
        </p>
        <p className="mt-6 text-small text-bark-soft">
          Today the community spans more than 700 Yoga teachers across India and abroad.
        </p>
        <hr className="mt-12 border-t rule-gold" />
      </section>

      {/* S2 · The four pillars, expanded — column strips */}
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Learn", "Structured learning, resources, study and teacher development."],
            ["Connect", "Find fellow teachers, practitioners, experts and community members."],
            ["Collaborate", "Share opportunities, spaces, projects, referrals and professional needs."],
            ["Serve", "Contribute knowledge, volunteer, mentor and strengthen the wider ecosystem."],
          ].map(([word, meaning], i) => (
            <Reveal key={word} delay={i * 60}>
              <div className={i % 2 === 1 ? "sm:mt-8" : ""}>
                <ArtPlate variant={(["study", "portrait", "botanical", "field"] as const)[i]} label={`${word} — the pillar`} ratio="3 / 4" />
                <h2 className="mt-4 font-display text-title">{word}</h2>
                <p className="mt-1 text-small text-bark-soft">{meaning}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* S3 · WhatsApp and the portal — a typographic table */}
      <section className="bg-sand-deep py-section-sm">
        <div className="mx-auto max-w-content px-6">
          <SectionLabel>WhatsApp and the portal</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-display-m">
            Two layers, doing two different jobs.
          </h2>
          <dl className="mt-10 border-t rule-gold">
            <div className="grid grid-cols-2 gap-6 border-b rule-gold py-3">
              <dt className="section-label">WhatsApp</dt>
              <dd className="section-label">The portal</dd>
            </div>
            {WHATSAPP_VS_PORTAL.map(([a, b], i) => (
              <div key={i} className="grid grid-cols-2 gap-6 border-b rule-gold py-4">
                <p className="text-body text-bark-soft">{a}</p>
                <p className="text-body text-bark">{b}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* S4 · What we are / are not — the pivot */}
      <section className="bg-forest-deep py-section text-sand">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel tone="sand">Yoga Mandala is</SectionLabel>
              <ul className="mt-6 space-y-4">
                {IS.map((x) => (
                  <li key={x} className="border-b border-sand/20 pb-4 font-display text-title text-sand">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            {/* reversed panel */}
            <div className="bg-sand p-8 text-bark lg:mt-16">
              <SectionLabel>And is not</SectionLabel>
              <ul className="mt-6 space-y-4">
                {IS_NOT.map((x) => (
                  <li key={x} className="border-b rule-gold pb-4 text-title">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* S5 · Independence & Pranava — pull quote + client-word pending */}
      <section className="mx-auto max-w-content px-6 py-section">
        <SectionLabel>Independence</SectionLabel>
        <PullQuote cite="Framework §2" className="mt-6">
          Pranava and other organisations may contribute, organise initiatives and submit
          offerings, but Yoga Mandala retains an independent community identity. This distinction
          protects neutrality, trust and long-term credibility.
        </PullQuote>
        <p className="measure mt-8 text-body text-bark-soft">
          Every organisation&rsquo;s offerings are clearly labelled — Pranava&rsquo;s included —
          unless a programme is formally organised by Yoga Mandala itself. The labels you see
          across the site are how that promise is kept.
        </p>
        <PendingBlock
          className="mt-10 max-w-2xl"
          title="Pranava relationship, in the community's own words"
          awaiting="Awaiting the client's own wording describing Yoga Mandala's relationship to Pranava, so it is represented accurately rather than paraphrased."
        />
      </section>

      {/* S6 · The people — blocked, honest gap */}
      <section className="bg-sand-deep py-section-sm">
        <div className="mx-auto max-w-content px-6">
          <SectionLabel>The people behind it</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <PendingBlock
              title="Founding story"
              awaiting="Awaiting the story of when Yoga Mandala began, why, and by whom. A community's origin is not something to invent, so this is left open until the client provides it."
            />
            <PendingBlock
              title="Who runs it"
              awaiting="Awaiting the names and roles of the people behind Yoga Mandala, including the two continuity administrators the governance model requires."
            />
          </div>
        </div>
      </section>

      {/* S7 · Governance link */}
      <section className="mx-auto max-w-content px-6 py-section-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl font-display text-display-m">
            Yoga Mandala is community-led, not developer-led.
          </p>
          <Link href="/about/governance" className="group inline-flex items-center gap-2 text-small text-forest">
            Read the governance &amp; ownership
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* S8 · Closing principle — duotone dark */}
      <section className="relative overflow-hidden bg-forest-deep py-section text-sand">
        <div aria-hidden className="duotone pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(60% 80% at 30% 40%, #7c8a63 0%, transparent 60%)" }} />
        <div className="relative mx-auto max-w-content px-6 text-center">
          <h2 className="mx-auto max-w-3xl font-display text-display-m">
            Build the simplest useful version first. Let the community reveal what needs to exist next.
          </h2>
          <p className="mt-4 section-label text-sand/60">Framework §25</p>
        </div>
      </section>
    </>
  );
}
