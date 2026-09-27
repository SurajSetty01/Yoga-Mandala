import { about } from '@/content/pranava';

/**
 * PREVIEW · sx3c — "Our approach", set as two leaves of a commented manuscript.
 *
 * WHAT HAPPENS. The first leaf is a text folio in the Sanskrit commentarial layout — the
 * mūla (root text) in the centre of the ruled block, the commentary written into the margins
 * around it. The root is the client's one sentence; the three commentaries are the three
 * things it names. The second leaf has the same rules, the same margins and the same centre —
 * but its root is not a sentence. A tissue lifts off a photograph of a teacher's hand reaching
 * a student's back, and Transmission is written around THAT instead, split across the margins
 * the way a commentary is. Yoga "is not simply information that can be packaged and
 * delivered", so its root on the page is not a line of type.
 *
 * WHERE THE LAYOUT COMES FROM (the research — see the stylesheet for each measurement):
 *  · tri-pāṭha / pañca-pāṭha manuscripts (Jainpedia, "How to read a Jain manuscript"): the
 *    root in the centre, the commentary in the margins — above and below (tri-pāṭha) or on
 *    all four sides (pañca-pāṭha). Desktop is the four-sided form; below 1000px the margins
 *    fold into the three-part form rather than hiding behind a toggle, which is what Tufte
 *    CSS does below 760px and the one thing it gets wrong.
 *  · the text block bounded by DOUBLE vertical rules filled with red, a matching pair of red
 *    discs standing in the margins (D'source layout study; manuscriptevidence.org).
 *  · the folio's title written in its head margin, abridged (Jainpedia) — the register mark.
 *  · the catchword: the first word of the next leaf printed at the foot of this one, so the
 *    reading is handed on. It is the only thing on the first leaf that names Transmission.
 *
 * EVERYTHING IS DERIVED FROM THE CONTENT, NOT RETYPED. The lead is split at its own full
 * stops; each clause is paired with the item whose name it contains; the item that NO clause
 * names is computed, not asserted — it is the one that goes to the second leaf. Change the
 * client's copy and the asymmetry follows it.
 *
 * No client component and no JavaScript. The one motion — the tissue lifting off the plate —
 * is a CSS scroll-driven animation inside `@supports`; every browser without it, every reader
 * with reduced motion and every reader with JavaScript off gets the finished leaves, which ARE
 * the idea. No text is ever moved or faded by scroll.
 */

const { lead, items } = about.approach;

/** The lead at its own full stops: "Rooted in tradition." / "Alive in practice." / … */
const clauses = lead.split(/(?<=\.)\s+/);

const names = (clause: string, name: string) =>
  clause.toLowerCase().includes(name.toLowerCase());

/** The items a clause of the lead names, in the client's order — and the one none does. */
const glossed = items.filter((it) => clauses.some((c) => names(c, it.name)));
const unnamed = items.filter((it) => !glossed.includes(it));
const handed = unnamed[0];

/** Transmission's paragraph at its own full stops, to be written around the plate. */
const handedParts = handed ? handed.body.split(/(?<=\.)\s+/) : [];

const SLOTS = ['a', 'b', 'c'] as const;

/**
 * One clause, set as two lines: the words before the named term, then the term itself in
 * italic with whatever follows it. Split on the term's own position in the client's string,
 * so the two lines concatenate back to the clause character for character.
 */
function Clause({ clause }: { clause: string }) {
  const item = glossed.find((it) => names(clause, it.name));
  if (!item) return <span className="sx3c-line">{clause} </span>;
  const at = clause.toLowerCase().indexOf(item.name.toLowerCase());
  const before = clause.slice(0, at);
  const term = clause.slice(at, at + item.name.length);
  const after = clause.slice(at + item.name.length);
  return (
    <>
      <span className="sx3c-line">{before}</span>
      <span className="sx3c-line sx3c-line--term">
        <em>{term}</em>
        {after}{' '}
      </span>
    </>
  );
}

/**
 * The double rules that run the full height of the leaf, and the pair of discs standing in
 * the margins beside them. Siblings, not parent and child: the rule is drawn by scaling it,
 * and a disc inside it would be squashed into an ellipse on the way.
 */
