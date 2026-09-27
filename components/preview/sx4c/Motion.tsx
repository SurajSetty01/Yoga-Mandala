'use client';

import { useEffect } from 'react';

/**
 * sx4c's only client island, and the section does not need it to be complete.
 *
 * The list builds itself in CSS (sticky ledger lines, see Teach.tsx), so this file adds
 * three things, none of which the section needs to be whole:
 *
 *   0. THE HANDOFF. As a large practice slides under the ledger it fades by the fraction of
 *      it already gone under, and its ledger line — rising right behind it — fades in by
 *      the same fraction, arriving at 1 at the instant it docks. Without this (reduced
 *      motion, no JavaScript) both are simply visible, and the line trails its large echo
 *      up the page: complete, and only a little louder. Opacity only.
 *   1. THE GROWTH. The plate starts at the width of a margin figure and grows to its own
 *      width as it rises into the screen — the one photograph that leaves the margin and
 *      takes the page. `transform: scale()` only, written into one element inside one rAF,
 *      origin top-left so it grows out of the margin's own edge toward the words.
 *   2. THE VIDEO. `src` is attached one screen before the plate arrives and removed one
 *      screen after it leaves (DESIGN-SYSTEM §6). The clip is looped at `data-trim` rather
 *      than at its end, because its last ~2.5s are a back filling the frame.
 *
 * Rules kept, each one a bug already shipped on this site:
 *   · one passive scroll listener that only raises a flag; every read of scrollY and every
 *     write happens inside one requestAnimationFrame; geometry is measured on load and on
 *     resize, never in the frame loop, and on the UNSCALED figure, never the scaled child
 *     (getBoundingClientRect includes transforms);
 *   · the observed element (the figure) carries no clip and no transform;
 *   · under prefers-reduced-motion it does nothing at all: the plate is full size and the
 *     still frame stands in for the clip, which is the finished state the stylesheet gives.
 */
export function Sx4cMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx4c');
    if (!root) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const plate = root.querySelector<HTMLElement>('.sx4c-plate');
    const grow = root.querySelector<HTMLElement>('.sx4c-plate__grow');
    const video = root.querySelector<HTMLVideoElement>('.sx4c-plate__vid');
    const day = root.querySelector<HTMLElement>('.sx4c-day__frame');
    const bigs = [...root.querySelectorAll<HTMLElement>('.sx4c-big')];
    const lines = [...root.querySelectorAll<HTMLElement>('.sx4c-line')];
    if (!plate || !grow) return;

    /* ── 0. handoff geometry: each large line's document bottom and height, and the
       sticky `top` of its ledger line (where the ledger's lower edge is when it arrives) */
    const pairs = bigs.flatMap((big, i) => {
      const line = lines[i];
      return line ? [{ big, line }] : [];
    });
    let geo: Array<{ big: HTMLElement; line: HTMLElement; b: number; h: number; t: number; op: number }> = [];

    /* ── 1. growth ───────────────────────────────────────────────────────── */
    let top = 0;
    let vh = innerHeight;
    let from = 1;
    let last = -1;
    let queued = false;

    const measure = () => {
      const r = plate.getBoundingClientRect();
      top = r.top + scrollY;
      vh = innerHeight;
      const w = grow.offsetWidth;
      const m = day ? day.offsetWidth : w;
      from = w > 0 ? Math.min(1, Math.max(0.35, m / w)) : 1;
      last = -1;

      const first = pairs[0];
      const stacked =
        !!first &&
        getComputedStyle(first.line).position === 'sticky' &&
        getComputedStyle(first.big).display !== 'none';
      geo = stacked
        ? pairs.map(({ big, line }) => {
            const rb = big.getBoundingClientRect();
            return {
              big,
              line,
              b: rb.bottom + scrollY,
              h: Math.max(1, rb.height),
              t: parseFloat(getComputedStyle(line).top) || 0,
              op: -1,
            };
          })
        : [];
      if (!stacked) {
        for (const { big, line } of pairs) {
          big.style.opacity = '';
          line.style.opacity = '';
        }
      }
    };

    const frame = () => {
      queued = false;
      for (const g of geo) {
        const p = Math.min(1, Math.max(0, (g.b - scrollY - g.t) / g.h));
        const q = Math.round(p * 100) / 100;
        if (q !== g.op) {
          g.big.style.opacity = String(q);
          g.line.style.opacity = String(Math.round((1 - q) * 100) / 100);
          g.op = q;
        }
      }
      // 0 as the plate's top enters the bottom of the screen, 1 when it reaches 30% down
      const y = top - scrollY;
      const p = Math.min(1, Math.max(0, (vh - y) / (vh * 0.7)));
      const e = 1 - (1 - p) ** 3;
      const s = +(from + (1 - from) * e).toFixed(4);
      if (s !== last) {
        grow.style.transform = s >= 0.9999 ? '' : `scale(${s})`;
        last = s;
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    measure();
    frame();
    addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => {
      measure();
      onScroll();
    };
    addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    /* ── 2. the clip ─────────────────────────────────────────────────────── */
    let io: IntersectionObserver | null = null;
    const src = video?.dataset.src;
    const trim = Number(video?.dataset.trim) || 0;
    // The cut back to the first frame is a dissolve, not a jump: half a second before the
    // trim the clip fades to the still beneath it — which IS its first frame — and fades
    // back in once it has been rewound.
    const onTime = () => {
      if (!video || !trim) return;
      const t = video.currentTime;
      if (t >= trim) {
        video.currentTime = 0;
      } else if (t >= trim - 0.55) {
        video.classList.add('is-dip');
      }
    };
    const onSeeked = () => {
      if (video && video.currentTime < 1) video.classList.remove('is-dip');
    };
    const onPlaying = () => video?.classList.add('is-on');

    if (video && src && typeof IntersectionObserver !== 'undefined') {
      video.addEventListener('timeupdate', onTime);
      video.addEventListener('seeked', onSeeked);
      video.addEventListener('playing', onPlaying);
      io = new IntersectionObserver(
        (entries) => {
          const e = entries[entries.length - 1];
          if (!e) return;
          if (e.isIntersecting) {
            if (!video.getAttribute('src')) {
              video.src = src;
              video.play().catch(() => {});
            }
          } else if (video.getAttribute('src')) {
            video.pause();
            video.classList.remove('is-on', 'is-dip');
            video.removeAttribute('src');
            video.load();
          }
        },
        { rootMargin: '100% 0px 100% 0px' },
      );
      io.observe(plate);
    }

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      ro.disconnect();
      io?.disconnect();
      video?.removeEventListener('timeupdate', onTime);
      video?.removeEventListener('seeked', onSeeked);
      video?.removeEventListener('playing', onPlaying);
      grow.style.transform = '';
      for (const { big, line } of pairs) {
        big.style.opacity = '';
        line.style.opacity = '';
      }
    };
  }, []);

  return null;
}
