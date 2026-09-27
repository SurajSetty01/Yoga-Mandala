'use client';

import { useEffect } from 'react';

/**
 * The section's only client code. Everything it touches has a finished default in the
 * stylesheet, so with no JavaScript the section is complete: the pin is CSS, every word and
 * every photograph is in the static HTML, and the centre is its own first frame, standing
 * still.
 *
 * It does three things.
 *
 *   1. THE PICTURE STARTS TO MOVE WHEN TRANSMISSION LANDS ON IT. The clip's `src` is attached
 *      as the reader reaches Inquiry (so it has buffered by the time it is wanted), it plays
 *      once the Transmission plate is well onto the screen, and it pauses and fades back to
 *      the still if the reader scrolls back up — every state change has its inverse. It is
 *      released (`src` removed, `load()` to cancel the fetch) half a screen past the section
 *      or a screen and a half before it.
 *   2. THE THREE TERMS LEAN IN. At the widths where the picture stands at the centre, each
 *      card sits closest to it when the card is in the middle of the screen and eases
 *      outward, by at most the page gutter, as it travels to either edge. One custom
 *      property per card, feeding a transform.
 *   3. THE BUTTON. Plays or pauses the clip, and a choice made with it is final until the
 *      reader makes another: scrolling never overrides it. Under reduced motion nothing
 *      plays on its own, and this button is how a reader can choose to see it move.
 *
 * The rules this obeys are the ones this site learned by shipping their opposites: one
 * passive scroll listener that only raises a flag; every read of scrollY and every write in
 * one requestAnimationFrame; geometry measured on load, resize and ResizeObserver only;
 * transform and opacity only; the reader's scroll position never written to.
 */
export function Sx3bMotion() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.sx3b');
    if (!section) return;
    const run = section.querySelector<HTMLElement>('.sx3b-run');
    /* the plate's <li>, not the plate: the plate is sticky, so its box is wherever it
       is currently held, while the <li> is where the landing begins in the document */
    const land = section.querySelector<HTMLElement>('.sx3b-land');
    const video = section.querySelector<HTMLVideoElement>('.sx3b-video');
    const btn = section.querySelector<HTMLButtonElement>('.sx3b-toggle');
    const cards = [...section.querySelectorAll<HTMLElement>('.sx3b-card')];
    if (!run || !land || !video || !btn) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    /* the same query the stylesheet uses for the centred arrangement */
    const centred = matchMedia('(min-width: 1280px) and (min-aspect-ratio: 3/2)');

    /* a 2 MB clip is not a trade a metered or slow connection wants. Safari implements
       neither property, hence the optional chain; there the clip simply plays. */
    const thin = () => {
      const c = (
        navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
      ).connection;
      if (!c) return false;
      return c.saveData === true || /^(slow-)?2g$|^3g$/.test(c.effectiveType ?? '');
    };

    /* null until the reader uses the button; after that their choice wins */
    let choice: 'play' | 'pause' | null = null;
    let attached = false;
    let near = false;
    let landed = false;

    const attach = () => {
      if (attached) return;
      attached = true;
      video.src = video.dataset.src ?? '';
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      video.pause();
      video.removeAttribute('src');
      /* load() after removing src is what actually cancels an in-flight fetch */
      video.load();
      section.classList.remove('sx3b--moving');
    };

    const label = () => {
      const playing = attached && !video.paused;
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-label', playing ? 'Pause the clip' : 'Play the clip');
    };

    const wanted = () => {
      if (choice === 'pause') return false;
      if (choice === 'play') return true;
      if (reduce.matches || thin()) return false;
      return near && landed;
    };

    const sync = () => {
      if (wanted()) {
        attach();
        if (video.paused) void video.play().catch(() => label());
      } else if (attached && !video.paused) {
        video.pause();
      }
      label();
    };

    /* The picture only swaps to the clip once frames are actually arriving, so a slow
       fetch shows the still rather than a black box. */
    const onPlaying = () => {
      section.classList.add('sx3b--moving');
      label();
    };
    const onPause = () => {
      section.classList.remove('sx3b--moving');
      label();
    };
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);

    const onClick = () => {
      const playing = attached && !video.paused;
      choice = playing ? 'pause' : 'play';
      sync();
    };
    btn.addEventListener('click', onClick);
    btn.hidden = false;
    label();

    /* ── geometry: measured, never read inside the frame loop ─────────────── */
    let runTop = 0;
    let runBottom = 0;
    let plateTop = 0;
    let centres: number[] = [];
    const measure = () => {
      const y = scrollY;
      const r = run.getBoundingClientRect();
      runTop = r.top + y;
      runBottom = r.bottom + y;
      plateTop = land.getBoundingClientRect().top + y;
      /* the card's untransformed box: the lean is on its inner block, not on the <li> */
      centres = cards.map((c) => {
        const b = c.getBoundingClientRect();
        return b.top + y + b.height / 2;
      });
    };

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    let lean = false;

    let queued = false;
    const frame = () => {
      queued = false;
      const y = scrollY;
      const vh = innerHeight || 1;

      /* in reach: a screen and a half ahead of the run, or half a screen past it */
      near = y + vh * 1.5 > runTop && y < runBottom + vh * 0.5;
      /* the plate has come more than a quarter of the way up the screen */
      landed = y + vh * 0.74 > plateTop;
      /* buffer while Inquiry is being read, so the clip is ready when it is wanted */
      const soon = y + vh * 1.9 > plateTop;

      if (!near && choice !== 'play') detach();
      else if (soon && choice !== 'pause' && !reduce.matches && !thin()) attach();
      sync();

      if (lean) {
        cards.forEach((card, i) => {
          const side = card.dataset.sx3bSide === '1' ? 1 : -1;
          const d = clamp(Math.abs((centres[i] ?? 0) - (y + vh / 2)) / vh, 0, 1);
          card.style.setProperty('--sx3b-lean', (side * d * d).toFixed(4));
        });
      }
    };
    const request = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    const setMode = () => {
      lean = !reduce.matches && centred.matches;
      section.classList.toggle('sx3b--live', !reduce.matches);
      if (!lean) for (const c of cards) c.style.removeProperty('--sx3b-lean');
      measure();
      request();
    };

    const ro = new ResizeObserver(() => {
      measure();
      request();
    });
    ro.observe(run);

    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', setMode);
    reduce.addEventListener('change', setMode);
    centred.addEventListener('change', setMode);
    setMode();

    return () => {
      removeEventListener('scroll', request);
      removeEventListener('resize', setMode);
      reduce.removeEventListener('change', setMode);
      centred.removeEventListener('change', setMode);
      ro.disconnect();
      btn.removeEventListener('click', onClick);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      detach();
    };
  }, []);

  return null;
}
