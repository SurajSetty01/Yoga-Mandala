import Link from "next/link";
import { getFeaturedInitiative } from "@/lib/content";
import { badgeForOrigin } from "@/lib/badges";
import { ArtPlate } from "@/components/ui/Plate";
import { Badge } from "@/components/ui/Badge";
import { SampleTag } from "@/components/ui/SampleTag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * S3 · Featured Learning Initiative — "A magazine feature, not a course tile" (T2 editorial
 * inset). Large image bleeding off the left; right side carries the badge, title, facilitator
 * and a colophon-style definition list of the §6.1 metadata — set as a typeset record, not
 * icon/label pairs.
 */
export function FeaturedInitiative() {
  const item = getFeaturedInitiative();
  if (!item) return null;
  const badge = badgeForOrigin(item.origin);

  const meta: [string, string][] = [
    ["Type", item.initiativeType],
    ["Schedule", `${item.schedule} · ${item.timezone}`],
    ["Format", item.format === "hybrid" ? "Online & in person" : item.format === "online" ? "Online" : "In person"],
    ["Fee", item.fee],
    ["Audience", item.audience],
  ];

  return (
    <section className="bg-sand-deep py-section-md" aria-label="Featured learning initiative">
      <div className="mx-auto grid max-w-content gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <Reveal>
          <ArtPlate variant="study" label="A Yoga Mandala study circle in session" ratio="5 / 4" className="lg:-ml-6" />
        </Reveal>

        <Reveal delay={80}>
          <div>
            <SectionLabel>A Yoga Mandala Initiative</SectionLabel>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge def={badge} />
              {item.sample && <SampleTag />}
            </div>

            <h2 className="mt-5 font-display text-display-m">{item.title}</h2>
            <p className="mt-2 text-small text-bark-soft">
              Facilitated by {item.facilitator}
              {item.facilitatorNote ? ` · ${item.facilitatorNote}` : ""}
            </p>

            <p className="measure mt-6 text-lead text-bark-soft">{item.description}</p>

            {/* Colophon-style metadata */}
            <dl className="mt-8 max-w-md border-t rule-gold">
              {meta.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b rule-gold py-2.5">
                  <dt className="section-label">{k}</dt>
                  <dd className="text-right text-small text-bark">{v}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/learn/initiatives`}
              className="group mt-8 inline-flex items-center gap-2 text-small text-forest transition-colors duration-fast hover:text-terracotta"
            >
              See all initiatives
              <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
