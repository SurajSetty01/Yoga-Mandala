'use client';

import { useEffect } from 'react';

/**
 * The page's single client island. Everything above it is a server component, so every word,
 * every poster and every wall label is in the static HTML and the page is finished before
 * this file runs at all.
 *
 * It does three things:
 *
 *   1. reveals `[data-wi]` blocks, opt-in through `.is-live` on the root — a reader whose
 *      JavaScript never arrives keeps the whole page, because nothing that is already
 *      painted is ever hidden by CSS that is not gated on this class;
 *   2. attaches, plays, pauses and RELEASES the silent loops — see the contract below;
 *   3. drifts each picture inside its own aperture as the reader passes, so a frame reads as
 *      a window being walked past rather than a rectangle pasted onto the page.
 *
 * The rules it obeys, every one of them a bug already shipped on this site:
 *   · it clips nothing that it observes — Chromium computes an IntersectionObserver's rect
 *     AFTER clips, so an element carrying a clip-to-zero reports ratio 0 and never fires.
 *     The arch mask is on a CHILD of every observed element;
 *   · one passive scroll listener that only raises a flag. Geometry is measured on load and
 *     on resize and nowhere else; the frame callback does arithmetic on cached numbers and
 *     writes one custom property. Nothing reads layout inside the scroll path;
 *   · only `transform` and `opacity` are ever animated;
 *   · under `prefers-reduced-motion: reduce` it attaches nothing, plays nothing and returns.
 *     The page is then four posters and five stills — complete, and the state every wall
 *     label, chip and paragraph is written for.
 */
