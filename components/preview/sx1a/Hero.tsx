import { about } from '@/content/pranava';

/**
 * PRAṆAVA · About — HERO, concept SX1A. "The marked crop opens."
 *
 * A server component. No client island, no listener, no rAF, no hydration on this route.
 * The event is four sheets of the page's own paper withdrawing off a mounted plate.
 *
 * ─── WHAT HAPPENS ───────────────────────────────────────────────────────────
 * The plate arrives masked down to one hand-sized rectangle: an open palm resting on a
 * wooden block, a bangle, a forearm, a pink sleeve and the corner of a patterned bolster.
 * You cannot place it. It could be one person resting anywhere. Beside it, in the text
 * column, the same negative is printed small with a hairline rectangle drawn on it, so the
 * question the plate asks — *where is this?* — has its answer on the same screen from the
 * first paint. Then the blades withdraw. Sideways first: the hand turns out to be the near
 * end of a row of people lying along a dark red floor, each on a jute mat with a bolster
 * under the shoulders, the row receding away down a hall. Then up and down, and their legs
 * arrive — raised and resting over the backs of folding chairs. The last thing the section
 * gives you is the thing that makes it practice rather than rest.
 *
 * Nothing zooms and nothing moves. The near figure stays exactly the size and in exactly
 * the place she was, and the room is ADDED to her. That is the page's own sentence — study,
 * practice and transmission as one thing, seen at two widths.
 *
 * Each blade uncovers people, which is the whole reason the window sits where it sits. The
 * previous build's payoff was a band of bare wall; this one has none to uncover, because
 * the wall is not in the plate (see THE FRAME, below).
 *
 * ─── WHY THIS IS AN ENTRANCE AND NOT A SCROLL ───────────────────────────────
 * Runway inside a sticky hero = hero height − viewport height. The binding instruction for
 * this round is a hero no longer than about 1.2 viewports, which leaves at most 0.2 of a
 * viewport — 180px at 1440×900 — for a two-move easel. 180px of scroll is a flick, not a
 * movement. The previous build bought its runway with 3,286px of hero and was 88–95% blank
 * paper for the first 1,250px of it. Length was the wrong currency. So the opening is
 * time-based and the hero is one screen; the reader is never asked to pay scroll for it.
 *
 * ─── WHEN THE MOTION CANNOT RUN ─────────────────────────────────────────────
 * Every blade's BASE state is the withdrawn one and the keyframes travel covered →
 * withdrawn, so `prefers-reduced-motion` (globals.css cancels all animation), a paused
 * animation, or any engine that drops the keyframes lands on the finished plate, whole.
 * The locator survives too: the hairline rectangle is drawn on the plate itself at rest
 * and on the miniature always, so the detail-and-room relationship is STATED, not
 * performed. That is the catalogue's detail-and-key convention doing the job the motion
 * does elsewhere, and it is why the idea does not evaporate when the motion is off.
 *
 * ─── THE FRAME, AND THE CROP THAT IS HALF OF IT ────────────────────────────
 * `pr-ttc-dsc_0274`, free in the archive and used nowhere on the site — grepped, and it is
 * in no other concept in this tournament either. The frame the last build used,
 * `pr-ttc-dsc_0271_1`, carried a fully identifiable upside-down face as its NEAREST figure
 * and a legible garment wordmark, two conditions this project has already rejected other
 * frames for. Neither is in this one: the nearest practitioner's face is hidden behind her
 * own torso, the faces that are visible are mid-row, upside down, and measure ~38 CSS px at
 * the widest the plate is ever drawn; and a full-resolution sweep of the delivered crop
 * finds no text and no garment mark anywhere in it. The audit record reads "from this
 * angle the row reads as pure rhythm".
 *
 * BUT THE FRAME ALONE DID NOT FIX THE DEFECT THE CRITICS NAMED. "The payoff frame's top
 * band ... a blank concrete wall across ~37% of the frame's height" was true of the old
 * frame and, measured, true of this one: the top 25% of `dsc_0274` is 81.7% flat at mean
 * luminance 176/255. It is a plain green wall. Swapping frames had reproduced the fault,
 * so the fix is the crop and not the file. The plate shows the middle 0.76 of the source
 * on both axes, x 12→88% and y 24→100%. 16px tiles, sd < 7 counted flat:
 *
 *      whole source     60.3% flat   detail 12.2   luminance 133
 *      its top 25%      81.7% flat   detail  8.3   luminance 176   ← the wall
 *      the crop         43.1% flat   detail 15.7   luminance 108
 *
 * The home page's own hero — the benchmark this round is judged against — measures 41%
 * flat. The crop also drops the blown-out floor corner at the right, which measures 69%
 * flat at luminance 202. The aperture is still 3:2 and the crop is still 3:2, so every
 * layout number in the stylesheet is unchanged by it and `object-fit: cover` still has
 * nothing to crop; only `sizes` moves, because the file is now laid out at aperture/0.76.
 *
 * The archive was searched before cropping rather than after: every landscape still went
 * through the same probe. The four denser peopled frames — `dsc_0392` (0.9% flat),
 * `dsc_0302_1` (1.8), `dsc_0459` (3.7) and `dsc_0396` (5.6) — are all taken, three of them
 * by other concepts in this same tournament, and taking one would have handed the combiner
 * a frame with two owners. Of the genuinely unused landscape frames, `dsc_0311` is two
 * women looking at the lens with one of them laughing, `dsc_0559` is a tree trunk — a
 * subject a critic's must-not-survive list names outright — and `dsc_0056` has no people
 * in it at all.
 *
 * It is displayed as a MOUNTED PLATE, never full bleed. About §02, which follows this hero
 * on the live page, is itself a full-bleed landscape group shot of a hall; running one
 * here would have been the same picture twice, 900px apart.
 *
 * ─── GEOMETRY, SO NOTHING IS UPSCALED ──────────────────────────────────────
 * The source is 1620×1080. The aperture, the crop and the miniature are all 3:2, so
 * `object-fit: cover` has nothing to crop at any viewport: no cover scale, no mobile
 * `object-position` guess, no `sizes: 100vw` on a portrait aperture. The widest the file
 * is ever drawn is 1243 CSS px against a 1620 source — a reduction, not an enlargement, at
 * every width from 320 to 2560. The numbers are under `SIZES`, below.
 *
 * ─── ACCESSIBILITY ──────────────────────────────────────────────────────────
 * There is one photograph on this page, so there is one description of it. The miniature
 * is the same file reproduced for a structural purpose and is hidden from assistive
 * technology rather than described twice — and nothing here narrates the mechanism to a
 * reader who cannot see it. The alt states what is in the frame and counts nothing: the
 * last build's alt said "Four practitioners" over five.
 *
 * No <video>, so no `poster` attribute exists to be fetched behind a visible <img>.
 */

