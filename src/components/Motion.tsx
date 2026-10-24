"use client";
// Scroll motion: headings and blocks rise into place as they enter the viewport, and numbers
// count up. Everything is static when the visitor has reduced motion switched on.
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 34, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const lineVariants = {
  hidden: { y: "110%" },
  shown: (i: number) => ({ y: 0, transition: { duration: 1, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } }),
};

/** Splits a heading into lines that slide up one after another. Pass lines explicitly.
 *  The in-view trigger sits on the heading itself: each line starts clipped by its mask,
 *  so an observer on the line would never see it intersect. */
export function RevealLines({ lines, as: Tag = "h2", className }: { lines: string[]; as?: "h1" | "h2" | "h3"; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <Tag className={className}>{lines.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}</Tag>;
  }
  const MotionTag = motion[Tag];
  return (
    <MotionTag className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-40px" }}>
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
          <motion.span style={{ display: "block" }} variants={lineVariants} custom={i}>{l}</motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className={className}>{v}{suffix}</span>;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 26V6M9 13l7-7 7 7" /></svg>
    </button>
  );
}
