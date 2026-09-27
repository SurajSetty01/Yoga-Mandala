'use client';

import { useEffect } from 'react';

/**
 * The client island for the two sections of /about/ that predate the sx1–sx9 rebuild:
 * §02 "What Praṇava is" and §10 "Begin". Every other section on the page
 * (components/about-pranava/sx1–sx9) mounts its own motion script and needs nothing here.
 * Everything else on /about/ is a server component, so every sentence and every
 * photograph is in the static HTML and the page is finished before this file runs at all.
 *
 * It does two things:
 *
 *   1. reveals `[data-ap]` blocks, opt-in through `.is-live` on the page root — a reader
 *      whose JavaScript never arrives keeps the whole page, because nothing already
 *      painted is ever hidden by CSS that is not gated on that class;
 *   2. writes TWO scroll-linked custom properties, both of which have a finished default
 *      in the stylesheet, so the page never depends on this file to be complete:
 *
 *        --apr-zoom   §02       0 → 1   an enlargement stepping back into its room
 *        --apr-part   §10       0 → 1   two roads pulling apart
 *
 * The rules it obeys, each of them a bug already shipped on this site:
 *   · ONE passive scroll listener, and it only raises a flag. Every read of scrollY and
 *     every write happens inside one requestAnimationFrame. Element geometry is measured
 *     on load, on resize and on a ResizeObserver tick — never inside the frame loop.
 *   · Only `transform` and `opacity` are animated; the properties above feed exactly those.
 *   · Nothing that is IntersectionObserved carries a clip — Chromium computes the
 *     intersection rect AFTER clips, so an element clipped to zero reports ratio 0 and
 *     never fires.
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

    /* ── 2. the two properties ───────────────────────────────────────────── */
    const stage = root.querySelector<HTMLElement>('.apr-what__stage');
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
    let bRoutes: Box = { top: 0, h: 1 };

    function measure() {
      bStage = box(stage);
      bRoutes = box(routes);
    }

    function frame() {
      queued = false;
      const y = scrollY; // one read
      const vh = innerHeight || 1;

      if (stage) {
        /* 0 as the plate enters from below, 1 by the time its middle has reached the
           middle of the screen — so the room is whole while it is being read. */
        const p = (y + vh - bStage.top) / (vh * 0.86 + bStage.h * 0.5);
        stage.style.setProperty('--apr-zoom', ease(clamp(p, 0, 1)).toFixed(4));
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
       observer on the root re-measures rather than guessing when that has settled. The
       sections above §02 and §10 change height as their own scripts run, so this matters. */
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      reveal.disconnect();
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      root.classList.remove('is-live');
      stage?.style.removeProperty('--apr-zoom');
      routes?.style.removeProperty('--apr-part');
    };
  }, []);

  return null;
}
