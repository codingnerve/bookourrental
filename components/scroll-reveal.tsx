"use client";

import { useEffect } from "react";

/**
 * A single IntersectionObserver drives every `[data-reveal]` element on the
 * page, so the rest of the tree can stay in Server Components.
 *
 * Progressive enhancement: the reveal styles are scoped to `.reveal-on`, which
 * only lands on <html> once this effect runs. Without JavaScript — or if this
 * never mounts — the content renders in its final, visible state.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    root.classList.add("reveal-on");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const targets = document.querySelectorAll("[data-reveal]");
    for (const target of targets) {
      // Anything already in view on first paint reveals immediately so the
      // fold never sits blank.
      const box = target.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.92) {
        target.classList.add("is-in");
      } else {
        observer.observe(target);
      }
    }

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-on");
    };
  }, []);

  return null;
}
