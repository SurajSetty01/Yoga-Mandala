"use client";

import { useEffect } from "react";

/**
 * The section's only client code. Every value it writes has a finished default in
 * sec-sx3.css. After the client's review ("simplify") it does two things:
 *
 *   1. `[data-sx]` reveals, opt-in through `.is-live` on the section: a short fade and
 *      rise, nothing more. No scroll-linked values, no pinning.
 *   2. The clips. Only the Transmission clip (`data-auto`) is attached by itself, when its
 *      frame has been near the screen for a moment; it fades over its still only once it
 *      has PROVABLY played, pauses when off screen or when the tab is hidden, and is
 *      released when well past. Practice and Inquiry show their stills until the reader
 *      presses play. Nothing attaches BY ITSELF before `load`, on a phone (860px and
 *      down), or under reduced motion; on Data Saver, a slow connection or without MP4
 *      there is no clip at all. Every clip has a play/pause button (WCAG 2.2.2).
 *
 * Rules kept, each one a bug already shipped on this project: IntersectionObserver on the
 * <figure>, never on the aperture that clips; no `poster` attribute anywhere;
 * `removeAttribute('src')` + `load()` to abort a transfer (src = '' would re-request the
 * page itself).
 */
export function Sx3Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sx3-sec");
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];
    if (!reduce) cleanups.push(stage(root));
    cleanups.push(films(root, reduce));

    return () => {
      for (const c of cleanups) c();
      root.classList.remove("is-live");
    };
  }, []);

  return null;
}

/** 1: the reveals, a gentle fade and rise. Only when motion is allowed. */
function stage(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  /* ── 1. reveals ─────────────────────────────────────────────────────── */
  root.classList.add("is-live");
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        reveal.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  root.querySelectorAll("[data-sx]").forEach((el) => reveal.observe(el));
  cleanups.push(() => reveal.disconnect());

  return () => {
    for (const c of cleanups) c();
  };
}

