'use client';

import { useEffect } from 'react';

/**
 * The section's one client island. It does exactly two things:
 *
 *  1. Writes `--sx7a-p` (0…1) on frames 2–5: how far each photograph has been wiped up over the
 *     one before it. A frame's wipe is tied to its own caption — it runs while the top of
 *     step i travels from A to A−B of the viewport height, so the picture arrives with the
 *     words that describe it and then HOLDS while they are read. One passive scroll listener
 *     raises a flag; every read and write happens inside one requestAnimationFrame;
 *     geometry is measured on load and on resize only (DESIGN-SYSTEM §3.4).
 *
 *  2. Attaches the one loop (the held inversion) when the section is within a screen, plays
 *     it only while its frame is the one showing, and releases the source a screen past.
 *
 * Under prefers-reduced-motion it does neither: the stylesheet has already laid the
 * section out as a static essay, and no video is ever fetched. With JavaScript off the same
 * static layout stands, because the pinned stage is scoped to `.js`.
 */
export function Sx7aMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx7a');
    if (!root) return;
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const narrowMq = matchMedia('(max-width: 899px)');

    const frames = [...root.querySelectorAll<HTMLElement>('.sx7a-frame')];
    const steps = [...root.querySelectorAll<HTMLElement>('.sx7a-step')];
    const video = root.querySelector<HTMLVideoElement>('.sx7a-clip');

    let tops: number[] = [];
    let vh = innerHeight;
    let raf = 0;
    let near = false;
    let onScreen = false;
    let current = 0;
    const last: number[] = frames.map(() => -1);

    const measure = () => {
      vh = innerHeight;
      tops = steps.map((s) => s.getBoundingClientRect().top + scrollY);
    };

    /* A waiting frame sits wholly below the pane, clipped by the stage — and Chromium
       intersects AFTER clips, so its lazy <img> would report zero area and only start
       fetching when its wipe begins, revealing an empty frame. So once the section is
       within a screen, every picture in it is asked for. */
    const imgs = [...root.querySelectorAll<HTMLImageElement>('.sx7a-img')];
    let primed = false;
    const prime = () => {
      if (primed) return;
      primed = true;
      for (const img of imgs) img.loading = 'eager';
    };

    const syncVideo = () => {
      if (near && !mq.matches) prime();
      if (!video) return;
      const want = near && !mq.matches;
      if (want && !video.getAttribute('src')) {
        video.src = video.dataset.src ?? '';
      }
      if (!want && video.getAttribute('src')) {
        video.pause();
        video.removeAttribute('src');
        video.load();
        video.classList.remove('is-playing');
        return;
      }
      if (want && onScreen && current === 0) {
        void video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    };

    const frame = () => {
      raf = 0;
      if (mq.matches) return;
      const y = scrollY;
      // Desktop: the caption rises through the middle of a screen beside the picture, and
      // the picture arrives with it.
      // Phone: captions are cards ON the picture, so a card must never sit over the wrong
      // one. The wipe is keyed to the DEPARTING card: step i's top is 14px under the bottom
      // of card i−1, and the new frame rises while that edge climbs from 35% of the screen
      // to the top. The seam then moves 1/0.35 ≈ 2.9× faster than the cards, so it stays
      // below the leaving card and — with the next card starting ≥ 65svh further down
      // (`padding-top: 64svh` in the stylesheet) — above the arriving one.
      const narrow = narrowMq.matches;
      const A = narrow ? 0.35 + 14 / vh : 0.86;
      const B = narrow ? 0.35 : 0.4;
      let cur = 0;
      for (let i = 1; i < frames.length; i++) {
        const el = frames[i];
        if (!el) continue;
        const top = (tops[i] ?? 0) - y;
        let p = (A * vh - top) / (B * vh);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        const q = Math.round(p * 1000) / 1000;
        if (q !== last[i]) {
          last[i] = q;
          el.style.setProperty('--sx7a-p', String(q));
          el.classList.toggle('is-wiping', q > 0 && q < 1);
        }
        if (q >= 0.5) cur = i;
      }
      if (cur !== current) {
        current = cur;
        syncVideo();
      }
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      request();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === root) {
            // rootMargin: one screen above and below — attach on approach, release a screen past
            near = e.isIntersecting;
          }
        }
        syncVideo();
      },
      { rootMargin: '100% 0px 100% 0px' },
    );
    const ioVisible = new IntersectionObserver((entries) => {
      for (const e of entries) onScreen = e.isIntersecting;
      syncVideo();
    });
    io.observe(root);
    ioVisible.observe(root);

    const onPlaying = () => video?.classList.add('is-playing');
    video?.addEventListener('playing', onPlaying);

    // Layout moves under the section when fonts and lazy pictures land; re-measure then.
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    const onMq = () => {
      if (mq.matches) {
        for (const f of frames) {
          f.style.removeProperty('--sx7a-p');
          f.classList.remove('is-wiping');
        }
        last.fill(-1);
      }
      measure();
      request();
      syncVideo();
    };
    mq.addEventListener('change', onMq);
    narrowMq.addEventListener('change', onResize);

    measure();
    request();
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      removeEventListener('scroll', request);
      removeEventListener('resize', onResize);
      mq.removeEventListener('change', onMq);
      narrowMq.removeEventListener('change', onResize);
      video?.removeEventListener('playing', onPlaying);
      io.disconnect();
      ioVisible.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
