'use client';

import { useEffect } from 'react';
import { LINE_Y, STAGE_H } from './prints';

/** the shared eye level, as a fraction of the stage height */
const LINE = LINE_Y / STAGE_H;

/**
 * The section's only client island.
 *
 * SCROLL. One passive listener raises a flag; one requestAnimationFrame reads the scroll
 * position and writes ONE custom property, `--sx7-p`, on the section. Geometry is read on
 * load and resize only. Every angle is derived from that one number in CSS, and the CSS
 * default of the number is 1 — the level room — so this file can only ever START the pass
 * tilted; it can never leave the picture unfinished. Under reduced motion it never writes
 * the property at all.
 *
 * HOLD. On a desktop screen tall enough to show the whole room below the pill, the room is
 * made sticky for 70% of a screen of scrolling (`is-held`), so the reader watches all seven
 * standpoints come level instead of catching the end of it as the room arrives. The page
 * keeps scrolling the whole time: this is a position: sticky, never a captured wheel.
 *   held      p = 0 as the room rises into view, p = 1 at 80% of the hold
 *   not held  p = 0 as the stage enters, p = 1 as the eye-level line reaches 56% of the
 *             screen (phones, short screens)
 *
 * FILMS. Three of the prints are phone films. Nothing is fetched until the page has
 * loaded and a print has been on screen for 180 ms; a film pauses off screen and is
 * released (src removed, request aborted) once it is a viewport and a half away. Phones,
 * save-data and slow connections get the stills only — the poster <img> beneath each film
 * is a complete state, and it is the one reduced motion gets as well.
 */
