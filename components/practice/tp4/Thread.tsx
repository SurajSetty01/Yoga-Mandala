'use client';

import { useEffect, useRef } from 'react';
import { ROPE_HALF, ROPE_X } from './frames';

/**
 * THE THREAD. It leaves the rope where the rope leaves its photograph, drops, turns into the
 * first line of the sentence and runs through every bead, folding back at the end of each
 * line (right, then left, then right) the way a mala lies in folds, and ties off after
 * the name.
 *
 * Geometry is MEASURED from the rendered beads on load, on resize and once the fonts have
 * arrived, never guessed from a type scale: the lines fall wherever the browser wraps the
 * sentence at that width.
 *
 * The draw is scroll-linked and moves ONLY transform and opacity (DESIGN-SYSTEM §3.4):
 * every straight run is its own hairline rect, scaled from the end it grows from, and the
 * folds, the corner and the knot fade in as the length reaches them. One passive listener
 * raises a flag; the one read and every write happen inside a single rAF. Under reduced
 * motion the thread is drawn whole and never listens to scroll.
 */

const NS = 'http://www.w3.org/2000/svg';
const W = 1.25; // the thread's weight, in CSS px

type Kind = 'x' | 'y' | 'fade';
type Piece = { el: SVGElement; start: number; len: number; kind: Kind };
type Line = { top: number; bot: number; s: number; e: number; y: number; h: number };

