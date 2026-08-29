import { Hero } from "@/components/sections/home/Hero";
import { Pillars } from "@/components/sections/home/Pillars";
import { FeaturedInitiative } from "@/components/sections/home/FeaturedInitiative";
import { UpcomingEvent } from "@/components/sections/home/UpcomingEvent";
import { FeaturedTeacher } from "@/components/sections/home/FeaturedTeacher";
import { CuratedIndex } from "@/components/sections/home/CuratedIndex";
import { FeaturedResource } from "@/components/sections/home/FeaturedResource";
import { ShareInvitation } from "@/components/sections/home/ShareInvitation";
import { getLatestBulletin } from "@/lib/content";

/**
 * Home — framework §5's nine sections, each a distinct visual idea; no image treatment repeats;
 * grounds alternate; two dark sections (S5, S8) break the page into thirds. S9 is the global
 * footer (in the layout). Content is pulled from loaders, never hardcoded.
 */
export default function HomePage() {
  const curated = getLatestBulletin(6);
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedInitiative />
      <UpcomingEvent />
      <FeaturedTeacher />
      <CuratedIndex items={curated} />
      <FeaturedResource />
      <ShareInvitation />
    </>
  );
}