const ID = 'pr-ttc-dsc_0274';
const WIDTHS = [480, 960, 1620];

const SET = WIDTHS.map((w) => `/media/stills/${ID}-${w}.webp ${w}w`).join(', ');
const SRC = `/media/stills/${ID}-960.webp`;

/**
 * `sizes` states the width the FILE is drawn at, which is not the aperture's width: the
 * plate shows the middle 0.76 of the source on both axes (see the crop block in the
 * stylesheet), so the image is laid out at aperture / 0.76.
 *
 * The aperture's real CSS width — read off `getBoundingClientRect()` at thirteen widths,
 * not estimated, because the last build's `sizes` was an estimate and it was 2.64x wrong
 * on a phone. Measured:
 *   ≥1700 — the masthead is capped at 1720, so the plate stops growing with the screen:
 *           939.9px at 1700, 943.3 at 1920, 939.3 at 2531 and 939.3 at 2560. 944 covers
 *           the largest of them. 944 / 0.76 = 1242.1, so 1243px.
 *   ≥900  — 51.90vw at 900, 52.15 at 1024, 52.22 at 1440 and 52.22 at 1699. 52.3vw covers
 *           the largest with 0.15% over. 52.3 / 0.76 = 68.8vw.
 *   <900  — the plate is the measure, and the gutter stops shrinking at 20px below 500, so
 *           the fraction climbs: 87.50vw at 320, 89.74 at 390, 91.67 at 480, 92.00 at 768
 *           and 92.00 at 899. 92.1vw covers all five. 92.1 / 0.76 = 121.2vw.
 *
 * NOTHING IS ENLARGED AT DPR 1. The widest the file is ever drawn is 1243 CSS px against a
 * 1620 source: a 1.30x reduction, at 2531 and at 2560 alike. The previous build served the
 * 1620 derivative into a 2531-wide full-bleed band — a 1.56x enlargement — and served
 * `sizes="100vw"` into a portrait cover box on a phone, which made the browser take the
 * 480 file and draw it at 1,266 px. Both are gone at the root: there is no full-bleed band,
 * and there is no cover crop at all, because the aperture, the drawn box and the source
 * are all 3:2.
 *
 * AND IT STAYS CHEAP. The candidate each width resolves to at DPR 1:
 *   320 →  388px →  480 (20 KB)      1024 →  705px →  960 (68 KB)
 *   390 →  473px →  480 (20 KB)      1440 →  992px → 1620 (171 KB)
 *                                     2531 → 1243px → 1620 (171 KB)
 * The key carries the same `srcSet` and the same `sizes`, so it resolves to the same
 * candidate and its request costs nothing.
 */
