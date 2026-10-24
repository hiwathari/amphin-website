"use client";
// Scroll motion: heading letters ride in on a wave, blocks rise into place as they enter the viewport, and numbers
// count up. Everything is static when the visitor has reduced motion switched on.
import { motion, useInView, useReducedMotion, useScroll, useTransform, animate } from "framer-motion";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
  hidden: {},
  shown: (i: number) => ({ transition: { delayChildren: i * 0.12, staggerChildren: 0.018 } }),
};
const charVariants = {
  hidden: { y: "115%", rotate: 14, skewX: -8, opacity: 0 },
  shown: { y: 0, rotate: 0, skewX: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/** Splits a heading into lines whose letters rise in a wave, each tipping upright as it lands.
 *  Words stay unbroken; screen readers get the plain text. `grad` gives a line the colour-graded
 *  gradient (index into `lines`, or -1 for none). The in-view trigger sits on the heading itself:
 *  each line starts clipped by its mask, so an observer on the line would never see it intersect. */
export function RevealLines({ lines, as: Tag = "h2", className, grad = -1 }: { lines: string[]; as?: "h1" | "h2" | "h3"; className?: string; grad?: number }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <Tag className={className}>{lines.map((l, i) => <Fragment key={i}>{i > 0 && " "}<span className={i === grad ? "grad-text" : undefined} style={{ display: "block" }}>{l}</span></Fragment>)}</Tag>;
  }
  const MotionTag = motion[Tag];
  return (
    <MotionTag className={className} aria-label={lines.join(" ")} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-40px" }}>
      {lines.map((l, i) => {
        // Each letter of a graded line paints its own slice of the gradient (transformed letters
        // can't share one background-clip), so the colour still runs smoothly across the line.
        const total = Math.max(1, l.replace(/ /g, "").length - 1);
        let n = 0;
        return (
          <Fragment key={i}>
          {/* A real space between lines, so the heading's text reads correctly to search engines. */}
          {i > 0 && " "}
          <motion.span aria-hidden="true" className={`wave-line${i === grad ? " grad-line" : ""}`} variants={lineVariants} custom={i}>
            {l.split(" ").map((w, j) => (
              <Fragment key={j}>
                {j > 0 && " "}
                <span className="wave-word">
                  {Array.from(w).map((ch, k) => {
                    const style = i === grad ? ({ "--n": total + 1, "--p": `${((n++) / total) * 100}%` } as CSSProperties) : undefined;
                    return <motion.span key={k} className="wave-char" style={style} variants={charVariants}>{ch}</motion.span>;
                  })}
                </span>
              </Fragment>
            ))}
          </motion.span>
          </Fragment>
        );
      })}
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

/** Oversized line of type that slides sideways as the page scrolls past it. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-58%"]);
  return (
    <div ref={ref} className={`scroll-text ${className}`} aria-hidden="true">
      <motion.div style={reduce ? undefined : { x }}>{text}</motion.div>
    </div>
  );
}
