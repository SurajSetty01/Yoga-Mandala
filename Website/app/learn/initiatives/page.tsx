import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { ArtPlate } from "@/components/ui/Plate";
import { Reveal } from "@/lib/motion/Reveal";
import { getInitiatives } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learning Initiatives",
  description: "Study circles, mentorships and lectures organised by Yoga Mandala.",
};

const VARIANTS = ["study", "botanical", "field"] as const;

/**
 * Initiatives index — Yoga Mandala's own programmes, presented as editorial features at varied
 * scale rather than equal cards. Every entry carries the initiative badge (always a YM
 * programme) and, in Phase A, a Sample marker.
 */
export default function InitiativesIndex() {
  const items = getInitiatives();
  return (
    <>
      <PageHeader
        label="Learning · Initiatives"
        title="Programmes organised by the community."
        standfirst="Study circles, mentorships and lectures run by Yoga Mandala itself. Fees, where they exist, are shown plainly; registration links out. These are always Yoga Mandala Learning Initiatives — never external listings in disguise."
      />

      <section className="mx-auto max-w-content px-6 py-section-sm">
        <ul className="border-t rule-gold">
          {items.map((it, i) => (
            <li key={it.slug} className="border-b rule-gold">
              <Reveal>
                <Link
                  href={`/learn/initiatives/${it.slug}`}
                  className="group grid gap-6 py-8 md:grid-cols-[0.32fr_0.68fr] md:items-center"
                >
                  <ArtPlate variant={VARIANTS[i % VARIANTS.length]} label={`Illustration for ${it.title}`} ratio="4 / 3" />
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge origin={it.origin} />
                      {it.sample && <SampleTag />}
                    </div>
                    <h2 className="mt-3 font-display text-display-m transition-colors duration-fast group-hover:text-terracotta">
                      {it.title}
                    </h2>
                    <p className="mt-2 text-small text-bark-soft">
                      {it.initiativeType} · {it.schedule} · {it.format === "hybrid" ? "Online & in person" : it.format}
                    </p>
                    <p className="measure mt-3 text-body text-bark-soft">{it.description}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
