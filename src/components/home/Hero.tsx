"use client";

import { useEffect, useState } from "react";
import { Plate } from "@/components/Plate";
import { ArrowLink, Button } from "@/components/ui";
import { SITE } from "@/lib/site";

/**
 * S1 — "A quiet room, not a billboard" (docs/pages/P01-home.md).
 * T1 full-bleed + T8 scroll-scrub. The image drifts at 8% of scroll speed
 * while the type holds. Copy is quoted verbatim from framework §5.
 */
export function Hero() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY * 0.08));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10" data-parallax style={{ transform: `translate3d(0, ${y}px, 0)` }}>
        <Plate
          spec={{
            subject:
              "A teaching hall before class — mats stacked, morning light across a wooden floor, two people talking at the far end",
            tone: "indigo",
          }}
          ratio="auto"
          className="!aspect-auto h-[108%]"
          sizes="100vw"
          priority
          showCaption={false}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(22,31,46,.82) 0%, rgba(22,31,46,.44) 46%, rgba(22,31,46,.16) 100%)",
          }}
        />
      </div>

      <div className="shell pb-16 pt-40 text-[var(--color-paper)] md:pb-24">
        <h1 className="t-display-xl m-0">{SITE.name}</h1>

        <p
          className="t-title mt-5 mb-0"
          style={{ letterSpacing: "0.02em", color: "color-mix(in srgb, var(--color-paper) 76%, transparent)" }}
        >
          Learn.&nbsp;&nbsp; Connect.&nbsp;&nbsp; Collaborate.&nbsp;&nbsp; Serve.
        </p>

        <p
          className="t-lead mt-8 mb-0 measure"
          style={{ color: "color-mix(in srgb, var(--color-paper) 84%, transparent)" }}
        >
          {SITE.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/join" variant="ghost">
            Join the Sangha
          </Button>
          <ArrowLink href="/about">What Yoga Mandala is</ArrowLink>
        </div>

      </div>
    </section>
  );
}
