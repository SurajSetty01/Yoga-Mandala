import { Fragment, type CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PANES, stillSrc, stillSrcSet, type Pane } from './frames';

/**
 * sx6b · 06 THE FOUNDER — "the hands come off".
 *
 * WHAT HAPPENS. The founder is introduced in one line across the page, his role, and his
 * five sentences. Then the page turns sideways: six moments from one workshop — a teacher
 * holding a student's legs, a hand at a back, a teacher a step away with his hands off,
 * one leaning in to watch, teachers across the room, and nobody — travel past on a wall
 * as the reader scrolls, sorted by how much the teacher is doing. The spaces between
 * them widen as the teacher's part shrinks: the first two overlap, the last stands alone
 * half a screen from anything, and the pan comes to rest with it centred while the
 * student in it climbs down the ropes and walks out of the frame. Beneath the frieze the
 * client's sentence lights one clause at a time as its pictures pass:
 *
 *   "The role of a teacher"                                       holding · a hand
 *   "is not to create dependence, but to help the student         a step away · watching
 *    develop the capacity"                                        · across the room
 *   "to see, understand and practise for themselves."             alone
 *
 * WITH MOTION OFF the same six stand in one line (or, below 1100px, one column) with the
 * same widening gaps and the whole sentence lit. The idea is the ORDER and the SPACING,
 * which are both static facts of the layout; the motion only walks you along them.
 *
 * The biography is never beside a picture. The frieze is captioned for what each frame
 * shows and sits under the quotation, which is about "a teacher" — see frames.ts for why no
 * frame here can be read as a portrait of anyone.
 *
 * `about.founder.action` ("Meet Pranav") is NOT rendered: there is no founder page, and a
 * button that goes nowhere is worse than no button.
 */

/** Split a verbatim client string into spans WITHOUT retyping any of it. */
function cut(s: string, at: string[]): string[] {
  const out: string[] = [];
  let rest = s;
  for (const marker of at) {
    const i = rest.indexOf(marker);
    if (i <= 0) return [s];
    out.push(rest.slice(0, i));
    rest = rest.slice(i);
  }
  out.push(rest);
  return out;
}

const QUOTE = cut(about.founder.quote, [' is not to create', ' to see,']);
/* "Founded by" in Fraunces, the name in Inter — DESIGN-SYSTEM §1: a person's name is never
   set in the display face. Cut from the client's own kicker, not retyped. */
const KICK = cut(about.founder.kicker, ['Pranav']);
/* "Yoga Teacher · Educator · Practitioner" — the three roles, split on the client's own
   separator; nothing is retyped */
const ROLE = about.founder.role.split(' · ');

function Media({ p, i }: { p: Pane; i: number }) {
  const sizes = '(max-width: 1099px) 58vw, 22vw';
  if (p.kind === 'still') {
    return (
      <img
        className="sx6b-pane__img"
        src={stillSrc(p)}
        srcSet={stillSrcSet(p)}
        sizes={sizes}
        alt={p.alt}
        loading={i < 3 ? 'eager' : 'lazy'}
        decoding="async"
        style={{ '--sx6b-pos': p.pos } as CSSProperties}
      />
    );
  }
  /* A CLIP: the poster is an ordinary <img> and it is never removed. The <video> above it
     has NO poster attribute (a poster is fetched even when src is never set — 948 KB once on
     this site) and no src until Motion.tsx decides the pane is on screen and settled. */
  return (
    <>
      <picture>
        <source type="image/avif" srcSet={`/media/posters/${p.id}.avif`} />
        <img
          className="sx6b-pane__img"
          src={`/media/posters/${p.id}.jpg`}
          alt={p.alt}
          loading={i < 3 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ '--sx6b-pos': p.pos } as CSSProperties}
        />
      </picture>
      <video
        className="sx6b-pane__vid"
        muted
        playsInline
        loop
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
        disablePictureInPicture
        data-src={`/media/clips/${p.id}.mp4`}
        style={{ '--sx6b-pos': p.pos } as CSSProperties}
      />
    </>
  );
}

