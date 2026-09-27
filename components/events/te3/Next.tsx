import type { CSSProperties } from 'react';
import Link from 'next/link';
import {
  TE3_HREF,
  TE3_MESSAGE,
  TE3_PHONE,
  TE3_RAISED,
  TE3_SEATED,
  te3Src,
  te3SrcSet,
  type Te3Frame,
} from './frames';
import { Te3Motion } from './Te3Motion';

/**
 * EVENTS §02 · HEARING ABOUT THE NEXT ONE — the next frame is yours.
 *
 * WHAT HAPPENS. The record the page has been showing does not stop: two more photographs
 * of people seated still on grass, and between them a print of the same size that is
 * still blank paper. As it comes into view the reader's own message writes itself into
 * that blank, word by word in wet clay that dries to ink, and the caption under it inks
 * in: "Ask about upcoming events". The whole print is the WhatsApp link. The empty place
 * in the record is the way to fill it, so the page ends on an invitation, not on a third
 * "nothing".
 *
 * The portrait on the right rises beside the text (≥1024px) so the words and the record
 * share one block, not a paragraph floating over a strip.
 *
 * STILL, it is complete: the message is printed in the frame from the first paint, and
 * the script only hides it again when the frame is still below the fold and motion is
 * allowed. With reduced motion, or no script, nothing is ever hidden.
 *
 * NOT HERE, on purpose: a mailing list, a form, a waitlist, dates, fees, venues, a
 * response time or a named contact. None exists.
 */
export function Te3Next() {
  const words = TE3_MESSAGE.split(' ');

  return (
    <section className="te3" aria-labelledby="te3-h">
      <div className="te3-rail">
        <h2 className="te3-mark" id="te3-h">
          <span className="te3-mark__n">02</span>
          Hearing about the next one
        </h2>

        <div className="te3-stage">
          <p className="te3-lead">There is room in the record for the next one.</p>
          <p className="te3-body">
            Nothing here takes a booking, and there is no mailing list. The frame below
            opens WhatsApp with the message already written; change it if you like, then
            send it.
          </p>

          <Photo f={TE3_SEATED} slot="a" sizes="(max-width: 759px) 66vw, (max-width: 1023px) 42vw, 560px" />

          <a
            className="te3-next"
            href={TE3_HREF}
            rel="noopener"
            aria-label="Ask about upcoming events on WhatsApp"
            aria-describedby="te3-msg"
          >
            <span className="te3-paper">
              <span className="te3-corner te3-corner--tl" aria-hidden="true" />
              <span className="te3-corner te3-corner--tr" aria-hidden="true" />
              <span className="te3-corner te3-corner--bl" aria-hidden="true" />
              <span className="te3-corner te3-corner--br" aria-hidden="true" />
              <span className="te3-paper__tag" aria-hidden="true">
                WhatsApp
              </span>
              <span className="te3-msg" id="te3-msg">
                {words.map((w, i) => (
                  <span key={i}>
                    <span className="te3-w" style={{ '--i': i } as CSSProperties}>
                      {w}
                    </span>
                    {i < words.length - 1 ? ' ' : null}
                  </span>
                ))}
                <span
                  className="te3-caret"
                  style={{ '--n': words.length } as CSSProperties}
                  aria-hidden="true"
                />
              </span>
            </span>
            <span className="te3-cap te3-cap--next">
              <span className="te3-label">
                Ask about upcoming{' '}
                <span className="te3-label__end">
                  events
                  <svg
                    className="te3-arw"
                    width="30"
                    height="12"
                    viewBox="0 0 30 12"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M0 6h27M22.5 1.5 27.5 6 22.5 10.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      pathLength={1}
                    />
                  </svg>
                </span>
              </span>
              <span className="te3-phone">Opens WhatsApp · {TE3_PHONE}</span>
            </span>
          </a>

          <Photo f={TE3_RAISED} slot="tall" sizes="(max-width: 759px) 30vw, (max-width: 1023px) 20vw, 360px" />

          <p className="te3-alt">
            For anything that is not an event, use{' '}
            <Link className="te3-ilink" href="/contact/">
              Contact
            </Link>
            .
          </p>
        </div>
      </div>
      <Te3Motion />
    </section>
  );
}

function Photo({ f, slot, sizes }: { f: Te3Frame; slot: 'a' | 'tall'; sizes: string }) {
  return (
    <figure className={`te3-fig te3-fig--${slot}`}>
      <span className="te3-fig__win">
        <img
          className="te3-img"
          src={te3Src(f, 960)}
          srcSet={te3SrcSet(f)}
          sizes={sizes}
          width={f.w}
          height={f.h}
          alt={f.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: f.pos }}
        />
      </span>
      <figcaption className="te3-cap">{f.cap}</figcaption>
    </figure>
  );
}
