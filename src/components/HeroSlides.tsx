"use client";
// Home hero: the tagline spells itself in, then headline slides take turns. Each one rides in
// letter by letter, and numbered dots let visitors pick a slide. Hovering pauses the rotation.
// With reduced motion on, the first slide simply stays put.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { RevealLines } from "./Motion";

export interface HeroSlide { lines: string[]; grad?: number; text: string }

export function Tagline({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`tagline ${className}`} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ animationDelay: `${0.2 + i * 0.03}s` }}>{ch === " " ? " " : ch}</span>
      ))}
    </p>
  );
}

export default function HeroSlides({ slides, tagline, actions }: { slides: HeroSlide[]; tagline: string; actions: ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 7000);
    return () => clearTimeout(t);
  }, [i, paused, reduce, slides.length]);
  const s = slides[i];

  return (
    <div className="wrap hero-inner" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div>
        <Tagline text={tagline} />
        <AnimatePresence mode="wait">
          <motion.div key={i} exit={{ opacity: 0, y: -24, filter: "blur(6px)" }} transition={{ duration: 0.45 }}>
            <RevealLines as="h1" lines={s.lines} grad={s.grad ?? -1} />
          </motion.div>
        </AnimatePresence>
        {slides.length > 1 && (
          <div className="hero-dots" role="tablist" aria-label="Headlines">
            {slides.map((_, n) => (
              <button key={n} role="tab" aria-selected={n === i} aria-label={`Headline ${n + 1}`} onClick={() => setI(n)}>
                {n + 1}
                {n === i && !reduce && <svg viewBox="0 0 36 36" aria-hidden="true"><circle key={`${i}-${paused}`} cx="18" cy="18" r="16" className={paused ? "held" : ""} /></svg>}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="hero-side">
        <AnimatePresence mode="wait">
          <motion.p key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, delay: 0.25 }}>
            {s.text}
          </motion.p>
        </AnimatePresence>
        {actions}
      </div>
    </div>
  );
}
