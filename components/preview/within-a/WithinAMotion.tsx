'use client';

import { useEffect } from 'react';

/**
 * The single client island for concept A.
 *
 * Everything above it is a server component, so all four rooms, all twenty-five list items
 * and every photograph are in the static HTML and the page is complete before a line of this
 * runs. This mounts two things over that already-rendered DOM:
 *
 *   1. the entrances — one IntersectionObserver adding `.is-in`, with a synchronous first
 *      pass so anything already on screen at mount never waits a frame for the callback;
 *   2. the room parallax — ONE passive scroll listener that raises a flag, one rAF that
 *      reads nothing and writes only `transform` on at most six elements.
 *
 * Geometry is measured on load and on resize, never inside the scroll listener. Under
 * `prefers-reduced-motion: reduce` neither is installed at all: the CSS already ships the
 * complete static page and this returns immediately.
 */
export function WithinAMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.within-a');
    if (!root) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');

    /* ── entrances ─────────────────────────────────────────────────────────────── */
    /*
     * A GROUP is observed instead of its members. Room 01's plates start translated up to
     * 30vw / 28svh away from where they belong, which puts several of them outside the
     * viewport entirely: observed individually they never intersect, never reveal, and two
     * of the client's five items simply do not exist on the page. Observing the container —
     * which never moves — and revealing its children together is the fix, and it is the same
     * class of bug as clipping an observed element to zero (DESIGN-SYSTEM §1).
     */
    const targets = [...root.querySelectorAll<HTMLElement>('[data-wa]')];
    const groups = [...root.querySelectorAll<HTMLElement>('[data-wa-group]')];
    const inGroup = new Set<Element>();
    for (const g of groups) for (const el of g.querySelectorAll('[data-wa]')) inGroup.add(el);
    const solo = targets.filter((el) => !inGroup.has(el));

    const light = (el: Element) => {
      el.classList.add('is-in');
      for (const kid of el.querySelectorAll('[data-wa]')) kid.classList.add('is-in');
    };

    if (reduce.matches) {
      // Reveal everything immediately; nothing below is installed.
      for (const el of targets) el.classList.add('is-in');
      for (const g of groups) g.classList.add('is-in');
      return;
    }

    // Synchronous first pass. IntersectionObserver's first callback is a frame away, which
    // on a fast paint shows one frame of hidden content at the top of the page.
    const vh = innerHeight;
    const watch = [...solo, ...groups];
    for (const el of watch) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) light(el);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          light(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    for (const el of watch) if (!el.classList.contains('is-in')) io.observe(el);

    /* ── parallax ──────────────────────────────────────────────────────────────── */
    /*
     * Each `[data-par]` is the picture inside one room's sticky stage. Its own track is the
     * scroll range over which that room exists, so progress is measured against the track,
     * not the element — the element is stuck and never moves.
     */
    type Par = { el: HTMLElement; top: number; span: number; amt: number };
    let items: Par[] = [];

    const measure = () => {
      items = [...root.querySelectorAll<HTMLElement>('[data-par]')].flatMap((el) => {
        const track = el.closest<HTMLElement>('[data-track]');
        if (!track) return [];
        const box = track.getBoundingClientRect();
        const span = Math.max(box.height - innerHeight, 1);
        return [
          {
            el,
            top: box.top + scrollY,
            span,
            amt: Number(el.dataset.par) || 6,
          },
        ];
      });
    };

    let queued = false;
    const write = () => {
      queued = false;
      const y = scrollY;
      for (const it of items) {
        const p = Math.min(1, Math.max(0, (y - it.top) / it.span));
        it.el.style.transform = `translate3d(0, ${((p - 0.5) * it.amt).toFixed(3)}%, 0)`;
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(write);
    };

    measure();
    write();

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        measure();
        write();
      }, 140);
    };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      clearTimeout(rt);
    };
  }, []);

  return null;
}
