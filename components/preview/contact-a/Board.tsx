'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { contact } from '@/content/copy';
import { links } from '@/content/site';

/**
 * CONCEPT A — THE BOARD.
 *
 * The idea: there are eight subjects and exactly one open line. `links.emailCollaborations`
 * is null, so every one of these conversations arrives in the same place — the WhatsApp
 * number. The rejected version hid that fact behind a numbered list and a button. This
 * section draws it: eight keys on the right, eight cords bundling down the left gutter, all
 * of them converging into one socket on one plate. The constraint IS the composition.
 *
 * Picking a subject is not decoration. It lights that cord and it changes what the button
 * actually does — the WhatsApp draft opens naming the subject you chose — and the line
 * beneath the button says so in plain sight. Nothing is implied and nothing is hidden.
 *
 * WHAT THIS WILL NOT DO
 *  1. It adds no scroll listener and never moves the reader's scroll position.
 *  2. It measures geometry on mount and on resize only (ResizeObserver), never per frame.
 *  3. It clips nothing it observes — there is no IntersectionObserver here at all, so the
 *     clip-path/ratio-0 trap in design/DESIGN-SYSTEM.md §1 cannot apply.
 *  4. Without JavaScript the cords simply are not drawn. They are aria-hidden ornament; the
 *     eight subjects, the button and the number are all in the static HTML and all work.
 */

/** Point the cord bundle converges on, and the ring the reader sees, are the same element. */
type Geo = { w: number; h: number; cords: string[]; plugs: Array<[number, number]> };

const ITEMS = contact.collaborations.items;

export function Board() {
  const uid = useId().replace(/:/g, '');
  const boardRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<HTMLSpanElement>(null);
  const keyRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const board = boardRef.current;
    const socket = socketRef.current;
    if (!board || !socket) return;

    const b = board.getBoundingClientRect();
    const s = socket.getBoundingClientRect();
    if (b.width < 2 || b.height < 2) return;

    const jx = s.left - b.left + s.width / 2;
    const jy = s.top - b.top + s.height / 2;

    const cords: string[] = [];
    const plugs: Array<[number, number]> = [];

    keyRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const kx = r.left - b.left;
      const ky = r.top - b.top + r.height / 2;

      /* Each cord leaves its key horizontally and comes into the socket from above. Both
         control points are clamped so no curve can stray past the socket (x >= jx) or drop
         below it (y <= jy) — that is what keeps the bundle out of the plate's own words,
         and it holds at every breakpoint because the numbers are measured, not guessed.
         The per-index spread is what stops eight curves becoming one thick stripe. */
      const span = Math.max(24, kx - jx);
      const c1x = Math.max(jx + 6, kx - span * (0.34 + i * 0.07));
      const rise = 42 + i * 13 + Math.min(120, Math.abs(ky - jy) * 0.22);

      cords.push(
        `M ${kx.toFixed(1)} ${ky.toFixed(1)} C ${c1x.toFixed(1)} ${ky.toFixed(1)}, ${jx.toFixed(1)} ${(jy - rise).toFixed(1)}, ${jx.toFixed(1)} ${jy.toFixed(1)}`
      );
      plugs.push([kx, ky]);
    });

    setGeo({ w: b.width, h: b.height, cords, plugs });
  }, []);

  useEffect(() => {
    measure();
    const board = boardRef.current;
    if (!board) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(board);
    /* Fraunces and Inter swap in after first paint and move every key by a few pixels. */
    document.fonts?.ready.then(measure).catch(() => {});
    addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      removeEventListener('resize', measure);
    };
  }, [measure]);

  const chosen = ITEMS[active] ?? ITEMS[0]!;
  /* The destination is unchanged whatever you pick — it is the one number, and it is
     printed under the button. The draft only saves the reader typing the subject. */
  const href = `${links.whatsapp}?text=${encodeURIComponent(
    `Hello Yoga Mandala. I'd like to talk about: ${chosen}`
  )}`;

  return (
    <div className="ca-board" ref={boardRef}>
      <header className="ca-head">
        <p className="ca-brow">{contact.collaborations.heading}</p>
        <h2 className="ca-q" id="ca-collab-h">
          {contact.collaborations.lead}
        </h2>
      </header>

      <svg
        className="ca-cords"
        aria-hidden="true"
        focusable="false"
        viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : '0 0 100 100'}
        preserveAspectRatio="none"
        style={geo ? undefined : { visibility: 'hidden' }}
      >
        {geo?.cords.map((d, i) => (
          <g key={i} className={`ca-cord${i === active ? ' is-on' : ''}`}>
            <path className="ca-cord__base" d={d} />
            <path className="ca-cord__live" d={d} pathLength={1} />
          </g>
        ))}
        {geo?.plugs.map(([x, y], i) => (
          <circle key={i} className={`ca-plug${i === active ? ' is-on' : ''}`} cx={x} cy={y} r={3.5} />
        ))}
      </svg>

      <div className="ca-keys">
        <p className="ca-keys__lead" id={`${uid}-lead`}>
          {contact.collaborations.listLead}
        </p>
        <ul className="ca-keys__list" aria-labelledby={`${uid}-lead`}>
          {ITEMS.map((item, i) => (
            <li key={item}>
              <button
                type="button"
                className={`ca-key${i === active ? ' is-on' : ''}`}
                aria-pressed={i === active}
                ref={(el) => {
                  keyRefs.current[i] = el;
                }}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
              >
                <span className="ca-key__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="ca-key__t">{item}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="ca-jack">
        <span className="ca-jack__socket" ref={socketRef} aria-hidden="true">
          <span className="ca-jack__ring" />
        </span>
        <p className="ca-jack__k">One open line</p>
        <p className="ca-jack__say">All eight arrive in the same place.</p>
        <a className="ca-cta" href={href} target="_blank" rel="noopener noreferrer">
          {contact.collaborations.action}
          <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true" focusable="false">
            <path d="M0 5h12.5M8.5 1L12.8 5 8.5 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
        <p className="ca-jack__dest">
          WhatsApp · {links.whatsappDisplay}
        </p>
        <p className="ca-jack__draft" aria-live="polite">
          Opens a message about <span className="ca-jack__pick">{chosen}</span>
        </p>
      </div>
    </div>
  );
}
