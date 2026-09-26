/**
 * Section 01, concept B — the six photographs AND the geometry that places them.
 *
 * ═══ WHY THE GEOMETRY LIVES HERE AND NOT ONLY IN THE STYLESHEET ═══════════════
 * The mechanic is "the page opens outward from one vertical seam".  Every plate
 * declares two signed numbers, `a` and `b`, the positions of its LEFT and RIGHT edges
 * measured from the seam in HALF-FIELD units — 0 is the seam, +1 is the right edge of
 * the field, −1 the left.  The stylesheet turns those into
 * `margin-left: calc((1 + a) * 50%)` and `width: calc((b − a) * 50%)`, both percentages
 * of the same containing block.  A pair is a mirror when `a_right = −b_left` and
 * `b_right = −a_left`, which is checkable by reading two lines of this file, and
 * `assertGeometry` below throws at module load if it ever stops being true.
 *
 * ═══ ROUND 3 · WHAT CHANGED HERE ═════════════════════════════════════════════
 * One thing, and it was a bug: `sizes()` collapsed a run of equal tiers onto the
 * widest tier's media condition, so at 1440 and at 1024 the query failed and the
 * browser fell through to the NARROW number.  The run now keeps its NARROWEST tier.
 * Measured before and after in the table above `sizes()`; 1,174 KB → 768 KB at 1440.
 *
 * Two critic demands were checked against this file and found already met, so nothing
 * moved for them: "B's people-less plates — the coconut-palm crown seen from below,
 * and the earth lane" and "D's hall photograph pr-ttc-dsc_0020_1 ... (B also uses this
 * frame; drop it there too)".  Neither pr-ttc-dsc_0020_1 nor any palm-crown frame is
 * in this file; all six frames below have practitioners in them and each was rendered
 * at its own box and looked at.  Likewise "pr-ttc-dsc_0274 as b's OPENING plate at
 * 238–317px ... legibly a photograph of six folding chairs": dsc_0274 is not used
 * here; the opening plate is dsc_0328, one man in meditation under a banyan.
 *
 * ═══ ROUND 2 · WHAT CHANGED AND WHY ══════════════════════════════════════════
 *
 * 1.  THE MECHANIC NOW EXISTS AT 390.  Both critics measured the same failure: at 390
 *     every plate was centred on the seam (offsets 0, +8, −10, +11, −13, 0 — two to
 *     three per cent of a 195px half-width) and what actually grew was plate WIDTH.
 *     "Either make the displacement real at 390 or stop calling the seam the armature
 *     below 1024."  It is real now.  One plate to a row, alternating sides, each one
 *     reaching further past its own page edge than the last:
 *
 *        plate   narrow edges      plate box   visible   centre offset from seam
 *        seed    (−0.44, +0.44)    172 px      172 px      0
 *        p2l     (−1.02, −0.03)    193 px      189 px   −102.4 px  (52% of half-width)
 *        p2r     (+0.03, +1.02)    193 px      189 px   +102.4 px
 *        p3l     (−1.22, +0.10)    257 px      215 px   −119.1 px  (61%)
 *        p3r     (−0.10, +1.22)    257 px      215 px   +119.1 px
 *        band    (−1.34, +1.34)    523 px      390 px      0
 *
 *     Reach (|outer edge|) 0.44 → 1.02 → 1.22 → 1.34, visible width 172 → 189 → 215
 *     → 390 and |offset| 0 → 102 → 119 → 0 all climb together, and the two plates
 *     that are centred are the two that are SUPPOSED to be: the seed sits ON the seam
 *     and the band opens from it in both directions.  For comparison the 1440 offsets
 *     are 53% and 70% of the half-width — the phone is now the same order of
 *     displacement as the desktop, not one fortieth of it.
 *
 * 2.  THE `sizes` STRINGS ARE EXACT, AND THE `max-height` THAT MADE THEM INEXACT IS
 *     GONE.  Both critics read the declared `51vw` against the 245px CSS box and
 *     called it a 2.9× over-fetch.  That reading ignores `object-fit: cover`: a 3:2
 *     photograph in a 1:2 window is scaled until its HEIGHT fills the window, so a
 *     245px box is displaying a 734px-wide rendering of the file and 51vw was the
 *     honest number — at 1440 it selected the 960 derivative, which is the same file
 *     a "corrected" 17vw would have selected.  The measurement: declared 734px,
 *     required 734px, 1:1.
 *
 *     But the critics were pointing at something real one layer down.  The old boxes
 *     were `aspect-ratio` + `max-height: N svh`, and when that ceiling bit, the box's
 *     RENDERED ratio changed and the cover factor computed from the declared ratio
 *     over-stated the need — at 2531 p2l declared 1291px for a box that needed 1032.
 *     A ceiling in svh against a width in vw cannot be expressed in a `sizes` string
 *     at all.  So the ceilings are gone: heights are now set by a per-tier
 *     `aspect-ratio` and nothing else, there is a fourth tier at 1600 where the
 *     ratios flatten (which is what the ceilings were really for), and the box's
 *     ratio is therefore known at authoring time at every viewport.  `need()` is
 *     exact, at all four widths, for all six plates — see the table in `sizes()`.
 *
 * 3.  pr-ttc-dsc_0195_1 IS GONE.  Rendered at its own box and measured, both critics
 *     were right and my own crop was worse than the one they measured: 245×490 at
 *     object-position 80% 55% is 52.7% flat tiles (16px tiles, sd < 7), chroma 25.0,
 *     with the top fifth at 82% flat and 5.5% saturation.  Half the frame is bare
 *     wall.  Its replacement, pr-ttc-dsc_0459, measures 2.7% flat / chroma 36.0 in
 *     the identical box, and 0.5 / 4.6 / 2.0% at the other three tiers — see below.
 *
 * 4.  THE HALL'S WINDOW TURNED.  pr-ttc-dsc_0271_1 in the old 3:2 window was the
 *     WHOLE frame (a 3:2 photograph in a 3:2 box crops nothing) and measured 44.2%
 *     flat with the top two bands at 61% and 73% — the empty wall and the netting
 *     above the row.  Every indoor frame in this archive does that: swept over the
 *     fifteen unused pr-ttc- frames in a 245×490 window, the best indoor reading is
 *     26% and the worst 47%, because the hall IS a white wall, a red floor and a
 *     corrugated roof.  So beat three's window is now a 5:2 letterbox, which cuts the
 *     wall off the top: the same file now measures 27.2% flat / chroma 46.2.
 *
 * ═══ THE LADDER ══════════════════════════════════════════════════════════════
 * Reach = |outer edge| in half-field units:
 *
 *      beat            ≥1600   1100–1599   720–1099    <720
 *      1  the seed      0.26      0.26        0.26      0.44
 *      2  the pair      0.70      0.70        0.70      1.02
 *      3  the pair      1.02      1.02        1.02      1.22
 *      4  the band      1.18      1.18        1.18      1.34
 *
 * The three desktop columns are IDENTICAL, so the ladder is the same shape at 1100,
 * 1440, 1920 and 2531 — only the inner edge moves (0.36 beside the corridor, 0.06
 * once the corridor drops below the pictures) and, at 1600, the window RATIOS flatten
 * so the section does not stretch with the viewport.
 *
 * ═══ THE WINDOWS TURN AS THE SEAM GIVES ═══════════════════════════════════════
 * Beat 1 is nearly upright (5:6), beat 2 is a tall slot (1:2), beat 3 is a level
 * letterbox (5:2) and beat 4 is the full band (22:9).  The apertures rotate from
 * portrait to landscape as they travel outward — and it is also what the frames want:
 * the two beat-2 pictures are standing bodies, the two beat-3 pictures are rows of
 * bodies lying along a floor and a line of fields.
 *
 * ═══ THE PHOTOGRAPHS ══════════════════════════════════════════════════════════
 * ONE CAMPUS, ONE WEEK — every frame is a `pr-ttc-` frame, the training venue and its
 * grounds.  Mixing the PBH studio in (tungsten, yellow walls, tiled floor) would make
 * the field read as a mood board of two buildings.
 *
 * EVERY FRAME HAS PEOPLE PRACTISING IN IT, and none of the six is used anywhere else
 * on the site (grepped across app/, components/ and content/ excluding the preview
 * routes).  Each one was rendered AT THE EXACT BOX IT WILL OCCUPY at all four tiers,
 * measured for flat tiles and chroma, AND looked at.
 *
 * FLAT TILES (16px, sd < 7) and CHROMA, per plate, at its own box:
 *        plate  2531          1440          1024          390
 *        seed    7.2 / 14.8    4.2 / 14.7     —            1.7 / 14.6
 *        p2l     4.6 / 34.9    2.7 / 36.0    2.0 / 35.1    0.5 / 35.0
 *        p2r    10.1 / 47.7    5.8 / 45.3     —            3.1 / 47.9
 *        p3l    41.2 / 46.5   27.2 / 46.2   29.8 / 46.2   24.2 / 42.5
 *        p3r    19.4 / 35.1   12.5 / 35.0    —            7.0 / 31.5
 *        band   27.4 / 54.0   11.7 / 55.2    7.6 / 54.2    0.6 / 53.8
 * p3l is the one weak reading and it is the price of showing the school's own hall at
 * all: it is the best available after the crop above, the archive's indoor floor is
 * ~26%, and the home page's own hero measures 41%.
 *
 * REJECTED AFTER RENDERING AND MEASURING:
 *  · pr-ttc-dsc_0195_1 — 52.7% flat in this window (above).
 *  · pr-ttc-dsc_0120_1 — 22.5% flat in a 5:2 letterbox and the densest indoor frame
 *    measured, but rendered it is four folding chairs across the frame with the
 *    practitioners behind them.  Four frames have been rejected on this project for
 *    having a chair as their subject.
 *  · pr-ttc-dsc_0274 (23.6%) and pr-ttc-dsc_0064_1 (24.4%) — both good, both already
 *    carrying another concept in this tournament.
 *  · pr-ttc-dsc_0302_1 — 0.3% flat and the best-composed frame anywhere in the set,
 *    and for that reason already the centrepiece of concept C and a wing of concept D.
 *  · pr-ttc-dsc_0192 — same sitting, same easel and same legible board as dsc_0193,
 *    which is one of the four forbidden ids.
 *  · pr-ttc-dsc_0366 / _0311 / _0347 / _0404 — a small figure under a painted
 *    building; a double of dsc_0354; a posed line-up; a garden hose on the grass.
 *  · the four forbidden ids (dsc_0209 / _0193 / _0215 / _0217) were never candidates.
 *
 * WIDTHS WERE READ OFF DISK.  Four of the six stop at 1620 and two at 960; none
 * reaches 1920.  The band is therefore upscaled 1.05× at 1440 and 1.84× at 2531 — a
 * critic measured the matched-subject detail of that upscale at 29 (1440) against 33
 * (2531) and called it invisible; it is left alone deliberately.
 *
 * NOBODY IS NAMED.  The archive does not record who is in which frame and the client
 * has supplied no names, so every alt says what is happening.  Every alt below was
 * written from the rendered crop, not from the manifest: the manifest's own caption
 * for dsc_0354 says three women and the frame shows two.
 */

