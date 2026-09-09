'use client';

import { useEffect } from 'react';
import { initHeroChoreography } from '@/lib/hero-choreography';

/**
 * The only client component the hero needs.
 *
 * The markup above it stays a server component, so the hero's text, links and photographs
 * are in the static HTML and the page is complete before any JavaScript runs. This mounts
 * the scroll choreography over that already-rendered DOM and tears it down cleanly.
 */
export function HeroMotion() {
  useEffect(() => initHeroChoreography(), []);
  return null;
}
