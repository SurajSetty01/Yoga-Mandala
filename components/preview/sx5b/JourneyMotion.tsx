'use client';

import { useEffect } from 'react';
import { MAG, ROOMS } from './rooms';

/**
 * §05's only client code — the walk. The section is complete without it (the stylesheet's
 * default is four rooms standing in order, each with the next in its doorway).
 *
 * WHEN IT RUNS: motion allowed, and a viewport that can hold the stage (≥ 600px tall, or a
 * landscape screen ≥ 900 wide and ≥ 540 tall). Otherwise it leaves the static page alone,
 * and it re-decides on resize and when the reduced-motion preference changes.
 *
 * THE MATHS, in the frame's own units (0–1 across, 0–1 down; every room and every opening
 * is 3:4, so an opening of width s is s × s here):
 *   · walking into opening i with eased progress u, the room you are in scales by
 *     z = (1/s)^u — logarithmic, so the approach reads at one steady speed — and the
 *     opening slides to the centre in step with that growth;
 *   · the room beyond it scales by (MAG·s)^(1−u): from MAG× the opening down to exactly
 *     the frame. It grows MORE SLOWLY than the room you are leaving — the parallax of a
 *     room seen through a door as you approach it — and it always covers the visible
 *     opening, because the opening's width z·s never catches it (MAG^(1−u) ≥ 1);
 *   · at u = 1 the opening IS the frame and the next room sits in it at scale 1, which is
 *     exactly where the next walk starts. The joins are exact, not blended.
 * Every box in the nest is laid out full-size at the origin and placed only by transform
 * (a layout offset is pixel-snapped before the zoom magnifies it; a transform is not). So a
 * room's own transform is its apparent transform divided by its parent's, re-expressed
 * inside the parent's opening.
 *
 * The rules it keeps, each learned on this site by breaking it:
 *   · one passive scroll listener that only raises a flag; all reads and writes in one rAF
 *   · geometry measured on load and resize only, never inside the frame
 *   · only `transform` and `opacity` are written per frame
 *   · the reader's scroll position is written only when they tab to a door that is not
 *     showing — so a keyboard reader lands on the room the link belongs to
 *   · no wheel or touch interception, ever
 */

/**
 * RESOLUTION ON DEMAND. At rest a room needs only the aperture's width, and that is what
 * its `sizes` asks for. The room you walk OUT of is then magnified up to seven times, so
 * shortly before each walk its `sizes` is raised and the browser swaps in the larger
 * derivative while the smaller one keeps showing — the same principle as the Rijksmuseum's
 * Night Watch viewer (Micrio), which fetches detail only for what is about to be looked at
 * closely. A reader who stops at Learn downloads one large file, not three.
 */
const ZOOM_SIZES =
  '(orientation: landscape) and (min-width: 900px) calc((100vh - 136px) * 1.9), 230vw';

/** Stage lengths in viewport heights: hold, walk, hold, walk, hold, walk, hold. */
const SEG = [0.25, 0.8, 0.35, 0.8, 0.35, 0.8, 0.25] as const;
const TOTAL = SEG.reduce((a, b) => a + b, 0); // 3.6 — the stylesheet's 4.6svh track less one screen

