"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { Counter } from "./Motion";

interface T { quote: string; name: string; role: string }

export default function Testimonials({ items, title, stat }: { items: T[]; title: string[]; stat?: { value: number; suffix: string; label: string } }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);
  const cur = items[i];
  return (
    <div className="quote-inner">
      <div className="quote-card">
        <Icon name="quote" className="quote-mark" />
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5 }}>
            <blockquote>{cur.quote}</blockquote>
            <cite>{cur.name} / {cur.role}</cite>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "grid", gap: 24, alignContent: "end" }}>
        <h2 style={{ color: "#fff" }}>{title.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div className="dots">
            {items.map((_, n) => (
              <button key={n} aria-label={`Testimonial ${n + 1}`} aria-pressed={n === i} onClick={() => setI(n)}>{n + 1}</button>
            ))}
          </div>
          {stat && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Counter to={stat.value} suffix={stat.suffix} className="stat-num" />
              <span className="mono" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 11 }}>{stat.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
