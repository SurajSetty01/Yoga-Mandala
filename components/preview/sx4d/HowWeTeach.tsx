import type { CSSProperties } from 'react';
import { about } from '@/content/pranava';
import { PLATES, POST, DAYS, DAY_FULL, Z0, DAY_DEPTH, zOf, stillSrc, type Plate } from './week';

/**
 * §04 HOW WE TEACH — concept D, spatial.
 *
 * THE EVENT. You look into a floor five days deep. It is one immersion - Prabhava, 2-6
 * October 2023 - laid out the way its own camera recorded it: every photograph stands in
 * the row of the day it was taken, the rows run away from you one day at a time, and
 * within a row the frames stand in the order they were shot. Seven practices are flags on
 * seven of those frames. As you scroll you walk the floor: day by day the rows come up to
 * meet you and drop away beneath, until the pictures run out and one flag is left standing
 * on the bare floor beyond the last day - "Continue learning beyond a single course".
 *
 * A certificate is a single sheet. The section answers the opening sentence by being the
 * opposite of a sheet: the same five days, with depth, and a floor that goes on after them.
 *
 * Every position is CSS. The stage exposes `--cam` (how far into the week the reader
 * stands) and each object carries its own world coordinates; the stylesheet projects them.
 * With no JavaScript, or under reduced motion, `--cam` is 0 and the reader gets the whole
 * floor from its front edge, all eight practices legible - the composed state, not a
 * fallback.
 */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** What the floor is. Provenance, not client copy: the certificate in the archive names
    the workshop and its dates, and the files' own capture stamps place each frame. It is
    written once and shown in one of two places — on the wall of a wide stage, or in the
    head on a narrow one (the stylesheet displays exactly one). */
const CAPTION =
  'Prabhava, a five-day Hatha-Iyengar Immersion, 2–6 October 2023. Every photograph stands on the day it was taken.';

function vars(p: Plate, rank: number): Vars {
  return {
    '--x': p.x,
    '--z': zOf(p).toFixed(3),
    '--h': p.h,
    '--w': (p.h * p.ar).toFixed(4),
    '--rank': rank,
  };
}

