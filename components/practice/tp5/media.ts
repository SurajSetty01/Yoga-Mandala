/**
 * §04 Prāṇāyāma: one still.
 *
 *  · GROUND is pr-ttc-dsc_0392: 1620x1080 (widths 480/960/1620, no 2560), five women
 *    sitting cross-legged on grass with hands on knees beneath tall trees. Capped at 1620
 *    and centred, never stretched past it.
 *
 * It does not show a breathing technique, and its caption names none.
 */
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
