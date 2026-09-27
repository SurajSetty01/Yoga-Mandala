'use client';

import { useEffect } from 'react';

/**
 * sx6b's only client island. The section is complete before this runs: every sentence,
 * every poster and every caption is in the static HTML, and the stylesheet's DEFAULT is the
 * finished frieze with the whole quotation lit.
 *
 * What it adds, and only when motion is allowed:
 *
 *   1. `.sx6b--live` — only if the viewport is at least 600px tall. Below that the stage
 *      (source line, frieze, captions, three-line sentence) cannot fit one screen, and a
 *      pinned stage that does not fit hides its own foot. The finished frieze is shown.
 *   2. THE PAN. The runway is measured, never guessed: its extra height is exactly the
 *      track's overflow (so one pixel of scroll moves the wall one pixel — the reader's own
 *      pace, never a multiplier) plus a short hold before and a longer one after, so the
 *      last clip can be watched to its end. The track's translate is eased toward the scroll
 *      target inside the same frame that reads it.
 *   3. `data-lit` on the quotation — 0, 1 or 2, the clause belonging to whichever pane is
 *      nearest the middle of the screen. Three writes in the whole section; the colour and
 *      the brass underline are CSS transitions off that attribute, never per-frame writes.
 *   4. The films, driven by the SAME geometry as the pan (see the note at section 4):
 *      attached on approach — within 0.6 of a screen, after 180 ms there, so a fling past
 *      costs nothing — played only while on screen, and released a full screen past (source
 *      dropped, request aborted) unless the whole file has already arrived, in which case
 *      nothing is thrown away. A phone, a Save-Data line, or a browser without H.264 gets
 *      the posters, which is the same capability gate the approved hero and
 *      /yoga-mandala/within/ use.
 *
 * The rules, each a bug that has shipped on this site:
 *   · ONE passive scroll listener that raises a flag; every read and write in one rAF.
 *     Geometry (offsets, runway top, track width) is measured on load and resize only.
 *   · Only `transform` and `opacity` move. The track's transform is the only per-frame
 *     write. No wheel or touch interception; the scroll position is never written to.
 *   · Nothing IntersectionObserved is clipped: the observed elements are the reveal
 *     targets, which carry no clip.
 *   · Under prefers-reduced-motion it does nothing: the page stays the finished, static
 *     frieze with posters, and no film is ever attached.
 */

type Clip = {
  v: HTMLVideoElement;
  pane: HTMLElement;
  /** static frieze: the pane's document top and bottom (measured on resize) */
  docTop: number;
  docBot: number;
  /** live wall: the pane's box inside the stage, untranslated (measured on resize) */
  left: number;
  width: number;
  top: number;
  height: number;
  /** last computed distance off screen, and the approach/far thresholds for that axis */
  d: number;
  near: number;
  settle: ReturnType<typeof setTimeout> | undefined;
  ac: AbortController | undefined;
  /** dropped once already: a clip that comes back is kept the second time, so scrolling to
      and fro over one pane can never turn into a download loop */
  dropped: boolean;
};

