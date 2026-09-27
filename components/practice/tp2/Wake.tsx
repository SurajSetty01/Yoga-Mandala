"use client";

import { useEffect, useRef } from "react";

/**
 * §01's one client island. It does three things and nothing else:
 *
 *  1. ARMS the section: it puts the clip's frame into its grey, asleep state. It only does
 *     this with JavaScript running and reduced motion off. Every other reader gets the
 *     finished state (colour poster, green word), and that is complete.
 *  2. WAKES it: while the bottom of the second sentence is above the reading line (62% of
 *     the viewport height), the section carries .tp2-awake. This is reversible, so reading
 *     back up puts the frame to sleep again.
 *  3. RUNS the clip under the site's video contract. The source is attached on approach.
 *     The clip plays only while awake, near and in a visible tab, and fades in only once
 *     it is really moving. It is released when well past, unless the transfer has already
 *     finished, because then a reader going back up would pay for it twice. Nothing is
 *     attached under Save-Data or on a 2G connection.
 */
const LINE = 0.62;

export function Tp2Wake() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".tp2-sec");
    const line = root?.querySelector<HTMLElement>("[data-tp2-line]");
    const video = root?.querySelector<HTMLVideoElement>(".tp2-vid");
    if (!root || !line) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conn = (
      navigator as unknown as {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const thin = !!(
      conn &&
      (conn.saveData || /(^|-)2g$/.test(conn.effectiveType ?? ""))
    );

    let awake = false;
    let near = false;
    let attached = false;

    const settle = () => {
      if (!video || thin) return;
      if (near && !attached) {
        const s = video.dataset.src;
        if (s) {
          video.src = s;
          video.preload = "auto";
          video.load();
          attached = true;
        }
      }
      if (attached && awake && near && !document.hidden) {
        const p = video.play();
        if (p) p.catch(() => {});
      } else if (attached) {
        video.pause();
        if (!awake) video.classList.remove("is-live");
      }
    };

    const onPlaying = () => {
      if (!video) return;
      const check = () => {
        if (
          awake &&
          !video.paused &&
          video.readyState >= 3 &&
          video.currentTime > 0
        ) {
          video.classList.add("is-live");
        } else if (awake && !video.paused) {
          requestAnimationFrame(check);
        }
      };
      check();
    };
    video?.addEventListener("playing", onPlaying);

    const release = () => {
      if (!video || !attached) return;
      const b = video.buffered;
      const done =
        b.length > 0 &&
        Number.isFinite(video.duration) &&
        b.end(b.length - 1) >= video.duration - 0.2;
      video.pause();
      video.classList.remove("is-live");
      if (done) return;
      video.removeAttribute("src");
      video.load();
      attached = false;
    };

    const setAwake = (next: boolean) => {
      if (next === awake) return;
      awake = next;
      root.classList.toggle("tp2-awake", awake);
      settle();
    };

    /* The first paint of the armed state must not animate: arm and set the true state in
       one go, with transitions held for two frames. */
    const first = line.getBoundingClientRect().bottom <= innerHeight * LINE;
    awake = first;
    root.classList.add("tp2-hold", "tp2-armed");
    root.classList.toggle("tp2-awake", first);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("tp2-hold")),
    );

    /* The reading line. rootMargin cuts the viewport off at 62%, and "above the line"
       means the sentence's bottom is at or above the bottom of that cut. Steps of
       threshold fire on every crossing in both directions. */
    const reader = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const rb = e.rootBounds;
          const limit = rb ? rb.bottom : innerHeight * LINE;
          setAwake(e.boundingClientRect.bottom <= limit + 0.5);
        }
      },
      {
        rootMargin: `0px 0px -${Math.round((1 - LINE) * 100)}% 0px`,
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );
    reader.observe(line);

    const fig = video?.closest("figure");
    const approach = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          near = e.isIntersecting;
          settle();
        }
      },
      { rootMargin: "240px 0px 240px 0px" },
    );
    const far = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (!e.isIntersecting) release();
      },
      { rootMargin: "150% 0px 150% 0px" },
    );
    if (fig) {
      approach.observe(fig);
      far.observe(fig);
    }

    const onVis = () => settle();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      reader.disconnect();
      approach.disconnect();
      far.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      video?.removeEventListener("playing", onPlaying);
    };
  }, []);

  return <span ref={ref} hidden />;
}
