'use client';

import { useEffect } from 'react';

/**
 * The page's one client island. Everything above it is a server component, so every word,
 * link and photograph is in the static HTML and the page is complete before this runs.
 *
 * TWO RULES IT EXISTS TO OBEY.
 *
 * 1. Nothing the reader can already see is ever hidden. The hidden state is applied by
 *    script and only to elements that were below the first screen at mount, so a reveal can
 *    never flash something out and back in. With JavaScript off, or under reduced motion,
 *    the class never lands and the page is simply already there.
 *
 * 2. A reveal must not be able to strand content. An IntersectionObserver is the obvious
 *    tool and it is the wrong one here: a flick, a jump to an anchor or a restored scroll
 *    position can carry an element from below the viewport to above it between two
 *    callbacks, and IO reports nothing for a target whose state did not change at the moment
 *    it delivers. That element then stays at opacity 0 forever. It is the same class of bug
 *    as the clip-path/IO trap in DESIGN-SYSTEM §1, and it shipped once as a blank page.
 *
 *    So this asks a question that cannot be missed instead: has the fold passed this element
 *    yet? One passive listener raises a flag, one rAF answers it for the handful of elements
 *    still waiting, and both listeners remove themselves the moment the last one is shown.
 *    The work is bounded, it strictly shrinks, and there is no state to get wrong.
 */
export function JoinMotion() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const armed = new Set(
      [...document.querySelectorAll<HTMLElement>('[data-jn-r]')].filter(
        (el) => el.getBoundingClientRect().top > innerHeight * 0.9
      )
    );
    if (!armed.size) return;
    for (const el of armed) el.classList.add('jn-armed');

    let queued = false;

    function sweep() {
      queued = false;
      for (const el of [...armed]) {
        if (el.getBoundingClientRect().top < innerHeight * 0.94) {
          el.classList.add('is-in');
          armed.delete(el);
        }
      }
      if (!armed.size) stop();
    }

    function onMove() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(sweep);
      }
    }

    function stop() {
      removeEventListener('scroll', onMove);
      removeEventListener('resize', onMove);
    }

    addEventListener('scroll', onMove, { passive: true });
    addEventListener('resize', onMove, { passive: true });

    return () => {
      stop();
      for (const el of armed) el.classList.remove('jn-armed');
    };
  }, []);

  return null;
}
