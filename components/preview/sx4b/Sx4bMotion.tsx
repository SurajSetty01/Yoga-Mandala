'use client';

import { useEffect } from 'react';

/**
 * §04's only client code. The section is complete without it: the stylesheet's default is
 * the finished long exposure (layer n at opacity 1/n, eight frames at equal weight).
 *
 * TWO THINGS, both optional:
 *
 * 1. THE TIME-LAPSE — only when motion is allowed and the viewport is tall enough to hold
 *    the stage (≥ 600px). `sx4b--live` pins the frame and gives each practice its own stretch
 *    of scroll; then ONE continuous value, which frame the reader is at, becomes eight
 *    opacities.
 *      t ∈ [0, 7]  which frame. Between two practices' centres the frame holds for the first
 *                  ~40% and then dissolves into the next, so each photograph is seen still.
 *      e ∈ [0, 1]  after the eighth: all eight settle to equal weight.
 *    Any mix of weights is reachable with opacity alone: layer i (bottom-up) at
 *    o_i = w_i / (w_1 + … + w_i) contributes exactly w_i to the composite. The dissolve, the
 *    hold and the long exposure are all the same eight opacities, and nothing but `opacity`
 *    is ever written per frame.
 *
 * 2. THE STRIP BECOMES EIGHT BUTTONS. In the static page (reduced motion, or a short
 *    viewport) a frame lifts its photograph out of the exposure on its own — an instant
 *    swap, no motion — and pressing it again lays it back. With motion on, a frame scrolls
 *    to its practice, and the scroll does the rest. Without JavaScript the strip stays a
 *    picture, hidden from assistive technology, because the figure has its caption.
 *
 * The rules it keeps, each learned on this site by breaking it:
 *   · one passive scroll listener that only raises a flag; every read and write inside one rAF
 *   · geometry measured on load, resize, font load and ResizeObserver — never in the frame
 *   · the reader's scroll position is written only when they press a frame to go there
 *   · no wheel or touch interception, ever
 */
