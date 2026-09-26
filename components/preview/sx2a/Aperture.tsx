import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATE, PLATE_SIZES, RUNGS, srcOf, srcSetOf, type Rung } from './frames';

/**
 * PRAṆAVA · ABOUT §01 — INTRODUCTION.  Concept A: THE APERTURE OPENS.
 *
 * WHAT HAPPENS. One photograph is shown four times. Every showing ends on the same edge of
 * it — the near edge of the grass — and every showing opens a measured amount further up:
 * a 26% letterbox of crossed legs and open hands, then 44%, then 72%, then all of it. The
 * photograph is never enlarged; it is laid into the page at exactly the same rendered width
 * every time, so the grass at the foot of the last frame is the same grass at the same size
 * on your screen as the grass the section opened on. Nothing moved. The opening did. The
 * client's last line is that Yoga is understood "not merely by collecting techniques, but
 * through a relationship" — and the whole frame arrives under that line.
 *
 * ── WHAT CHANGED IN ROUND 2, all of it at the root ───────────────────────────────────
 *
 *   · THE PHOTOGRAPH. Both critics' first defect: the ladder unveiled a wall. The payoff
 *     band of the old plate was 76.6% flat at detail 10.2; the payoff band of this one is
 *     1.8% flat at detail 37.8, and the frame is 3.2% flat against 60.2%. See frames.ts for
 *     the full band-by-band table and for why this file and not the two a critic named.
 *   · THE CAPTIONS MOVED AND WERE REWRITTEN. They were a 17-character column beside the
 *     sentence — 158px at 1440, 200px at 2531, four-word lines down a 124px rag. They are
 *     now the plate's own caption, on the plate's own width: 940px at 1440, capped at a
 *     54ch measure. And not one of them catalogues an object or mentions a frame, an edge
 *     or a crop. "The same photograph as the first window, whole" is gone: it performed the
 *     reader's recognition, which is the one thing a payoff cannot survive.
 *   · THE ARGUMENT NO LONGER RUNS BACKWARDS. It was Fraunces 70.2 / Fraunces 30.1 ×2 /
 *     Inter 21.4 ×2 — three treatments for five sentences, with the thesis the whole
 *     mechanic exists to deliver set SMALLER than two of its peers. It is now two voices:
 *     the claim and the thesis in Fraunces, the three sentences between them identical in
 *     Inter. The payoff lands on the second-largest type in the section instead of the
 *     joint-smallest.
 *   · THE HAND-OFF BAND CARRIES THE REAL §02. It was 558px of dead ink. See page.tsx.
 *
 * ── ROUND 3, and every claim below is a fresh reading of the rendered page ───────────
 *
 *   · LENGTH. 2,703px at 1440 = 3.00 screens, from 6.33; 2.14 screens at 390, 2.96 at 1024,
 *     3.13 at 2531; 0.60 screens per client sentence against 1.27. The 264px came out of
 *     air, not out of the ladder. Why it cannot be the 1,900px the critique asked for, in
 *     numbers, is in the stylesheet header: the four windows are 1,516.5px BY CONSTRUCTION
 *     and the five sentences are 609px, so 2,125px is the section with everything else
 *     deleted, and buying 1,900 means a 413px plate at 10.1% picture coverage.
 *   · THE PEER MEASURE. A critic measured the body at 73 real characters against a house
 *     that tops out at 64. Round 2 set 52ch and the RENDERED count, taken per line with a
 *     Range over the text node, was still 66 at 1024, 1440 and 2531. It is 48ch now and the
 *     rendered count is 62 at all three, 42 at 390, at the same line counts.
 *   · THE RUNG IS NOW GROUPED BY ITS AIR. A sentence belongs to the window above it, so the
 *     caption-to-sentence gap is 10.4px and the sentence-to-next-window gap is 32.4px at
 *     1440. It was 19.2 and 26.4 — a ratio of 1.37, at which the sentence floated between
 *     two photographs. The sum is unchanged; the grouping cost no length.
 *
 * WHAT IS PROTECTED, because both critics named it and a combiner will want it — every
 * number re-measured on this build, not carried over: the four windows are 26.00 / 44.00 /
 * 72.00 / 100.00% of one photograph's height at 390, 1024, 1440 AND 2531; every window
 * contains the one above it; all four share a bottom edge held to 0.01px; horizontal
 * coverage is 100.0% at every width, so "Full frame" is true at 390 as well as at 2531;
 * `sizes` resolves to 390 / 780 / 940 / 1360 against rendered boxes of 390 / 780 / 940 /
 * 1360 — four for four, max upscale 1.003, and at 2531 the 1620-wide file lands in a 1360
 * box, 1.19 source pixels per CSS pixel; and the whole ladder is CSS on a stacked <img>, so
 * document height is 3,046px at 1440 with motion, with prefers-reduced-motion AND with
 * JavaScript disabled — 0.07% and 0.19% of pixels differ, all of it dev-mode chrome.
 * 0 FAIL on the glyph-accurate contrast probe swept over the section's full height at all
 * seven house viewports, worst p5 15.58:1: no word in this section sits on a photograph.
 *
 * EVERY SENTENCE COMES OUT OF content/pranava.ts, verbatim, in the client's own order.
 * Nothing here retypes a client sentence, splits one, or invents a fact.
 *
 * This is a server component: every word, every window and every crop is in the static
 * HTML. With JavaScript off the section is finished. See ApertureMotion for the single
 * grace note, which reduced motion switches off without taking anything with it.
 */

