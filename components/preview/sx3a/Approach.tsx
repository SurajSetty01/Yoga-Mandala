import type { CSSProperties, ReactNode } from 'react';
import { about } from '@/content/pranava';
import { Eyebrow } from '@/components/about-pranava/parts';
import { PLATES, clipSrc, posterAvif, posterJpg, stillSet, stillSrc, type Plate } from './frames';

/**
 * PRAṆAVA · §03 OUR APPROACH, concept A. PHOTOGRAPHY LEADS.
 *
 * THE EVENT
 *   An open book whose gutter closes as you read. Tradition, Practice and Inquiry are each
 *   argued by two photographs facing each other across a spine. With every spread the two
 *   sides come closer: a wide gap, then a narrow one, then almost none, with the pictures
 *   converging in size as well. Transmission is the one photograph laid ACROSS the spine.
 *   The spine is placed where the student ends and the teacher begins, so the teacher's
 *   hands cross the gutter. As the frame reaches the middle of the screen, the last
 *   sliver of gutter inside it closes.
 *
 * WHERE THE MOVE CAME FROM (see NOTES in preview-sx3a.css for the full research record)
 *   · Walker Evans, American Photographs (1938). One plate per spread, meant to be read
 *     in sequence, with meaning made by what faces what. The pairs here are built that way:
 *     each one says something neither picture says alone.
 *   · Alexey Brodovitch, Harper's Bazaar. The single picture BLED ACROSS THE GUTTER of a
 *     double-page spread, and the same pose repeated across a spread to make time
 *     visible. Transmission is the bled spread; Tradition's recto is the repeated pose.
 *   · The LIFE photo-essay formula, which casts pictures in roles: overall, interaction,
 *     sequence, and the "signature image" that holds every element of the story in one
 *     frame. Transmission is the signature image. The three pairs are the others.
 *   · The look-in rule of editorial layout: subjects face INTO the spread, never off the
 *     page. Every verso here looks toward the gutter.
 *
 * THE CONTENT'S OWN ASYMMETRY, KEPT. The lead names three things and the list has four. So
 * three of the items are pairs and one is not. There are never four of anything side by
 * side. Nothing here is a numbered panel, and the Transmission frame is the LARGEST
 * picture in the section at every width. It is full-bleed below 720px, and nothing ever
 * crosses its subject. Its crop is anchored to the top of the clip so both people are
 * whole to the knee.
 *
 * Server component: every word, every photograph and every alt is in the static HTML.
 * Sx3aMotion is the only client code, and every value it writes has a finished default in
 * the stylesheet. With JavaScript off, or under reduced motion, the gutters are already
 * at their final widths, the Transmission frame is already whole, and each clip is a still.
 */

type Spread = {
  key: 'tradition' | 'practice' | 'inquiry';
  verso: Plate;
  recto: Plate;
  /** the verso slot's aspect (w/h) at 720px and up, then below it */
  vAr: [number, number];
  rAr: [number, number];
  /** `sizes` for the stills: the width the CROPPED slot covers, not the slot's own */
  vSizes?: string;
  rSizes?: string;
};

const SPREADS: Spread[] = [
  {
    key: 'tradition',
    verso: PLATES.tradVerso,
    recto: PLATES.tradRecto,
    vAr: [2 / 3, 2 / 3],
    rAr: [3 / 2, 3 / 4],
    vSizes: '(max-width: 719px) 42vw, min(43vh, 28vw, 427px)',
    rSizes: '(max-width: 719px) 60vw, min(48vh, 32vw, 480px)',
  },
  {
    key: 'practice',
    verso: PLATES.pracVerso,
    recto: PLATES.pracRecto,
    vAr: [3 / 4, 3 / 4],
    rAr: [2 / 3, 9 / 16],
    vSizes: '(max-width: 719px) 33vw, min(30vh, 20vw, 298px)',
  },
  {
    key: 'inquiry',
    verso: PLATES.inqVerso,
    recto: PLATES.inqRecto,
    vAr: [4 / 3, 3 / 4],
    rAr: [3 / 4, 3 / 4],
    vSizes: '(max-width: 719px) 80vw, min(77vh, 51vw, 768px)',
  },
];