export type Frame = {
  id: string;
  /** derivative widths that exist on disk, largest last */
  widths: number[];
  /** intrinsic aspect of the source file, w / h — the cover-factor depends on it */
  ratio: number;
  /** object-position at 720 and up */
  pos: string;
  /** object-position below 720px, where every aperture changes shape */
  posNarrow: string;
  alt: string;
};

/** left and right edge, signed, in half-field units. 0 is the seam, ±1 the field edge. */
export type Edges = readonly [a: number, b: number];

/** One tier of the layout: where the window's edges are and what shape it is. */
export type Box = { edges: Edges; ratio: number };

/** The four tiers, widest first. There is no `max-height` anywhere: `ratio` is final. */
export const TIERS = ['ultra', 'wide', 'mid', 'narrow'] as const;
export type Tier = (typeof TIERS)[number];

export type Plate = {
  key: string;
  frame: Frame;
  /** ≥1600: the corridor and the pairs both hold, and the windows flatten */
  ultra: Box;
  /** 1100–1599: the corridor holds the type and the pairs flank it */
  wide: Box;
  /** 720–1099: the pairs sit abreast and the type drops below them */
  mid: Box;
  /** <720: one plate to a row, alternating sides, each reaching further out */
  narrow: Box;
};

export function src(f: Frame): string {
  return `/media/stills/${f.id}-${f.widths[f.widths.length - 1]}.webp`;
}

