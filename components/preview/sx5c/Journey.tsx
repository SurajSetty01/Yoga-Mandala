import type { CSSProperties } from 'react';
import Link from 'next/link';
import { about } from '@/content/pranava';
import { CAPTION, ROOMS, stillSet, stillSrc, type Room } from './rooms';

/**
 * §05 · THE PRAṆAVA JOURNEY: four names that open.
 *
 * As the reader reaches each door, its name parts where it is cut (Le|arn, Prac|tice, He|al,
 * In|sights). The two halves slide apart like a pair of leaves, the room that door leads to is
 * standing in the gap, and the door's own sentence hangs beneath the room as its caption.
 *
 * TYPE IS THE STRUCTURE. The page is laid out the way a book lays out a chapter opening:
 *   · the room is the SINKAGE, the tall space a chapter opening leaves above its title, and
 *     the name drops to the foot of it;
 *   · the sentence is the PLATE'S CAPTION, set directly beneath the plate, and its top edge
 *     keeps one fixed distance from the name's baseline, the way an anchored sidenote keeps
 *     to its reference line;
 *   · the folio HANGS outside the caption's measure, in the space under the first half of
 *     the name;
 *   · the provenance of all four plates is printed ONCE, after the last door, the way a book
 *     lists its illustrations.
 * Photography is sparing: each room is seen only through its own name.
 *
 * EVERY WORD IS THE CLIENT'S AND EVERY WORD IS IN THE HTML. The four names, sentences and
 * links come from `about.journey` verbatim, and nothing can be reached only through motion. The
 * split is visual only: the two halves are aria-hidden and a hidden heading carries the whole
 * word, so a screen reader hears "Learn", never "Le arn".
 *
 * THE LINK IS NAMED BY ITS WORDS, NOT ITS PICTURE. Each <a> is `aria-labelledby` the name and
 * the sentence. The photograph inside keeps its real alt text for anyone reading the page,
 * without being concatenated into a forty-word link name.
 *
 * Server component. The only client code is `Motion`, which may hold shut a door the reader has
 * not reached yet and never hides one they have.
 */

/** the name at the split must join back into the client's word, checked at build */
function halves(r: Room, name: string): [string, string] {
  if (r.name !== name) {
    throw new Error(`sx5c: room order does not match about.journey (${r.name} ≠ ${name})`);
  }
  return [name.slice(0, r.split), name.slice(r.split)];
}

function Plate({ r }: { r: Room }) {
  const pos = { '--op': r.pos, '--op-n': r.posNarrow } as CSSProperties;
  if (r.kind === 'clip') {
    /* The <img> beneath IS the poster, so the <video> carries no `poster` attribute. A poster
       is fetched even when `src` is never set, which cost this site 948 KB once. The video has
       no `src` in the HTML at all: Motion attaches it on approach and releases it a screen
       past. */
    return (
      <>
        <picture>
          <source type="image/avif" srcSet={`/media/posters/${r.id}.avif`} />
          <img
            className="sx5c-img"
            src={`/media/posters/${r.id}.jpg`}
            alt={r.alt}
            loading="lazy"
            decoding="async"
            width={1080}
            height={1920}
            style={pos}
          />
        </picture>
        <video
          className="sx5c-vid"
          data-src={`/media/clips/${r.id}.mp4`}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          style={pos}
        />
      </>
    );
  }
  return (
    <img
      className="sx5c-img"
      src={stillSrc(r, 960)}
      srcSet={stillSet(r)}
      /* the room is at most 46rem tall at 2:3, so about 31rem wide on the widest screen */
      sizes="(max-width: 899px) 92vw, (max-width: 1600px) 27vw, 31rem"
      alt={r.alt}
      loading="lazy"
      decoding="async"
      width={1920}
      height={2560}
      style={pos}
    />
  );
}

export function Journey() {
  return (
    <section className="sx5c" id="sx5c-journey" aria-labelledby="sx5c-title">
      <div className="sx5c-rail">
        <h2 className="sx5c-mark" id="sx5c-title">
          <span className="sx5c-mark__n">05</span>{' '}
          <span className="sx5c-mark__rule" aria-hidden="true" />
          The Praṇava journey
        </h2>

        <ol className="sx5c-doors">
          {about.journey.map((d, i) => {
            const r = ROOMS[i];
            if (!r) return null;
            const [a, b] = halves(r, d.name);
            const key = d.name.toLowerCase();
            return (
              <li className="sx5c-door" key={d.name} data-align={r.align} data-kind={r.kind}>
                <Link
                  className="sx5c-link"
                  href={d.href}
                  aria-labelledby={`sx5c-${key}-n sx5c-${key}-b`}
                >
                  <h3 className="sx5c-sr" id={`sx5c-${key}-n`}>
                    {d.name}
                  </h3>

                  <span className="sx5c-stage">
                    <span className="sx5c-half sx5c-half--a" aria-hidden="true">
                      {a}
                    </span>
                    <span className="sx5c-room">
                      <span className="sx5c-plate">
                        <Plate r={r} />
                        <span className="sx5c-leaf sx5c-leaf--a" aria-hidden="true" />
                        <span className="sx5c-leaf sx5c-leaf--b" aria-hidden="true" />
                        <span className="sx5c-seam" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="sx5c-half sx5c-half--b" aria-hidden="true">
                      {/* narrow screens: the second half resumes where the first stopped */}
                      <span className="sx5c-ghost">{a}</span>
                      {b}
                    </span>

                    {/* the plate's caption, hung beneath the plate */}
                    <span className="sx5c-note">
                      <span className="sx5c-folio" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="sx5c-body" id={`sx5c-${key}-b`}>
                        {d.body}
                      </span>
                      <span className="sx5c-go" aria-hidden="true">
                        <span className="sx5c-go__rule" />
                        <span className="sx5c-go__t">{d.name}</span>
                        <span className="sx5c-go__arw">→</span>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* ONE provenance line for the four plates, set the way a book sets its list of
            illustrations, rather than the same caption printed four times under four doors,
            where it would read as a second line of each sentence. */}
        <p className="sx5c-cap">{CAPTION}</p>
      </div>
    </section>
  );
}
