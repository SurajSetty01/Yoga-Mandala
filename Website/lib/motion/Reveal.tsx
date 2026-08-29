"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./useReducedMotion";

/**
 * The single shared scroll-reveal primitive for the whole site.
 * Fade-and-rise (opacity 0 -> 1, translateY 24px -> 0) that fires ONCE and never re-triggers.
 * Under prefers-reduced-motion it renders content immediately with no transform.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** ms */
  delay?: number;
  /** px rise distance */
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const style = reduced
    ? undefined
    : {
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
        transition: `transform 640ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 640ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "transform, opacity",
      };

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
