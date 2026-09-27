import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { CENTRE, INQUIRY, PRACTICE, TRADITION, stillSrc, stillSrcSet } from './frames';

/**
 * §03 · OUR APPROACH — HELD STILL, THEN HANDED ON.
 *
 * What happens: one photograph — a teacher taking a student's weight — stands pinned at the
 * centre of the screen. The lead's three clauses, each heading the term it names, pass it on
 * alternate sides: Tradition on the left, Practice on the right, Inquiry on the left. Then
 * Transmission, the one term the sentence leaves out, does not pass beside the picture at
 * all. It rises onto it — and the picture, which has not moved for three terms, starts to.
 *
 * WHY THE LEAD IS SPLIT ACROSS THE THREE CARDS. The client's lead is three sentences and
 * each ends on the name of one term, so each sentence heads its own term, and reading down
 * the section IS reading the lead, in order. The asymmetry the brief asks for then happens
 * to the reader rather than being pointed out: three terms arrive with a clause of the
 * sentence and a picture of their own; the fourth arrives with neither, because its picture
 * is the one that was there all along. The three spans are cut at the client's own full
 * stops with a lookbehind and concatenate back to the sentence character for character.
 *
 * WHAT CARRIES THE IDEA WITHOUT MOTION. The pin is CSS (`position: sticky`), so with no
 * JavaScript and under `prefers-reduced-motion` the arrangement is identical: the three pass
 * around the picture and the fourth lands on it. Motion adds exactly two things — the
 * picture starting to move at the landing, and the three terms leaning in toward it as they
 * reach the middle of the screen — and a reader who asked for less motion can still start
 * the clip with the button in the frame's corner.
 *
 * DOM ORDER IS READING ORDER: the three terms, then Transmission, then the picture. The
 * picture is placed at the centre by the grid, not by being first.
 */
export function Sx3bApproach() {
  const clauses = about.approach.lead.split(/(?<=\.)\s+/);
  const [tradition, practice, inquiry, transmission] = about.approach.items;
  /* each term travels with its own clause of the lead and its own photograph */
  const triad = [
    { term: tradition, clause: clauses[0] ?? '', still: TRADITION },
    { term: practice, clause: clauses[1] ?? '', still: PRACTICE },
    { term: inquiry, clause: clauses[2] ?? '', still: INQUIRY },
  ];

  return (
    <section className="sx3b" id="sx3b-approach">
      <div className="sx3b-rail sx3b-head">
        <Eyebrow n="03">Our approach</Eyebrow>
      </div>

      <div className="sx3b-run">
        <ol className="sx3b-steps">
          {triad.map(({ term: t, clause, still }, i) => {
            /* "Rooted in tradition." → "Rooted in " + "tradition" + "." — the key word is
               set in italic, which is how this site carries emphasis in Fraunces. */
            const m = clause.match(/^(.*\s)(\S+)(\.)$/);
            return (
              <li
                className={`sx3b-card sx3b-card--${i % 2 ? 'r' : 'l'}`}
                key={t.name}
                data-sx3b-side={i % 2 ? '1' : '-1'}
              >
                <div className="sx3b-card__in">
                  <div className="sx3b-still">
                    <img
                      src={stillSrc(still)}
                      srcSet={stillSrcSet(still)}
                      sizes="(min-width: 1280px) 32rem, (min-width: 760px) 52vw, 92vw"
                      alt={still.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: still.pos }}
                    />
                  </div>
                  <h3 className="sx3b-card__n">
                    <span className="sx3b-card__rule" aria-hidden="true" />
                    {t.name}
                  </h3>
                  <p className="sx3b-card__lead">
                    {m ? (
                      <>
                        {m[1]}
                        <em>{m[2]}</em>
                        {m[3]}
                      </>
                    ) : (
                      clause
                    )}
                  </p>
                  <p className="sx3b-card__b">{t.body}</p>
                </div>
              </li>
            );
          })}

          {/* The landing. The empty block is the plate's runway: the plate is sticky to
              the foot of the screen inside this <li>, so it rises with the page, is HELD
              over the picture for the length of that block while the clip plays, and is
              let go on exactly the scroll pixel the picture is let go — see
              --sx3b-o in the stylesheet. */}
          <li className="sx3b-land">
            <div className="sx3b-land__hold" aria-hidden="true" />
            <div className="sx3b-plate">
              <h3 className="sx3b-plate__n">{transmission.name}</h3>
              <p className="sx3b-plate__b">{transmission.body}</p>
            </div>
          </li>
        </ol>

        <figure className="sx3b-frame">
          <div className="sx3b-frame__pic">
            {/* The clip's own first frame, as an ordinary image. It IS the poster: the
                <video> above it has no `poster` attribute and no `src` until Motion.tsx
                attaches one on approach. */}
            <picture>
              <source srcSet={CENTRE.avif} type="image/avif" />
              <img
                className="sx3b-frame__still"
                src={CENTRE.jpg}
                alt={CENTRE.alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <video
              className="sx3b-video"
              data-src={CENTRE.clip}
              muted
              playsInline
              loop
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
          </div>
          {/* Hidden until Motion.tsx runs: with no JavaScript there is no clip to control.
              WCAG 2.2.2 — anything that moves on its own for more than five seconds can be
              paused — and the same button is how a reader who asked for reduced motion can
              choose to see the picture move. */}
          <button className="sx3b-toggle" type="button" hidden aria-label="Play the clip">
            <svg className="sx3b-toggle__play" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6 4.5v11l9-5.5z" />
            </svg>
            <svg className="sx3b-toggle__pause" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.5 4.5h3v11h-3zM11.5 4.5h3v11h-3z" />
            </svg>
          </button>
        </figure>
      </div>
    </section>
  );
}
