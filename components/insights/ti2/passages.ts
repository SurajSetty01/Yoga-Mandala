import { about } from '@/content/pranava';

/**
 * THE THREE PASSAGES, AND WHY NOTHING HERE IS RETYPED.
 *
 * `insights.articles` is `null`: there is no article, title, date, author or excerpt anywhere
 * in the client's material. What does exist is the thinking, so this section reads three of
 * Praṇava's own sentences rather than promising writing that has not been written.
 *
 * Each passage is the string out of `content/pranava.ts`, and the clause the section marks is
 * located inside it by `indexOf` at build time. `mark()` throws if the clause is not found
 * character for character, so if the client revises a sentence the build FAILS rather than
 * shipping a clause that is no longer theirs.
 *
 * WHERE EACH ONE IS CREDITED. About's Approach and How We Teach sections were deleted at the
 * client's instruction (c15378c), so passages 01 and 02 are no longer published on a live page
 * and are credited to Praṇava's writing with no link. Only 03 still lives on /about/, under
 * #apr-founder, and only 03 links. The source document does not say who spoke that sentence,
 * so the link names the section, never a speaker.
 */

export type Frame = {
  id: string;
  /** widths that exist on disk, largest last */
  widths: number[];
  w: number;
  h: number;
  alt: string;
};

export type Passage = {
  /** what precedes the marked clause, '' if it starts the passage */
  lead: string;
  /** the clause the reader marks, set at display size */
  lit: string;
  /** what follows it, '' if it ends the passage */
  tail: string;
  /** where the passage is still published, if it is */
  link: { label: string; href: string } | null;
  /** the photograph that answers the clause, tipped into the margin once it is marked */
  frame: Frame;
};

/**
 * Split `src` at `clause`, which must appear in it exactly once. `indexOf` rather than a
 * regex: these sentences carry typographic apostrophes and em dashes a pattern gets wrong.
 */
function mark(src: string, clause: string, rest: Omit<Passage, 'lead' | 'lit' | 'tail'>): Passage {
  const at = src.indexOf(clause);
  if (at === -1) {
    throw new Error(
      `insights/ti2/passages.ts: the clause "${clause.slice(0, 48)}…" is not in the client's sentence. ` +
        `content/pranava.ts has changed; re-read it and re-choose the clause rather than editing the sentence.`,
    );
  }
  if (src.indexOf(clause, at + 1) !== -1) {
    throw new Error(`insights/ti2/passages.ts: the clause "${clause.slice(0, 48)}…" appears twice; it cannot be located.`);
  }
  return { lead: src.slice(0, at), lit: clause, tail: src.slice(at + clause.length), ...rest };
}

export const PASSAGES: Passage[] = [
  /* Inquiry — the one principle about the reader rather than about Praṇava, and its middle
     sentence is the whole of what an Insights page is for. Answered by three people listening,
     one with a notebook open. */
  mark(about.approach.items[2].body, 'To understand why something is practised, not simply how it is performed.', {
    link: null,
    frame: {
      id: 'pr-ttc-dsc_0285_1',
      widths: [480, 960, 1620],
      w: 1620,
      h: 1080,
      alt: 'Three women seated on chairs listening, one resting her chin on her hand, another holding a notebook',
    },
  }),

  /* The certificate refusal. Answered by what a certificate is not: three people holding one
     person up to the rope at the roof beam. The manifest's alt ("hanging inverted") does not
     describe this frame; the alt below says what the picture shows. */
  mark(about.teach.open, 'We do not believe that a certificate alone makes someone a Yoga teacher,', {
    link: null,
    frame: {
      id: 'pr-ttc-dsc_0479',
      widths: [480, 960],
      w: 1080,
      h: 1620,
      alt: 'A woman climbing to a rope at the roof beam, standing on a man’s shoulders while two women hold her steady',
    },
  }),

  /* The teacher's role. The frame's white-coated, masked, motion-blurred watcher at the right
     edge reads as a clinic, so she is cropped out (see .ti2-fig--c in styles/sec-ti2.css) —
     and the crop is the answer to the clause: the student in the pose he has set up with a
     chair, a blanket and two blocks, the teacher outside the frame. */
  mark(about.founder.quote, 'but to help the student develop the capacity to see, understand and practise for themselves.', {
    link: { label: 'The founder', href: '/about/#apr-founder' },
    frame: {
      id: 'pr-pbh-img_5405',
      widths: [480, 960, 1920],
      w: 3024,
      h: 4032,
      alt: 'A man in a supported shoulderstand, his hips over a folding chair, his feet against the wall and his shoulders on a folded blanket between two blocks',
    },
  }),
];