export function Founder() {
  return (
    <section className="sx6b" id="sx6b-founder" aria-labelledby="sx6b-title">
      <div className="sx6b-rail sx6b-head">
        {/* the About page's register mark — the only thing in the section that IS a title */}
        <h2 className="sx6b-mark" id="sx6b-title">
          <span className="sx6b-mark__n">06</span>
          <span className="sx6b-mark__rule" aria-hidden="true" />
          The founder
        </h2>

        {/* ONE ROW, BOTH SIDES OF THE PAGE. The client's complaint about the current section
            was a heading four or five lines deep on one side with nothing opposite it. Here
            the kicker is a single line and the role stands at its far end, on its baseline,
            as three words stacked — so the row is full at every desktop width. */}
        <div className="sx6b-byline">
          <p className="sx6b-kicker" data-sx6b-rise="">
            {KICK.length === 2 ? (
              <>
                <span className="sx6b-kicker__by">{KICK[0]}</span>
                <span className="sx6b-kicker__name">{KICK[1]}</span>
              </>
            ) : (
              <span className="sx6b-kicker__name">{about.founder.kicker}</span>
            )}
          </p>
          <p className="sx6b-role" data-sx6b-rise="" style={{ '--sx6b-d': '120ms' } as CSSProperties}>
            {/* read as the client wrote it; SHOWN as three stacked words */}
            <span className="sr">{about.founder.role}</span>
            <span className="sx6b-role__stack" aria-hidden="true">
              {ROLE.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </span>
          </p>
        </div>

        <div className="sx6b-bio">
          <p className="sx6b-bio__lede" data-sx6b-rise="">
            {about.founder.body[0]}
          </p>
          <div className="sx6b-bio__cols">
            {about.founder.body.slice(1).map((s, i) => (
              <p
                key={s}
                data-sx6b-rise=""
                style={{ '--sx6b-d': `${90 + i * 80}ms` } as CSSProperties}
              >
                {s}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* THE RUN. With motion it is a tall runway and the stage inside it is sticky; without
          it, it is an ordinary block and the stage is the finished frieze. */}
      <div className="sx6b-run">
        <div className="sx6b-stage">
          <div className="sx6b-rail sx6b-top">
            <p className="sx6b-source">
              Six moments from Prabhava, a five-day Hatha-Iyengar immersion held 2–6 October
              2023, in order of how much the teacher is doing.
            </p>
            <button className="sx6b-pause" type="button" aria-pressed="false" hidden>
              Pause films
            </button>
          </div>

          {/* THE WALL. Live, it is the flexible middle of a one-screen stage and a SIZE
              container: the panes take their height from whatever the source line and the
              sentence leave, so the stage fits at 360x740 and at 2560x1440 alike. */}
          <div className="sx6b-wall">
          <ol className="sx6b-track" aria-label="Six moments, from a teacher holding a student to a student alone">
            {PANES.map((p, i) => (
              <li
                className={`sx6b-pane sx6b-pane--${i + 1}`}
                key={p.id}
                data-clause={p.clause}
                data-i={i}
              >
                <figure className="sx6b-pane__fig">
                  <div className="sx6b-pane__frame">
                    <Media p={p} i={i} />
                  </div>
                  <figcaption className="sx6b-pane__cap">
                    <span className="sx6b-pane__label">{p.label}</span>
                    <span className="sx6b-pane__line">{p.line}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
          </div>

          <div className="sx6b-rail">
            {/* no <cite>: the section's kicker names the founder; this agent cannot assert
                from the source document who first said the sentence */}
            <blockquote className="sx6b-quote" data-lit="all">
              <p>
                {/* the space between clauses sits OUTSIDE the span, so the lit clause's
                    underline starts on its first letter and not on the gap before it */}
                {QUOTE.map((c, i) => (
                  <Fragment key={c}>
                    {c.startsWith(' ') ? ' ' : null}
                    <span className="sx6b-clause" data-c={QUOTE.length === 3 ? i : 'all'}>
                      {c.trimStart()}
                    </span>
                  </Fragment>
                ))}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
