'use client';

import { useEffect } from 'react';

/**
 * The section's single client island, and deliberately the smallest one on this site.
 *
 * THE MECHANIC IS NOT IN HERE. The ramp, the drawn margin, the ground change and the frame
 * larger than the screen are all static composition in preview-sx3a.css. This file adds
 * three things and every one of them has a finished default without it:
 *
 *   1. `[data-sx]` reveals, opt-in through `.is-live` on the section root — a reader whose
 *      JavaScript never arrives keeps the whole section, because nothing already painted is
 *      hidden by CSS that is not gated on that class;
 *   2. `--sx3a-draw` 0 → 1, which draws the page's two margin rules downward as the section
 *      is read. Its stylesheet default is 1: the finished state, not the start state;
 *   3. the one <video>: `src` attached when the frame is within a screen of the viewport,
 *      and REMOVED again once it is well past, so a long page never holds a decoding
 *      pipeline open for a section nobody is looking at — and never attached at all for a
 *      reader who has asked for reduced data or has Data Saver on.
 *
 * Under `prefers-reduced-motion: reduce` it attaches nothing, observes nothing, sets no
 * video source and returns on line one. `.is-live` is never added, so every reveal start
 * state stays inert and the margin rules keep the drawn value the stylesheet gives them.
 * The section that reader gets is complete, and so is the one a reader with JavaScript off
 * gets: three plates, the crossed margins, the dark ground and the still beneath the video.
 *
 * The rules it obeys, each of which is a bug already shipped on this project:
 *   · ONE passive scroll listener, and it only raises a flag. Every read of scrollY and
 *     every write happens inside one requestAnimationFrame. Geometry is measured on load,
 *     on resize and on a ResizeObserver tick — never inside the frame loop.
 *   · Only `transform` and `opacity` are animated; `--sx3a-draw` feeds a scaleY.
 *   · Nothing IntersectionObserved carries a clip. Chromium computes the intersection rect
 *     AFTER clips, so an element clipped to zero reports ratio 0 and never fires.
 *   · The reader's scroll position is never written to, and wheel and touch are untouched.
 */
