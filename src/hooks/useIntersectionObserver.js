import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer API
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for triggering
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Array} [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);

        // If triggerOnce is true, stop observing after first intersection
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [targetRef, isIntersecting, entry];
};

/**
 * Hook specifically for animations that should trigger once when visible
 * @param {number} threshold - Visibility threshold (default: 0.3)
 * @param {string} rootMargin - Root margin (default: '50px')
 * @returns {Array} [ref, hasBeenVisible]
 */
export const useAnimateOnScroll = (threshold = 0.3, rootMargin = '50px') => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  return [ref, isIntersecting];
};

/**
 * Hook for sections that need to track visibility for navigation
 * @param {number} threshold - Visibility threshold (default: 0.3)
 * @returns {Array} [ref, isVisible]
 */
export const useNavigation = (threshold = 0.3) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin: '-10% 0px -30% 0px', // More generous top margin, stricter bottom
    triggerOnce: false // Allow continuous updates for navigation
  });

  return [ref, isIntersecting];
};