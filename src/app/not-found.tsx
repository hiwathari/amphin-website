import Link from "next/link";
import LiquidArt from "@/components/LiquidArt";

export default function NotFound() {
  return (
    <>
      <div className="frame-glow" />
      <main className="frame notfound">
        <LiquidArt seed="amphin-404" className="liquid-hero" intensity={1.5} />
        <div className="streaks-anim" />
        <div style={{ position: "relative", display: "grid", gap: 22, justifyItems: "center" }}>
          <div className="big">4<span style={{ color: "var(--orange)" }}>0</span>4</div>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 64px)" }}>Oops! Page not found</h1>
          <p className="muted" style={{ maxWidth: 520 }}>The address may have changed, or the page has moved. Let&apos;s get you back on track.</p>
          <Link href="/" className="link-arrow">Home page <span aria-hidden>+</span></Link>
        </div>
      </main>
    </>
  );
}
