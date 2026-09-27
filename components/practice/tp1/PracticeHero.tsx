import type { CSSProperties } from 'react';
import { about, journeys } from '@/content/pranava';
import { nav } from '@/content/site';
import { HeroCount } from './HeroCount';

/**
 * PRACTICE · HERO — THE LOOP IS COUNTED IN STROKES, NEVER IN NUMBERS.
 *
 * A whole class moves through one wide standing pose across a hall, and the film loops.
 * Under Praṇava's first value, "Consistent practice over quick results.", a short brass
 * stroke is DRAWN BY THE FILM'S OWN CLOCK: it lengthens as the take plays and is set down
 * the moment the take comes round again, and the next one starts. After enough returns
 * the strokes join into one rule, and the value line has its underline — earned by
 * repetition, which is the only claim the line makes.
 *
 * Nothing is ever a numeral. There is no counter, no "day 3", no progress figure: the page
 * has no dates, sessions or durations to state (Blueprint §16), so it counts the only
 * thing it can see.
 *
 * THE STATIC STATE IS COMPLETE. Without motion, on a phone, on a thin connection or before
 * JavaScript arrives, the value line carries three strokes already set — the same three the
 * live version begins from, so nothing snaps away when the film takes over.
 *
 * Below 761px the 16:9 take would be cropped to one man in a tall box and the class would
 * be lost, so a phone shows the archive's own portrait of the same idea instead: four
 * people folding forward over chairs, one behind another. Each viewport fetches only its
 * own picture — the other's <source> resolves to an empty data URI.
 *
 * COPY. The h1 is the page's nav label. The wish is Blueprint §3's visitor intent and the
 * value line is about.values[0]; both are read from content/pranava.ts, never retyped.
 * The captions are page copy and say only what the picture shows.
 */

const PAGE = nav.find((n) => n.href === '/practice/')?.label ?? 'Practice';
const WISH = journeys.practice.intent;
const VALUE = about.values[0].body;

/** 1x1 transparent GIF: what a viewport resolves to for the picture it never shows. */
const NONE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** stroke slots under the value line, and how many are already set before the film runs */
const SLOTS = 12;
const FIXED = 3;

const STILL = 'pr-pbh-img_5615';
const CLIP = 'pr-mov-img_5704';

export function PracticeHero() {
  return (
    <section className="tp1-hero" id="tp1-hero" aria-labelledby="tp1-h1">
      <div className="tp1-in">
        <h1 className="tp1-h1" id="tp1-h1">
          {PAGE}
        </h1>

        <p className="tp1-wish">
          <span className="tp1-wish__q" aria-hidden="true">
            &ldquo;
          </span>
          {WISH}
          <span aria-hidden="true">&rdquo;</span>
        </p>

        {/* ≥761px: the take. The <img> is the poster and is never removed; the <video>
            has no poster attribute and stays invisible until it is proven to be playing. */}
        <figure className="tp1-film">
          <picture>
            <source media="(max-width: 760px)" srcSet={NONE} />
            <source type="image/avif" srcSet={`/media/posters/${CLIP}.avif`} />
            <img
              className="tp1-film__poster"
              src={`/media/posters/${CLIP}.jpg`}
              width={1920}
              height={1080}
              alt="A class moving through a wide standing pose with arms extended on mats across a hall"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <video
            className="tp1-film__vid"
            muted
            playsInline
            loop
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
            data-src={`/media/clips/${CLIP}.mp4`}
          />
        </figure>

        {/* ≤760px: the portrait. */}
        <figure className="tp1-still">
          <picture>
            <source media="(min-width: 761px)" srcSet={NONE} />
            <img
              src={`/media/stills/${STILL}-960.webp`}
              srcSet={`/media/stills/${STILL}-480.webp 480w, /media/stills/${STILL}-960.webp 960w, /media/stills/${STILL}-1920.webp 1920w`}
              sizes="100vw"
              width={1920}
              height={2560}
              alt="Four people in a line folding forward with their hands on the backs of folding chairs"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </figure>

        <div className="tp1-aside">
          <div className="tp1-value">
            <p className="tp1-value__line">{VALUE}</p>
            <span className="tp1-strokes" aria-hidden="true">
              {Array.from({ length: SLOTS }, (_, i) => (
                <i
                  key={i}
                  className={i < FIXED ? 'tp1-stroke is-set is-fixed' : 'tp1-stroke'}
                  style={{ '--tp1-i': i } as CSSProperties}
                />
              ))}
              <i className="tp1-strokes__whole" />
            </span>
          </div>
          <p className="tp1-cap">
            <span className="tp1-cap__film">A class moving through one wide standing pose across a hall.</span>
            <span className="tp1-cap__still">Four people folding forward over chairs, one behind another.</span>
          </p>
        </div>
      </div>
      <HeroCount />
    </section>
  );
}