export function srcSet(f: Frame): string {
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}

/**
 * How many source pixels the box actually needs, as a vw number.
 *
 * `sizes` must describe the SOURCE the browser has to fetch, not the CSS width of the
 * box.  Those differ whenever `object-fit: cover` crops: a 3:2 photograph shown in a
 * 1:2 window is scaled until its HEIGHT fills the window, so a 245px-wide window is
 * showing a 734px-wide rendering of the file.  Declaring 17vw there fetches the 480
 * and upscales it 1.53×.  The correction is the cover factor,
 * max(1, sourceRatio / boxRatio), and it is computed here rather than typed, so it
 * cannot drift when a ratio in the table below is changed.
 *
 * THIS IS ONLY HONEST BECAUSE THE BOX HAS NO `max-height`.  Width is a percentage of
 * the field (so, exactly `widthVw` of the viewport) and height is that width over a
 * ratio this file owns.  Nothing else touches either, at any viewport size, so the
 * number below is the number the browser needs — not a ceiling it is under.
 */
function need(box: Box, frame: Frame): number {
  const widthVw = (box.edges[1] - box.edges[0]) * 50;
  const cover = Math.max(1, frame.ratio / box.ratio);
  return Math.ceil(widthVw * cover);
}

const MIN_WIDTH: Record<Exclude<Tier, 'narrow'>, number> = {
  ultra: 1600,
  wide: 1100,
  mid: 720,
};

