/**
 * The two moving pictures of /learn/ §02. Both are 1080×1920 loops from the Prabhava
 * archive; `alt` is copied verbatim from `public/media/pranava-clips.json`.
 *
 * `pos` is the crop inside a pane that is a little wider than 9:16 (≈0.62): only the height
 * is trimmed, so it is a vertical position.
 *   · 5582 — the raised hand is at 8% of the height and the feet at 77%, so 45% keeps both.
 *   · 5739 — the legs rise off the top edge and the hands on the mat sit at ~84%, so the
 *     crop leans high to keep the vertical line of the legs, which is the picture.
 */
export type Clip = {
  id: string;
  alt: string;
  w: number;
  h: number;
  pos: string;
};

/** clause A — "not only about learning how to conduct a class": one man demonstrates, three watch */
export const CLASS_CLIP: Clip = {
  id: 'pr-mov-img_5582',
  alt: 'A man holding a wide standing pose with one arm raised while three people stand watching',
  w: 1080,
  h: 1920,
  pos: '58% 45%',
};

/** clause B — "to guide another person's practice": one man steadies one person at a wall */
export const GUIDE_CLIP: Clip = {
  id: 'pr-mov-img_5739',
  alt: 'A man steadying a person holding an inverted position with their back to a wall, legs vertical',
  w: 1080,
  h: 1920,
  pos: '52% 34%',
};
