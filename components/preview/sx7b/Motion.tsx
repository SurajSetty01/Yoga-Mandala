'use client';

import { useEffect } from 'react';

/**
 * The section's only client island. It takes the registered sheet the server rendered and
 * plays it as a relay through one point.
 *
 * THE ARITHMETIC.
 *   p ∈ ℝ       the reader's progress through the pin: 0 when the stage sticks, 1 when it is
 *               about to let go. Negative while the stage is still arriving.
 *   c_k         where room k opens: evenly spaced from C0 to C_END, so the first room opens
 *               as the lead is read and the last as the closing sentence arrives.
 *   o_k         0 → 1 over p ∈ [c_k − OPEN/2, c_k + OPEN/2]; between openings nothing moves,
 *               so each room is HELD. This is ScrollTrigger's `snap` without touching the
 *               reader's scroll — the dwell lives in the mapping, never in the scrollbar.
 *   iris k      a disc of radius R centred on the point P, scaled from s0 (the ring's inner
 *               radius) to 1 (the stage's farthest corner). Inside it the room's own plate is
 *               counter-scaled by 1/s about its HANDS — which sit at the disc's centre — so
 *               the photograph never moves while the aperture opens over it. Transform only:
 *               no clip-path is ever animated.
 *   settle      the incoming room eases from 1.05 to 1 about its hands as it opens; the
 *               outgoing one steps back to 0.97 about its hands under it. Both are scaled
 *               about the one point, so the hands never leave it.
 *
 * THE RULES IT OBEYS, each one a bug this project has already shipped:
 *   · one passive scroll listener that only requests a frame; every read and write happens
 *     inside that one requestAnimationFrame;
 *   · geometry is measured on load, resize and a ResizeObserver tick — never per frame;
 *     transform and a visibility class are the only things written per frame;
 *   · the reader's scroll position is never written; wheel and touch are never intercepted;
 *   · video: muted, playsinline, loop; `src` attached once the room before it has opened,
 *     played only while its own room is fully open and held, released (src removed, load())
 *     once the section is more than a screen away. No poster attribute anywhere.
 *
 * WHEN IT DOES NOTHING. Under prefers-reduced-motion, and on a viewport shorter than 560px
 * (where a pinned stage cannot hold a whole room), `.sx7b--live` is never added and the
 * server's registered sheet stands. Both queries are listened to, so switching either
 * mid-read restores the static section at once.
 */

/** share of p one opening takes */
const OPEN = 0.11;
/** centre of the first and last openings */
const C0 = 0.045;
const C_END = 0.8;
const SETTLE = 0.05;
/** each later room steps the ones beneath it back by this much, about the hands */
const STEP_BACK = 0.045;
/** how far a room is dimmed once the next has opened over it, and per room after that */
const DIM_FIRST = 0.8;
const DIM_AGE = 0.03;
const DIM_MAX = 0.9;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Item = {
  el: HTMLElement;
  pic: HTMLElement;
  dim: HTMLElement | null;
  vid: HTMLVideoElement | null;
  shown: boolean;
  attached: boolean;
  playing: boolean;
  lastI: string;
  lastP: string;
  lastD: string;
};

