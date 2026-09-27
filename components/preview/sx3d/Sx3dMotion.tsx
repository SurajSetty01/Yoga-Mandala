'use client';

import { useEffect } from 'react';

/**
 * The section's one client island. Everything it touches has a finished default in the
 * stylesheet — the room standing, the far wall a still — so the section is complete before
 * this runs, if it never runs, and under reduced motion (where it returns at once).
 *
 * It does two things.
 *
 *   1. THE ARRIVAL. It adds `.sx3d-live` to the section, which lays the room flat — the
 *      laid-out drawing — and adds `.is-standing` to the room once the WHOLE stage is on
 *      screen, which stands it back up. The fold itself is three CSS transitions on
 *      `transform` and `opacity` with staggered delays (floor, walls, ceiling: the order
 *      the lead names them), not a per-frame write. When the stage has gone back out of
 *      sight BELOW the screen the room is laid flat again, instantly and unseen, so the
 *      reader who scrolls back down watches it stand up again. A room already scrolled past
 *      when this mounts is stood up without transition.
 *
 *      Why an arrival and not a scrub: see the head of styles/preview-sx3d.css. In short,
 *      the stage is up to 86% of the screen's height, so a fold tied to scroll position
 *      happened while half the room was below the fold.
 *
 *   2. THE ONE MOVING PICTURE. The far wall's clip has no `poster` and no `src` in the
 *      markup. It is attached when the stage is within a screen of the viewport, started
 *      once the room is standing, faded in over its own still on `playing`, and released —
 *      paused, `src` removed, `load()`ed — when the stage is more than a screen away. It is
 *      skipped entirely under Save-Data.
 *
 * The rules, each a bug this site has already shipped:
 *   · ONE passive scroll listener that only raises a flag; every read and write inside one
 *     requestAnimationFrame. Geometry is measured on load, resize and a ResizeObserver
 *     tick, never in the frame.
 *   · The scroll position is never written. No wheel or touch interception.
 *   · The observed element (the stage's view) carries no clip-path.
 */
export function Sx3dMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx3d');
    const view = root?.querySelector<HTMLElement>('.sx3d-view');
    const room = root?.querySelector<HTMLElement>('.sx3d-room');
    const clip = root?.querySelector<HTMLVideoElement>('.sx3d-clip');
    if (!root || !view || !room) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let top = 0;
    let h = 1;
    const measure = () => {
      const r = view.getBoundingClientRect();
      top = r.top + scrollY;
      h = r.height || 1;
    };

    /* the fold's full length: the last hinge starts 0.68s in and swings for 1.3s */
    const FOLD_MS = 2000;
    let standing = false;
    let near = false;
    let settle = 0;

    const play = () => {
      if (!clip || !near || !standing) return;
      if (!clip.getAttribute('src') && clip.dataset.src) clip.src = clip.dataset.src;
      void clip.play().catch(() => {});
    };

    const stand = (instant: boolean) => {
      standing = true;
      if (instant) {
        room.classList.add('sx3d-instant');
        room.classList.add('is-standing');
        requestAnimationFrame(() => requestAnimationFrame(() => room.classList.remove('sx3d-instant')));
        play();
        return;
      }
      room.classList.add('is-standing');
      clearTimeout(settle);
      settle = window.setTimeout(play, FOLD_MS - 300);
    };

    const layFlat = () => {
      standing = false;
      clearTimeout(settle);
      room.classList.add('sx3d-instant');
      room.classList.remove('is-standing');
      requestAnimationFrame(() => requestAnimationFrame(() => room.classList.remove('sx3d-instant')));
    };

    let queued = false;
    const frame = () => {
      queued = false;
      const vh = innerHeight || 1;
      const t = top - scrollY; // the stage's top edge, in viewport px
      const b = t + h;
      if (!standing) {
        /* the whole stage is on screen, or the reader is already
           well past its top — either way, this is the moment it is seen */
        if (b <= vh - 4 || t < vh * 0.18) stand(false);
      } else if (t > vh + 40) {
        layFlat();
      }
    };

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
    /* scrolled past already (a reload mid-page): standing, never seen to move */
    if (top + h - scrollY < 0) stand(true);
    root.classList.add('sx3d-live');
    frame();

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    /* ── the one moving picture ─────────────────────────────────────────── */
    type Conn = { saveData?: boolean };
    const saveData = (navigator as Navigator & { connection?: Conn }).connection?.saveData === true;
    let io: IntersectionObserver | null = null;
    const onPlaying = () => clip?.classList.add('is-on');

    if (clip && !saveData && typeof IntersectionObserver !== 'undefined') {
      clip.muted = true;
      clip.addEventListener('playing', onPlaying);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            near = e.isIntersecting;
            if (near) {
              if (!clip.getAttribute('src') && clip.dataset.src) {
                clip.src = clip.dataset.src;
                clip.load();
              }
              play();
            } else if (clip.getAttribute('src')) {
              clip.pause();
              clip.classList.remove('is-on');
              clip.removeAttribute('src');
              clip.load();
            }
          }
        },
        { rootMargin: '100% 0px 100% 0px', threshold: 0 },
      );
      io.observe(view);
    }

    return () => {
      clearTimeout(settle);
      ro.disconnect();
      io?.disconnect();
      clip?.removeEventListener('playing', onPlaying);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      root.classList.remove('sx3d-live');
      room.classList.remove('is-standing', 'sx3d-instant');
    };
  }, []);

  return null;
}