function Rules() {
  return (
    <>
      <span className="sx3c-rule sx3c-rule--l" aria-hidden="true" />
      <span className="sx3c-rule sx3c-rule--r" aria-hidden="true" />
      <span className="sx3c-disc sx3c-disc--l" aria-hidden="true" />
      <span className="sx3c-disc sx3c-disc--r" aria-hidden="true" />
    </>
  );
}

/**
 * The photograph. `pr-pbh-img_5622`, chosen by looking, not by the manifest: the clearest
 * hands-on correction in the archive — a man's arm extended to a woman's back as she folds
 * forward onto a chair, a second student working behind her. Not used anywhere on the live
 * site. Encoded at 480/960/1920/2560 from a 1920×2560 (3:4) derivative; shown SQUARE at
 * object-position 50% 55%, which is y 352→2272: the teacher's crown to the student's feet,
 * and it takes out the two ceiling fans at the top and the bare tile at the bottom — a crop
 * checked on the rendered pixels at every aspect, because this project has already rejected
 * four frames whose real subject turned out to be a fan, a cooler, a stand or a chair.
 */
const PLATE = {
  id: 'pr-pbh-img_5622',
  widths: [480, 960, 1920, 2560],
  alt: 'A man reaches out to the back of a woman folding forward with her hands on the seat of a folding chair, while a second woman works at a chair behind her.',
};
const plateSrc = (w: number) => `/media/stills/${PLATE.id}-${w}.webp`;

/*
 * `sizes` is written against the plate as MEASURED, not guessed: 235px at 320, 303 at 390,
 * 316 from 414 to 719 (capped), 339 at 768, 373 from ~900 to 1179, 377 at 1180, 460 at
 * 1440, 552 at 2531. Each clause slightly over-states its range, never under.
 */

export function Sx3cApproach() {
  return (
    <section className="sx3c" aria-labelledby="sx3c-title">
      <div className="sx3c-rail">
        {/* ── LEAF I · the text folio. Root in the centre, three commentaries around it. */}
        <div className="sx3c-leaf sx3c-leaf--text">
          <Rules />
          <h2 className="sx3c-mark" id="sx3c-title">
            <span className="sx3c-mark__n">03</span>
            <span className="sx3c-mark__rule" aria-hidden="true" />
            Our approach
          </h2>

          <div className="sx3c-block">
            <p className="sx3c-root">
              {clauses.map((c) => (
                <Clause clause={c} key={c} />
              ))}
            </p>

            {glossed.map((it, i) => (
              <div
                className={`sx3c-gloss sx3c-gloss--${SLOTS[i] ?? 'c'}${i < 2 ? ' sx3c-gloss--onterm' : ''}`}
                key={it.name}
              >
                <h3 className="sx3c-lemma">{it.name}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>

          {handed ? (
            <p className="sx3c-catch" aria-hidden="true">
              {handed.name}
            </p>
          ) : null}
        </div>

        {/* ── LEAF II · the illustrated folio. Same rules, same margins, a picture at the root. */}
        {handed ? (
          <div className="sx3c-leaf sx3c-leaf--plate">
            <Rules />
            <div className="sx3c-block">

              <div className="sx3c-gloss sx3c-gloss--a">
                <h3 className="sx3c-lemma">{handed.name}</h3>
                <p>{handedParts[0]}</p>
              </div>

              <figure className="sx3c-root sx3c-plate">
                <img
                  className="sx3c-plate__img"
                  src={plateSrc(1920)}
                  srcSet={PLATE.widths.map((w) => `${plateSrc(w)} ${w}w`).join(', ')}
                  sizes="(min-width: 1180px) min(34vw, 620px), (min-width: 720px) min(44vw, 380px), min(calc(100vw - 5rem), 316px)"
                  width={1920}
                  height={2560}
                  alt={PLATE.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="sx3c-tissue" aria-hidden="true" />
              </figure>

              <div className="sx3c-gloss sx3c-gloss--b">
                {handedParts.slice(1).map((part) => (
                  <p key={part}>{part}</p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
