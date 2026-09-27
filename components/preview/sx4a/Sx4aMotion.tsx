'use client';

import { useEffect } from 'react';
import { BANDS, GAMMA, HOLD, veil } from './frame';

/**
 * The section's only client island. It rewinds the finished strip to a blank sheet and
 * plays the exposure back against the reader's scroll.
 *
 * THE STRIP, AS ARITHMETIC. p ∈ [0, 1] runs from the moment the stage's top is 60% of a
 * screen below the top of the viewport — so the first band is already coming up while the
 * sheet rises into place, and nobody watches a dark card sit still for a whole screen of
 * scroll — to the end of the pinned travel. Its first 90% is eight equal steps of
 * S = 0.9 / 8; the last 10% holds the finished strip still.
 *   · band i is uncovered at p = i·S (band 0 at once — the sheet starts with one bare band);
 *   · its exposure from then on is (p − i·S) / (8·S), so at the end of the eighth step band
 *     0 has had 8/8 of the light and band 7 has had 1/8;
 *   · the card sits at k/8, where k is the number of bands uncovered, and is taken off the
 *     sheet entirely when the eighth is uncovered. Its move is a 0.62s transition — a hand
 *     sliding a card — but its POSITION is decided by scroll alone, so scrolling back
 *     un-exposes the strip exactly.
 * The print then develops as it rises into the screen: its veil lifts over the first 62% of
 * a viewport of travel.
 *
 * WHEN IT DOES NOTHING. Under `prefers-reduced-motion: reduce`, and on a viewport shorter
 * than 560px (where the stage cannot be pinned without hiding part of it), `.sx4a--live` is
 * never added: the pin, the card and the start state do not exist, and the reader has the
 * finished strip and the finished print the server rendered. Both media queries are
 * listened to, so turning either on mid-read restores the finished section immediately.
 *
 * The rules it obeys, each one a bug this project has already shipped:
 *   · one passive scroll listener, which only requests a frame; every read of scrollY and
 *     every write happens inside that one requestAnimationFrame;
 *   · geometry is measured on load, on resize and on a ResizeObserver tick — never per frame;
 *   · only opacity (the veils) and transform (the card, via --c) change;
 *   · the reader's scroll position is never written, and wheel and touch are untouched.
 */
export function Sx4aMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-sx4a]');
    if (!root) return;
    const stage = root.querySelector<HTMLElement>('.sx4a-stage');
    const pin = root.querySelector<HTMLElement>('.sx4a-pin');
    const card = root.querySelector<HTMLElement>('.sx4a-card');
    const veils = [...root.querySelectorAll<HTMLElement>('.sx4a-veil')];
    const notes = [...root.querySelectorAll<HTMLElement>('.sx4a-note')];
    const plate = root.querySelector<HTMLElement>('.sx4a-plate');
    const plateVeil = root.querySelector<HTMLElement>('.sx4a-plate__veil');
    if (!stage || !pin || !card || veils.length !== BANDS || notes.length !== BANDS) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const fits = matchMedia('(min-height: 560px)');
    const finished = veils.map((v) => v.style.opacity);
    const S = (1 - HOLD) / BANDS;

    let live = false;
    let raf = 0;
    let start = 0;
    let travel = 1;
    let plateTop = 0;
    let vh = 1;
    let lastC = '';

    const measure = () => {
      vh = window.innerHeight;
      const lead = 0.6 * vh;
      start = stage.getBoundingClientRect().top + window.scrollY - lead;
      travel = Math.max(1, stage.offsetHeight - pin.offsetHeight + lead);
      plateTop = plate ? plate.getBoundingClientRect().top + window.scrollY : 0;
    };

    const paint = () => {
      raf = 0;
      if (!live) return;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, (y - start) / travel));

      veils.forEach((v, i) => {
        v.style.opacity = veil((p - i * S) / (BANDS * S)).toFixed(3);
      });

      const k = Math.min(BANDS, Math.floor(p / S) + 1); // bands uncovered
      const c = k >= BANDS ? '1.1' : String(k / BANDS);
      if (c !== lastC) {
        card.style.setProperty('--c', c);
        lastC = c;
      }

      const done = p >= 1 - HOLD;
      notes.forEach((n, i) => {
        const st = done || i < k - 1 ? 'done' : i === k - 1 ? 'now' : 'wait';
        if (n.dataset.state !== st) n.dataset.state = st;
      });

      if (plateVeil) {
        const q = Math.min(1, Math.max(0, (vh - (plateTop - y)) / (vh * 0.62)));
        plateVeil.style.opacity = (1 - Math.pow(q, GAMMA)).toFixed(3);
      }
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const remeasure = () => {
      if (!live) return;
      measure();
      request();
    };

    const setLive = (on: boolean) => {
      if (on === live) return;
      live = on;
      root.classList.toggle('sx4a--live', on);
      if (on) {
        measure();
        paint(); // synchronously, so the finished strip is never painted and then rewound
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        veils.forEach((v, i) => (v.style.opacity = finished[i] ?? ''));
        card.style.removeProperty('--c');
        lastC = '';
        notes.forEach((n) => delete n.dataset.state);
        if (plateVeil) plateVeil.style.opacity = '';
      }
    };
    const decide = () => setLive(!reduce.matches && fits.matches);

    decide();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', remeasure);
    reduce.addEventListener('change', decide);
    fits.addEventListener('change', decide);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    ro?.observe(document.body);

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', remeasure);
      reduce.removeEventListener('change', decide);
      fits.removeEventListener('change', decide);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      setLive(false);
    };
  }, []);

  return null;
}
