import { SiteNav } from '@/components/SiteNav';
import { SX1CHero } from '@/components/preview/sx1c/Hero';
import { SX1CMotion } from '@/components/preview/sx1c/Motion';

/**
 * PREVIEW · SX1C — the Praṇava About hero, concept C.
 *
 * Rendered honestly, and this file had two lies in it that only the rendered pixels caught.
 *
 * THE PILL. It said `<SiteNav light />`. `light` pins the pill to its PAPER treatment — a
 * cream lozenge — and it was written when this concept's hero was cream. The hero's ground
 * is now `--ground-deep` #12201A, so `light` was putting a cream pill on a dark green page:
 * measured `rgba(251,247,242,0.9)` over `rgb(18,32,26)` at all four viewports. The house's
 * own dark pill is what belongs over a dark ground, so the prop is gone. The pill is judged
 * over this section's real material, which is the only reason it is rendered here at all.
 *
 * THE GROUND. It said `.sx1c-ground__inner`; the stylesheet has only ever defined
 * `.sx1c-ground__block`. So the harness below the hero collapsed to the height of one line
 * of type — MEASURED 59.5px at 1440x900 — and the whole document was 1122px against a
 * 900px viewport. That is 222px of scroll in the entire page, and it silently broke the
 * section's mechanic: `--sx1c-t` topped out at 0.474 at 1440 and 0.384 at 1024, so the
 * plate never finished its descent and never crossed the foot rule for any reader who
 * scrolled. A critic's "there is no mechanic" was, at the moment they measured it, simply
 * true — not because the design has none but because the harness gave it nowhere to run.
 *
 * The two blocks are the live route's own first two sections, to the pixel:
 * `SECTION.apr-s--deep.apr-what` is 1459px and the one after it is 998px. Their ground is
 * `--ground-deep`, which is this hero's ground, so the handoff below the hero is judged for
 * real — there is no seam to find because there is no seam.
 *
 * The ground is NOT a design for the Introduction. That section belongs to someone else and
 * nothing here anticipates it: two dark blocks and one line of harness type.
 *
 * The hero owns the page's single `<h1>`, which is what it will own on the real page.
 * Nothing else on this route is a heading.
 */
export const metadata = {
  title: 'About hero — concept SX1C',
  robots: { index: false, follow: false },
};

export default function PreviewSX1CPage() {
  return (
    <>
      <SiteNav />
      <main className="sx1c-page">
        <SX1CHero />
        <section className="sx1c-ground" aria-label="Preview harness">
          <div className="sx1c-ground__block">
            <p className="sx1c-ground__note">Preview ground · the Introduction follows here</p>
          </div>
          <div className="sx1c-ground__block" />
        </section>
      </main>
      <SX1CMotion />
    </>
  );
}
