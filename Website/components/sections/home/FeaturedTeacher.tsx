import Link from "next/link";
import { getFeaturedPerson } from "@/lib/content";
import { ArtPlate } from "@/components/ui/Plate";
import { SampleTag } from "@/components/ui/SampleTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * S5 · Featured teacher — "An editorial portrait spread" (T3 layered pair). First dark section,
 * a pause in the scroll. Two overlapping treated placeholders (never a real face); opposite,
 * the name at display scale with directory metadata. No invented person or quote (integrity).
 */
export function FeaturedTeacher() {
  const p = getFeaturedPerson();
  if (!p) return null;

  return (
    <section className="relative overflow-hidden bg-forest-deep py-section text-sand" aria-label="A member of the directory">
      <div className="mx-auto grid max-w-content gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Layered pair */}
        <Reveal>
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <ArtPlate variant="portrait" label="Placeholder portrait — treated so it is not a real face" ratio="4 / 5" />
            <div className="absolute -bottom-8 -right-6 w-2/5">
              <ArtPlate variant="manuscript" label="A book from the teacher's shelf (placeholder)" ratio="1 / 1" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="lg:pl-6">
            <SectionLabel tone="sand">From the directory</SectionLabel>

            <h2 className="mt-4 font-display text-display-l">{p.name}</h2>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {p.verified && (
                <span
                  className="inline-flex items-center gap-1.5 border border-sand/40 px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-sand/90"
                  title="Reviewed against published criteria — not an endorsement (§12)"
                >
                  Verified Teacher
                </span>
              )}
              {p.sample && <SampleTag />}
            </div>

            <p className="measure mt-6 text-lead text-sand/85">{p.bio}</p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-sand/20 pt-5 text-small text-sand/75">
              <div>
                <dt className="section-label text-sand/50">Location</dt>
                <dd className="mt-1">{p.location}</dd>
              </div>
              <div>
                <dt className="section-label text-sand/50">Tradition</dt>
                <dd className="mt-1">{p.traditions.join(", ")}</dd>
              </div>
              <div>
                <dt className="section-label text-sand/50">Teaches</dt>
                <dd className="mt-1">{p.areasOfTeaching.slice(0, 3).join(", ")}</dd>
              </div>
            </dl>

            <Link
              href="/connect/directory"
              className="group mt-8 inline-flex items-center gap-2 text-small text-sand/90 transition-colors duration-fast hover:text-sand"
            >
              Explore the directory
              <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
