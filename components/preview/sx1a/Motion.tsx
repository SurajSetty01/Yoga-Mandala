'use client';

import { useEffect } from 'react';
import { SX1A_FRAMES } from './frames';

/**
 * SX1A's one client island: the exchange.
 *
 * Three plates, each built at the size of the page band. Every frame each plate is given a
 * BOX (where it is on the stage) and a REGION (which part of its photograph that box
 * shows). The box moves between the plate's slot in the sentence and the band; the region
 * moves between the stamp's tight crop — the paper, the legs, the hand — and the band's
 * wide one. So a stamp does not get blown up: its crop OPENS as it grows.
 *
 * One exchange, t = 0 → 1:
 *   · the INCOMING photograph rises out of its word and spreads over the page, on top of
 *     everything. Its lower edge reaches the band's edge first, so it clears the sentence
 *     while it is still small and never sits across the words for long;
 *   · the OUTGOING photograph shrinks where it is, UNDER the incoming one, anchored to the
 *     band's lower edge — then slips out from under that edge and drops into its word.
 *   The page is never empty and the two never arrive at the same time.
 *
 * It is FLIP with the inverse carried one level down:
 *   figure   translate + non-uniform scale    — the box takes any size and aspect
 *   img      counter-scale + translate        — the photograph inside stays UNIFORM
 * which is the only way to change a box's aspect with `transform` alone without stretching
 * the photograph in it. Only `transform` is written per frame; `z-index` and one data
 * attribute change a handful of times in the whole hero.
 *
 * Rules, each a bug this site has already shipped once:
 *   · one passive scroll listener that only raises a flag; all reads/writes in one rAF;
 *   · geometry measured on load / resize / ResizeObserver / fonts, never in the frame;
 *   · the reader's scroll position is never written; no wheel or touch interception.
 *
 * THREE MODES, chosen by two media queries the stylesheet uses verbatim:
 *   static   no JavaScript, or a viewport under 520px tall: one screen, the first plate
 *            full-bleed, two stamps in the sentence. Complete on its own.
 *   live     the exchange above.
 *   calm     prefers-reduced-motion: the SAME stage and thresholds, but nothing
 *            translates or scales — one data attribute flips three times and the page
 *            and the stamps dissolve. The idea (each noun takes the page in turn while the
 *            other two stay in the sentence) survives; only the travel is removed.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Region = { cx: number; cy: number; w: number };

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* the timeline across the sticky stage's travel, as fractions of it:
   hold · study→practice · hold · practice→transmission · hold */
const T = [0.1, 0.44, 0.56, 0.9] as const;

