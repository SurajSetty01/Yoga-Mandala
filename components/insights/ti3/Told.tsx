'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { links, site } from '@/content/site';

/**
 * 02 · WHEN THERE IS SOMETHING TO READ — a note is passed round the circle.
 *
 * WHAT HAPPENS. The photograph is a circle of chairs in an open pavilion, and its near side
 * is open: nobody sits between the two foreground chairs. A slip of paper with the message
 * already written on it starts in the hands of the far side, is passed round the right-hand
 * arc of the circle (it pauses at each hand-off, and a dot is left where each hand held it),
 * comes out through the open side and lands on the page in front of the reader, full size,
 * as the button "Ask to be told". Scroll decides when (once the whole ring is in view) and
 * the journey then plays in time, about four seconds; nothing is scroll-jacked. One passive
 * listener, one rAF, transform and opacity only, geometry measured on load and resize.
 *
 * REDUCED MOTION, NO SCRIPT, OR KEYBOARD FOCUS INSIDE THE SLIP: the slip has already landed
 * and the trail of dots round the circle is drawn in full. Nothing is reachable only through
 * motion; the landed state is the default markup and the script only adds the journey.
 *
 * THE SUBSCRIPTION, HONESTLY. Blueprint §6 asks for one. There is no backend and no mailing
 * list, and every email in content/site.ts is null, so there is no field here. The live
 * channel takes the request: WhatsApp, with the message typed in, sent by the reader. The
 * page opens on the invitation and says "no mailing list" once, in the slip's small print.
 *
 * THE COMMUNITY HALF of §6's "subscription/community invitation" is a real, built route:
 * Yoga Mandala's /yoga-mandala/join/ (content/site.ts ymNav). "A community initiative under
 * Praṇava Seva Trust" is the client's own description (content/pranava.ts seva.mandala).
 *
 * THE FRAME. pr-ttc-dsc_0278_1 alone, and on purpose: it is the archive's one real
 * discussion circle. Its largest file is 1620, so the plate caps at 62rem and is never
 * full-bleed. It is not used on any other Insights section. Alt is verbatim from the
 * manifest; the caption is provenance only (the manifest's collection, and Prabodha is the
 * client's programme name, Blueprint §4.3). No date or place is recorded, so none is given.
 */

/** The prefilled request. site.name is the client's; the sentence is ours. */
const TELL_MESSAGE = `Hello ${site.name}. Please let me know when writing is published on Insights.`;
const TELL_HREF = `${links.whatsapp}?text=${encodeURIComponent(TELL_MESSAGE)}`;

const FRAME = {
  id: 'pr-ttc-dsc_0278_1',
  /* VERBATIM from public/media/pranava-stills.json. */
  alt: 'A group seated in a circle on chairs inside an open-sided pavilion looking out onto a lawn and trees',
  caption: 'Prabodha TTC',
} as const;

/**
 * The circle of chairs as the ellipse it projects to in the 3:2 frame, in fractions of the
 * frame. Top (-90°) is the far side, where a man sits at the centre; 0° is the right-hand
 * arc; +90° is the open near side, between the two foreground chairs. Read off the frame.
 */
const RING = { cx: 0.46, cy: 0.77, rx: 0.36, ry: 0.16 };
/** The hand-offs the slip pauses at. */
const STOPS = [-90, -30, 30, 90];
/** The trail it leaves. */
const TRAIL = Array.from({ length: 13 }, (_, i) => -90 + i * 15);
/** Share of the journey spent going round; the rest is the landing. */
const ROUND = 0.72;
/** The whole journey, ms: three hand-offs with a pause at each, then the landing. */
const DURATION = 3800;