type Aff = { x: number; y: number; z: number };

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const smooth = (v: number) => {
  const t = clamp(v, 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * HOLD PARALLAX — how far the room beyond the opening has slid sideways, as a fraction of the
 * opening's width. While the reader stands in a room (a hold), the room beyond the opening
 * drifts across it and the room they are in does not move: the motion-parallax cue that makes
 * a hole in a wall read as a way through, where a still inset reads as a picture hung on the
 * wall (which is what the first build's Learn looked like at rest). It is scroll-linked, so it
 * reverses exactly when the reader scrolls back, and it has settled to zero by the middle of
 * each walk, so the joins between rooms stay exact.
 *
 * 0.18 of the opening: Learn's corridor is 78px wide at 1440, and at 0.1 the room beyond it
 * moved 8px across a whole hold — measured on the render, and not enough to register. The
 * room beyond is 1.5× the opening, so up to 0.25 still covers it when its focus is centred;
 * where the focus is off-centre (Practice, 0.55) the clamp in `layout` takes the rest.
 */
const DRIFT = 0.18;

/** Where every room appears on screen, walking into opening i at eased progress u. */
function layout(i: number, u: number, drift = 0): Aff[] {
  const A: Aff[] = ROOMS.map(() => ({ x: 0, y: 0, z: 1 }));
  const h = ROOMS[i]?.hole;
  const next = ROOMS[i + 1];
  if (!h || !next) return A;

  const s = h.s;
  const z = Math.pow(1 / s, u);
  const w = (z - 1) / (1 / s - 1); // 0 → 1 as the zoom completes
  const x0 = h.x * (1 - w);
  const y0 = h.y * (1 - w);
  A[i] = { x: x0 - z * h.x, y: y0 - z * h.y, z };

  // the room beyond: its focus point rides the opening's centre, drifting to the middle
  const E = Math.pow(MAG * s, 1 - u);
  const hs = z * s;
  const fx = next.focus.x + (0.5 - next.focus.x) * u;
  const fy = next.focus.y + (0.5 - next.focus.y) * u;
  let ex = x0 + hs / 2 - E * fx - drift * hs;
  let ey = y0 + hs / 2 - E * fy;
  // never let the visible part of the opening show past the picture's edge
  ex = clamp(ex, Math.min(x0 + hs, 1) - E, Math.max(x0, 0));
  ey = clamp(ey, Math.min(y0 + hs, 1) - E, Math.max(y0, 0));
  A[i + 1] = { x: ex, y: ey, z: E };

  // rooms further in: each at rest inside the one before it
  for (let j = i + 1; j < ROOMS.length - 1; j++) {
    const hj = ROOMS[j]?.hole;
    const nj = ROOMS[j + 1];
    const Aj = A[j];
    if (!hj || !nj || !Aj) break;
    const k = MAG * hj.s;
    const ox = hj.x + hj.s / 2 - k * nj.focus.x;
    const oy = hj.y + hj.s / 2 - k * nj.focus.y;
    A[j + 1] = { x: Aj.x + Aj.z * ox, y: Aj.y + Aj.z * oy, z: Aj.z * k };
  }
  // rooms already walked through: each exactly fills the opening of the one before it
  for (let j = i; j >= 1; j--) {
    const hp = ROOMS[j - 1]?.hole;
    const Aj = A[j];
    if (!hp || !Aj) break;
    A[j - 1] = { x: Aj.x - (Aj.z * hp.x) / hp.s, y: Aj.y - (Aj.z * hp.y) / hp.s, z: Aj.z / hp.s };
  }
  return A;
}

export function JourneyMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx5b');
    if (!root) return;
    const track = root.querySelector<HTMLElement>('.sx5b-track');
    const stage = root.querySelector<HTMLElement>('.sx5b-stage');
    const aperture = root.querySelector<HTMLElement>('.sx5b-aperture');
    const fill = root.querySelector<HTMLElement>('.sx5b-route__fill');
    if (!track || !stage || !aperture || !fill) return;

    const N = ROOMS.length;
    const rooms = [...aperture.querySelectorAll<HTMLElement>('.sx5b-room')];
    const imgs = rooms.map((r) => r.querySelector<HTMLElement>(':scope > .sx5b-img'));
    const edges = [...aperture.querySelectorAll<HTMLElement>('.sx5b-portal__edge')].sort(
      (a, b) => Number(a.dataset.edge) - Number(b.dataset.edge),
    );
    const doors = [...root.querySelectorAll<HTMLElement>('.sx5b-door')];
    const nums = doors.map((d) => d.querySelector<HTMLElement>('.sx5b-door__nn'));
    const words = doors.map((d) => d.querySelector<HTMLElement>('.sx5b-door__word'));
    const foots = doors.map((d) => d.querySelector<HTMLElement>('.sx5b-door__foot'));
    const stops = [...root.querySelectorAll<HTMLElement>('.sx5b-route__stop')];
    if (rooms.length !== N || doors.length !== N) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');

    let live = false;
    let top = 0; // the track's document offset
    let range = 1; // scroll distance over which the stage is pinned
    let raf = 0;
    let lastP = -1;
    let lastD = -1;

    const canLive = () =>
      !reduce.matches &&
      (innerHeight >= 600 || (innerWidth >= 900 && innerHeight >= 540 && innerWidth > innerHeight));

    const measure = () => {
      const r = track.getBoundingClientRect();
      top = r.top + scrollY;
      range = Math.max(1, track.offsetHeight - stage.offsetHeight);
    };

    /**
     * scroll → P, which room (0–3) with the walks eased and the holds flat, and D, the hold
     * parallax: it climbs 0 → DRIFT across each hold and eases back to 0 over the first half
     * of the walk that follows, so it is continuous everywhere.
     */
    const progress = (): { P: number; D: number } => {
      const pos = clamp((scrollY - top) / range, 0, 1) * TOTAL;
      let acc = 0;
      for (let k = 0; k < SEG.length; k++) {
        const len = SEG[k] ?? 0;
        if (pos <= acc + len || k === SEG.length - 1) {
          const room = Math.floor(k / 2);
          const t = clamp((pos - acc) / len, 0, 1);
          if (k % 2 === 0) return { P: room, D: room < N - 1 ? DRIFT * t : 0 };
          const u = smooth(t);
          return { P: room + u, D: DRIFT * (1 - smooth(u / 0.5)) };
        }
        acc += len;
      }
      return { P: N - 1, D: 0 };
    };

    const write = (P: number, D: number) => {
      // which walk we are on, and how far into it
      const i = Math.min(Math.floor(P), N - 2);
      const u = P - i;
      const A = layout(i, u, D);

      for (let j = 0; j < N; j++) {
        const a = A[j];
        const el = rooms[j];
        if (!a || !el) continue;
        // room j's transform within room j-1 …
        const p = j === 0 ? { x: 0, y: 0, z: 1 } : A[j - 1];
        if (!p) continue;
        let ox = (a.x - p.x) / p.z;
        let oy = (a.y - p.y) / p.z;
        let sc = a.z / p.z;
        // … re-expressed inside room j-1's OPENING, which is a full-size box scaled to it
        const ph = j === 0 ? null : ROOMS[j - 1]?.hole;
        if (ph) {
          ox = (ox - ph.x) / ph.s;
          oy = (oy - ph.y) / ph.s;
          sc = sc / ph.s;
        }
        el.style.transform = `translate(${(ox * 100).toFixed(4)}%, ${(oy * 100).toFixed(4)}%) scale(${sc.toFixed(5)})`;
        // a room already walked through is entirely behind the one inside it; one too
        // deep to see is sub-pixel. Neither is painted.
        const img = imgs[j];
        if (img) img.style.opacity = j < i || j > i + 2 ? '0' : '1';
      }
      edges.forEach((e, j) => {
        const o = j === i ? 1 - smooth((u - 0.3) / 0.45) : j > i ? 1 : 0;
        e.style.opacity = o.toFixed(3);
      });

      /*
       * THE NAMES ROLL, THEY DO NOT FADE. All four names share one clipped window (and the
       * numerals another), and R — the walk's progress, compressed into the stretch where the
       * doorway sweeps past the frame — carries them through it like a counter: the name you
       * are leaving rises out of the top as the name of the room you are entering rises in
       * from below. At every scroll position one name, or the two halves of a change, is on
       * screen; the first build faded both out and left the column empty mid-walk.
       *
       * The sentence and the link cannot roll (two sentences half-visible is noise), so they
       * leave in the first third of the walk and arrive in the last — fully opaque in every
       * hold, which is where they are read.
       */
      const R = i + smooth((u - 0.34) / 0.44);
      const out = smooth(u / 0.34);
      const inn = smooth((u - 0.66) / 0.3);
      for (let j = 0; j < N; j++) {
        const d = clamp(j - R, -1, 1);
        const w = words[j];
        const n = nums[j];
        const f = foots[j];
        // 120%: the name's clip is its line plus the descender padding, so a full line of
        // travel would leave the tops of the letters showing in that padding
        // and each half of a change is dimmed by how far it is from home, so the frame
        // halfway through reads as one name giving way to another, not as two cut words
        const o = (1 - Math.abs(d) * 0.85).toFixed(3);
        if (w) {
          w.style.transform = `translateY(${(d * 120).toFixed(2)}%)`;
          w.style.opacity = o;
        }
        if (n) {
          n.style.transform = `translateY(${(d * 120).toFixed(2)}%)`;
          n.style.opacity = o;
        }
        let a = 0;
        if (j === i) a = 1 - out;
        else if (j === i + 1) a = inn;
        if (f) {
          f.style.opacity = a.toFixed(3);
          f.style.transform = `translateY(${((1 - a) * (j <= i ? -12 : 12)).toFixed(2)}px)`;
        }
        const door = doors[j];
        if (door) door.toggleAttribute('data-on', a > 0.5);
      }

      // fetch detail for the room about to be walked out of
      for (let j = 0; j < N - 1; j++) {
        const img = imgs[j];
        if (img instanceof HTMLImageElement && P > j - 0.45 && img.sizes !== ZOOM_SIZES) img.sizes = ZOOM_SIZES;
      }

      fill.style.transform = `scaleX(${(P / (N - 1)).toFixed(4)})`;
      stops.forEach((s, j) => s.toggleAttribute('data-past', j <= P + 0.02));
    };

    const frame = () => {
      raf = 0;
      if (!live) return;
      const { P, D } = progress();
      // D alone moves in the holds, where P stands still
      if (Math.abs(P - lastP) < 1e-4 && Math.abs(D - lastD) < 1e-5) return;
      lastP = P;
      lastD = D;
      write(P, D);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const clear = () => {
      const all = [...rooms, ...imgs, ...edges, ...nums, ...words, ...foots, fill];
      all.forEach((el) => {
        if (!el) return;
        el.style.removeProperty('transform');
        el.style.removeProperty('opacity');
      });
      doors.forEach((d) => d.removeAttribute('data-on'));
      stops.forEach((s) => s.removeAttribute('data-past'));
    };

    const decide = () => {
      const want = canLive();
      if (want !== live) {
        live = want;
        root.classList.toggle('sx5b--live', live);
        if (!live) clear();
      }
      if (live) {
        measure();
        lastP = -1;
        frame();
      }
    };

    /** Tabbing to a door that is not showing walks the page to it — instantly. */
    const onFocus = (e: FocusEvent) => {
      if (!live) return;
      const door = (e.target as HTMLElement | null)?.closest<HTMLElement>('.sx5b-door');
      if (!door || door.hasAttribute('data-on')) return;
      const j = Number(door.dataset.door);
      let acc = 0;
      for (let k = 0; k < 2 * j; k++) acc += SEG[k] ?? 0;
      const mid = acc + (SEG[2 * j] ?? 0) / 2;
      window.scrollTo({ top: top + (mid / TOTAL) * range, behavior: 'instant' });
    };

    decide();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', decide);
    reduce.addEventListener('change', decide);
    root.addEventListener('focusin', onFocus);
    const ro = new ResizeObserver(() => {
      if (live) {
        measure();
        lastP = -1;
        onScroll();
      }
    });
    ro.observe(document.body);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', decide);
      reduce.removeEventListener('change', decide);
      root.removeEventListener('focusin', onFocus);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove('sx5b--live');
      clear();
    };
  }, []);

  return null;
}
