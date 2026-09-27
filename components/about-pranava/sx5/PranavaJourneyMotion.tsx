'use client';

import { useEffect } from 'react';
import { ROOMS, nest } from './rooms';

/**
 * The walk. This island moves ONE camera through the enfilade and nothing else.
 *
 * THE CAMERA, AS ARITHMETIC. The rooms are placed in the first room's coordinates
 * (rooms.ts). The camera at t ∈ [0, 3] is a view rectangle in those coordinates, and each
 * room's transform is simply "where that room lands inside the view": x = (P_k − V) / Z,
 * s = s_k / Z. Between rest n and rest n+1 the view shrinks from room n's box to its
 * opening, and it does so the way Powers of Ten does — by a CONSTANT FACTOR per unit of
 * scroll (z = r^u), about the one point the zoom leaves in place, f = o / (1 − r). Linear
 * interpolation of scale looks like a lurch that stalls; the exponential reads as walking
 * at an even pace. A cosine ease on u lets each walk start and stop at a doorway.
 *
 * THE SCROLL MAP. p ∈ [0, 1] over the pinned travel: a short hold on the threshold, then
 * three walks with a hold in each room while its door is read, and a longer hold at the end
 * under the trees. H0, H and HE below are those holds as fractions of the travel.
 *
 * WHAT CHANGES PER FRAME, and all of it is transform or opacity: each room's transform; the
 * veil that darkens a room as it becomes the doorframe you stand in; the shadowed reveal of
 * the doorway you are walking through (it fades as its room becomes the room you are in);
 * the sign beside the next door; and which door's words are showing.
 *
 * WHEN IT DOES NOTHING. Under prefers-reduced-motion, and on a viewport shorter than 600px
 * (where a pinned stage would crop its own words), `.sx5-journey--live` is never added and
 * the reader has the server-rendered section: the whole vista from the first threshold with
 * all four doors listed. Both media queries are listened to, so switching either mid-read
 * restores that at once, and the clip is released.
 *
 * The rules this obeys, each a bug the project has already shipped:
 *   · one passive scroll listener that only requests a frame; every read of scrollY and
 *     every write happens inside that one requestAnimationFrame;
 *   · geometry is measured on load, resize and a ResizeObserver tick, never per frame;
 *   · the reader's scroll position is never written — except to bring a door that has
 *     received keyboard FOCUS into view, which is what the browser would do for any
 *     focused element that was not stacked behind another;
 *   · the clip is attached when the section is within a screen, released when it is more
 *     than a screen away, and never attached at all under reduced motion.
 */

const N = ROOMS.length - 1; // three doorways to walk through
const H0 = 0.06; // on the threshold
const H = 0.12; // in each room
const HE = 0.1; // under the trees
const P = (1 - H0 - (N - 1) * H - HE) / N; // each walk
const CLIP_RATE = 0.6; // the practice clip, slowed at the owner's review

