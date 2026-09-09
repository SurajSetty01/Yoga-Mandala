import { within } from '@/content/copy';
import { INITIATIVE_FRAMES, ROOM } from './frames';

/**
 * COMMUNITY INITIATIVES — the relationship inverts.
 *
 * VERDICT ON THE EXISTING SECTION, since it was the one part of the old page the client
 * thought "might be good": its TAXONOMY is right and is kept. Two of these four carry long
 * "may include" lists and two are a paragraph; treating them identically would be one
 * template wearing two hats, and the old build was correct to split them and correct to tag
 * Pranava Vaakya as a Praṇava offering. What is not kept is the surface. A heading, a
 * paragraph, a row of pale chips and a rectangular photograph beside them is precisely the
 * arrangement the client rejected — "right-side text, left-side text… boxy images" — and it
 * being the least-bad section on a rejected page is not an argument for shipping it.
 *
 * So the reasoning survives and the rendering does not.
 *
 * The idea: THE PILLARS ARE PROVEN, THE INITIATIVES ARE BEING BUILT. Everything above this
 * has already happened — the client's own word for these four is "gradually developing". So
 * the section stands in the one room in the archive with nobody in it: the Samskrithi gallery,
 * hung and waiting, photographed before the day filled it. The room dissolves downward into
 * the ground it is standing on and the rest of the page is that ground.
 *
 * And the instrument inverts. Up the page the type is pinned to the evidence — chips on the
 * photograph. Down here the evidence is pinned to the type: each initiative is a measure of
 * prose with its one photograph hung in the margin beside it, on a cord dropped from the rule
 * that opens the entry. Marginalia, not a card. A document being drafted, with proof pinned
 * to the edge of the page.
 */

/** Only the Bulletin carries a closing note; the union has to be narrowed before it is read. */
const closingOf = (e: (typeof within.initiatives.entries)[number]): readonly string[] | null =>
  'closing' in e ? e.closing : null;

/** how far each plate hangs below its rule, and how wide it is hung */
const HANG = [
  { drop: '2.2rem', w: 'clamp(9rem, 16vw, 15rem)' },
  { drop: '4.8rem', w: 'clamp(8rem, 13vw, 12.5rem)' },
  { drop: '1.2rem', w: 'clamp(11rem, 22vw, 21rem)' },
  { drop: '3.2rem', w: 'clamp(10.5rem, 19vw, 18rem)' },
];

export function Initiatives() {
  const { heading, lead, entries } = within.initiatives;

  return (
    <section className="wb-init" id="wb-init" aria-labelledby="wb-init-h">
      {/* THE ROOM. A photograph used as ground, not as an illustration: it holds the top of
          the section and is masked away downward into --ground-deep, so the type below is
          standing inside the same picture rather than underneath it. Nobody is in it, so it
          claims nothing — which is the point of putting it here. */}
      <div className="wb-room">
        <picture className="wb-room__pic">
          <source type="image/avif" srcSet={`/media/posters/${ROOM.id}.avif`} />
          <img
            className="wb-room__img"
            src={`/media/posters/${ROOM.id}.jpg`}
            width={ROOM.w}
            height={ROOM.h}
            style={{ objectPosition: ROOM.pos }}
            loading="lazy"
            decoding="async"
            alt={ROOM.alt}
          />
        </picture>
        <div className="wb-room__scrim" aria-hidden="true" />

        <div className="wb-room__head">
          <h2 className="wb-init__h" id="wb-init-h">
            {heading}
          </h2>
          <p className="wb-init__lead">{lead}</p>
          <p className="wb-room__lbl">
            <span className="wb-lbl__what">{ROOM.shows}</span>
            <span className="wb-lbl__where">{ROOM.event}</span>
          </p>
        </div>
      </div>

      <ol className="wb-hang">
        {entries.map((e, i) => {
          const closing = closingOf(e);
          const hasItems = e.items.length > 0;
          const f = INITIATIVE_FRAMES[e.name];
          const hang = HANG[i]!;
          /* Matched on the name rather than the index, so reordering the client's list
             cannot silently drop the attribution. */
          const isPranava = e.name.startsWith('Pranava');

          return (
            <li
              className="wb-ent"
              data-kind={hasItems ? 'programme' : 'note'}
              style={{ '--drop': hang.drop, '--pw': hang.w } as React.CSSProperties}
              key={e.name}
            >
              <div className="wb-ent__say" data-wb="up">
                {isPranava ? (
                  <p className="wb-tag">A Praṇava offering, surfaced within Yoga Mandala</p>
                ) : null}

                <h3 className="wb-ent__h">{e.name}</h3>

                {e.lines.map((line) => (
                  <p className="wb-ent__line" key={line}>
                    {line}
                  </p>
                ))}

                {e.listLead ? <p className="wb-ent__lead">{e.listLead}</p> : null}

                {hasItems ? (
                  <ul className="wb-tags">
                    {e.items.map((item) => (
                      <li className="wb-tags__i" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {closing ? (
                  <div className="wb-ent__note">
                    {closing.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}
              </div>

              {f ? (
                <figure className="wb-plate" data-wb="fig">
                  <span className="wb-plate__cord" aria-hidden="true" />
                  <span className="wb-plate__mask">
                    <img
                      className="wb-plate__img"
                      src={`/media/stills/${f.id}-960.webp`}
                      width={f.w}
                      height={f.h}
                      loading="lazy"
                      decoding="async"
                      alt={f.alt}
                    />
                  </span>
                  <figcaption className="wb-plate__cap">
                    <span className="wb-lbl__what">{f.shows}</span>
                    <span className="wb-lbl__where">{f.event}</span>
                  </figcaption>
                </figure>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