/**
 * One `sizes` entry per tier, adjacent duplicates collapsed.
 *
 * Resolved, box, and the file the browser then picks (derivatives are 480 / 960 /
 * 1620; 0328 and 0409 stop at 960):
 *
 *   plate  2531                    1440                   1024                 390
 *   seed   26vw→658 box 658  960   26vw→374 box 374  480  26vw→266  480  44vw→172  480
 *   p2l    41vw→1038 box 430 1620  51vw→734 box 245  960  60vw→614  960  99vw→386  480
 *   p2r    19vw→481 box 430   960  23vw→331 box 245  480  32vw→328  480  50vw→195  480
 *   p3l    33vw→835 box 835   960  33vw→475 box 475  480  48vw→492  960  66vw→257  480
 *   p3r    33vw→835 box 835   960  33vw→475 box 475  480  48vw→492  960  66vw→257  480
 *   band  118vw→2987 box 2987 1620 118vw→1699 box 1699 1620 118vw→1208 1620 134vw→523 960
 *
 * Every "resolved" figure equals the source width the cover crop requires, to the
 * rounding of one vw — and as of round 3 the browser agrees.  This table described the
 * INTENT; the emitted string did not match it, because adjacent equal tiers collapsed
 * onto the WIDEST tier's media condition (see `sizes()` below).  Read back out of the
 * rendered page as each <img>'s density-corrected `naturalWidth`, before and after:
 *
 *            2531          1440                 1024                390
 *   seed     658 · 658     633 → 374 (box 374)  450 → 266 (box 266)  172 · 172
 *   p2l     1037 ·1037     734 · 734            614 · 614            386 · 386
 *   p2r      480 ·  480    331 · 331            327 · 327            194 · 194
 *   p3l      835 ·  835    691 → 475 (box 475)  491 · 491            257 · 257
 *   p3r      835 ·  835    691 → 475 (box 475)  491 · 491            257 · 257
 *   band    2986 · 2986   1929 →1699 (box 1699)1372 →1208 (box 1208) 522 · 522
 *
 * Three of the six plates were fetching the 960 derivative where the 480 was the right
 * file.  Section media measured over the wire: 1440 1,174 KB → 768 KB (−35%), 1024 933
 * KB → 919 KB, 2531 and 390 unchanged at 1,666 KB and 444 KB.  Six distinct
 * photographs, all six of them people practising.
 */
