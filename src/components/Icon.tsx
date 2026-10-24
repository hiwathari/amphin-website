// Line icons for the service pillars and UI. Drawn for Amphin on a 32px grid.
const P: Record<string, JSX.Element> = {
  spark: <path d="M16 3v8M16 21v8M3 16h8M21 16h8M7 7l5 5M20 20l5 5M25 7l-5 5M12 20l-5 5" />,
  orbit: <><circle cx="16" cy="16" r="4" /><ellipse cx="16" cy="16" rx="13" ry="6" /><ellipse cx="16" cy="16" rx="6" ry="13" /></>,
  play: <><rect x="3" y="6" width="26" height="20" rx="4" /><path d="M13 11l8 5-8 5z" /></>,
  grid: <><rect x="4" y="4" width="10" height="10" rx="2" /><rect x="18" y="4" width="10" height="10" rx="2" /><rect x="4" y="18" width="10" height="10" rx="2" /><rect x="18" y="18" width="10" height="10" rx="2" /></>,
  bag: <><path d="M6 10h20l-2 18H8z" /><path d="M11 10V8a5 5 0 0110 0v2" /></>,
  phone: <><rect x="9" y="3" width="14" height="26" rx="3" /><path d="M14 25h4" /></>,
  chart: <><path d="M4 28h24" /><path d="M8 24v-8M14 24V10M20 24v-5M26 24V6" /></>,
  mic: <><rect x="12" y="3" width="8" height="15" rx="4" /><path d="M7 14a9 9 0 0018 0M16 23v6M11 29h10" /></>,
  chip: <><rect x="8" y="8" width="16" height="16" rx="2" /><path d="M12 4v4M20 4v4M12 24v4M20 24v4M4 12h4M4 20h4M24 12h4M24 20h4" /></>,
  compass: <><circle cx="16" cy="16" r="13" /><path d="M21 11l-3 7-7 3 3-7z" /></>,
  arrow: <path d="M6 16h20M19 9l7 7-7 7" />,
  check: <path d="M6 16l6 6 14-14" />,
  menu: <><circle cx="8" cy="8" r="2" /><circle cx="16" cy="8" r="2" /><circle cx="24" cy="8" r="2" /><circle cx="8" cy="16" r="2" /><circle cx="16" cy="16" r="2" /><circle cx="24" cy="16" r="2" /></>,
  close: <path d="M8 8l16 16M24 8L8 24" />,
  quote: <path d="M5 22l4-12h6l-4 12zM17 22l4-12h6l-4 12z" fill="currentColor" stroke="none" />,
  up: <path d="M16 26V6M9 13l7-7 7 7" />,
  plus: <path d="M16 6v20M6 16h20" />,
};

export default function Icon({ name, size = 32, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    >
      {P[name] ?? P.spark}
    </svg>
  );
}

export function Arrow({ size = 14 }: { size?: number }) {
  return <Icon name="arrow" size={size} />;
}
