import { Fragment, type CSSProperties } from 'react';
import { about } from '@/content/pranava';

/**
 * §04 · HOW WE TEACH — one sentence that opens out.
 *
 * Eight short phrases want a different logic from four paragraphs, and "learning happens
 * over time" is a claim about DURATION. A staircase is the dull answer to it, and it is the
 * answer the live page currently gives; this is the other one.
 *
 * The eight practices are set as ONE run of display type rather than eight items. The
 * client's own punctuation licenses it: the prompt ends in a colon, so what follows is
 * grammatically a single sentence. It is a paragraph, so it has no markers, no numerals and
 * no rules, and it wraps as prose wraps.
 *
 * Duration is in the two things that change across the run: each phrase is larger than the
 * one before it and is followed by more space. So the sentence starts dense and quick and
 * ends slow and wide — it decelerates as you read it — and the eighth phrase, the one that
 * says learning continues beyond a single course, is the largest thing in the section and
 * has nothing after it at all. Then a real silence, and the closing sentence, at reading
 * size, is the only thing in §04 set small.
 *
 * It shares nothing with §03 but the tokens. §03 is one photograph pulling back through
 * space; this is one sentence slowing down through time, on the reversed ground, with no
 * photograph in it — a section that could be swapped with its neighbour has failed, and
 * these two cannot be.
 *
 * Every word is the client's. The order is the client's. The eight phrases carry no
 * punctuation of their own in `content/pranava.ts` and none is added here; the marks
 * between them are painted dots, not characters, which is also why the contrast probe is
 * measuring only the client's words.
 */
export function Teach() {
  const n = about.teach.practices.length;

  return (
    <section className="aa-s aa-teach" id="aa-teach">
      <div className="aa-rail">
        <h2 className="aa-eyebrow aa-eyebrow--dark">
          <span className="aa-eyebrow__n">04</span>
          <span className="aa-eyebrow__rule" aria-hidden="true" />
          How we teach
        </h2>

        <div className="aa-teach__head">
          <p className="aa-teach__lead" data-aa="up">
            {about.teach.lead}
          </p>
          <p className="aa-teach__open" data-aa="up" style={{ '--aa-d': '110ms' } as CSSProperties}>
            {about.teach.open}
          </p>
        </div>

        <p className="aa-teach__prompt" data-aa="up">
          {about.teach.prompt}
        </p>

        <p className="aa-run" data-aa="up" style={{ '--aa-d': '90ms' } as CSSProperties}>
          {about.teach.practices.map((phrase, i) => (
            /* the space between the phrases is markup, not content: without a real text
               node between the spans the accessibility tree — and anyone copying the
               sentence — gets "consistentlyStudy" with no break in it. */
            <Fragment key={phrase}>
              <span className="aa-run__p" style={{ '--aa-i': i } as CSSProperties}>
                {phrase}
              </span>
              {i < n - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>

        <div className="aa-teach__rest" aria-hidden="true" />

        <p className="aa-teach__close" data-aa="up">
          {about.teach.close}
        </p>
      </div>
    </section>
  );
}
