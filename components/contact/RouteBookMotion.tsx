'use client';

import { useEffect } from 'react';

/**
 * THE BOOK'S ONE CLIENT ISLAND. See components/contact/RouteBook.tsx for what it drives.
 *
 * It does three things, and the page is complete without any of them: with JavaScript off,
 * or under prefers-reduced-motion, `data-book` is never set and the six routes stand as six
 * open spreads with every link in reading order.
 *
 *  1. TURNS THE PAGES. The runway's scroll progress becomes a position q along the book:
 *     a short rest, then one turn per leaf, each turn eased and separated by a rest where
 *     the spread lies open. Each leaf gets `--t` (0 flat on the right, 1 turned onto the
 *     left), its shading (`--sh`, `--gl`) and its place in the stack. Everything is read
 *     and written in one requestAnimationFrame; the scroll listener only raises a flag.
 *  2. TURNS TO THE FOCUSED PAGE. Tabbing to a route's link scrolls the book to that spread,
 *     so a keyboard never lands on a page that is lying face down.
 *  3. MAKES THE CONTENTS TURN THE BOOK. A contents link scrolls to its spread and moves
 *     focus to that page, and the entry for the open spread carries aria-current.
 */

/** slots of rest before the first turn and after the last */
const LEAD = 0.35;
/** the share of one slot a turn takes; the rest of the slot the spread lies open */
const TURN = 0.62;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** smoothstep: a page accelerates off the stack and settles onto the other one */
const ease = (x: number) => x * x * (3 - 2 * x);

function enable(root: HTMLElement): (() => void) | null {
  const run = root.querySelector<HTMLElement>('.cxb-run');
  const stage = root.querySelector<HTMLElement>('.cxb-stage');
  const book = root.querySelector<HTMLElement>('.cxb-book');
  const castL = root.querySelector<HTMLElement>('.cxb-cast--l');
  const castR = root.querySelector<HTMLElement>('.cxb-cast--r');
  const toc = root.querySelector<HTMLElement>('.cxb-toc');
  if (!run || !stage || !book || !castL || !castR) return null;

  const leaves = [...book.querySelectorAll<HTMLElement>('.cxb-leaf')];
  const faces = [...book.querySelectorAll<HTMLElement>('.cxb-front')];
  const entries = [...root.querySelectorAll<HTMLAnchorElement>('.cxb-toc__a')];
  const n = leaves.length;
  const turns = n - 1;
  const span = turns + 2 * LEAD;
  const last = new Array<number>(n).fill(Number.NaN);
  let raf = 0;
  let shown = -1;

  root.dataset.book = 'on';

  /** the runway's pinned length, and where the pin starts in document coordinates */
  const geometry = () => {
    const r = run.getBoundingClientRect();
    return { top: r.top + scrollY, len: Math.max(1, r.height - stage.offsetHeight), y: -r.top };
  };

  const paint = () => {
    raf = 0;
    const g = geometry();
    const q = clamp(g.y / g.len) * span;
    let open = 0;
    let turning = -1;
    let tt = 0;

    for (let j = 0; j < n; j++) {
      /* the last leaf is the last right-hand page: it never turns */
      const t = j < turns ? ease(clamp((q - (LEAD + j + 0.5)) / TURN + 0.5)) : 0;
      if (t >= 0.5) open = j + 1;
      if (t > 0 && t < 1) {
        turning = j;
        tt = t;
      }
      if (last[j] === t) continue;
      last[j] = t;
      const leaf = leaves[j]!;
      const th = t * Math.PI;
      leaf.style.setProperty('--t', t.toFixed(4));
      /* 0 lying flat, 1 edge on: a face darkens as it turns away from the reader */
      leaf.style.setProperty('--sh', (1 - Math.abs(Math.cos(th))).toFixed(3));
      /* the sheen paper catches halfway up and halfway down */
      leaf.style.setProperty('--gl', Math.abs(Math.sin(2 * th)).toFixed(3));
      /* waiting leaves stack in reverse on the right, the moving leaf rides over both
         stacks, and a turned leaf lies on the ones turned before it */
      leaf.style.zIndex = String(t <= 0 ? 20 + n - j : t >= 1 ? 2 + j : 50);
      leaf.dataset.s = t <= 0 ? 'flat' : t >= 1 ? 'turned' : 'turning';
    }

    /* the lifted leaf's shadow on the page beneath it: widest and darkest mid-turn */
    const th = tt * Math.PI;
    const lift = turning < 0 ? 0 : Math.sin(th);
    const reach = Math.min(1, Math.abs(Math.cos(th)) + 0.22).toFixed(3);
    castR.style.opacity = turning >= 0 && tt < 0.5 ? lift.toFixed(3) : '0';
    castL.style.opacity = turning >= 0 && tt >= 0.5 ? lift.toFixed(3) : '0';
    castR.style.setProperty('--reach', reach);
    castL.style.setProperty('--reach', reach);

    if (open !== shown) {
      shown = open;
      entries.forEach((a, i) => {
        if (i === open) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(paint);
  };

  /** scroll the runway to the point where spread k lies open */
  const goTo = (k: number) => {
    const g = geometry();
    scrollTo({ top: Math.round(g.top + ((LEAD + k) / span) * g.len), behavior: 'smooth' });
  };

  const onFocus = (e: FocusEvent) => {
    const el = e.target as HTMLElement;
    /* keyboard focus only: a pointer that clicks a link is already looking at its page */
    if (!el.matches(':focus-visible')) return;
    const face = el.closest<HTMLElement>('.cxb-front');
    if (face) goTo(Number(face.dataset.k));
  };

  const onContents = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('.cxb-toc__a');
    if (!a) return;
    e.preventDefault();
    const k = Number(a.dataset.k);
    goTo(k);
    faces[k]?.focus({ preventScroll: true });
  };

  paint();
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  book.addEventListener('focusin', onFocus);
  toc?.addEventListener('click', onContents);

  return () => {
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
    book.removeEventListener('focusin', onFocus);
    toc?.removeEventListener('click', onContents);
    if (raf) cancelAnimationFrame(raf);
    delete root.dataset.book;
    for (const leaf of leaves) {
      for (const p of ['--t', '--sh', '--gl', 'z-index']) leaf.style.removeProperty(p);
      delete leaf.dataset.s;
    }
    for (const c of [castL, castR]) {
      c.style.removeProperty('opacity');
      c.style.removeProperty('--reach');
    }
    entries.forEach((a) => a.removeAttribute('aria-current'));
  };
}

export function RouteBookMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.cxb');
    if (!root) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    /* a phone held sideways has no room for a page and its words: lay the book open */
    const short = matchMedia('(max-height: 29.99rem)');
    let off: (() => void) | null = null;

    /* follow both live: turning motion off mid-visit lays the book open */
    const sync = () => {
      if (still.matches || short.matches) {
        off?.();
        off = null;
      } else if (!off) {
        off = enable(root);
      }
    };
    sync();
    still.addEventListener('change', sync);
    short.addEventListener('change', sync);
    return () => {
      still.removeEventListener('change', sync);
      short.removeEventListener('change', sync);
      off?.();
    };
  }, []);

  return null;
}