export function sizes(p: Plate): string {
  /*
    Adjacent equal values collapse, and the SURVIVOR OF A RUN IS ITS NARROWEST TIER.
    That is a bug fix, and it was worth 406 KB at 1440.  `sizes` conditions are
    evaluated widest-first and the first match wins, so a run [ultra, wide, mid] that
    kept the WIDEST tier's condition emitted `(min-width: 1600px) 26vw, 44vw` — and at
    1440 and at 1024 the 1600 query failed, nothing else matched, and the browser fell
    all the way through to the NARROW number.  Measured, before the fix: the seed
    declared 633px for a 374px box at 1440 (1.69x) and 450px for a 266px box at 1024,
    p3l/p3r declared 691px for a 475px box at 1440 (1.45x), and the band declared
    1929px for a 1699px box.  Three of the six plates fetched the 960 derivative where
    the 480 was the right file, and section media at 1440 measured 1,174 KB against the
    768 KB this table claims.  Keeping the narrowest tier of the run makes the run's
    condition true for every width the run covers.
  */
  const runs: { value: number; tier: Tier }[] = [];
  for (const tier of TIERS) {
    const value = need(p[tier], p.frame);
    const last = runs[runs.length - 1];
    if (last && last.value === value) last.tier = tier;
    else runs.push({ value, tier });
  }
  return runs
    .map(({ value, tier }) =>
      tier === 'narrow' ? `${value}vw` : `(min-width: ${MIN_WIDTH[tier]}px) ${value}vw`,
    )
    .join(', ');
}

/* ── the frames ───────────────────────────────────────────────────────────── */

const seedFrame: Frame = {
  /* THE SEED.  A man alone under the banyan — no mat, no chair, no room.  The first
     sentence is "Yoga is more than a practice on the mat", and this is the only frame
     in the archive that answers it literally: practice, off the mat, outdoors, one
     figure large enough to read at 172px on a phone (rendered and checked).  It is
     also the only peopled frame with real quiet above the subject, which is what a
     plate sitting alone on the seam needs.  1.7–7.2% flat at its four boxes; its
     chroma is the lowest in the set at 14.7, which is what a grey banyan trunk in
     open shade is, and it is the one plate the section does not ask to carry colour. */
  id: 'pr-ttc-dsc_0328',
  widths: [480, 960],
  ratio: 1080 / 1620,
  pos: '48% 56%',
  posNarrow: '48% 56%',
  alt: 'A man sitting cross-legged in meditation on a stone slab beneath a banyan, the trunk and its aerial roots rising behind him and open fields beyond the left.',
};

const wallFrame: Frame = {
  /* THE WALL, left of the seam at beat two — and the frame that replaces
     pr-ttc-dsc_0195_1, which two critics independently marked as the thing that must
     not survive.  Measured at the identical 245×490 box: 0195_1 is 52.7% flat tiles /
     chroma 25.0 with a top fifth at 82% flat and 5.5% saturation; this is 2.7% flat /
     chroma 36.0 with no band above 7%.  It holds at every tier — 4.6% at 2531, 2.0%
     at 1024, 0.5% at 390 — because the subject is a laterite block wall, and a wall
     made of blocks is the one wall in this archive that is not a flat field.

     object-position 80%: the window opens LEFTWARD from its own right edge, so what
     sits at the right of the crop is the first thing revealed, and at the right of
     this frame one practitioner stands in tree pose on a stone step, full height,
     against the blocks.  It is an exterior wall, which also keeps beat two a pair of
     opposites — built against planted — rather than two views of the same garden. */
  id: 'pr-ttc-dsc_0459',
  widths: [480, 960, 1620],
  ratio: 1620 / 1080,
  pos: '80% 55%',
  posNarrow: '80% 55%',
  alt: 'Practitioners in balancing postures along a laterite block wall — two in tree pose with palms joined overhead, one holding a raised foot out in front — standing on a low stone plinth above the grass.',
};

const grassFrame: Frame = {
  /* THE GRASS, right of the seam at beat two, and the exact mirror of the wall: same
     edges, same window, opposite side.  Built against planted, a wall against open
     ground — the second sentence names both practice and ways of understanding life,
     and the pair opens in both directions at once.  Native portrait, so a tall window
     costs it almost nothing: 3.1% flat at 390, 5.8% at 1440, chroma 45–48. */
  id: 'pr-ttc-dsc_0409',
  widths: [480, 960],
  ratio: 1080 / 1620,
  pos: '56% 46%',
  posNarrow: '56% 46%',
  alt: 'A woman sitting cross-legged on grass with both arms raised overhead beside a palm trunk, another practitioner in the same posture on the grass behind her.',
};

