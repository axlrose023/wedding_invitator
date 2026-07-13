import { useEffect, useRef } from "react";

// Adds `is-visible` to `.reveal` elements once they scroll into view.
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.classList.contains("reveal")
      ? [node, ...node.querySelectorAll<HTMLElement>(".reveal")]
      : Array.from(node.querySelectorAll<HTMLElement>(".reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      // Reveal a little before the element scrolls in, so fast flick-scrolls
      // never leave an un-revealed (empty) band above a section.
      { threshold: 0, rootMargin: "0px 0px 120px 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}
