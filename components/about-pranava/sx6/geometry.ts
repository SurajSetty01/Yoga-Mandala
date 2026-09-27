/**
 * sx6 — TWO ENDS OF ONE ROW, AND THE POINT THEY SHARE.
 *
 * THE FIND. pr-pbh-img_5407 and pr-pbh-img_5416 are the same row of chair-supported
 * shoulderstands at Prabhava, photographed from its two ends. Same wall, same acrylic
 * notices, same mats, the same people in reverse order: the man in the red t-shirt is the
 * nearest body in 5407 and the farthest in 5416; the woman in white is the nearest in 5416
 * and the farthest in 5407. In 5407 the wall is on the left and the row runs away to the
 * right; in 5416 the wall is on the right and the row runs away to the left.
 *
 * So set side by side, with 5407 on the left and 5416 on the right, they are the two walls
 * of one corridor, and both vanish towards the middle. This file places each photograph so
 * that its own vanishing point lands on the section's centre line, and cuts each one along
 * two of its own perspective lines, so that each picture becomes the shape of the wall it
 * shows. Nothing here is a rectangle standing beside a paragraph: the pictures are walls,
 * and the words are on the ceiling and the floor between them.
 *
 * VANISHING POINTS — MEASURED, NOT GUESSED. Each wall carries three acrylic notices on
 * standoff screws, and every row of screws is a horizontal line on the wall, so in the
 * photograph each row is an orthogonal. Screws were read off a 1% grid over the 1920
 * derivative (scratchpad/sx6-v2/z5407s.jpg, z5416s.jpg) and the rows intersected:
 *   5407: top-right screws slope 0.5435, bottom-right 0.34, bottom-left 0.338, spare screws
 *         0.54 / 0.335 → the rows meet at (0.875–0.888, 0.368–0.373). Taken as (0.88, 0.37).
 *   5416: top rows −0.713 / −0.715, bottom rows −0.476 / −0.49 → (0.21–0.24, 0.46–0.48).
 *         Taken as (0.24, 0.46).
 * Slopes here are in FRACTIONS of the frame (Δy/H over Δx/W); `px()` turns one into a
 * screen slope for a 3:4 frame.
 *
 * THE CUTS. Every cut is a line through the vanishing point, so every cut is itself a line
 * of the room, and the cut shape is independent of how large the photograph is drawn —
 * which is what lets each breakpoint scale the pictures freely without re-solving anything.
 *   UPPER — along the row of screws under the notices, a hair lower, so the notices (and
 *           their printed text) stay out and only bare wall, feet and legs remain.
 *   LOWER — through the chair seats. Everything below is heads on bolsters. Nothing in the
 *           archive identifies anyone, and a face in a founder's section is read as his
 *           whatever the caption says, so the cut is placed to keep EVERY face out of both
 *           walls, including the far ones (checked face by face against the 1% grids).
 *   TIP   — each wall stops short of the centre. In 5407 a teacher in a yellow kurta
 *           stands bent over a student exactly where the row vanishes (x ≥ 0.78); the tip
 *           stops at x = 0.745, so he is outside the picture, and the vanishing point he
 *           stood at is where the founder's sentence begins.
 *
 * On a phone the walls are too short at the old angles to show anything, so the narrow
 * layout cuts along steeper lines of the same rooms (still through each vanishing point,
 * still clear of every face — the margins are noted per line).
 */

export type Wall = {
  id: string;
  widths: readonly number[];
  /** the frame's vanishing point, as fractions of its width and height */
  vp: { x: number; y: number };
  /** upper and lower cut slopes, FRACTION units, magnitude (the sign is implied by the side) */
  up: number;
  down: number;
  /** narrow-layout cut slopes */
  upN: number;
  downN: number;
  /** where the wall stops short of the vanishing point, as a fraction of the frame's width */
  tip: number;
  alt: string;
};

/** Screen slope (px/px) of a line whose slope is `m` in fraction units, on a 3:4 frame. */
export const px = (m: number) => (m * 4) / 3;

