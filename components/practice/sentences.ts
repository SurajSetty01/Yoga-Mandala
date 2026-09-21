import { about } from '@/content/pranava';

/**
 * The client's sentences, split at the client's own full stops — never retyped.
 *
 * `npm run check:copy` walks content/copy.ts and fails on any four-word string that is not
 * in a source document. content/pranava.ts holds the Praṇava prose, and nothing on this
 * page may paraphrase it, so where a section wants part of a paragraph it takes the part
 * by splitting rather than by typing it out again. A lookbehind keeps the full stop with
 * the sentence, so joining these back together reproduces the client's paragraph character
 * for character.
 */
const sentences = (s: string): string[] => s.split(/(?<=\.)\s+/);

/**
 * About §5, "Practice" — the paragraph this whole page is built on:
 *
 *   [0] Yoga cannot be understood through intellectual study alone.
 *   [1] Practice allows knowledge to become experience.
 *   [2] It requires consistency, observation, refinement and time.
 *
 * §01 takes the first two, which are why one practises at all. §02 takes the third, which
 * is what practising regularly actually asks of someone, and is the only sentence in the
 * client's material that names the four demands.
 */
export const PRACTICE = sentences(about.approach.items[1].body);

/**
 * About §4 — the sentence that names intensives and retreats, and the intention the
 * client says every form of programme shares. §05 opens on the first and arrives at the
 * second, which is the only honest destination a retreats section can have when no dates,
 * durations or fees exist anywhere in the client's material.
 */
export const FORMS = about.what.body[2];
export const INTENTION = about.what.intention;

/**
 * About §7, the Practice door — the one sentence the client has written about what a
 * sustained practice at Praṇava is developed THROUGH. §03 sets its six terms at display
 * size and whispers the grammar between them, so what is read is the practice and what is
 * kept is the sentence.
 *
 * The split is derived, not hand-listed: everything up to "through" is the opening, the
 * terms are what the client separated with commas and an "and", and the trailing full stop
 * is put back. If the client rewrites the door, this follows.
 */
const door = about.journey[1].body;
const cut = door.indexOf(' through ');

export const DOOR = {
  /** "Develop a sustained practice through" */
  open: door.slice(0, cut + ' through'.length + 1).trimEnd(),
  /** the six things, in the client's order */
  terms: door
    .slice(cut + ' through '.length)
    .replace(/\.$/, '')
    .split(/,\s*|\s+and\s+/)
    .filter(Boolean),
  /** the word the client puts before the last term */
  join: 'and',
} as const;
