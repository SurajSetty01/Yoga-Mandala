/**
 * §04 Prāṇāyāma: one clip above, one still below.
 *
 *  · AIR is pr-mov-img_5576: 1080x1920, 6.4 s, 1.43 MB, the archive's only clip with no
 *    people in it. It holds A WASP NEST WITH WASPS at 51-67% of the frame height for the
 *    first ~3 s, before the camera draws back. Checked frame by frame at 5 fps: nothing
 *    but leaves, a pine and heliconia bracts ever enters the top 45%. The window is 3:2
 *    and pinned to the top of the frame (object-position y 0%), so it shows 0-37.5% of
 *    the height at every width: 13 points of clear leaf above the nest. The window is
 *    never wider than 32rem, so the 1080px source is always shown at or below its size.
 *
 *  · GROUND is pr-ttc-dsc_0392: 1620x1080 (widths 480/960/1620, no 2560), five women
 *    sitting cross-legged on grass with hands on knees beneath tall trees. Capped at 1620
 *    and centred, never stretched past it.
 *
 * Neither frame shows a breathing technique, and neither caption names one.
 */
export const AIR = {
  id: 'pr-mov-img_5576',
  w: 1080,
  h: 1920,
  alt: 'Close green leaves moving gently in daylight, filling the frame with overlapping blades and stems',
} as const;

export const GROUND = {
  id: 'pr-ttc-dsc_0392',
  widths: [480, 960, 1620],
  w: 1620,
  h: 1080,
  alt: 'Five women sitting cross-legged on grass with their hands on their knees beneath tall trees',
} as const;

export const groundSrcSet = GROUND.widths
  .map((w) => `/media/stills/${GROUND.id}-${w}.webp ${w}w`)
  .join(', ');