export function Sx3aMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx3a');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* A WEIGHT DECISION, NOT A WIDTH GATE. The clip is 1,836 KB, and a phone is not
       automatically a metered connection any more than a laptop is automatically not one —
       so it is not withheld by breakpoint. It is withheld from the two readers who have
       actually said something about it: `prefers-reduced-data`, and Chromium's Data Saver
       via `navigator.connection.saveData`. Both keep every word, both keep the still, and
       both keep the ground change and the size step that carry the fourth term; the only
       thing they lose is the motion, which is the one thing they asked to lose.

       The default reader is protected by arrangement rather than by refusal: `src` is
       attached only within one screen of the frame and removed again a screen past, so a
       reader who never reaches the fourth movement pays nothing at all for it. */
    const saveData =
      matchMedia('(prefers-reduced-data: reduce)').matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;

    /* ── 1. reveals ────────────────────────────────────────────────────────────
       Anything already on screen when the island mounts is resolved BEFORE
       `.is-live` is added, so a reader who lands mid-section never watches a
       block that was painted a moment ago fade back in. */
    const revealables = [...root.querySelectorAll<HTMLElement>('[data-sx]')];
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

    /* ── 2. the drawn margin ─────────────────────────────────────────────── */
    const paper = root.querySelector<HTMLElement>('.sx3a-paper');
    const clip = root.querySelector<HTMLElement>('.sx3a-move');
    const video = clip?.querySelector<HTMLVideoElement>('video') ?? null;
    const source = clip?.dataset.clip ?? '';

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

    let pTop = 0;
    let pH = 1;
    let cTop = 0;
    let cH = 1;

    function measure() {
      if (paper) {
        const r = paper.getBoundingClientRect();
        pTop = r.top + scrollY;
        pH = r.height || 1;
      }
      if (clip) {
        const r = clip.getBoundingClientRect();
        cTop = r.top + scrollY;
        cH = r.height || 1;
      }
    }

    /* `attached` is tracked rather than read back off the element, because clearing a
       <video> src is done by removeAttribute and re-reading `.src` after that returns the
       document URL, not '' — which would make every frame think it had to re-attach. */
    let attached = false;

    function frame() {
      queued = false;
      const y = scrollY; // one read
      const vh = innerHeight || 1;

      if (paper) {
        /* 0 as the paper block's top reaches the bottom of the screen, 1 by the time its
           own bottom has. The rules are therefore fully drawn before the last plate is
           read, never racing the reader. */
        const p = clamp((y + vh - pTop) / (vh * 0.4 + pH * 0.78), 0, 1);
        paper.style.setProperty('--sx3a-draw', p.toFixed(4));
      }

      if (video && source && !saveData) {
        /* ATTACH LATE, RELEASE LATE — and the asymmetry is the whole of a regression.
           This read `cTop - vh` in both directions: attach once the frame is within one
           screen. That was correct when the section was five screens tall and the frame
           began at y 3,687 — a review measured `video.src` empty at y 0 / 810 / 1620 and
           attaching only at 2430. Halving the section moved the frame up to y 1,725 at
           1440 and y 2,014 at 2531, which put it inside one screen of the FOLD: measured,
           `video.paused` was false at scroll 0 at both widths, i.e. 1,836 KB fetched on
           load. Nothing about the video changed; the thing it was measured against moved.

           So the lead-in is half a screen and the release is a full one. Hysteresis in
           this direction only — wider to keep than to start — so a reader scrubbing across
           the threshold cannot make it attach and detach on alternate frames.

           Swept in 25px steps, reading `src` off the element at each stop:

             390×844    frame top 2412   attaches at y 1150   418px below the fold
             1440×900   frame top 1725   attaches at y  375   450px below the fold
             2531×1140  frame top 2014   attaches at y  325   549px below the fold
             2560×1440  frame top 2152   attaches at y    0   712px below the fold

           THE LAST ROW IS REPORTED RATHER THAN TUNED AWAY. On a 1,440px-tall screen the
           fourth movement genuinely begins half a screen under the fold, so half a screen
           of lead-in resolves at scroll 0 and that reader does fetch the clip on load.
           Tightening the lead-in further to force a zero there would take the warning at
           390 — where a phone needs it most — down under 200px. It is the right trade at
           four of the five viewports measured and it is stated at the fifth, and in any
           case this preview stands the section under half a screen of scaffold: on /about/
           §03 follows two full sections and the frame is thousands of pixels down.

           If the lead-in is not enough on a slow connection the reader sees the still
           underneath, which is exactly what the still is for. */
        const lead = attached ? vh : vh * 0.5;
        const near = y + vh > cTop - lead && y < cTop + cH + vh;
        if (near && !attached) {
          attached = true;
          video.src = source;
          const play = video.play();
          if (play) play.catch(() => {});
          /* `is-playing` is what fades the video in OVER the still, so it is added on the
             `playing` event and never on the attempt. Added eagerly, a clip that 404s or
             that autoplay refuses leaves an empty element at opacity 1 covering the
             photograph — the section's most important frame replaced by nothing. This way
             any failure simply leaves the still where it is, which is the whole reason
             there is a still. */
        } else if (!near && attached) {
          attached = false;
          clip?.classList.remove('is-playing');
          video.pause();
          video.removeAttribute('src');
          video.load();
        }
      }
    }

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    const onPlaying = () => clip?.classList.add('is-playing');
    video?.addEventListener('playing', onPlaying);

    measure();
    frame();
    /* `.is-live` is added only AFTER the first frame has written every property, so the
       start states it switches on are never shown with a stale value behind them. */
    root.classList.add('is-live');
    for (const el of revealables) if (!el.classList.contains('in')) reveal.observe(el);

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);

    /* Photographs arrive after first paint and the fonts re-wrap the type beside them;
       one observer on the root re-measures rather than guessing when that has settled. */
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      reveal.disconnect();
      ro.disconnect();
      video?.removeEventListener('playing', onPlaying);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
      root.classList.remove('is-live');
      paper?.style.removeProperty('--sx3a-draw');
      clip?.classList.remove('is-playing');
      if (video && attached) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, []);

  return null;
}
