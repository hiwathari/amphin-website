"use client";
// The numbered lists from the reference design: big names that turn indigo to crimson on hover.
import { useState } from "react";

export function EditionList({ items }: { items: { key: string; name: string; meta: string }[] }) {
  const [on, setOn] = useState<string | null>(null);
  return (
    <ul className="am-list">
      {items.map((it, i) => (
        <li key={it.key} data-on={on === it.key} onMouseEnter={() => setOn(it.key)} onMouseLeave={() => setOn(null)}>
          <a className="row" href="#showcase" onClick={() => window.dispatchEvent(new CustomEvent("am:edition", { detail: it.key }))}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">{it.name}</span>
            <span className="meta">{it.meta}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function FeatureList({ items }: { items: { name: string; text: string }[] }) {
  const [on, setOn] = useState(0);
  return (
    <ul className="am-list">
      {items.map((it, i) => (
        <li key={it.name} data-on={on === i} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
          <div className="row" tabIndex={0}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <span className="t">{it.name}</span>
            <span className="meta" />
          </div>
          <div style={{ display: "grid", gridTemplateRows: on === i ? "1fr" : "0fr", transition: "grid-template-rows .4s" }}>
            <div style={{ overflow: "hidden" }}>
              <p className="am-feature-text" style={{ marginLeft: 70 }}>{it.text}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