export function Sx4bMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx4b');
    if (!root) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const tall = matchMedia('(min-height: 600px)');
    const wide = matchMedia('(min-width: 900px)');

    const layers = [...root.querySelectorAll<HTMLElement>('.sx4b-frame .sx4b-layer')];
    const steps = [...root.querySelectorAll<HTMLElement>('.sx4b-step')];
    const minis = [...root.querySelectorAll<HTMLElement>('.sx4b-mini')];
    const strip = root.querySelector<HTMLElement>('.sx4b-strip');
    const close = root.querySelector<HTMLElement>('.sx4b-close');
    const stage = root.querySelector<HTMLElement>('.sx4b-stage');
    const fig = root.querySelector<HTMLElement>('.sx4b-fig');
    const N = layers.length;
    if (N < 2 || steps.length !== N || minis.length !== N || !strip || !close || !stage || !fig) return;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const smooth = (v: number) => {
      const x = clamp(v, 0, 1);
      return x * x * (3 - 2 * x);
    };
    /** index access under the project's noUncheckedIndexedAccess: every array here is length N */
    const at = (arr: ArrayLike<number>, i: number) => arr[i] ?? 0;

    let live = false;
    let queued = false;
    let centres: number[] = [];
    let closeC = 0;
    let line = 0;
    let top = 0;
    let bottom = 0;
    const shown = new Array<number>(N).fill(-1);
    let on = -2;
    let cap = '';
    /** the static page's lifted frame, or null for the exposure */
    let lifted: number | null = null;

    function measure() {
      const y = scrollY;
      centres = steps.map((s) => {
        const r = s.getBoundingClientRect();
        return r.top + y + r.height / 2;
      });
      /* the exposure is timed to the closing sentences, not to their (deliberately long) row */
      const rc = (close!.querySelector('p') ?? close!).getBoundingClientRect();
      closeC = rc.top + y + rc.height / 2;
      const rr = root!.getBoundingClientRect();
      top = rr.top + y;
      bottom = rr.bottom + y;
      /* the line a practice has to cross to become current: the middle of the screen when the
         frame stands beside the words, the middle of the space under the band when it pins
         above them */
      line = wide.matches ? innerHeight * 0.5 : (stage!.offsetHeight + innerHeight) / 2;
    }

    function write(weights: number[]) {
      let sum = 0;
      layers.forEach((el, i) => {
        const wi = at(weights, i);
        sum += wi;
        const q = Math.round((sum > 1e-6 ? wi / sum : 0) * 1000) / 1000;
        if (q !== shown[i]) {
          shown[i] = q;
          el.style.opacity = String(q);
          el.style.visibility = q === 0 ? 'hidden' : '';
        }
      });
    }

    /** which frame is current (N = all of them): the leader, the strip mark and the caption */
    function mark(now: number) {
      if (now === on) return;
      on = now;
      steps.forEach((el, i) => el.toggleAttribute('data-on', live && i === now));
      minis.forEach((el, i) => el.toggleAttribute('data-on', now === N || i === now));
      const c = now === N ? 'all' : (layers[now]?.dataset.course ?? 'pbh');
      if (c !== cap) {
        cap = c;
        fig!.dataset.cap = c;
      }
    }

    function frame() {
      queued = false;
      if (!live) return;
      const y = scrollY;
      const vh = innerHeight;
      if (y + vh < top - vh || y > bottom + vh) return; // far away: nothing to do

      const m = y + line;
      const last = at(centres, N - 1);
      let tt = 0;
      let e = 0;
      if (m >= last) {
        tt = N - 1;
        e = smooth(((m - last) / Math.max(1, closeC - last) - 0.28) / 0.62);
      } else {
        for (let i = 0; i < N - 1; i++) {
          const a0 = at(centres, i);
          const a1 = at(centres, i + 1);
          if (m >= a0 && m < a1) {
            tt = i + smooth(((m - a0) / Math.max(1, a1 - a0) - 0.4) / 0.5);
            break;
          }
        }
      }

      /* two neighbouring frames share the weight while one dissolves into the next; after the
         eighth, every weight drifts to 1/N */
      const i0 = Math.floor(tt);
      const s = tt - i0;
      write(
        Array.from({ length: N }, (_, i) => {
          const own = i === i0 ? 1 - s : i === i0 + 1 ? s : 0;
          return own * (1 - e) + e / N;
        }),
      );
      mark(e >= 0.5 ? N : Math.round(tt));
    }

    /* ── the static page's lift ──────────────────────────────────────────────── */
    function lift(i: number | null) {
      lifted = i;
      minis.forEach((el, k) => el.setAttribute('aria-pressed', String(k === i)));
      if (i === null) {
        for (const el of layers) {
          el.style.opacity = '';
          el.style.visibility = '';
        }
        shown.fill(-1);
        on = -2;
        minis.forEach((el) => el.removeAttribute('data-on'));
        cap = 'all';
        fig!.dataset.cap = 'all';
        return;
      }
      write(Array.from({ length: N }, (_, k) => (k === i ? 1 : 0)));
      mark(i);
    }

    function label() {
      minis.forEach((el, i) =>
        el.setAttribute(
          'aria-label',
          live
            ? `Go to practice ${i + 1} of ${N} and its photograph`
            : `Show photograph ${i + 1} of ${N} on its own`,
        ),
      );
      strip!.setAttribute(
        'aria-label',
        live ? 'The eight photographs, in order' : 'The eight photographs in the exposure above',
      );
    }

    function press(i: number) {
      if (live) {
        const target = at(centres, i) - line;
        scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
        return;
      }
      lift(lifted === i ? null : i);
    }

    /* the strip becomes a group of buttons, whatever the mode */
    strip.removeAttribute('aria-hidden');
    strip.setAttribute('role', 'group');
    const handlers = minis.map((el, i) => {
      el.setAttribute('role', 'button');
      el.tabIndex = 0;
      el.setAttribute('aria-pressed', 'false');
      const click = () => press(i);
      const key = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault(); // Space would otherwise also scroll the page
          press(i);
        }
      };
      el.addEventListener('click', click);
      el.addEventListener('keydown', key);
      return { el, click, key };
    });

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const remeasure = () => {
      if (!live) return;
      measure();
      onScroll();
    };

    function enable() {
      if (live) return;
      lift(null);
      live = true;
      root!.classList.add('sx4b--live');
      shown.fill(-1);
      on = -2;
      cap = '';
      label();
      minis.forEach((el) => el.removeAttribute('aria-pressed'));
      measure();
      frame();
    }
    function disable() {
      if (live) {
        live = false;
        root!.classList.remove('sx4b--live');
        steps.forEach((el) => el.removeAttribute('data-on'));
      }
      lift(null);
      label();
    }
    const decide = () => (!reduce.matches && tall.matches ? enable() : disable());

    decide();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', remeasure);
    addEventListener('load', remeasure);
    reduce.addEventListener('change', decide);
    tall.addEventListener('change', decide);
    wide.addEventListener('change', remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    ro?.observe(root);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', remeasure);
      removeEventListener('load', remeasure);
      reduce.removeEventListener('change', decide);
      tall.removeEventListener('change', decide);
      wide.removeEventListener('change', remeasure);
      ro?.disconnect();
      for (const { el, click, key } of handlers) {
        el.removeEventListener('click', click);
        el.removeEventListener('keydown', key);
        el.removeAttribute('role');
        el.removeAttribute('tabindex');
        el.removeAttribute('aria-pressed');
        el.removeAttribute('aria-label');
      }
      strip.removeAttribute('role');
      strip.removeAttribute('aria-label');
      strip.setAttribute('aria-hidden', 'true');
      live = false;
      root.classList.remove('sx4b--live');
      lift(null);
    };
  }, []);

  return null;
}
