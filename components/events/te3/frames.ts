import { links, site } from '@/content/site';

/**
 * §02 · Hearing about the next one — the data this section stands on.
 *
 * THE LINE. Blueprint §6 asks Events for registration and §14 for an optional WhatsApp or
 * contact action. There is nothing to register for and no backend to register with, and
 * every email address in content/site.ts is null, so the one live channel carries the
 * request with the message already written. The reader changes it in WhatsApp before it
 * is sent; nothing here sends anything.
 */
export const TE3_MESSAGE = `Hello ${site.name}. Please let me know about upcoming events.`;
export const TE3_HREF = `${links.whatsapp}?text=${encodeURIComponent(TE3_MESSAGE)}`;
export const TE3_PHONE = links.whatsappDisplay;

/**
 * THE TWO FRAMES either side of the blank one. Both Prabodha TTC, both on grass under the
 * trees, both people seated still — so the empty print between them reads as the next
 * one in the same record, not as a different kind of object.
 *
 * Alts are the manifest's, with one correction: pr-ttc-dsc_0396's manifest alt says "four
 * others seated behind", and the frame shows three. Captions say what is shown and
 * nothing else: no place, no event, no names.
 */
export type Te3Frame = {
  id: string;
  alt: string;
  cap: string;
  w: number;
  h: number;
  widths: readonly number[];
  pos: string;
};

export const TE3_SEATED: Te3Frame = {
  id: 'pr-ttc-dsc_0396',
  alt: 'A woman sitting cross-legged on grass with her eyes closed and hands on her knees, three others seated behind',
  cap: 'Eyes closed, on the grass.',
  w: 1620,
  h: 1080,
  widths: [480, 960, 1620],
  pos: '42% 62%',
};

export const TE3_RAISED: Te3Frame = {
  id: 'pr-ttc-dsc_0409',
  alt: 'A woman sitting cross-legged on grass with both arms raised overhead, another practitioner behind',
  cap: 'Arms raised, beneath the trees.',
  w: 1080,
  h: 1620,
  widths: [480, 960],
  pos: '58% 50%',
};

export const te3Src = (f: Te3Frame, w: number) => `/media/stills/${f.id}-${w}.webp`;
export const te3SrcSet = (f: Te3Frame) => f.widths.map((w) => `${te3Src(f, w)} ${w}w`).join(', ');
