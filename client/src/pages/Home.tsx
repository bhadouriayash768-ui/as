/** Luminous Systems Atelier: pearl space, charcoal editorial contrast, Aurelis Gold depth, asymmetric plates, and calm pointer-responsive layers. */
/** Syntha Airlabs page: celestial editorial design with focused, progressive text motion—not competing effects. */
import React from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, CircleDot, MoveUpRight, Sparkles, Volume2, VolumeX } from "lucide-react";
import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import BlurText from "@/components/BlurText";
import DepthText from "@/components/DepthText";
import FallingText from "@/components/FallingText";
import FoldText from "@/components/FoldText";
import ScrollFloat from "@/components/ScrollFloat";
import StarBorder from "@/components/StarBorder";
import TextPressure from "@/components/TextPressure";
import { orbitalMark } from "@/lib/brand";

const SERVICES = [
  {
    number: "01",
    title: "Business websites",
    text: "Clear, fast websites that make your offer easy to understand and your next conversation easy to start.",
    tag: "Built for clarity",
  },
  {
    number: "02",
    title: "Online presence",
    text: "A professional digital home that makes your business easier to find, trust, and remember.",
    tag: "Made to be found",
  },
  {
    number: "03",
    title: "Growth-ready foundations",
    text: "A considered, responsive baseline that supports your next stage without adding unnecessary complexity.",
    tag: "Ready to evolve",
  },
];

