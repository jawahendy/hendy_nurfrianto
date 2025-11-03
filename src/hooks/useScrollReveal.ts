'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered reveal animations
 * @param options - Configuration options
 * @returns [ref, isInView] - Ref to attach to element and visibility state
 */
export function useScrollReveal({ threshold = 0.2, triggerOnce = true }: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce]);

  return [ref, isInView] as const;
}
