/**
 * Syntha Airlabs motion primitive: a quiet in-view blur reveal for supporting copy,
 * implemented with the existing Framer Motion dependency rather than adding a new library.
 */
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, type CSSProperties } from "react";

type BlurTextProps = {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  style?: CSSProperties;
};

export default function BlurText({
  text,
  delay = 72,
  animateBy = "words",
  direction = "top",
  className = "",
  threshold = 0.16,
  rootMargin = "0px 0px -8%",
  stepDuration = 0.42,
  style,
}: BlurTextProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(rootRef, { once: true, amount: threshold, margin: rootMargin as `${number}px ${number}px ${number}px ${number}px` });
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const segments = useMemo(() => animateBy === "words" ? text.split(" ") : Array.from(text), [animateBy, text]);
  const shift = direction === "top" ? -18 : 18;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    void (async () => {
      controls.set({ opacity: 0, y: shift, filter: "blur(8px)" });
      await controls.start((index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: stepDuration, delay: index * delay / 1000, ease: [0.23, 1, 0.32, 1] },
      }));
    })();
  }, [controls, delay, inView, reduceMotion, shift, stepDuration]);

  return (
    <p ref={rootRef} className={`blur-text ${className}`.trim()} style={style}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          className="blur-text__segment"
          custom={index}
          initial={false}
          animate={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : controls}
        >
          {segment}{animateBy === "words" && index < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}
