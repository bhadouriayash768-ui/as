/** Luminous Systems Atelier: pearl space, charcoal editorial contrast, Aurelis Gold depth, asymmetric plates, and calm pointer-responsive layers. */
import React, { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
if (typeof window !== "undefined") void import("./TextPressure.css");

type TextPressureProps = {
  text: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function TextPressure({
  text,
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor = "#242521",
  strokeColor = "#b28a50",
  minFontSize = 32,
  className = "",
}: TextPressureProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const smoothedPointer = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const letters = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setInitial = () => {
      const rect = root.getBoundingClientRect();
      const nextSize = Math.max(minFontSize, rect.width / Math.max(letters.length * 0.57, 1));
      setFontSize(nextSize);
      pointer.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      smoothedPointer.current = { ...pointer.current };
    };

    const handlePointer = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
    };

    setInitial();
    window.addEventListener("resize", setInitial);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    if (reducedMotion) return () => {
      window.removeEventListener("resize", setInitial);
      window.removeEventListener("pointermove", handlePointer);
    };

    let frame = 0;
    const animate = () => {
      smoothedPointer.current.x += (pointer.current.x - smoothedPointer.current.x) * 0.11;
      smoothedPointer.current.y += (pointer.current.y - smoothedPointer.current.y) * 0.11;
      const rootRect = root.getBoundingClientRect();
      const maxDistance = Math.max(rootRect.width * 0.43, 1);

      letterRefs.current.forEach((letter) => {
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const distance = Math.hypot(
          smoothedPointer.current.x - (rect.left + rect.width / 2),
          smoothedPointer.current.y - (rect.top + rect.height / 2),
        );
        const proximity = 1 - clamp(distance / maxDistance, 0, 1);
        const wght = weight ? Math.round(300 + proximity * 650) : 450;
        const wdth = width ? Math.round(84 + proximity * 54) : 100;
        const ital = italic ? (proximity * -6).toFixed(1) : "0";
        letter.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}, "slnt" ${ital}`;
        if (alpha) letter.style.opacity = `${0.42 + proximity * 0.58}`;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setInitial);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, [alpha, italic, letters.length, minFontSize, weight, width]);

  const vars = {
    "--pressure-color": textColor,
    "--pressure-stroke": strokeColor,
    "--pressure-size": `${fontSize}px`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={`text-pressure ${flex ? "text-pressure--flex" : ""} ${stroke ? "text-pressure--stroke" : ""} ${className}`.trim()} style={vars} aria-label={text}>
      {letters.map((letter, index) => (
        <span
          aria-hidden="true"
          key={`${letter}-${index}`}
          ref={(element) => { letterRefs.current[index] = element; }}
          className="text-pressure__letter"
          data-letter={letter === " " ? " " : letter}
        >
          {letter === " " ? " " : letter}
        </span>
      ))}
    </div>
  );
}
