'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lenis smooth scrolling for the whole site, driven by GSAP's ticker so every ScrollTrigger
 * animation reads the same, smoothed position. Native scrolling is untouched for anyone who
 * asks for reduced motion, and inside the mobile menu sheet.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
      prevent: (node) => Boolean(node.closest?.('.sheet')),
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* the mobile menu locks the page with body overflow; follow it */
    const body = document.body;
    const mo = new MutationObserver(() => {
      if (body.style.overflow === 'hidden') lenis.stop();
      else lenis.start();
    });
    mo.observe(body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
