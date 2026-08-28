import { Hero } from "@/components/home/Hero";
import { OpportunityIndex } from "@/components/home/OpportunityIndex";
import { Pillars } from "@/components/home/Pillars";
import {
  FeaturedInitiative,
  FeaturedResource,
  FeaturedTeacher,
  Invitation,
  NextEventSection,
} from "@/components/home/sections";
import { featuredResource } from "@/content/library";
import { BULLETIN, featuredInitiative, featuredPerson, nextEvent } from "@/content/samples";

/**
 * HOME — the nine sections of framework §5, in order.
 *
 *   S1 Hero + Join            T1 + T8   image ground
 *   S2 Four pillars           T4        paper
 *   S3 Featured initiative    T2        paper-deep
 *   S4 Upcoming event         T5        paper
 *   S5 Featured teacher       T3        indigo-deep
 *   S6 Curated opportunities  T9        paper
 *   S7 Library resource       T6        paper-deep
 *   S8 Invitation             T10       indigo-deep
 *   S9 Footer                           (layout)
 *
 * No treatment repeats. Grounds alternate. Density oscillates rather than
 * climbing. See docs/pages/P01-home.md §4 for the rhythm check.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedInitiative item={featuredInitiative()} />
      <NextEventSection event={nextEvent()} />
      <FeaturedTeacher person={featuredPerson()} />
      <OpportunityIndex entries={BULLETIN.slice(0, 6)} />
      <FeaturedResource resource={featuredResource()} />
      <Invitation />
    </>
  );
}
