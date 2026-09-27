'use client';

import { useEffect } from 'react';

/**
 * The section's only client island: ONE custom property, `--sx1-scroll`, 0 → 1 as the hero
 * scrolls from rest to fully past. Everything it drives is a `transform` in the stylesheet.
 *
 *  · one passive scroll listener that only raises a flag; the read and the write happen in
 *    one requestAnimationFrame. Geometry is measured on attach and on resize, never per frame.
 *  · attached when the hero is within a screen of the viewport, released when it is more
 *    than a screen past — an IntersectionObserver with a one-screen margin decides.
 *  · `sx1-is-live` is what turns the motion on. Without it (no JavaScript, reduced motion, or
 *    before hydration) the CSS rests at `--p: 0`, which is the finished composition.
 *  · reduced motion is honoured live: flipping the OS setting removes `sx1-is-live` at once.
 *  · never preventDefault, never scrollTo — the scroll position is the reader's.
 */
export function Sx1HeroMotion() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-sx1]');
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let top = 0;
    let span = 1;
    let raf = 0;
    let attached = false;
    let near = false;

    const measure = () => {
      const r = el.getBoundingClientRect();
      top = r.top + window.scrollY;
      span = Math.max(1, r.height);
    };
    const frame = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / span));
      el.style.setProperty('--sx1-scroll', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    const attach = () => {
      if (attached || reduce.matches) return;
      attached = true;
      measure();
      frame();
      el.classList.add('sx1-is-live');
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Released a full screen past, so the transform freezes where nobody can see it; the
    // class stays on so the state it froze in is the state it had, with no jump on return.
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        near = entry.isIntersecting;
        if (near) attach();
        else detach();
      },
      { rootMargin: '100% 0px 100% 0px' },
    );
    io.observe(el);

    const onPref = () => {
      if (reduce.matches) {
        detach();
        el.classList.remove('sx1-is-live');
        el.style.removeProperty('--sx1-scroll');
      } else if (near) {
        attach();
      }
    };
    reduce.addEventListener('change', onPref);

    return () => {
      io.disconnect();
      reduce.removeEventListener('change', onPref);
      detach();
      el.classList.remove('sx1-is-live');
      el.style.removeProperty('--sx1-scroll');
    };
  }, []);

  return null;
}
