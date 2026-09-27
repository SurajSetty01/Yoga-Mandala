import { programmes } from '@/content/pranava';
import { Ask, Cap, Eyebrow } from '../parts';
import { DOOR } from '../sentences';
import { TP4_FRAMES, tp4Src, tp4SrcSet } from './frames';
import { Tp4Thread } from './Thread';

/**
 * 03 · PRAYATNA AND RELATED OFFERINGS — THE CLIENT'S SENTENCE STRUNG LIKE A MALA.
 *
 * WHAT HAPPENS. A wall rope hangs from its roof anchor in a close photograph and runs off
 * the bottom of the frame. As the reader scrolls, it keeps going as a hairline: it drops,
 * turns, and threads the client's door sentence word by word, folding back at the end of
 * every line the way a mala lies in folds. The six practices are the large beads. The
 * grammar between them ("Develop a sustained practice through", the commas, "and") is set
 * at reading size ON the thread, because the grammar is what holds the six together as one
 * sentence. The thread passes through one last, larger bead, the bare name Prayatna, and is
 * tied off in a knot. The Ask mark hangs under it.
 *
 * WHY. The client lists Prayatna and describes it nowhere, and the only thing they have
 * written about a sustained practice is the Practice door sentence. The thread joins the
 * two ideas without inventing anything between them. The photographs stay at the start of
 * the thread, as far from the name as the section allows, so no picture ever stands in for
 * a description that does not exist.
 *
 * Nothing is retyped. The sentence comes from DOOR (components/practice/sentences.ts), the
 * name from `programmes[2]`, and a blurb, if the client ever writes one, renders under the
 * name; null renders as nothing. The other four programme names belong to /learn/.
 *
 * Reduced motion, or a thread that cannot measure: the thread is drawn whole, and the
 * sentence reads the same without it.
 */
const PROGRAMME = programmes[2];

export function Tp4Prayatna() {
  const { open, terms, join } = DOOR;
  const last = terms.length - 1;
  const words = open.split(' ');

  return (
    <section className="tp4-pra" id="pc-prayatna">
      <div className="tp4-rail">
        <Eyebrow n="03" dark>
          Prayatna and related offerings
        </Eyebrow>

        <div className="tp4-mala">
          <figure className="tp4-pics">
            <div className="tp4-row">
              <img
                src={tp4Src(TP4_FRAMES.row, 1620)}
                srcSet={tp4SrcSet(TP4_FRAMES.row)}
                sizes="(max-width: 899px) calc(100vw - 2.7rem), (max-width: 1599px) 70vw, 1110px"
                width={TP4_FRAMES.row.w}
                height={TP4_FRAMES.row.h}
                alt={TP4_FRAMES.row.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="tp4-rope" data-tp4-rope>
              <img
                src={tp4Src(TP4_FRAMES.rope, 960)}
                srcSet={tp4SrcSet(TP4_FRAMES.rope)}
                sizes="(max-width: 899px) 84vw, min(42vw, 38rem)"
                width={TP4_FRAMES.rope.w}
                height={TP4_FRAMES.rope.h}
                alt={TP4_FRAMES.rope.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tp4-cap">
              <Cap dark>Four people inverted on the wall ropes, and one rope seen close, from its roof anchor down.</Cap>
            </figcaption>
          </figure>

          {/*
            One sentence, strung. Its text content is about.journey[1].body character for
            character. Every bead is an inline-block the thread runs behind; the opening's
            spaces sit inside a grammar-sized span so the thread stays hidden between its
            words and shows only between beads.
          */}
          <p className="tp4-str">
            <span className="tp4-open">
              {words.map((w, i) => (
                <span key={w + i}>
                  <span className="tp4-o" data-tp4-bead="">
                    {w}
                  </span>
                  {i < words.length - 1 ? ' ' : null}
                </span>
              ))}
            </span>{' '}
            {terms.map((t, i) => (
              <span key={t}>
                <span className="tp4-b" data-tp4-bead="">
                  {t}
                  {i < last - 1 ? <span className="tp4-p">,</span> : null}
                  {i === last ? <span className="tp4-p">.</span> : null}
                </span>
                {i === last - 1 ? (
                  <>
                    {' '}
                    <span className="tp4-g" data-tp4-bead="">
                      {join}
                    </span>
                  </>
                ) : null}
                {i < last ? ' ' : null}
              </span>
            ))}
          </p>

          <div className="tp4-end">
            <h3 className="tp4-name">
              <span className="tp4-name__b" data-tp4-bead="name">
                {PROGRAMME.name}
              </span>
            </h3>
            {PROGRAMME.blurb ? <p className="tp4-blurb">{PROGRAMME.blurb}</p> : null}
            <Ask
              dark
              note="One of the programmes Praṇava names. No description, format or fee for it is published on this site yet."
              subject="Ask about Prayatna"
              message="Hello Praṇava. I would like to know more about Prayatna."
            />
          </div>

          <Tp4Thread />
        </div>
      </div>
    </section>
  );
}
