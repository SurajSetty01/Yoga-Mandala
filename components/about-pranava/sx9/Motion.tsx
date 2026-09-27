'use client';

import { useEffect } from 'react';

/**
 * The section's only client island.
 *
 * GEOMETRY is read on load and resize only. The stage has to hold three slits and one open
 * 3:2 frame with its word and line beneath (or, on a wide screen, beside it), all below the
 * pill, so the open frame's size is solved from the screen's HEIGHT as well as its width.
 * Where that leaves a frame under 150px tall (a landscape phone), the section stays in its
 * finished static state.
 *
 * SCROLL. One passive listener raises a flag; one requestAnimationFrame reads scrollY and,
 * only when the open slit changes, writes one class and one `--sx9-y` per slit. Every move
 * that follows is a CSS transition of transform, opacity or clip-path. The stage is a
 * position: sticky element inside a taller track — the page scrolls the whole time and
 * nothing is captured.
 *
 * REDUCED MOTION never adds `sx9-live`, so the four frames stand open at 3:2.
 */
const SLITS = 4;

export function Sx9Motion() {
  useEffect(() => {
    const root = document.getElementById('sx9-values');
    const rail = root?.querySelector<HTMLElement>('.sx9-rail');
    const track = root?.querySelector<HTMLElement>('.sx9-track');
    const items = root ? Array.from(root.querySelectorAll<HTMLElement>('.sx9-v')) : [];
    if (!root || !rail || !track || items.length !== SLITS) return;

    const rm = matchMedia('(prefers-reduced-motion: reduce)');
    const lines = items.map((li) => li.querySelector<HTMLElement>('.sx9-line'));

    let live = false;
    let active = -2;
    let queued = false;
    let g = { s: 0, gap: 0, H: 0, L: 0, bt: [0, 0, 0, 0], start: 0, step: 1 };

    const set = (k: string, v: number) => root.style.setProperty(k, `${Math.round(v * 100) / 100}px`);

    const place = (a: number) => {
      active = a;
      let y = 0;
      items.forEach((li, i) => {
        const open = i === a;
        li.classList.toggle('sx9-open', open);
        li.style.setProperty('--sx9-y', `${Math.round(open ? y : y - g.bt[i]!)}px`);
        y += open ? g.H + g.L + g.gap : g.s + g.gap;
      });
    };

    const measure = () => {
      const vw = root.clientWidth;
      const vh = innerHeight;
      const pad = parseFloat(getComputedStyle(rail).paddingLeft) || 20;
      const maxW = Math.min(vw - 2 * pad, 1080);
      const pill = vw < 720 ? 80 : 100;
      const gap = vw < 720 ? 6 : 8;
      let s = Math.min(Math.max(vh * 0.085, 46), 96, maxW / 4.3);
      s = Math.round(s);
      const F = s * 0.74;
      const k = 0.62;
      const m1 = vw < 720 ? 14 : 20;
      const m2 = 4;
      const m3 = vw < 720 ? 14 : 22;
      set('--sx9-s', s);
      set('--sx9-F', F);
      root.style.setProperty('--sx9-k', String(k));
      set('--sx9-m1', m1);

      const solve = (W: number) => {
        set('--sx9-W', W);
        const lineH = Math.max(...lines.map((l) => l?.offsetHeight ?? 0));
        const L = m1 + F * k * 1.08 + m2 + lineH + m3;
        const H = Math.min(W / 1.5, vh - pill - 18 - 3 * (s + gap) - L, maxW / 1.5);
        return { H, L };
      };
      root.classList.remove('sx9-side');
      root.classList.add('sx9-measuring');
      let r = solve(maxW);
      r = solve(r.H * 1.5);
      r = solve(r.H * 1.5);
      root.classList.remove('sx9-measuring');

      /* BESIDE. On a wide screen the word and its line stand to the right of the open
         frame instead of under it, so the frame is limited only by the height the three
         slits leave and by a text column of at least 30% of the page measure, and the
         stage spans the same measure as the sections above and below it. Used wherever
         it gives the larger frame. */
      const C = rail.clientWidth - 2 * pad;
      const cg = Math.min(Math.max(vw * 0.05, 40), 96);
      const hSide = Math.min(vh - pill - 18 - 3 * (s + gap), (C - cg - Math.max(0.3 * C, 5.4 * F)) / 1.5);
      const side = vw >= 1024 && hSide > r.H;
      if (side) r = { H: hSide, L: 0 };

      live = !rm.matches && r.H >= 150;
      root.classList.toggle('sx9-live', live);
      root.classList.toggle('sx9-side', live && side);
      if (!live) {
        for (const k2 of ['--sx9-W', '--sx9-H', '--sx9-stage', '--sx9-track', '--sx9-top', '--sx9-lt', '--sx9-C', '--sx9-cg'])
          root.style.removeProperty(k2);
        items.forEach((li) => li.classList.remove('sx9-open'));
        active = -2;
        return;
      }
      const H = Math.floor(r.H);
      const W = H * 1.5;
      const stage = 3 * (s + gap) + H + r.L;
      const top = pill + Math.max(0, (vh - pill - 18 - stage) / 2);
      const step = vh * 0.55;
      set('--sx9-W', W);
      set('--sx9-H', H);
      set('--sx9-lt', H + m1 + F * k * 1.08 + m2);
      set('--sx9-stage', stage);
      set('--sx9-top', top);
      set('--sx9-track', stage + 3 * step + vh * 0.3);
      if (side) {
        set('--sx9-C', C);
        set('--sx9-cg', cg);
        /* the word grows as it steps out, as far as the column allows (at most 1.3), and
           stands on its line; the pair is set down to the frame's lower edge */
        const wordW = Math.max(1, ...items.map((li) => li.querySelector<HTMLElement>('.sx9-word')?.offsetWidth ?? 0));
        const ks = Math.min(1.3, Math.max(1, (C - W - cg) / wordW));
        root.style.setProperty('--sx9-ks', String(Math.round(ks * 1000) / 1000));
        items.forEach((li, i) => {
          const lh = lines[i]?.offsetHeight ?? 0;
          li.style.setProperty('--sx9-wy', `${Math.round(H - lh - F * (ks + 0.24))}px`);
        });
      }
      const bt = items.map((li) => {
        const c = parseFloat(li.dataset.band ?? '0.5');
        const b = Math.min(Math.max(c * H - s / 2, 0), H - s);
        li.style.setProperty('--sx9-bt', `${Math.round(b)}px`);
        return b;
      });
      const trackTop = track.getBoundingClientRect().top + scrollY;
      g = { s, gap, H, L: r.L, bt, start: trackTop - top - vh * 0.3, step };
      active = -2;
    };

    const frame = () => {
      queued = false;
      if (!live) return;
      const q = (scrollY - g.start) / g.step;
      const a = q < 0 ? -1 : Math.min(SLITS - 1, Math.floor(q));
      if (a !== active) place(a);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        measure();
        frame();
      }, 140);
    };
    const onPref = () => {
      measure();
      frame();
    };

    measure();
    frame();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    rm.addEventListener('change', onPref);
    /* photographs above finishing their layout move this section: re-measure once the
       page has settled, not only at hydration */
    const settle = () => onResize();
    addEventListener('load', settle);
    const ro = new ResizeObserver(settle);
    ro.observe(document.body);

    return () => {
      clearTimeout(rz);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', settle);
      rm.removeEventListener('change', onPref);
      ro.disconnect();
      root.classList.remove('sx9-live');
    };
  }, []);

  return null;
}