export function Tp4Thread() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const mala = svg?.parentElement;
    if (!svg || !mala) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pieces: Piece[] = [];
    let total = 1;
    let yStart = 0;
    let yEnd = 0;
    let near = false;
    let queued = false;
    let rebuild = true;
    let raf = 0;
    let dead = false;

    const make = <K extends keyof SVGElementTagNameMap>(
      tag: K,
      attrs: Record<string, string | number>,
      parent: Element = svg,
    ): SVGElementTagNameMap[K] => {
      const el = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
      parent.appendChild(el);
      return el;
    };

    const build = () => {
      const m = mala.getBoundingClientRect();
      const rope = mala.querySelector<HTMLElement>('[data-tp4-rope]');
      const beads = Array.from(mala.querySelectorAll<HTMLElement>('[data-tp4-bead]'));
      svg.replaceChildren();
      pieces = [];
      if (!rope || beads.length === 0 || m.width === 0) return;

      svg.setAttribute('width', String(m.width));
      svg.setAttribute('height', String(m.height));
      svg.setAttribute('viewBox', `0 0 ${m.width} ${m.height}`);

      // Group the beads into the lines the browser actually wrapped them into.
      const lines: Line[] = [];
      for (const el of beads) {
        const r = el.getBoundingClientRect();
        const top = r.top - m.top;
        const bot = r.bottom - m.top;
        const cur = lines[lines.length - 1];
        if (cur && el.dataset.tp4Bead !== 'name' && top < cur.bot - 2) {
          cur.s = Math.min(cur.s, r.left - m.left);
          cur.e = Math.max(cur.e, r.right - m.left);
          if (bot - top > cur.h) {
            cur.h = bot - top;
            cur.y = (top + bot) / 2;
          }
          cur.bot = Math.max(cur.bot, bot);
        } else {
          lines.push({ top, bot, s: r.left - m.left, e: r.right - m.left, h: bot - top, y: (top + bot) / 2 });
        }
      }

      const rr = rope.getBoundingClientRect();
      const px = rr.left - m.left + ROPE_X * rr.width;
      const py = rr.bottom - m.top;
      const half = Math.max(W / 2, ROPE_HALF * rr.width);
      const L0 = lines[0];
      if (!L0) return;
      const r = Math.max(3, Math.min(20, (L0.y - py) / 2, (L0.s - px) / 2));
      const g = Math.max(6, Math.min(14, L0.h * 0.16));

      let acc = 0;
      const push = (el: SVGElement, len: number, kind: Kind, origin?: string, start = acc) => {
        if (origin) el.style.transformOrigin = origin;
        pieces.push({ el, start, len: Math.max(1, len), kind });
        acc = Math.max(acc, start + len);
      };

      // The rope narrowing into the thread, then the drop, then the turn into line one.
      const dropH = Math.max(0, L0.y - r - py);
      const taper = Math.min(44, dropH * 0.6);
      const defs = make('defs', {});
      const grad = make('linearGradient', { id: 'tp4-taper', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      make('stop', { offset: 0, class: 'tp4-t0' }, grad);
      make('stop', { offset: 1, class: 'tp4-t1' }, grad);
      push(
        make('polygon', {
          class: 'tp4-taper',
          points: `${px - half},${py} ${px + half},${py} ${px + W / 2},${py + taper} ${px - W / 2},${py + taper}`,
        }),
        taper,
        'y',
        'center top',
        0,
      );
      push(make('rect', { x: px - W / 2, y: py, width: W, height: dropH }), dropH, 'y', 'center top', 0);
      push(make('path', { d: `M${px} ${L0.y - r}Q${px} ${L0.y} ${px + r} ${L0.y}` }), 1.57 * r, 'fade');

      // Every line, and the fold that joins it to the next.
      let dir = 1;
      let x = px + r;
      for (const [k, L] of lines.entries()) {
        const N = lines[k + 1];
        const end = N
          ? dir > 0
            ? Math.max(L.e, N.e) + g
            : Math.min(L.s, N.s) - g
          : dir > 0
            ? L.e + g
            : L.s - g;
        const w = Math.abs(end - x);
        push(
          make('rect', { x: Math.min(x, end), y: L.y - W / 2, width: w, height: W }),
          w,
          'x',
          dir > 0 ? 'left center' : 'right center',
        );
        if (N) {
          const room = dir > 0 ? m.width - end - 1 : end - 1;
          const b = Math.max(3, Math.min((N.y - L.y) / 2, room));
          const c = (b * 4) / 3;
          push(
            make('path', { d: `M${end} ${L.y}C${end + dir * c} ${L.y} ${end + dir * c} ${N.y} ${end} ${N.y}` }),
            N.y - L.y + b,
            'fade',
          );
          dir = -dir;
          x = end;
        } else {
          // Tied off: a loop the thread passes through, and two loose ends.
          const knot = make('g', { class: 'tp4-knot' });
          make('circle', { cx: end + dir * 5.5, cy: L.y, r: 5.5 }, knot);
          make('path', { d: `M${end + dir * 10} ${L.y + 2.5}Q${end + dir * 15} ${L.y + 14} ${end + dir * 14} ${L.y + 28}` }, knot);
          make('path', { d: `M${end + dir * 7} ${L.y + 5}Q${end + dir * 8} ${L.y + 16} ${end + dir * 6} ${L.y + 24}` }, knot);
          push(knot, 36, 'fade');
          yEnd = L.y;
        }
      }
      yStart = py;
      total = acc;
    };

    const progress = () => {
      const vh = window.innerHeight;
      const from = mala.getBoundingClientRect().top + yStart;
      const span = yEnd - yStart + vh * 0.28;
      return Math.min(1, Math.max(0, (vh * 0.9 - from) / span));
    };

    const paint = () => {
      queued = false;
      if (rebuild) {
        rebuild = false;
        build();
      }
      const d = (reduce.matches ? 1 : progress()) * total;
      for (const p of pieces) {
        const k = Math.min(1, Math.max(0, (d - p.start) / p.len));
        if (p.kind === 'fade') p.el.style.opacity = String(k);
        else p.el.style.transform = p.kind === 'x' ? `scaleX(${k})` : `scaleY(${k})`;
      }
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(paint);
    };
    const onScroll = () => {
      if (near && !reduce.matches) schedule();
    };
    const relayout = () => {
      if (dead) return;
      rebuild = true;
      schedule();
    };

    const io = new IntersectionObserver(
      (entries) => {
        near = entries.some((e) => e.isIntersecting);
        if (near) schedule();
      },
      { rootMargin: '30% 0px' },
    );
    io.observe(mala);
    const ro = new ResizeObserver(relayout);
    ro.observe(mala);
    window.addEventListener('scroll', onScroll, { passive: true });
    reduce.addEventListener('change', schedule);
    document.fonts?.ready.then(relayout);
    relayout();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      reduce.removeEventListener('change', schedule);
    };
  }, []);

  return <svg ref={ref} className="tp4-thread" aria-hidden="true" focusable="false" />;
}
