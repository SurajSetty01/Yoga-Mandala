'use client';

import { useEffect } from 'react';

/**
 * The only JavaScript in this section.
 *
 * THERE IS NO SCROLL LISTENER AND NO rAF HERE, and that is the point: the
 * travelling daylight down the corridor is a `position: sticky` gradient, so
 * the browser does it on the compositor for free, at the correct frame rate,
 * with the correct behaviour when the reader drags a scrollbar or hits End.
 * The only thing that genuinely needs to know where the reader is, is the pair
 * of clips — a video has to be told when to start and when to let go of its
 * buffers — and an IntersectionObserver answers that better than measuring
 * scrollY ever could.
 *
 * The contract, from DESIGN-SYSTEM §1 and SECTION-MECHANICS rule 6:
 *   · `muted`, `playsinline`, `loop`, and never a `poster` attribute while a
 *     visible <img> sits beneath — the poster is fetched even when `src` is
 *     never set, and three of them cost 948 KB on every device once.
 *   · attached on approach (within a fifth of a screen), released when well
 *     past (a whole screen), so a reader who scrolls the page twice does not
 *     hold five megabytes of decoded video the entire time.
 *   · faded in only once it is genuinely running — readyState 3 AND a
 *     currentTime past zero — so a stall, an eviction or a blocked autoplay
 *     leaves the photograph on screen rather than a black rectangle.
 *
 * WHO NEVER GETS VIDEO, measured rather than assumed: the two clips are
 * 2,063,022 B and 3,170,953 B; their AVIF posters are 43,181 B and 39,375 B.
 * A phone is therefore given the posters and nothing else — as is any reader
 * on save-data or a 3g-or-worse connection, any browser without h.264, and
 * anyone who has asked for reduced motion. The section is complete for all of
 * them: the corridor is nine photographs and five sentences either way.
 */
export function PassageMotion() {
  useEffect(() => {
    const vids = Array.from(
      document.querySelectorAll<HTMLVideoElement>('.ib-passage video[data-src]'),
    );
    if (!vids.length) return;

    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
    const mqNarrow = matchMedia('(max-width: 860px)');
    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
    );
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');

    const polls = new Map<HTMLVideoElement, ReturnType<typeof setInterval>>();
    const near = new Set<HTMLVideoElement>();

    const stills = () => mqReduce.matches || mqNarrow.matches || thin || !canMp4;

    function release(v: HTMLVideoElement) {
      const p = polls.get(v);
      if (p !== undefined) {
        clearInterval(p);
        polls.delete(v);
      }
      v.classList.remove('is-live');
      if (v.src) {
        v.pause();
        v.removeAttribute('src');
        v.load(); // drops the buffer; without this the bytes stay resident
      }
    }

    function attach(v: HTMLVideoElement) {
      if (v.src || stills()) return;
      v.src = v.dataset.src ?? '';
      const live = () => {
        if (v.readyState >= 3 && v.currentTime > 0) {
          v.classList.add('is-live');
          const p = polls.get(v);
          if (p !== undefined) {
            clearInterval(p);
            polls.delete(v);
          }
        }
      };
      polls.set(v, setInterval(live, 140));
      v.addEventListener('timeupdate', live);
      v.addEventListener('canplay', () => void v.play()?.catch(() => {}), { once: true });
      v.addEventListener('error', () => release(v));
      void v.play()?.catch(() => {});
    }

    /* within a fifth of a screen: attach and play. outside it: hold. */
    const nearIO = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            near.add(v);
            attach(v);
            if (v.src && v.paused && !document.hidden) void v.play()?.catch(() => {});
          } else {
            near.delete(v);
            /* never pause a clip that has not proven it plays: `is-live` needs
               currentTime past 0, and one parked at 0 could never earn it. */
            if (v.src && !v.paused && v.classList.contains('is-live')) v.pause();
          }
        }
      },
      { rootMargin: '20% 0px 20% 0px' },
    );

    /* a whole screen past in either direction: let the bytes go. */
    const farIO = new IntersectionObserver(
      (es) => {
        for (const e of es) if (!e.isIntersecting) release(e.target as HTMLVideoElement);
      },
      { rootMargin: '100% 0px 100% 0px' },
    );

    vids.forEach((v) => {
      nearIO.observe(v);
      farIO.observe(v);
    });

    const onVis = () => {
      if (document.hidden) vids.forEach((v) => v.src && !v.paused && v.pause());
      else near.forEach((v) => v.src && v.paused && void v.play()?.catch(() => {}));
    };
    /* a reader who turns reduced motion on, or rotates a tablet under 861px,
       gets the posters back on the spot rather than at the next reload. */
    const onGate = () => {
      if (stills()) vids.forEach(release);
      else near.forEach(attach);
    };

    document.addEventListener('visibilitychange', onVis);
    mqReduce.addEventListener('change', onGate);
    mqNarrow.addEventListener('change', onGate);

    return () => {
      nearIO.disconnect();
      farIO.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mqReduce.removeEventListener('change', onGate);
      mqNarrow.removeEventListener('change', onGate);
      vids.forEach(release);
    };
  }, []);

  return null;
}
