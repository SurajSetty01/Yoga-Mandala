'use client';

import { useEffect } from 'react';

/**
 * The section's only client island, and after this revision it does exactly one thing.
 *
 * THE RULE DOWN THE GUTTER IS NOT IN HERE. It is drawn by `view-timeline` +
 * `animation-timeline` in styles/preview-sx3c.css, so this page has NO scroll listener and NO
 * requestAnimationFrame at all. Firefox still ships scroll-driven animations behind a flag, so
 * it — like reduced motion, like a reader with JavaScript off — gets the rule fully drawn.
 * That state is the design; the draw is a grace note.
 *
 * So this file reveals `[data-sx3c]` blocks, opt-in through `data-sx3c-live` on the section —
 * nothing that is already painted is ever hidden by CSS that is not gated on that attribute,
 * so a reader whose JavaScript never arrives keeps every word.
 *
 * WHAT USED TO BE HERE, AND WHY IT IS GONE. ~150 lines ran a silent loop of
 * `pr-mov-img_5681`: attach on approach after a settle, fade in only once `readyState >= 3`
 * AND the clock had moved, pause on exit, drop a transfer still in flight a viewport and a
 * half past. The machinery was sound. The FRAME was not, and only the pixels showed it: the
 * manifest calls the clip "Steady", and it is not — extracted at 0 / 2 / 5 / 8 s the camera
 * drifts right and in through the whole 10.5 s. At t=0 it is the poster: teacher, inverted
 * student, three people sitting watching. By t=5 one watcher is left. By t=8 there are none,
 * the wall of A4 notices is the top half of the picture and a black folding chair has entered
 * at the right — which is the fourth-frame-rejected-for-its-furniture failure this project has
 * already thrown four frames out for, arriving on its own, every loop, at every desktop width.
 * A crop cannot follow a moving camera, and the caption — "and the room watching" — was true
 * of the first second of the loop and false for the rest of it.
 *
 * So the clip is cut rather than gated, trimmed or re-cropped. What it costs: nothing the
 * section's argument rests on, because the argument is the type, and both reviewers said so.
 * What it buys: the caption is true at every width and every moment; the picture is the frame
 * that was chosen; and the whole section is 665 KB at 390, 1024, 1440 AND 2531, where it was
 * 3815 KB from 1280 up — 3150 KB of it one 2.46 Mbps encode with no smaller variant.
 */
export function Sx3cMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx3c');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* Anything already on screen is marked BEFORE the start states are armed, so the
       attribute never blanks a paragraph the reader is looking at for a frame. */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-sx3c]')];
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('sx3c-on');
    }
    root.setAttribute('data-sx3c-live', '');

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('sx3c-on');
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of revealables) if (!el.classList.contains('sx3c-on')) reveal.observe(el);

    return () => reveal.disconnect();
  }, []);

  return null;
}
