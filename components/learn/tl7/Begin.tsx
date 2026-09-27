"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { about } from "@/content/pranava";
import { links } from "@/content/site";

/**
 * 07 — BEGIN WHERE YOU ARE. A place is taken.
 *
 * A close view along a row of prepared places (four chairs, each with a mat, a folded
 * blanket, a bolster and blocks; the left one cut by the frame) holds still. Nobody is in
 * it. When "Begin where you are." lands, a window rises out of the floor in front of the
 * row's near end, over the last place, and in it a man sits down on a bolster while
 * someone behind him holds a wide forward bend. The one event in the section is somebody
 * doing exactly what the sentence says.
 *
 * The window stands IN FRONT of the row: its top overlaps the photograph's floor and its
 * foot drops below it, beside the lead and the two routes. That is the same composition at
 * 320 and at 2560, so a phone keeps all four places instead of one and a half.
 *
 * GROUND. --ground-warm. tl6 above is cream and the Next strip and footer below are deep,
 * so this band is neither: no two neighbours share a ground.
 *
 * REDUCED MOTION, AND NO SCRIPT. Nothing is hidden until the script arms it, and it only
 * arms when motion is allowed: the heading is set, the window is open on its poster frame,
 * and the film plays only if the reader presses Play (it is attached at that moment, not
 * before). Everything the section says is readable without any of it.
 *
 * VIDEO. muted, playsInline, loop; no poster attribute (the <picture> beneath is the
 * poster). `src` is attached on approach and removed when well past. Playback enters at
 * ENTER so the man sits down within a few seconds of the sentence, and wraps at WRAP: the
 * last two seconds pan right while he fills the frame, which the vision audit says to cut.
 *
 * ROUTES that exist, and only those: the enquiry page and the WhatsApp number the client
 * supplied. `links.emailGeneral` is null and renders as nothing.
 */

const ROW = {
  id: "pr-ttc-dsc_0190_1",
  widths: [480, 960, 1620],
  w: 1620,
  h: 1080,
  alt: "A close view along a row of mats with folded blankets, bolsters, blocks and folding chairs",
};

const CLIP = {
  src: "/media/clips/pr-mov-img_5450.mp4",
  poster: "/media/posters/pr-mov-img_5450.jpg",
  posterAvif: "/media/posters/pr-mov-img_5450.avif",
  w: 1080,
  h: 1920,
  alt: "A person in a wide-legged forward bend over a mat while a man sits down on a bolster in the foreground",
};

const ENTER = 4.2;
const WRAP = 9.2;

const rowSrcSet = ROW.widths
  .map((w) => `/media/stills/${ROW.id}-${w}.webp ${w}w`)
  .join(", ");

export function Tl7Begin() {
  const root = useRef<HTMLElement>(null);
  const call = useRef<HTMLHeadingElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  /** the reader's own choice beats the script's */
  const held = useRef(false);
  const inView = useRef(false);
  const landed = useRef(false);
  const still = useRef(false);

  useEffect(() => {
    const el = root.current;
    const h = call.current;
    const v = vid.current;
    if (!el || !h || !v) return;

    still.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (still.current) {
      landed.current = true;
      held.current = true;
    } else {
      el.dataset.armed = "";
    }

    const attach = () => {
      if (!v.getAttribute("src")) {
        v.src = CLIP.src;
        v.preload = "auto";
      }
    };
    const release = () => {
      if (!v.getAttribute("src")) return;
      v.pause();
      v.removeAttribute("src");
      v.load();
      el.removeAttribute("data-film");
    };
    const start = () => {
      if (held.current || !landed.current || !inView.current) return;
      attach();
      if (v.currentTime < 0.1) {
        try {
          v.currentTime = ENTER;
        } catch {
          /* metadata not ready: the loadedmetadata handler below sets it */
        }
      }
      void v.play().catch(() => {});
    };

    const onMeta = () => {
      if (v.currentTime < 0.1 && !still.current) v.currentTime = ENTER;
    };
    const onTime = () => {
      if (v.currentTime >= WRAP) v.currentTime = 0;
    };
    const onPlaying = () => {
      el.dataset.film = "";
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);

    /* approach: attach a screen and a half ahead; release three screens past */
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          if (!still.current) attach();
        } else release();
      },
      { rootMargin: "150% 0px 300% 0px" },
    );
    near.observe(el);

    /* on screen: play while visible, pause the moment it is not */
    const seen = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        inView.current = e.isIntersecting;
        if (e.isIntersecting) start();
        else v.pause();
      },
      { threshold: 0 },
    );
    seen.observe(el);

    /* the sentence lands when it is a quarter of the way up the screen */
    const land = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (!e.isIntersecting || landed.current) return;
        landed.current = true;
        el.dataset.landed = "";
        land.disconnect();
        window.setTimeout(start, 700);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    land.observe(h);

    return () => {
      near.disconnect();
      seen.disconnect();
      land.disconnect();
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      held.current = false;
      landed.current = true;
      if (!v.getAttribute("src")) {
        v.src = CLIP.src;
        v.preload = "auto";
      }
      void v.play().catch(() => {});
    } else {
      held.current = true;
      v.pause();
    }
  };

  const words = about.closing.call.split(" ");

  return (
    <section className="tl7" id="begin" ref={root} aria-labelledby="tl7-call">
      <div className="tl7-in">
        <div className="tl7-stage">
          <h2 className="tl7-call" id="tl7-call" ref={call}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span
                  className="tl7-call__w"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {w}
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>

          <div className="tl7-row">
            <img
              className="tl7-row__img"
              src={`/media/stills/${ROW.id}-1620.webp`}
              srcSet={rowSrcSet}
              sizes="(max-width: 1620px) 100vw, 1620px"
              width={ROW.w}
              height={ROW.h}
              alt={ROW.alt}
              loading="lazy"
              decoding="async"
            />
          </div>

          <figure className="tl7-win">
            <div className="tl7-win__in">
              <div className="tl7-win__f">
                <picture>
                  <source srcSet={CLIP.posterAvif} type="image/avif" />
                  <img
                    className="tl7-win__poster"
                    src={CLIP.poster}
                    width={CLIP.w}
                    height={CLIP.h}
                    alt={CLIP.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <video
                  className="tl7-win__vid"
                  ref={vid}
                  muted
                  playsInline
                  loop
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <button
                  type="button"
                  className="tl7-win__btn"
                  onClick={toggle}
                  aria-label={playing ? "Pause the film" : "Play the film"}
                >
                  {playing ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M3 1.5v9M9 1.5v9"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M3 1.2 10.5 6 3 10.8z" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </figure>

          <div className="tl7-foot">
            <p className="tl7-lead">{about.closing.lead}</p>
            <div className="tl7-acts">
              <Link className="tl7-cta" href="/contact/">
                Enquire
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0 5h12.5M8.5 1L12.8 5 8.5 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </Link>
              <a
                className="tl7-wa"
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="tl7-wa__t">
                  WhatsApp
                  <span aria-hidden="true"> ↗</span>
                </span>
                <span className="tl7-wa__n">{links.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
