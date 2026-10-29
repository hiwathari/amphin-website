"use client";
// AmOS timeline in two forms. The showreel is a pinned, scroll-driven film: as you scroll, each
// milestone from the first account to AmOS 2.0 plays in turn. Below it, the same history sits in
// open/close bars grouped by era, so anyone who just wants a fact can open the bar and read it.
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ERAS, TIMELINE, type TimelineEntry } from "@/lib/amosProduct";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const parts = (d: string) => { const [y, m, day] = d.split("-").map(Number); return { y, m: MONTHS[m - 1], d: day }; };
const nice = (d: string) => { const p = parts(d); return `${p.d} ${p.m} ${p.y}`; };

function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  const n = TIMELINE.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999)))));
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const e = TIMELINE[i];
  const p = parts(e.date);
  const goTo = (k: number) => {
    const el = ref.current; if (!el) return;
    const top = el.offsetTop + ((k + 0.5) / n) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };
  return (
    <div ref={ref} className="am-reel" style={{ height: `${n * 52 + 100}vh` }}>
      <div className="am-reel-stage">
        <motion.div className="am-reel-orb" animate={{ "--ox": `${20 + (i / n) * 60}%`, "--oy": `${30 + Math.sin(i) * 20}%` } as never} transition={{ duration: 1.2 }} />
        <div className="am-wrap am-reel-inner">
          <AnimatePresence mode="wait">
            <motion.div key={`d${i}`} className="am-reel-date" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              {String(p.d).padStart(2, "0")} {p.m}
              <small>{p.y}</small>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`c${i}`} className="am-reel-card" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}>
              <span className="era">{e.era}</span>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </motion.div>
          </AnimatePresence>
          <div className="am-reel-rail" aria-hidden="true">
            <motion.i style={{ height: fill }} />
          </div>
        </div>
        <span className="am-reel-hint">Scroll to play the timeline</span>
        <span className="am-reel-count" aria-live="polite">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "grid", gap: 7, zIndex: 3 }} className="am-reel-dots">
          {TIMELINE.map((t, k) => (
            <button key={t.date + t.title} aria-label={`${nice(t.date)}: ${t.title}`} onClick={() => goTo(k)}
              style={{ all: "unset", cursor: "pointer", width: 8, height: k === i ? 22 : 8, borderRadius: 8, background: k === i ? "#ff6a72" : "rgba(255,255,255,.35)", transition: "all .3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState<Set<string>>(new Set([ERAS[ERAS.length - 1]]));
  const toggle = (era: string) => setOpen((s) => { const x = new Set(s); if (x.has(era)) x.delete(era); else x.add(era); return x; });
  const by = (era: string): TimelineEntry[] => TIMELINE.filter((t) => t.era === era);
  const allOpen = open.size === ERAS.length;
  return (
    <div>
      <div className="am-tl-tools">
        <button className="am-btn outline sm" onClick={() => setOpen(allOpen ? new Set() : new Set(ERAS))}>{allOpen ? "Close all" : "Open all"}</button>
      </div>
      {ERAS.slice().reverse().map((era) => {
        const rows = by(era);
        const first = rows[0].date, last = rows[rows.length - 1].date;
        const isOpen = open.has(era);
        return (
          <div className="am-tl-item" data-open={isOpen} key={era}>
            <button className="am-tl-bar" aria-expanded={isOpen} aria-controls={`tl-${era}`} onClick={() => toggle(era)}>
              <span>
                <h3>{era}</h3>
                <small>{rows.length} {rows.length === 1 ? "change" : "changes"} · {first === last ? nice(first) : `${nice(first)} to ${nice(last)}`}</small>
              </span>
              <span className="am-tl-plus" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 1v12M1 7h12" /></svg></span>
            </button>
            <div className="am-tl-body" id={`tl-${era}`} role="region" aria-label={era}>
              <div>
                <div className="am-tl-rows">
                  {rows.slice().reverse().map((t) => (
                    <div className="am-tl-row" key={t.date + t.title}>
                      <time dateTime={t.date}>{nice(t.date)}</time>
                      <div><h4>{t.title}</h4><p>{t.text}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Timeline() {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && <Showreel />}
      <div className="am-wrap" style={{ marginTop: reduce ? 0 : "clamp(40px, 5vw, 70px)" }}>
        <span className="am-eyebrow">/ every change, in order /</span>
        <h3 style={{ fontSize: "clamp(26px, 3vw, 44px)", marginBottom: 26 }}>The full timeline</h3>
        <Accordion />
      </div>
    </>
  );
}
