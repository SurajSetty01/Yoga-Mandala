import { within } from '@/content/copy';

/**
 * COMMUNITY INITIATIVES — a different content type, so a different object.
 *
 * The four ideas are a sequence and are set as a ledger. These four are not a sequence: two
 * are programmes with long lists, two are a paragraph each. Making them look like the
 * chapters would be one template wearing two hats, which is the failure mode the design
 * system names. So they come back onto paper, the panels break the column in half, and the
 * lists change instrument — phrases in a wrapping field rather than ruled rows.
 *
 * Praṇava Vaakya is a Praṇava offering surfaced within Yoga Mandala, not Yoga Mandala's own
 * initiative, and carries a tag saying so. See design/DESIGN-SYSTEM.md §4.
 */

/** Only the Bulletin carries a closing note; the union has to be narrowed before it is read. */
const closingOf = (e: (typeof within.initiatives.entries)[number]): readonly string[] | null =>
  'closing' in e ? e.closing : null;

export function Initiatives() {
  const { heading, lead, entries } = within.initiatives;

  return (
    <section className="wi-init" aria-labelledby="wi-init-h">
      <div className="wi-init__head">
        <h2 className="wi-init__h" id="wi-init-h">
          {heading}
        </h2>
        <p className="wi-init__lead">{lead}</p>
      </div>

      <ol className="wi-init__list">
        {entries.map((e, i) => {
          const closing = closingOf(e);
          const hasItems = e.items.length > 0;
          /* Matched on the name rather than the index so a reordering of the client's list
             cannot silently drop the attribution. */
          const isPranava = e.name.startsWith('Pranava');

          return (
            <li
              className={`wi-card ${hasItems ? 'wi-card--panel' : 'wi-card--open'}${
                i === 0 ? ' wi-card--fig' : ''
              }`}
              data-wr="up"
              key={e.name}
            >
              {i === 0 ? (
                <figure className="wi-card__fig">
                  <picture>
                    <source type="image/avif" srcSet="/media/posters/p27-img_0889.avif" />
                    <img
                      src="/media/posters/p27-img_0889.jpg"
                      width={1080}
                      height={1920}
                      loading="lazy"
                      decoding="async"
                      alt="Two teachers working with a third, one guiding her shoulders and the other her mid-back, while two people watch from the floor."
                    />
                  </picture>
                </figure>
              ) : null}

              <div className="wi-card__body">
                {isPranava ? (
                  <p className="wi-card__tag">A Praṇava offering, surfaced within Yoga Mandala</p>
                ) : null}

                <h3 className="wi-card__h">{e.name}</h3>

                {e.lines.map((line) => (
                  <p className="wi-card__line" key={line}>
                    {line}
                  </p>
                ))}

                {e.listLead ? <p className="wi-card__lead">{e.listLead}</p> : null}

                {hasItems ? (
                  <ul className="wi-chips">
                    {e.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {closing ? (
                  <div className="wi-card__note">
                    {closing.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
