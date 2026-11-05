"use client";
// Home hero: the tagline spells itself in, then headline slides take turns. Each one rides in
// letter by letter, and numbered dots let visitors pick a slide. Hovering pauses the rotation.
// With reduced motion on, the first slide simply stays put.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  const touch = useRef<{ x: number; y: number } | null>(null);
  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);
  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 7000);
    return () => clearTimeout(t);
  }, [i, paused, reduce, slides.length]);
  const s = slides[i];

  return (
    <div className="wrap hero-inner" role="region" aria-roledescription="carousel" aria-label="Amphin headlines"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); else if (e.key === "ArrowRight") go(1); }}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => {
        const t0 = touch.current; touch.current = null; if (!t0) return;
        const dx = e.changedTouches[0].clientX - t0.x, dy = e.changedTouches[0].clientY - t0.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
      }}>
      <div>
        <Tagline text={tagline} />
        <AnimatePresence mode="wait">
          <motion.div key={i} exit={{ opacity: 0, y: -24, filter: "blur(6px)" }} transition={{ duration: 0.45 }}>
            <RevealLines as="h1" lines={s.lines} grad={s.grad ?? -1} />
          </motion.div>
        </AnimatePresence>
        {slides.length > 1 && (
          <div className="hero-dots" aria-label="Headlines">
            <button type="button" className="hero-arrow" aria-label="Previous headline" onClick={() => go(-1)}>‹</button>
            {slides.map((_, n) => (
              <button key={n} type="button" aria-current={n === i} aria-label={`Headline ${n + 1}`} onClick={() => setI(n)}>
                {n + 1}
                {n === i && !reduce && <svg viewBox="0 0 36 36" aria-hidden="true"><circle key={`${i}-${paused}`} cx="18" cy="18" r="16" className={paused ? "held" : ""} /></svg>}
              </button>
            ))}
            <button type="button" className="hero-arrow" aria-label="Next headline" onClick={() => go(1)}>›</button>
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