const PLACED = nest();
const OPEN = ROOMS.map((r) => r.opening);
const ORIGIN = { x: 0, y: 0, s: 1 };
const SHUT = { x: 0, y: 0, r: 1 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => v * v * (3 - 2 * v);

/** scroll progress → camera position t (integers are the rooms, at rest) */
function tOf(p: number): number {
  if (p <= H0) return 0;
  let q = p - H0;
  for (let i = 0; i < N; i++) {
    if (q < P) return i + (0.5 - 0.5 * Math.cos(Math.PI * (q / P)));
    q -= P;
    if (i < N - 1) {
      if (q < H) return i + 1;
      q -= H;
    }
  }
  return N;
}

/** the progress at which room i is standing still, for a door that receives focus */
function restP(i: number): number {
  if (i <= 0) return 0;
  const base = H0 + i * P + (i - 1) * H;
  return i < N ? base + H / 2 : base + HE / 2;
}

/** the view rectangle, in the first room's coordinates */
function camera(t: number) {
  const n = Math.min(Math.floor(t), N - 1);
  const u = t - n;
  // every room but the last has an opening, and n never reaches the last (see above)
  const o = OPEN[n] ?? SHUT;
  const fx = o.r < 1 ? o.x / (1 - o.r) : 0;
  const fy = o.r < 1 ? o.y / (1 - o.r) : 0;
  const z = Math.pow(o.r, u);
  const at = PLACED[n] ?? ORIGIN;
  return { X: at.x + at.s * fx * (1 - z), Y: at.y + at.s * fy * (1 - z), Z: at.s * z };
}

/**
 * How far the room you are leaving has darkened into a doorframe. It is fully dark by 4.5% of
 * the walk, when the room has grown ~15px past the view: on a phone the words sit 27px under
 * the view, and a veil that finished at 12% let the room reach them half-lit (measured 3.85:1
 * under the register mark at 390x844). The veil is the words' ground, so it must be there
 * before the room is.
 *
 * TWO doorways back the room goes all the way to the ground (by 1.6 rooms), and is then not
 * drawn. At 0.9 it stayed 10% visible beyond the rim of the room one back, so the edge where
 * that rim ended ran across a 2560 screen as a line.
 */
function veil(d: number): number {
  if (d >= 0) return 0;
  const a = -d;
  if (a <= 1) return 0.8 * smooth(Math.min(1, a / 0.045));
  return Math.min(1, 0.8 + (a - 1) / 3);
}

export function PranavaJourneyMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-sx5]');
    if (!root) return;
    const track = root.querySelector<HTMLElement>('.sx5-track');
    const stage = root.querySelector<HTMLElement>('.sx5-stage');
    const rooms = [...root.querySelectorAll<HTMLElement>('.sx5-room')];
    const doors = [...root.querySelectorAll<HTMLElement>('.sx5-door')];
    const words = doors.map((el) => el.querySelector<HTMLElement>('.sx5-door__word'));
    const video = root.querySelector<HTMLVideoElement>('.sx5-room__vid');
    if (!track || !stage || rooms.length !== ROOMS.length || doors.length !== ROOMS.length) return;

    const parts = rooms.map((el) => ({
      el,
      dim: el.querySelector<HTMLElement>('.sx5-room__dim'),
      rim: el.querySelector<HTMLElement>('.sx5-room__rim'),
      jamb: el.querySelector<HTMLElement>('.sx5-room__jamb'),
      plaque: el.querySelector<HTMLElement>('.sx5-room__plaque'),
      ring: el.querySelector<HTMLElement>('.sx5-room__door'),
    }));

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const fits = matchMedia('(min-height: 600px)');

    let live = false;
    let near = false;
    let raf = 0;
    let top = 0;
    let travel = 1;
    let lastT = NaN;
    // the clip's room, and whether it is behind you (then the clip stops and hides; see paint)
    const clipRoom = video ? parts.findIndex((p) => p.el.contains(video)) : -1;
    let behind = false;

    const measure = () => {
      top = track.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
    };

    const paint = () => {
      raf = 0;
      if (!live) return;
      const p = clamp01((window.scrollY - top) / travel);
      const t = tOf(p);
      if (t === lastT) return;
      lastT = t;
      const { X, Y, Z } = camera(t);

      parts.forEach(({ el, dim, rim, jamb, plaque, ring }, k) => {
        const d = k - t;
        if (k === clipRoom) {
          // Once you have walked out of the clip's room it stops and hides, and its still
          // stays under the veil. The playing clip is its own compositor layer, and past the
          // doorway it showed through the veil as a 1px lit line down the room's edge
          // (193,191,191 on the ground at 1440x900) however the veil was sized. Decided before
          // the visibility cut below, so a jump straight to the last room still stops it.
          const b = d < -0.05;
          if (b !== behind) {
            behind = b;
            el.dataset.behind = b ? '1' : '0';
            if (b) video?.pause();
            else attach();
          }
        }
        if (d < -1.6) {
          el.style.visibility = 'hidden';
          return;
        }
        el.style.visibility = '';
        const at = PLACED[k] ?? ORIGIN;
        const x = ((at.x - X) / Z) * 100;
        const y = ((at.y - Y) / Z) * 100;
        const s = at.s / Z;
        el.style.transform = `translate(${x.toFixed(3)}%, ${y.toFixed(3)}%) scale(${s.toFixed(5)})`;
        const v = veil(d);
        if (dim) dim.style.opacity = v.toFixed(3);
        // the rim arrives with the veil: a room is either the one you are in (hard frame)
        // or one you have left (edges gone into the ground), never a lit card with soft edges
        if (rim) rim.style.opacity = clamp01(v / 0.8).toFixed(3);
        if (jamb) jamb.style.opacity = clamp01((d - 0.05) / 0.3).toFixed(3);
        if (plaque) {
          // SWITCHED, not faded by scroll: a sign faded with its own ground spends half the
          // walk as cream type on a half-transparent pill over a white wall (measured 1.76:1).
          // A short CSS transition does the fade; no scroll position ever holds it half-way.
          const on = d > -0.12 && d < 0.3;
          if ((plaque.dataset.on === '1') !== on) plaque.dataset.on = on ? '1' : '0';
        }
        // a door's own frame holds until the last 40% of the walk through it, then hands
        // over to the view's unscaled frame, which it reaches exactly at the next rest
        if (ring) ring.style.opacity = (d >= -0.6 ? 1 : clamp01((1 + d) / 0.4)).toFixed(3);
      });

      const n0 = Math.min(Math.floor(t), N - 1);
      const R = n0 + smooth(clamp01((t - n0 - 0.34) / 0.44));
      doors.forEach((el, i) => {
        // The door's small parts are SWITCHED on and off, like the signs:
        // a scroll-linked fade held words at a third of their opacity wherever the reader
        // stopped mid-doorway (measured 2.6:1 at 1440x900 with the opacity composited in).
        // Now the room you leave keeps its sentence and arrow to 0.35 of the walk and the
        // next room's arrive at 0.6, with a short CSS fade.
        //
        // THE NAMES ROLL, THEY DO NOT FADE (grafted from concept B). All four share one
        // clipped window, and R — the walk compressed into the stretch where the doorway
        // sweeps past the frame — carries them through it like a counter: the name you leave
        // rises out of the top as the next rises in from below, so the column is never
        // empty. 130%: the window is the line plus its ascender and descender padding.
        const w = words[i];
        if (w) {
          const dn = Math.max(-1, Math.min(1, i - R));
          w.style.transform = `translate3d(0, ${(dn * 130).toFixed(2)}%, 0)`;
        }
        const on = t > i - 0.4 && t < i + 0.35;
        if ((el.dataset.on === '1') !== on) el.dataset.on = on ? '1' : '0';
      });
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const remeasure = () => {
      if (!live) return;
      measure();
      lastT = NaN;
      request();
    };

    /* ── the clip: attached on approach, released a screen past ─────────────── */
    // It plays at CLIP_RATE. A browser puts the rate back to the default whenever a source
    // loads, so the default is set as well, and both are re-applied on loadedmetadata and
    // on every play.
    const slow = () => {
      if (!video) return;
      video.defaultPlaybackRate = CLIP_RATE;
      if (video.playbackRate !== CLIP_RATE) video.playbackRate = CLIP_RATE;
    };
    const attach = () => {
      if (!video || !live || !near || behind) return;
      if (!video.getAttribute('src')) {
        video.muted = true;
        slow();
        video.src = video.dataset.src ?? '';
      }
      slow();
      const go = video.play();
      if (go) go.catch(() => {});
    };
    const release = () => {
      if (!video) return;
      video.pause();
      video.classList.remove('is-playing');
      if (video.getAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
    };
    const onPlaying = () => video?.classList.add('is-playing');
    video?.addEventListener('playing', onPlaying);
    video?.addEventListener('loadedmetadata', slow);
    video?.addEventListener('play', slow);
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const e = entries[entries.length - 1];
              if (!e) return;
              near = e.isIntersecting;
              if (near) attach();
              else release();
            },
            { rootMargin: '100% 0px 100% 0px' },
          )
        : null;
    io?.observe(root);

    const clear = () => {
      parts.forEach(({ el, dim, rim, jamb, plaque, ring }) => {
        el.style.removeProperty('transform');
        el.style.removeProperty('visibility');
        dim?.style.removeProperty('opacity');
        rim?.style.removeProperty('opacity');
        jamb?.style.removeProperty('opacity');
        if (plaque) delete plaque.dataset.on;
        delete el.dataset.behind;
        ring?.style.removeProperty('opacity');
      });
      doors.forEach((el) => delete el.dataset.on);
      words.forEach((w) => w?.style.removeProperty('transform'));
    };

    const setLive = (on: boolean) => {
      if (on === live) return;
      live = on;
      root.classList.toggle('sx5-journey--live', on);
      if (on) {
        measure();
        lastT = NaN;
        paint(); // synchronously, so the still vista is never painted and then replaced
        attach();
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        clear();
        behind = false;
        release();
      }
    };
    const decide = () => setLive(!reduce.matches && fits.matches);

    /* A door stacked behind the one showing can still take keyboard focus; bring the
       reader to the room it belongs to, so the focused link is the one on screen. */
    const onFocus = (e: FocusEvent) => {
      if (!live) return;
      const li = (e.target as Element | null)?.closest<HTMLElement>('[data-door]');
      if (!li) return;
      const i = Number(li.dataset.door);
      const y = Math.round(top + restP(i) * travel);
      if (Math.abs(window.scrollY - y) > 4) window.scrollTo({ top: y, behavior: 'instant' });
    };

    decide();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', remeasure);
    root.addEventListener('focusin', onFocus);
    reduce.addEventListener('change', decide);
    fits.addEventListener('change', decide);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    ro?.observe(document.body);

    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', remeasure);
      root.removeEventListener('focusin', onFocus);
      reduce.removeEventListener('change', decide);
      fits.removeEventListener('change', decide);
      video?.removeEventListener('playing', onPlaying);
      video?.removeEventListener('loadedmetadata', slow);
      video?.removeEventListener('play', slow);
      ro?.disconnect();
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      setLive(false);
    };
  }, []);

  return null;
}
