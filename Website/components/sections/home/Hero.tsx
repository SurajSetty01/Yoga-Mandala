"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { OverHero } from "@/components/shell/HeaderContext";
import { ButtonLink } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * S1 · Hero — "A quiet room, not a billboard" (T1 full-bleed + T8 scroll-scrub).
 * One full-viewport composed ground with a forest-deep scrim; type sits low-left, not centred.
 * On load the ground scales 1.06 -> 1.0; on scroll it drifts up at ~8% of scroll speed while
 * type holds. All motion disabled under prefers-reduced-motion.
 *
 * Hero copy quoted directly from framework §5.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // cap the parallax travel (~12% of section) so it stays restrained
        setOffset(Math.min(y * 0.08, 90));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-deep"
      aria-label="Introduction"
    >
      <OverHero />

      {/* Composed ground (stands in for documentary hero photography) */}
      <div
        aria-hidden
        className="img-graded absolute inset-0 -z-0"
        style={{
          transform: reduced ? undefined : `translateY(${offset}px) scale(1.06)`,
          transition: reduced ? undefined : "transform 60ms linear",
          backgroundImage:
            "radial-gradient(120% 90% at 78% 22%, rgba(166,133,63,0.45) 0%, rgba(38,64,44,0) 55%), linear-gradient(165deg, #182a1d 0%, #26402c 52%, #33502f 100%)",
          animation: reduced ? undefined : "heroIn 1400ms cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* faint horizon + light band, evoking a hall in morning light */}
        <svg className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900" aria-hidden>
          <rect x="980" width="460" height="900" fill="#f3eee3" opacity="0.05" />
          <rect x="1120" width="150" height="900" fill="#f3eee3" opacity="0.06" />
          <path d="M0 720 Q720 660 1440 715 V900 H0 Z" fill="#0f1d13" opacity="0.55" />
          <circle cx="1130" cy="215" r="70" fill="#f3eee3" opacity="0.12" />
        </svg>
      </div>

      {/* scrim for legibility */}
      <div aria-hidden className="absolute inset-0 bg-forest-deep/45" />

      {/* Type, low-left */}
      <div className="relative mx-auto w-full max-w-content px-6 pb-20 pt-40 sm:pb-24">
        <p
          className="section-label text-sand/70"
          style={reduced ? undefined : { animation: "heroText 700ms cubic-bezier(0.22,1,0.36,1) 200ms both" }}
        >
          A community of Yoga teachers · India and abroad
        </p>

        <h1
          className="mt-6 max-w-[16ch] font-display text-display-xl text-sand"
          style={reduced ? undefined : { animation: "heroText 800ms cubic-bezier(0.22,1,0.36,1) 320ms both" }}
        >
          Yoga Mandala
        </h1>

        <p
          className="mt-5 font-display text-lead tracking-wide text-sand/70"
          style={reduced ? undefined : { animation: "heroText 800ms cubic-bezier(0.22,1,0.36,1) 440ms both" }}
        >
          Learn.&nbsp;&nbsp;Connect.&nbsp;&nbsp;Collaborate.&nbsp;&nbsp;Serve.
        </p>

        <p
          className="measure mt-8 text-lead text-sand/85"
          style={reduced ? undefined : { animation: "heroText 800ms cubic-bezier(0.22,1,0.36,1) 560ms both" }}
        >
          A community of Yoga teachers and serious practitioners building a culture of continuous
          learning, meaningful collaboration and responsible teaching.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-6"
          style={reduced ? undefined : { animation: "heroText 800ms cubic-bezier(0.22,1,0.36,1) 700ms both" }}
        >
          <ButtonLink href="/join" variant="ghost-light">
            Join the Sangha
          </ButtonLink>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-small text-sand/85 transition-colors duration-fast hover:text-sand"
          >
            What is Yoga Mandala
            <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll cue: a drawing brass line (not a bouncing chevron) */}
      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
        <span className="block h-14 w-px origin-top bg-gold/70" style={reduced ? undefined : { animation: "drawLine 1600ms ease-in-out 900ms both" }} />
      </div>

      <style>{`
        @keyframes heroIn { from { transform: translateY(0) scale(1.12); } to { transform: translateY(0) scale(1.06); } }
        @keyframes heroText { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drawLine { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes heroIn { from {} to {} }
          @keyframes heroText { from { opacity: 1; } to { opacity: 1; } }
          @keyframes drawLine { from { transform: scaleY(1); } to { transform: scaleY(1); } }
        }
      `}</style>
    </section>
  );
}
