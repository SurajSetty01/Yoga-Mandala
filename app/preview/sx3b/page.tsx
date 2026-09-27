import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { about } from '@/content/pranava';
import { Sx3bApproach } from '@/components/preview/sx3b/Approach';
import { Sx3bMotion } from '@/components/preview/sx3b/Motion';

/**
 * PREVIEW sx3b — Praṇava About §03, "Our approach". Designer B of four; the angle is
 * MOTION AND SCROLL CARRY IT.
 *
 * HELD STILL, THEN HANDED ON. A photograph of a teacher taking a student's weight is
 * pinned at the centre of the screen. Tradition, Practice and Inquiry — each headed by the
 * clause of the client's lead that names it — pass it on alternate sides. Transmission, the
 * one term the lead leaves out, rises onto the picture itself, and the picture, which has
 * not moved for three terms, starts to.
 *
 * On the real page this section follows §02 "What Praṇava is" on the deep ground, so it
 * opens on paper. `<SiteNav light />` is rendered so the pill can be judged over this
 * ground, and a field of paper follows so the section's own spacing reads true.
 *
 * The page's single `<h1>` is visually hidden: on the real page the hero owns it and this
 * section's title is an `<h2>` beneath it. Its words are the client's own page heading.
 *
 * Owned files: this one, components/preview/sx3b/**, styles/preview-sx3b.css. Every
 * selector is `.sx3b-`; the register mark is the About page's own `Eyebrow`, imported so
 * the preview carries exactly the object the real page does.
 */
export const metadata = {
  title: 'Our approach — sx3b',
  robots: { index: false, follow: false },
};

export default function Sx3bPreviewPage() {
  return (
    <>
      <SiteNav light />
      <main className="sx3b-page" id="top">
        <h1 className="sx3b-sr">{about.hero.heading}</h1>
        <Sx3bApproach />
        <div className="sx3b-after">
          <div className="sx3b-rail">
            <p>Preview route · section 03 of the About page</p>
          </div>
        </div>
      </main>
      <Sx3bMotion />
      <SiteFooter />
    </>
  );
}