const hallFrame: Frame = {
  /* THE HALL, left of the seam at beat three — the school's own room, and the only
     interior in the section.  In the old 3:2 window it was the whole frame and
     measured 44.2% flat, the top two bands 61% and 73%: the empty wall and the green
     netting above the row.  The window is now a 5:2 letterbox anchored at 92% —
     the crop starts below the netting — and the same file measures 27.2% flat /
     chroma 46.2 at 1440 and 24.2% at 390.  What is left in the frame is the receding
     row itself: four practitioners lying back over chairs down a red oxide floor. */
  id: 'pr-ttc-dsc_0271_1',
  widths: [480, 960, 1620],
  ratio: 1620 / 1080,
  pos: '50% 92%',
  posNarrow: '50% 95%',
  alt: 'A row of practitioners lying back in supported bridge over folding chairs, receding down a red oxide floor with mats and blocks beside them.',
};

const fieldsFrame: Frame = {
  /* THE FIELDS, right of the seam at beat three.  Two standing balances in profile
     against bamboo, a low red wall and the open fields — the only frame in the six
     where nobody is looking at the lens, and the strongest outdoor shape in the
     archive.  The 5:2 letterbox suits it better than the old 3:2 did (12.5% flat
     against 15.2%) because what it cuts is blown sky at the top.  Note: the
     manifest's caption says three women; the frame, rendered, shows two, and the alt
     says two. */
  id: 'pr-ttc-dsc_0354',
  widths: [480, 960, 1620],
  ratio: 1620 / 1080,
  pos: '50% 58%',
  posNarrow: '50% 55%',
  alt: 'Two practitioners in a standing balance beside a bamboo clump, each holding one foot behind them with an arm reaching forward, a low red wall and open fields behind.',
};

const lawnFrame: Frame = {
  /* THE BAND.  The last frame, the only one besides the seed that crosses the seam,
     and the one the section is built to arrive at: a woman seated in meditation on
     grass with her eyes closed and three more behind her, no chair, no fan, no poster,
     no wall.  The section ends ON it, with no gap and no rule between its bottom edge
     and the #12201A ground of section 02 — the greenest frame in the set landing on
     the deep green ground.  11.7% flat and chroma 55.2 at 1440, the densest and most
     saturated plate here, and a critic measured the rendered version at 13% / 46.1
     and called it the best-resolved 200 pixels in the tournament.  Nothing about it
     moves in this round except that it is never clipped below 55% of its own width. */
  id: 'pr-ttc-dsc_0396',
  widths: [480, 960, 1620],
  ratio: 1620 / 1080,
  pos: '46% 26%',
  posNarrow: '44% 28%',
  alt: 'A woman sitting cross-legged on grass with her eyes closed and her hands resting on her knees, three others seated in the same posture on the lawn behind her.',
};

/* ── the ladder ───────────────────────────────────────────────────────────────
   Read the pairs as pairs.  At every tier the right plate's numbers are the left
   plate's negated and swapped, which is the definition of a mirror about the seam,
   and `assertGeometry` below fails the build if that ever stops being true — at all
   four tiers now, including narrow, where the pairs used to be exempt because both
   plates were simply centred. */

const seed: Plate = {
  key: 'seed',
  frame: seedFrame,
  ultra: { edges: [-0.26, 0.26], ratio: 8 / 9 },
  wide: { edges: [-0.26, 0.26], ratio: 5 / 6 },
  mid: { edges: [-0.26, 0.26], ratio: 5 / 6 },
  narrow: { edges: [-0.44, 0.44], ratio: 5 / 6 },
};

const p2l: Plate = {
  key: 'p2l',
  frame: wallFrame,
  ultra: { edges: [-0.7, -0.36], ratio: 5 / 8 },
  wide: { edges: [-0.7, -0.36], ratio: 1 / 2 },
  mid: { edges: [-0.7, -0.06], ratio: 4 / 5 },
  narrow: { edges: [-1.02, -0.03], ratio: 3 / 4 },
};

const p2r: Plate = {
  key: 'p2r',
  frame: grassFrame,
  ultra: { edges: [0.36, 0.7], ratio: 5 / 8 },
  wide: { edges: [0.36, 0.7], ratio: 1 / 2 },
  mid: { edges: [0.06, 0.7], ratio: 4 / 5 },
  narrow: { edges: [0.03, 1.02], ratio: 3 / 4 },
};

