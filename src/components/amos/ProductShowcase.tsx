"use client";
// The dark showcase: pick an edition and see what it does with a demo screen on the right.
import { useEffect, useState } from "react";
import { EDITIONS, SERVICES } from "@/lib/amosProduct";
import { Counter } from "@/components/Motion";
import { DemoScreen } from "./DemoScreens";

export default function ProductShowcase({ initial = "core" }: { initial?: string }) {
  const [key, setKey] = useState(initial);
  useEffect(() => {
    const on = (e: Event) => { const k = (e as CustomEvent<string>).detail; if (EDITIONS.some((x) => x.key === k) || SERVICES.some((x) => x.key === k)) setKey(k); };
    window.addEventListener("am:edition", on);
    return () => window.removeEventListener("am:edition", on);
  }, []);
  const all = [...EDITIONS, ...SERVICES];
  const ed = all.find((e) => e.key === key) ?? EDITIONS[0];
  const isService = SERVICES.includes(ed);
  const group = isService ? SERVICES : EDITIONS;
  const idx = group.indexOf(ed);
  return (
    <div>
      <div className="am-dark-head">
        <div>
          <span className="am-eyebrow">/ see it working /</span>
          <h2>One platform, built for<br />the way you work</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="am-bigno"><Counter to={EDITIONS.length} /></div>
          <div style={{ fontSize: 14, color: "#d8d8de" }}>Named editions, each with its own OS</div>
        </div>
      </div>
      <div className="am-tabs" role="tablist" aria-label="AmOS editions">
        {EDITIONS.map((e) => (
          <button key={e.key} role="tab" className="am-tab" aria-selected={e.key === key} aria-controls="am-panel" onClick={() => setKey(e.key)}>{e.name}</button>
        ))}
      </div>
      <div className="am-tabs" role="tablist" aria-label="Services inside every OS" style={{ marginTop: -10 }}>
        <span style={{ alignSelf: "center", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "#9a9aa3", marginRight: 6 }}>Services inside every OS</span>
        {SERVICES.map((e) => (
          <button key={e.key} role="tab" className="am-tab" aria-selected={e.key === key} aria-controls="am-panel" onClick={() => setKey(e.key)}>{e.name}</button>
        ))}
      </div>
      <div className="am-show" id="am-panel" role="tabpanel" aria-label={ed.name}>
        <div className="am-show-copy">
          <span className="tag">{isService ? "A service you switch on inside any OS" : ed.builtFor ? `Built for ${ed.builtFor}` : `For ${ed.forWho.toLowerCase()}`}</span>
          <h3>{ed.name}: {ed.tagline}</h3>
          <p>{ed.summary}</p>
          <ul>{ed.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="am-btn light" href="#demo">Book a {ed.name} demo</a>
            <button className="am-tab" onClick={() => setKey(group[(idx + 1) % group.length].key)}>{isService ? "Next service →" : "Next edition →"}</button>
          </div>
        </div>
        <div><DemoScreen edition={ed.key} /></div>
      </div>
    </div>
  );
}
