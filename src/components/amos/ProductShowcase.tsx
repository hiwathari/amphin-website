"use client";
// The dark showcase: pick an edition and see what it does with a demo screen on the right.
import { useEffect, useState } from "react";
import { EDITIONS } from "@/lib/amosProduct";
import { Counter } from "@/components/Motion";
import { DemoScreen } from "./DemoScreens";

export default function ProductShowcase({ initial = "core" }: { initial?: string }) {
  const [key, setKey] = useState(initial);
  useEffect(() => {
    const on = (e: Event) => { const k = (e as CustomEvent<string>).detail; if (EDITIONS.some((x) => x.key === k)) setKey(k); };
    window.addEventListener("am:edition", on);
    return () => window.removeEventListener("am:edition", on);
  }, []);
  const ed = EDITIONS.find((e) => e.key === key) ?? EDITIONS[0];
  const idx = EDITIONS.indexOf(ed);
  return (
    <div>
      <div className="am-dark-head">
        <div>
          <span className="am-eyebrow">/ see it working /</span>
          <h2>One platform, built for<br />the way you work</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="am-bigno"><Counter to={EDITIONS.length} /></div>
          <div style={{ fontSize: 14, color: "#d8d8de" }}>Editions and shared modules</div>
        </div>
      </div>
      <div className="am-tabs" role="tablist" aria-label="AmOS editions">
        {EDITIONS.map((e) => (
          <button key={e.key} role="tab" className="am-tab" aria-selected={e.key === key} aria-controls="am-panel" onClick={() => setKey(e.key)}>{e.name}</button>
        ))}
      </div>
      <div className="am-show" id="am-panel" role="tabpanel" aria-label={ed.name}>
        <div className="am-show-copy">
          <span className="tag">{ed.builtFor ? `Built for ${ed.builtFor}` : `For ${ed.forWho.toLowerCase()}`}</span>
          <h3>{ed.name}: {ed.tagline}</h3>
          <p>{ed.summary}</p>
          <ul>{ed.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="am-btn light" href="#demo">Book a {ed.name} demo</a>
            <button className="am-tab" onClick={() => setKey(EDITIONS[(idx + 1) % EDITIONS.length].key)}>Next edition →</button>
          </div>
        </div>
        <div><DemoScreen edition={ed.key} /></div>
      </div>
    </div>
  );
}
