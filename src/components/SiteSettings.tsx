import Script from "next/script";
import type { SiteSettings } from "@/lib/content";

// Applies Studio → Settings to the page: fonts, colours, the text gradient, the animation switches
// and the optional analytics tags. Defaults match globals.css, so nothing changes until someone edits.
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

  const ga = /^G-[A-Z0-9]{4,15}$/i.test(s.analytics.gaId) ? s.analytics.gaId : "";
  const clarity = /^[a-z0-9]{6,20}$/i.test(s.analytics.clarityId) ? s.analytics.clarityId : "";
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
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {clarity && (
        <Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}</Script>
      )}
    </>
  );
}
