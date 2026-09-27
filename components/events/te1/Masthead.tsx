import type { CSSProperties } from 'react';
import { TE1_EMPTY, TE1_GATHERED, te1Src, te1SrcSet, type Te1Frame } from './frames';

/**
 * EVENTS — THE MASTHEAD.  "The gathering leaves the hall."
 *
 * WHAT HAPPENS. The page opens on a class standing in warrior one across a red floor. The
 * band is held while the reader scrolls, and the class leaves it one person at a time, the
 * farthest first: a soft edge travels right to left across the photograph and takes each
 * figure in turn, uncovering a hall set out with a row of empty places. Only when the room
 * is empty does its upper wall turn to paper, and "Nothing is scheduled at the moment."
 * lands there, where the raised hands were.
 *
 * The negative is therefore never the largest thing on the page on its own. It is said
 * inside the picture of what has happened here, which is what the page can honestly offer.
 *
 * NO SCRIPT. The whole thing is a CSS scroll-driven animation on a view timeline, gated by
 * `@supports (animation-timeline: view())` AND `prefers-reduced-motion: no-preference`.
 * Everywhere else (reduced motion, Firefox, JavaScript off) the default stylesheet is the
 * finished section: the two frames side by side, the sentence already on the empty room,
 * each frame with its own caption. Nothing is reachable only through motion.
 *
 * DOM ORDER is the reading order a screen reader gets: the heading, the answer, the two
 * photographs, then the condition. The condition paragraph is placed beside the heading by
 * grid area, so the sighted reader meets it first and the answer lands last.
 *
 * NOTHING INVENTED. No event name, date, venue, fee or step. "When there is something to
 * announce" is a condition, and what an announcement would carry is Blueprint §6's own
 * spec for this page. The captions say what each frame shows and name only the collection.
 */
export function EventsMasthead() {
  return (
    <section className="te1" aria-labelledby="te1-h1">
      <div className="te1-track">
        <div className="te1-stage">
          <h1 className="te1-h1" id="te1-h1">
            Events
          </h1>

          <div className="te1-band">
            <p className="te1-lede">Nothing is scheduled at the moment.</p>
            <Frame f={TE1_GATHERED} which="full" priority />
            <Frame f={TE1_EMPTY} which="empty" />
          </div>

          <p className="te1-say">
            When there is something to announce, it will be listed here: what it is, when it
            runs and how to take part. Until then the page keeps the record of gatherings that
            have already happened.
          </p>
        </div>
      </div>
    </section>
  );
}

function Frame({
  f,
  which,
  priority = false,
}: {
  f: Te1Frame;
  which: 'full' | 'empty';
  priority?: boolean;
}) {
  const pos = { '--te1-w': f.wide, '--te1-n': f.narrow } as CSSProperties;
  return (
    <figure className={`te1-fig te1-fig--${which}`}>
      <div className="te1-pic">
        <img
          className="te1-img"
          src={te1Src(f)}
          srcSet={te1SrcSet(f)}
          sizes="(max-width: 699px) 200vw, (max-width: 1619px) 100vw, 1620px"
          width={1620}
          height={1080}
          alt={f.alt}
          style={pos}
          loading="eager"
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
      <figcaption className="te1-cap">
        <span className="te1-cap__src">Prabodha TTC</span>
        <span className="te1-cap__rule" aria-hidden="true" />
        {f.caption}
      </figcaption>
    </figure>
  );
}
