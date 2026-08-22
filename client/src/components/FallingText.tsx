/** Luminous Systems Atelier: pearl space, charcoal editorial contrast, Aurelis Gold depth, asymmetric plates, and calm pointer-responsive layers. */
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "./FallingText.css";

type FallingTextProps = {
  text: string;
  highlightWords?: string[];
  trigger?: "click" | "hover" | "auto" | "scroll";
  gravity?: number;
  fontSize?: string;
  className?: string;
};

export default function FallingText({
  text,
  highlightWords = [],
  trigger = "hover",
  gravity = 0.48,
  fontSize = "clamp(1.3rem, 2vw, 2.25rem)",
  className = "",
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [runId, setRunId] = useState(0);
  const started = runId > 0;
  const words = text.split(" ");

  useEffect(() => {
    if (!started || !containerRef.current || !textRef.current || !canvasRef.current) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;
    const container = containerRef.current;
    const target = textRef.current;
    const canvas = canvasRef.current;
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return undefined;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Body } = Matter;
    const engine = Engine.create();
    engine.world.gravity.y = gravity;
    const render = Render.create({
      element: canvas,
      engine,
      options: { width: rect.width, height: rect.height, wireframes: false, background: "transparent" },
    });
    const floor = Bodies.rectangle(rect.width / 2, rect.height + 25, rect.width, 50, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-25, rect.height / 2, 50, rect.height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(rect.width + 25, rect.height / 2, 50, rect.height, { isStatic: true, render: { visible: false } });
    const wordNodes = Array.from(target.querySelectorAll<HTMLElement>(".falling-text__word"));
    const wordBodies = wordNodes.map((node) => {
      const nodeRect = node.getBoundingClientRect();
      const body = Bodies.rectangle(nodeRect.left - rect.left + nodeRect.width / 2, nodeRect.top - rect.top + nodeRect.height / 2, nodeRect.width, nodeRect.height, {
        restitution: .72,
        friction: .16,
        frictionAir: .02,
        render: { visible: false },
      });
      Body.setVelocity(body, { x: (Math.random() - .5) * 2.4, y: -1.4 });
      Body.setAngularVelocity(body, (Math.random() - .5) * .035);
      node.style.position = "absolute";
      return { body, node };
    });
    const mouse = Mouse.create(container);
    const constraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: .65, render: { visible: false } } });
    World.add(engine.world, [floor, leftWall, rightWall, constraint, ...wordBodies.map(({ body }) => body)]);
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
    let frame = 0;
    const sync = () => {
      wordBodies.forEach(({ body, node }) => {
        node.style.left = `${body.position.x}px`;
        node.style.top = `${body.position.y}px`;
        node.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      frame = requestAnimationFrame(sync);
    };
    frame = requestAnimationFrame(sync);

    return () => {
      cancelAnimationFrame(frame);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas.parentNode === canvas) canvas.removeChild(render.canvas);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [gravity, runId]);

  const start = () => { setRunId((value) => value + 1); };
  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); start(); }
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text ${started ? "falling-text--active" : ""} ${className}`.trim()}
      onMouseEnter={trigger === "hover" ? start : undefined}
      onPointerDown={start}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label={`${text}. Hover, tap, or press Enter to play and replay the words.`}
    >
      <div key={runId} ref={textRef} className="falling-text__target" style={{ fontSize }}>
        {words.map((word, index) => <span className={`falling-text__word ${highlightWords.includes(word.replace(/[,.]/g, "")) ? "falling-text__word--highlight" : ""}`} key={`${word}-${index}`}>{word}</span>)}
      </div>
      <div ref={canvasRef} className="falling-text__canvas" aria-hidden="true" />
      <span className="falling-text__hint">{started ? "Tap to replay" : "Hover or tap to move the words"}</span>
    </div>
  );
}
