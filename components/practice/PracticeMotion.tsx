'use client';

import { useEffect } from 'react';

/**
 * The page's only client island. Everything else on /practice/ is a server component, so
 * every sentence, every photograph and every link is in the static HTML and the page is
 * finished before this file runs at all.
 *
 * IT DOES THREE THINGS.
 *
 *   1. REVEALS `[data-pc]` blocks, opt-in through `.is-live` on the page root, so a reader
 *      whose JavaScript never arrives keeps everything that is already painted. Anything
 *      already on screen is resolved BEFORE `.is-live` goes on, so a reader who lands
 *      mid-page never watches a block they just read fade back in.
 *
 *      The hero windows are NOT in this system. Their opening is a CSS load animation, so
 *      the start state is in the first paint rather than arriving after hydration — see
 *      Hero.tsx. The breath rules in §04 are CSS keyframes for the same reason, and
 *      because they run on a clock rather than on the reader.
 *
 *   2. WRITES TWO SCROLL-LINKED CUSTOM PROPERTIES, both of which have a finished default in
 *      the stylesheet, so the page never depends on this file to be complete:
 *
 *        --pc-lift   §01   -0.5 → 0.5   the column of repetitions drifting upward
 *        --pc-run    §02   -0.5 → 0.5   the frieze of prepared rooms drifting sideways
 *
 *      Both feed a single `translate3d`. Nothing else is animated from scroll anywhere on
 *      this page.
 *
 *   3. ATTACHES AND RELEASES THE TWO CLIPS, on the contract lib/hero-choreography.ts and
 *      components/within/WithinMotion.tsx already run on.
 *
 * THE RULES IT OBEYS, each of them a bug already shipped on this site:
 *   · ONE passive scroll listener, and it only raises a flag. Every read of scrollY and
 *     every write happens inside one requestAnimationFrame. Geometry is measured on load,
 *     on resize and on a ResizeObserver tick — never inside the frame loop.
 *   · Only `transform` and `opacity` are animated.
 *   · Nothing that is IntersectionObserved carries a clip. Chromium computes the
 *     intersection rect AFTER clips, so an element clipped to zero reports ratio 0 and
 *     never fires; that shipped a blank page here once. The clipped elements on this page
 *     (the well in §01, the strip in §02, the windows in the hero) are parents of, or
 *     siblings to, the observed ones.
 *   · The reader's scroll position is never written to. No wheel or touch interception.
 *   · Under prefers-reduced-motion it attaches nothing, observes nothing and returns.
 *     `.is-live` is never added, every reveal start state stays inert, both properties
 *     keep the finished value the stylesheet gives them, and no clip is ever fetched.
 */
