import { within } from '@/content/copy';

/**
 * COMMUNITY INITIATIVES — the figure set down.
 *
 * The verdict on the section this replaces: its ORGANISING INSIGHT is right and is kept —
 * two of the four entries carry long lists and two are prose, so they are two different
 * objects and must not be given one template. Its EXECUTION is what fails. Thirteen items
 * set as uniform rounded lozenges read as a filter bar, which is an interface convention
 * borrowed from shopping; a rectangle of photograph beside a rectangle of text is the exact
 * default the brief names; and Sangha and Pranava Vaakya, dropped into two plain columns at
 * the end, look like the page running out.
 *
 * So the insight survives and the instruments change. The section opens with the disc laid
 * flat — one photograph masked to an arc so shallow it reads as a horizon, the figure the
 * reader has been turning now set down and seen edge-on. After four screens of choosing one
 * quadrant at a time, everything here is open at once: no selection, no state, no turning.
 * That difference is the point of the section.
 *
 * The geometry carries over as arcs rather than boxes — each entry opens on a quarter-arc
 * rule struck from the same circle — and the lists become a stepped register, the same
 * rhythm the quadrants use, rather than lozenges.
 *
 * Praṇava Vaakya is a Praṇava offering surfaced within Yoga Mandala, not Yoga Mandala's
 * own initiative, and says so above its own name. See design/DESIGN-SYSTEM.md §4.
 */

/** Only the Bulletin carries a closing note, so the union has to be narrowed to read it. */
const closingOf = (e: (typeof within.initiatives.entries)[number]): readonly string[] | null =>
  'closing' in e ? e.closing : null;

export function WithinCInitiatives() {
  const { heading, lead, entries } = within.initiatives;
  const programmes = entries.filter((e) => e.items.length > 0);
  const offerings = entries.filter((e) => e.items.length === 0);

  return (
    <section className="wc-init" aria-labelledby="wc-init-h">
      {/* The figure set down. A disc drawn so large that only the top of it crosses the
          page, which is what a circle looks like from the side. */}
      <div className="wc-set">
        <div className="wc-set__arc">
          <img
            src="/media/stills/p13-img_0544-1920.webp"
            srcSet="/media/stills/p13-img_0544-960.webp 960w, /media/stills/p13-img_0544-1920.webp 1920w, /media/stills/p13-img_0544-2560.webp 2560w"
            sizes="100vw"
            width={2560}
            height={1440}
            loading="lazy"
            decoding="async"
            alt="A full class holding downward-facing dog on mats across a wide studio floor while a teacher stands watching from the side of the hall."
          />
        </div>
      </div>

      <div className="wc-init__head">
        <h2 className="wc-init__h" id="wc-init-h">
          {heading}
        </h2>
        <p className="wc-init__lead">{lead}</p>
      </div>

      <ol className="wc-progs">
        {programmes.map((e, i) => {
          const closing = closingOf(e);
          return (
            <li className="wc-prog" data-side={i % 2 ? 'right' : 'left'} key={e.name}>
              <span className="wc-prog__arc" aria-hidden="true" />
              <div className="wc-prog__say">
                <h3 className="wc-prog__h">{e.name}</h3>
                {e.lines.map((line) => (
                  <p className="wc-prog__line" key={line}>
                    {line}
                  </p>
                ))}
                {closing ? (
                  <div className="wc-prog__note">
                    {closing.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="wc-prog__set">
                {e.listLead ? <p className="wc-prog__lead">{e.listLead}</p> : null}
                <ul className="wc-reg wc-reg--paper">
                  {e.items.map((item, n) => (
                    <li className="wc-reg__i" style={{ '--i': n } as React.CSSProperties} key={item}>
                      <span className="wc-reg__t" aria-hidden="true" />
                      <span className="wc-reg__w">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The two that are prose only get room to be prose, and a ground of their own so the
          change of kind is visible before a word is read. */}
      <ol className="wc-offers">
        {offerings.map((e) => {
          /* Matched on the name rather than the index, so reordering the client's list
             cannot silently drop the attribution. */
          const isPranava = e.name.startsWith('Pranava');
          return (
            <li className={`wc-offer${isPranava ? ' wc-offer--pranava' : ''}`} key={e.name}>
              {isPranava ? null : (
                <figure className="wc-offer__disc">
                  <picture>
                    <source type="image/avif" srcSet="/media/posters/ss-ven0083.avif" />
                    <img
                      src="/media/posters/ss-ven0083.jpg"
                      width={1920}
                      height={1080}
                      loading="lazy"
                      decoding="async"
                      alt="Three women stand side by side with their eyes lowered, plants and a courtyard behind them."
                    />
                  </picture>
                </figure>
              )}
              <div className="wc-offer__say">
                {isPranava ? (
                  <p className="wc-offer__tag">A Praṇava offering, surfaced within Yoga Mandala</p>
                ) : null}
                <h3 className="wc-offer__h">{e.name}</h3>
                {e.lines.map((line) => (
                  <p className="wc-offer__line" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
