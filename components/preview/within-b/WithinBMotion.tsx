'use client';

import { useEffect } from 'react';

/**
 * The concept's single client island. Everything above it is a server component, so every
 * word, every poster and every wall label is in the static HTML and the page is finished
 * before this file runs at all.
 *
 * It does three things:
 *
 *   1. reveals `[data-wb]` blocks, opt-in through `.is-live` on the root — a reader whose
 *      JavaScript never arrives keeps the whole page, because nothing that is already
 *      painted is ever hidden by CSS that is not gated on this class;
 *   2. attaches and plays the silent loops, one at a time, only once a frame is genuinely on
 *      screen, and pauses them the moment it is not — the clips are 1.7–2.7 MB each and none
 *      of them is downloaded until the reader has arrived at the frame it belongs to;
 *   3. drifts each picture inside its own aperture as the reader passes, so a frame reads as
 *      a window being walked past rather than a rectangle pasted onto the page.
 *
 * The rules it obeys, every one of them a bug already shipped on this site:
 *   · it clips nothing that it observes — Chromium computes an IntersectionObserver's rect
 *     AFTER clips, so an element carrying a clip-to-zero reports ratio 0 and never fires.
 *     The arch mask is on a CHILD of every observed element;
 *   · one passive scroll listener that only raises a flag. Geometry is measured on load and
 *     on resize and nowhere else; the frame callback does arithmetic on cached numbers and
 *     writes one custom property. Nothing reads layout inside the scroll path;
 *   · only `transform` and `opacity` are ever animated;
 *   · under `prefers-reduced-motion: reduce` it attaches nothing, plays nothing and returns.
 *     The page is then four posters and a still — complete, and the state every wall label,
 *     chip and paragraph is written for.
 */
export function WithinBMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.within-b');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. reveals ───────────────────────────────────────────────────── */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-wb]')];
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('in');
    }
    root.classList.add('is-live');

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    for (const el of revealables) if (!el.classList.contains('in')) reveal.observe(el);

    /* ── 2. the loops ─────────────────────────────────────────────────── */
    /*
     * THE SAME CAPABILITY GATE THE APPROVED HERO USES, verbatim in intent — see
     * lib/hero-choreography.ts. A phone gets the posters, and that is a measurement
     * rather than a preference: p13-img_0593.mp4 is 1,733,432 B and its AVIF poster is
     * 67,593 B. All four posters together are a fifth of one clip. There is no width at
     * which the loop wins on a phone, and this page's poster state is a complete state —
     * it is the same one prefers-reduced-motion gets.
     */
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const thin = !!(conn && (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? '')));
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    const lite = thin || !canMp4 || matchMedia('(max-width: 860px)').matches;

    const vids = lite ? [] : [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')];
    const play = (v: HTMLVideoElement) => {
      if (!v.src) {
        v.src = v.dataset.src ?? '';
        v.load();
      }
      const p = v.play();
      if (p) p.then(() => v.classList.add('is-live')).catch(() => {});
    };

    const film = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target.querySelector<HTMLVideoElement>('video[data-src]');
          if (!v) continue;
          if (e.isIntersecting) play(v);
          else if (!v.paused) v.pause();
        }
      },
      { threshold: 0.35 }
    );
    /* The FIGURE is observed, never the mask: the mask carries the arch and `overflow: clip`,
       and an observed element that clips is the bug that shipped a blank page here once. */
    for (const v of vids) {
      const host = v.closest('figure');
      if (host) film.observe(host);
    }

    /* ── 3. the drift ─────────────────────────────────────────────────── */
    const drifters = [...root.querySelectorAll<HTMLElement>('[data-drift]')];
    const box = drifters.map((el) => ({ el, top: 0, h: 1 }));

    /* Geometry is read here — on load, on resize, and when the page's own images finish
       laying themselves out — and never inside the scroll path. */
    const measure = () => {
      for (const b of box) {
        const r = b.el.getBoundingClientRect();
        b.top = r.top + scrollY;
        b.h = r.height || 1;
      }
    };

    let queued = false;
    const frame = () => {
      queued = false;
      const vh = innerHeight || 1;
      const y = scrollY;
      for (const b of box) {
        /* 0 as the frame enters from below, 1 as it leaves at the top. Written as a signed
           value so the CSS can keep its own amplitude and direction. */
        const p = (y + vh - b.top) / (vh + b.h);
        const c = p < 0 ? 0 : p > 1 ? 1 : p;
        b.el.style.setProperty('--wb-y', (c - 0.5).toFixed(4));
      }
    };
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
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);

    /* Posters arrive after first paint and change the height of nothing that is fixed, but
       fonts and wrapping do; one observer on the root re-measures instead of guessing. */
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      reveal.disconnect();
      film.disconnect();
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      root.classList.remove('is-live');
      for (const b of box) b.el.style.removeProperty('--wb-y');
    };
  }, []);

  return null;
}
