'use client';

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { quadrantAt, quadrants } from './quadrants';

/**
 * THE TURNING FIGURE.
 *
 * One object, four states. A disc holds a photograph; one quarter of it is lit; a clay arc
 * on the rim marks the same quarter; the hub in the middle never changes, because the
 * community in the middle never changes. Selecting a pillar turns the light and the arc by
 * 90° and swings the text block to the matching corner of the page. Nothing here is a
 * lotus: the mandala is the structure of the content — four ideas of equal weight around
 * one centre, each holding a set of things — not an ornament laid on top of it.
 *
 * SELECTION HAS ONE SOURCE OF TRUTH: scroll position.
 *   · scroll   — the section is a sticky stage inside a four-screen track. Which quarter of
 *                the track the reader is in is which quadrant is lit. There is no wheel or
 *                touch listener, nothing is ever preventDefault-ed, and the reader's scroll
 *                position is written only when they themselves activate a gate.
 *   · pointer  — pressing a gate scrolls to the middle of that quadrant's range, exactly as
 *                an in-page anchor would. The figure then turns because the scroll moved.
 *   · keyboard — ←/→/Home/End inside the tablist do the same. Up and Down are untouched, so
 *                the arrow keys still scroll the page from inside the control.
 * Because all three funnel into one scroll position they cannot disagree, which is the
 * failure mode of a selector that keeps its own index alongside a scroll observer.
 *
 * BELOW 1000px IT IS A DIFFERENT OBJECT, not a smaller one. Four corners do not exist on a
 * phone, and a block of text that swaps under the reader mid-sentence is hostile. So the
 * narrow form keeps the figure as a small sticky compass at the top, stacks all four blocks
 * in normal flow beneath it — each opening on its own disc of photograph — and turns the
 * compass to whichever block is in view. On a phone you do not turn the figure; you walk
 * around it.
 *
 * NO `clip-path` GOES ANYWHERE NEAR AN OBSERVER. There is no IntersectionObserver on this
 * page at all: the track is measured from getBoundingClientRect inside one rAF raised by a
 * passive scroll flag. The disc is masked with `border-radius`, which cannot clip a box to
 * zero area and cannot hide an element from anything.
 */

const COUNT = quadrants.length;

