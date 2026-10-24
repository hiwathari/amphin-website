// Generated "liquid" artwork in Amphin's orange: soft silk-like ribbons and glowing gradients pushed
// through a slow SVG turbulence and blurred, so every card, band and hero gets its own flowing warm
// texture without stock images. Seeded by a string, so the same item always gets the same artwork.

function hash(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  return h;
}

// [deep, mid-dark, hot, brand orange, highlight]
const PALETTES = [
  ["#240b05", "#a3300f", "#ef5a26", "#f7943d", "#ffd9a8"],
  ["#1c0906", "#b8331a", "#fd644e", "#ff9a5c", "#ffe3c4"],
  ["#2a1004", "#c4501a", "#f67c37", "#ffb15c", "#fff1d8"],
  ["#160a08", "#8f2a14", "#e8462a", "#f7a046", "#ffd1a1"],
];

export default function LiquidArt({
  seed, className, style, animate = true, intensity = 1,
}: { seed: string; className?: string; style?: React.CSSProperties; animate?: boolean; intensity?: number }) {
  const h = hash(seed);
  const id = `liq-${h.toString(36)}`;
  const pal = PALETTES[h % PALETTES.length];
  const freq = (0.0022 + (h % 6) * 0.0006).toFixed(4);
  const scale = Math.round((110 + (h % 110)) * intensity);
  const angle = h % 360;
  const cx = 25 + (h % 50), cy = 20 + ((h >> 6) % 60);
  const dur = 20 + (h % 16);
  const ribbons = 5 + (h % 3);
  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", background: pal[0], ...style }} aria-hidden="true">
      <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id={`${id}-g`} cx={`${cx}%`} cy={`${cy}%`} r="90%">
            <stop offset="0%" stopColor={pal[4]} />
            <stop offset="18%" stopColor={pal[3]} />
            <stop offset="45%" stopColor={pal[2]} />
            <stop offset="75%" stopColor={pal[1]} />
            <stop offset="100%" stopColor={pal[0]} />
          </radialGradient>
          <linearGradient id={`${id}-r`} gradientTransform={`rotate(${angle % 90} .5 .5)`}>
            <stop offset="0%" stopColor={pal[1]} />
            <stop offset="45%" stopColor={pal[4]} />
            <stop offset="60%" stopColor={pal[3]} />
            <stop offset="100%" stopColor={pal[1]} />
          </linearGradient>
          <filter id={`${id}-f`} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed={h % 1000} result="noise">
              {animate && <animate attributeName="baseFrequency" dur={`${dur}s`} values={`${freq};${(Number(freq) * 1.4).toFixed(4)};${freq}`} repeatCount="indefinite" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="5" />
          </filter>
          <filter id={`${id}-glow`}><feGaussianBlur stdDeviation="40" /></filter>
        </defs>
        <rect width="800" height="800" fill={`url(#${id}-g)`} />
        <g filter={`url(#${id}-f)`} style={{ mixBlendMode: "screen" }}>
          {Array.from({ length: ribbons }, (_, i) => {
            const y = 60 + i * (700 / ribbons) + ((h >> (i + 2)) % 60);
            const bend = 120 + ((h >> i) % 200);
            return (
              <path
                key={i}
                d={`M -150 ${y} C 150 ${y - bend}, 450 ${y + bend}, 950 ${y - bend / 2}`}
                stroke={`url(#${id}-r)`} strokeOpacity={0.35 + (i % 3) * 0.18} strokeWidth={36 + ((h >> (i * 3)) % 70)} fill="none" strokeLinecap="round"
              />
            );
          })}
        </g>
        <circle cx={`${cx}%`} cy={`${cy}%`} r="220" fill={pal[4]} opacity=".35" filter={`url(#${id}-glow)`} />
      </svg>
    </div>
  );
}
