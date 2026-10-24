"use client";
// First-visit loader: the Amphin emblem draws its outline, then fills with orange liquid while drops
// splash in, and the screen lifts away. It plays once per browser session. The whole sequence runs on
// CSS, so the overlay also clears itself if JavaScript never loads; this component only removes it.
import { useEffect, useState } from "react";
import { EMBLEM_PATHS, EMBLEM_VIEWBOX } from "@/lib/emblem";

const KEY = "amphin_loaded";
const TAGLINE = "Empowering Brands, Redefining Possibilities";

// One wavelength is 170 units; the liquid slides by exactly that, so the loop is seamless.
const WAVE = (() => {
  let d = "M-260 0";
  for (let x = -260; x < 800; x += 170) d += ` Q${x + 42.5} -16 ${x + 85} 0 T${x + 170} 0`;
  return `${d} L800 620 L-260 620Z`;
})();

const DROPS = [
  { x: 205, delay: 0.35, size: 9 },
  { x: 380, delay: 0.7, size: 7 },
  { x: 150, delay: 1.0, size: 6 },
  { x: 355, delay: 1.25, size: 8 },
];

export default function Preloader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* private mode: still plays, just every time */ }
    const t = setTimeout(() => setGone(true), 3600);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <>
      {/* Runs before paint so returning visitors never see the overlay flash. */}
      <script dangerouslySetInnerHTML={{ __html: `try{sessionStorage.getItem("${KEY}")&&document.documentElement.classList.add("pl-skip")}catch(e){}` }} />
      <div className="preloader" aria-hidden="true">
        <div className="pl-stage">
          <svg className="pl-mark" viewBox={EMBLEM_VIEWBOX}>
            <defs>
              <clipPath id="pl-clip">{EMBLEM_PATHS.map((d) => <path key={d} d={d} />)}</clipPath>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffb35a" />
                <stop offset=".35" stopColor="#f67c37" />
                <stop offset="1" stopColor="#fd644e" />
              </linearGradient>
            </defs>
            <g clipPath="url(#pl-clip)">
              <rect x="92" y="12" width="340" height="494" fill="#1c130f" />
              <g className="pl-liquid">
                <path className="pl-wave pl-wave-back" d={WAVE} />
                <path className="pl-wave pl-wave-front" d={WAVE} fill="url(#pl-grad)" />
              </g>
            </g>
            {DROPS.map((p) => (
              <g key={p.x} style={{ ["--d" as string]: `${p.delay}s` }}>
                <path className="pl-drop" d={`M${p.x} ${-p.size * 2.4} Q${p.x + p.size} 0 ${p.x} ${p.size} Q${p.x - p.size} 0 ${p.x} ${-p.size * 2.4}Z`} fill="#f67c37" />
                <ellipse className="pl-splash" cx={p.x} cy="300" rx={p.size * 2.6} ry={p.size * 0.8} fill="none" stroke="#ffb35a" strokeWidth="2" />
              </g>
            ))}
            {EMBLEM_PATHS.map((d) => <path key={d} className="pl-stroke" d={d} pathLength={1} />)}
          </svg>
          <p className="pl-tagline">
            {Array.from(TAGLINE).map((ch, i) => <span key={i} style={{ animationDelay: `${0.9 + i * 0.025}s` }}>{ch === " " ? " " : ch}</span>)}
          </p>
        </div>
      </div>
    </>
  );
}
