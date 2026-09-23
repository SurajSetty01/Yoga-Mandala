'use client';

import { useEffect } from 'react';

/**
 * The pair's only client island. Both sections are server components, so every sentence,
 * every photograph and every measurement above is in the static HTML and the page is
 * finished before this file runs at all.
 *
 * THERE IS NO SCROLL LISTENER IN THIS CONCEPT. Nothing here reads scrollY, nothing writes
 * a scroll-linked custom property, and nothing runs per frame: the reveals are one
 * IntersectionObserver handing off to a CSS transition, and the clip is a second one
 * attaching and releasing a `src`. That is the whole of it — "minimal animation" taken
 * literally, and it is why the pair costs nothing under reduced motion.
 *
 * It does two things:
 *
 *   1. reveals `[data-ab]` blocks, opt-in through `.is-live` on the section root. A reader
 *      whose JavaScript never arrives keeps the entire pair, because nothing already
 *      painted is hidden by CSS that is not gated on that class. Anything already on
 *      screen when the island mounts is resolved BEFORE `.is-live` is added, so a reader
 *      landing mid-page never sees a block that was painted a moment ago fade back in.
 *
 *   2. attaches §03's one clip on approach and releases it a screen past — the contract in
 *      `lib/hero-choreography.ts`, and the same three capability gates it asks separately:
 *
 *        reduce      → the island returns immediately. No clip, no reveals, nothing.
 *        narrow      → below 900px the still stands. 1.92 MB is not a decoration to send
 *                      to a phone on Indian mobile data, and the picture is identical.
 *        thin / mp4  → Save-Data, 2G/3G, or a browser that cannot play the file → still.
 *
 *      The <video> has NO `poster` attribute and no `src` in the markup: a poster is
 *      fetched even when `src` is never set, and three of them cost this site 948 KB on
 *      every device once already. The visible <img> beneath it IS the poster.
 *
 * Under `prefers-reduced-motion: reduce` this attaches nothing, observes nothing and
 * returns. `.is-live` is never added, so every reveal start state is inert and the two
 * sections are exactly what a screenshot of them shows.
 */
export function ApprBMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ab');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. reveals ──────────────────────────────────────────────────────── */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-ab]')];
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('ab-on');
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('ab-on');
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -9% 0px' },
    );

    root.classList.add('is-live');
    for (const el of revealables) if (!el.classList.contains('ab-on')) reveal.observe(el);

    /* ── 2. the one clip ─────────────────────────────────────────────────── */
    const vid = root.querySelector<HTMLVideoElement>('.ab-ap__vid');
    const stage = vid?.parentElement ?? null;
    let clipObs: IntersectionObserver | null = null;
    let onPlaying: (() => void) | null = null;

    if (vid && stage) {
      const conn = (
        navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
      ).connection;
      const thin = !!(
        conn &&
        (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
      );
      const narrow = matchMedia('(max-width: 899px)').matches;
      const canMp4 = !!vid.canPlayType('video/mp4; codecs="avc1.42E01E"');
      const source = vid.dataset.src;

      if (source && canMp4 && !thin && !narrow) {
        onPlaying = () => vid.classList.add('ab-live');
        vid.addEventListener('playing', onPlaying);

        clipObs = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                if (!vid.getAttribute('src')) {
                  vid.setAttribute('src', source);
                  vid.load();
                }
                void vid.play().catch(() => {});
              } else {
                vid.pause();
                vid.classList.remove('ab-live');
                if (vid.getAttribute('src')) {
                  vid.removeAttribute('src');
                  /* load() with no src releases the decoder and the buffered data; without
                     it the file stays resident for the rest of the session */
                  vid.load();
                }
              }
            }
          },
          /* top 100% / bottom 60%: attached when the frame is a little over half a screen
             below, released when it is a whole screen above. Nothing is observed that
             carries a clip — the stage has none. */
          { threshold: 0, rootMargin: '100% 0px 60% 0px' },
        );
        clipObs.observe(stage);
      }
    }

    return () => {
      reveal.disconnect();
      clipObs?.disconnect();
      if (vid && onPlaying) vid.removeEventListener('playing', onPlaying);
      if (vid?.getAttribute('src')) {
        vid.pause();
        vid.removeAttribute('src');
        vid.load();
      }
      vid?.classList.remove('ab-live');
      root.classList.remove('is-live');
    };
  }, []);

  return null;
}
