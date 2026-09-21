'use client';

import { useEffect } from 'react';

/**
 * The page's single client island. Everything above it is a server component, so every
 * word, every photograph and every link is in the static HTML and the page is finished
 * before this file runs at all.
 *
 * It does three things and nothing else:
 *
 *   1. REVEALS. `[data-ln]` blocks get their start state only once `.is-live` is on the
 *      root, and only this file ever adds it. A reader whose JavaScript never arrives
 *      keeps the whole page, because nothing already painted is hidden by CSS that is not
 *      gated on that class.
 *   2. OPENS THE MASTHEAD WINDOW. One number, `--o`, written on the masthead element. The
 *      window's own transform and the counter-transform on the picture inside it are both
 *      derived from it in CSS, so the scroll path writes exactly one property per frame.
 *   3. RUNS THE ONE LOOP in section 03 — attach on approach, pause off screen, release
 *      well past.
 *
 * The rules it obeys, every one of them a bug this project has already shipped:
 *   · it observes nothing that clips. Chromium computes an IntersectionObserver's rect
 *     AFTER clips, so an element carrying a clip-to-zero reports ratio 0, never fires and
 *     stays invisible for ever. Every mask here is a CHILD of the observed element.
 *   · ONE passive scroll listener, and it only raises a flag. Geometry is measured on load
 *     and on resize and nowhere else; the frame callback does arithmetic on cached numbers.
 *     Nothing reads layout inside the scroll path.
 *   · only `transform` and `opacity` are ever animated.
 *   · scroll is never hijacked. No `preventDefault` on wheel or touch, anywhere.
 *   · under `prefers-reduced-motion: reduce` it attaches nothing, opens nothing, plays
 *     nothing and returns immediately. The page is then complete and static: the window is
 *     already open, the eight practices are already a column, the row of formats is
 *     already standing on its line, and section 03 is two photographs.
 *   · NO TEXT ON THIS PAGE ANIMATES ITS OPACITY. Type only ever translates, so the ratio
 *     the probe reports at rest is the ratio a reader gets in every frame of every
 *     transition. Only pictures fade, and a picture has no ratio to fail.
 */
export function LearnMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ln');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1 · reveals ──────────────────────────────────────────────────────────────── */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-ln]')];
    /* anything already above the fold is landed before `.is-live` goes on, so the first
       screen never flashes its start state at a reader who has not scrolled yet. */
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('in');
    }
    root.classList.add('is-live');

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of revealables) if (!el.classList.contains('in')) reveal.observe(el);

    /* ── 2 · the masthead window, and 3 · the loop ───────────────────────────────── */
    const mh = root.querySelector<HTMLElement>('.ln-mh');
    const vid = root.querySelector<HTMLVideoElement>('video[data-src]');
    const vidHost = vid?.closest('figure') ?? null;

    /* THE SAME CAPABILITY GATE THE APPROVED HERO USES, and it is a measurement rather than
       a preference: this clip is 1,836,058 B and its AVIF poster is 30,569 B. A phone, a
       metered connection or a browser with no MP4 decoder gets the poster, which is a
       complete state — it is the one reduced motion gets too. */
    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
    );
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    const lite = thin || !canMp4 || matchMedia('(max-width: 860px)').matches;

    let settle: ReturnType<typeof setTimeout> | undefined;
    let poll: ReturnType<typeof setInterval> | undefined;
    let dropped = false;

    const stopPoll = () => {
      if (poll !== undefined) {
        clearInterval(poll);
        poll = undefined;
      }
    };

    /* attach, play, and fade in ONLY once the decoder has frames AND the clock has moved.
       `play()` resolving is a promise about intent, not about pixels: a stall, an eviction
       or a blocked autoplay must leave the photograph on screen, never a black hole. */
    function demand(v: HTMLVideoElement) {
      if (v.src) {
        void v.play().catch(() => {});
        return;
      }
      const s = v.dataset.src;
      if (!s) return;
      v.src = s;
      v.load();
      void v.play().catch(() => {});
      stopPoll();
      poll = setInterval(() => {
        if (v.readyState >= 3 && v.currentTime > 0) {
          v.classList.add('is-on');
          stopPoll();
        }
      }, 120);
    }

    /* `pause()` stops the decoder but NOT the transfer — Chromium keeps buffering a paused
       clip to the end of the file. Dropping the source aborts what is in flight. But a
       clip that has already finished arriving is never dropped: doing that unconditionally
       made a down-then-up read on this site's other page a third MORE expensive, not less,
       because every clip was re-fetched. */
    function release(v: HTMLVideoElement) {
      if (dropped) return;
      stopPoll();
      v.pause();
      v.classList.remove('is-on');
      const done =
        v.duration > 0 && v.buffered.length > 0 && v.buffered.end(v.buffered.length - 1) >= v.duration - 0.35;
      if (done) return;
      v.removeAttribute('src');
      v.load();
      dropped = true;
    }

    let clipObs: IntersectionObserver | undefined;
    if (!lite && vid && vidHost) {
      clipObs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              /* nothing is fetched until the frame has been on screen for a moment: a
                 reader flinging the page to the footer should not be charged 1.8 MB for a
                 frame they never stopped at. 180 ms is below the point at which anyone has
                 decided to look at anything. */
              clearTimeout(settle);
              settle = setTimeout(() => demand(vid), 180);
            } else {
              clearTimeout(settle);
              if (e.boundingClientRect.top > innerHeight * 1.4 || e.boundingClientRect.bottom < -innerHeight * 0.4) {
                release(vid);
              } else {
                vid.pause();
              }
            }
          }
        },
        { threshold: 0, rootMargin: '0px' },
      );
      clipObs.observe(vidHost);
    }

    const onHidden = () => {
      if (document.hidden) vid?.pause();
      else if (vid?.src && vid.getBoundingClientRect().top < innerHeight) void vid.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onHidden);

    /* ── the scroll path ─────────────────────────────────────────────────────────────
       One listener, one flag, one frame. Geometry is cached and only re-measured on
       resize, so nothing in here touches layout. */
    let top = 0;
    let range = 1;
    const measure = () => {
      if (!mh) return;
      const r = mh.getBoundingClientRect();
      top = r.top + scrollY;
      /* the window is fully open by the time the masthead is 62% used up, so the reader
         is never still opening it when the next section arrives. */
      range = Math.max(1, (mh.offsetHeight - innerHeight) * 0.62);
    };

    let queued = false;
    let last = -1;
    const frame = () => {
      queued = false;
      if (!mh) return;
      const p = Math.min(1, Math.max(0, (scrollY - top) / range));
      /* ease-out so the last third of the opening is slow and the window settles rather
         than snapping to its stop */
      const eased = 1 - (1 - p) ** 2;
      const o = 0.23 + 0.77 * eased;
      const q = Math.round(o * 1000) / 1000;
      if (q !== last) {
        last = q;
        mh.style.setProperty('--o', String(q));
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
    frame();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      reveal.disconnect();
      clipObs?.disconnect();
      clearTimeout(settle);
      stopPoll();
      document.removeEventListener('visibilitychange', onHidden);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