/** one picture: a still, or a clip's still with its loop laid over it on approach */
function Picture({ p, big }: { p: Plate; big: boolean }) {
  if (p.kind === 'clip') {
    return (
      <>
        <picture>
          <source type="image/avif" srcSet={`/media/posters/${p.id}.avif`} />
          <img
            className="sx4d-img"
            src={`/media/posters/${p.id}.jpg`}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            style={p.pos ? { objectPosition: p.pos } : undefined}
          />
        </picture>
        {p.loops ? (
          <video
            className="sx4d-loop"
            data-src={`/media/clips/${p.id}.mp4`}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : null}
      </>
    );
  }
  return (
    <img
      className="sx4d-img"
      src={stillSrc(p.id, big ? 960 : 480)}
      srcSet={`${stillSrc(p.id, 480)} 480w, ${stillSrc(p.id, 960)} 960w, ${stillSrc(p.id, 1920)} 1920w`}
      sizes={
        big
          ? '(max-aspect-ratio: 4/5) 40vw, 24vw'
          : '(max-aspect-ratio: 4/5) 26vw, 16vw'
      }
      alt={p.alt}
      loading="lazy"
      decoding="async"
      style={p.pos ? { objectPosition: p.pos } : undefined}
    />
  );
}

/** a practice's flag; the index is the client's own order, so nothing is ever missing —
    but if the list were ever shortened, a missing practice draws nothing at all */
function Flag({ n, text }: { n: number; text: string | undefined }) {
  if (!text) return null;
  return (
    <p className="sx4d-tag">
      <span className="sx4d-tag__n" aria-hidden="true">
        {String(n).padStart(2, '0')}
      </span>
      <span className="sx4d-tag__t">{text}</span>
    </p>
  );
}

export function Sx4dHowWeTeach() {
  const t = about.teach;

  /* nearer things paint over farther ones: rank by depth, nearest highest */
  const byDepth = [...PLATES].sort((a, b) => zOf(b) - zOf(a));
  const rankOf = new Map(byDepth.map((p, i) => [p.id, i + 1]));

  const flagged = PLATES.filter((p) => p.practice !== undefined).sort(
    (a, b) => (a.practice ?? 0) - (b.practice ?? 0),
  );
  const crowd = PLATES.filter((p) => p.practice === undefined);

  return (
    <section className="sx4d" aria-labelledby="sx4d-title">
      <div className="sx4d-head">
        <h2 id="sx4d-title" className="sx4d-mark">
          <span className="sx4d-mark__n">04</span>
          <span className="sx4d-mark__rule" aria-hidden="true" />
          How we teach
        </h2>
        <p className="sx4d-lead">{t.lead}</p>
        <p className="sx4d-open">{t.open}</p>
        <p className="sx4d-note">{CAPTION}</p>
      </div>

      <div className="sx4d-track">
        <div className="sx4d-stage" style={{ '--cam': 0, '--camx': 0 } as Vars}>
          <p className="sx4d-prompt" id="sx4d-prompt">
            {t.prompt}
          </p>
          <p className="sx4d-cap">{CAPTION}</p>

          <div className="sx4d-floor" aria-hidden="true" />
          {/* the floor's two edges, meeting on the horizon */}
          <svg className="sx4d-rays" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="50" y1="0" x2="-14" y2="100" />
            <line x1="50" y1="0" x2="114" y2="100" />
          </svg>

          <div className="sx4d-origin">
            <div className="sx4d-days" aria-hidden="true">
              {/* two objects a day: the line lies on the floor, under every frame; its name
                  stands in the depth order, so only a nearer photograph can hide it */}
              {DAYS.map((d, i) => {
                const lineZ = Z0 + i * DAY_DEPTH - 0.12;
                const z = { '--z': lineZ.toFixed(3) } as Vars;
                /* the name paints over every frame behind its line and under every frame
                   in front of it (plates are z-indexed 2 x rank, nearest highest) */
                const behind = PLATES.filter((p) => zOf(p) > lineZ).length;
                return (
                  <span key={d}>
                    <span className="sx4d-day" style={z} />
                    <span
                      className="sx4d-day sx4d-day--name"
                      style={{ ...z, '--drank': 2 * behind + 1 } as Vars}
                    >
                      {d}
                    </span>
                  </span>
                );
              })}
            </div>

            <ol className="sx4d-list" aria-labelledby="sx4d-prompt">
              {flagged.map((p) => {
                const n = (p.practice ?? 0) + 1;
                return (
                  <li
                    key={p.id}
                    className="sx4d-item"
                    style={vars(p, rankOf.get(p.id) ?? 0)}
                    data-z={zOf(p)}
                    data-n={n}
                  >
                    <figure className="sx4d-plate">
                      <Picture p={p} big />
                      <figcaption className="sr">{DAY_FULL[p.day]}</figcaption>
                    </figure>
                    <Flag n={n} text={t.practices[p.practice ?? 0]} />
                  </li>
                );
              })}
              <li
                className="sx4d-item sx4d-item--post"
                style={
                  {
                    '--x': POST.x,
                    '--z': POST.z.toFixed(3),
                    '--h': POST.h,
                    '--w': 0,
                    '--rank': 0,
                  } as Vars
                }
                data-z={POST.z}
                data-n={POST.practice + 1}
              >
                <span className="sx4d-post" aria-hidden="true" />
                <Flag n={POST.practice + 1} text={t.practices[POST.practice]} />
              </li>
            </ol>

            <div className="sx4d-crowd">
              {crowd.map((p) => (
                <figure
                  key={p.id}
                  className="sx4d-plate sx4d-plate--quiet"
                  style={vars(p, rankOf.get(p.id) ?? 0)}
                  data-z={zOf(p)}
                >
                  <Picture p={p} big={false} />
                  <figcaption className="sr">{DAY_FULL[p.day]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sx4d-foot">
        <div className="sx4d-foot__rail">
          <p className="sx4d-close">{t.close}</p>
        </div>
      </div>
    </section>
  );
}
