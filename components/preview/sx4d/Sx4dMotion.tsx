'use client';

import { useEffect } from 'react';
import { CAM_END } from './week';

/**
 * The section's one client island. The stylesheet already draws the whole floor from its
 * front edge with `--cam: 0`; this only moves the reader into it. If it never runs, or
 * under reduced motion (where it returns at once), the section is complete as it stands.
 *
 *   1. THE WALK. It adds `.sx4d-live`, which gives the stage a tall track and pins it, and
 *      then maps the track's scroll progress linearly onto `--cam`: 0 at the front edge of
 *      2 October, CAM_END with the eighth flag standing where the first row began. One
 *      custom property on one element per frame; every position is projected by the
 *      stylesheet.
 *   2. THE NEAREST PRACTICE. The flag whose frame is closest ahead of the reader takes
 *      `.is-near`; a flag whose frame has begun to drop away takes `.is-past` and goes
 *      outright, so no flag is ever half-transparent over a photograph. Class writes
 *      happen once per crossing, not per frame.
 *   3. LEVEL OF DETAIL. During the walk only the two practices the reader is walking
 *      toward stand open, and only once their row is within 1.45 times the first row's
 *      distance; every other flag takes `.is-far` and shows its numeral alone, opening as
 *      the one in front of it is passed - the way a map declutters its labels, nearest
 *      first. (The stylesheet can switch this off with `--lod: 0`; it never does now.)
 *   4. THE LOOPS. Three of the flagged frames have a moving version. A loop is attached
 *      only while its frame is within reach (0.88 to 1.8 times the first row's distance -
 *      from "about to drop away" back to "two rows off"), at most two at once, and released
 *      - paused, `src` removed, `load()`ed - when it leaves that band or the stage is more
 *      than a screen away. None has a `poster`; the <img> beneath is its still. Skipped
 *      under Save-Data, and never attached under reduced motion (the island returns).
 *   5. LOOKING ROUND. With a fine pointer that can hover, the eye drifts up to 0.07 units
 *      sideways toward the pointer, so nearer frames slide across farther ones. It is an
 *      enhancement only: nothing is reachable by it that is not already on screen.
 *
 * The rules this site has already paid for: ONE passive scroll listener that raises a flag,
 * every read and write inside one requestAnimationFrame, geometry measured on load and
 * resize only, the scroll position never written, no wheel or touch interception.
 */
/** how many practices stand open at once during the walk: the two the reader is walking
    toward. More, and a flag two rows back opens straight into the one in front of it. */
const OPEN = 2;

