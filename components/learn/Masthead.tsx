import { about, journeys } from '@/content/pranava';
import { HERO } from './frames';
import { Says, Shot } from './parts';

/**
 * 01 — THE WINDOW OPENS.
 *
 * The mechanic: the page begins on paper, not on a photograph, and the only picture in the
 * first screen is held inside a NARROW VERTICAL SLOT. As the reader scrolls the masthead,
 * the slot stays where it is and WIDENS into a full band, so the room is not faded in or
 * slid up — it is opened onto. A door, not a poster.
 *
 * Why this and not the site's existing hero move: the home page already sets type inside a
 * moving picture on a scrim shaped to its light, and repeating that here would make the two
 * pages interchangeable. Keeping the type on paper also makes the contrast of the largest
 * words on this page a constant rather than a function of whatever pixel is under them.
 *
 * It is also the honest answer to the archive. Only ten of the 83 new stills carry a 2560
 * derivative and every landscape one stops at 1620, so a full-bleed wide hero would be a
 * 1.58x upscale on a 2560 monitor. A window in a sheet of paper wants to be capped; a hero
 * does not. The cap is 1620px — `--ln-max` — with `margin-inline: auto` beside it.
 *
 * The masthead frame is NOT `eager`. See the comment on `Shot` in parts.tsx: an eager image
 * here is fetched by every other page on the site through the header's route prefetch, and
 * it costs this page nothing to leave it lazy because it is inside the viewport anyway.
 *
 * The opening is driven by scroll through a single custom property, `--o`, written by the
 * page's one client island. Without JavaScript, or under `prefers-reduced-motion`, `--o` is
 * 1 from the first paint: the window is simply open and the masthead is one screen tall.
 * Nothing on this page is reachable only by moving.
 */
export function Masthead() {
  return (
    <header className="ln-mh">
      <div className="ln-mh__say">
        {/*
          The client's own articulation of who this page is for — Blueprint §3, the Learn
          row of the visitor-journey table. It is the sentence the reader arrived with, so
          it is the first thing the page says back to them. Quoted because it is their
          voice, not Praṇava's.
        */}
        <p className="ln-mh__intent">
          <span aria-hidden="true">“</span>
          {journeys.learn.intent}
          <span aria-hidden="true">”</span>
        </p>

        {/*
          One h1 on the page. It carries the route's name and then the client's own
          description of it, so the accessible name is "Learn — Study Yoga through
          structured education…" rather than a bare verb.
        */}
        <h1 className="ln-mh__h1">
          <span className="ln-mh__k">Learn</span>
          <span className="ln-mh__d">{about.journey[0].body}</span>
        </h1>
      </div>

      {/*
        The stage is taller than the screen only when scripted; the sticky child is what the
        reader watches open. `overflow: clip` lives on `__winIn`, which is a CHILD of
        everything the island observes — an observed element that clips to zero reports
        ratio 0 in Chromium and never fires, which shipped a blank page on this project once.
      */}
      <div className="ln-mh__stage">
        <div className="ln-mh__stick">
          <figure className="ln-mh__fig">
            <div className="ln-mh__win">
              <div className="ln-mh__winIn">
                <Shot
                  className="ln-mh__img"
                  frame={HERO}
                  sizes="(max-width: 1620px) 100vw, 1620px"
                />
              </div>
            </div>
            <figcaption>
              <Says>{HERO.alt}</Says>
            </figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
