/**
 * Syntha Airlabs motion primitive: a character rise that follows scroll progress
 * forward and backward, scoped to its own root and safely cleaned up.
 */
import { useEffect, useMemo, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatProps = {
  children: string;
  as?: ElementType;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

export default function ScrollFloat({
  children,
  as: Tag = "h2",
  containerClassName = "",
  textClassName = "",
  animationDuration = 0.85,
  ease = "back.out(1.5)",
  scrollStart = "top 82%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.018,
}: ScrollFloatProps) {
  const rootRef = useRef<HTMLElement>(null);
  const characters = useMemo(() => Array.from(children), [children]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".scroll-float__char"));
    if (!chars.length) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(chars, { opacity: 1, yPercent: 0, scaleX: 1, scaleY: 1, clearProps: "transform" });
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(chars,
        { opacity: 0, yPercent: 112, scaleY: 1.7, scaleX: 0.82, transformOrigin: "50% 0%" },
        {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          duration: animationDuration,
          ease: "none",
          stagger,
          scrollTrigger: {
            trigger: root,
            start: scrollStart,
            end: scrollEnd,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);
    return () => context.revert();
  }, [animationDuration, ease, scrollEnd, scrollStart, stagger]);

  return (
    <Tag ref={rootRef} className={`scroll-float ${containerClassName}`.trim()}>
      <span className="scroll-float__sr-only">{children}</span>
      <span className={`scroll-float__text ${textClassName}`.trim()} aria-hidden="true">
        {characters.map((character, index) => <span className="scroll-float__char" key={`${character}-${index}`}>{character === " " ? "\u00A0" : character}</span>)}
      </span>
    </Tag>
  );
}
