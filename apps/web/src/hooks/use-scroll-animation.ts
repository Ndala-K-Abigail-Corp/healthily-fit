import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  /**
   * Threshold for intersection observer (0 to 1)
   * @default 0.1
   */
  threshold?: number;
  /**
   * Root margin for intersection observer
   * @default "0px"
   */
  rootMargin?: string;
  /**
   * Whether to trigger only once
   * @default true
   */
  triggerOnce?: boolean;
}

/**
 * Custom hook for triggering animations on scroll
 * Uses Intersection Observer API to detect when element enters viewport
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation();
 * return <div ref={ref} className={isVisible ? 'animate-slideUp' : 'opacity-0'}>...</div>
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

