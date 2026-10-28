import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Motion Constants & Timing
export const MOTION = {
  easeOut: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  tFast: 0.15, // 150ms
  tBase: 0.25, // 250ms
  tSlow: 0.6,  // 600ms
  tHero: 0.9,  // 900ms
} as const;

// Global Lenis Instance singleton
let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  // Smooth on desktop only (pointer: fine and non-touch)
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  if (isTouch) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1,
  });

  // Keep GSAP ScrollTrigger synchronized with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  if (typeof window !== 'undefined') {
    (window as any).__lenis = lenis;
  }
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function pauseLenis() {
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

export function resumeLenis() {
  if (lenisInstance) {
    lenisInstance.start();
  }
}

export function scrollToAnchor(target: string | HTMLElement, offset: number = 80) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: -offset,
      duration: 0.8,
      easing: (t: number) => {
        // cubic-bezier(.65,0,.35,1) approximation
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      },
    });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  } else if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
