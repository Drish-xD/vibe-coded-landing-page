"use client";

import { useEffect, useState } from 'react';
import { throttle } from '../lib/utils';

interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;
  isScrollingUp: boolean;
  scrollDirection: 'up' | 'down' | 'none';
}

export const useScrollPosition = (threshold = 50): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isScrolled: false,
    isScrollingUp: false,
    scrollDirection: 'none',
  });

  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;

    let prevScrollY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > threshold;
      const isScrollingUp = currentScrollY < prevScrollY;
      const scrollDirection = 
        currentScrollY < prevScrollY ? 'up' : 
        currentScrollY > prevScrollY ? 'down' : 'none';

      setScrollPosition({
        scrollY: currentScrollY,
        isScrolled,
        isScrollingUp,
        scrollDirection,
      });

      prevScrollY = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Call once to initialize
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollPosition;
}; 