export function Sx7Motion() {
  useEffect(() => {
    const root = document.getElementById('sx7-faculty');
    const frameEl = root?.querySelector<HTMLElement>('.sx7-frame');
    const room = root?.querySelector<HTMLElement>('.sx7-room');
    const stage = root?.querySelector<HTMLElement>('.sx7-stage');
    if (!root || !frameEl || !room || !stage) return;

    const rm = matchMedia('(prefers-reduced-motion: reduce)');
    const wide = matchMedia('(min-width: 900px)');
    /** the pill's footprint at the top of the screen, which the held room must clear */
    const PILL = 96;

    /* ── the levelling ─────────────────────────────────────────────────── */
    let held = false;
    let start = 0;
    let end = 1;
    let queued = false;

    const panEl = root.querySelector<HTMLElement>('.sx7-pan');

    const measure = () => {
      /* A scrollable region must be reachable by keyboard, so the markup makes the pan a
         tab stop — right for a phone with or without script. Where the room fits and
         nothing scrolls, a stop that does nothing is noise, so it steps out. */
      if (panEl) panEl.tabIndex = panEl.scrollWidth > panEl.clientWidth + 4 ? 0 : -1;
      const vh = innerHeight;
      const roomH = room.offsetHeight;
      held = wide.matches && !rm.matches && roomH + PILL + 24 <= vh;
      root.classList.toggle('sx7-is-held', held);
      if (held) {
        const T = Math.round(PILL + (vh - PILL - roomH) / 2);
        const D = Math.round(vh * 0.7);
        root.style.setProperty('--sx7-top', `${T}px`);
        root.style.setProperty('--sx7-hold', `${D}px`);
        // the frame is never sticky, so its top is the room's resting top
        const roomTop = frameEl.getBoundingClientRect().top + scrollY;
        const pinAt = roomTop - T;
        start = pinAt - vh * 0.45;
        end = pinAt + D * 0.8;
      } else {
        root.style.removeProperty('--sx7-top');
        root.style.removeProperty('--sx7-hold');
        const r = stage.getBoundingClientRect();
        const top = r.top + scrollY;
        start = top - vh;
        end = top + r.height * LINE - vh * 0.56;
      }
    };

    const frame = () => {
      queued = false;
      if (rm.matches) {
        root.style.removeProperty('--sx7-p');
        return;
      }
      const p = Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
      root.style.setProperty('--sx7-p', p.toFixed(4));
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
    const onMotionPref = () => {
      measure();
      frame();
    };

    measure();
    frame();
    root.classList.add('sx7-is-live');
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    rm.addEventListener('change', onMotionPref);
    wide.addEventListener('change', onMotionPref);
    /* photographs above finishing their layout move this section, so re-measure once
       the page has settled rather than only at hydration */
    const onLoadMeasure = () => {
      measure();
      frame();
    };
    addEventListener('load', onLoadMeasure);

    /* ── the phone panorama opens on the hall, not on its left edge ───────── */
    const pan = root.querySelector<HTMLElement>('.sx7-pan');
    if (pan && pan.scrollWidth > pan.clientWidth + 4) {
      const centre = root.querySelector<HTMLElement>('.sx7-piece--moving[data-photo="pr-mov-img_5739"]');
      if (centre) {
        const want = centre.offsetLeft + centre.offsetWidth * 0.5 - pan.clientWidth / 2;
        pan.scrollLeft = Math.max(0, Math.min(want, pan.scrollWidth - pan.clientWidth));
      }
    }

    /* ── the films ─────────────────────────────────────────────────────── */
    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
    );
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    const lite = thin || !canMp4 || rm.matches || matchMedia('(max-width: 860px)').matches;
    const films = lite ? [] : [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')];

    const hosts = new Map<Element, HTMLVideoElement>();
    for (const v of films) {
      const host = v.closest('.sx7-piece');
      if (host) hosts.set(host, v);
    }

    const near = new Set<HTMLVideoElement>();
    const settles = new Map<HTMLVideoElement, ReturnType<typeof setTimeout>>();
    const bound = new Map<HTMLVideoElement, AbortController>();

    let ready = document.readyState === 'complete';
    const waiting: HTMLVideoElement[] = [];
    const onLoad = () => {
      ready = true;
      for (const v of waiting.splice(0)) if (near.has(v)) demand(v);
    };
    if (!ready) addEventListener('load', onLoad, { once: true });

    function demand(v: HTMLVideoElement) {
      if (v.src) {
        if (v.paused) void v.play()?.catch(() => {});
        return;
      }
      if (!ready) {
        if (!waiting.includes(v)) waiting.push(v);
        return;
      }
      const ac = new AbortController();
      bound.set(v, ac);
      const { signal } = ac;
      v.src = v.dataset.src ?? '';
      v.load();
      /* the film is only allowed over its photograph once its clock has moved */
      const prove = () => {
        if (v.readyState >= 3 && v.currentTime > 0) v.classList.add('sx7-is-on');
      };
      v.addEventListener('timeupdate', prove, { signal });
      v.addEventListener('canplay', () => void v.play()?.catch(() => {}), { once: true, signal });
      v.addEventListener('error', () => v.classList.remove('sx7-is-on'), { signal });
      void v.play()?.catch(() => {});
    }

    function release(v: HTMLVideoElement) {
      const s = settles.get(v);
      if (s !== undefined) {
        clearTimeout(s);
        settles.delete(v);
      }
      if (!v.src) return;
      v.pause();
      bound.get(v)?.abort();
      bound.delete(v);
      v.classList.remove('sx7-is-on');
      /* removeAttribute + load() aborts the request; src = '' would re-request the page */
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
            if (v.src) {
              if (v.paused) void v.play()?.catch(() => {});
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
            if (s !== undefined) {
              clearTimeout(s);
              settles.delete(v);
            }
            if (v.src && !v.paused) v.pause();
          }
        }
      },
      { threshold: 0 },
    );
    const keep = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) continue;
          const v = hosts.get(e.target);
          if (v) release(v);
        }
      },
      { rootMargin: '150% 0px 150% 0px', threshold: 0 },
    );
    for (const host of hosts.keys()) {
      film.observe(host);
      keep.observe(host);
    }

    const onVis = () => {
      for (const v of films) {
        if (!v.src) continue;
        if (near.has(v) && !document.hidden) {
          if (v.paused) void v.play()?.catch(() => {});
        } else if (!v.paused) v.pause();
      }
    };
    addEventListener('visibilitychange', onVis);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onLoad);
      removeEventListener('load', onLoadMeasure);
      removeEventListener('visibilitychange', onVis);
      rm.removeEventListener('change', onMotionPref);
      wide.removeEventListener('change', onMotionPref);
      film.disconnect();
      keep.disconnect();
      for (const v of films) release(v);
      root.classList.remove('sx7-is-live', 'sx7-is-held');
      root.style.removeProperty('--sx7-top');
      root.style.removeProperty('--sx7-hold');
      root.style.removeProperty('--sx7-p');
    };
  }, []);

  return null;
}
