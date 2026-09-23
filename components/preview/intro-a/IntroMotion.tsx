'use client';

import { useEffect } from 'react';

/**
 * The section's only client island. Everything else is a server component: every word and
 * the photograph are in the static HTML, and the stylesheet's defaults are the FINISHED
 * state — so a reader whose JavaScript never arrives gets the composed section, not its
 * start frame. This file only ever takes a finished value away and gives it back.
 *
 * Two properties, both written inside one requestAnimationFrame:
 *
 *   --ia-open  0 → 1  the five blocks are packed a little closer than they belong and the
 *                     room is invisible; on arrival they draw apart and the room fades up
 *                     through the slits that opening makes. Set to 0 only for a block that
 *                     is still below the fold, so a reader who lands mid-section never sees
 *                     something already painted collapse and re-open.
 *   --ia-y    -1 → 1  the room travels vertically behind the page as the section passes, so
 *                     the slits read as an aperture onto somewhere rather than as a texture.
 *                     The image is 116% of its box with 8% of slack at each edge, which is
 *                     more than twice the 3.6% travel, so no edge can ever be exposed.
 *
 * The rules it obeys, each of them a bug this site has already shipped:
 *   · ONE passive scroll listener, and it only raises a flag. Every read of scrollY and
 *     every write happens in one rAF; geometry is measured on load, on resize and on a
 *     ResizeObserver tick — never inside the frame loop.
 *   · Only `transform` and `opacity` are driven.
 *   · The reader's scroll position is never written to. No wheel or touch interception.
 *   · Nothing observed by the IntersectionObserver carries a clip: `.ia-body` has no clip
 *     of any kind, and the one element with `overflow: hidden` (`.ia-room`) is its child.
 *     Chromium computes the intersection rect AFTER clips, so an element clipped to zero
 *     reports ratio 0 and never fires — which shipped once as a blank page.
 *   · Under `prefers-reduced-motion: reduce` it attaches nothing, observes nothing and
 *     returns, leaving both properties at the finished defaults.
 */
export function IntroMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ia');
    const body = root?.querySelector<HTMLElement>('.ia-body');
    if (!root || !body || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. the opening ───────────────────────────────────────────────── */
    const below = root.getBoundingClientRect().top > innerHeight * 0.7;
    if (below) root.style.setProperty('--ia-open', '0');

    const open = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          root.style.setProperty('--ia-open', '1');
          open.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );
    open.observe(body);

    /* ── 2. the travel ────────────────────────────────────────────────── */
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

    let top = 0;
    let height = 1;
    function measure() {
      const r = body!.getBoundingClientRect();
      top = r.top + scrollY;
      height = r.height || 1;
    }

    let queued = false;
    let last = '';
    function frame() {
      queued = false;
      const vh = innerHeight || 1;
      /* -1 when the block's centre is a screen below the viewport's, +1 a screen above */
      const p = (scrollY + vh / 2 - (top + height / 2)) / (vh * 0.85 + height * 0.5);
      const v = clamp(p, -1, 1).toFixed(4);
      if (v !== last) {
        last = v;
        root!.style.setProperty('--ia-y', v);
      }
    }
    function request() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    }
    function relayout() {
      measure();
      request();
    }

    measure();
    request();
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', relayout);
    const ro = new ResizeObserver(relayout);
    ro.observe(body);

    return () => {
      open.disconnect();
      ro.disconnect();
      removeEventListener('scroll', request);
      removeEventListener('resize', relayout);
    };
  }, []);

  return null;
}
