import { within } from '@/content/copy';
import { PILLAR_FRAMES } from './frames';

/**
 * THE CONTENTS PAGE, MADE OF EVIDENCE.
 *
 * The four ideas are named here as four narrow windows cut through the page — one per pillar,
 * each showing the frame that pillar's section will open into. The windows hang off the
 * bottom of the dark band and cross the horizon into the paper below, so the handover to
 * section 01 happens *through* the pictures rather than at a seam beneath them. That crossing
 * is the same move the approved hero makes with its 46svh overlap.
 *
 * They are anchors, not decoration: each one jumps to its pillar. That gives the page a real
 * table of contents that works on touch and on a keyboard, with no hover affordance anywhere.
 *
 * The eyebrow is the page's whole argument in one line, and it invents nothing — those are
 * the three days this archive was shot, read out of the audit. See ./frames.ts.
 */
export function Masthead() {
  const names = ['Connect', 'Learn', 'Collaborate', 'Share'] as const;

  return (
    <header className="wb-mast">
      <div className="wb-mast__type">
        <p className="wb-mast__dates">Recorded 13 April · 27 April · 29 June 2025</p>
        <h1 className="wb-mast__h">{within.title}</h1>
        <p className="wb-mast__lead">{within.lead}</p>
      </div>

      <ol className="wb-wins">
        {within.pillars.map((p, i) => {
          const f = PILLAR_FRAMES[names[i]!]!;
          return (
            <li className="wb-wins__i" key={p.index} style={{ '--k': [0.93, 1, 0.85, 0.72][i] } as React.CSSProperties}>
              <a className="wb-win" href={`#wb-${p.index}`}>
                <span className="wb-win__mask">
                  <picture>
                    <source type="image/avif" srcSet={`/media/posters/${f.id}.avif`} />
                    <img
                      className="wb-win__img"
                      src={`/media/posters/${f.id}.jpg`}
                      width={f.w}
                      height={f.h}
                      style={{ objectPosition: f.posNarrow ?? f.pos }}
                      decoding="async"
                      {...(i === 0 ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
                      alt={f.alt}
                    />
                  </picture>
                </span>
                <span className="wb-win__lbl">
                  <span className="wb-win__no">{p.index}</span>
                  <span className="wb-win__name">{p.name}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </header>
  );
}
