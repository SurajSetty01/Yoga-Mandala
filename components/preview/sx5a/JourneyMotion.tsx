'use client';

import { useEffect } from 'react';
import { ROOMS } from './rooms';

/**
 * The section's only client island: it walks the reader into the pictures. ("Door" below is
 * whichever opening a room has — a mounted print, or the Heal room's own open door; the
 * arithmetic is the same.)
 *
 * THE WALK, AS ARITHMETIC. Every step's words have a centre; c[k] is the scroll position at
 * which step k's words sit on the reading line (half-way down a desktop screen, three
 * quarters down a phone, where the plate rides low). Between two of those lines the reader
 * passes through one door:
 *
 *   rest in room k            c[k] − B … c[k] + A
 *   push through door k       c[k] + A … c[k+1] − B      e runs 0 → 1
 *
 * During a push the room you are in scales about its door's centre, Z = Zend^e — the
 * exponential zoom of the Eameses' Powers of Ten, which is what makes an approach read at
 * a constant rate rather than rushing at the end; Zend is exactly what it takes for the
 * door to cover the stage. The room beyond is a second plane further off, so it grows by
 * the perspective of that depth — slowly at first, then catching up (two planes scaling at
 * two rates is what reads as depth: the move behind Telescope's layered zoom) — and
 * reaches its own resting size at the moment the door clears the frame. Its growth is then
 * raised wherever needed so that it always fills the door (nothing behind it is ever
 * seen), and on arrival the next figure
 * takes over at pixel-identical rest: same box, same file. Its own print is then hung — the
 * next room fades into it — over the first 14% of a screen of the rest. The mount scales
 * with its room, and fades as it sweeps out past the edges: you pass through it.
 *
 * WHEN IT DOES NOTHING. Under prefers-reduced-motion `.sx5a--live` is never added and the
 * reader keeps the finished, server-rendered chain: five rooms, each holding the next. The query
 * is listened to, so turning it on mid-read restores that immediately.
 *
 * The rules it obeys, each one a bug this project has already shipped:
 *   · one passive scroll listener that only requests a frame; every read of scrollY and
 *     every write happens inside that one requestAnimationFrame;
 *   · geometry is measured on load and resize, never per frame;
 *   · per frame only transform and opacity change;
 *   · the reader's scroll position is never written, wheel and touch are never touched;
 *   · the one clip is attached when the section is near, released a screen past it, and has
 *     no poster attribute — the <img> beneath it is the poster.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Geo = {
  room: HTMLElement;
  view: HTMLElement | null;
  inner: HTMLImageElement | null;
  jamb: HTMLElement | null;
  sign: HTMLElement | null;
  O: Rect; // room box at rest, stage px
  R0: Rect; // door at rest, stage px
  D: [number, number]; // door centre
  Zend: number;
  // the next room, as it will be at rest
  N: Rect;
  q: [number, number]; // its anchor inside its own box, px
  c0: number; // its scale when framed by the door (object-fit: cover)
  P0: [number, number];
};

const A = 0.18; // rest after the words pass the line, in screens
const B = 0.28; // rest before they reach it
const OPEN = 0.14; // how long a door takes to open on arrival

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function JourneyMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-sx5a]');
    if (!root) return;
    const track = root.querySelector<HTMLElement>('.sx5a-track');
    const figs = [...root.querySelectorAll<HTMLElement>('.sx5a-fig')];
    const copies = [...root.querySelectorAll<HTMLElement>('.sx5a-step .sx5a-copy__in')];
    const video = root.querySelector<HTMLVideoElement>('.sx5a-room__video');
    if (!track || figs.length !== ROOMS.length + 1 || copies.length !== figs.length) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const wide = matchMedia('(min-width: 900px)');
    const clipFig = ROOMS.findIndex((r) => r.media.kind === 'clip') + 1;

    let live = false;
    let raf = 0;
    let vh = 1;
    let W = 1;
    let H = 1;
    let c: number[] = [];
    let geo: (Geo | null)[] = [];
    let current = -1;
    let clipOn = false;

    const rel = (el: Element, s: DOMRect): Rect => {
      const r = el.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    };

    const reset = () => {
      figs.forEach((f) => {
        f.classList.remove('is-on');
        f.querySelectorAll<HTMLElement>('.sx5a-room, .sx5a-door__img, .sx5a-door__view, .sx5a-door__jamb').forEach((el) => {
          el.style.transform = '';
          el.style.opacity = '';
        });
        f.querySelector('.sx5a-door__sign')?.classList.remove('is-shown');
        f.querySelector<HTMLElement>('.sx5a-door__view')?.style.removeProperty('--iw');
        f.querySelector<HTMLElement>('.sx5a-door__view')?.style.removeProperty('--ih');
      });
      current = -1;
    };

    const measure = () => {
      vh = window.innerHeight;
      // clear every transform so what is read is the resting geometry
      figs.forEach((f) =>
        f.querySelectorAll<HTMLElement>('.sx5a-room, .sx5a-door__img').forEach((el) => (el.style.transform = '')),
      );
      const s = (figs[1] ?? figs[0]!).getBoundingClientRect();
      W = s.width;
      H = s.height;
      const focus = wide.matches ? 0.5 : 0.74;
      c = copies.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2 - focus * vh;
      });

      const rests = figs.map((f) => rel(f.querySelector('.sx5a-room')!, f.getBoundingClientRect()));

      geo = figs.map((f, k): Geo | null => {
        const room = f.querySelector<HTMLElement>('.sx5a-room')!;
        const door = f.querySelector<HTMLElement>('.sx5a-door');
        const next = ROOMS[k]; // figure k's door frames room k (figure k+1)
        if (!door || !next || k + 1 >= figs.length) return null;
        const sf = f.getBoundingClientRect();
        const O = rests[k];
        const N = rests[k + 1];
        if (!O || !N) return null;
        const R0 = rel(door, sf);
        const D: [number, number] = [R0.x + R0.w / 2, R0.y + R0.h / 2];
        const Zend =
          1.03 *
          Math.max(
            D[0] / Math.max(1, D[0] - R0.x),
            (W - D[0]) / Math.max(1, R0.x + R0.w - D[0]),
            D[1] / Math.max(1, D[1] - R0.y),
            (H - D[1]) / Math.max(1, R0.y + R0.h - D[1]),
            1.05,
          );
        const [u, v] = next.anchor;
        const c0 = Math.max(R0.w / N.w, R0.h / N.h);
        const q: [number, number] = [u * N.w, v * N.h];
        // object-position u v inside the door, exactly as the static CSS frames it
        const P0: [number, number] = [
          R0.x + (R0.w - c0 * N.w) * u + c0 * q[0],
          R0.y + (R0.h - c0 * N.h) * v + c0 * q[1],
        ];
        const view = door.querySelector<HTMLElement>('.sx5a-door__view');
        view?.style.setProperty('--iw', `${N.w}px`);
        view?.style.setProperty('--ih', `${N.h}px`);
        return {
          room,
          view,
          inner: door.querySelector<HTMLImageElement>('.sx5a-door__img'),
          jamb: door.querySelector<HTMLElement>('.sx5a-door__jamb'),
          sign: door.querySelector<HTMLElement>('.sx5a-door__sign'),
          O,
          R0,
          D,
          Zend,
          N,
          q,
          c0,
          P0,
        };
      });
    };

    /** place room k's door, and the room beyond it, at push progress e */
    const push = (g: Geo, e: number) => {
      const Z = Math.pow(g.Zend, e);
      const tx = (Z - 1) * (g.O.x - g.D[0]);
      const ty = (Z - 1) * (g.O.y - g.D[1]);
      g.room.style.transform = e > 0 ? `translate(${tx}px, ${ty}px) scale(${Z})` : '';

      // the door on screen now
      const dx = g.D[0] + Z * (g.R0.x - g.D[0]);
      const dy = g.D[1] + Z * (g.R0.y - g.D[1]);
      const dw = g.R0.w * Z;
      const dh = g.R0.h * Z;

      // the room beyond: a plane further off, by perspective
      const Rend = 1 / g.c0;
      let s = 1;
      let P: [number, number] = [g.N.x + g.q[0], g.N.y + g.q[1]];
      if (e < 1) {
        const z = 1 - 1 / Z;
        const zEnd = 1 - 1 / g.Zend;
        const cp =
          Rend > 1.0001 ? (g.c0 * (zEnd * Rend) / (Rend - 1)) / ((zEnd * Rend) / (Rend - 1) - z) : 1;
        const t = Rend > 1.0001 ? clamp((cp / g.c0 - 1) / (Rend - 1)) : e;
        P = [lerp(g.P0[0], P[0], t), lerp(g.P0[1], P[1], t)];
        // it must fill whatever part of the door is on screen
        const x0 = Math.max(0, dx);
        const y0 = Math.max(0, dy);
        const x1 = Math.min(W, dx + dw);
        const y1 = Math.min(H, dy + dh);
        P = [clamp(P[0], x0 + 0.5, x1 - 0.5), clamp(P[1], y0 + 0.5, y1 - 0.5)];
        const need = Math.max(
          (P[0] - x0) / Math.max(1, g.q[0]),
          (x1 - P[0]) / Math.max(1, g.N.w - g.q[0]),
          (P[1] - y0) / Math.max(1, g.q[1]),
          (y1 - P[1]) / Math.max(1, g.N.h - g.q[1]),
        );
        s = Math.max(cp, need * 1.002);
      }
      if (g.inner) {
        const ix = (P[0] - s * g.q[0] - dx) / Z;
        const iy = (P[1] - s * g.q[1] - dy) / Z;
        g.inner.style.transform = `translate(${ix}px, ${iy}px) scale(${s / Z})`;
      }
      if (g.jamb) g.jamb.style.opacity = String(1 - clamp((e - 0.55) / 0.4));
    };

    const setCurrent = (k: number) => {
      if (k === current) return;
      figs.forEach((f, i) => f.classList.toggle('is-on', i === k));
      // a figure that is not being walked through goes back to rest
      geo.forEach((g, i) => {
        if (g && i !== k) push(g, 0);
      });
      current = k;
    };

    /* The clip is started from the moment its poster was taken, so the still in the first
       door, the still the Learn room arrives as, and the clip's first painted frame are
       one picture. Walking back out through the entrance puts it back there. */
    const clipMedia = ROOMS[clipFig - 1]?.media;
    const posterAt = clipMedia && clipMedia.kind === 'clip' ? clipMedia.posterAt : 0;
    let rewound = true;
    const rewind = () => {
      if (!video || rewound) return;
      video.pause();
      video.classList.remove('is-playing');
      try {
        video.currentTime = posterAt;
      } catch {}
      rewound = true;
    };
    const clip = (near: boolean, k: number) => {
      if (!video) return;
      if (near && !clipOn) {
        video.muted = true;
        video.src = video.dataset.clip ?? '';
        try {
          video.currentTime = posterAt;
        } catch {}
        rewound = true;
        clipOn = true;
      } else if (!near && clipOn) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        video.classList.remove('is-playing');
        clipOn = false;
        rewound = true;
      }
      if (!clipOn) return;
      if (k < clipFig) rewind();
      else if (k === clipFig) {
        rewound = false;
        if (video.paused) video.play().catch(() => {});
      } else if (!video.paused) video.pause();
    };

    const paint = () => {
      raf = 0;
      if (!live) return;
      const y = window.scrollY;
      const n = figs.length;

      // which room, and how far through its door
      let k = n - 1;
      let e = 0;
      for (let i = 0; i < n - 1; i++) {
        const s0 = (c[i] ?? 0) + A * vh;
        const s1 = (c[i + 1] ?? 0) - B * vh;
        if (y < s0) {
          k = i;
          e = 0;
          break;
        }
        if (y < s1) {
          k = i;
          e = clamp((y - s0) / Math.max(1, s1 - s0));
          break;
        }
      }
      setCurrent(k);
      const g = geo[k];
      if (g) {
        push(g, e);
        // the door opens on arrival (the entrance's door is open from the start)
        const open = k === 0 ? 1 : clamp((y - ((c[k] ?? 0) - B * vh)) / (OPEN * vh));
        const o = String(open);
        if (g.view) g.view.style.opacity = o;
        if (g.jamb && e === 0) g.jamb.style.opacity = o;
        /* the name plate is never faded by the scroll: a plate at 40% opacity is a plate
           nobody can read, at whatever scroll position the reader stops. It is shown once
           the print is half up, by a short CSS fade that finishes on its own, and it leaves
           by the walk itself — it rides the print's top edge off the stage within the first
           third of the push. */
        g.sign?.classList.toggle('is-shown', open >= 0.5);
      }

      // the clip plays while its room is the one you are in or walking out of
      const t = track.getBoundingClientRect();
      clip(t.top < 2 * vh && t.bottom > -vh, k);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const remeasure = () => {
      if (!live) return;
      measure();
      current = -1; // re-applies every figure's resting state against the new geometry
      request();
    };

    const onPlaying = () => video?.classList.add('is-playing');
    video?.addEventListener('playing', onPlaying);

    const setLive = (on: boolean) => {
      if (on === live) return;
      live = on;
      root.classList.toggle('sx5a--live', on);
      if (on) {
        measure();
        paint();
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        reset();
        clip(false, -1);
      }
    };
    const decide = () => setLive(!reduce.matches);

    decide();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', remeasure);
    reduce.addEventListener('change', decide);
    wide.addEventListener('change', remeasure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    ro?.observe(track);
    // images arriving can move nothing here (every box is sized by CSS), but fonts can
    // move the words, and the words are the timeline
    document.fonts?.ready.then(remeasure).catch(() => {});

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', remeasure);
      reduce.removeEventListener('change', decide);
      wide.removeEventListener('change', remeasure);
      video?.removeEventListener('playing', onPlaying);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      setLive(false);
    };
  }, []);

  return null;
}
