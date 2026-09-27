'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted, looping clip behind a doorway, attached only as the doorway approaches and
 * released as soon as it is off screen: until then, and after, the element has no `src` at
 * all, so it costs nothing and the still printed beneath it is what shows. Under
 * prefers-reduced-motion it is never attached, and the still is the picture.
 *
 * It is decoration over a photograph that already carries the alt text, so it is hidden
 * from assistive technology and from the tab order.
 */
export function DoorClip({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === 'undefined') return;
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    let on = false;

    const attach = () => {
      if (on || still.matches) return;
      on = true;
      v.muted = true;
      v.src = src;
      v.play().catch(() => {});
    };
    const release = () => {
      if (!on) return;
      on = false;
      v.pause();
      v.removeAttribute('src');
      v.load();
    };

    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? attach() : release()), {
      rootMargin: '240px 0px',
    });
    io.observe(v);

    const onPref = () => {
      release();
      /* re-observing reports the current intersection, so a doorway already on screen
         starts again when motion is allowed again */
      io.unobserve(v);
      io.observe(v);
    };
    still.addEventListener('change', onPref);

    return () => {
      io.disconnect();
      still.removeEventListener('change', onPref);
      release();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