const WIDE = '(min-width: 1000px)';
const isWide = () => matchMedia(WIDE).matches;
const subscribeWide = (onChange: () => void) => {
  const mq = matchMedia(WIDE);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

export function WithinCFigure() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const trackRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const gateRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [active, setActive] = useState(0);

  /* The two layouts are genuinely different objects, so the component has to know which one
     it is in: in the wide layout three of the four blocks are removed from the page and the
     gates are a tablist; in the narrow layout all four blocks are present and the gates are
     an index that scrolls to them.
     Read through useSyncExternalStore rather than an effect, so the server snapshot is
     honestly `false` and the first client render matches it without a mounted flag. */
  const wide = useSyncExternalStore(subscribeWide, isWide, () => false);

  /* ── scroll → active ───────────────────────────────────────────────────────────────
     One passive listener raising a flag; every read and write inside one rAF; no layout is
     written from the handler and nothing but `transform` and `opacity` changes as a result. */
  useEffect(() => {
    let raf = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const track = trackRef.current;
      if (!track) return;

      if (wide) {
        const rect = track.getBoundingClientRect();
        const travel = rect.height - (stickRef.current?.offsetHeight ?? innerHeight);
        if (travel <= 0) return;
        const p = -rect.top / travel;
        setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(p * COUNT))));
        return;
      }

      /* Narrow: the compass reports whichever block is crossing the reading line, a little
         under half way down the viewport and clear of the sticky bar. */
      const line = innerHeight * 0.46;
      let best = 0;
      let bestD = Infinity;
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = r.top > line ? r.top - line : r.bottom < line ? line - r.bottom : 0;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(measure);
    };

    /* the first read goes through the same rAF as every other one, so nothing writes state
       synchronously from inside the effect body */
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [wide]);

  /* ── activation: pointer and keyboard both land here ─────────────────────────────── */
  const goTo = useCallback(
    (i: number) => {
      const behavior: ScrollBehavior = matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
      const track = trackRef.current;

      if (wide && track) {
        const rect = track.getBoundingClientRect();
        const travel = rect.height - (stickRef.current?.offsetHeight ?? innerHeight);
        /* offsetTop is measured against the nearest positioned ancestor — which here is the
           section itself, not the document — so it lands the reader a whole masthead early
           and the figure answers one quadrant behind the press. The rect plus scrollY is
           the only document-absolute number available. */
        const trackTop = rect.top + scrollY;
        scrollTo({ top: trackTop + travel * ((i + 0.5) / COUNT), behavior });
      } else {
        const el = panelRefs.current[i];
        if (!el) return;
        const head = stickRef.current?.offsetHeight ?? 0;
        scrollTo({ top: el.getBoundingClientRect().top + scrollY - head - 18, behavior });
      }
      /* Optimistic, so the figure answers the press at once rather than waiting for a smooth
         scroll to travel; the scroll handler owns it from the next frame on. */
      setActive(i);
    },
    [wide],
  );

  const onGateKey = (e: React.KeyboardEvent) => {
    let next = -1;
    if (e.key === 'ArrowRight') next = (active + 1) % COUNT;
    else if (e.key === 'ArrowLeft') next = (active - 1 + COUNT) % COUNT;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = COUNT - 1;
    if (next < 0) return;
    e.preventDefault();
    goTo(next);
    gateRefs.current[next]?.focus();
  };

  /* Tabs semantics only describe the wide layout, where three panels really are removed.
     Server and first client render are both `false`, so nothing here is a hydration risk. */
  const tabs = wide;
  const turn = { '--turn': `${active * 90}deg` } as React.CSSProperties;

  return (
    <section className="wc-dial" aria-label="The four ideas">
      <div className="wc-dial__track" ref={trackRef}>
        {/* ── the figure and its gates ──────────────────────────────────────────────── */}
        <div className="wc-dial__stick" ref={stickRef}>
          <div className="wc-fig" style={turn}>
            <div className="wc-fig__disc">
              {quadrants.map((q, i) => (
                <img
                  key={q.index}
                  className="wc-fig__img"
                  data-on={i === active ? '' : undefined}
                  src={`/media/stills/${q.img.id}-960.webp`}
                  srcSet={`/media/stills/${q.img.id}-960.webp 960w, /media/stills/${q.img.id}-1920.webp 1920w`}
                  sizes="(min-width: 1000px) 30rem, 3rem"
                  width={q.img.w}
                  height={q.img.h}
                  style={{ objectPosition: q.img.pos }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  alt={q.img.alt}
                />
              ))}
              {/* the lit quarter: one element carrying a fixed conic gradient, turned with a
                  transform. The gradient is never recomputed, only rotated. */}
              <span className="wc-fig__light" aria-hidden="true" />
              {/* the quartering itself never moves. Only the light does. */}
              <span className="wc-fig__cross" aria-hidden="true" />
            </div>

            <svg className="wc-fig__rim" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
              <circle className="wc-fig__ring" cx="100" cy="100" r="96" />
              {/* One quadrant of rim, drawn as a real arc from twelve o'clock to three.
                  A dashed circle cannot do this job: `vector-effect: non-scaling-stroke`
                  measures the dash in rendered pixels rather than viewBox units, so the
                  same dasharray draws one arc at one size and three at another. */}
              <path className="wc-fig__arc" d="M100 4A96 96 0 0 1 196 100" />
            </svg>

            <div className="wc-hub">
              <p className="wc-hub__name">Yoga Mandala</p>
              <p className="wc-hub__count">
                <span className="wc-hub__no">{quadrantAt(active).index}</span>
                <span aria-hidden="true"> / 04</span>
              </p>
            </div>
          </div>

          {/*
            The four gates. On the wide layout they sit on the rim at the diagonals, one at
            the centre of each quadrant; below 1000px they become the numerals of the sticky
            compass. Each carries the navigation pill's own material, so its contrast is a
            constant rather than a function of whatever the photograph is doing beneath it.
          */}
          <div
            className="wc-gates"
            role={tabs ? 'tablist' : undefined}
            aria-label={tabs ? 'The four ideas' : undefined}
            aria-orientation={tabs ? 'horizontal' : undefined}
          >
            {quadrants.map((q, i) => (
              <button
                key={q.index}
                type="button"
                ref={(el) => {
                  gateRefs.current[i] = el;
                }}
                className="wc-gate"
                data-corner={q.corner}
                data-on={i === active ? '' : undefined}
                role={tabs ? 'tab' : undefined}
                aria-selected={tabs ? i === active : undefined}
                aria-controls={`${uid}-p${i}`}
                aria-label={`${q.index} ${q.name}`}
                tabIndex={tabs && i !== active ? -1 : 0}
                onClick={() => goTo(i)}
                onKeyDown={tabs ? onGateKey : undefined}
              >
                <span className="wc-gate__no">{q.index}</span>
                <span className="wc-gate__name">{q.name}</span>
              </button>
            ))}
          </div>

          {/* the caption every picture on this site carries: what it is, small, on its own
              ground rather than on the photograph */}
          <p className="wc-cap">{quadrantAt(active).img.cap}</p>
        </div>

        {/* ── what each quadrant holds ──────────────────────────────────────────────── */}
        <div className="wc-panels">
          {quadrants.map((q, i) => (
            <div
              key={q.index}
              id={`${uid}-p${i}`}
              className="wc-panel"
              data-corner={q.corner}
              data-on={i === active ? '' : undefined}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              role={tabs ? 'tabpanel' : undefined}
              tabIndex={tabs ? 0 : undefined}
              hidden={tabs && i !== active}
            >
              {/* Narrow only. The wide layout has one disc that turns; the narrow layout has
                  four the reader walks past. Same four files either way, so this costs no
                  bytes. */}
              <figure className="wc-panel__fig" aria-hidden="true">
                <img
                  src={`/media/stills/${q.img.id}-960.webp`}
                  width={q.img.w}
                  height={q.img.h}
                  style={{ objectPosition: q.img.pos }}
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
                <span className="wc-panel__figLight" />
                <span className="wc-panel__figCross" />
              </figure>

              <p className="wc-panel__head">
                <span className="wc-panel__no">{q.index}</span>
                <span className="wc-panel__rule" aria-hidden="true" />
              </p>
              <h2 className="wc-panel__name">{q.name}</h2>

              <div className="wc-panel__say">
                {q.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {q.listLead ? <p className="wc-panel__lead">{q.listLead}</p> : null}

              {/* The register. Rows step outward from the centre and their ticks step with
                  them, so a set of five to seven short phrases reads as something radiating
                  rather than as a column of bullets. The step is small enough that the last
                  row still has a workable measure. */}
              <ul className="wc-reg">
                {q.items.map((item, n) => (
                  <li key={item} className="wc-reg__i" style={{ '--i': n } as React.CSSProperties}>
                    <span className="wc-reg__t" aria-hidden="true" />
                    <span className="wc-reg__w">{item}</span>
                  </li>
                ))}
              </ul>

              {q.closing ? <p className="wc-panel__close">{q.closing}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
