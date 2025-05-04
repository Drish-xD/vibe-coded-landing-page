"use client";

import { useGSAP } from "@gsap/react"; // Import the official hook
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Export the official useGSAP hook
export { gsap, useGSAP };

/**
 * Fade and slide in animation for elements
 *
 * @param element Element to animate
 * @param delay Optional delay in seconds
 * @param y Optional y offset to animate from
 * @returns GSAP animation
 */
export const fadeInAnimation = (element: Element, delay = 0, y = 50) => {
  return gsap.from(element, {
    opacity: 0,
    y,
    duration: 0.8,
    delay,
    ease: "power3.out",
  });
};

/**
 * Staggered animation for multiple elements
 *
 * @param elements Elements to animate with stagger
 * @param staggerDelay Time between each element animation
 * @param initialDelay Initial delay before animations start
 * @returns GSAP timeline
 */
export const staggerAnimation = (
  elements: Element[] | NodeListOf<Element>,
  staggerDelay = 0.1,
  initialDelay = 0
) => {
  const tl = gsap.timeline({ delay: initialDelay });

  tl.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: staggerDelay,
    ease: "power2.out",
  });

  return tl;
};

/**
 * Create a scroll trigger animation
 *
 * @param trigger Element that triggers the animation
 * @param animation Function that returns the animation
 * @param options Additional ScrollTrigger options
 * @returns ScrollTrigger instance
 */
export const createScrollTrigger = (
  trigger: Element,
  animation: (tl: gsap.core.Timeline) => void,
  options: Partial<ScrollTrigger.Vars> = {}
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options,
    },
  });

  animation(tl);

  return tl.scrollTrigger;
};
