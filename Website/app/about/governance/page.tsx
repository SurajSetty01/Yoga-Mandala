import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PullQuote } from "@/components/ui/PullQuote";
import { PendingBlock } from "@/components/ui/PendingBlock";
import { Reveal } from "@/lib/motion/Reveal";

export const metadata: Metadata = {
  title: "Governance & Ownership",
  description:
    "How Yoga Mandala is owned and governed — community-led, with the platform's infrastructure under Yoga Mandala's own control.",
};

const PRINCIPLES = [
  "The domain sits under a Yoga Mandala-controlled account.",
  "Hosting sits under a Yoga Mandala-controlled account.",
  "The database and member data remain under Yoga Mandala control.",
  "The source code lives in a repository accessible to authorised Yoga Mandala administrators.",
  "Admin access is role-based, with at least two trusted continuity administrators.",
  "Privacy, terms and community guidelines are published before substantial member data is collected.",
  "A technical contributor may be credited as a founding technology partner, but does not personally own the domain, database, brand or community identity.",
];

export default function GovernancePage() {
  return (
    <>
      <PageHeader
        label="About · Governance"
        title="Community-led, not developer-led."
        standfirst="Yoga Mandala should belong to its community. Whoever builds and maintains the platform does so on the community's behalf — and that does not confer control over community policy. Publishing this openly is part of keeping it true."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <PullQuote cite="Framework §15">
          A technical contributor builds and maintains the platform; that does not automatically
          confer control over community policy.
        </PullQuote>

        <div className="mt-section-sm">
          <SectionLabel>Ownership principles</SectionLabel>
          <ol className="mt-8 border-t rule-gold">
            {PRINCIPLES.map((p, i) => (
              <li key={i} className="border-b rule-gold">
                <Reveal>
                  <div className="grid gap-4 py-6 md:grid-cols-[auto_1fr] md:gap-8">
                    <span className="font-display text-display-m leading-none text-gold/60 tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="measure text-body text-bark">{p}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <PendingBlock
          className="mt-section-sm max-w-2xl"
          title="The two continuity administrators"
          awaiting="Awaiting the names and contact addresses of the two trusted continuity administrators the governance model requires. Until they are named, this remains open rather than filled in."
        />
      </section>
    </>
  );
}
