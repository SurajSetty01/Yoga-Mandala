'use client';

import { useEffect } from 'react';

/**
 * The only client code in concept A. The section is complete before this runs: every
 * picture is open, every sentence is visible, the mat strip shows its still frame.
 *
 *   1. THE OPENING. Each of plates II–V carries two paper leaves that, once `.is-live` is
 *      on the section, cover everything outside the mat's width. As the plate comes up
 *      the screen the leaves slide out — transform only — so the picture is first seen as
 *      a strip the width of the mat, held until its top edge reaches 80% of the viewport,
 *      and opens to its own width by the time that edge reaches 34%. Nothing is ever held: the reader's scroll drives it.
 *   2. THE SENTENCES rise in on an IntersectionObserver.
 *   3. THE MAT STRIP's clip is attached within a screen of it and released a screen past.
 *
 * The rules this obeys are each a bug already shipped on this site:
 *   · one passive scroll listener that only raises a flag; all reads and writes in one rAF;
 *     geometry measured on load / resize / ResizeObserver, never in the frame loop;
 *   · transform and opacity only;
 *   · nothing observed carries a clip — the leaves live inside the clipped window, the
 *     observers watch the unclipped figure and paragraph;
 *   · under `prefers-reduced-motion: reduce` it attaches nothing and never adds
 *     `.is-live`, so no start state ever applies and the clip is never fetched.
 */
export function Sx2aMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx2a');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    /* smoothstep: the strip holds, then opens, then settles — no corner at either end */
    const ease = (t: number) => t * t * (3 - 2 * t);

    /* ── 1. the opening ─────────────────────────────────────────────────── */
    type Plate = { el: HTMLElement; l: HTMLElement; r: HTMLElement; top: number; last: number };
    const plates: Plate[] = [...root.querySelectorAll<HTMLElement>('[data-sx2a-plate]')].flatMap((el) => {
      const l = el.querySelector<HTMLElement>('.sx2a-leaf--l');
      const r = el.querySelector<HTMLElement>('.sx2a-leaf--r');
      return l && r ? [{ el, l, r, top: 0, last: -1 }] : [];
    });

    let vh = innerHeight;
    const measure = () => {
      vh = innerHeight;
      for (const p of plates) p.top = p.el.getBoundingClientRect().top + scrollY;
    };

    const paint = () => {
      const y = scrollY;
      for (const p of plates) {
        /* 0 — the mat's width — until the plate's top has come up to 80% of the screen, so
           the strip is SEEN before it opens; 1 once the top reaches 34%. An ease-out here
           was tried first and spent a third of the opening before the plate was on screen. */
        const t = ease(clamp((vh * 0.8 - (p.top - y)) / (vh * 0.46), 0, 1));
        const v = Math.round(t * 1000) / 1000;
        if (v === p.last) continue;
        p.last = v;
        const d = (v * 101).toFixed(2);
        p.l.style.transform = `translate3d(-${d}%,0,0)`;
        p.r.style.transform = `translate3d(${d}%,0,0)`;
      }
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        paint();
      });
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();

    /* ── 2. the sentences ───────────────────────────────────────────────── */
    const lines = [...root.querySelectorAll<HTMLElement>('[data-sx2a-r]')];
    for (const el of lines) if (el.getBoundingClientRect().top < vh * 0.94) el.classList.add('sx2a-in');
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('sx2a-in');
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of lines) if (!el.classList.contains('sx2a-in')) reveal.observe(el);

    /* Start states apply only from here on, after every plate already has its correct
       transform and every sentence already on screen is marked `.sx2a-in`. */
    root.classList.add('is-live');

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    /* ── 3. the mat strip's clip ────────────────────────────────────────── */
    const mat = root.querySelector<HTMLElement>('[data-sx2a-mat]');
    const vid = mat?.querySelector<HTMLVideoElement>('video') ?? null;
    let near: IntersectionObserver | null = null;
    if (mat && vid && vid.dataset.src) {
      const src = vid.dataset.src;
      vid.muted = true;
      const onPlaying = () => mat.classList.add('is-playing');
      vid.addEventListener('playing', onPlaying);
      near = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              if (!vid.getAttribute('src')) {
                vid.src = src;
                vid.load();
              }
              vid.play().catch(() => {
                /* autoplay refused: the still frame beneath is already the finished state */
              });
            } else if (vid.getAttribute('src')) {
              vid.pause();
              mat.classList.remove('is-playing');
              vid.removeAttribute('src');
              vid.load();
            }
          }
        },
        { rootMargin: '100% 0px 100% 0px' },
      );
      near.observe(mat);
    }

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      ro.disconnect();
      reveal.disconnect();
      near?.disconnect();
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
