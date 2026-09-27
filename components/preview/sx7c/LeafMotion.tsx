'use client';

import { useEffect } from 'react';

/**
 * The leaf's only client island. It moves exactly one thing: the illumination opening out
 * of the binding disc. Text never moves — a book's words do not arrive; its plates do.
 *
 * THE IRIS, in transforms only. The plate is a fixed rectangle with `overflow: hidden`.
 * Inside it a circle of diameter D, centred on the disc, is scaled by `s`; inside the
 * circle the picture is scaled by 1/s about the same point, so the picture stays exactly
 * where it is while the window onto it grows. D is twice the distance from the disc to the
 * plate's farthest corner, so at s = 1 the circle covers the rectangle and the class comes
 * off, leaving a plain rectangle, which is what the page is with no JavaScript at all.
 *
 *   · ONE passive scroll listener that only raises a flag; all reads and writes in one
 *     requestAnimationFrame. Geometry is measured on load, font load and resize only.
 *   · Only `transform` and `opacity` change per frame. The reader's scroll is never
 *     written, and no wheel or touch event is intercepted.
 *   · Under `prefers-reduced-motion: reduce` it attaches nothing and returns: the plate is
 *     open and the still stands in for the clip.
 *   · THE CLIP is attached when the plate comes within a screen of the viewport and
 *     released (src removed, buffer dropped) when it is more than a screen away.
 */
export function LeafMotion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const plate = document.querySelector<HTMLElement>('[data-sx7c-plate]');
    const dot = document.querySelector<HTMLElement>('[data-sx7c-disc]');
    const video = plate?.querySelector<HTMLVideoElement>('video[data-src]');
    if (!plate || !dot || !video) return;

    let top = 0;
    let h = 0;
    let vh = innerHeight;
    let D = 1;
    let d = 12;
    let queued = false;
    let lastS = -1;
    let near = false;
    let attached = false;

    const measure = () => {
      const r = plate.getBoundingClientRect();
      const dr = dot.getBoundingClientRect();
      top = r.top + scrollY;
      h = r.height;
      vh = innerHeight;
      const w = r.width;
      // the disc's centre, in the plate's own coordinates, held inside the plate
      const cx = Math.min(w, Math.max(0, dr.left + dr.width / 2 - r.left));
      const cy = Math.min(h, Math.max(0, dr.top + dr.height / 2 - r.top));
      d = Math.max(4, dr.width);
      const far = Math.max(
        Math.hypot(cx, cy),
        Math.hypot(w - cx, cy),
        Math.hypot(cx, h - cy),
        Math.hypot(w - cx, h - cy)
      );
      D = Math.ceil(2 * far + 2);
      plate.style.setProperty('--sx7c-cx', `${cx}px`);
      plate.style.setProperty('--sx7c-cy', `${cy}px`);
      plate.style.setProperty('--sx7c-w', `${w}px`);
      plate.style.setProperty('--sx7c-h', `${h}px`);
      plate.style.setProperty('--sx7c-D', `${D}px`);
      lastS = -1;
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      video.src = video.dataset.src!;
      video.load();
    };
    const release = () => {
      if (!attached) return;
      attached = false;
      video.pause();
      video.removeAttribute('src');
      video.load();
      video.classList.remove('is-live');
    };
    const onData = () => video.classList.add('is-live');
    video.addEventListener('loadeddata', onData);

    const frame = () => {
      queued = false;
      // the plate's centre, in viewport px: closed while it is low on the screen (so the
      // disc is seen sitting in the root line first), open by the time it is centred
      const yc = top + h / 2 - scrollY;
      const p = Math.min(1, Math.max(0, (0.86 * vh - yc) / (0.4 * vh)));
      const e = p * p * (3 - 2 * p);
      const s0 = d / D;
      const s = e >= 0.999 ? 1 : s0 + (1 - s0) * e;
      const v = Math.round(s * 10000) / 10000;

      if (v !== lastS) {
        lastS = v;
        const open = v >= 1;
        plate.classList.toggle('is-iris', !open);
        plate.style.setProperty('--sx7c-s', String(Math.max(v, 0.0001)));
        // the disc gives way once the opening is a few times its own size
        const r = (v * D) / 2;
        const o = Math.min(1, Math.max(0, 1 - (r - d / 2) / (d * 1.6)));
        dot.style.opacity = String(Math.round(o * 1000) / 1000);
      }

      // plays only while the opening has begun AND some of the plate is on screen; the
      // clip stays attached (buffered) within a screen either side, and is released beyond
      if (near && attached) {
        const onScreen = yc - h / 2 < vh && yc + h / 2 > 0;
        if (p > 0 && onScreen) {
          if (video.paused) video.play().catch(() => {});
        } else if (!video.paused) video.pause();
      }
    };

    const request = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      request();
    };

    const io = new IntersectionObserver(
      (entries) => {
        near = entries.some((en) => en.isIntersecting);
        if (near) attach();
        else release();
        request();
      },
      { rootMargin: '100% 0px 100% 0px' }
    );

    measure();
    request();
    io.observe(plate);
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(plate.closest('.sx7c-leaf') ?? plate);
    document.fonts?.ready.then(onResize);

    return () => {
      io.disconnect();
      ro.disconnect();
      removeEventListener('scroll', request);
      removeEventListener('resize', onResize);
      video.removeEventListener('loadeddata', onData);
      release();
      plate.classList.remove('is-iris');
      for (const k of ['--sx7c-cx', '--sx7c-cy', '--sx7c-w', '--sx7c-h', '--sx7c-D', '--sx7c-s'])
        plate.style.removeProperty(k);
      dot.style.removeProperty('opacity');
    };
  }, []);

  return null;
}
