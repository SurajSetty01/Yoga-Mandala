'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The About page's scroll choreography, one client island for every section. Each effect is
 * keyed to a data attribute in the markup, so a section that is not on the page simply does
 * nothing. With reduced motion none of it runs and every section is shown complete.
 *
 *   hero      the video loads at the right size; on leaving, the frame narrows into a rounded
 *             window and the title lifts away
 *   [data-a3-words]   each word of a sentence lights from faint to full as it is read
 *   [data-a3-float]   a photograph drifts at its own speed (data-a3-float = speed)
 *   [data-a3-rise]    arched windows rise in one after another
 *   [data-a3-draw]    an SVG path draws itself across its section
 *   [data-a3-zoom]    a background settles from a slight zoom as its section arrives
 */
export function A3Motion() {
  useEffect(() => {
    /* the hero clip: the right file for the screen, only when motion is welcome */
    const vid = document.querySelector<HTMLVideoElement>('[data-a3-hero-video]');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (vid && !reduce) {
      const src = innerWidth > 900 ? vid.dataset.wide : vid.dataset.narrow;
      if (src) {
        vid.src = src;
        vid.addEventListener('playing', () => vid.classList.add('is-on'), { once: true });
        vid.play().catch(() => {});
      }
    }
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const hero = document.querySelector('.a3-hero');
      if (hero) {
        gsap.to('.a3-hero__media', {
          clipPath: 'inset(5% 3.5% 7% 3.5% round 28px)',
          scale: 0.97,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.a3-hero__in', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true },
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-a3-words]').forEach((el) => {
        const words = el.querySelectorAll('.a3-w');
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-a3-float]').forEach((el) => {
        const speed = Number(el.dataset.a3Float || 1);
        gsap.fromTo(
          el,
          { y: 90 * speed },
          {
            y: -90 * speed,
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-a3-rise]').forEach((group) => {
        gsap.from(group.children, {
          yPercent: 28,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.16,
          scrollTrigger: { trigger: group, start: 'top 80%' },
        });
      });

      gsap.utils.toArray<SVGPathElement>('[data-a3-draw]').forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: path.closest('section') ?? path, start: 'top 70%', end: 'bottom 75%', scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-a3-zoom]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.14 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom bottom', scrub: true },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
