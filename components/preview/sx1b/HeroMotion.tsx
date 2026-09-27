'use client';

import { useEffect } from 'react';
import { LEAVES, clipSrc } from './frames';

/**
 * The hero's only client code. It writes TWO numbers and chooses ONE live clip.
 *
 *   --o2   0 → 1   the second leaf swinging out from behind the first
 *   --o3   0 → 1   the third leaf swinging out from behind the second
 *
 * Both are custom properties on `.sx1b`; every angle, shade, shift and underline in the
 * stylesheet is a calc() of them, and they feed `transform` and `opacity` only. Both have a
 * FINISHED default (1) in the stylesheet, and the closed start state (0) is scoped to
 * `.js` under `prefers-reduced-motion: no-preference` - so with scripting off, or motion
 * reduced, the book is open, every still is visible and this file changes nothing.
 *
 * The rules it obeys, each one a bug already shipped on this site:
 *  · ONE passive scroll listener that only raises a flag; one read of scrollY and every
 *    write inside one requestAnimationFrame. Geometry is measured on load and on resize,
 *    never in the frame loop.
 *  · The reader's scroll is never written to and wheel/touch are never intercepted. The
 *    stage is `position: sticky` inside a taller track: native pinning, not hijacking.
 *  · Video: muted, playsinline, loop, NO poster (the <img> beneath is the poster), src
 *    attached as the section approaches and released once it is a screen past. Only ONE
 *    clip plays at a time - the leaf most recently opened - so a phone decodes one stream,
 *    and the page being read is the page that moves. The others hold their last frame.
 *  · Under reduced motion it returns before attaching anything: no listener, no video.
 */
export function HeroMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx1b');
    const track = root?.querySelector<HTMLElement>('.sx1b-track');
    if (!root || !track) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    /* smoothstep: no leaf starts or stops on a corner */
    const ease = (t: number) => t * t * (3 - 2 * t);

    /* ── the clips ─────────────────────────────────────────────────────────── */
    const plates = [...root.querySelectorAll<HTMLElement>('.sx1b-plate')];
    const videos = plates.map((plate, i) => {
      const v = document.createElement('video');
      v.className = 'sx1b-video';
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.loop = true;
      v.preload = 'none';
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('aria-hidden', 'true');
      v.tabIndex = -1;
      v.dataset.clip = LEAVES[i]?.clip ?? '';
      v.addEventListener('playing', () => v.classList.add('is-on'));
      plate.appendChild(v);
      return v;
    });

    let attached = false;
    let live = -1;

    const attach = () => {
      if (attached) return;
      attached = true;
      for (const v of videos) if (v.dataset.clip) v.src = clipSrc(v.dataset.clip);
      live = -1; // force the next frame to choose
      queue();
    };
    const release = () => {
      if (!attached) return;
      attached = false;
      for (const v of videos) {
        v.pause();
        v.classList.remove('is-on');
        v.removeAttribute('src');
        v.load();
      }
    };
    const choose = (i: number) => {
      if (i === live || !attached) return;
      live = i;
      videos.forEach((v, k) => {
        if (k === i) v.play().catch(() => {});
        else v.pause();
      });
    };

    /* attached on approach, released a screen past */
    const near = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.isIntersecting ? attach : release)();
      },
      { rootMargin: '100% 0px 100% 0px' },
    );
    near.observe(track);

    /* ── the two numbers ───────────────────────────────────────────────────── */
    let top = 0;
    let run = 1;
    const measure = () => {
      const r = track.getBoundingClientRect();
      top = r.top + scrollY;
      run = Math.max(1, track.offsetHeight - innerHeight);
    };

    let queued = false;
    let o2Prev = -1;
    let o3Prev = -1;
    function frame() {
      queued = false;
      const p = clamp((scrollY - top) / run, 0, 1);
      /* A first screen held, two openings, and a held end.
         The third leaf starts folded flat BEHIND the second (177deg) and is invisible until
         it passes ~95deg - the first 56% of its own window. So its window starts while the
         second leaf is still settling: the hidden half runs underneath, and what the reader
         SEES is a breath of stillness (p .41-.58) and then the third leaf swinging out
         (.58-.80). Measured from the rendered sequence, not assumed: with the windows
         end-to-end the book sat apparently frozen for a fifth of the runway. */
      const o2 = ease(clamp((p - 0.05) / 0.36, 0, 1));
      const o3 = ease(clamp((p - 0.3) / 0.5, 0, 1));
      if (o2 !== o2Prev) root!.style.setProperty('--o2', o2.toFixed(4));
      if (o3 !== o3Prev) root!.style.setProperty('--o3', o3.toFixed(4));
      o2Prev = o2;
      o3Prev = o3;
      choose(o3 > 0.55 ? 2 : o2 > 0.55 ? 1 : 0);
    }
    function queue() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    }

    const onResize = () => {
      measure();
      queue();
    };
    measure();
    frame();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(track);

    return () => {
      removeEventListener('scroll', queue);
      removeEventListener('resize', onResize);
      ro.disconnect();
      near.disconnect();
      release();
      for (const v of videos) v.remove();
      root.style.removeProperty('--o2');
      root.style.removeProperty('--o3');
    };
  }, []);

  return null;
}