export function Sx4dMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.sx4d');
    const track = root?.querySelector<HTMLElement>('.sx4d-track');
    const stage = root?.querySelector<HTMLElement>('.sx4d-stage');
    if (!root || !track || !stage) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('sx4d-live');

    const items = Array.from(root.querySelectorAll<HTMLElement>('.sx4d-item'))
      .map((el) => ({ el, z: Number(el.dataset.z) }))
      .sort((a, b) => a.z - b.z);
    type Clip = { v: HTMLVideoElement; z: number; on: boolean };
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const clips: Clip[] = saveData
      ? []
      : Array.from(root.querySelectorAll<HTMLVideoElement>('.sx4d-loop')).map((v) => ({
          v,
          z: Number(v.closest<HTMLElement>('[data-z]')?.dataset.z ?? 0),
          on: false,
        }));
    clips.forEach(({ v }) => {
      v.addEventListener('playing', () => v.classList.add('is-playing'));
    });

    let top = 0;
    let span = 1;
    let vh = 1;
    let sl = 0;
    let sw = 1;
    /* the eye's distance from the first row, which the stylesheet sets per breakpoint */
    let zb = 3;
    let lod = false;
    const measure = () => {
      const cs = getComputedStyle(stage.querySelector('.sx4d-origin') ?? stage);
      zb = parseFloat(cs.getPropertyValue('--Zb')) || 3;
      lod = cs.getPropertyValue('--lod').trim() === '1';
      const r = track.getBoundingClientRect();
      top = r.top + scrollY;
      vh = innerHeight;
      span = Math.max(1, r.height - stage.offsetHeight);
      /* the stage never moves sideways, so its horizontal extent is a resize-time fact */
      const s = stage.getBoundingClientRect();
      sl = s.left;
      sw = Math.max(1, s.width);
    };

    const attach = (c: Clip) => {
      if (c.on) return;
      c.on = true;
      if (!c.v.getAttribute('src') && c.v.dataset.src) c.v.src = c.v.dataset.src;
      void c.v.play().catch(() => {});
    };
    const release = (c: Clip) => {
      if (!c.on) return;
      c.on = false;
      c.v.pause();
      c.v.classList.remove('is-playing');
      c.v.removeAttribute('src');
      c.v.load();
    };

    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    let aim = 0;
    let camx = 0;
    let lastCam = -1;
    let lastCamx = 99;
    let near: HTMLElement | null = null;
    const past = new Set<HTMLElement>();
    const far = new Set<HTMLElement>();
    let queued = false;

    const frame = () => {
      queued = false;
      const y = scrollY;
      const inReach = y + vh > top - vh && y < top + span + 2 * vh;

      const p = Math.min(1, Math.max(0, (y - top) / span));
      const cam = p * CAM_END;
      camx += (aim - camx) * 0.09;
      if (Math.abs(aim - camx) < 0.0004) camx = aim;

      if (Math.abs(cam - lastCam) > 0.0005) {
        stage.style.setProperty('--cam', cam.toFixed(4));
        lastCam = cam;
      }
      if (Math.abs(camx - lastCamx) > 0.0002) {
        stage.style.setProperty('--camx', camx.toFixed(4));
        lastCamx = camx;
      }

      /* past, near, and which flags are open. `items` is sorted nearest first, so the
         first two not yet past are the two the reader is walking toward. */
      let best: HTMLElement | null = null;
      let open = 0;
      for (const it of items) {
        const d = (it.z - cam + zb - 3) / zb;
        const gone = d <= 0.873;
        if (gone !== past.has(it.el)) {
          it.el.classList.toggle('is-past', gone);
          if (gone) past.add(it.el);
          else past.delete(it.el);
        }
        if (!gone && !best) best = it.el;
        const away = lod && (gone || open >= OPEN || d > 1.45);
        if (!gone && !away) open++;
        if (away !== far.has(it.el)) {
          it.el.classList.toggle('is-far', away);
          if (away) far.add(it.el);
          else far.delete(it.el);
        }
      }
      if (best !== near) {
        near?.classList.remove('is-near');
        best?.classList.add('is-near');
        near = best;
      }

      /* loops: the two nearest within reach */
      const want = inReach
        ? clips
            .filter((c) => {
              const d = (c.z - cam + zb - 3) / zb;
              return d > 0.88 && d < 1.8;
            })
            .sort((a, b) => a.z - b.z)
            .slice(0, 2)
        : [];
      for (const c of clips) {
        if (want.includes(c)) attach(c);
        else release(c);
      }

      if (camx !== aim) queue();
    };
    const queue = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    const onScroll = () => queue();
    const onResize = () => {
      measure();
      queue();
    };
    const onPointer = (e: PointerEvent) => {
      aim = ((e.clientX - sl) / sw - 0.5) * 0.14;
      queue();
    };
    const onLeave = () => {
      aim = 0;
      queue();
    };

    measure();
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    if (fine) {
      stage.addEventListener('pointermove', onPointer, { passive: true });
      stage.addEventListener('pointerleave', onLeave, { passive: true });
    }
    queue();

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      stage.removeEventListener('pointermove', onPointer);
      stage.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      clips.forEach(release);
      root.classList.remove('sx4d-live');
    };
  }, []);

  return null;
}
