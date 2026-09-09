import { within } from '@/content/copy';
import { quadrants } from './quadrants';

/**
 * The title page. It is deliberately small: the figure below it is the page, and a masthead
 * that competes with it would be two openings.
 *
 * The four names are set here as a ring of labels around a hairline circle — the figure
 * stated flat, before the reader meets it turning. It is the same four words in the same
 * clockwise order, so by the time the disc appears the reader already knows the plan.
 */
export function WithinCMasthead() {
  return (
    <header className="wc-mast">
      <div className="wc-mast__in">
        <p className="wc-mast__eyebrow">Connect · Learn · Collaborate · Share</p>
        <h1 className="wc-mast__h">
          What Happens Within
          <em> Yoga Mandala</em>
        </h1>
        <p className="wc-mast__lead">{within.lead}</p>
        <p className="wc-mast__hint">
          Four quadrants of one figure. Scroll to turn it, or choose one.
        </p>
      </div>

      {/* The plan of the figure, drawn once at rest. Presentational: the four words are
          already the accessible names of the four gates below. */}
      <div className="wc-plan" aria-hidden="true">
        <span className="wc-plan__ring" />
        <span className="wc-plan__cross" />
        {quadrants.map((q) => (
          <span key={q.index} className="wc-plan__lbl" data-corner={q.corner}>
            <b>{q.index}</b>
            {q.name}
          </span>
        ))}
      </div>
    </header>
  );
}
