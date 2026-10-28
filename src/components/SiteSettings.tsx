import type { SiteSettings } from "@/lib/content";

// Applies Studio → Settings to the page: fonts, colours, the text gradient and the animation switches.
// Defaults match globals.css, so nothing changes until someone edits. Optional analytics tags load from
// <Consent> once the visitor agrees.
const SAFE_FONT = /^[A-Za-z0-9 ]{2,40}$/;
const SAFE_COLOR = /^#[0-9a-f]{6}$/i;

export default function SiteSettingsStyle({ s }: { s: SiteSettings }) {
  const t = s.theme;
  const fonts = [t.fontSans, t.fontMono].filter((f) => SAFE_FONT.test(f) && f !== "DM Sans" && f !== "DM Mono");
  const grad = t.gradient.filter((c) => SAFE_COLOR.test(c));
  const vars: string[] = [];
  if (SAFE_FONT.test(t.fontSans)) vars.push(`--sans: "${t.fontSans}", system-ui, -apple-system, "Segoe UI", sans-serif;`);
  if (SAFE_FONT.test(t.fontMono)) vars.push(`--mono: "${t.fontMono}", ui-monospace, "SFMono-Regular", Menlo, monospace;`);
  if (SAFE_COLOR.test(t.accent)) vars.push(`--accent: ${t.accent};`);
  if (SAFE_COLOR.test(t.orange)) vars.push(`--orange: ${t.orange};`);
  if (SAFE_COLOR.test(t.background)) vars.push(`--bg: ${t.background};`);
  if (grad.length >= 2) vars.push(`--grad-text: linear-gradient(90deg, ${grad.map((c, i) => `${c} ${Math.round((i / (grad.length - 1)) * 100)}%`).join(", ")});`);

  const css = [
    `:root { ${vars.join(" ")} }`,
    !s.motion.animations ? `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; scroll-behavior: auto !important; } .preloader { display: none !important; }` : "",
    !s.motion.preloader ? `.preloader { display: none !important; }` : "",
    !s.motion.textWave ? `.wave-char { transform: none !important; opacity: 1 !important; }` : "",
    !s.motion.cursorGlow ? `.cursor-glow, .cursor-dot { display: none !important; }` : "",
    s.mobile.hideCursorGlow ? `@media (hover: none) { .cursor-glow, .cursor-dot { display: none !important; } }` : "",
    s.mobile.reduceMotion ? `@media (max-width: 700px) { .streaks-anim, .hero-orb { display: none !important; } .liquid-hero animate { display: none; } }` : "",
    s.mobile.compactHeader ? `@media (max-width: 700px) { .topbar { display: none !important; } .header-bar { min-height: 54px !important; } }` : "",
  ].filter(Boolean).join("\n");

  return (
    <>
      {fonts.length > 0 && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@300;400;500;600`).join("&")}&display=swap`} />
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}

/** Analytics IDs from Studio, validated before they reach a script tag. */
export function analyticsIds(s: SiteSettings) {
  return {
    ga: /^G-[A-Z0-9]{4,15}$/i.test(s.analytics.gaId) ? s.analytics.gaId : "",
    clarity: /^[a-z0-9]{6,20}$/i.test(s.analytics.clarityId) ? s.analytics.clarityId : "",
  };
}