function Photo({
  plate,
  ar,
  side,
  sizes,
}: {
  plate: Plate;
  ar: [number, number];
  side: 'verso' | 'recto';
  sizes?: string | undefined;
}) {
  const style = {
    '--ar': ar[0].toFixed(4),
    '--ar-n': ar[1].toFixed(4),
    '--op': plate.pos,
    '--op-n': plate.posN,
  } as CSSProperties;

  let inner: ReactNode;
  if (plate.kind === 'still') {
    inner = (
      <img
        className="sx3a-plate__img"
        src={stillSrc(plate)}
        srcSet={stillSet(plate)}
        sizes={sizes}
        alt={plate.alt}
        loading="lazy"
        decoding="async"
      />
    );
  } else {
    /* The <img> is the poster and is never removed. The <video> above it has
       preload="none", NO poster attribute and no src: Sx3aMotion attaches `data-src`
       on approach and removes it again when the frame is well past. */
    inner = (
      <>
        <picture>
          <source type="image/avif" srcSet={posterAvif(plate)} />
          <img
            className="sx3a-plate__img"
            src={posterJpg(plate)}
            alt={plate.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <video
          className="sx3a-plate__film"
          data-src={clipSrc(plate)}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      </>
    );
  }

  return (
    <figure className={`sx3a-plate sx3a-plate--${side}`} style={style} data-sx={side}>
      <div className="sx3a-plate__ap">{inner}</div>
    </figure>
  );
}

export function Approach() {
  const { lead, items } = about.approach;
  /* The lead split at its OWN full stops with a lookbehind, so the three spans
     concatenate back to the client's sentence character for character. */
  const lines = lead.split(/(?<=\.)\s+/);
  const byName = (n: string) => {
    const it = items.find((i) => i.name === n);
    if (!it) throw new Error(`about.approach has no item named ${n}`);
    return it;
  };
  const named: Record<Spread['key'], (typeof items)[number]> = {
    tradition: byName('Tradition'),
    practice: byName('Practice'),
    inquiry: byName('Inquiry'),
  };
  const transmission = byName('Transmission');
  const T = PLATES.trans;

  return (
    <section className="sx3a" id="sx3a-approach" aria-labelledby="sx3a-h">
      <div className="sx3a-rail">
        {/* THE BOOK. One spine down the middle, from the opening to the fourth frame. */}
        <div className="sx3a-book">
          <span className="sx3a-spine" aria-hidden="true" />

          {/* THE OPENING. A chapter opens on the recto and the verso is left blank, as Evans
            left every verso blank. The register mark stands alone on the verso. */}
          <header className="sx3a-open">
            <div className="sx3a-open__verso" id="sx3a-h">
              <Eyebrow n="03">Our approach</Eyebrow>
            </div>
            <p className="sx3a-lead" data-sx="words">
              {lines.map((l) => (
                <span className="sx3a-lead__line" key={l}>
                  {l}{' '}
                </span>
              ))}
            </p>
          </header>

          {/* three spreads whose gutters narrow */}
          {SPREADS.map((s) => {
            const it = named[s.key];
            const id = `sx3a-n-${s.key}`;
            return (
              <article
                className={`sx3a-spread sx3a-spread--${s.key}`}
                aria-labelledby={id}
                key={s.key}
              >
                <div className="sx3a-pair">
                  <Photo plate={s.verso} ar={s.vAr} side="verso" sizes={s.vSizes} />
                  <Photo plate={s.recto} ar={s.rAr} side="recto" sizes={s.rSizes} />
                </div>
                <div className="sx3a-words" data-sx="words">
                  <h3 className="sx3a-name" id={id}>
                    {it.name}
                  </h3>
                  <p className="sx3a-body">{it.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* TRANSMISSION. Not a pair: one frame laid across the spine. */}
        <article
          className="sx3a-spread sx3a-spread--transmission"
          aria-labelledby="sx3a-n-transmission"
        >
          <figure
            className="sx3a-cross"
            data-sx="cross"
            style={{ '--op': T.pos, '--op-n': T.posN } as CSSProperties}
          >
            <div className="sx3a-cross__ap">
              <picture>
                <source type="image/avif" srcSet={posterAvif(T)} />
                <img
                  className="sx3a-plate__img"
                  src={posterJpg(T)}
                  alt={T.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <video
                className="sx3a-plate__film"
                data-src={clipSrc(T)}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              />
              {/* the last of the gutter. Closed (scaleX 0) unless Sx3aMotion opens it. */}
              <span className="sx3a-seam" aria-hidden="true" />
            </div>
          </figure>
          <div className="sx3a-words sx3a-words--transmission" data-sx="words">
            <h3 className="sx3a-name" id="sx3a-n-transmission">
              {transmission.name}
            </h3>
            <p className="sx3a-body">{transmission.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
