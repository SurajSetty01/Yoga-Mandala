import type { CSSProperties } from 'react';
import { about, journeys } from '@/content/pranava';
import { TI1_ALT, TI1_TALL, TI1_WIDE, ti1Src, ti1SrcSet } from './frames';

/**
 * INSIGHTS · MASTHEAD — THE SENTENCE PUTS DOWN ROOTS.
 *
 * What happens: the page opens on the deep ground with a man sitting under a banyan at the
 * right, its aerial roots hanging behind him. At the left, "A growing space for" is set on a
 * hairline bough. From that bough four more hairlines drop, and each one carries one of the
 * sentence's nouns down to where it hangs: "writing," first and shortest, then "reflection,",
 * "study", and last "and exploration.", the longest root, landing lowest. They lengthen one
 * after another as the section settles, like the roots in the photograph. Under them the page
 * says plainly what is not here yet, to the reader, and points them to what is.
 *
 * THE SENTENCE IS STILL ONE SENTENCE. The stem and the four nouns are spans of a single <p>,
 * split from the client's string at runtime rather than retyped, so its text content is
 * exactly `about.journey[3].body`. If that string ever stops having the shape "... for a, b,
 * c and d." the split is skipped and the sentence is set whole, unrooted.
 *
 * THE ROOTS ARE LAID OUT BY ARITHMETIC, NOT MEASUREMENT. Every noun is one line tall
 * (nowrap, and a font size bound to the viewport so the longest always fits), so root i
 * hangs exactly `--ti1-l0 + i * --ti1-pitch` below the bough, in ems. Each deeper root is a
 * step further left, so its hairline passes clear of every word above it.
 *
 * MOTION is CSS only and runs once, on arrival, finished in under 2.4s. Hairlines grow by
 * `scaleY` from the bough and each noun rides the tip of its own line by `translateY` on the
 * same curve. Under prefers-reduced-motion nothing animates: the section is simply its
 * finished state. No script runs in this section.
 *
 * The <h1> is the navigation's label, at label scale; there is one on the page.
 *
 * The image is `loading="lazy"` on purpose: the site header prefetches every route, and an
 * eager image here would be fetched by every other page. A lazy image already in the
 * viewport still loads with the page.
 *
 * The notice lines are the builder's words, not the client's. The reader's intent in them is
 * Blueprint §3's, quoted exactly and presented as the reader's own thought.
 */

const SHAPE = /^(.*?\bfor)\s+(.+?),\s+(.+?),\s+(.+?)\s+(and\s+.+?\.)$/;

type RootStyle = CSSProperties & { '--i': number };

export function Ti1Masthead() {
  const body = about.journey[3].body;
  const m = SHAPE.exec(body);
  const nouns = m ? [`${m[2]},`, `${m[3]},`, m[4], m[5]] : null;

  return (
    <header className="ti1" aria-labelledby="ti1-h1">
      <figure className="ti1-fig">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={ti1SrcSet(TI1_WIDE)}
            sizes="min(100vw, 1620px)"
            width={TI1_WIDE.w}
            height={TI1_WIDE.h}
          />
          <img
            className="ti1-img"
            src={ti1Src(TI1_TALL, 960)}
            srcSet={ti1SrcSet(TI1_TALL)}
            sizes="(max-width: 1023px) min(100vw, 36rem), 50vw"
            width={TI1_TALL.w}
            height={TI1_TALL.h}
            alt={TI1_ALT}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </figure>

      <div className="ti1-rail">
        <div className="ti1-col">
          <h1 className="ti1-h1" id="ti1-h1">
            <span className="ti1-h1__rule" aria-hidden="true" />
            Insights
          </h1>

          {nouns && m ? (
            <p className="ti1-lede">
              <span className="ti1-stem">{m[1]}</span>{' '}
              <span className="ti1-roots">
                {nouns.map((n, i) => (
                  <span className="ti1-root" key={n} style={{ '--i': i } as RootStyle}>
                    <span className="ti1-hair" aria-hidden="true" />
                    <span className="ti1-noun">{n}</span>
                    {i < 3 ? ' ' : null}
                  </span>
                ))}
              </span>
            </p>
          ) : (
            <p className="ti1-lede">
              <span className="ti1-stem">{body}</span>
            </p>
          )}

          <div className="ti1-notice">
            <p className="ti1-now">Nothing has been published here yet.</p>
            <p className="ti1-then">
              If what brought you here is <q className="ti1-q">{journeys.insights.intent}</q>,
              start with three passages Praṇava has already written, just below.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
