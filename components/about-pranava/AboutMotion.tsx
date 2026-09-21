'use client';

import { useEffect } from 'react';

/**
 * The page's single client island. Everything else on /about/ is a server component, so
 * every sentence and every photograph is in the static HTML and the page is finished
 * before this file runs at all.
 *
 * It does two things:
 *
 *   1. reveals `[data-ap]` blocks, opt-in through `.is-live` on the page root — a reader
 *      whose JavaScript never arrives keeps the whole page, because nothing already
 *      painted is ever hidden by CSS that is not gated on that class;
 *   2. writes FOUR scroll-linked custom properties, all of which have a finished default
 *      in the stylesheet, so the page never depends on this file to be complete:
 *
 *        --apr-close  hero      0 → 1   three horizons closing into one room
 *        --apr-zoom   §02       0 → 1   an enlargement stepping back into its room
 *        --apr-drift  §07      -.5 → .5 four teachers at four depths
 *        --apr-part   §10       0 → 1   two roads pulling apart
 *
 *      and ONE attribute — `data-lit` on §05's wheel, four times in the whole section.
 *      The clay arc's quarter-turn and the dimming of the other three quadrants are CSS
 *      transitions off that attribute, not per-frame writes.
 *
 * The rules it obeys, each of them a bug already shipped on this site:
 *   · ONE passive scroll listener, and it only raises a flag. Every read of scrollY and
 *     every write happens inside one requestAnimationFrame. Element geometry is measured
 *     on load, on resize and on a ResizeObserver tick — never inside the frame loop.
 *   · Only `transform` and `opacity` are animated; the properties above feed exactly those.
 *   · Nothing that is IntersectionObserved carries a clip — Chromium computes the
 *     intersection rect AFTER clips, so an element clipped to zero reports ratio 0 and
 *     never fires. The clipped elements here (the disc, the panes, the plate) are
 *     children of, or siblings to, the observed ones.
 *   · The reader's scroll position is never written to. No wheel or touch interception.
 *   · Under `prefers-reduced-motion: reduce` it attaches nothing, observes nothing and
 *     returns. `.is-live` is never added, so every reveal start state is inert and every
 *     property keeps the finished value the stylesheet gives it.
 */
export function AboutMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.apr');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. reveals ──────────────────────────────────────────────────────────
       Anything already on screen when the island mounts is resolved before
       `.is-live` is added, so a reader who lands mid-page never sees a block
       that was painted a moment ago fade back in. */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-ap]')];
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('in');
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );

    /* ── 2. the four properties, and the one attribute ─────────────────── */
    const room = root.querySelector<HTMLElement>('.apr-hero__room');
    const stage = root.querySelector<HTMLElement>('.apr-what__stage');
    const wheel = root.querySelector<HTMLElement>('.apr-dial__wheel');
    const doors = root.querySelector<HTMLElement>('.apr-dial__doors');
    const field = root.querySelector<HTMLElement>('.apr-fac__field');
    const routes = root.querySelector<HTMLElement>('.apr-close__routes');

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    /* smoothstep, so nothing starts or stops on a corner */
    const ease = (t: number) => t * t * (3 - 2 * t);

    type Box = { top: number; h: number };
    const box = (el: Element | null): Box => {
      if (!el) return { top: 0, h: 1 };
      const r = el.getBoundingClientRect();
      return { top: r.top + scrollY, h: r.height || 1 };
    };

    let bStage: Box = { top: 0, h: 1 };
    let bDoors: Box = { top: 0, h: 1 };
    let bField: Box = { top: 0, h: 1 };
    let bRoutes: Box = { top: 0, h: 1 };
    let heroClose = 1;

    function measure() {
      bStage = box(stage);
      bDoors = box(doors);
      bField = box(field);
      bRoutes = box(routes);
      /* the hero's three horizons close over a little over half a screen of scroll:
         far enough that it reads as a move, short enough that a reader who scrolls once
         has already seen it finish. */
      heroClose = Math.max(1, innerHeight * 0.58);
    }

    let lit = -1;

    function frame() {
      queued = false;
      const y = scrollY; // one read
      const vh = innerHeight || 1;
      const mid = y + vh / 2;

      if (room) room.style.setProperty('--apr-close', ease(clamp(y / heroClose, 0, 1)).toFixed(4));

      if (stage) {
        /* 0 as the plate enters from below, 1 by the time its middle has reached the
           middle of the screen — so the room is whole while it is being read. */
        const p = (y + vh - bStage.top) / (vh * 0.86 + bStage.h * 0.5);
        stage.style.setProperty('--apr-zoom', ease(clamp(p, 0, 1)).toFixed(4));
      }

      if (wheel) {
        /* which of the four doors is nearest the middle of the screen. This is the ONLY
           write in the whole loop that is not a custom property, and it happens four
           times in the section rather than once a frame: the clay arc's quarter-turn and
           the dimming of the other three quadrants are both CSS transitions off it. */
        const t = clamp((mid - bDoors.top) / bDoors.h, 0, 1);
        const i = clamp(Math.floor(t * 4), 0, 3);
        if (i !== lit) {
          lit = i;
          wheel.dataset.lit = String(i);
        }
      }

      if (field) {
        const p = (y + vh - bField.top) / (vh + bField.h);
        field.style.setProperty('--apr-drift', (clamp(p, 0, 1) - 0.5).toFixed(4));
      }

      if (routes) {
        const p = (y + vh - bRoutes.top) / (vh * 0.9 + bRoutes.h);
        routes.style.setProperty('--apr-part', ease(clamp(p, 0, 1)).toFixed(4));
      }
    }

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    frame();
    /* `.is-live` is added only AFTER the first frame has written every property, so the
       start states it switches on are never shown with a stale value behind them. */
    root.classList.add('is-live');
    for (const el of revealables) if (!el.classList.contains('in')) reveal.observe(el);

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);

    /* Photographs arrive after first paint and fonts re-wrap the type under them; one
       observer on the root re-measures rather than guessing when that has settled. */
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      reveal.disconnect();
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      root.classList.remove('is-live');
      room?.style.removeProperty('--apr-close');
      stage?.style.removeProperty('--apr-zoom');
      field?.style.removeProperty('--apr-drift');
      routes?.style.removeProperty('--apr-part');
      if (wheel) delete wheel.dataset.lit;
    };
  }, []);

  return null;
}