export function Sx1aMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx1a');
    if (!root) return;
    const track = root.querySelector<HTMLElement>('.sx1a-track');
    const stage = root.querySelector<HTMLElement>('.sx1a-stage');
    const zone = root.querySelector<HTMLElement>('.sx1a-zone');
    const sub = root.querySelector<HTMLElement>('.sx1a-sub[data-active]');
    const plates = [...root.querySelectorAll<HTMLElement>('.sx1a-plate')];
    const imgs = plates.map((p) => p.querySelector('img'));
    const slots = [...root.querySelectorAll<HTMLElement>('.sx1a-slot')];
    const stamps = [...root.querySelectorAll<HTMLImageElement>('.sx1a-stamp')];
    if (!track || !stage || !zone || !sub || plates.length !== 3 || slots.length !== 3) return;

    /* the stylesheet gates every enhanced rule on these SAME two queries */
    const liveGate = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 520px)');
    const calmGate = matchMedia('(prefers-reduced-motion: reduce) and (min-height: 520px)');

    let Z: Rect = { x: 0, y: 0, w: 1, h: 1 };
    let S: Rect[] = [];
    /** each stamp's region, in band-local px, before it is fitted to a box */
    let R: Region[] = [];
    let trackTop = 0;
    let travel = 1;
    let mode: 'static' | 'live' | 'calm' = 'static';
    let active = -1;
    const zNow = [-1, -1, -1];

    function rel(el: Element, base: DOMRect): Rect {
      const r = el.getBoundingClientRect();
      return { x: r.left - base.left, y: r.top - base.top, w: r.width || 1, h: r.height || 1 };
    }

    function measure() {
      /* the same three crops, chosen by the same queries, as the stylesheet */
      const crop = innerWidth <= 719 ? 'yNarrow' : innerWidth / innerHeight >= 2 ? 'yWide' : 'y';
      const sb = stage!.getBoundingClientRect();
      Z = rel(zone!, sb);
      S = slots.map((s) => rel(s, sb));
      const tr = track!.getBoundingClientRect();
      trackTop = tr.top + scrollY;
      travel = Math.max(1, tr.height - stage!.offsetHeight);

      R = SX1A_FRAMES.map((f) => {
        /* where object-fit:cover puts the source in the band: in source units the frame
           is ratio x 1, object-position 50% across and y% down */
        const sc = Math.max(Z.w / f.ratio, Z.h);
        const rw = f.ratio * sc;
        const rh = sc;
        const ox = (Z.w - rw) * 0.5;
        const oy = (Z.h - rh) * (f[crop] / 100);
        return { cx: ox + f.stamp.cx * rw, cy: oy + f.stamp.cy * rh, w: f.stamp.w * rw };
      });
    }

    /** show `reg` of plate i's photograph inside `box` — uniform scale, always covered */
    function apply(i: number, box: Rect, reg: Region) {
      let rw = Math.min(reg.w, Z.w);
      let rh = (rw * box.h) / box.w;
      if (rh > Z.h) {
        rh = Z.h;
        rw = (rh * box.w) / box.h;
      }
      if (rw > Z.w) {
        rw = Z.w;
        rh = (rw * box.h) / box.w;
      }
      const rx = clamp(reg.cx - rw / 2, 0, Z.w - rw);
      const ry = clamp(reg.cy - rh / 2, 0, Z.h - rh);
      const m = box.w / rw;
      const sx = box.w / Z.w;
      const sy = box.h / Z.h;
      const pl = plates[i];
      if (!pl) return;
      pl.style.transform = `translate3d(${(box.x - Z.x).toFixed(2)}px,${(box.y - Z.y).toFixed(2)}px,0) scale(${sx.toFixed(5)},${sy.toFixed(5)})`;
      const img = imgs[i];
      if (img)
        img.style.transform = `translate3d(${((-m * rx) / sx).toFixed(2)}px,${((-m * ry) / sy).toFixed(2)}px,0) scale(${(m / sx).toFixed(5)},${(m / sy).toFixed(5)})`;
    }

    /* indexed reads, typed: a missing slot or region falls back to the page itself */
    const whole = (): Region => ({ cx: Z.w / 2, cy: Z.h / 2, w: Z.w });
    const slotOf = (i: number): Rect => S[i] ?? Z;
    const stampOf = (i: number): Region => R[i] ?? whole();

    const regionAt = (i: number, u: number): Region => {
      const r = stampOf(i);
      return { cx: lerp(r.cx, Z.w / 2, u), cy: lerp(r.cy, Z.h / 2, u), w: lerp(r.w, Z.w, u) };
    };

    function still(i: number, big: boolean) {
      if (big) apply(i, Z, whole());
      else apply(i, slotOf(i), stampOf(i));
      setZ(i, big ? 1 : 3);
    }

    /** the incoming plate, t 0→1: rise out of the word at word size until it stands on
        the seam between page and sentence, then spread up and outward from that seam */
    function incoming(i: number, t: number) {
      const s = slotOf(i);
      const lift = ease(clamp(t / 0.16, 0, 1));
      const grow = ease(clamp((t - 0.12) / 0.5, 0, 1));
      const w = lerp(s.w, Z.w, grow);
      const h = lerp(s.h, Z.h, grow);
      const cx = lerp(s.x + s.w / 2, Z.x + Z.w / 2, grow);
      const bottom = lerp(s.y + s.h, Z.y + Z.h, lift);
      apply(i, { x: cx - w / 2, y: bottom - h, w, h }, regionAt(i, grow));
      setZ(i, t >= 1 ? 1 : 5);
    }

    /** the outgoing plate, t 0→1: shrink under the incoming one, then drop into its word */
    function outgoing(i: number, t: number) {
      const s = slotOf(i);
      const u = 1 - ease(clamp((t - 0.42) / 0.38, 0, 1)); // size: 1 → 0
      const d = ease(clamp((t - 0.78) / 0.22, 0, 1)); // drop: 0 → 1
      const w = lerp(s.w, Z.w, u);
      const h = lerp(s.h, Z.h, u);
      const cx = lerp(s.x + s.w / 2, Z.x + Z.w / 2, u);
      const bottom = lerp(Z.y + Z.h, s.y + s.h, d);
      apply(i, { x: cx - w / 2, y: bottom - h, w, h }, regionAt(i, u));
      setZ(i, t <= 0 ? 1 : t >= 1 ? 3 : 4);
    }

    function setZ(i: number, z: number) {
      if (zNow[i] === z) return;
      zNow[i] = z;
      const pl = plates[i];
      if (pl) pl.style.zIndex = String(z);
    }

    function setActive(a: number) {
      if (a === active) return;
      active = a;
      sub!.dataset.active = String(a);
      root!.dataset.active = String(a);
    }

    function progress() {
      return clamp((scrollY - trackTop) / travel, 0, 1);
    }

    function frame() {
      queued = false;
      if (mode === 'calm') {
        /* the calm exchange: the same thresholds, and nothing moves — the page and the
           stamps DISSOLVE on one attribute, as Reduce Motion replaces a zoom everywhere */
        const p = progress();
        setActive(p < (T[0] + T[1]) / 2 ? 0 : p < (T[2] + T[3]) / 2 ? 1 : 2);
        return;
      }
      if (mode !== 'live') return;
      const p = progress();
      const t0 = clamp((p - T[0]) / (T[1] - T[0]), 0, 1);
      const t1 = clamp((p - T[2]) / (T[3] - T[2]), 0, 1);

      if (t0 <= 0) {
        still(0, true);
        still(1, false);
        still(2, false);
      } else if (t0 < 1) {
        outgoing(0, t0);
        incoming(1, t0);
        still(2, false);
      } else if (t1 <= 0) {
        still(0, false);
        still(1, true);
        still(2, false);
      } else if (t1 < 1) {
        still(0, false);
        outgoing(1, t1);
        incoming(2, t1);
      } else {
        still(0, false);
        still(1, false);
        still(2, true);
      }
      setActive(t1 >= 0.5 ? 2 : t0 >= 0.5 ? 1 : 0);
    }

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    /* In both enhanced modes every photograph is announced ONCE, by its plate: the stamps
       are the same photographs at word size, so they give up their alt text while the
       plates are displayed, and get it back if the page falls back to static. */
    const stampAlts = stamps.map((im) => im.alt);
    function stampsSilent(silent: boolean) {
      stamps.forEach((im, i) => {
        im.alt = silent ? '' : (stampAlts[i] ?? '');
      });
    }

    function stop() {
      mode = 'static';
      root!.classList.remove('is-live', 'is-ready', 'is-calm');
      plates.forEach((pl, i) => {
        pl.style.transform = '';
        pl.style.zIndex = '';
        const img = imgs[i];
        if (img) img.style.transform = '';
      });
      zNow.fill(-1);
      active = -1;
      setActive(0);
      stampsSilent(false);
    }

    function start(next: 'live' | 'calm') {
      if (mode === next) return;
      stop();
      mode = next;
      stampsSilent(true);
      if (next === 'calm') {
        root!.classList.add('is-calm');
        return;
      }
      root!.classList.add('is-live');
      /* the static stamps stay visible under the live plates until the plates' own files
         have decoded — there is never a moment with an empty frame in the sentence */
      Promise.all(
        imgs.map((im) =>
          im && !im.complete ? new Promise((r) => im.addEventListener('load', r, { once: true })) : null,
        ),
      ).then(() => {
        if (mode === 'live') root!.classList.add('is-ready');
      });
    }

    /* start → measure → frame, synchronously: `.is-live` displays the two hidden plates at
       full band size, and they must be in their words before the browser paints them once */
    const onResize = () => {
      if (liveGate.matches) start('live');
      else if (calmGate.matches) start('calm');
      else {
        stop();
        return;
      }
      measure();
      frame();
    };

    onResize();

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);
    liveGate.addEventListener('change', onResize);
    calmGate.addEventListener('change', onResize);
    document.fonts?.ready.then(onResize);
    const ro = new ResizeObserver(() => {
      if (mode !== 'static') {
        measure();
        onScroll();
      }
    });
    ro.observe(root);

    return () => {
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      liveGate.removeEventListener('change', onResize);
      calmGate.removeEventListener('change', onResize);
      stop();
    };
  }, []);

  return null;
}
