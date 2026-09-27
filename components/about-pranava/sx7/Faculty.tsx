import type { CSSProperties } from "react";
import { about } from "@/content/pranava";
import {
  LINE_Y,
  PH,
  PHOTOS,
  PIECES,
  PW,
  STAGE_H,
  STAGE_W,
  layout,
  photoOf,
  src,
  srcSet,
  type Photo,
  type Piece,
} from "./prints";
import { Eyebrow } from "@/components/about-pranava/parts";
import { Sx7Motion } from "./Motion";

/**
 * 07 · FACULTY — "Eye level". FINAL: base sx7d; the register mark is the page's own shared
 * object (as sx7c used it), and the provenance is a sentence-case line (as sx7a set it).
 *
 * WHAT HAPPENS. Seven standpoints in one workshop — seven photographs, each taken from
 * wherever someone was standing — arrive cut into eighteen equal prints, and each
 * standpoint's prints come up the page tilted together at that standpoint's own angle. As
 * the reader scrolls, a hairline draws across the hall at eye level and every standpoint
 * turns about its OWN vanishing point until its horizon lies on that line. Level, the
 * eighteen prints are one room: a joiner of the Prabhava hall in which feet climb the wall
 * along the whole top edge, the floor runs unbroken along the bottom, five different
 * people are teaching at eye level, and three of the prints are still moving.
 *
 * WHY THIS CONTENT BEHAVES THIS WAY. The client's sentences say Praṇava brings together
 * teachers with different experience, and that each "brings their own experience while
 * working within the larger intention". That is a description of a joiner. Every print keeps
 * its own point of view — its own vanishing point, its own moment, its own teacher — and
 * the picture exists only because they share an eye level. Hockney, of the form: "Each
 * photograph has a vanishing point… That's how we see." The client has supplied no names,
 * so the section does not show teachers; it shows teaching, from many standpoints at once.
 *
 * THE TYPE STANDS IN THE ROOM'S OWN GAPS. Laid to one line, the prints make a staircase
 * silhouette rising left to right, and the two bays it leaves — top left, bottom right — are
 * where the lead and the first sentence are set, in the stage's own units (cqw), so the
 * interlock holds at every desktop width. The second sentence, the one the joiner
 * illustrates, closes the section beneath it.
 *
 * NOTHING HERE IS A PLACEHOLDER. No card, outline, silhouette or empty frame. When names
 * arrive they are a new thing, not a filling-in of this one.
 *
 * FINISHED BY DEFAULT. Every print's resting angle is its CSS default; the scroll only
 * writes one custom property (`--sx7-p`) that starts the pass tilted. With no JavaScript,
 * or under reduced motion, the room is simply level — which is still the idea.
 */

const pct = (v: number) => `${+v.toFixed(4)}%`;

/** every piece of one photo must pick the same srcset candidate, so one `sizes` per photo */
function sizesFor(ph: Photo) {
  const phone = Math.round(ph.S * 9.4); // the phone stage is a 940px panorama
  const cap = Math.round(ph.S * 18.8); // the stage caps at 1880
  const vw = +(ph.S * 0.93).toFixed(1);
  return `(max-width: 899px) ${phone}px, (min-width: 2030px) ${cap}px, ${vw}vw`;
}

function PieceEl({ pc }: { pc: Piece }) {
  const ph = photoOf(pc.photo);
  const L = layout(pc);
  const style = {
    left: pct((L.left / STAGE_W) * 100),
    top: pct((L.top / STAGE_H) * 100),
    width: pct((PW / STAGE_W) * 100),
    height: pct((PH / STAGE_H) * 100),
    zIndex: pc.z ?? 1,
    "--a0": ph.a0,
    "--af": ph.af,
    "--s": ph.s,
    "--ox": pct(L.ox * 100),
    "--oy": pct(L.oy * 100),
  } as CSSProperties;
  const box = {
    left: pct(L.imgL * 100),
    top: pct(L.imgT * 100),
    width: pct(L.imgW * 100),
    height: pct(L.imgH * 100),
  } as CSSProperties;
  const alt = pc.lead ? ph.alt : "";

  return (
    <div
      className={`sx7-piece${pc.moving ? " sx7-piece--moving" : ""}`}
      style={style}
      data-photo={ph.id}
    >
      {ph.kind === "still" ? (
        <img
          src={src(ph, 960)}
          srcSet={srcSet(ph)}
          sizes={sizesFor(ph)}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={box}
        />
      ) : (
        /* The <img> IS the poster and is never removed. The <video> carries no `poster`
           attribute: a poster is fetched even when `src` is never set, which cost this
           site 948 KB on every device once already. */
        <picture>
          <source type="image/avif" srcSet={`/media/posters/${ph.id}.avif`} />
          <img
            src={src(ph)}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={box}
          />
        </picture>
      )}
      {pc.moving ? (
        <video
          className="sx7-film"
          data-src={`/media/clips/${ph.id}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          style={box}
        />
      ) : null}
    </div>
  );
}

export function Sx7Faculty() {
  const { lead, body } = about.faculty;
  const byZ = [...PIECES].sort((a, b) => (a.z ?? 1) - (b.z ?? 1));

  return (
    <section className="sx7-faculty" id="sx7-faculty">
      <div className="sx7-frame">
        {/* The track is the held room's containing block: it ends with the hold, so the
            room lets go before the closing sentence arrives rather than covering it. */}
        <div className="sx7-track">
          <div className="sx7-room">
            <div className="sx7-head">
              <Eyebrow n="07" dark>
                Faculty
              </Eyebrow>
              <p className="sx7-lead">{lead}</p>
            </div>

            {/* On a phone the room is a panorama panned with a thumb: native overflow
              scrolling, so it needs no script and survives reduced motion. A scrollable
              region must be reachable by keyboard, hence tabIndex and a name. */}
            <div
              className="sx7-pan"
              tabIndex={0}
              role="region"
              aria-label="Eighteen prints from seven photographs of one workshop, laid to one eye level as a single room"
            >
              <div className="sx7-stage">
                {byZ.map((pc) => (
                  <PieceEl key={`${pc.photo}-${pc.c}-${pc.r}`} pc={pc} />
                ))}
                <span
                  className="sx7-line"
                  aria-hidden="true"
                  style={
                    { top: pct((LINE_Y / STAGE_H) * 100) } as CSSProperties
                  }
                />
                {PHOTOS.map((ph) => (
                  <span
                    key={ph.id}
                    className="sx7-pin"
                    aria-hidden="true"
                    style={
                      {
                        left: pct((ph.px / STAGE_W) * 100),
                        top: pct((LINE_Y / STAGE_H) * 100),
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
            {/* phones only: the room is wider than the screen and says so */}
            <p className="sx7-hint" aria-hidden="true">
              <span>←</span> Pan along the room <span>→</span>
            </p>

            <p className="sx7-first">{body[0]}</p>
          </div>

          {/* Where the room is held while it levels. Zero height unless Motion.tsx has
            measured that the whole room fits the screen and motion is allowed. */}
          <div className="sx7-hold" aria-hidden="true" />
        </div>

        <div className="sx7-close">
          <p className="sx7-second">{body[1]}</p>
          <p className="sx7-cap">
            <span>
              Photographs and films from Prabhava, a five-day Hatha-Iyengar immersion,{" "}
              {"2–6 October 2023."}
            </span>
          </p>
        </div>
      </div>
      <Sx7Motion />
    </section>
  );
}
