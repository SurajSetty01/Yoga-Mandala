import { within } from '@/content/copy';
import { PILLAR_FRAMES, type Frame } from './frames';

/**
 * 01 · 02 · 03 — CONNECT, LEARN, COLLABORATE.
 *
 * The premise of this page is that none of these twenty-five phrases is a promise. Each names
 * something that has already happened in front of a camera, so the page shows the room rather
 * than listing the activity.
 *
 * The instrument: an ARCH — a tall aperture with a domed head, alternating sides down the
 * page, holding a silent loop that drifts inside it as the reader passes. The pillar's items
 * are not bullets beside it and not a caption under it; they are a run of dark chips that
 * STRADDLE the aperture's inner edge, half on the photograph and half on the paper. The chip
 * carries its own ground — the navigation pill's material — so one material is legible over
 * both, which is the only thing that makes the straddle possible at all. See
 * design/DESIGN-SYSTEM.md §1: a label on a photograph gets a ground, not a gradient.
 *
 * That is the whole idea in one sentence: the list is pinned to the evidence.
 *
 * Under the frame is a wall label — what is in the picture, then the day it was shot. It is
 * always visible. Provenance is the argument, so hiding it behind a hover would both weaken
 * the page and break the no-hover-only rule at once.
 *
 * Everything here is a server component. The loops are attached by the one client island;
 * without JavaScript, or under prefers-reduced-motion, every frame is the poster <img> that
 * is already in the HTML and nothing is missing.
 */

function Aperture({ f, eager }: { f: Frame; eager?: boolean }) {
  return (
    <span className="wb-fig__mask" data-drift>
      <picture>
        <source type="image/avif" srcSet={`/media/posters/${f.id}.avif`} />
        <img
          className="wb-fig__img"
          src={`/media/posters/${f.id}.jpg`}
          width={f.w}
          height={f.h}
          style={{ objectPosition: f.pos }}
          decoding="async"
          {...(eager ? {} : { loading: 'lazy' as const })}
          alt={f.alt}
        />
      </picture>
      {/*
        NO `poster` ATTRIBUTE, deliberately. The <img> above is never removed and this video
        stays at opacity 0 until it reports it is playing, so a poster would never be seen —
        but it would still be downloaded. Three of them cost 948 KB on every device on this
        site once already; the phone went from 1,777 KB to 161 KB when they came off.
      */}
      {f.motion ? (
        <video
          className="wb-fig__vid"
          muted
          playsInline
          loop
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
          data-src={`/media/clips/${f.id}.mp4`}
        />
      ) : null}
    </span>
  );
}

export function Chips({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`wb-chips ${className}`.trim()}>
      {items.map((item, n) => (
        <li
          className="wb-chip"
          data-wb="chip"
          style={{ '--n': n, '--d': `${90 + n * 70}ms` } as React.CSSProperties}
          key={item}
        >
          <span className="wb-chip__in">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function WallLabel({ f }: { f: Frame }) {
  return (
    <figcaption className="wb-lbl">
      <span className="wb-lbl__what">{f.shows}</span>
      <span className="wb-lbl__where">{f.event}</span>
    </figcaption>
  );
}

export function Pillars() {
  const names = ['Connect', 'Learn', 'Collaborate'] as const;

  return (
    <>
      {within.pillars.slice(0, 3).map((p, i) => {
        const f = PILLAR_FRAMES[names[i]!]!;
        const [first, ...rest] = p.lines;

        return (
          <section
            className="wb-p"
            id={`wb-${p.index}`}
            data-side={i % 2 === 0 ? 'right' : 'left'}
            aria-labelledby={`wb-h-${p.index}`}
            key={p.index}
          >
            <div className="wb-p__in">
              <div className="wb-p__say" data-wb="up">
                <p className="wb-p__no" aria-hidden="true">
                  {p.index}
                </p>
                <h2 className="wb-p__name" id={`wb-h-${p.index}`}>
                  <span className="sr">{`${p.index}. `}</span>
                  {p.name}
                </h2>
                {first ? <p className="wb-p__first">{first}</p> : null}
                {rest.map((line) => (
                  <p className="wb-p__line" key={line}>
                    {line}
                  </p>
                ))}
                {p.listLead ? <p className="wb-p__lead">{p.listLead}</p> : null}
              </div>

              <figure className="wb-fig" data-wb="fig">
                <Aperture f={f} eager={i === 0} />
                <Chips items={p.items} />
                <WallLabel f={f} />
              </figure>
            </div>
          </section>
        );
      })}
    </>
  );
}
