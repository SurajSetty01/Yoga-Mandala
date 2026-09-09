import { Fragment } from 'react';
import { within } from '@/content/copy';

/**
 * THE LEDGER — four chapters on one dark field.
 *
 * This page is mostly lists: five short phrases, then seven, then seven, then six. Set as
 * bullets on cream it is the text column that got the last build rejected, so it is set as a
 * REGISTER instead — ruled rows in the display face, two columns wide, reading like the index
 * of a book rather than a to-do list. The phrases are one to four words each; they can carry
 * that size, and at that size they stop being admin and start being the page.
 *
 * The chapter's number and name are `position: sticky`, so the idea you are reading stays
 * beside its list for the whole of it. That is CSS, not choreography — it survives no-JS and
 * `prefers-reduced-motion` untouched, and it never writes to the reader's scroll position.
 *
 * Two photographs, no video. The hero owns the moving image; here a picture is punctuation:
 * one wide frame to open the field and one plate at its midpoint. Neither carries type.
 */

/** `closing` exists only on SHARE — the union type has to be narrowed before it is read. */
const closingOf = (p: (typeof within.pillars)[number]): string | null =>
  'closing' in p ? p.closing : null;

export function Ideas() {
  return (
    <section className="wi-dark" aria-label="The four ideas">
      {/*
        The lintel. A whole class on their feet, arms up — the community the four ideas
        belong to. Full-bleed, and the only wide picture on the page. The caption claims no
        venue: this shoot has no written provenance, and inventing one is how a previous
        candidate misattributed a photograph to an event it was not taken at.
      */}
      <figure className="wi-lint">
        <img
          src="/media/stills/p13-img_0516-1920.webp"
          srcSet="/media/stills/p13-img_0516-960.webp 960w, /media/stills/p13-img_0516-1920.webp 1920w, /media/stills/p13-img_0516-2560.webp 2560w"
          sizes="100vw"
          width={2560}
          height={1440}
          loading="lazy"
          decoding="async"
          alt="A full class standing on their mats with arms stretched overhead, red rope slings hanging from the ceiling of the hall."
        />
        <figcaption className="wi-cap">A community class, mid-practice</figcaption>
      </figure>

      <div className="wi-chapters">
        {within.pillars.map((p, i) => {
          const [first, ...rest] = p.lines;
          const closing = closingOf(p);
          return (
            <Fragment key={p.index}>
              <article className="wi-ch" id={`idea-${p.index}`}>
                <div className="wi-ch__rail">
                  <p className="wi-ch__no">
                    {p.index}
                    <span aria-hidden="true"> / 04</span>
                  </p>
                  <h2 className="wi-ch__name">{p.name}</h2>
                  <span className="wi-ch__tick" aria-hidden="true" />
                </div>

                <div className="wi-ch__body">
                  <div className="wi-ch__lines" data-wr="up">
                    {first ? <p className="wi-ch__first">{first}</p> : null}
                    {rest.map((line) => (
                      <p className="wi-ch__line" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>

                  {p.listLead ? (
                    <p className="wi-ch__lead" data-wr="up">
                      {p.listLead}
                    </p>
                  ) : null}

                  <ul className="wi-reg">
                    {p.items.map((item, n) => (
                      <li
                        className="wi-reg__i"
                        data-wr="up"
                        style={{ '--wd': `${n * 45}ms` } as React.CSSProperties}
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SHARE closes the field. It is the client's own last word on the four
                    ideas, so it gets its own clay rule and the largest type in the ledger —
                    set in the body column, because the rail beside it is still stuck to the
                    top of the viewport when it arrives. */}
                {closing ? (
                  <p className="wi-close" data-wr="up">
                    {closing}
                  </p>
                ) : null}
              </article>

              {/* The plate sits between LEARN and COLLABORATE — the middle of a long dark
                  field, where a reader needs a breath — and four teachers in conversation is
                  the literal picture of the idea that follows it. */}
              {i === 1 ? (
                <figure className="wi-plate" data-wr="up">
                  <img
                    src="/media/stills/ss-ven0208-960.webp"
                    width={960}
                    height={540}
                    loading="lazy"
                    decoding="async"
                    alt="Four teachers seated in wooden chairs on a low stage, one of them speaking into a handheld microphone, in front of a wall painted with a tree."
                  />
                  <figcaption className="wi-cap">Teachers in conversation, on a panel</figcaption>
                </figure>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
