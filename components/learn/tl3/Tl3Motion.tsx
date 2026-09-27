'use client';

import { useEffect } from 'react';

/**
 * The only client code in /learn/ §02. The section is complete before this runs: both
 * panes, both clauses and both posters are in the static HTML, laid out without motion.
 *
 * ≥900px, motion allowed: adds `.tl3-live`, which pins the stage and overlays the two panes
 * in one frame. One number, `--tl3-d` (the divider's position as a fraction of the frame's
 * width, 2/3 → 1/3), is written on the frame per scroll frame; every transform is derived
 * from it in CSS. The wider pane is "active": its veil lifts and only its clip plays.
 *
 * <900px, motion allowed: the panes stay stacked and each clip plays while it is in view.
 *
 * Clips everywhere are gated on saveData / slow connections / MP4 support; without them the
 * posters are the finished state. Rules this obeys, each a bug this site has shipped:
 *   · one passive scroll listener that only raises a flag; geometry read on load/resize only;
 *   · transform and opacity only — and no text ever animates its opacity;
 *   · observers watch unclipped elements (the section root, the clip figures);
 *   · a clip is attached only after the frame has been in view for a moment, paused when it
 *     leaves, and its source dropped when well past unless it had already fully arrived;
 *   · under `prefers-reduced-motion: reduce` nothing is attached and `.tl3-live` never goes on.
 */

type Side = 'a' | 'b';
type Loop = {
  v: HTMLVideoElement;
  poll?: ReturnType<typeof setInterval> | undefined;
  settle?: ReturnType<typeof setTimeout> | undefined;
  dropped: boolean;
};

