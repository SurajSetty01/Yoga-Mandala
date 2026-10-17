/**
 * §05 What We Value: one photograph per value, each one an act rather than a symbol.
 *
 * Sādhana and Adhyayana are Prabodha TTC frames at 1620 (480 / 960 / 1620 in
 * public/media/stills/). Viveka and Sevā were replaced on the client's review ("a teacher /
 * student discussion rather than a balancing pose"; "community, teaching or mentorship
 * rather than an empty hall"). Both are 3:2 crops of frames from Samskrithi Sadhana phone
 * films, so their largest size is the film's own 1080 width (480 / 960 / 1080 in
 * public/media/about-v2/):
 *   · ss-ven0194 at 30%, top 720 rows: two people mid-conversation.
 *   · ss-ven0052 at 55%, rows 640 to 1360: a teacher adjusting a seated participant while
 *     others sit on chairs behind and watch.
 * Every alt was written from the rendered crop.
 */
export type ValueFrame = {
  alt: string;
  /** one entry per derivative: [url, width] */
  set: ReadonlyArray<readonly [string, number]>;
};

const still = (id: string): ValueFrame['set'] =>
  [480, 960, 1620].map((w) => [`/media/stills/${id}-${w}.webp`, w] as const);
const v2 = (id: string): ValueFrame['set'] =>
  [480, 960, 1080].map((w) => [`/media/about-v2/values-${id}-${w}.webp`, w] as const);

export const VALUE_FRAMES: Record<string, ValueFrame> = {
  Sādhana: {
    set: still('pr-ttc-dsc_0569'),
    alt: 'Five practitioners in downward-facing dog on mats in a receding line, low sunlight across a red floor',
  },
  Adhyayana: {
    set: still('pr-ttc-dsc_0191'),
    alt: 'Women in saris seated on a red floor, turned towards a woman standing in a white sari, with three people seated on chairs beside her',
  },
  Viveka: {
    set: v2('ss-ven0194'),
    alt: 'A man and a woman in conversation outdoors, he speaking with a hand raised to his chest, she listening and about to reply',
  },
  Sevā: {
    set: v2('ss-ven0052'),
    alt: 'A teacher bends to guide a participant seated on a mat, while others sit on chairs behind them and watch',
  },
};

export const frameSrc = (f: ValueFrame) => f.set[1]![0];
export const frameSet = (f: ValueFrame) => f.set.map(([u, w]) => `${u} ${w}w`).join(', ');
