"use client";
// Floating pill header for the AmOS pages: a way back to the Amphin website, the sections of this
// page with the current one highlighted as you scroll, and a demo button.
import { useEffect, useState } from "react";
import { AmosLogo } from "./Logo";

const LEFT = [["overview", "Overview"], ["editions", "Editions"], ["features", "Features"]] as const;
const RIGHT = [["integrations", "Integrations"], ["timeline", "Timeline"], ["amphin", "Amphin"], ["faq", "FAQ"]] as const;
const ALL = [...LEFT, ...RIGHT, ["demo", "Demo"]] as const;

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4 6 10l6 6" /></svg>
);

export default function AmosHeader({ base }: { base: string }) {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = ALL.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const link = ([id, label]: readonly [string, string]) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>{label}</a>
  );
  const back = (
    <a className="am-back" href={base} aria-label="Back to the Amphin website">
      <Arrow /> <span>Amphin website</span>
    </a>
  );

  return (
    <header className="am-head">
      <div className="am-pill">
        <div className="am-left">
          {back}
          <nav aria-label="Product sections">{LEFT.map(link)}</nav>
        </div>
        <AmosLogo href="#overview" />
        <div className="am-right">
          <nav aria-label="More sections">{RIGHT.map(link)}</nav>
          <a href="#demo" className="am-btn outline sm">Book a demo</a>
          <button className="am-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h14M3 10h14M3 14h14" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="am-mobile" role="dialog" aria-label="Menu">
          <div className="top">
            <AmosLogo href="#overview" />
            <button className="am-burger" style={{ display: "grid" }} aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l12 12M16 4 4 16" /></svg>
            </button>
          </div>
          {ALL.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <a href={base}>← Back to Amphin website</a>
        </div>
      )}
    </header>
  );
}