export function WithinMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.wi');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. reveals ───────────────────────────────────────────────────── */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-wi]')];
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
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    for (const el of revealables) if (!el.classList.contains('in')) reveal.observe(el);

    /* ── 2. the loops ─────────────────────────────────────────────────────────────────
     *
     * THE LOADING CONTRACT, and it is the same one lib/hero-choreography.ts runs on:
     * `demand()` attaches a source and proves it is playing before anything fades in;
     * `pace()` lets only footage you can actually see decode. This page adds the third
     * verb the hero does not need, because the hero's three clips share one sticky stage
     * and this page's four are spread down 8,000 pixels:
     *
     *   demand()   attach `data-src`, play, and fade in ONLY once readyState >= 3 AND
     *              currentTime has advanced past 0. A stall, an eviction or a blocked
     *              autoplay therefore leaves a photograph on screen, never a black hole.
     *   pace()     play what is near, pause what is not, pause everything when the tab
     *              is hidden. Decode only what is on screen.
     *   release()  the frame is well past: pause, drop the source and `load()`. THIS IS
     *              THE ONE THAT COSTS MEGABYTES. `pause()` stops the decoder but not the
     *              transfer — Chromium keeps buffering a paused clip to the end of the
     *              file, so the rejected measurement of this page pulled all four loops
     *              in full (8,306 KB) no matter how briefly any of them was looked at.
     *              Dropping the source aborts the request in flight and frees the buffer.
     *
     * And nothing is attached at all until a frame has been ON SCREEN FOR A MOMENT: a
     * reader flinging the page to the footer passes four arches in under a second and
     * should not be charged 8 MB for frames they never stopped at. The settle is 180 ms,
     * below the point at which anyone has decided to look at anything.
     *
     * Every <video> here carries `preload="none"` and NO `poster`. The <img> beneath is
     * the poster and is never removed; a poster attribute is fetched even when `src` is
     * never set, which cost 948 KB on every device on this site once already.
     */
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const thin = !!(conn && (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? '')));
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    /* THE SAME CAPABILITY GATE THE APPROVED HERO USES. A phone gets the posters, and that
       is a measurement rather than a preference: p13-img_0593.mp4 is 1,733,432 B and its
       AVIF poster is 67,593 B. All four posters together are a fifth of ONE clip, and this
       page's poster state is a complete state — it is the one reduced motion gets. */
    const lite = thin || !canMp4 || matchMedia('(max-width: 860px)').matches;

    const clips = lite ? [] : [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')];
    /* The FIGURE is observed, never the mask: the mask carries the arch and `overflow: clip`,
       and an observed element that clips is the bug that shipped a blank page here once. */
    const hosts = new Map<Element, HTMLVideoElement>();
    for (const v of clips) {
      const host = v.closest('figure');
      if (host) hosts.set(host, v);
    }

    const near = new Set<HTMLVideoElement>();
    const polls = new Map<HTMLVideoElement, ReturnType<typeof setInterval>>();
    const settles = new Map<HTMLVideoElement, ReturnType<typeof setTimeout>>();
    /* one controller per attachment, so release() takes every listener off in one move and
       a re-attach after a release cannot stack a second copy of any of them. */
    const bound = new Map<HTMLVideoElement, AbortController>();

    const stopPoll = (v: HTMLVideoElement) => {
      const p = polls.get(v);
      if (p !== undefined) {
        clearInterval(p);
        polls.delete(v);
      }
    };

    function demand(v: HTMLVideoElement) {
      if (v.src) {
        if (v.paused) void v.play()?.catch(() => {});
        return;
      }
      const ac = new AbortController();
      bound.set(v, ac);
      const { signal } = ac;

      v.src = v.dataset.src ?? '';
      v.load();

      /* PROOF, not optimism: the loop is only allowed over the photograph once it has
         decoded enough to play AND the clock has actually moved. */
      const prove = () => {
        if (v.readyState >= 3 && v.currentTime > 0) {
          v.classList.add('is-live');
          stopPoll(v);
        }
      };
      polls.set(v, setInterval(prove, 120));
      v.addEventListener('timeupdate', prove, { signal });
      v.addEventListener('canplay', () => void v.play()?.catch(() => {}), { once: true, signal });
      v.addEventListener(
        'error',
        () => {
          stopPoll(v);
          v.classList.remove('is-live');
        },
        { signal }
      );
      void v.play()?.catch(() => {});
    }

    /** has the whole file already arrived? then there is nothing left in flight to abort. */
    const settled = (v: HTMLVideoElement) => {
      const b = v.buffered;
      return v.duration > 0 && b.length > 0 && b.start(0) <= 0.05 && b.end(b.length - 1) >= v.duration - 0.25;
    };

    /* A clip is only ever dropped ONCE. A reader working up and down a section would
       otherwise pay for the same footage on every pass, and two downloads is the worst this
       is allowed to cost. */
    const dropped = new WeakSet<HTMLVideoElement>();

    function release(v: HTMLVideoElement) {
      const s = settles.get(v);
      if (s !== undefined) {
        clearTimeout(s);
        settles.delete(v);
      }
      if (!v.src) return;
      v.pause();
      /* ABORT WHAT IS IN FLIGHT; NEVER THROW AWAY WHAT HAS ALREADY BEEN PAID FOR. Measured,
         because the first cut of this got it wrong: dropping a clip that had finished
         downloading made a reader who scrolled back up fetch all of it again, and a
         down-then-up read of the page went from 10,324 KB to 13,823 KB — a third WORSE than
         the page this replaces. On a fast line every clip completes while its arch is on
         screen, so the honest rule is to release only a transfer that is still running. */
      if (dropped.has(v) || settled(v)) return;
      dropped.add(v);
      stopPoll(v);
      bound.get(v)?.abort();
      bound.delete(v);
      v.classList.remove('is-live');
      /* removeAttribute + load() is what aborts the request; setting src = '' would resolve
         against the document URL and re-request the page itself. */
      v.removeAttribute('src');
      v.load();
    }

    function pace() {
      const hidden = document.hidden;
      for (const v of clips) {
        if (!v.src) continue;
        if (near.has(v) && !hidden) {
          if (v.paused) void v.play()?.catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    }

    /* ARRIVING — the first pixel of the arch, and not one scroll-tick before it. A lead
       margin was tried and measured: at 1440x900 the first arch begins 34px under the fold,
       so ANY positive rootMargin attaches a 1.7 MB clip during the initial load, which took
       the cold first paint from 1,735 KB to 3,252 KB. A frame that is not yet on the page
       does not get to spend the reader's data. Paused the moment the arch leaves. */
    const film = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = hosts.get(e.target);
          if (!v) continue;
          if (e.isIntersecting) {
            near.add(v);
            if (v.src) {
              if (v.paused) void v.play()?.catch(() => {});
            } else if (!settles.has(v)) {
              settles.set(
                v,
                setTimeout(() => {
                  settles.delete(v);
                  if (near.has(v)) demand(v);
                }, 180)
              );
            }
          } else {
            near.delete(v);
            const s = settles.get(v);
            if (s !== undefined) {
              clearTimeout(s);
              settles.delete(v);
            }
            if (v.src && !v.paused) v.pause();
          }
        }
      },
      { rootMargin: '0px', threshold: 0 }
    );

    /* WELL PAST — a viewport and a half clear of the frame in either direction. Generous
       on purpose: the hysteresis has to be wide enough that reading back up a section does
       not re-request the clip that was just released. */
    const keep = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) continue;
          const v = hosts.get(e.target);
          if (v) release(v);
        }
      },
      { rootMargin: '150% 0px 150% 0px', threshold: 0 }
    );

    for (const host of hosts.keys()) {
      film.observe(host);
      keep.observe(host);
    }

    const onVis = () => pace();
    addEventListener('visibilitychange', onVis);

    /* ── 3. the drift ─────────────────────────────────────────────────── */
    const drifters = [...root.querySelectorAll<HTMLElement>('[data-drift]')];
    const box = drifters.map((el) => ({ el, top: 0, h: 1 }));

    /* Geometry is read here — on load, on resize, and when the page's own images finish
       laying themselves out — and never inside the scroll path. */
    const measure = () => {
      for (const b of box) {
        const r = b.el.getBoundingClientRect();
        b.top = r.top + scrollY;
        b.h = r.height || 1;
      }
    };

    let queued = false;
    const frame = () => {
      queued = false;
      const vh = innerHeight || 1;
      const y = scrollY;
      for (const b of box) {
        /* 0 as the frame enters from below, 1 as it leaves at the top. Written as a signed
           value so the CSS can keep its own amplitude and direction. */
        const p = (y + vh - b.top) / (vh + b.h);
        const c = p < 0 ? 0 : p > 1 ? 1 : p;
        b.el.style.setProperty('--wi-y', (c - 0.5).toFixed(4));
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
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);

    /* Posters arrive after first paint and change the height of nothing that is fixed, but
       fonts and wrapping do; one observer on the root re-measures instead of guessing. */
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      reveal.disconnect();
      film.disconnect();
      keep.disconnect();
      ro.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      removeEventListener('visibilitychange', onVis);
      /* Unmount is unconditional: the page is going away, so anything still in flight is
         waste by definition and the "already paid for" rule above does not apply. */
      for (const v of clips) {
        const s = settles.get(v);
        if (s !== undefined) clearTimeout(s);
        stopPoll(v);
        bound.get(v)?.abort();
        if (!v.paused) v.pause();
        if (v.src) {
          v.classList.remove('is-live');
          v.removeAttribute('src');
          v.load();
        }
      }
      settles.clear();
      bound.clear();
      near.clear();
      root.classList.remove('is-live');
      for (const b of box) b.el.style.removeProperty('--wi-y');
    };
  }, []);

  return null;
}
