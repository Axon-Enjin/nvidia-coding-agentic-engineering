import { type RefObject, useEffect } from "react";

export function useChapterTransitions(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const chapters = Array.from(
      container.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      chapters.forEach((chapter) => chapter.classList.add("is-visible"));
      return;
    }

    container.dataset.chapterMotion = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [root]);
}