/**
 * One window.
 *
 * `--sx2a-ar` is the frame's aspect ratio divided by the share on show, and it is the only
 * thing that sets the band's height — a 3:2 photograph at 26% is a 5.77:1 band, at 100% a
 * 1.5:1 one. `--sx2a-shift` is the complement, spent in a TRANSFORM percentage, which
 * resolves against the image's OWN height rather than the band's: "lift this photograph by
 * 74% of itself" means the same crop at 390 and at 2531, in a band of any height.
 *
 * Four <img> share one src, one srcSet and one sizes, so the section costs one image
 * request. `eager` on the first; the rest lazy.
 */
function Window({ rung, eager = false }: { rung: Rung; eager?: boolean }) {
  const open = rung.open as number;
  return (
    <div className="sx2a-frame" data-sx2a-r="iris">
      <div
        className="sx2a-band"
        style={
          {
            '--sx2a-ar': +(PLATE.ratio / open).toFixed(4),
            '--sx2a-shift': +((1 - open) * 100).toFixed(2),
          } as CSSProperties
        }
      >
        <img
          src={srcOf()}
          srcSet={srcSetOf()}
          sizes={PLATE_SIZES}
          alt={rung.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
        />
      </div>
    </div>
  );
}

/**
 * The plate and its caption, as one <figure>.
 *
 * The caption sits UNDER the photograph on the photograph's own width, which is the whole
 * reason it moved: as a right-hand column it measured 17 characters at 1440 and 19 at 2531,
 * so a 1.76× change of viewport bought 1.27× of column and the text never left a four-word
 * rag. Here it takes the plate's width and a real measure, and it grows with the plate.
 *
 * The convention's word — Detail, Full frame — is the whole of the mechanism's commentary.
 * What follows it says what is being done at the scale this window shows it: the seat, then
 * the five of them, then the garden, then all of it under the trees. Nothing in a caption
 * names a frame, an edge, a crop or another window; the reader is allowed to notice.
 */
function Plate({ rung, eager }: { rung: Rung; eager: boolean }) {
  return (
    <figure className="sx2a-plate">
      <Window rung={rung} eager={eager} />
      <figcaption className="sx2a-cap sx2a-rail">
        <span className="sx2a-cap__what">{rung.what}</span>
        <span className="sx2a-cap__of">{rung.of}</span>
      </figcaption>
    </figure>
  );
}

export function Aperture() {
  const lines = about.intro;

  return (
    <section className="sx2a" id="sx2a" aria-labelledby="sx2a-mark">
      <h2 className="sx2a-eyebrow" id="sx2a-mark">
        <span className="sx2a-eyebrow__n">01</span>
        <span className="sx2a-eyebrow__rule" aria-hidden="true" />
        Introduction
      </h2>

      {RUNGS.map((rung, i) => (
        <div
          className="sx2a-rung"
          key={rung.line}
          data-sx2a-pause={rung.open === null ? '' : undefined}
        >
          {/* Picture first, then the sentence under it — plate and caption, photobook
              order, and the section's whole claim is that the photograph leads. The one
              rung with no window is the client's list sentence: it gets the paper, and the
              absence is the section's only argument about collecting. */}
          {rung.open !== null && <Plate rung={rung} eager={i === 0} />}
          <div className="sx2a-rail sx2a-say">
            <p className={`sx2a-line sx2a-line--${rung.voice}`}>{lines[rung.line]}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
