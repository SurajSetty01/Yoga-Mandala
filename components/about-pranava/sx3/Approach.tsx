import type { CSSProperties, ReactNode } from "react";
import { about } from "@/content/pranava";
import { Eyebrow } from "@/components/about-pranava/parts";
import {
  PLATES,
  clipSrc,
  posterAvif,
  posterJpg,
  stillSet,
  stillSrc,
  type Plate,
} from "./frames";
import { Sx3Motion } from "./Motion";

/**
 * PRAṆAVA · ABOUT · §03 OUR APPROACH. The final section, styled by styles/sec-sx3.css.
 *
 * Built on concept sx3a (the book, below, unchanged in substance), with two grafts:
 *   · from sx3c, each clause of the lead sets the term it names in forest italic, so the
 *     three spreads read as the lead's own three words and Transmission as the one it omits;
 *   · from sx3b, a play/pause button on every clip (WCAG 2.2.2), which is also how a reader
 *     with reduced motion, or on a phone where nothing attaches by itself, starts one.
 * The section mounts its own client island (Sx3Motion), so a page needs only <OurApproach />.
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
 * WHERE THE MOVE CAME FROM (see NOTES in sec-sx3.css for the full research record)
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
 * Sx3Motion is the only client code, and every value it writes has a finished default in
 * the stylesheet. With JavaScript off, or under reduced motion, the gutters are already
 * at their final widths, the Transmission frame is already whole, and each clip is a still.
 */

type Spread = {
  key: "tradition" | "practice" | "inquiry";
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
    key: "tradition",
    verso: PLATES.tradVerso,
    recto: PLATES.tradRecto,
    vAr: [2 / 3, 2 / 3],
    rAr: [3 / 2, 3 / 4],
    vSizes: "(max-width: 719px) 42vw, min(43vh, 28vw, 427px)",
    rSizes: "(max-width: 719px) 60vw, min(48vh, 32vw, 480px)",
  },
  {
    key: "practice",
    verso: PLATES.pracVerso,
    recto: PLATES.pracRecto,
    vAr: [3 / 4, 3 / 4],
    rAr: [2 / 3, 9 / 16],
    vSizes: "(max-width: 719px) 33vw, min(30vh, 20vw, 298px)",
  },
  {
    key: "inquiry",
    verso: PLATES.inqVerso,
    recto: PLATES.inqRecto,
    vAr: [4 / 3, 3 / 4],
    rAr: [3 / 4, 3 / 4],
    vSizes: "(max-width: 719px) 80vw, min(77vh, 51vw, 768px)",
  },
];

/** Revealed by Sx3Motion when a clip can play at all; with no JavaScript there is no clip. */
function Toggle() {
  return (
    <button
      className="sx3-toggle"
      type="button"
      hidden
      aria-label="Play the clip"
    >
      <svg className="sx3-toggle__play" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M6 4.5v11l9-5.5z" />
      </svg>
      <svg className="sx3-toggle__pause" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.5 4.5h3v11h-3zM11.5 4.5h3v11h-3z" />
      </svg>
    </button>
  );
}

/** "Rooted in tradition." -> "Rooted in " + <em>tradition</em> + "." cut at the named term's
 *  own position, so the pieces concatenate back to the client's clause exactly. */
function Clause({ clause, names }: { clause: string; names: string[] }) {
  const lower = clause.toLowerCase();
  const name = names.find((n) => lower.includes(n.toLowerCase()));
  if (!name) return <>{clause}</>;
  const at = lower.indexOf(name.toLowerCase());
  return (
    <>
      {clause.slice(0, at)}
      <em className="sx3-lead__term">{clause.slice(at, at + name.length)}</em>
      {clause.slice(at + name.length)}
    </>
  );
}