export function Tl3Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tl3');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frame = root.querySelector<HTMLElement>('.tl3-frame');
    const run = root.querySelector<HTMLElement>('.tl3-run');
    const pane = {
      a: root.querySelector<HTMLElement>('[data-tl3-pane="a"]'),
      b: root.querySelector<HTMLElement>('[data-tl3-pane="b"]'),
    };
    const fig = {
      a: root.querySelector<HTMLElement>('[data-tl3-clip="a"]'),
      b: root.querySelector<HTMLElement>('[data-tl3-clip="b"]'),
    };
    if (!frame || !run || !pane.a || !pane.b || !fig.a || !fig.b) return;

    /* ── the loops ─────────────────────────────────────────────────────────────── */
    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
    );
    const canMp4 = !!document
      .createElement('video')
      .canPlayType('video/mp4; codecs="avc1.42E01E"');
    const clipsOk = !thin && canMp4;

    const loops: Partial<Record<Side, Loop>> = {};
    for (const s of ['a', 'b'] as const) {
      const v = fig[s]!.querySelector<HTMLVideoElement>('video[data-src]');
      if (v) {
        v.muted = true;
        loops[s] = { v, dropped: false };
      }
    }

    const stopPoll = (l: Loop) => {
      if (l.poll !== undefined) clearInterval(l.poll);
      l.poll = undefined;
    };

    /* the picture fades up only once the decoder has frames AND the clock has moved; a
       stall or a refused autoplay leaves the poster on screen, never a black hole */
    const play = (s: Side) => {
      const l = loops[s];
      if (!l || !clipsOk) return;
      const { v } = l;
      if (!v.getAttribute('src')) {
        const src = v.dataset.src;
        if (!src) return;
        v.src = src;
        v.load();
        l.dropped = false;
      }
      void v.play().catch(() => {});
      stopPoll(l);
      l.poll = setInterval(() => {
        if (v.readyState >= 3 && v.currentTime > 0) {
          v.classList.add('tl3-on');
          stopPoll(l);
        }
      }, 120);
    };
    /* nothing is fetched until the frame has been in view for a moment */
    const demand = (s: Side) => {
      const l = loops[s];
      if (!l || !clipsOk) return;
      clearTimeout(l.settle);
      l.settle = setTimeout(() => play(s), 180);
    };
    const pause = (s: Side) => {
      const l = loops[s];
      if (!l) return;
      clearTimeout(l.settle);
      stopPoll(l);
      l.v.pause();
    };
    /* `pause()` stops the decoder, not the transfer; dropping the source aborts it. A clip
       that has already fully arrived is kept, so reading back up does not fetch it twice. */
    const release = (s: Side) => {
      const l = loops[s];
      if (!l || l.dropped) return;
      pause(s);
      const { v } = l;
      if (!v.getAttribute('src')) return;
      const done =
        v.duration > 0 &&
        v.buffered.length > 0 &&
        v.buffered.end(v.buffered.length - 1) >= v.duration - 0.35;
      if (done) return;
      v.classList.remove('tl3-on');
      v.removeAttribute('src');
      v.load();
      l.dropped = true;
    };
    const far = (r: DOMRectReadOnly) => r.top > innerHeight * 1.4 || r.bottom < -innerHeight * 0.4;

    /* ── ≥900px: the divider ───────────────────────────────────────────────────── */
    const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
    const ease = (t: number) => t * t * (3 - 2 * t);

    function divider() {
      root!.classList.add('tl3-live');
      let top = 0;
      let len = 1;
      let last = -1;
      let active: Side = 'a';
      let near = false;

      const measure = () => {
        top = run!.getBoundingClientRect().top + scrollY;
        len = Math.max(1, run!.offsetHeight - innerHeight);
      };
      const setActive = (s: Side) => {
        active = s;
        pane.a!.classList.toggle('tl3-act', s === 'a');
        pane.b!.classList.toggle('tl3-act', s === 'b');
        if (!near) return;
        pause(s === 'a' ? 'b' : 'a');
        demand(s);
      };
      const paint = () => {
        const p = clamp((scrollY - top) / len, 0, 1);
        /* a hold on the class, a sweep, a hold on the one person */
        const t = ease(clamp((p - 0.14) / 0.62, 0, 1));
        const d = Math.round((2 / 3 - t / 3) * 10000) / 10000;
        if (d !== last) {
          last = d;
          frame!.style.setProperty('--tl3-d', String(d));
        }
        const next: Side = t < 0.5 ? 'a' : 'b';
        if (next !== active) setActive(next);
      };

      let queued = false;
      const onScroll = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          paint();
        });
      };
      const onResize = () => {
        measure();
        onScroll();
      };

      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          near = e.isIntersecting;
          if (near) demand(active);
          else if (far(e.boundingClientRect)) {
            release('a');
            release('b');
          } else {
            pause('a');
            pause('b');
          }
        }
      });

      measure();
      paint();
      io.observe(root!);
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onResize, { passive: true });
      const ro = new ResizeObserver(onResize);
      ro.observe(root!);

      return () => {
        io.disconnect();
        ro.disconnect();
        removeEventListener('scroll', onScroll);
        removeEventListener('resize', onResize);
        pause('a');
        pause('b');
        root!.classList.remove('tl3-live');
        frame!.style.removeProperty('--tl3-d');
        pane.a!.classList.add('tl3-act');
        pane.b!.classList.remove('tl3-act');
      };
    }

    /* ── <900px: each pane plays while it is in view ───────────────────────────── */
    function stacked() {
      const side = new Map<Element, Side>([
        [fig.a!, 'a'],
        [fig.b!, 'b'],
      ]);
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const s = side.get(e.target);
            if (!s) continue;
            if (e.isIntersecting) demand(s);
            else if (far(e.boundingClientRect)) release(s);
            else pause(s);
          }
        },
        { threshold: 0.35 },
      );
      io.observe(fig.a!);
      io.observe(fig.b!);
      return () => {
        io.disconnect();
        pause('a');
        pause('b');
      };
    }

    const wide = matchMedia('(min-width: 900px)');
    let teardown: (() => void) | undefined;
    const apply = () => {
      teardown?.();
      teardown = wide.matches ? divider() : stacked();
    };
    apply();
    wide.addEventListener('change', apply);

    const onHidden = () => {
      if (document.hidden) {
        pause('a');
        pause('b');
        return;
      }
      const live = root.classList.contains('tl3-live');
      for (const s of ['a', 'b'] as const) {
        const r = fig[s]!.getBoundingClientRect();
        const seen = r.bottom > 0 && r.top < innerHeight;
        if (seen && loops[s]?.v.getAttribute('src') && (!live || pane[s]!.classList.contains('tl3-act'))) {
          play(s);
        }
      }
    };
    document.addEventListener('visibilitychange', onHidden);

    return () => {
      wide.removeEventListener('change', apply);
      document.removeEventListener('visibilitychange', onHidden);
      teardown?.();
      for (const s of ['a', 'b'] as const) {
        const l = loops[s];
        if (l) {
          clearTimeout(l.settle);
          stopPoll(l);
        }
      }
    };
  }, []);

  return null;
}
