'use client';

import { useEffect } from 'react';

/**
 * The section's only client code. THE MECHANIC IS NOT IN HERE: the narrowing gutters, the
 * converging plates and the frame across the spine are static composition in
 * preview-sx3a.css. This file adds three things, and each has a finished default without it.
 *
 *   1. `[data-sx]` reveals, opt-in through `.is-live` on the section. The verso arrives from
 *      the left, the recto from the right, and they come to face each other at the gutter.
 *   2. `--sx3a-open` goes 1 → 0 on the Transmission frame: the paper seam inside it (the
 *      last of the gutter, Inquiry's width) closes as the frame's top travels from 62% down
 *      the screen to the frame being centred. Its stylesheet default is 0, so the frame is whole unless this
 *      runs.
 *   3. The three clips. `data-src` is attached when a frame has been near the screen for a
 *      moment, the clip fades over its still only once it has PROVABLY played, it pauses
 *      when off screen or when the tab is hidden, and it is released when well past.
 *      Nothing is attached before `load`, on a phone (≤ 860px, the gate the approved hero,
 *      /within/ and /practice/ all use), on Data Saver, or on a slow connection.
 *
 * Under `prefers-reduced-motion: reduce` it returns on the first line. No `.is-live`, no
 * seam, no video: the reader gets the finished book with a still in every clip's place.
 *
 * Rules kept, each one a bug already shipped on this project: ONE passive scroll listener
 * that only raises a flag; every read of scrollY and every write inside one rAF; geometry
 * measured on load and resize, never per frame; IntersectionObserver on the <figure>,
 * never on the aperture that clips; no `poster` attribute anywhere; `removeAttribute('src')`
 * + `load()` to abort a transfer (src = '' would re-request the page itself).
 */