function Photo({
  plate,
  ar,
  side,
  sizes,
}: {
  plate: Plate;
  ar: [number, number];
  side: "verso" | "recto";
  sizes?: string | undefined;
}) {
  const style = {
    "--ar": ar[0].toFixed(4),
    "--ar-n": ar[1].toFixed(4),
    "--op": plate.pos,
    "--op-n": plate.posN,
  } as CSSProperties;

  let inner: ReactNode;
  if (plate.kind === "still") {
    inner = (
      <img
        className="sx3-plate__img"
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
       preload="none", NO poster attribute and no src: Sx3Motion attaches `data-src`
       on approach and removes it again when the frame is well past. */
    inner = (
      <>
        <picture>
          <source type="image/avif" srcSet={posterAvif(plate)} />
          <img
            className="sx3-plate__img"
            src={posterJpg(plate)}
            alt={plate.alt}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <video
          className="sx3-plate__film"
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
    <figure
      className={`sx3-plate sx3-plate--${side}`}
      style={style}
      data-sx={side}
    >
      <div className="sx3-plate__ap">{inner}</div>
      {plate.kind === "clip" ? <Toggle /> : null}
    </figure>
  );
}

export function OurApproach() {
  const { lead, items } = about.approach;
  /* The lead split at its OWN full stops with a lookbehind, so the three spans
     concatenate back to the client's sentence character for character. */
  const lines = lead.split(/(?<=\.)\s+/);
  const byName = (n: string) => {
    const it = items.find((i) => i.name === n);
    if (!it) throw new Error(`about.approach has no item named ${n}`);
    return it;
  };
  const named: Record<Spread["key"], (typeof items)[number]> = {
    tradition: byName("Tradition"),
    practice: byName("Practice"),
    inquiry: byName("Inquiry"),
  };
  const transmission = byName("Transmission");
  const T = PLATES.trans;

  return (
    <section className="sx3-sec" id="apr-approach" aria-labelledby="sx3-h">
      <div className="sx3-rail">
        {/* THE BOOK. One spine down the middle, from the opening to the fourth frame. */}
        <div className="sx3-book">
          <span className="sx3-spine" aria-hidden="true" />

          {/* THE OPENING. A chapter opens on the recto and the verso is left blank, as Evans
            left every verso blank. The register mark stands alone on the verso. */}
          <header className="sx3-open">
            <div className="sx3-open__verso" id="sx3-h">
              <Eyebrow n="03">Our approach</Eyebrow>
            </div>
            <p className="sx3-lead" data-sx="words">
              {lines.map((l) => (
                <span className="sx3-lead__line" key={l}>
                  <Clause clause={l} names={items.map((i) => i.name)} />{" "}
                </span>
              ))}
            </p>
          </header>

          {/* three spreads whose gutters narrow */}
          {SPREADS.map((s) => {
            const it = named[s.key];
            const id = `sx3-n-${s.key}`;
            return (
              <article
                className={`sx3-spread sx3-spread--${s.key}`}
                aria-labelledby={id}
                key={s.key}
              >
                <div className="sx3-pair">
                  <Photo
                    plate={s.verso}
                    ar={s.vAr}
                    side="verso"
                    sizes={s.vSizes}
                  />
                  <Photo
                    plate={s.recto}
                    ar={s.rAr}
                    side="recto"
                    sizes={s.rSizes}
                  />
                </div>
                <div className="sx3-words" data-sx="words">
                  <h3 className="sx3-name" id={id}>
                    {it.name}
                  </h3>
                  <p className="sx3-body">{it.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* TRANSMISSION. Not a pair: one frame laid across the spine. */}
        <article
          className="sx3-spread sx3-spread--transmission"
          aria-labelledby="sx3-n-transmission"
        >
          <figure
            className="sx3-cross"
            data-sx="cross"
            style={{ "--op": T.pos, "--op-n": T.posN } as CSSProperties}
          >
            <div className="sx3-cross__ap">
              <picture>
                <source type="image/avif" srcSet={posterAvif(T)} />
                <img
                  className="sx3-plate__img"
                  src={posterJpg(T)}
                  alt={T.alt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <video
                className="sx3-plate__film"
                data-src={clipSrc(T)}
                muted
                playsInline
                loop
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              />
              {/* the last of the gutter. Closed (scaleX 0) unless Sx3Motion opens it. */}
              <span className="sx3-seam" aria-hidden="true" />
            </div>
            <Toggle />
          </figure>
          <div className="sx3-words sx3-words--transmission" data-sx="words">
            <h3 className="sx3-name" id="sx3-n-transmission">
              {transmission.name}
            </h3>
            <p className="sx3-body">{transmission.body}</p>
          </div>
        </article>
      </div>
      <Sx3Motion />
    </section>
  );
}
