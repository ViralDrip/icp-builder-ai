import { useEffect, useState, RefObject } from 'react';

/**
 * Hook for scroll-triggered animations using Intersection Observer
 * @param ref - React ref to the element to observe
 * @param threshold - Visibility threshold (0-1) to trigger animation
 * @param once - If true, animation only triggers once
 */
export const useScrollAnimation = (
  ref: RefObject<HTMLElement>,
  threshold = 0.1,
  once = true
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return isVisible;
};

/**
 * Calculate stagger delay for sequential animations
 * @param index - Index of the element in the list
 * @param baseDelay - Base delay in milliseconds
 */
export const staggerDelay = (index: number, baseDelay = 100): string => {
  return `${index * baseDelay}ms`;
};

/**
 * Get animation classes for scroll reveal
 * @param isVisible - Whether the element is visible
 * @param delay - Optional delay for the animation
 */
export const getScrollRevealClasses = (isVisible: boolean, delay = '0ms'): string => {
  return isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-8';
};

/**
 * Get fade-in animation classes
 */
export const getFadeInClasses = (isVisible: boolean, delay = '0ms'): string => {
  return isVisible
    ? 'opacity-100'
    : 'opacity-0';
};