export const LEFT: Wall = {
  id: 'pr-pbh-img_5407',
  widths: [480, 960, 1920],
  vp: { x: 0.88, y: 0.37 },
  /* 0.34 is the screws under the notices. The light-switch plate at the frame's left edge
     has its own lower edge on a line of slope 0.278, so anything under that keeps it out
     too: 0.265 clears both the acrylic and the switch. */
  up: 0.265,
  /* 0.362 passes the nearest chair seat at (0.30, 0.58); the nearest face below it starts
     at y 0.49 (x 0.75), the line there is at 0.42 */
  down: 0.362,
  /* narrow: 0.5 still passes 0.07 above the blue top's face at (0.69, 0.55) */
  upN: 0.5435,
  downN: 0.5,
  tip: 0.745,
  alt: 'Legs raised against a white wall, feet pressed flat to it, above a line of folding chairs: the row seen from one end.',
};

export const RIGHT: Wall = {
  id: 'pr-pbh-img_5416',
  widths: [480, 960, 1920],
  vp: { x: 0.24, y: 0.46 },
  /* the notices' lower screws are at −0.476…−0.49; −0.40 runs under the nearest acrylic
     with 4% to spare and still above the nearest pair of feet */
  up: 0.4,
  /* 0.33 passes the nearest chair seat; the nearest face is at y ≥ 0.73 (x 0.40–0.50),
     where the line is at 0.52 */
  down: 0.33,
  /* narrow: −0.55 takes in the lower half of the nearest notice; 0.45 still clears the
     second face (0.33–0.40, 0.64) at 0.50 */
  upN: 0.55,
  downN: 0.45,
  tip: 0.365,
  alt: 'The same row from its other end: legs raised against the wall, feet flat to it, the chairs beneath them, the far door of the hall at the end.',
};

export const src = (w: Wall, width: number) => `/media/stills/${w.id}-${width}.webp`;
export const srcSet = (w: Wall) => w.widths.map((n) => `${src(w, n)} ${n}w`).join(', ');

/* ── THE SENTENCE ─────────────────────────────────────────────────────────── */

/**
 * How many of the quotation's words go on each line — the sentence's own joints: the
 * subject; the refusal; the turn; the capacity; the three verbs, split so the last line is
 * the single word "themselves." Later lines carry fewer words because they are set larger.
 */
export const LINE_WORDS = [5, 5, 5, 3, 3, 3, 1] as const;

/**
 * Split the client's sentence into those lines by WORDS. Nothing is retyped: the lines
 * joined with single spaces are the sentence exactly. If the sentence ever changes length
 * the split falls back to one line rather than dropping or inventing a word.
 */
export function splitLines(sentence: string): string[] {
  const words = sentence.split(' ');
  const total = LINE_WORDS.reduce((a, b) => a + b, 0);
  if (words.length !== total) return [sentence];
  const out: string[] = [];
  let at = 0;
  for (const n of LINE_WORDS) {
    out.push(words.slice(at, at + n).join(' '));
    at += n;
  }
  return out;
}

/**
 * THE FLOOR. On a ground plane seen in one-point perspective, a thing's size is
 * proportional to its distance below the horizon. Each line's baseline sits `d` below the
 * vanishing point and is set at size c·d, and each baseline sits one of ITS OWN line-heights
 * below the last (the nearer, larger line owns the gap), so d(i+1) = d(i) + L·c·d(i+1) and
 * the depths grow geometrically, by g = 1 / (1 − L·c). The sentence therefore starts
 * smallest at the point the room vanishes to — "The role of a teacher" — and ends largest
 * at the reader's feet — "themselves." Each layout keeps its own first size and last size;
 * everything between is the perspective.
 */
export const LEADING = 1.04;

export type Line = { d: number; s: number };

export function floor(count: number, s0: number, sLast: number): Line[] {
  const g = (sLast / s0) ** (1 / (count - 1));
  const c = (1 - 1 / g) / LEADING;
  const d0 = s0 / c;
  return Array.from({ length: count }, (_, i) => {
    const d = d0 * g ** i;
    return { d, s: c * d };
  });
}

/** wide: design px at a 1440 stage, scaled by --sx6-q in CSS */
export const WIDE = floor(LINE_WORDS.length, 21, 96);
/** medium, 700–1099 */
export const MEDIUM = floor(LINE_WORDS.length, 18, 76);
/** narrow, < 700 — a flatter floor, so the first line is still 15px on a phone */
export const NARROW = floor(LINE_WORDS.length, 15, 46);

export const r2 = (n: number) => Math.round(n * 100) / 100;
