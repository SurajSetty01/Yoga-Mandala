import { about, programmes } from '@/content/pranava';
import { Ask, Eyebrow } from '../parts';

/**
 * 03 · PRAYATNA AND RELATED OFFERINGS. Rebuilt at the owner's review (Oct 2026): one screen,
 * one idea. The old thread-and-beads sentence ran a screen and a half and opened on a crop of
 * a bare rope.
 *
 * MIXED on the deep ground. Left: the client's own sentence (About's Practice door, verbatim)
 * set as a calm display line with its six practices in sand, then the programme's name and
 * the ask. Right: one photograph, four women hanging inverted from the wall ropes in a row,
 * which is what sustained, supported practice looks like in this archive.
 */
const PROGRAMME = programmes[2];
const PRACTICES = ['Sādhana', 'Asana', 'Prāṇāyāma', 'meditation', 'intensives', 'retreats'];

export function Tp4Prayatna() {
  if (!PROGRAMME) return null;
  /* about.journey[1].body, wrapped (never retyped): the six practices are picked out in place */
  const door = about.journey[1]?.body ?? '';
  const parts = door.split(new RegExp(`(${PRACTICES.join('|')})`));

  return (
    <section className="tp4-pra" id="pc-prayatna" aria-label="Prayatna and related offerings">
      <div className="tp4-rail tp4-grid">
        <div className="tp4-copy">
          <Eyebrow n="03" dark>
            Prayatna and related offerings
          </Eyebrow>
          <p className="tp4-door">
            {parts.map((p, i) =>
              PRACTICES.includes(p) ? (
                <span className="tp4-term" key={i}>
                  {p}
                </span>
              ) : (
                <span key={i}>{p}</span>
              ),
            )}
          </p>
          <div className="tp4-end">
            <h3 className="tp4-name">{PROGRAMME.name}</h3>
            {PROGRAMME.blurb ? <p className="tp4-blurb">{PROGRAMME.blurb}</p> : null}
            <Ask
              dark
              note="One of the programmes Praṇava names. No description, format or fee for it is published on this site yet."
              subject="Ask about Prayatna"
              message="Hello Praṇava. I would like to know more about Prayatna."
            />
          </div>
        </div>
        <figure className="tp4-pic">
          <img
            src="/media/stills/pr-ttc-dsc_0500-960.webp"
            srcSet="/media/stills/pr-ttc-dsc_0500-480.webp 480w, /media/stills/pr-ttc-dsc_0500-960.webp 960w, /media/stills/pr-ttc-dsc_0500-1620.webp 1620w"
            sizes="(min-width: 1000px) 50vw, 100vw"
            width={1620}
            height={1080}
            alt="Four women hanging inverted from wall ropes in a row along a white wall"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