export function PracticeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.pc');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── 1. reveals ─────────────────────────────────────────────────────────── */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-pc]')];
    for (const el of revealables) {
      if (el.getBoundingClientRect().top < innerHeight * 0.94) el.classList.add('in');
    }

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

    root.classList.add('is-live');

    /* ── 2. the two properties ──────────────────────────────────────────────── */
    const drifters: Array<{ el: HTMLElement; prop: string; top: number; h: number }> = [];
    const add = (sel: string, prop: string) => {
      const el = root.querySelector<HTMLElement>(sel);
      if (el) drifters.push({ el, prop, top: 0, h: 1 });
    };
    add('.pc-sad__col', '--pc-lift');
    add('.pc-reg__track', '--pc-run');

    const measure = () => {
      for (const d of drifters) {
        const r = d.el.getBoundingClientRect();
        d.top = r.top + scrollY;
        d.h = r.height || 1;
      }
    };

    let queued = false;
    const frame = () => {
      queued = false;
      const vh = innerHeight || 1;
      const y = scrollY;
      for (const d of drifters) {
        /* 0 as the element enters from below, 1 as it leaves at the top. Signed, so the
           stylesheet keeps its own amplitude and its own direction. */
        const p = (y + vh - d.top) / (vh + d.h);
        const c = p < 0 ? 0 : p > 1 ? 1 : p;
        d.el.style.setProperty(d.prop, (c - 0.5).toFixed(4));
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    /* ── 3. the clips ───────────────────────────────────────────────────────────────
     *
     *   demand()   attach `data-src`, play, and fade in ONLY once readyState >= 3 AND
     *              currentTime has moved past 0. A stall, an eviction or a blocked
     *              autoplay therefore leaves a photograph on screen, never a black hole.
     *   pace()     play what is near, pause what is not, pause everything when the tab is
     *              hidden. Only footage a reader can see is allowed to decode.
     *   release()  the frame is well past: pause, drop the source, load(). THIS IS THE ONE
     *              THAT COSTS MEGABYTES — pause() stops the decoder but not the transfer,
     *              and Chromium keeps buffering a paused clip to the end of the file.
     *              A transfer that has already FINISHED is never dropped, because then a
     *              reader working back up the page would pay for it twice, which is worse
     *              than paying once.
     *
     * Nothing is attached until a frame has been on screen for a moment: a reader flinging
     * this page to the footer passes three apertures in under a second and should not be
     * charged for footage they never stopped at.
     *
     * Every <video> here carries `preload="none"` and NO `poster`. The <img> beneath is
     * the poster and is never removed; a poster attribute is fetched even when `src` is
     * never set, which cost this site 948 KB on every device once already.
     *
     * TWO OF THE THREE APERTURES HOLD THE SAME FILE — the hero's centre window and the
     * last section's return. The second one is the same URL and therefore the same cache
     * entry, so the page's closing argument is free.
     */
    const conn = (
      navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ''))
    );
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    /* THE SAME CAPABILITY GATE THE APPROVED HERO AND /within/ BOTH USE, and it is a
       measurement rather than a preference: pr-mov-img_5687.mp4 is 2,384,325 B and its
       AVIF poster is a small fraction of that. A phone gets the posters, and the poster
       state of this page is a complete state — it is the one reduced motion gets too. */
    const lite = thin || !canMp4 || matchMedia('(max-width: 860px)').matches;
    const clips = lite ? [] : [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')];

    /* The FIGURE is observed, never the aperture: the aperture clips, and an observed
       element that clips is the bug that shipped a blank page on this site once. */
    const hosts = new Map<Element, HTMLVideoElement>();
    for (const v of clips) {
      const host = v.closest('figure');
      if (host) hosts.set(host, v);
    }

    const near = new Set<HTMLVideoElement>();
    const polls = new Map<HTMLVideoElement, ReturnType<typeof setInterval>>();
    const settles = new Map<HTMLVideoElement, ReturnType<typeof setTimeout>>();
    const bound = new Map<HTMLVideoElement, AbortController>();
    const dropped = new WeakSet<HTMLVideoElement>();

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
        { signal },
      );
      void v.play()?.catch(() => {});
    }

    /** has the whole file already arrived? then there is nothing left in flight to abort. */
    const settled = (v: HTMLVideoElement) => {
      const b = v.buffered;
      return (
        v.duration > 0 && b.length > 0 && b.start(0) <= 0.05 && b.end(b.length - 1) >= v.duration - 0.25
      );
    };

    function release(v: HTMLVideoElement) {
      const s = settles.get(v);
      if (s !== undefined) {
        clearTimeout(s);
        settles.delete(v);
      }
      if (!v.src) return;
      v.pause();
      if (dropped.has(v) || settled(v)) return;
      dropped.add(v);
      stopPoll(v);
      bound.get(v)?.abort();
      bound.delete(v);
      v.classList.remove('is-live');
      /* removeAttribute + load() is what aborts the request; setting src = '' would
         resolve against the document URL and re-request the page itself. */
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
                }, 180),
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
      { rootMargin: '0px', threshold: 0 },
    );

    /* WELL PAST — a viewport and a half clear in either direction, so reading back up a
       section cannot re-request the clip that was just let go. */
    const keep = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) continue;
          const v = hosts.get(e.target);
          if (v) release(v);
        }
      },
      { rootMargin: '150% 0px 150% 0px', threshold: 0 },
    );

    for (const host of hosts.keys()) {
      film.observe(host);
      keep.observe(host);
    }

    /* ── boot ───────────────────────────────────────────────────────────────── */
    const onVis = () => pace();
    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        measure();
        frame();
      }, 140);
    };

    measure();
    frame();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('visibilitychange', onVis);

    /* Photographs finishing their layout move everything below them, so geometry is
       re-read when the page settles rather than only at hydration. */
    const ro = new ResizeObserver(() => onResize());
    ro.observe(document.body);
    void document.fonts?.ready.then(() => {
      measure();
      frame();
    });

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('visibilitychange', onVis);
      clearTimeout(rz);
      ro.disconnect();
      reveal.disconnect();
      film.disconnect();
      keep.disconnect();
      for (const p of polls.values()) clearInterval(p);
      for (const s of settles.values()) clearTimeout(s);
      for (const ac of bound.values()) ac.abort();
      for (const v of clips) if (!v.paused) v.pause();
    };
  }, []);

  return null;
}
