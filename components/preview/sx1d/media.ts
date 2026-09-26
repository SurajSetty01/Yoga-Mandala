/**
 * ONE FRAME. Why this one, and why nothing moving.
 *
 * ── WHAT ROUND 1 KILLED ─────────────────────────────────────────────────────
 * Both critics rejected the previous pair outright and both were right:
 *
 *   · `pr-pbh-img_5586` — the veranda. Its own alt named its subject: brass
 *     wind chimes, a striker disc, a white parapet, a terracotta pillar. No
 *     people. It was the nearest and largest plane on the page, full bleed,
 *     on screen 100% of the time, and dimmed to a maximum of 105/255 — a
 *     photograph used as wallpaper. It is gone, and nothing replaced it: the
 *     ground of this section is now flat `--ground-deep` ink. There is no
 *     photograph behind the words at all, so there is no scrim to tune, no
 *     554 KB file rendered at opacity 0.18, and no 1.32× upscale at 390.
 *
 *   · `pr-mov-img_5906` — the hall clip. Critic 2's point is the decisive one
 *     and it is checkable: the frame a reduced-motion reader sees permanently,
 *     and every other reader sees until the clip attaches, is the clip's first
 *     frame — people standing about under a ceiling fan with two framed
 *     pictures and a wall plaque. Designer B's own reject list had already
 *     disqualified this exact clip for this exact reason. Gone.
 *
 * ── WHY THERE IS NO CLIP AT ALL NOW ─────────────────────────────────────────
 * Not a shortcut — a survey. Sixteen clips in `pranava-clips.json`; three are
 * already used on the site (`5455`, `5576`, `5687`), two are in other entrants'
 * builds (`5659`, `5582`), one is `5906`. The posters of the rest were opened
 * and looked at, because a clip's first frame is the frame most readers see
 * for longest:
 *
 *   5681  teacher beside a headstand — two framed A4 notices with body text
 *   5642  two framed notices, a CEILING FAN, four folding chairs, bottles
 *   5523  a single figure between two large black FOLDING CHAIRS
 *   5466  a fully identifiable face, upside down, filling the frame
 *
 * A ceiling fan, a folding chair and an identifiable inverted face are each a
 * condition this project has already used to reject a frame. None of the four
 * stands on its own, so none of them ships. The section transfers **0 bytes of
 * video at every viewport** — the house hero transfers 0 at 390 and this
 * matches it at 2531 as well.
 *
 * The one pattern worth keeping from round 1 is kept in the markup and not in
 * a file: a `<video>` under a visible `<img>` never carries a `poster`
 * attribute (it is fetched even when `src` is never set; that cost this site
 * 948 KB once), and where a poster exists in both, the AVIF is the one to take
 * — `pr-mov-img_5659` is 43,181 B as AVIF against 178,854 B as JPG. The
 * aperture below is built to hold a clip the day one exists whose first frame
 * can stand alone. None does today.
 *
 * ── THE FRAME ───────────────────────────────────────────────────────────────
 * `pr-pbh-img_5648`. Its subject is people practising and nothing else:
 * two practitioners folded over straight front legs, both hands down on wooden
 * blocks, on mats against a plain warm wall, with daylight and green leaves
 * through the window behind. The audit calls it "the tightest and most graphic
 * frame of this run". Both faces are turned down into the work, so nobody in
 * it is identifiable face-on. There is no garment wordmark, no signage, no
 * certificate, no fan, no cooler.
 *
 * Its flaws are at the LEFT: a black folding chair with a stencilled code on
 * its back, a bamboo pole, and the second practitioner cropped mid-body. All
 * three sit inside source x ≈ 0–0.36 and the aperture never shows them — and
 * not because an `object-position` was nudged until it looked right: the image
 * element carries the SOURCE'S OWN RATIO and hangs 68% of its 168% width off
 * the aperture's left edge, so the visible slice is source x ∈ [0.405, 1.000]
 * at every viewport instead of a slice that moves with the aperture's shape.
 * See the `__img` rule in styles/preview-sx1d.css.
 *
 * CORRECTED AGAINST THE RENDERED PIXELS. An earlier version of this comment
 * claimed a red bag was also outside the crop. It is not: the bag sits at
 * source x ≈ 0.43–0.52 and a pair of white slippers at ≈ 0.40–0.48, and both
 * are visible in the opened aperture at 1440×900 and 2560×1440. They are low,
 * small and behind her back leg — floor objects in a room where people are
 * practising, not the subject of the frame, which is why the frame still
 * stands. But the claim was wrong and a claim that does not survive the
 * screenshot is the thing this round was told to stop writing. The chair and
 * the pole are genuinely gone; the bag was never gone.
 *
 * WIDTHS, CHECKED ON DISK RATHER THAN ASSUMED:
 *   480 (49,214 B) · 960 (172,286 B) · 1920 (564,908 B) · 2560 (847,252 B)
 * `sizes` is NOT the aperture's width. The aperture is a door — ratio 0.46 —
 * and a 0.75 source cover-cropped into it is scaled by HEIGHT, so the width
 * the browser must fetch is 0.78 × the aperture's HEIGHT, which is about
 * 1.7× its width. Writing the aperture's own width there is the defect
 * `about-pranava/NOTES.md` records costing a 2.84× upscale on the previous
 * About hero, and the same defect critic 2 measured on entrant A at 2.64×.
 * The five tiers below state the rendered width, and the result at DPR 1 is a
 * downscale at every standard viewport and an upscale at none — verified from
 * `currentSrc` and the element's own box, not from the markup.
 *
 * NOT IN USE ANYWHERE ELSE ON THE SITE — grepped across app/, components/ and
 * styles/ for the id before it was chosen.
 */