const PROCESS = [
  ["01", "Start with the people using it", "We identify what visitors need to understand before they can choose you."],
  ["02", "Make the useful path obvious", "Pages, messages, and actions are arranged around the next honest step."],
  ["03", "Keep the technical side dependable", "Responsive, practical foundations make room for your business to keep moving."],
  ["04", "Improve the small details that add up", "Spacing, rhythm, performance, and language are refined until the experience feels inevitable."],
];

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-label" aria-label={`${index} ${label}`}>
      <span>{index}</span>
      <i />
      <strong>{label}</strong>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [introState, setIntroState] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroState("gone");
      return undefined;
    }
    const leaveTimer = window.setTimeout(() => setIntroState("leaving"), 1120);
    const removeTimer = window.setTimeout(() => setIntroState("gone"), 1660);
    return () => { window.clearTimeout(leaveTimer); window.clearTimeout(removeTimer); };
  }, []);

  const playSignatureChime = useCallback(() => {
    if (!window.AudioContext) return;
    const context = audioContextRef.current ?? new window.AudioContext();
    audioContextRef.current = context;
    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.042, now + 0.035);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.84);
    master.connect(context.destination);
    const notes: Array<{ frequency: number; delay: number; duration: number; type: OscillatorType }> = [
      { frequency: 392, delay: 0, duration: 0.52, type: "sine" },
      { frequency: 587.33, delay: 0.11, duration: 0.58, type: "triangle" },
      { frequency: 783.99, delay: 0.25, duration: 0.5, type: "sine" },
    ];
    notes.forEach(({ frequency, delay, duration, type }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now + delay);
      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.55, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now + delay);
      oscillator.stop(now + delay + duration + 0.02);
    });
  }, []);

  const enableSound = () => {
    const context = audioContextRef.current;
    if (context?.state === "suspended") void context.resume().then(playSignatureChime).catch(() => undefined);
    else playSignatureChime();
    setSoundEnabled(true);
  };

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".mobile-reveal"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    if (reducedMotion || !mobile) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const updateHeroField = (event: PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    hero.style.setProperty("--pointer-left", `${x * 100}%`);
    hero.style.setProperty("--pointer-top", `${y * 100}%`);
    hero.style.setProperty("--pointer-opacity", "1");
    hero.style.setProperty("--ring-x", `${(x - 0.5) * 18}px`);
    hero.style.setProperty("--ring-y", `${(y - 0.5) * 12}px`);
    hero.style.setProperty("--art-x", `${(x - 0.5) * -24}px`);
    hero.style.setProperty("--art-y", `${(y - 0.5) * -16}px`);
    hero.style.setProperty("--card-x", `${(x - 0.5) * -10}px`);
    hero.style.setProperty("--card-y", `${(y - 0.5) * -8}px`);
  };

  const resetHeroField = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty("--pointer-opacity", "0");
    hero.style.setProperty("--ring-x", "0px");
    hero.style.setProperty("--ring-y", "0px");
    hero.style.setProperty("--art-x", "0px");
    hero.style.setProperty("--art-y", "0px");
    hero.style.setProperty("--card-x", "0px");
    hero.style.setProperty("--card-y", "0px");
  };

  return (
    <main className="site-shell">
      {introState !== "gone" && (
        <button type="button" className={`clarity-opening clarity-opening--${introState}`} onClick={() => setIntroState("gone")} aria-label="Skip opening animation">
          <span className="clarity-opening__card"><img src="/guardian.webp" alt="" /></span>
          <strong>Clarity opens.</strong>
          <span className="clarity-opening__hint">Tap to enter</span>
        </button>
      )}
      <section
        className="hero hero--angel"
        id="top"
        ref={heroRef}
        onPointerMove={updateHeroField}
        onPointerDown={updateHeroField}
        onPointerLeave={resetHeroField}
      >
        <div className="hero__grain" aria-hidden="true" />
        <div className="hero__rings hero__rings--outer" aria-hidden="true" />
        <div className="hero__rings hero__rings--inner" aria-hidden="true" />
        <div className="hero__pointer-bloom" aria-hidden="true" />
        <img
          className="hero__guardian"
          src="/guardian.webp"
          alt="A celestial guardian in pearl-white drapery, crowned in gold and framed by feathered wings"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />

        <header className="site-nav">
          <a className="brand" href="#top" aria-label="Syntha Airlabs home">
            <img src={orbitalMark} alt="" className="brand__mark" />
            <span>SYNTHA<span className="brand__slash">/</span>AIRLABS</span>
          </a>
          <nav className="site-nav__links" aria-label="Primary navigation">
            <a href="#services">What we do</a>
            <a href="#approach">Our method</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button button--light site-nav__cta cursor-target spark-zone" href="#contact">
            Let&apos;s talk <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </header>
        <button className={`mobile-sound-control ${soundEnabled ? "mobile-sound-control--active" : ""}`} type="button" onClick={enableSound} aria-pressed={soundEnabled} aria-label={soundEnabled ? "Replay Syntha Airlabs sound" : "Enable Syntha Airlabs sound"}>
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />} <span>{soundEnabled ? "Replay sound" : "Sound"}</span>
        </button>

        <div className="hero__layout">
          <div className="hero__copy">
            <div className="eyebrow reveal-one"><span /> Digital studio · India</div>
            <h1 className="hero__title reveal-two">
              Websites that help your business <em>move forward.</em>
            </h1>
            <p className="hero__lead reveal-three">
              Syntha Airlabs builds clear, high-performing websites that help ambitious businesses look credible, reach more people, and move with confidence.
            </p>
            <div className="hero__actions reveal-four">
              <a className="button button--dark cursor-target spark-zone" href="#contact">Start a project <ArrowUpRight size={18} strokeWidth={1.8} /></a>
              <a className="text-link cursor-target" href="#services">See how I help <ArrowDownRight size={17} strokeWidth={1.6} /></a>
            </div>
            <div className="hero__micro reveal-four"><CircleDot size={13} /> Thoughtful design. Dependable build.</div>
          </div>

          <div className="hero__stage" aria-label="Interactive visual field">
            <div className="hero__stage-disc hero__stage-disc--one" aria-hidden="true" />
            <div className="hero__stage-disc hero__stage-disc--two" aria-hidden="true" />
            <div className="hero__quote-card">
              <span className="quote-card__topline">Private by design</span>
              <DepthText
                text="Forward."
                layers={18}
                depth={1.2}
                faceColor="#242521"
                depthColor="#b28a50"
                tilt={5}
                pointerTracking
                smoothing={0.12}
                perspective={760}
                autoOrbit
                orbitSpeed={0.13}
                fontSize="clamp(2.1rem, 4.5vw, 4rem)"
                shadow={false}
              />
              <p>One clear direction. A website designed to move your business forward.</p>
              <div className="quote-card__rule" />
              <span className="quote-card__index">01 — 03</span>
            </div>
            <div className="hero__mark-card" aria-hidden="true">
              <img src={orbitalMark} alt="" />
            </div>
          </div>
        </div>

        <a className="hero__scroll" href="#services">Scroll to explore <span /></a>
      </section>

      <section className="statement section-shell mobile-reveal" id="services">
        <SectionLabel index="01" label="What we do" />
        <div className="statement__grid">
          <p className="statement__kicker">Made for real life</p>
          <div className="statement__heading-wrap">
            <ScrollFloat containerClassName="statement__float" textClassName="statement__float-text" animationDuration={0.72} stagger={0.013}>We build websites that help your business get</ScrollFloat>
            <FallingText text="seen and chosen" highlightWords={["seen"]} trigger="hover" gravity={0.42} fontSize="clamp(2.9rem, 5.2vw, 6.25rem)" className="statement__gravity" />
          </div>
          <div className="statement__body">
            <p>Your website should do more than sit online. It should explain what you offer, build trust quickly, and make it easy for the right customers to contact you.</p>
            <a href="#contact" className="arrow-link">Tell me what you&apos;re building <ArrowRight size={18} /></a>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <article className={`service-card service-card--${index + 1}`} key={service.number}>
              {index === 0 && <div className="service-card__line-art" aria-hidden="true"><span /><span /><span /></div>}
              <div className="service-card__header"><span>{service.number}</span><Sparkles size={16} strokeWidth={1.4} /></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-card__footer"><span>{service.tag}</span><ArrowUpRight size={18} /></div>
            </article>
          ))}
        </div>
        <div className="pressure-panel">
          <div className="pressure-panel__meta"><span>Pointer pressure</span><i /> <span>Move across the letters</span></div>
          <TextPressure text="Seen & Chosen" stroke strokeColor="#b28a50" textColor="#262620" alpha minFontSize={30} className="pressure-panel__type" />
        </div>
      </section>

      <section className="process section-shell mobile-reveal" id="approach">
        <SectionLabel index="02" label="Our method" />
        <div className="process__top">
          <div>
            <p className="statement__kicker">From friction to flow</p>
            <ScrollFloat containerClassName="process__float" textClassName="process__float-text" animationDuration={0.7} stagger={0.012}>Your website should make it easier to say yes.</ScrollFloat>
          </div>
          <BlurText text="Whether you are starting a new business or improving an existing one, the process starts with your offer, your audience, and what growth means in practice." delay={52} className="process__blur-copy" />
        </div>
        <div className="process__grid">
          <figure className="process__image-wrap">
            <div className="process__diagram" role="img" aria-label="An abstract process lens with concentric design rings and editorial layout blocks">
              <span className="process__diagram-ring process__diagram-ring--one" />
              <span className="process__diagram-ring process__diagram-ring--two" />
              <span className="process__diagram-lens" />
              <span className="process__diagram-rule process__diagram-rule--one" />
              <span className="process__diagram-rule process__diagram-rule--two" />
              <span className="process__diagram-dot" />
              <span className="process__diagram-label">Focus / form / forward</span>
            </div>
            <figcaption>Touch the surface. Focus the signal. Shape the system.</figcaption>
          </figure>
          <ol className="process-list">
            {PROCESS.map(([number, title, detail]) => (
              <li key={number}>
                <span className="process-list__number">{number}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
                <MoveUpRight size={18} strokeWidth={1.4} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="promise section-shell mobile-reveal">
        <div className="promise__rule" />
        <p className="statement__kicker">Built to grow</p>
        <ScrollFloat as="blockquote" containerClassName="promise__float" textClassName="promise__float-text" animationDuration={0.82} stagger={0.014}>“Your website should work as hard as you do.”</ScrollFloat>
        <a href="#contact" className="text-link">Talk through an idea <ArrowDownRight size={17} /></a>
      </section>

      <section className="contact mobile-reveal" id="contact">
        <div className="contact__art" aria-hidden="true" />
        <div className="contact__overlay" />
        <div className="contact__inner section-shell">
          <SectionLabel index="03" label="Start a conversation" />
          <div className="contact__content">
            <p className="statement__kicker">Ready to shape what comes next?</p>
            <h2><FoldText text="Let's make your next move" splitBy="word" hinge="top" trigger="scroll" duration={0.55} stagger={0.055} /><em><FoldText text="clear." splitBy="word" hinge="bottom" trigger="scroll" duration={0.55} stagger={0.055} /></em></h2>
            <p className="contact__lead">Tell Syntha Airlabs about the digital presence you need. Together, we can turn the right idea into a clear, professional online system built for momentum.</p>
            <div className="contact__actions">
              <a className="contact__gmail cursor-target spark-zone" href="https://mail.google.com/mail/?view=cm&fs=1&to=synthaairlabs@gmail.com&su=Syntha%20Airlabs%20enquiry" target="_blank" rel="noreferrer"><StarBorder>Email Syntha Airlabs <ArrowUpRight size={18} /></StarBorder></a>
              <a className="contact__email" href="mailto:synthaairlabs@gmail.com">synthaairlabs@gmail.com</a>
            </div>
          </div>
          <footer className="site-footer">
            <a className="brand brand--footer" href="#top"><img src={orbitalMark} alt="" className="brand__mark" /><span>SYNTHA<span className="brand__slash">/</span>AIRLABS</span></a>
            <p>Digital presence for businesses built to grow.</p>
            <a href="#top" className="footer-top">Back to top <ArrowUpRight size={15} /></a>
          </footer>
        </div>
      </section>
    </main>
  );
}