/** 3 and 4: the clips and their buttons. */
function films(root: HTMLElement, reduce: boolean): () => void {
  const cleanups: Array<() => void> = [];

  /* ── 3. the clips ───────────────────────────────────────────────────── */
  const conn = (
    navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const thin = !!(
    conn &&
    (conn.saveData === true ||
      /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ""))
  );
  const canMp4 = !!document
    .createElement("video")
    .canPlayType('video/mp4; codecs="avc1.42E01E"');
  const canClip = !thin && canMp4;
  /* the clips start by themselves only here; everywhere else only the button starts one */
  const auto = canClip && !reduce && !matchMedia("(max-width: 860px)").matches;
  const clips = canClip
    ? [...root.querySelectorAll<HTMLVideoElement>("video[data-src]")]
    : [];

  const hosts = new Map<Element, HTMLVideoElement>();
  const buttons = new Map<HTMLVideoElement, HTMLButtonElement>();
  for (const v of clips) {
    const host = v.closest("figure");
    if (!host) continue;
    hosts.set(host, v);
    const b = host.querySelector<HTMLButtonElement>(".sx3-toggle");
    if (b) buttons.set(v, b);
  }
  /* null until the reader uses a clip's button; after that their choice wins */
  const choice = new Map<HTMLVideoElement, "play" | "pause">();
  /* Only Transmission (data-auto) starts by itself; Practice and Inquiry stay stills
     until the reader presses play. One moving picture in the section, not three. */
  const wants = (v: HTMLVideoElement) =>
    (choice.get(v) ?? (auto && v.dataset.auto === "1" ? "play" : "pause")) ===
    "play";
  const near = new Set<HTMLVideoElement>();
  const settles = new Map<HTMLVideoElement, ReturnType<typeof setTimeout>>();
  const polls = new Map<HTMLVideoElement, ReturnType<typeof setInterval>>();
  const bound = new Map<HTMLVideoElement, AbortController>();

  let ready = document.readyState === "complete";
  const waiting = new Set<HTMLVideoElement>();
  const onLoad = () => {
    ready = true;
    for (const v of waiting) if (near.has(v)) demand(v);
    waiting.clear();
  };
  if (!ready) addEventListener("load", onLoad, { once: true });

  const stopPoll = (v: HTMLVideoElement) => {
    const p = polls.get(v);
    if (p !== undefined) clearInterval(p);
    polls.delete(v);
  };

  function demand(v: HTMLVideoElement) {
    if (v.getAttribute("src")) {
      if (v.paused && !document.hidden) void v.play()?.catch(() => {});
      return;
    }
    if (!ready) {
      waiting.add(v);
      return;
    }
    const ac = new AbortController();
    bound.set(v, ac);
    v.src = v.dataset.src ?? "";
    v.load();
    /* proof, not optimism: the loop covers the still only once it has decoded enough to
         play AND its clock has moved. A stall leaves a photograph, never a black box. */
    const prove = () => {
      if (v.readyState >= 3 && v.currentTime > 0) {
        v.classList.add("is-playing");
        stopPoll(v);
      }
    };
    polls.set(v, setInterval(prove, 120));
    v.addEventListener("timeupdate", prove, { signal: ac.signal });
    v.addEventListener("canplay", () => void v.play()?.catch(() => {}), {
      once: true,
      signal: ac.signal,
    });
    v.addEventListener(
      "error",
      () => {
        stopPoll(v);
        v.classList.remove("is-playing");
      },
      { signal: ac.signal },
    );
    void v.play()?.catch(() => {});
  }

  /** a transfer that has already finished is kept: dropping it would charge twice */
  const settled = (v: HTMLVideoElement) => {
    const b = v.buffered;
    return (
      v.duration > 0 && b.length > 0 && b.end(b.length - 1) >= v.duration - 0.25
    );
  };

  function release(v: HTMLVideoElement) {
    const s = settles.get(v);
    if (s !== undefined) clearTimeout(s);
    settles.delete(v);
    waiting.delete(v);
    if (!v.getAttribute("src")) return;
    v.pause();
    if (settled(v)) return;
    stopPoll(v);
    bound.get(v)?.abort();
    bound.delete(v);
    v.classList.remove("is-playing");
    v.removeAttribute("src");
    v.load();
  }

  const film = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = hosts.get(e.target);
        if (!v) continue;
        if (e.isIntersecting) {
          near.add(v);
          if (!wants(v)) continue;
          if (v.getAttribute("src")) {
            if (v.paused && !document.hidden) void v.play()?.catch(() => {});
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
          if (s !== undefined) clearTimeout(s);
          settles.delete(v);
          if (!v.paused) v.pause();
        }
      }
    },
    { rootMargin: "35% 0px 35% 0px" },
  );
  /* well past: a screen and a half away in either direction */
  const far = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = hosts.get(e.target);
        if (v && !e.isIntersecting) release(v);
      }
    },
    { rootMargin: "150% 0px 150% 0px" },
  );
  for (const host of hosts.keys()) {
    film.observe(host);
    far.observe(host);
  }
  const onVis = () => {
    for (const v of clips) {
      if (!v.getAttribute("src")) continue;
      if (document.hidden || !near.has(v)) {
        if (!v.paused) v.pause();
      } else if (v.paused && wants(v)) void v.play()?.catch(() => {});
    }
  };
  document.addEventListener("visibilitychange", onVis);

  /* ── 4. the buttons ─────────────────────────────────────────────────── */
  const ui = new AbortController();
  const sync = (v: HTMLVideoElement) => {
    const b = buttons.get(v);
    if (!b) return;
    const playing = !!v.getAttribute("src") && !v.paused;
    b.classList.toggle("is-playing", playing);
    b.setAttribute("aria-label", playing ? "Pause the clip" : "Play the clip");
  };
  for (const [v, b] of buttons) {
    b.hidden = false;
    v.addEventListener("play", () => sync(v), { signal: ui.signal });
    v.addEventListener("pause", () => sync(v), { signal: ui.signal });
    v.addEventListener("emptied", () => sync(v), { signal: ui.signal });
    b.addEventListener(
      "click",
      () => {
        if (v.getAttribute("src") && !v.paused) {
          choice.set(v, "pause");
          v.pause();
        } else {
          choice.set(v, "play");
          ready = true;
          demand(v);
        }
        sync(v);
      },
      { signal: ui.signal },
    );
  }
  cleanups.push(() => {
    ui.abort();
    for (const b of buttons.values()) b.hidden = true;
  });

  cleanups.push(() => {
    film.disconnect();
    far.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    removeEventListener("load", onLoad);
    for (const s of settles.values()) clearTimeout(s);
    for (const p of polls.values()) clearInterval(p);
    for (const ac of bound.values()) ac.abort();
  });

  return () => {
    for (const c of cleanups) c();
  };
}