export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-sx7b]');
    if (!root) return;
    const rail = root.querySelector<HTMLElement>('.sx7b-rail');
    const stage = root.querySelector<HTMLElement>('.sx7b-stage');
    const point = root.querySelector<HTMLElement>('.sx7b-point');
    const strip = root.querySelector<HTMLElement>('.sx7b-strip');
    if (!rail || !stage || !point || !strip) return;

    const items: Item[] = [];
    for (const el of strip.querySelectorAll<HTMLElement>('.sx7b-f')) {
      const pic = el.querySelector<HTMLElement>('.sx7b-f__pic');
      if (!pic) continue;
      items.push({
        el,
        pic,
        dim: el.querySelector<HTMLElement>('.sx7b-f__dim'),
        vid: el.querySelector<HTMLVideoElement>('.sx7b-f__vid'),
        shown: false,
        attached: false,
        playing: false,
        lastI: '',
        lastP: '',
        lastD: '',
      });
    }
    const N = items.length;
    if (N < 2) return;
    const centre = (k: number) => C0 + (k * (C_END - C0)) / (N - 1);

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const fits = matchMedia('(min-height: 560px)');

    let live = false;
    let near = false;
    let raf = 0;
    let pinTop = 0;
    let span = 1;
    let s0 = 0.05;

    const measure = () => {
      pinTop = rail.getBoundingClientRect().top + window.scrollY;
      span = Math.max(1, rail.offsetHeight - stage.offsetHeight);
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const cs = getComputedStyle(stage);
      const px = W * (parseFloat(cs.getPropertyValue('--sx7b-px')) || 0.5);
      const py = H * (parseFloat(cs.getPropertyValue('--sx7b-py')) || 0.5);
      // the disc must reach the stage's farthest corner from the point
      const R = Math.ceil(Math.hypot(Math.max(px, W - px), Math.max(py, H - py))) + 2;
      stage.style.setProperty('--sx7b-R', `${R}px`);
      // the iris starts as exactly the disc inside the ring's stroke
      s0 = Math.max(0.004, (point.offsetWidth / 2 - 1.5) / R);
    };

    const attach = (it: Item) => {
      if (!it.vid || it.attached) return;
      const s = it.vid.dataset.src;
      if (!s) return;
      it.vid.muted = true;
      it.vid.src = s;
      it.attached = true;
    };
    const release = (it: Item) => {
      if (!it.vid || !it.attached) return;
      it.vid.pause();
      it.vid.classList.remove('is-on');
      it.vid.removeAttribute('src');
      it.vid.load();
      it.attached = false;
      it.playing = false;
    };
    const play = (it: Item, on: boolean) => {
      if (!it.vid || !it.attached || on === it.playing) return;
      it.playing = on;
      if (on) {
        const pr = it.vid.play();
        if (pr && typeof pr.catch === 'function') pr.catch(() => undefined);
      } else {
        it.vid.pause();
        it.vid.classList.remove('is-on');
        // back to the registered poster frame, so a room seen again is still on the point
        try {
          it.vid.currentTime = 0;
        } catch {
          /* not seekable yet */
        }
      }
    };

    const paint = () => {
      raf = 0;
      if (!live) return;
      const p = (window.scrollY - pinTop) / span;
      const o = items.map((_, k) => clamp((p - (centre(k) - OPEN / 2)) / OPEN));
      const e = o.map(ease);

      items.forEach((it, k) => {
        const ok = o[k] ?? 0;
        const onext = k + 1 < N ? (o[k + 1] ?? 0) : 0;
        // a room, once opened, stays: the later ones stack over it on the same point
        const shown = ok > 0;
        if (shown !== it.shown) {
          it.shown = shown;
          it.el.classList.toggle('is-in', shown);
        }
        if (shown) {
          // how many rooms have opened over this one, fractionally
          let back = 0;
          for (let j = k + 1; j < N; j++) back += e[j] ?? 0;
          const s = lerp(s0, 1, e[k] ?? 0);
          const z = lerp(1 + SETTLE, 1, e[k] ?? 0) * Math.pow(1 - STEP_BACK, back);
          const d = Math.min(
            DIM_MAX,
            DIM_FIRST * Math.min(1, back) + DIM_AGE * Math.max(0, back - 1),
          );
          const ti = `scale(${s.toFixed(5)})`;
          const tp = `scale(${(z / s).toFixed(5)})`;
          const td = d.toFixed(3);
          if (ti !== it.lastI) {
            it.el.style.transform = ti;
            it.lastI = ti;
          }
          if (tp !== it.lastP) {
            it.pic.style.transform = tp;
            it.lastP = tp;
          }
          if (it.dim && td !== it.lastD) {
            it.dim.style.opacity = td;
            it.lastD = td;
          }
        }
        if (it.vid) {
          const before = k > 0 ? (o[k - 1] ?? 0) : 1;
          if (near && before > 0) attach(it);
          play(it, near && ok >= 1 && onext <= 0);
        }
      });
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const remeasure = () => {
      if (!live) return;
      measure();
      items.forEach((it) => {
        it.lastI = '';
        it.lastP = '';
        it.lastD = '';
      });
      request();
    };

    const onPlaying = (e: Event) => (e.target as HTMLElement).classList.add('is-on');
    items.forEach((it) => it.vid?.addEventListener('playing', onPlaying));

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              // one target; if a batch holds several records, the latest is the truth
              const latest = entries[entries.length - 1];
              if (latest) near = latest.isIntersecting;
              if (!near) items.forEach(release);
              request();
            },
            { rootMargin: '100% 0px 100% 0px' },
          )
        : null;

    const setLive = (on: boolean) => {
      if (on === live) return;
      live = on;
      root.classList.toggle('sx7b--live', on);
      if (on) {
        measure();
        paint(); // synchronously: the static sheet is never painted and then rewound
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        stage.style.removeProperty('--sx7b-R');
        items.forEach((it) => {
          it.el.style.transform = '';
          it.pic.style.transform = '';
          if (it.dim) it.dim.style.opacity = '';
          it.el.classList.remove('is-in');
          it.shown = false;
          it.lastI = '';
          it.lastP = '';
          it.lastD = '';
          release(it);
        });
      }
    };
    const decide = () => setLive(!reduce.matches && fits.matches);

    decide();
    io?.observe(root);
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', remeasure);
    reduce.addEventListener('change', decide);
    fits.addEventListener('change', decide);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    ro?.observe(root);

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', remeasure);
      reduce.removeEventListener('change', decide);
      fits.removeEventListener('change', decide);
      items.forEach((it) => it.vid?.removeEventListener('playing', onPlaying));
      io?.disconnect();
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      setLive(false);
    };
  }, []);

  return null;
}