export function Sx3aMotion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.querySelector<HTMLElement>('.sx3a');
    if (!root) return;

    const cleanups: Array<() => void> = [];

    /* ── 1. reveals ─────────────────────────────────────────────────────── */
    root.classList.add('is-live');
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    root.querySelectorAll('[data-sx]').forEach((el) => reveal.observe(el));
    cleanups.push(() => reveal.disconnect());

    /* ── 2. the seam ────────────────────────────────────────────────────── */
    const cross = root.querySelector<HTMLElement>('.sx3a-cross');
    let top = 0;
    let h = 1;
    let vh = innerHeight;
    const measure = () => {
      if (!cross) return;
      const r = cross.getBoundingClientRect();
      top = r.top + scrollY;
      h = r.height || 1;
      vh = innerHeight;
    };
    let last = -1;
    const frame = () => {
      queued = false;
      if (!cross) return;
      const y = top - scrollY; // the frame's top edge, in viewport px
      /* The seam holds open while the frame enters, so it is first read as one more PAIR
         with Inquiry's gutter. It starts to close only once the frame's top is 62% of
         the way down the screen, while the reader is looking at it, and it is shut when
         the frame is centred: 531px of scroll at 1440x900, 358px at 390x844. */
      const start = vh * 0.62;
      const end = vh * 0.5 - h / 2;
      let t = (start - y) / Math.max(1, start - end);
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const eased = t * t * (3 - 2 * t);
      const open = +(1 - eased).toFixed(4);
      if (open !== last) {
        cross.style.setProperty('--sx3a-open', String(open));
        last = open;
      }
    };
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    frame();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    /* layout above can still settle after mount (web fonts, the page's own load) */
    const ro = new ResizeObserver(() => onResize());
    ro.observe(document.body);
    cleanups.push(() => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      ro.disconnect();
    });

    /* ── 3. the clips ───────────────────────────────────────────────────── */
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
    const lite = thin || !canMp4 || matchMedia('(max-width: 860px)').matches;
    const clips = lite ? [] : [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')];

    const hosts = new Map<Element, HTMLVideoElement>();
    for (const v of clips) {
      const host = v.closest('figure');
      if (host) hosts.set(host, v);
    }
    const near = new Set<HTMLVideoElement>();
    const settles = new Map<HTMLVideoElement, ReturnType<typeof setTimeout>>();
    const polls = new Map<HTMLVideoElement, ReturnType<typeof setInterval>>();
    const bound = new Map<HTMLVideoElement, AbortController>();

    let ready = document.readyState === 'complete';
    const waiting = new Set<HTMLVideoElement>();
    const onLoad = () => {
      ready = true;
      for (const v of waiting) if (near.has(v)) demand(v);
      waiting.clear();
    };
    if (!ready) addEventListener('load', onLoad, { once: true });

    const stopPoll = (v: HTMLVideoElement) => {
      const p = polls.get(v);
      if (p !== undefined) clearInterval(p);
      polls.delete(v);
    };

    function demand(v: HTMLVideoElement) {
      if (v.getAttribute('src')) {
        if (v.paused && !document.hidden) void v.play()?.catch(() => {});
        return;
      }
      if (!ready) {
        waiting.add(v);
        return;
      }
      const ac = new AbortController();
      bound.set(v, ac);
      v.src = v.dataset.src ?? '';
      v.load();
      /* proof, not optimism: the loop covers the still only once it has decoded enough to
         play AND its clock has moved. A stall leaves a photograph, never a black box. */
      const prove = () => {
        if (v.readyState >= 3 && v.currentTime > 0) {
          v.classList.add('is-playing');
          stopPoll(v);
        }
      };
      polls.set(v, setInterval(prove, 120));
      v.addEventListener('timeupdate', prove, { signal: ac.signal });
      v.addEventListener('canplay', () => void v.play()?.catch(() => {}), {
        once: true,
        signal: ac.signal,
      });
      v.addEventListener(
        'error',
        () => {
          stopPoll(v);
          v.classList.remove('is-playing');
        },
        { signal: ac.signal },
      );
      void v.play()?.catch(() => {});
    }

    /** a transfer that has already finished is kept: dropping it would charge twice */
    const settled = (v: HTMLVideoElement) => {
      const b = v.buffered;
      return v.duration > 0 && b.length > 0 && b.end(b.length - 1) >= v.duration - 0.25;
    };

    function release(v: HTMLVideoElement) {
      const s = settles.get(v);
      if (s !== undefined) clearTimeout(s);
      settles.delete(v);
      waiting.delete(v);
      if (!v.getAttribute('src')) return;
      v.pause();
      if (settled(v)) return;
      stopPoll(v);
      bound.get(v)?.abort();
      bound.delete(v);
      v.classList.remove('is-playing');
      v.removeAttribute('src');
      v.load();
    }

    const film = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = hosts.get(e.target);
          if (!v) continue;
          if (e.isIntersecting) {
            near.add(v);
            if (v.getAttribute('src')) {
              if (v.paused && !document.hidden) void v.play()?.catch(() => {});
            } else if (!settles.has(v)) {
              settles.set(
                v,
                setTimeout(() => {
                  settles.delete(v);
                  if (near.has(v)) demand(v);
                }, 180),
              );
            }
          } else {
            near.delete(v);
            const s = settles.get(v);
            if (s !== undefined) clearTimeout(s);
            settles.delete(v);
            if (!v.paused) v.pause();
          }
        }
      },
      { rootMargin: '35% 0px 35% 0px' },
    );
    /* well past: a screen and a half away in either direction */
    const far = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = hosts.get(e.target);
          if (v && !e.isIntersecting) release(v);
        }
      },
      { rootMargin: '150% 0px 150% 0px' },
    );
    for (const host of hosts.keys()) {
      film.observe(host);
      far.observe(host);
    }
    const onVis = () => {
      for (const v of clips) {
        if (!v.getAttribute('src')) continue;
        if (document.hidden || !near.has(v)) {
          if (!v.paused) v.pause();
        } else if (v.paused) void v.play()?.catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVis);
    cleanups.push(() => {
      film.disconnect();
      far.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      removeEventListener('load', onLoad);
      for (const s of settles.values()) clearTimeout(s);
      for (const p of polls.values()) clearInterval(p);
      for (const ac of bound.values()) ac.abort();
    });

    return () => {
      for (const c of cleanups) c();
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
