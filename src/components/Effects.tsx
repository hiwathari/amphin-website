"use client";
// Site-wide motion layer: smooth scrolling, a scroll progress bar, a soft cursor glow with magnetic
// buttons, and the pointer-follow light in heroes. All of it switches off for reduced motion and
// on touch devices where it would only get in the way.
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";

export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, [reduce]);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/** A soft light that trails the pointer, grows over links, and pulls buttons marked .magnetic. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, id = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as HTMLElement | null;
      ref.current?.classList.toggle("is-link", !!t?.closest("a, button, summary, [role=tab]"));
      // magnetic pull
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        el.style.transform = d < 140 ? `translate(${dx * 0.22}px, ${dy * 0.22}px)` : "";
      });
    };
    const tick = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      id = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    id = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(id); };
  }, [reduce]);
  if (!on) return null;
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

/** Light that follows the pointer inside a hero, plus slow parallax on scroll. */
export function HeroLight({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.parentElement?.addEventListener("pointermove", move);
    return () => el.parentElement?.removeEventListener("pointermove", move);
  }, [reduce]);
  return <motion.div ref={ref} className="hero-light" style={reduce ? undefined : { y }}>{children}</motion.div>;
}

/** Parallax wrapper: children drift against the scroll by `speed` (e.g. -0.15 floats up). */
export function Parallax({ children, speed = -0.12, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const reduce = useReducedMotion();
  return <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>{children}</motion.div>;
}

/** Image/artwork that wipes in from the bottom with a slight zoom-out as it enters the viewport. */
export function RevealMedia({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 18px)", scale: 1.08 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.25, delay, ease: [0.77, 0, 0.18, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts toward the pointer. */
export function Tilt({ children, className, max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
    ref.current.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} className={`tilt ${className ?? ""}`} onPointerMove={onMove} onPointerLeave={reset}>{children}</div>;
}
