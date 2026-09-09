import { about } from '@/content/copy';

/**
 * 04 — OUR PURPOSE.   Four words, one measure.
 *
 * The lead ends in a colon, so the four names are four completions of one sentence rather
 * than four items in a list. They are therefore set as ONE justified block: every word is
 * scaled until it fills the same measure exactly, flush left and flush right. Nothing is
 * decided by taste — the size of each word is decided by how many letters it has, which is
 * why GROW ends up the largest thing on the page and COLLABORATE the smallest. The client's
 * tagline ends on Grow; the system agrees with the client by arithmetic, not by opinion.
 *
 * `--fit` is the reciprocal of each word's advance width in ems, MEASURED in the browser at
 * wght/tracking as set, not estimated (see NOTES.md). `--wg` compensates optically: a face
 * at 460px reads heavier than the same face at 200px, so the big words are cut lighter and
 * the small ones heavier, and `SOFT` runs the other way so the smallest word keeps softer
 * terminals. Four sizes, four weights, four softnesses, one typeface.
 *
 * NOT four cards, and not section 02's row of four names over four stills: no picture at
 * all, no box, no repeated module — the difference between the rows IS the composition.
 */
export function Purpose() {
  const FIT: Record<string, { fit: string; wg: string; soft: string }> = {
    Connect: { fit: '0.3337', wg: '440', soft: '16' },
    Learn: { fit: '0.4829', wg: '400', soft: '8' },
    Collaborate: { fit: '0.2375', wg: '500', soft: '30' },
    Grow: { fit: '0.4948', wg: '380', soft: '0' },
  };

  return (
    <section className="b-sec b-purp" aria-labelledby="b-purp-h">
      <h2 className="b-eyebrow" id="b-purp-h">
        <span className="b-eyebrow__n">04</span>
        {about.purpose.heading}
      </h2>

      <p className="b-purp__lead" data-br="up">
        {about.purpose.lead}
      </p>

      <ol className="b-purp__fit">
        {about.purpose.items.map((item, i) => (
          <li
            className="b-purp__row"
            key={item.name}
            data-br="up"
            style={
              {
                '--fit': FIT[item.name]!.fit,
                '--wg': FIT[item.name]!.wg,
                '--soft': FIT[item.name]!.soft,
                '--d': `${i * 70}ms`,
              } as React.CSSProperties
            }
          >
            <h3 className="b-purp__word">{item.name}</h3>
            <p className="b-purp__line">{item.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
