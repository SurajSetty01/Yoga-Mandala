/**
 * Hero choreography — FOLD → SETTLE → REST.
 *
 * Three clips of one class in one hall, in the order the class happened. The bodies in the
 * frame descend as the reader descends, and the hero hands over to the next section by
 * overlap rather than by stopping.
 *
 * Rules this file obeys, deliberately:
 *  · The user's scroll position is never written to except by an explicit click on a
 *    sequence mark. No wheel/touch interception, no snapping, no rAF that nudges scrollY.
 *  · One passive scroll listener; it only raises a flag. Every read of scrollY and every
 *    write happens inside one rAF. Element geometry is measured on load/resize only, never
 *    inside the frame loop.
 *  · Only transform and opacity are animated.
 *  · No dependency. GSAP was not needed; this is about ninety lines of arithmetic.
 *
 * Framework-free on purpose: it is called from a thin client component's effect and returns
 * its own teardown, so React can mount and unmount it without leaking listeners.
 */
export function initHeroChoreography(): () => void {
  const doc = document.documentElement;
  const $ = <T extends Element>(s: string) => document.querySelector<T>(s);

  const hero = $<HTMLElement>('#hero');
  const stage = $<HTMLElement>('#stage');
  const frame = $<HTMLElement>('#frame');
  const scrim = $<HTMLElement>('#scrim');
  const type = $<HTMLElement>('#type');
  const pill = $<HTMLElement>('#pill');
  const within = $<HTMLElement>('#within');
  const idxFill = $<HTMLElement>('#idxFill');
  const idxNow = $<HTMLElement>('.idx__now');

  if (!hero || !stage || !frame || !scrim || !type || !within || !idxFill || !idxNow) {
    return () => {};
  }

  const marks = [...document.querySelectorAll<HTMLButtonElement>('.idx__mark')];
  const labels = [...document.querySelectorAll<HTMLElement>('.idx__now span')];
  const movs = [...document.querySelectorAll<HTMLElement>('.mov')];
  const vids = [...document.querySelectorAll<HTMLVideoElement>('.mov__vid')];

  const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
  /* smoothstep: eases both ends of every hand-off so no dissolve starts or stops on a corner */
  const seg = (a: number, b: number, p: number) => {
    const t = clamp((p - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  /* ── capability gates: three separate questions, answered separately ──
       reduce -> no choreography at all
       lite   -> choreography, but stills instead of video
       else   -> video                                                   */
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqNarrow = matchMedia('(max-width: 860px)');
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  const thin = !!(conn && (conn.saveData === true || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? '')));
  const canMp4 = !!document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"');

  let reduce = mqReduce.matches;
  /* MOBILE IS STILLS, MEASURED, NOT ASSUMED. ss-ven0096.mp4 is 2,597,784 B; its AVIF poster
     is 144,104 B. The three posters together are a tenth of ONE clip, and a 960w/crf30
     re-encode still lands at 710,884 B — 2.7x the whole still sequence. There is no width at
     which the video wins on a thin connection, so the phone gets the same three-movement
     choreography built out of stills. */
  let lite = reduce || thin || !canMp4 || mqNarrow.matches;

  /* ── geometry, measured once per layout change ──────────────────── */
  let heroTop = 0;
  let range = 1;
  let withinTop = 0;
  let pillBottom = 0;
  let dotY: number[] = [0, 0, 0];

  function measure() {
    heroTop = hero!.getBoundingClientRect().top + scrollY;
    range = Math.max(1, hero!.offsetHeight - stage!.offsetHeight);
    withinTop = within!.getBoundingClientRect().top + scrollY;
    pillBottom = pill ? pill.getBoundingClientRect().bottom : 0;
    if (mqNarrow.matches) {
      dotY = [0, 0, 0];
    } else {
      const c = idxNow!.getBoundingClientRect();
      const mid = c.top + c.height / 2;
      dotY = marks.map((m) => {
        const r = m.getBoundingClientRect();
        return Math.round(r.top + r.height / 2 - mid);
      });
    }
  }

  /* ── the timeline ────────────────────────────────────────────────
       0.00-0.16  the picture at rest, everything legible
       0.16-0.36  the type lifts away and the scrim opens
       0.20-0.42  FOLD dissolves into SETTLE
       0.42-0.69  the photograph alone, nothing on it. the payoff.
       0.50-0.72  SETTLE dissolves into REST
       0.69-1.00  the cream climbs; both sections move as one
     The narrow build compresses the first two phases: less scroll to spend. */
  const T = () =>
    mqNarrow.matches
      ? { typeOut: [0.12, 0.3], d1: [0.16, 0.36], d2: [0.44, 0.64], scrim: [0.24, 0.48], zoom: 0.82 }
      : { typeOut: [0.16, 0.36], d1: [0.2, 0.42], d2: [0.5, 0.72], scrim: [0.3, 0.55], zoom: 0.86 };
  let t = T();

  let active = -1;
  let light: boolean | null = null;
  let away: boolean | null = null;
  let lastY = scrollY;
  let queued = false;
  let onStage = true;

  function render() {
    queued = false;
    const y = scrollY; // one read
    const p = clamp((y - heroTop) / range, 0, 1);

    if (!reduce) {
      /* the room opens out as you descend — 1.10 to 1.00, the reverse of the usual parallax
         push-in, so the hall gets wider as the class settles. */
      frame!.style.transform = `scale(${(1.1 - 0.1 * seg(0, t.zoom, p)).toFixed(4)})`;

      movs[1]!.style.opacity = seg(t.d1[0]!, t.d1[1]!, p).toFixed(3);
      movs[2]!.style.opacity = seg(t.d2[0]!, t.d2[1]!, p).toFixed(3);

      const gone = seg(t.typeOut[0]!, t.typeOut[1]!, p);
      type!.style.opacity = (1 - gone).toFixed(3);
      type!.style.transform = `translate3d(0,${(-52 * gone).toFixed(1)}px,0)`;
      type!.style.pointerEvents = gone > 0.85 ? 'none' : '';
      scrim!.style.opacity = (1 - 0.62 * seg(t.scrim[0]!, t.scrim[1]!, p)).toFixed(3);

      idxFill!.style.transform = `scaleY(${p.toFixed(4)})`;
      const a = p < (t.d1[0]! + t.d1[1]!) / 2 ? 0 : p < (t.d2[0]! + t.d2[1]!) / 2 ? 1 : 2;
      if (a !== active) {
        active = a;
        marks.forEach((m, i) =>
          i === a ? m.setAttribute('aria-current', 'true') : m.removeAttribute('aria-current')
        );
        labels.forEach((l, i) => l.classList.toggle('is-on', i === a));
        idxNow!.style.transform = `translateY(${dotY[a]}px)`;
        if (!lite) demand(a);
      }
      if (!lite) {
        if (p > 0.015) demand(1);
        if (p > 0.12) demand(2);
        pace();
      }
    }

    if (pill) {
      /* the pill inverts the moment the cream reaches it, and lifts away ONLY while
         scrolling down through the picture — never while something inside it has focus
         (CSS :focus-within wins), never on the cream, back on the first upward pixel. */
      const wantLight = withinTop - y <= pillBottom;
      if (wantLight !== light) {
        light = wantLight;
        pill.classList.toggle('is-light', wantLight);
      }
      const down = y > lastY + 2;
      const up = y < lastY - 2;
      if (down || up) lastY = y;
      const wantAway = !reduce && !wantLight && p > 0.3 && p < 0.7 && (down || (!!away && !up));
      if (wantAway !== away) {
        away = wantAway;
        pill.classList.toggle('is-away', wantAway);
      }
    }
  }

  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(render);
    }
  };

  /* ── video: poster first, always ─────────────────────────────────
     The <img> underneath is never removed, and the <video> carries NO poster attribute — a
     poster on a video that sits under a visible image is downloaded and never seen, which
     cost 948 KB on every device. The video fades in only once it is genuinely running
     (readyState >= 3 AND currentTime past 0), so a stall, an eviction or a blocked autoplay
     leaves a photograph on screen rather than a black rectangle. */
  const asked = new Set<number>();
  const timers: ReturnType<typeof setInterval>[] = [];

  function demand(i: number) {
    const v = vids[i];
    if (!v || asked.has(i)) return;
    asked.add(i);
    v.src = v.dataset.src ?? '';
    v.load();
    const live = () => {
      if (v.readyState >= 3 && v.currentTime > 0) {
        v.classList.add('is-live');
        clearInterval(poll);
      }
    };
    const poll = setInterval(live, 120);
    timers.push(poll);
    v.addEventListener('timeupdate', live);
    v.addEventListener('canplay', () => void v.play()?.catch(() => {}), { once: true });
    v.addEventListener('error', () => {
      clearInterval(poll);
      v.classList.remove('is-live');
    });
    void v.play()?.catch(() => {});
  }

  /* Only the movement you can actually see is allowed to decode. A layer is dead once ANY
     layer above it is fully opaque — at the end all three stack at opacity 1, and decoding
     three streams to show one of them is just heat. */
  const opOf = (i: number) => (i === 0 ? 1 : +(movs[i]!.style.opacity || 0));

  function pace() {
    for (let i = 0; i < vids.length; i++) {
      const v = vids[i]!;
      if (!v.src) continue;
      let vis = opOf(i) > 0.02;
      for (let j = i + 1; j < movs.length; j++) {
        if (opOf(j) >= 0.995) {
          vis = false;
          break;
        }
      }
      if (vis && onStage) {
        if (v.paused) void v.play()?.catch(() => {});
      } else if (!v.paused && v.classList.contains('is-live')) {
        /* never pause a clip that has not yet PROVEN it plays: is-live needs currentTime to
           advance past 0, and a clip parked at 0 could never earn it — it would sit behind
           its poster for the whole page. */
        v.pause();
      }
    }
  }

  const stageIO = new IntersectionObserver(
    ([e]) => {
      onStage = !!e?.isIntersecting;
      if (!onStage) vids.forEach((v) => v.src && !v.paused && v.pause());
      else if (!lite && !reduce) pace();
    },
    { threshold: 0 }
  );
  stageIO.observe(stage);

  const onVis = () => {
    if (document.hidden) vids.forEach((v) => v.src && !v.paused && v.pause());
    else onScroll();
  };

  /* ── the sequence marks: user-initiated scrolling, never hijacked ── */
  const goHandlers = marks.map((m) => {
    const h = () => {
      const to = [0.03, 0.34, 0.64][+(m.dataset.go ?? 0)]!;
      scrollTo({ top: Math.round(heroTop + range * to), behavior: reduce ? 'auto' : 'smooth' });
    };
    m.addEventListener('click', h);
    return h;
  });

  /* ── shared reveal primitive, used by every section ─────────────── */
  const io = new IntersectionObserver(
    (es) => {
      for (const e of es)
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
  );
  document.querySelectorAll('[data-r]').forEach((el) => io.observe(el));

  /* ── deferred background fills ──────────────────────────────────
     A CSS background-image is fetched the moment its element enters the render
     tree, however far down the page that is. Two image-filled type treatments
     sit 4 and 13 screens down and were costing 876 KB on first paint. Their
     urls now live in a --fill custom property, which is inert until referenced,
     and this adds `.bg-in` 600px ahead of the section so the picture is ready
     before it is seen. A separate observer from the reveal above because it has
     to fire much earlier: revealing late is a nicety, arriving late with the
     fill means the word paints empty.
     Without JavaScript neither class is ever added and the stylesheet applies
     the fill directly, so the treatment degrades to "always on", not "lost". */
  const fills = document.querySelectorAll('.ab-prem__mega, .ab-quote__w--fill');
  if (fills.length) {
    const bio = new IntersectionObserver(
      (es) => {
        for (const e of es)
          if (e.isIntersecting) {
            e.target.classList.add('bg-in');
            bio.unobserve(e.target);
          }
      },
      { rootMargin: '600px 0px' }
    );
    fills.forEach((el) => bio.observe(el));
  }

  /* ── boot / re-boot ─────────────────────────────────────────────── */
  function apply() {
    reduce = mqReduce.matches;
    lite = reduce || thin || !canMp4 || mqNarrow.matches;
    t = T();
    doc.classList.toggle('is-static', reduce);
    if (reduce || lite) vids.forEach((v) => !v.paused && v.pause());
    if (reduce) {
      frame!.style.transform = '';
      type!.style.cssText = '';
      scrim!.style.opacity = '';
      movs[1]!.style.opacity = '0';
      movs[2]!.style.opacity = '0';
      pill?.classList.remove('is-away');
      idxNow!.style.transform = '';
    } else if (!lite) {
      demand(0);
    }
    measure();
    render();
  }

  let rz: ReturnType<typeof setTimeout>;
  const onResize = () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      t = T();
      measure();
      render();
    }, 140);
  };
  const onOrient = () => setTimeout(() => { measure(); render(); }, 260);
  const onLoad = () => { measure(); render(); };

  addEventListener('resize', onResize, { passive: true });
  addEventListener('orientationchange', onOrient);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('load', onLoad);
  addEventListener('visibilitychange', onVis);
  mqReduce.addEventListener('change', apply);
  mqNarrow.addEventListener('change', apply);
  void document.fonts?.ready.then(() => { measure(); render(); });

  apply();

  return () => {
    removeEventListener('resize', onResize);
    removeEventListener('orientationchange', onOrient);
    removeEventListener('scroll', onScroll);
    removeEventListener('load', onLoad);
    removeEventListener('visibilitychange', onVis);
    mqReduce.removeEventListener('change', apply);
    mqNarrow.removeEventListener('change', apply);
    marks.forEach((m, i) => m.removeEventListener('click', goHandlers[i]!));
    timers.forEach(clearInterval);
    clearTimeout(rz);
    stageIO.disconnect();
    io.disconnect();
    vids.forEach((v) => { if (!v.paused) v.pause(); });
  };
}
