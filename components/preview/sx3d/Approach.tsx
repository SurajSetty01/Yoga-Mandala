import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { FRAMES, src, srcSet, type Frame } from './frames';

/**
 * PRAṆAVA · ABOUT · §03 — OUR APPROACH.
 *
 * THE MECHANIC, as something that happens:
 *   Three terms stand at three depths in one dark room and walk away from you as
 *   you read them — Tradition nearest and largest, Practice further, Inquiry
 *   furthest and smallest, stepping right toward the hall at the end of the
 *   room. Then the room ends. The ground turns to paper and Transmission is
 *   standing on your side of it, at the site's own body size, beside a
 *   photograph taken from inside a class instead of outside one.
 *
 * THE SECTION IS A TYPE SCALE MADE OUT OF DISTANCE. There is ONE authored body
 * size in the whole room — 15.6px — and one perspective constant, 2400px. The
 * three planes sit at z = 400 / 276 / 157px, which the browser resolves to
 * scale factors of exactly 2400/(2400−z) = 1.200 / 1.130 / 1.070, and that
 * renders the one authored size at 18.72 / 17.63 / 16.69px. The fourth term is
 * not in the frustum at all: it is set flat, at 18.88px, which is the site's own
 * body size to two decimals. Four rendered sizes, two authored ones, every one
 * of them inside the house's measured 16.0 – 18.9px band. Nothing here was tuned
 * until it fitted a picture.
 *
 * AND THE MEASURE IS CONSTANT WITH IT. Each plane is authored at the same 434px
 * width, so the magnification that enlarges the type enlarges the column with
 * it, and all three terms land on the SAME measure at any given width. Measured:
 * 44 characters per line at 768, 41 at 1024, 44 at 1280 / 1440 / 2531, 29 at 390
 * and 23 at 320 — the house itself runs 41 – 46 at desktop widths and 29 – 34 at
 * 390. The fourth term, outside the frustum, runs 43.
 *
 * THERE ARE NO CARDS. No plate, no panel, no border, no shadow, no photograph
 * behind a rectangle of paper. The site already deals four mounted plates on the
 * home page and runs a four-up photo grid above that; a third set of four
 * parallel objects would be repetition, and it would package the paragraph that
 * says Yoga cannot be packaged and delivered. Three of these terms are type
 * standing in a room. The fourth is not a fourth of the same kind, and the
 * section does not give it the same object.
 *
 * NO TEXT SITS ON EITHER PHOTOGRAPH, anywhere, at any width. Contrast in this
 * section is type on a flat ground and nothing else, which is why it can be
 * stated rather than tuned: cream on --ground-deep, and ink on paper. All 15
 * leaf text runs were measured DIRECTLY — not through the probe's stop list —
 * at 390, 1440 and 2531: 45 measurements, 0 FAIL, worst 7.30:1 composited and
 * 5.72:1 read straight off the painted pixel, against a 4.5 bar. The probe
 * itself returns 0 FAIL at all seven standard viewports but reaches only 11–14
 * of the 15 runs, so its number is never the one quoted here.
 *
 * THERE IS NO CLIENT COMPONENT ON THIS ROUTE. Every word and both photographs
 * are in the static HTML. The only movement is one registered custom property,
 * `--sx3d-dz`, animated on one element by one `view()` timeline: the room drifts
 * 80px forward as it arrives and settles. Because the four planes are at four
 * depths, one number moves them by four different amounts. With JavaScript off,
 * with `prefers-reduced-motion`, or in a browser without scroll-driven
 * animations, `--sx3d-dz` is its initial 0px — which is the settled, documented
 * geometry above. Nothing is reachable only through motion and the document
 * height is identical either way, because transforms do not affect layout.
 *
 * COPY. Every sentence comes out of `content/pranava.ts` untouched. The lead is
 * split on its OWN full stops with a lookbehind, so the three spans concatenate
 * back to the client's sentence character for character.
 */

/** The three that stand in the room, nearest first, in the client's order. */
const PLANE = ['sx3d-p1', 'sx3d-p2', 'sx3d-p3'] as const;

/* The painted width of each photograph, declared as what it actually PAINTS.
   Both values below are the element's rendered box, not its CSS width keyword
   and not a guess: the stage's inner width is `min(1680px, 100vw − 2 × rail)`
   where rail is `clamp(1.35rem, 4.2vw, 4.25rem)`, which is 91.6vw between 515px
   and 1816px and `100vw − 2.7rem` below that. Every term below is that identity
   carried through the layout it sits in. An earlier design in this tournament
   declared `100vw` for a box that painted at 799px because a transform scaled
   it after `sizes` was resolved; neither photograph here is scaled by anything
   above 1.000 — the hall sits at the picture plane and the teaching frame is
   outside the room entirely — so the box and the paint are the same number.
   Measured sizes-to-box ratio at the seven standard viewports: 0.997 to 1.004. */