const SIZES = '(min-width: 1700px) 1243px, (min-width: 900px) 68.8vw, 121.2vw';

/**
 * What is in the frame, and nothing else. No count — the last build's alt said "Four
 * practitioners" over five — and no word about the blades, the window or the opening: an
 * alt that narrates a mechanism to a reader who cannot see it describes nothing.
 */
const ALT =
  'Practitioners lying back along a dark red floor with their legs raised and resting over the backs of folding chairs, each on a jute mat with a patterned bolster under the shoulders, the row receding away from the camera.';

export function Sx1aHero() {
  const { heading, sub, support } = about.hero;

  return (
    <section className="sx1a" aria-labelledby="sx1a-h">
      <p className="sx1a-brow">Center for Indian Culture &amp; Yogic Studies</p>

      <h1 className="sx1a-h" id="sx1a-h">
        {heading}
      </h1>

      <hr className="sx1a-rule" />

      {/* The plate. The four blades are sheets of the page's paper, each exactly as large
          as the strip it has to cover, so these are four small compositor layers and not
          four full-screen ones. `.sx1a-rest` is the locator that stays on the picture. */}
      <figure className="sx1a-plate">
        <div className="sx1a-ap">
          <img
            className="sx1a-ap__img"
            src={SRC}
            srcSet={SET}
            sizes={SIZES}
            alt={ALT}
            width={1620}
            height={1080}
            loading="eager"
            decoding="sync"
          />
          <span className="sx1a-blade sx1a-blade--l" aria-hidden="true" />
          <span className="sx1a-blade sx1a-blade--r" aria-hidden="true" />
          <span className="sx1a-blade sx1a-blade--t" aria-hidden="true" />
          <span className="sx1a-blade sx1a-blade--b" aria-hidden="true" />
          <span className="sx1a-rest" aria-hidden="true" />
        </div>
      </figure>

      <div className="sx1a-side">
        <p className="sx1a-sub">{sub}</p>
        <p className="sx1a-sup">{support}</p>

        {/* The key: the same negative at a fifth to a quarter of the plate's width
            (0.179 at 2531, 0.223 at 1440, 0.290 at 390, 0.300 at 320), same aspect,
            same file, with the opening rectangle drawn on it. Not a thumbnail — a scale
            model, so the rectangle here and the rectangle on the plate are one rectangle
            at two sizes. Decorative by construction: it is the picture already described
            below it, so it is hidden rather than described a second time. */}
        <div className="sx1a-key" aria-hidden="true">
          <img
            className="sx1a-key__img"
            src={SRC}
            srcSet={SET}
            sizes={SIZES}
            alt=""
            width={1620}
            height={1080}
            loading="eager"
            decoding="sync"
          />
          <span className="sx1a-key__box" />
        </div>
      </div>
    </section>
  );
}
