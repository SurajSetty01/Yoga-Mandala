/**
 * The three plates of the Heal hero, in the order they arrive.
 *
 * Chosen for what the page is about: care given through people, with props and rest. None of
 * them shows a treatment or names a condition, and nothing in the archive identifies anyone,
 * so no caption names a person. Alts are the manifests' (public/media/pranava-*.json), the
 * clip's trimmed to the single frame the still shows. Captions are plain descriptions of the
 * picture, written without dashes.
 *
 *   pr-mov-img_5557     a supported shoulderstand held on a bolster, a helper crouched at the
 *                       left edge; almost still, loops cleanly (loopScore 4). 1080 x 1920.
 *   pr-pbh-img_5622     a teacher's arm reaching to a student's back over a chair: the
 *                       clearest hands-on correction in the Prabhava set. 3024 x 4032.
 *   pr-pbh-img_5808     three women resting on bolsters, belts at the feet, eyes closed.
 *                       3024 x 4032; the door and chairs above them are cropped away.
 *
 * None of the three is used anywhere else on /heal/.
 */
export const TH1_HELD = {
  id: 'pr-mov-img_5557',
  clip: '/media/clips/pr-mov-img_5557.mp4',
  avif: '/media/posters/pr-mov-img_5557.avif',
  jpg: '/media/posters/pr-mov-img_5557.jpg',
  w: 1080,
  h: 1920,
  alt: 'A person in a supported shoulderstand, lying on a bolster with legs vertical, a helper crouched beside',
  caption: 'A shoulderstand held on a bolster, a helper close by',
} as const;

export const TH1_HAND = {
  id: 'pr-pbh-img_5622',
  w: 3024,
  h: 4032,
  alt: 'A man reaching out to adjust the back of a woman folding forward over a folding chair',
  caption: 'A teacher reaching to adjust a student’s back',
} as const;

export const TH1_REST = {
  id: 'pr-pbh-img_5808',
  w: 3024,
  h: 4032,
  alt: 'Three women lying in a row with knees open, belts around their feet and bolsters under their heads',
  caption: 'Resting on bolsters, belts around the feet',
} as const;

const WIDTHS = [480, 960, 1920] as const;

export const th1Src = (id: string, w: number) => `/media/stills/${id}-${w}.webp`;
export const th1SrcSet = (id: string) => WIDTHS.map((w) => `${th1Src(id, w)} ${w}w`).join(', ');
