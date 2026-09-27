import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FRAME, src, srcSet } from './frame';

/**
 * 06 · THE FOUNDER — concept sx6a, PHOTOGRAPHY LEADS.
 *
 * WHAT HAPPENS. One photograph of two handstands at one wall is cut through at the waist, and
 * the founder's sentence is set in the cut. Above the cut are two pairs of feet in the air and
 * a teacher's arm across one student's legs. Below it, the other student stands on her own
 * hands. As the sentence turns at its comma, the upper crop lifts once, off the teacher's arm
 * and up to the feet. The arm passes into the cut, under the words that take its place. What
 * is left on either side of the sentence is feet in the air and hands on the floor.
 *
 * WHY A PHOTOGRAPH AND NOT A PORTRAIT. Nothing in the archive identifies any person, so this
 * section cannot show its subject, and it does not try. It shows the sentence instead. Stieglitz
 * built his portrait of O'Keeffe from hundreds of frames, many of them only her hands, on the
 * view that a portrait need not include a face. This section goes one step further and makes
 * the founder's portrait out of what his sentence says a teacher is for. The teacher in the
 * photograph is seen from behind and captioned as "a teacher". See ./frame.ts.
 *
 * THE CLIENT'S COMPLAINT, answered in the layout. The live section set the quotation in five
 * lines down the left with the right half empty, then a rectangle beside a column. Here
 * nothing stands beside anything:
 *   · the name and the role make ONE line across the whole measure, joined by a rule;
 *   · the biography opens with one sentence at display size and runs its other four across
 *     the measure in four short columns (the brief asks for text in short sections);
 *   · the photograph spans the same measure (full-bleed on a phone), and the sentence spans
 *     it too, inside the photograph rather than next to it.
 *
 * WITH REDUCED MOTION, OR NO JAVASCRIPT, the crop does not lift. The teacher's arm stays at
 * the edge of the upper band, directly above "not to create dependence,", and the student's
 * hands stay directly below "for themselves.". The argument is in the cut. The lift says it a
 * second time.
 *
 * SEMANTICS. The section's one heading is the register mark, as on every section of /about/.
 * The sentence is ONE <p> inside a <blockquote>, split into two spans only for layout. The
 * split is derived from `about.founder.quote` at its own comma rather than retyped, so the
 * halves always reassemble into exactly the client's sentence. The kicker is also split,
 * after "by", so that the name alone is set in Inter (DESIGN-SYSTEM §1). Both photographs
 * carry real alt text. The first describes the whole frame, the second says which part of
 * it the reader is looking at.
 *
 * `about.founder.action` — "Meet Pranav" — is not rendered. There is no founder page in this
 * app or in the client's material, and a button that goes nowhere is worse than none.
 */

const QUOTE = about.founder.quote;
const CUT = QUOTE.indexOf(', but ');
const SAY_A = CUT > 0 ? QUOTE.slice(0, CUT + 1) : QUOTE;
const SAY_B = CUT > 0 ? QUOTE.slice(CUT + 2) : '';

const KICKER = about.founder.kicker;
const BY = KICKER.indexOf(' by ');
const KICK_A = BY > 0 ? KICKER.slice(0, BY + 3) : '';
const KICK_NAME = BY > 0 ? KICKER.slice(BY + 4) : KICKER;

const [LEAD, ...REST] = about.founder.body;

const SIZES = '(max-width: 719px) 145vw, (min-width: 1600px) 1472px, 92vw';

export function Founder() {
  const geometry = {
    '--sx6a-u0': FRAME.upper.y0,
    '--sx6a-u1': FRAME.upper.y1,
    '--sx6a-lift': FRAME.upper.lift,
    '--sx6a-l0': FRAME.lower.y0,
    '--sx6a-l1': FRAME.lower.y1,
    '--sx6a-ps': FRAME.phone.scale,
    '--sx6a-px': FRAME.phone.x0,
  } as CSSProperties;

  return (
    <section className="sx6a" id="sx6a-founder" aria-labelledby="sx6a-title">
      <div className="sx6a-rail">
        <h2 className="sx6a-mark" id="sx6a-title">
          <span className="sx6a-mark__n">06</span>
          <span className="sx6a-mark__rule" aria-hidden="true" />
          The founder
        </h2>

        <div className="sx6a-mast">
          <p className="sx6a-mast__name">
            {KICK_A && <span className="sx6a-mast__by">{KICK_A}</span>}{' '}
            <span className="sx6a-mast__who">{KICK_NAME}</span>
          </p>
          <span className="sx6a-mast__rule" aria-hidden="true" />
          <p className="sx6a-mast__role">{about.founder.role}</p>
        </div>

        <div className="sx6a-bio">
          <p className="sx6a-bio__lead">{LEAD}</p>
          <div className="sx6a-bio__cols">
            {REST.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <figure className="sx6a-print" style={geometry}>
        <div className="sx6a-band sx6a-band--upper">
          <div className="sx6a-band__win">
            <img
              className="sx6a-band__img"
              src={src(1920)}
              srcSet={srcSet()}
              sizes={SIZES}
              width={FRAME.w}
              height={FRAME.h}
              alt={FRAME.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <blockquote className="sx6a-say">
          <p className="sx6a-say__p">
            <span className="sx6a-say__a">
              <span className="sx6a-say__mark" aria-hidden="true">
                “
              </span>
              {SAY_A}
            </span>{' '}
            <span className="sx6a-say__b">
              {SAY_B}
              <span aria-hidden="true">”</span>
            </span>
          </p>
        </blockquote>

        <div className="sx6a-band sx6a-band--lower">
          <div className="sx6a-band__win">
            <img
              className="sx6a-band__img"
              src={src(1920)}
              srcSet={srcSet()}
              sizes={SIZES}
              width={FRAME.w}
              height={FRAME.h}
              alt={FRAME.altLower}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <figcaption className="sx6a-cap">
          <span className="sx6a-cap__where">Prabhava · Hatha-Iyengar Immersion · October 2023</span>
          <span className="sx6a-cap__what">
            Two handstands at one wall. One student has a teacher at her side, his arm across her
            legs and his hand open. Beside her, the other is up on her own hands, with a folding
            chair behind her.
          </span>
        </figcaption>

        {/* the lift's trigger region, from the sentence's middle to the figure's foot —
            positioned by Motion.tsx; inert and empty without it */}
        <span className="sx6a-line" aria-hidden="true" />
      </figure>
    </section>
  );
}
