'use client';

import { useEffect } from 'react';

/**
 * The reading line drives three things in section 01, and only while the reader moves:
 *   · each practice lights as its centre crosses the line, and stays lit;
 *   · the rule fills to the line;
 *   · the clip plays forward to the matching moment and pauses there.
 *
 * WHY PLAY-TO-TARGET AND NOT SEEK. pr-mov-img_5659 has keyframes at 0 s and 8.33 s only, so
 * every seek decodes from the start of the file; scrubbing `currentTime` on scroll stutters.
 * Playing forward is the cheapest thing a decoder does. So the reading position sets a
 * target time, the clip plays until it reaches it (faster, up to 3×, when the reader has
 * run ahead) and pauses there. Stop reading and it stops. The target only ever rises:
 * progress is kept, and the decoder never has to go backwards.
 *
 * T0 is the frame the poster <img> was cut from (matched against the clip by PSNR: 38 dB at
 * 1.47–1.50 s, under 31 dB either side), so the moment the clip takes over from the picture
 * is invisible. T1 stops short of the file's end so `loop` never wraps.
 *
 * Rules kept: one passive scroll listener that raises a flag; geometry measured on load and
 * resize only; the scroll frame writes one transform and adds classes; nothing observed is
 * clipped; the clip attaches on approach and is released well past unless it has already
 * fully arrived. Under reduced motion this returns at once and the section is finished.
 */
const T0 = 1.48;
const T1 = 8.28;
const LINE = 0.55;

export function Tl2Reader() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tl2');
    if (!root) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const time = root.querySelector<HTMLElement>('.tl2-time');
    const list = root.querySelector<HTMLElement>('.tl2-list');
    const fill = root.querySelector<HTMLElement>('.tl2-fill');
    const items = [...root.querySelectorAll<HTMLElement>('.tl2-one')];
    if (!time || !list || !fill || items.length === 0) return;

    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
    );
    const vEl = root.querySelector<HTMLVideoElement>('video[data-tl2-src]');
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    const vid = vEl && !thin && canMp4 ? vEl : null;

    root.classList.add('is-live');

    /* ── geometry, cached ── */
    let listTop = 0;
    let listH = 1;
    let centres: number[] = [];
    const measure = () => {
      const r = list.getBoundingClientRect();
      listTop = r.top + scrollY;
      listH = Math.max(1, r.height);
      centres = items.map((el) => {
        const b = el.getBoundingClientRect();
        return b.top + scrollY + b.height / 2;
      });
    };

    /* ── progress, monotonic ── */
    let filled = 0;
    let reached = 0;
    let lit = 0;
    let lastFill = -1;
    const target = () => T0 + reached * (T1 - T0);

    /* ── the clip ── */
    let ready = false;
    let watching = false;

    const show = () => {
      if (vid && ready && vid.readyState >= 2) vid.classList.add('is-on');
    };

    const tick = () => {
      if (!vid) return;
      const goal = target();
      const now = vid.currentTime;
      if (now > T0 + 0.02 && vid.readyState >= 2) vid.classList.add('is-on');
      if (vid.paused || now >= goal - 0.015 || now >= T1) {
        vid.pause();
        watching = false;
        return;
      }
      vid.playbackRate = Math.min(3, Math.max(1, (goal - now) / 0.6));
      requestAnimationFrame(tick);
    };

    const steer = () => {
      if (!vid || !ready || document.hidden) return;
      const gap = target() - vid.currentTime;
      if (gap <= 0.04) return;
      vid.playbackRate = Math.min(3, Math.max(1, gap / 0.6));
      if (vid.paused) void vid.play().catch(() => {});
      if (!watching) {
        watching = true;
        requestAnimationFrame(tick);
      }
    };

    const attach = () => {
      if (!vid || vid.getAttribute('src')) return;
      const s = vid.dataset.tl2Src;
      if (!s) return;
      ready = false;
      vid.src = s;
      vid.preload = 'auto';
      vid.load();
    };

    /* `pause()` stops the decoder but not the transfer; dropping the source aborts it. A
       clip that has already fully arrived is kept, so a reader coming back is not charged
       for it twice. */
    const release = () => {
      if (!vid || !vid.getAttribute('src')) return;
      vid.pause();
      watching = false;
      const done =
        vid.duration > 0 &&
        vid.buffered.length > 0 &&
        vid.buffered.end(vid.buffered.length - 1) >= vid.duration - 0.35;
      if (done) return;
      ready = false;
      vid.classList.remove('is-on');
      vid.removeAttribute('src');
      vid.load();
    };

    const onMeta = () => {
      if (!vid) return;
      vid.currentTime = target();
    };
    const onSeeked = () => {
      if (ready) return;
      ready = true;
      show();
      steer();
    };
    vid?.addEventListener('loadedmetadata', onMeta);
    vid?.addEventListener('seeked', onSeeked);
    vid?.addEventListener('canplay', show);

    /* ── the scroll frame ── */
    let queued = false;
    const frame = () => {
      queued = false;
      const line = scrollY + innerHeight * LINE;

      const f = Math.min(1, Math.max(0, (line - listTop) / listH));
      if (f > filled) filled = f;
      const q = Math.round(filled * 1000) / 1000;
      if (q !== lastFill) {
        lastFill = q;
        fill.style.transform = `scaleY(${q})`;
      }

      const c0 = centres[0] ?? 0;
      const cN = centres[centres.length - 1] ?? 1;
      const p = Math.min(1, Math.max(0, (line - c0) / Math.max(1, cN - c0)));
      if (p > reached) reached = p;

      let n = 0;
      for (const c of centres) if (line >= c) n++;
      while (lit < n) items[lit++]?.classList.add('is-lit');

      steer();
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const remeasure = () => {
      measure();
      onScroll();
    };

    /* ── approach and departure ── */
    const near = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) attach();
          else vid?.pause();
        }
      },
      { rootMargin: '60% 0px 60% 0px' },
    );
    const far = new IntersectionObserver(
      (es) => {
        for (const e of es) if (!e.isIntersecting) release();
      },
      { rootMargin: '150% 0px 150% 0px' },
    );
    if (vid) {
      near.observe(time);
      far.observe(time);
    }

    const onHidden = () => {
      if (document.hidden) vid?.pause();
    };
    document.addEventListener('visibilitychange', onHidden);

    /* layout above this section settles late (fonts, pictures), so the cached geometry
       follows the document's height rather than trusting the first measurement */
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);

    measure();
    frame();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', remeasure);

    return () => {
      near.disconnect();
      far.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onHidden);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', remeasure);
      vid?.removeEventListener('loadedmetadata', onMeta);
      vid?.removeEventListener('seeked', onSeeked);
      vid?.removeEventListener('canplay', show);
      vid?.pause();
    };
  }, []);

  return null;
}