export const OPENING = {
  id: 'pr-pbh-img_5648',
  widths: [480, 960, 1920, 2560],
  /** intrinsic, for the aspect box — 3024 × 4032 */
  w: 3024,
  h: 4032,
  /**
   * Describes THE CROP THAT IS SHOWN — a door-shaped slice of the right of the
   * frame — not the whole file, and it never mentions the section's motion.
   *
   * IT IS SINGULAR, AND THAT IS A CORRECTION. The previous string said
   * "Practitioners … their hands … on mats". The source has two practitioners,
   * but the second one lives at source x ≈ 0–0.30 and the aperture starts at
   * 0.405, so ONE is inside it — checked on the rendered aperture at 320×568,
   * 390×844, 768×1024, 1024×768, 1280×720, 1440×900, 2531×1140 and 2560×1440,
   * closed and open. A plural that is false in every crop is the same defect
   * as entrant C's "four others seated behind" (three) and entrant A's "Four
   * practitioners" (five); it is not excused by being in the alt rather than
   * on the screen.
   *
   * Everything it names is present in the SHORTEST crop, the phone's, which
   * sees source y 0.315–0.972: the fold, the straight front leg, the hand on
   * the block, the mat, the yellow wall. The curtained window is NOT named —
   * it is a sliver at 390 and a full drop at 2560, so it is not a fact about
   * every crop. No count, no place, no name.
   */
  alt: 'A practitioner folding forward over a straight front leg, her hand down on a wooden block, on a mat against a plain yellow wall.',
} as const;

/** `/media/stills/<id>-<w>.webp`, across every width that exists on disk. */
export function srcSet(f: { id: string; widths: readonly number[] }): string {
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}

export function src(f: { id: string; widths: readonly number[] }): string {
  return `/media/stills/${f.id}-${f.widths[f.widths.length - 1]}.webp`;
}

/**
 * THE WIDTH THE BROWSER MUST FETCH, DERIVED RATHER THAN GUESSED.
 *
 * A 0.75 source cover-cropped into an aperture narrower than 0.75 is scaled by
 * HEIGHT, so the width to fetch is 0.75 × the IMAGE ELEMENT's height — which
 * has nothing to do with the aperture's width. On the wide tier the element is
 * 104% of an aperture that runs from `--over` above the stage down to the
 * threshold, so
 *
 *     fetch = 1.68 × aperture = 1.68 × 0.50 × (100vh + 8vh − 9vh) = 83.2vh
 *
 * and `sizes` says exactly that. It is a viewport HEIGHT, which is the whole
 * point: at 2560×1440 the aperture is 1408px tall and needs 1197px of source,
 * while a 36vw rule asked for 911 and the browser took the 960 — a 1.14×
 * upscale that appeared on the taller of two wide screens and on neither of
 * the others. On the narrow tier the aperture's width is the clamp and the
 * element is 1.68× of it, so fetch = 1.68 × the door's width.
 *
 * Verified from `currentSrc` and the element's own rendered box at all eight
 * viewports; the table is in app/preview/sx1d/page.tsx.
 *
 * THE NARROW TIERS WERE RE-DERIVED when the aperture took on the gutter it
 * now bleeds over. The element is 1.68 × the aperture, and the aperture grew,
 * so the old 79/72/54vw hints under-stated the real box by 12%, 20% and 13%.
 * They still resolved to a downscale at DPR 1 — a hint that is too small is
 * only dangerous once it crosses a srcset tier — but "the browser got away
 * with it" is not a measurement. Re-derived: at 320 the element is 284 CSS px
 * (88.6vw), at 390 it is 338 (86.6vw), at 768 it is 458 (59.6vw). The hints
 * below sit just above each, so every one of them is honest in the direction
 * that cannot cost a reader anything.
 */
export const SIZES =
  '(max-width: 520px) 90vw, (max-width: 660px) 88vw, (max-width: 899px) 62vw, 84vh';
