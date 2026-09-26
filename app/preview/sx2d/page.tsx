import { SiteNav } from '@/components/SiteNav';
import { about } from '@/content/pranava';
import { Opening } from '@/components/preview/sx2d/Opening';

/**
 * ISOLATED PREVIEW — concept D for the deleted Praṇava About §01.
 *
 * Nothing outside `app/preview/sx2d/`, `components/preview/sx2d/` and
 * `styles/preview-sx2d.css` is touched. Three other concepts for the same
 * section are being built in parallel and none of them may be disturbed.
 *
 * Rendered the way the section will actually sit: `<SiteNav light />` pinned
 * to the paper treatment from the start, because this section opens on paper
 * and the hero above it owns the dark; and beneath it the ground the approved
 * "What Praṇava is" stands on, because the section's bottom spacing cannot be
 * judged against nothing.
 *
 * ROUND 3 — THE HAND-OFF BAND IS POPULATED. Critic 1 counted 558px of dead ink
 * at the foot of this route and was right that an empty band is a void
 * pretending to be a transition. It now carries what actually follows: the §02
 * ordinal and `about.what.lead`, verbatim. No section title is invented for it
 * — the client's documents do not contain one, and a plausible label is still a
 * fabrication. What the band proves is the thing that was being measured: this
 * section ends ON §02's ground, with no gap and no rule, because the last
 * screen of the opening is already that colour.
 *
 * The page's one <h1> belongs to the hero, which this route does not own, so
 * it carries the client's own page heading out of sight rather than promoting
 * a section title to the top of the outline.
 */
export const metadata = { title: 'Preview D — The Opening' };

export default function PreviewSx2d() {
  return (
    <>
      <SiteNav light />
      <main className="sx2d" id="top">
        <h1 className="sr">{about.hero.heading}</h1>
        <Opening />

        {/* THE HARNESS, not the section: the first screen of what follows. */}
        <div className="sx2d-after">
          <p className="sx2d-eyebrow sx2d-after__mark">
            <span className="sx2d-eyebrow__n">02</span>
            <span className="sx2d-eyebrow__rule" aria-hidden="true" />
          </p>
          <p className="sx2d-after__lead">{about.what.lead}</p>
        </div>
      </main>
    </>
  );
}
