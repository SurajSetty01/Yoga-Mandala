'use client';

import { useEffect } from 'react';

/**
 * The section's only client code, and it is now 1 kB of IntersectionObserver.
 *
 * THERE IS NO SCROLL LISTENER, NO requestAnimationFrame AND NO SCRUBBED VALUE HERE. Round
 * one drove five custom properties off `scrollY` to run a stack of sheets; that mechanic
 * cost 23-35% of the document's height, hid every body paragraph behind a photograph at
 * 390, and left nothing behind when `prefers-reduced-motion` was on. What this file does
 * now cannot do any of that, because nothing it touches is layout, geometry or content:
 *
 *   1. adds `.sx3b--live` when motion is allowed, which is the ONLY thing that arms the
 *      reveals in the stylesheet. Reduced motion, or no JavaScript at all, and the section
 *      renders finished: same boxes, same document height, same words, nothing hidden.
 *   2. gives each block an `.is-in` on first approach — opacity and transform only.
 *   3. attaches the clip's `src` on approach and drops it a screen past, AND ONLY ABOVE
 *      1000px.
 *
 * THE VIDEO GATE IS A WEIGHT DECISION, NOT A WIDTH ONE. There is exactly one encode of
 * `pr-mov-img_5681` — 1080x1920, 10.5s, ~2.46 Mbps, 3.15 MB — and no smaller variant on
 * disk. Round one shipped it to a phone, where it was 3.15 MB of a 4.04 MB page, painted
 * into a 308x405 box. `public/media/` is outside this design's remit, so until a second
 * encode exists the clip is simply not fetched below 1000px: the poster frame is the
 * picture there, and the phone pays 25 KB of AVIF for it. The gate is re-evaluated on
 * resize, so dragging a window narrow releases the clip rather than keeping it resident.
 */
export function Sx3bMotion() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.sx3b');
    if (!section) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = section.querySelector<HTMLVideoElement>('.sx3b-video');
    /* the clip is the only thing on the page heavy enough to be worth a breakpoint */
    const wide = window.matchMedia('(min-width: 1000px)');

    let revealIo: IntersectionObserver | null = null;
    let nearIo: IntersectionObserver | null = null;
    let near = false;
    let attached = false;
    let running = false;

    /* a 3.15 MB single-encode clip is not a trade a metered or slow connection wants, and
       the browser will tell you so if you ask. `saveData` and `effectiveType` are behind an
       optional chain because Safari implements neither. */
    const thin = () => {
      const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
        .connection;
      if (!c) return false;
      return c.saveData === true || /^(slow-)?2g$|^3g$/.test(c.effectiveType ?? '');
    };

    const attach = () => {
      if (!video || attached || !near || !wide.matches || mq.matches || thin()) return;
      attached = true;
      video.src = video.dataset.src ?? '';
      video.classList.add('is-on');
      void video.play().catch(() => {});
    };

    const detach = () => {
      if (!video || !attached) return;
      attached = false;
      video.classList.remove('is-on');
      video.pause();
      video.removeAttribute('src');
      /* load() after removing src is what actually cancels an in-flight fetch */
      video.load();
    };

    const start = () => {
      if (running || mq.matches) return;
      running = true;
      section.classList.add('sx3b--live');

      /* Opacity and transform on the block itself — never a clip-path. Chromium computes an
         IntersectionObserver's rect AFTER clips, so an observed element clipped to zero
         reports ratio 0, never fires, and stays invisible for ever. That shipped as a blank
         page on this project once. */
      revealIo = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add('is-in');
            revealIo?.unobserve(e.target);
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.04 },
      );
      section.querySelectorAll('[data-rv]').forEach((el) => revealIo?.observe(el));

      /* Attached on approach, released when a screen past, in either direction — 90% of the
         viewport each way, so 810px at 1440.

         VERIFIED, AND THE OBVIOUS CHECK IS THE WRONG ONE. `video.currentSrc` does NOT go
         back to "" in Chromium after the attribute is removed and `load()` runs: it keeps
         the last resolved URL for the life of the element, so a probe that reads
         currentSrc reports a clip as still attached for ever and this release looks
         broken. The attributes that do move, measured at 1440 with a spacer appended below
         the section so the page can actually scroll past it: at 175px past, src=
         "/media/clips/pr-mov-img_5681.mp4", class "is-on", paused false, networkState 1,
         readyState 4; at 2175px past, src=null, "is-on" gone, paused true, networkState 0
         (NETWORK_EMPTY), readyState 0 — the fetch is cancelled and the element is empty.
         This preview route is 529px shorter than that threshold at its own foot, which is
         why the spacer is needed to see it at all. */
      nearIo = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            near = e.isIntersecting;
            if (near) attach();
            else detach();
          }
        },
        { rootMargin: '90% 0px 90% 0px' },
      );
      nearIo.observe(section);
    };

    const stop = () => {
      running = false;
      section.classList.remove('sx3b--live');
      revealIo?.disconnect();
      revealIo = null;
      nearIo?.disconnect();
      nearIo = null;
      detach();
      /* belt and braces: the stylesheet only hides a block while `.sx3b--live` is on, so
         removing the class is already enough — but a block that was mid-transition keeps
         its class rather than flashing back. */
      section.querySelectorAll('[data-rv]').forEach((el) => el.classList.add('is-in'));
    };

    const onPref = () => (mq.matches ? stop() : start());
    const onWide = () => (wide.matches ? attach() : detach());

    onPref();
    mq.addEventListener('change', onPref);
    wide.addEventListener('change', onWide);

    return () => {
      mq.removeEventListener('change', onPref);
      wide.removeEventListener('change', onWide);
      stop();
    };
  }, []);

  return null;
}