const rad = (d: number) => (d * Math.PI) / 180;
const onRing = (d: number) => ({
  x: RING.cx + RING.rx * Math.cos(rad(d)),
  y: RING.cy + RING.ry * Math.sin(rad(d)),
});
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function Ti3Told() {
  const rootRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const slipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const plate = plateRef.current;
    const slip = slipRef.current;
    if (!root || !plate || !slip) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dots = Array.from(root.querySelectorAll<HTMLElement>('.ti3-dot'));
    const g = { fx: 0, fy: 0, fw: 1, fh: 1, cx: 0, cy: 0, cw: 1 };
    let cur = 0;
    let raf = 0;
    let anim = 0;
    let t0 = 0;
    let phase: 'wait' | 'play' | 'done' = 'wait';
    let landed = false;
    let litCount = -1;

    const measure = () => {
      slip.style.transform = '';
      const sy = window.scrollY;
      const f = plate.getBoundingClientRect();
      const c = slip.getBoundingClientRect();
      g.fx = f.left;
      g.fy = f.top + sy;
      g.fw = f.width;
      g.fh = f.height;
      g.cx = c.left + c.width / 2;
      g.cy = c.top + sy + c.height / 2;
      g.cw = c.width;
    };

    const light = (deg: number) => {
      const n = TRAIL.filter((d) => d <= deg + 0.5).length;
      if (n === litCount) return;
      litCount = n;
      dots.forEach((el, i) => el.classList.toggle('is-lit', i < n));
    };

    const widthAt = (depth: number) => Math.max(g.fw * (0.05 + 0.035 * depth), 30 + 14 * depth);

    const paint = (u: number) => {
      if (u >= 0.999) {
        if (!landed) {
          slip.style.transform = '';
          root.classList.add('ti3--landed');
          landed = true;
        }
        light(90);
        return;
      }
      if (landed) {
        root.classList.remove('ti3--landed');
        landed = false;
      }
      let x: number;
      let y: number;
      let s: number;
      let r: number;
      let deg: number;
      if (u < ROUND) {
        const a = (u / ROUND) * (STOPS.length - 1);
        const i = Math.min(STOPS.length - 2, Math.floor(a));
        const e = ease(clamp01((a - i - 0.2) / 0.6));
        const d0 = STOPS[i] ?? -90;
        const d1 = STOPS[i + 1] ?? 90;
        deg = d0 + (d1 - d0) * e;
        const p = onRing(deg);
        const depth = (Math.sin(rad(deg)) + 1) / 2;
        x = g.fx + p.x * g.fw;
        y = g.fy + p.y * g.fh;
        s = widthAt(depth) / g.cw;
        r = 9 * Math.cos(rad(deg)) - 4 * Math.sin(Math.PI * e);
      } else {
        const t = easeOut((u - ROUND) / (1 - ROUND));
        const p = onRing(90);
        const x0 = g.fx + p.x * g.fw;
        const y0 = g.fy + p.y * g.fh;
        const sNear = widthAt(1) / g.cw;
        x = x0 + (g.cx - x0) * t;
        y = y0 + (g.cy - y0) * t;
        s = sNear + (1 - sNear) * t;
        r = 0;
        deg = 90;
      }
      slip.style.transform = `translate3d(${(x - g.cx).toFixed(2)}px, ${(y - g.cy).toFixed(2)}px, 0) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`;
      light(deg);
    };

    /* Scroll only decides WHEN: the journey is played in time once the whole ring is in
       view, so it reads the same on a 347px photograph and a 992px one and no scroll
       speed can skip it. It plays once; it is re-armed only when the section has gone
       back below the fold, where the reset cannot be seen. */
    const play = (now: number) => {
      const u = clamp01((now - t0) / DURATION);
      cur = u;
      paint(u);
      if (u < 1) anim = requestAnimationFrame(play);
      else {
        anim = 0;
        phase = 'done';
      }
    };
    const finish = () => {
      if (anim) cancelAnimationFrame(anim);
      anim = 0;
      phase = 'done';
      cur = 1;
      paint(1);
    };
    const check = () => {
      raf = 0;
      const sy = window.scrollY;
      const vh = window.innerHeight;
      const ringFoot = g.fy + 0.95 * g.fh - sy;
      if (phase === 'wait') {
        if (ringFoot < 0) finish();
        else if (ringFoot < 0.88 * vh) {
          phase = 'play';
          t0 = performance.now();
          anim = requestAnimationFrame(play);
        }
      } else if (phase === 'done' && g.fy - sy > vh) {
        phase = 'wait';
        cur = 0;
        paint(0);
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const remeasure = () => {
      measure();
      landed = false;
      paint(cur);
      kick();
    };

    const onFocusIn = (e: FocusEvent) => {
      if (slip.contains(e.target as Node)) finish();
    };

    root.classList.add('ti3--run');
    measure();
    paint(0);
    check();

    const ro = new ResizeObserver(remeasure);
    ro.observe(root);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', remeasure);
    root.addEventListener('focusin', onFocusIn);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (anim) cancelAnimationFrame(anim);
      ro.disconnect();
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', remeasure);
      root.removeEventListener('focusin', onFocusIn);
      root.classList.remove('ti3--run', 'ti3--landed');
      slip.style.transform = '';
    };
  }, []);

  return (
    <section className="ti3" ref={rootRef} aria-labelledby="ti3-title">
      <div className="ti3-wrap">
        <h2 className="ti3-mark" id="ti3-title">
          <span className="ti3-mark__n">02</span>
          <span className="ti3-mark__rule" aria-hidden="true" />
          When there is something to read
        </h2>

        <div className="ti3-head">
          <p className="ti3-lead">Pull up a chair.</p>
          <p className="ti3-sub">
            When writing is published on Insights, it can come round to you.
          </p>
        </div>

        <figure className="ti3-fig">
          <div className="ti3-plate" ref={plateRef}>
            <img
              src={`/media/stills/${FRAME.id}-1620.webp`}
              srcSet={`/media/stills/${FRAME.id}-960.webp 960w, /media/stills/${FRAME.id}-1620.webp 1620w`}
              sizes="(max-width: 1063px) calc(100vw - 2.7rem), 62rem"
              alt={FRAME.alt}
              width={1620}
              height={1080}
              loading="lazy"
              decoding="async"
            />
            <div className="ti3-ring" aria-hidden="true">
              {TRAIL.map((d) => {
                const p = onRing(d);
                return (
                  <span
                    key={d}
                    className="ti3-dot"
                    style={{ left: `${(p.x * 100).toFixed(3)}%`, top: `${(p.y * 100).toFixed(3)}%` }}
                  />
                );
              })}
            </div>
          </div>
          <figcaption className="ti3-cap">{FRAME.caption}</figcaption>
        </figure>

        <div className="ti3-foot">
          <div className="ti3-slip" ref={slipRef}>
            <p className="ti3-slip__top" aria-hidden="true">
              <span>Already written</span>
              <span>WhatsApp</span>
            </p>
            <p className="ti3-slip__msg">{TELL_MESSAGE}</p>
            <a
              className="ti3-cta"
              href={TELL_HREF}
              rel="noopener"
              aria-describedby="ti3-fine"
            >
              Ask to be told
              <svg
                className="ti3-cta__arw"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <p className="ti3-slip__fine" id="ti3-fine">
              There is no mailing list yet. This opens WhatsApp with the note above already
              typed, and you send it yourself.
            </p>
          </div>

          <div className="ti3-also">
            <p className="ti3-also__k">In the meantime</p>
            <p className="ti3-also__p">
              Yoga Mandala, a community initiative under Praṇava Seva Trust.
            </p>
            <p className="ti3-also__go">
              <Link className="ti3-go" href="/yoga-mandala/join/">
                Join / Connect
              </Link>
            </p>
            <p className="ti3-also__end">
              Who Praṇava is:{' '}
              <Link className="ti3-ilink" href="/about/">
                About Praṇava
              </Link>
              . Anything else:{' '}
              <Link className="ti3-ilink" href="/contact/">
                Contact
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
