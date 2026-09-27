'use client';

import { useEffect } from 'react';

/**
 * §05's only client code. The section is complete without it — the stylesheet's default is
 * every door open — so all this does is hold a door SHUT until the reader reaches it, then
 * let it open as they arrive, and attach the two loops only while they are near.
 *
 *   p ∈ [0, 1] per door, keyed to the NAME, not the door's box: 0 until the word has risen
 *   fully into view (its baseline at 92% of the viewport), 1 by the time it reaches 62%;
 *   smoothstepped between. Keyed to the box's middle, the first version had every door
 *   already half open by the time its name came up over the bottom edge — the reader never
 *   saw a whole word part, which is the whole event. Once open it stays open on the way down and
 *   closes again only if the reader scrolls back above it — the scroll position is theirs,
 *   and this never writes it.
 *
 * The rules it keeps, each learned on this site by breaking them:
 *   · one passive scroll listener that only raises a flag; every read and write in one rAF
 *   · geometry measured on load, resize, font load and ResizeObserver — never in the frame
 *   · no wheel or touch interception, ever
 *   · under prefers-reduced-motion it does nothing at all: four open doors, four stills
 *   · video: muted, inline, looped; `src` set within two screens, released a screen past
 */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx5c');
    if (!root) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = matchMedia('(max-width: 899.98px)');

    const doors = [...root.querySelectorAll<HTMLElement>('.sx5c-door')];
    type D = {
      el: HTMLElement;
      top: number;
      h: number;
      /** the name's baseline, document coordinates */
      base: number;
      p: number;
      vid: HTMLVideoElement | null;
      attached: boolean;
      playing: boolean;
    };
    const ds: D[] = doors.map((el) => ({
      el,
      top: 0,
      h: 0,
      base: 0,
      p: -1,
      vid: el.querySelector<HTMLVideoElement>('.sx5c-vid'),
      attached: false,
      playing: false,
    }));

    let vh = innerHeight;
    let queued = false;
    let live = false;

    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const smooth = (v: number) => {
      const x = clamp(v);
      return x * x * (3 - 2 * x);
    };

    function measure() {
      vh = innerHeight;
      const y = scrollY;
      for (const d of ds) {
        const r = d.el.getBoundingClientRect();
        d.top = r.top + y;
        d.h = r.height;
        const a = d.el.querySelector<HTMLElement>('.sx5c-half--a');
        const b = d.el.querySelector<HTMLElement>('.sx5c-half--b');
        const st = d.el.querySelector<HTMLElement>('.sx5c-stage');
        if (!a || !b || !st) continue;
        /* NARROW: the door opens vertically, and the two halves travel half the distance
           between their open lines each — so, shut, they meet on one line in the middle of
           the room. offsetTop ignores transforms, so this reads the OPEN layout whatever
           state the door is in when it is measured. */
        let shift = 0;
        if (narrow.matches) {
          shift = Math.max(0, (b.offsetTop - a.offsetTop) / 2);
          d.el.style.setProperty('--sx5c-shift', `${shift.toFixed(1)}px`);
          /* the half's box is trimmed to cap height → baseline, so its height IS the
             cap height; the drawn doorway breaks around exactly that */
          d.el.style.setProperty('--sx5c-cap', `${a.offsetHeight}px`);
        } else {
          d.el.style.removeProperty('--sx5c-shift');
          d.el.style.removeProperty('--sx5c-cap');
        }
        /* where the WHOLE word stands while the door is shut: its baseline */
        d.base = st.getBoundingClientRect().top + y + a.offsetTop + a.offsetHeight + shift;
      }
    }

    function attach(d: D) {
      if (!d.vid || d.attached) return;
      const src = d.vid.dataset.src;
      if (!src) return;
      d.vid.src = src;
      d.attached = true;
    }
    function release(d: D) {
      if (!d.vid || !d.attached) return;
      d.vid.pause();
      d.vid.classList.remove('is-on');
      d.vid.removeAttribute('src');
      d.vid.load();
      d.attached = false;
      d.playing = false;
    }

    function frame() {
      queued = false;
      const y = scrollY;
      for (const d of ds) {
        const topV = d.top - y;
        const botV = topV + d.h;
        const baseV = d.base - y;

        if (live) {
          const p = smooth((vh * 0.92 - baseV) / (vh * 0.3));
          if (Math.abs(p - d.p) > 0.0005) {
            d.p = p;
            d.el.style.setProperty('--sx5c-p', p.toFixed(4));
          }
        }

        if (d.vid) {
          const near = topV < vh * 2 && botV > -vh;
          if (!near) {
            release(d);
          } else if (!reduce.matches) {
            attach(d);
            const visible = topV < vh && botV > 0 && (!live || d.p > 0.02);
            if (visible && !d.playing) {
              d.playing = true;
              d.vid.play().catch(() => {
                d.playing = false;
              });
            } else if (!visible && d.playing) {
              d.playing = false;
              d.vid.pause();
            }
          }
        }
      }
    }

    const request = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(frame);
      }
    };
    const remeasure = () => {
      measure();
      request();
    };

    function setLive() {
      live = !reduce.matches;
      if (!live) {
        for (const d of ds) {
          d.el.style.removeProperty('--sx5c-p');
          d.p = -1;
          release(d);
        }
      }
      root!.classList.toggle('sx5c--live', live);
      remeasure();
    }

    const onPlaying = (e: Event) => (e.target as HTMLElement).classList.add('is-on');
    for (const d of ds) d.vid?.addEventListener('playing', onPlaying);

    const ro = new ResizeObserver(remeasure);
    ro.observe(root);
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', remeasure);
    reduce.addEventListener('change', setLive);
    narrow.addEventListener('change', remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});

    setLive();

    return () => {
      ro.disconnect();
      removeEventListener('scroll', request);
      removeEventListener('resize', remeasure);
      reduce.removeEventListener('change', setLive);
      narrow.removeEventListener('change', remeasure);
      for (const d of ds) {
        d.vid?.removeEventListener('playing', onPlaying);
        release(d);
        d.el.style.removeProperty('--sx5c-p');
        d.el.style.removeProperty('--sx5c-shift');
        d.el.style.removeProperty('--sx5c-cap');
      }
      root.classList.remove('sx5c--live');
    };
  }, []);

  return null;
}