const p3l: Plate = {
  key: 'p3l',
  frame: hallFrame,
  ultra: { edges: [-1.02, -0.36], ratio: 5 / 2 },
  wide: { edges: [-1.02, -0.36], ratio: 5 / 2 },
  mid: { edges: [-1.02, -0.06], ratio: 5 / 2 },
  narrow: { edges: [-1.22, 0.1], ratio: 9 / 5 },
};

const p3r: Plate = {
  key: 'p3r',
  frame: fieldsFrame,
  ultra: { edges: [0.36, 1.02], ratio: 5 / 2 },
  wide: { edges: [0.36, 1.02], ratio: 5 / 2 },
  mid: { edges: [0.06, 1.02], ratio: 5 / 2 },
  narrow: { edges: [-0.1, 1.22], ratio: 9 / 5 },
};

const band: Plate = {
  key: 'band',
  frame: lawnFrame,
  ultra: { edges: [-1.18, 1.18], ratio: 16 / 5 },
  wide: { edges: [-1.18, 1.18], ratio: 22 / 9 },
  mid: { edges: [-1.18, 1.18], ratio: 3 / 1 },
  narrow: { edges: [-1.34, 1.34], ratio: 2 / 1 },
};

/** In DOM order, which is also the reading order on a phone. */
export const PLATES = { seed, p2l, p2r, p3l, p3r, band };

const ALL: Plate[] = [seed, p2l, p2r, p3l, p3r, band];

/** The two mirrored pairs. Everything else must be centred on the seam. */
const PAIRS: [string, string][] = [
  ['p2l', 'p2r'],
  ['p3l', 'p3r'],
];

/**
 * The mirror law and the ladder law, checked rather than asserted in a comment.
 *
 * Runs at module load in every environment including the static export.  Three claims
 * the section is named for, each one a line of arithmetic:
 *   · the seed and the band are centred on the seam, at every tier;
 *   · each pair is an exact mirror about the seam, at every tier — INCLUDING narrow,
 *     which used to be exempt because both plates were centred there, which is
 *     precisely the failure this round exists to fix;
 *   · reach (|outer edge|) strictly increases beat by beat, at every tier, so
 *     "opens outward" is a property of the layout and not of a description of it.
 */
function assertGeometry(): void {
  const by = new Map(ALL.map((p) => [p.key, p]));

  for (const p of ALL) {
    if (PAIRS.some(([l, r]) => l === p.key || r === p.key)) continue;
    for (const t of TIERS) {
      const [a, b] = p[t].edges;
      if (Math.abs(a + b) > 1e-9) {
        throw new Error(`sx2b: plate "${p.key}" is not centred on the seam at ${t}: ${a}, ${b}`);
      }
    }
  }

  for (const [lk, rk] of PAIRS) {
    const l = by.get(lk);
    const r = by.get(rk);
    if (!l || !r) throw new Error(`sx2b: missing plate in pair ${lk}/${rk}`);
    for (const t of TIERS) {
      const [la, lb] = l[t].edges;
      const [ra, rb] = r[t].edges;
      if (Math.abs(ra + lb) > 1e-9 || Math.abs(rb + la) > 1e-9) {
        throw new Error(
          `sx2b: pair ${lk}/${rk} is not mirrored at ${t}: [${la}, ${lb}] vs [${ra}, ${rb}]`,
        );
      }
    }
  }

  const beats = [seed, p2l, p3l, band];
  for (const t of TIERS) {
    for (let i = 1; i < beats.length; i++) {
      // noUncheckedIndexedAccess: an array index is T | undefined, and this is a build-time
      // assertion, so a missing beat should fail loudly rather than be silently skipped.
      const prevBeat = beats[i - 1];
      const curBeat = beats[i];
      if (!prevBeat || !curBeat) throw new Error('sx2b: beats array is sparse');
      const previous = Math.max(...prevBeat[t].edges.map(Math.abs));
      const current = Math.max(...curBeat[t].edges.map(Math.abs));
      if (!(current > previous)) {
        throw new Error(
          `sx2b: the ladder does not climb at ${t}: ${prevBeat.key} reaches ${previous}, ` +
            `${curBeat.key} reaches ${current}`,
        );
      }
    }
  }
}

assertGeometry();
