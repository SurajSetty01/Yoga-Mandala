/**
 * The three pages of the book, and nothing else.
 *
 * ONE ROOM. All three are clips shot in the same Praṇava studio - the same pale walls, the
 * same dark mats, the same wall-mounted notices - because the sentence the book illustrates
 * says Praṇava is "a space for" three things. Three rooms would argue the opposite.
 *
 *   i    study          pr-mov-img_5582   a man holds a wide standing pose, one arm raised,
 *                                         while three people stand close and watch him
 *   ii   practice       pr-mov-img_5659   one woman, one continuous movement: folding forward
 *                                         over a strapped mat, rising with a dowel overhead
 *   iii  transmission   pr-mov-img_5681   a man stands at the wall beside a person in a
 *                                         supported inversion, guiding them through it and
 *                                         down, with others watching from the floor
 *
 * WHY THESE THREE. The vision audit's notes decided it, not the thumbnails:
 *   · 5582 is "a clearly held pose and onlookers who give it the feel of a demonstration" -
 *     learning by watching someone who knows, which is what study looks like in a studio
 *     that does not photograph books (the audit records there is no book in the archive).
 *   · 5659 is "one person, one continuous movement ... the dowel and foot strap make the
 *     alignment work legible" - practice as work, not as a pose held for a camera.
 *   · 5681 is "a full supported inversion from entry to exit with a helper clearly present -
 *     the most complete teaching arc in the clip set" - transmission, literally.
 * None of the three is used anywhere else on the site (grepped components/ and app/ outside
 * preview/). None is in the forbidden whiteboard event. The one landscape clip (5704) was
 * rejected for a page that stands portrait.
 *
 * NOT A POSTER ATTRIBUTE, EVER. The still under each page is an ordinary <img> of the
 * clip's own first frame (`/media/posters/<id>`), and the <video> that plays over it is
 * created by HeroMotion with no `poster` - a poster is fetched even when `src` is never
 * set, which has already cost this site 948 KB once. AVIF first (24-43 KB), JPEG fallback.
 *
 * Nobody is named in an alt. The archive does not record who is in any frame.
 */
export type Leaf = {
  /** the noun in the client's sentence this page stands for - matched, never retyped */
  noun: 'study' | 'practice' | 'transmission';
  /** lower-case roman folio, the way a folded book numbers its leaves */
  folio: string;
  clip: string;
  /** crop inside the page's plate. All three are framed tall with the figures low. */
  pos: string;
  alt: string;
};

export const LEAVES: readonly Leaf[] = [
  {
    noun: 'study',
    folio: 'i',
    clip: 'pr-mov-img_5582',
    pos: '42% 64%',
    alt: 'In a pale studio, a man holds a wide standing pose with one arm raised while three people stand close by and watch him.',
  },
  {
    noun: 'practice',
    folio: 'ii',
    clip: 'pr-mov-img_5659',
    pos: '58% 58%',
    alt: 'A woman in a pink top folds forward over a strapped mat holding a wooden dowel, in front of a yellow wall and a curtained window.',
  },
  {
    noun: 'transmission',
    folio: 'iii',
    clip: 'pr-mov-img_5681',
    pos: '64% 60%',
    alt: 'A man stands at the wall beside a person holding an inverted position, guiding them with his hands, while others watch from the floor.',
  },
] as const;

export const still = (id: string, ext: 'avif' | 'jpg') => `/media/posters/${id}.${ext}`;
export const clipSrc = (id: string) => `/media/clips/${id}.mp4`;
