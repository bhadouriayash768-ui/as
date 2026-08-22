/**
 * Syntha Airlabs motion primitive: an editorial, scroll-triggered type fold
 * that preserves readable final text and honors reduced-motion preferences.
 */
import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FoldText.css";

gsap.registerPlugin(ScrollTrigger);

type Hinge = "top" | "bottom" | "left" | "right";
type SplitBy = "char" | "word" | "line";

type FoldTextProps = {
  text: string;
  splitBy?: SplitBy;
  hinge?: Hinge;
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: "mount" | "hover" | "scroll";
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

const HINGE_CONFIG: Record<Hinge, { origin: string; rotateX: number; rotateY: number }> = {
  top: { origin: "50% 0%", rotateX: -92, rotateY: 0 },
  bottom: { origin: "50% 100%", rotateX: 92, rotateY: 0 },
  left: { origin: "0% 50%", rotateX: 0, rotateY: 92 },
  right: { origin: "100% 50%", rotateX: 0, rotateY: -92 },
};

export default function FoldText({
  text,
  splitBy = "word",
  hinge = "top",
  duration = 0.58,
  stagger = 0.045,
  ease = "power3.out",
  perspective = 700,
  creaseShading = 0.48,
  trigger = "scroll",
  fontSize = "inherit",
  fontWeight = "inherit",
  color = "currentColor",
  className = "",
  style = {},
}: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const hingeConfig = HINGE_CONFIG[hinge];
  const safePerspective = Math.max(120, perspective);
  const safeCrease = Math.min(1, Math.max(0, creaseShading));

  const segments = useMemo(() => {
    const renderSegment = (content: string, key: string, split: SplitBy): ReactNode => (
      <span className="fold-text__segment" data-fold-split={split} key={key} style={{ "--fold-perspective": `${safePerspective}px` } as CSSProperties}>
        <span className="fold-text__piece" data-fold-hinge={hinge} style={{ transformOrigin: hingeConfig.origin, "--fold-crease": 0 } as CSSProperties}>
          {content || "\u00A0"}
        </span>
      </span>
    );

    if (splitBy === "line") {
      return text.split("\n").map((line, index) => <span className="fold-text__line" key={`line-${index}`}>{renderSegment(line, `line-piece-${index}`, "line")}</span>);
    }

    if (splitBy === "word") {
      return text.split(/(\s+)/).map((part, index) => (
        /^\s+$/.test(part)
          ? <span className="fold-text__whitespace" key={`space-${index}`}>{part.replace(/ /g, "\u00A0")}</span>
          : part ? renderSegment(part, `word-${index}`, "word") : null
      ));
    }

    return Array.from(text).map((character, index) => renderSegment(character === " " ? "\u00A0" : character, `char-${index}`, "char"));
  }, [hinge, hingeConfig.origin, safePerspective, splitBy, text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const pieces = Array.from(root.querySelectorAll<HTMLElement>(".fold-text__piece"));
    if (!pieces.length) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, clearProps: "transform" });
      return undefined;
    }

    const from = { opacity: 0, rotateX: hingeConfig.rotateX, rotateY: hingeConfig.rotateY, "--fold-crease": safeCrease, transformOrigin: hingeConfig.origin };
    const to = { opacity: 1, rotateX: 0, rotateY: 0, "--fold-crease": 0, duration, ease, stagger, clearProps: "willChange" };
    const context = gsap.context(() => {
      if (trigger === "hover") {
        gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, "--fold-crease": 0 });
        const replay = () => gsap.fromTo(pieces, from, to);
        root.addEventListener("mouseenter", replay);
        return () => root.removeEventListener("mouseenter", replay);
      }

      if (trigger === "scroll") {
        let hasPlayed = false;
        const scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => {
            if (hasPlayed) return;
            hasPlayed = true;
            gsap.fromTo(pieces, from, to);
          },
        });
        return () => scrollTrigger.kill();
      }

      gsap.fromTo(pieces, from, to);
      return undefined;
    }, root);
    return () => context.revert();
  }, [duration, ease, hingeConfig.origin, hingeConfig.rotateX, hingeConfig.rotateY, safeCrease, stagger, trigger]);

  const rootStyle = {
    "--fold-text-font-size": typeof fontSize === "number" ? `${fontSize}px` : fontSize,
    "--fold-text-font-weight": fontWeight,
    "--fold-text-color": color,
    ...style,
  } as CSSProperties;

  return (
    <span ref={rootRef} className={`fold-text ${className}`.trim()} style={rootStyle}>
      <span className="fold-text__sr-only">{text}</span>
      <span className="fold-text__visual" aria-hidden="true">{segments}</span>
    </span>
  );
}