export function Sx6bMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx6b');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const run = root.querySelector<HTMLElement>('.sx6b-run');
    const track = root.querySelector<HTMLElement>('.sx6b-track');
    const quote = root.querySelector<HTMLElement>('.sx6b-quote');
    const panes = [...root.querySelectorAll<HTMLElement>('.sx6b-pane')];
    const pauseBtn = root.querySelector<HTMLButtonElement>('.sx6b-pause');
    if (!run || !track || !quote || panes.length === 0) return;

    /* ── 0. reveals: opt-in, and anything already on screen is resolved first ── */
    const rises = [...root.querySelectorAll<HTMLElement>('[data-sx6b-rise]')];
    for (const el of rises) {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('sx6b-in');
    }
    root.classList.add('sx6b--anim');
    const riseIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('sx6b-in');
          riseIO.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    for (const el of rises) if (!el.classList.contains('sx6b-in')) riseIO.observe(el);

    /* ── 4a. which films exist at all on this device (decided once) ── */
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const thin = !!(conn && (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? '')));
    const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');
    const lite = thin || !canMp4 || matchMedia('(max-width: 860px)').matches;
    const clips: Clip[] = lite
      ? []
      : [...root.querySelectorAll<HTMLVideoElement>('video[data-src]')].flatMap((v) => {
          const pane = v.closest<HTMLElement>('.sx6b-pane');
          return pane
            ? [
                {
                  v,
                  pane,
                  docTop: 0,
                  docBot: 0,
                  left: 0,
                  width: 0,
                  top: 0,
                  height: 0,
                  d: Infinity,
                  near: 0,
                  settle: undefined,
                  ac: undefined,
                  dropped: false,
                },
              ]
            : [];
        });
    let userPaused = false;

    /* ── 1-3. the pinned pan ── */
    let live = false;
    let pan = 0; // px the track overflows the viewport
    let holdA = 0; // px of scroll before the pan starts
    let travel = 0; // px of runway beyond one screen
    let runTop = 0; // document y of the runway
    let runH = 0; // the runway's height
    let vw = 0;
    let centres: number[] = []; // each pane's centre, in untranslated track px
    let clauses: number[] = [];
    let x = 0; // current translate
    let lit = -2;
    let raf = 0;

    function measure() {
      const vh = innerHeight;
      vw = document.documentElement.clientWidth;
      const want = vh >= 600 && vw >= 340;
      if (want !== live) {
        live = want;
        root!.classList.toggle('sx6b--live', live);
        if (!live) {
          track!.style.transform = '';
          x = 0;
          quote!.dataset.lit = 'all';
          lit = -2;
          run!.style.removeProperty('--sx6b-travel');
        }
      }
      if (live) {
        /* offsets are layout values: the translate does not disturb them */
        centres = panes.map((p) => p.offsetLeft + p.offsetWidth / 2);
        clauses = panes.map((p) => Number(p.dataset.clause ?? 0));
        pan = Math.max(0, track!.scrollWidth - vw);
        holdA = Math.round(vh * 0.18);
        const holdB = Math.round(vh * 0.72);
        /* if the frieze fits the screen there is nothing to pan; the clauses still step, over
           a runway of one screen per clause */
        travel = pan > 0 ? pan + holdA + holdB : Math.round(vh * 2.4);
        run!.style.setProperty('--sx6b-travel', `${travel}px`);
      }
      runTop = run!.getBoundingClientRect().top + scrollY;
      runH = run!.offsetHeight;
      /* THE FILMS' GEOMETRY, measured here and never in the frame, and from rects rather
         than offsets: the track's `will-change: transform` makes IT the panes' offsetParent,
         so offsetTop is not the height inside the stage. The translate is horizontal only,
         so a pane's top inside the stage is untouched by it; its left is its rect less the
         translate it has right now. */
      const stageBox = (track!.closest('.sx6b-stage') ?? run!).getBoundingClientRect();
      for (const c of clips) {
        const r = c.pane.getBoundingClientRect();
        c.left = r.left - x - stageBox.left;
        c.width = r.width;
        c.top = r.top - stageBox.top;
        c.height = r.height;
        c.docTop = r.top + scrollY;
        c.docBot = r.bottom + scrollY;
      }
    }

    /* ── 4b. the films' lifecycle ──────────────────────────────────────────
       WHY NOT IntersectionObserver. The stage is `overflow-x: clip`, and an observer's
       intersection is clipped by every clipping ancestor BEFORE the root margin is applied —
       so a pane waiting off the right of the wall, or gone off its left, reads as "not
       intersecting" whatever the margin says. An observer can see neither the approach nor
       the distance along a horizontal pan. (Measured: the first version dropped a half-loaded
       clip the instant it slid off the left edge, then re-fetched it on the way back.)
       So the films are driven by the same numbers that move the wall: each pane's box,
       measured on resize, plus the translate and the scroll position this frame already has. */
    function demand(c: Clip) {
      const v = c.v;
      if (v.getAttribute('src')) return;
      const ac = new AbortController();
      c.ac = ac;
      const { signal } = ac;
      v.muted = true;
      v.src = v.dataset.src ?? '';
      v.load();
      /* the loop is only allowed over the photograph once the clock has actually moved */
      const prove = () => {
        if (v.readyState >= 3 && v.currentTime > 0) v.classList.add('sx6b-vid--on');
      };
      v.addEventListener('timeupdate', prove, { signal });
      v.addEventListener('canplay', () => kick(), { once: true, signal });
      v.addEventListener('error', () => v.classList.remove('sx6b-vid--on'), { signal });
    }

    const settled = (v: HTMLVideoElement) => {
      const b = v.buffered;
      return v.duration > 0 && b.length > 0 && b.start(0) <= 0.05 && b.end(b.length - 1) >= v.duration - 0.25;
    };

    function release(c: Clip) {
      if (c.settle !== undefined) {
        clearTimeout(c.settle);
        c.settle = undefined;
      }
      const v = c.v;
      if (!v.getAttribute('src')) return;
      if (!v.paused) v.pause();
      /* abort what is in flight; never throw away what has already been paid for */
      if (c.dropped || settled(v)) return;
      c.dropped = true;
      c.ac?.abort();
      c.ac = undefined;
      v.classList.remove('sx6b-vid--on');
      v.removeAttribute('src');
      v.load();
    }

    function films() {
      if (!clips.length) return;
      const vh = innerHeight;
      const local = scrollY - runTop;
      /* while pinned the stage's top is 0; before, it is still below; after, it has gone up */
      const stageTop = local < 0 ? -local : local > runH - vh ? runH - vh - local : 0;
      for (const c of clips) {
        let top: number;
        let bot: number;
        let dh = 0;
        if (live) {
          top = stageTop + c.top;
          bot = top + c.height;
          const l = c.left + x;
          const r = l + c.width;
          dh = l > vw ? l - vw : r < 0 ? -r : 0;
        } else {
          top = c.docTop - scrollY;
          bot = c.docBot - scrollY;
        }
        const dv = top > vh ? top - vh : bot < 0 ? -bot : 0;
        const horizontal = dh > dv;
        const screen = horizontal ? vw : vh;
        c.d = Math.max(dv, dh);
        c.near = screen * 0.6;
        const far = c.d > screen; // a full screen past, on whichever axis it is off by
        const on = c.d === 0;
        const v = c.v;
        const has = !!v.getAttribute('src');

        if (far) {
          release(c);
          continue;
        }
        if (c.d <= c.near) {
          /* on approach, and still there 180 ms later: attach. A clip released earlier is
             re-attached the same way, and release() will keep it the second time. */
          if (!has && c.settle === undefined) {
            c.settle = setTimeout(() => {
              c.settle = undefined;
              if (c.d <= c.near) demand(c);
            }, 180);
          }
        } else if (c.settle !== undefined) {
          clearTimeout(c.settle);
          c.settle = undefined;
        }
        if (has) {
          const want = on && !userPaused && !document.hidden;
          if (want && v.paused && v.readyState >= 2) void v.play()?.catch(() => {});
          else if (!want && !v.paused) v.pause();
        }
      }
    }

    function frame() {
      raf = 0;
      let again = false;
      if (live) {
        const local = scrollY - runTop;
        let target = 0;
        let at: number;
        let t = 0;
        if (pan > 0) {
          t = Math.min(1, Math.max(0, (local - holdA) / pan));
          target = -t * pan;
        }
        /* ease the wall toward the scroll, inside the frame that read it */
        const d = target - x;
        x = Math.abs(d) < 0.4 ? target : x + d * 0.22;
        track!.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;

        if (pan > 0) {
          /* THE READING POINT walks the wall with the pan: it starts on the first pane (at
             the left of the screen) and ends on the last (dead centre), so the lit clause is
             always the one belonging to the picture the eye is on — never a clause for a
             pane still waiting off to the right. */
          const first = centres[0] ?? 0;
          const last = centres[centres.length - 1] ?? 0;
          const mid = first + (last - first) * t;
          let best = 0;
          let bestD = Infinity;
          centres.forEach((c, i) => {
            const dd = Math.abs(c - mid);
            if (dd < bestD) {
              bestD = dd;
              best = i;
            }
          });
          at = best;
        } else {
          const tt = Math.min(0.999, Math.max(0, local / travel));
          at = Math.floor(tt * panes.length);
        }
        const c = local < -innerHeight * 0.6 ? -1 : clauses[at] ?? 0;
        if (c !== lit) {
          lit = c;
          quote!.dataset.lit = c < 0 ? 'none' : String(c);
        }
        again = Math.abs(target - x) > 0.4;
      }
      films();
      if (again) raf = requestAnimationFrame(frame);
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }
    const onScroll = () => kick();
    let rT: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(rT);
      rT = setTimeout(() => {
        measure();
        kick();
      }, 120);
    };

    measure();
    kick();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);
    /* fonts change line breaks, and line breaks change where the runway starts */
    void document.fonts?.ready.then(() => {
      measure();
      kick();
    });

    const onVis = () => kick();
    document.addEventListener('visibilitychange', onVis);

    /* WCAG 2.2.2: moving footage beside other content gets a way to stop it */
    const onToggle = () => {
      userPaused = !userPaused;
      pauseBtn!.setAttribute('aria-pressed', String(userPaused));
      pauseBtn!.textContent = userPaused ? 'Play films' : 'Pause films';
      kick();
    };
    if (pauseBtn && clips.length) {
      pauseBtn.hidden = false;
      pauseBtn.addEventListener('click', onToggle);
    }

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      pauseBtn?.removeEventListener('click', onToggle);
      ro.disconnect();
      riseIO.disconnect();
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(rT);
      for (const c of clips) {
        if (c.settle !== undefined) clearTimeout(c.settle);
        c.ac?.abort();
        c.v.pause();
        c.v.classList.remove('sx6b-vid--on');
        c.v.removeAttribute('src');
      }
      root.classList.remove('sx6b--live', 'sx6b--anim');
    };
  }, []);

  return null;
}
