import Link from "next/link";
import { getFeaturedResource } from "@/lib/content";
import { ArtPlate } from "@/components/ui/Plate";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/lib/motion/Reveal";
import { LEVELS } from "@/lib/taxonomy";

/**
 * S7 · Featured library resource — "An archival plate" (T6). A genuine public-domain text
 * presented as a catalogue record: a gold-framed plate with a real source caption, alongside
 * the §6.3 metadata set as a typeset record. The strongest visual break on the page — the only
 * framed, print-like object. Uses REAL content.
 */
export function FeaturedResource() {
  const r = getFeaturedResource();
  if (!r) return null;
  const levelLabel = LEVELS.find((l) => l.value === r.level)?.label ?? r.level;

  return (
    <section className="bg-sand-deep py-section-md" aria-label="From the library">
      <div className="mx-auto grid max-w-content gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          {/* Framed plate with real source caption */}
          <figure className="mx-auto max-w-xs">
            <div className="border border-gold/70 p-2">
              <ArtPlate variant="manuscript" label={`Title page of ${r.title}`} ratio="3 / 4" rounded={false} />
            </div>
            <figcaption className="mt-3 border-t rule-gold pt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-bark-soft">
              {r.plate?.credit ?? `${r.author}`} · {r.rights}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={80}>
          <div>
            <SectionLabel>From the library</SectionLabel>
            <h2 className="mt-4 font-display text-display-m">{r.title}</h2>
            <p className="mt-2 text-small text-bark-soft">{r.author}</p>

            <p className="measure mt-6 text-lead text-bark-soft">{r.description}</p>

            <dl className="mt-8 max-w-md border-t rule-gold text-small">
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Tradition</dt>
                <dd className="text-right text-bark">{r.tradition}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Subject</dt>
                <dd className="text-right text-bark">{r.subject}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Level</dt>
                <dd className="text-right text-bark">{levelLabel}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b rule-gold py-2.5">
                <dt className="section-label">Access</dt>
                <dd className="text-right text-bark">{r.source.name} · public domain</dd>
              </div>
            </dl>

            <Link
              href="/learn/library"
              className="group mt-8 inline-flex items-center gap-2 text-small text-forest transition-colors duration-fast hover:text-terracotta"
            >
              Enter the library
              <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
