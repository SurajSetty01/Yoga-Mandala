import { SiteNav } from '@/components/SiteNav';
import { AboutCOpening } from '@/components/preview/about-c/Opening';
import { AboutCPurpose } from '@/components/preview/about-c/Purpose';
import { AboutCApproach } from '@/components/preview/about-c/Approach';
import { AboutCMembers } from '@/components/preview/about-c/Members';
import { AboutCGuiding } from '@/components/preview/about-c/Guiding';
import { AboutCMotion } from '@/components/preview/about-c/Motion';

/**
 * TOURNAMENT PREVIEW — About, concept C.
 *
 * THE PHOTOGRAPHS ARE OBJECTS, NOT WINDOWS. Sections 03 → 07 as one continuous handling of
 * one pile of prints: opened (03), dealt (04), spliced (05), spread flat (06), put back (07).
 *
 * Everything is namespaced under `.about-c` and lives in `styles/preview-about-c.css`. The
 * hero and the approved section 02 are untouched and are not re-rendered here; `<SiteNav />`
 * is included so the pill can be judged over these grounds, and it carries `light` because
 * the first thing under it is the dark table rather than a photograph.
 *
 * The page's single `<h1>` is visually hidden. On the real page the hero owns the `<h1>` and
 * these sections are `<h2>`s beneath it; changing their level for the preview would misjudge
 * the type scale, so the harness supplies the missing one instead.
 */
export const metadata = {
  title: 'About — concept C',
  robots: { index: false, follow: false },
};

export default function AboutConceptCPage() {
  return (
    <>
      <SiteNav light />
      <main className="about-c" id="top">
        <h1 className="sr">About Yoga Mandala</h1>
        <AboutCOpening />
        <AboutCPurpose />
        <AboutCApproach />
        <AboutCMembers />
        <AboutCGuiding />
      </main>
      <AboutCMotion />
    </>
  );
}
