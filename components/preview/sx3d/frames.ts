/**
 * The five surfaces of the room, and why each photograph is on the surface it is on.
 *
 * Every frame below was chosen by LOOKING at it on the plane it is mapped to, not by
 * reading the manifest: a photograph on a side wall is seen at a grazing angle, so what
 * matters is which way the picture's own perspective runs, and a picture whose own room
 * recedes the wrong way reads as a wall that bends.
 *
 *   back wall   Transmission   pr-mov-img_5681   clip + its own still beneath it
 *   left wall   Practice       pr-ttc-dsc_0500   the rope wall; the row recedes to the
 *                                                  RIGHT, which is toward the back wall
 *                                                  once the flap is folded
 *   right wall  Practice       pr-ttc-dsc_0510   the same rope wall from nearer; its
 *                                                  figures grow toward the RIGHT, which is
 *                                                  the front on this side. The wide V of
 *                                                  each body is symmetric, so it survives
 *                                                  the grazing angle better than anything
 *                                                  with a direction in it
 *   floor       Tradition      pr-ttc-dsc_0020_1 an earth lane, top of the frame hinged
 *                                                  at the back wall, so the lane runs away
 *                                                  from the reader toward the teacher
 *   ceiling     Inquiry        pr-ttc-dsc_0056   a palm crown photographed looking
 *                                                  straight UP — the only frame in either
 *                                                  library that was taken at the angle a
 *                                                  ceiling is seen from
 *
 * The two walls are the same rope wall in the same TTC hall on the same morning — the same
 * white render, the same red floor, the same slings — so the room's two sides agree, and
 * the room is symmetrical the way a hall with ropes on both walls is. pr-ttc-dsc_0195_1 was
 * the first right wall and was dropped on the render: a row of legs and chair frames seen
 * at a grazing angle turned into a tangle nobody could read.
 * None of the five appears anywhere else on the site (grepped across components/ and app/,
 * previews excluded).
 *
 * WIDTHS ARE THE ONES ON DISK. Every TTC still stops at 1620; the clip's still is a
 * 1080 × 1920 poster. Nothing here is asked for at a width that does not exist.
 *
 * NOBODY IS NAMED. The archive does not record who is in a frame; every alt says what is
 * happening.
 */

export type Face = 'back' | 'left' | 'right' | 'floor' | 'ceiling';

export type Frame = {
  id: string;
  widths: number[];
  /** object-position on the surface */
  pos: string;
  alt: string;
  /** `sizes` for the srcset — the width the picture is DRAWN at, not the surface's box:
      a landscape frame covering a portrait wall is scaled to the wall's height */
  sizes: string;
};

const still = (id: string, pos: string, alt: string, sizes: string): Frame => ({
  id,
  widths: [480, 960, 1620],
  pos,
  alt,
  sizes,
});

export function src(f: Frame): string {
  return `/media/stills/${f.id}-${f.widths[f.widths.length - 1]}.webp`;
}

export function srcSet(f: Frame): string {
  return f.widths.map((w) => `/media/stills/${f.id}-${w}.webp ${w}w`).join(', ');
}

/* Walls are portrait boxes (0.63) covered by 3:2 frames, so the picture is drawn at
   ~0.68 × the stage's width × 1.5 ≈ the stage's own width, then magnified up to 1.75×
   at the wall's front edge. Floor and ceiling are 1.27 boxes and nearly fit. */
const WALL = '(min-width: 960px) 46vw, 96vw';
const FLAT = '(min-width: 960px) 36vw, 72vw';

export const FRAMES: Record<Exclude<Face, 'back'>, Frame> = {
  left: still(
    'pr-ttc-dsc_0500',
    '22% 50%',
    'Women hanging upside down from ropes fixed to a white wall, their hands reaching towards a red floor',
    WALL,
  ),
  right: still(
    'pr-ttc-dsc_0510',
    '66% 50%',
    'Women hanging upside down from wall ropes with their legs spread wide, hands reaching to a red floor',
    WALL,
  ),
  floor: still(
    'pr-ttc-dsc_0020_1',
    '46% 100%',
    'An earth lane running away between a white building and a wall of hanging vines',
    FLAT,
  ),
  ceiling: still(
    'pr-ttc-dsc_0056',
    '50% 40%',
    'A coconut palm seen from directly below, its fronds spread against the sky',
    FLAT,
  ),
};

/** The back wall: a 12-second silent loop, with its own still beneath it as the only
    poster. No `poster` attribute anywhere — it is fetched even when `src` never is. */
export const CLIP = {
  id: 'pr-mov-img_5681',
  mp4: '/media/clips/pr-mov-img_5681.mp4',
  avif: '/media/posters/pr-mov-img_5681.avif',
  jpg: '/media/posters/pr-mov-img_5681.jpg',
  /* 1080 × 1920 on a 4:5 wall: 70% of the frame's height is shown, from 16% to 86%, which
     keeps the teacher's head, the student's feet on the wall and the mats beneath them,
     and loses the notices above and the floor clutter below. */
  pos: '50% 55%',
  alt: 'A teacher standing beside a student in a headstand against a wall, his hands raised as he explains, while others sit on the floor and watch',
};