/* The hall. Seven clauses because the layout has seven regimes, and every one of
   them is the identity carried through, not a rounded guess:
     ≥1816  the stage is capped at 1680 inner, terms 528, gap 56 → 1096px
     ≥1619  rail freezes at 68px → 100vw − 136 − 528 − 56 = 100vw − 720
     ≥1440  rail is 4.2vw → 91.6vw − 528 − 56 = 91.6vw − 584
     ≥1333  the 1.2/1 split with a 3vw gap → (91.6vw − 3vw)/2.2 = 40.27vw
     ≥1024  the same split with the gap on its 2.5rem floor → 41.64vw − 18.2px
     ≥515   stacked, full stage → 91.6vw
     else   stacked, rail on its 1.35rem floor → 100vw − 2.7rem
   The clauses meet: at 1618 the third gives 898.1 and at 1619 the second gives
   899; at 1816 the second gives 1096 and the first gives 1096. */
const HALL_SIZES =
  '(min-width: 1816px) 1096px, (min-width: 1619px) calc(100vw - 720px), (min-width: 1440px) calc(91.6vw - 584px), (min-width: 1333px) 40.27vw, (min-width: 1024px) calc(41.64vw - 18.2px), (min-width: 515px) 91.6vw, calc(100vw - 2.7rem)';
const TEACH_SIZES =
  '(min-width: 1518px) 832px, (min-width: 1152px) calc(88.6vw - 512px), (min-width: 908px) 832px, (min-width: 515px) 91.6vw, calc(100vw - 2.7rem)';

export function Sx3dApproach() {
  const lead = about.approach.lead.split(/(?<=\.)\s+/);
  const [tradition, practice, inquiry, transmission] = about.approach.items;
  const standing = [tradition, practice, inquiry];

  return (
    <section className="sx3d" id="sx3d-approach" aria-labelledby="sx3d-mark">
      {/* ── THE ROOM. Deep ground, continuous with the end of §02, so the
             section does not announce itself with a band change it has not
             earned. The one ground change in the section is the one that
             means something, and it comes later. ─────────────────────────── */}
      <div className="sx3d-room">
        <div className="sx3d-stage">
          {/* the element the dolly runs on, and the only animated thing here */}
          <div className="sx3d-space">
            <h2 className="sx3d-eyebrow" id="sx3d-mark">
              <span className="sx3d-eyebrow__n">03</span>
              <span className="sx3d-eyebrow__rule" aria-hidden="true" />
              Our approach
            </h2>

            {/* The lead names three, and it already recedes: its three sentences
                stand on the same three planes the three terms will stand on, so
                the sentence performs the section before the section happens.
                One authored display size, three depths. */}
            <p className="sx3d-lead">
              {lead.map((line, i) => (
                <span className={`sx3d-lead__l ${PLANE[i]}`} key={line}>
                  {line}
                </span>
              ))}
            </p>

            <div className="sx3d-floor">
              <div className="sx3d-terms">
                {standing.map((item, i) => (
                  <article className={`sx3d-term ${PLANE[i]}`} key={item.name}>
                    <h3 className="sx3d-term__n">{item.name}</h3>
                    <p className="sx3d-term__b">{item.body}</p>
                  </article>
                ))}
              </div>

              {/* The hall, at the picture plane — z = 0, the only plane the
                  dolly never magnifies past 1.000. It is the far end of the
                  room the three terms are walking into, and it is shown at its
                  own 1620 × 1080 ratio so nothing is cropped at any width. */}
              <figure className="sx3d-wall">
                <Shot frame={FRAMES.hall} sizes={HALL_SIZES} eager />
                <figcaption className="sx3d-cap">{FRAMES.hall.cap}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* ── OUT OF THE ROOM. One hard edge, no gradient: the room stops and
             paper starts, and the fourth term is standing on it. This is the
             whole distinction the copy makes — three things Yoga is approached
             through, and one thing it moves BY — and it is carried by the
             ground and the distance, not by a fourth copy of the same object. */}
      <div className="sx3d-out">
        <div className="sx3d-stage">
          <div className="sx3d-fourth">
            <div className="sx3d-fourth__t">
              <h3 className="sx3d-fourth__n">{transmission.name}</h3>
              <p className="sx3d-fourth__b">{transmission.body}</p>
            </div>

            <figure className="sx3d-fourth__fig">
              <Shot frame={FRAMES.teach} sizes={TEACH_SIZES} />
              <figcaption className="sx3d-cap sx3d-cap--paper">{FRAMES.teach.cap}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One photograph.
 *
 * `sizes` is always explicit — a srcset with no sizes makes the browser assume
 * 100vw, so a phone pulls a 1620 derivative for a small plate. The box is given
 * the frame's own ratio (or a window cut from it that was rendered and looked
 * at), and both object-position values travel with the element so the
 * stylesheet can art-direct the narrow box rather than letting `cover` choose.
 *
 * No <video> and no `poster` attribute appears anywhere in this section: a
 * poster is fetched even when `src` is never set, which cost this site 948 KB on
 * every device once already.
 */
function Shot({
  frame,
  sizes,
  eager = false,
}: {
  frame: Frame;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <img
      src={src(frame)}
      srcSet={srcSet(frame)}
      sizes={sizes}
      alt={frame.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      style={{ '--op': frame.pos, '--op-n': frame.posNarrow } as CSSProperties}
    />
  );
}
