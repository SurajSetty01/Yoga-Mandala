import { within } from '@/content/copy';

/**
 * COMMUNITY INITIATIVES — deliberately NOT a fifth room.
 *
 * Four enclosed places, each covering the last, is a strong mechanic exactly four times.
 * Run it eight times and it stops being a move and becomes a template — which is the failure
 * this whole rebuild exists to avoid. So the page comes OUT of the rooms here: one flat,
 * open, brightly-lit plane where all four initiatives are visible at once, no staging, no
 * entrance, no full-viewport dwell. The change of kind is the point.
 *
 * On the existing /within/ page this section is the one part the client thought "might be
 * good", and one thing in it genuinely is: the long item lists set as a FIELD OF PHRASES
 * rather than a column. That is the only device on that page that stops a list reading as a
 * list, and it absorbs a twelve-word item ("Other relevant opportunities for Yoga teachers
 * and serious practitioners") without breaking its own rhythm. It is kept.
 *
 * What is not kept: the container. Every entry there is a beige card with a small rectangular
 * photograph on the left and a heading and paragraph on the right — the literal shape the
 * client rejected — and Sangha and Pranava Vaakya sit as two equal columns of body copy,
 * indistinguishable from each other, with the one fact that MUST land (Pranava Vaakya is a
 * Praṇava offering, not Yoga Mandala's own) reduced to an 11px eyebrow.
 *
 * So: four notices of four different sizes hung at four different heights on one wall, and
 * the Praṇava one is on a different material entirely — reversed out, teal-ruled, its
 * attribution set at the same size as its own body copy. Different origin, different paper.
 * That is the labelling, not a footnote.
 *
 * Praṇava is set in Inter, never Fraunces: Fraunces carries no precomposed ṇ/ā/ī and
 * decomposes them, which drops the marks. See design/DESIGN-SYSTEM.md §1.
 */

const [LEARNING, BULLETIN, SANGHA, VAAKYA] = within.initiatives.entries;

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="within-a__chips">
      {items.map((it) => (
        <li className="within-a__chip" key={it}>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Board() {
  const learning = LEARNING!;
  const bulletin = BULLETIN!;
  const sangha = SANGHA!;
  const vaakya = VAAKYA!;

  return (
    <section className="within-a__track within-a__track--board" aria-labelledby="within-a-init-h" data-track>
      <div className="within-a__wall">
        {/* the wall itself: a photograph dissolved into the warm ground so it is a surface
            the notices are hung on, not a picture printed beside them */}
        <div className="within-a__wall-img" data-par="4">
          <img
            src="/media/stills/p13-img_0513-1920.webp"
            srcSet="/media/stills/p13-img_0513-960.webp 960w, /media/stills/p13-img_0513-1920.webp 1920w, /media/stills/p13-img_0513-2560.webp 2560w"
            sizes="100vw"
            loading="lazy"
            decoding="async"
            alt="A line of students holding downward-facing dog on mats laid in rows across a studio floor."
          />
        </div>

        <div className="within-a__wall-in">
          <div className="within-a__init-head" data-wa="up">
            <h2 className="within-a__init-h" id="within-a-init-h">
              {within.initiatives.heading}
            </h2>
            <p className="within-a__init-lead">{within.initiatives.lead}</p>
          </div>

          <ul className="within-a__notices">
            <li className="within-a__notice within-a__notice--a" data-wa="up">
              <h3 className="within-a__notice-h">{learning.name}</h3>
              {learning.lines.map((l) => (
                <p className="within-a__notice-p" key={l}>
                  {l}
                </p>
              ))}
              {learning.listLead ? <p className="within-a__cue">{learning.listLead}</p> : null}
              <Chips items={learning.items} />
            </li>

            <li className="within-a__notice within-a__notice--b" data-wa="up">
              <h3 className="within-a__notice-h">{sangha.name}</h3>
              {sangha.lines.map((l) => (
                <p className="within-a__notice-say" key={l}>
                  {l}
                </p>
              ))}
            </li>

            <li className="within-a__notice within-a__notice--c" data-wa="up">
              <h3 className="within-a__notice-h">{bulletin.name}</h3>
              {bulletin.lines.map((l) => (
                <p className="within-a__notice-p" key={l}>
                  {l}
                </p>
              ))}
              {bulletin.listLead ? <p className="within-a__cue">{bulletin.listLead}</p> : null}
              <Chips items={bulletin.items} />
              <div className="within-a__note">
                {bulletin.closing.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </li>

            <li className="within-a__notice within-a__notice--d" data-wa="up">
              <p className="within-a__from">
                A <span className="within-a__pn">Praṇava</span> offering, surfaced within Yoga
                Mandala
              </p>
              <h3 className="within-a__notice-h">{vaakya.name}</h3>
              {vaakya.lines.map((l) => (
                <p className="within-a__notice-say" key={l}>
                  {l}
                </p>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
