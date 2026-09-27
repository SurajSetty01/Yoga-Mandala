import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { LEAVES, still } from './frames';
import { HeroMotion } from './HeroMotion';

/**
 * PRAṆAVA · ABOUT — HERO, concept sx1b.  "THE BOOK THAT OPENS AS IT IS READ."
 *
 * WHAT HAPPENS. The page's name stands above a folded book. Its first leaf is already open
 * and already moving: a man holds a pose while three people watch him - study. As you read
 * down, the second leaf swings out from behind the first on its hinge and a woman is
 * working through a movement with a dowel - practice. Then the third swings out from
 * behind the second: a man at the wall guiding someone down out of an inversion -
 * transmission. Each noun in the sentence above is struck in brass the moment its leaf
 * opens, so the sentence and the book are read together, at one pace, by one scroll. At
 * the end the book stands open in a zigzag on the floor of the section and the stage lets
 * go; the supporting paragraph is waiting beneath it.
 *
 * WHY A FOLDING BOOK. The sentence is a definition - "a space for the study, practice and
 * transmission of Yoga and India's living knowledge traditions" - and its last word is
 * transmission: knowledge handed on in order, one opening at a time. A concertina is the
 * oldest book form that does exactly that, and the storyteller's kavad of Rajasthan is the
 * Indian one: hinged panels opened in sequence as the story is told, the innermost last.
 * The scroll is the storyteller's hand. Nothing on the page says so - it is a model for
 * the motion, not a claim - and nothing on the page states a fact the client did not.
 *
 * WITH MOTION OFF the book is simply open: three leaves standing in a zigzag on the floor,
 * each with its still and its folio, every noun already struck, every word in the flow.
 * That is the finished state and it is the default in the stylesheet; the closed start
 * state exists only under `.js` AND `prefers-reduced-motion: no-preference`. JavaScript
 * disabled and reduced motion render the same complete section.
 *
 * WORDS. Every sentence is read out of content/pranava.ts. The sub is split on its own
 * three nouns with a capturing regex, so the pieces concatenate back to the client's
 * sentence character for character. The eyebrow is the centre's own full name, sliced out
 * of about.what.body[0] - "Pranava – Center for Indian Culture & Yogic Studies was
 * established ..." - between its dash and "was established". It is not retyped.
 *
 * THE ONE h1 ON THE PAGE is here.
 */
const { heading, sub, support } = about.hero;

/** "Center for Indian Culture & Yogic Studies", cut from the client's own sentence. */
function centreName(): string | null {
  const s = about.what.body[0];
  const from = s.indexOf('–');
  const to = s.indexOf(' was established');
  if (from < 0 || to < 0 || to <= from) return null;
  return s.slice(from + 1, to).trim();
}

/** One leaf, and nested inside it, the leaf hinged to its right edge. */
function LeafEl({ i }: { i: number }) {
  const leaf = LEAVES[i];
  if (!leaf) return null;
  return (
    <div className={`sx1b-leaf sx1b-leaf--${i + 1}`}>
      <figure className="sx1b-face">
        <div
          className="sx1b-plate"
          data-clip={leaf.clip}
          style={{ '--sx1b-op': leaf.pos } as CSSProperties}
        >
          <picture>
            <source type="image/avif" srcSet={still(leaf.clip, 'avif')} />
            <img
              src={still(leaf.clip, 'jpg')}
              alt={leaf.alt}
              width={1080}
              height={1920}
              loading="eager"
              decoding="async"
              {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
            />
          </picture>
        </div>
        <figcaption className="sx1b-folio">
          {/* the numeral is for the eye; read aloud, "i study" is a different sentence */}
          <span className="sx1b-folio__n" aria-hidden="true">
            {leaf.folio}
          </span>
          <span className="sx1b-folio__w">{leaf.noun}</span>
        </figcaption>
        <span className="sx1b-shade" aria-hidden="true" />
      </figure>
      <span className="sx1b-back" aria-hidden="true" />
      {i + 1 < LEAVES.length ? <LeafEl i={i + 1} /> : null}
    </div>
  );
}

export function Hero() {
  const eyebrow = centreName();
  /* ['A space for the ', 'study', ', ', 'practice', ' and ', 'transmission', ' of Yoga …'] */
  const parts = sub.split(/(study|practice|transmission)/);
  const nounIndex = (w: string) => LEAVES.findIndex((l) => l.noun === w) + 1;

  return (
    <section className="sx1b" aria-labelledby="sx1b-title">
      <div className="sx1b-track">
        <div className="sx1b-stage">
          <div className="sx1b-rail sx1b-top">
            <div className="sx1b-head">
              {eyebrow ? (
                <p className="sx1b-eyebrow">
                  <span className="sx1b-eyebrow__rule" aria-hidden="true" />
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="sx1b-title" id="sx1b-title">
                {heading}
              </h1>
            </div>
            <p className="sx1b-sub">
              {parts.map((p, k) => {
                const n = nounIndex(p);
                return n > 0 ? (
                  <span className="sx1b-noun" data-n={n} key={k}>
                    {p}
                  </span>
                ) : (
                  p
                );
              })}
            </p>
          </div>

          <div className="sx1b-rail sx1b-sceneRail">
            <div className="sx1b-scene">
              <div className="sx1b-set">
                <span className="sx1b-floor" aria-hidden="true" />
                <div className="sx1b-book">
                  <span className="sx1b-shadow" aria-hidden="true" />
                  <LeafEl i={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sx1b-rail sx1b-coda">
        <p className="sx1b-support">{support}</p>
      </div>

      <HeroMotion />
    </section>
  );
}
