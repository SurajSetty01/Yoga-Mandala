import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { site, taglines } from '@/content/site';

/**
 * Praṇava home — skeleton.
 *
 * The brief's page table says "Home | Pranava Home | Convert completely". The Yoga Mandala
 * homepage that used to live at this route now lives at /yoga-mandala/, with its hero and
 * section mechanics intact, and this route is rebuilt around Praṇava rather than re-skinned.
 * Navigation first, per the brief's order of work; the conversion follows.
 */
export const metadata = {
  title: site.full,
  description: taglines.home,
};

export default function HomePage() {
  return (
    <>
      <SiteNav light />
      <main className="skel">
        <h1 className="skel__h">{site.full}</h1>
        <p className="skel__p">{taglines.home}</p>
      </main>
      <SiteFooter />
    </>
  );
}
