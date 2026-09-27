import Link from 'next/link';
import { about, journeys } from '@/content/pranava';
import { TL1_FRAME, tl1Src, tl1SrcSet } from './frame';
import { Tl1Motion } from './Tl1Motion';

/**
 * LEARN · MASTHEAD — THE FOCUS IS PULLED FROM THE WORD TO THE ROOM.
 *
 * What happens: the page opens on one photograph edge to edge, but out of focus and under a
 * pale veil, and the words are the only sharp thing on it — the reader's own intent, quoted,
 * then "Learn" and what Learn is. Over one screen of scroll the focus racks across: the room
 * comes sharp (a class kneeling, palms joined, eyes closed) while the veil that held the words
 * drops to the floor of the frame and becomes a paper band, and the words settle into it
 * beside the two routes out of the hero. Attention travels from the word to the people doing it.
 *
 * Only transform and opacity move. "Blur" is never animated: a blurred copy of the frame (the
 * 480 derivative under a static CSS blur) sits beneath the sharp one, and the sharp one fades
 * in over it. The veil collapses by `scaleY` from the bottom edge, and the words ride down
 * inside it. Its top edge travels ahead of the words, so every glyph stays over at least the
 * veil in every frame and the contrast measured at rest holds all the way through.
 *
 * Reduced motion and no JS get the finished state as a plain page: the words on cream, the
 * two routes, then the room, sharp, full width. Nothing is reachable only by scrolling.
 *
 * Both images are `loading="lazy"`, which is deliberate: the site header prefetches every
 * route, and an eager image in this document is then fetched by every other page. A lazy
 * image already inside the viewport still loads with the page.
 */
export function Tl1Masthead() {
  return (
    <header className="tl1" data-tl1>
      <div className="tl1-stage">
        <div className="tl1-frame">
          <div className="tl1-band">
            <div className="tl1-say">
              {/* Blueprint §3's Learn row, in the visitor's own words, so it is quoted. */}
              <p className="tl1-intent">
                <span aria-hidden="true">“</span>
                {journeys.learn.intent}
                <span aria-hidden="true">”</span>
              </p>
              <h1 className="tl1-h1">
                <span className="tl1-word">Learn</span>
                <span className="tl1-deck">{about.journey[0].body}</span>
              </h1>
            </div>

            <nav className="tl1-routes" aria-label="From here">
              <Link className="tl1-enq" href="/contact/">
                Enquire
              </Link>
              <a className="tl1-to" href="#the-named-programmes">
                The named programmes
                <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden="true" focusable="false">
                  <path d="M5 0v12M1 8.2 5 12.4 9 8.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </nav>
          </div>

          <figure className="tl1-fig">
            <div className="tl1-lens">
              {/* The out-of-focus state. A 24 KB derivative is plenty under a blur, and it is
                  decoration: the sharp image below carries the description. */}
              <img
                className="tl1-soft"
                src={tl1Src(480)}
                width={480}
                height={360}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              <img
                className="tl1-sharp"
                src={tl1Src(2560)}
                srcSet={tl1SrcSet}
                sizes="(max-width: 1023px) 200vw, 114vw"
                width={TL1_FRAME.w}
                height={TL1_FRAME.h}
                alt={TL1_FRAME.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="tl1-cap">
              <span>{TL1_FRAME.alt}</span>
              <span className="tl1-prov">Prabhava 5-day Hatha-Iyengar Immersion, 2–6 October 2023</span>
            </figcaption>
          </figure>

          <div className="tl1-veil" aria-hidden="true" />
        </div>
      </div>
      <Tl1Motion />
    </header>
  );
}
