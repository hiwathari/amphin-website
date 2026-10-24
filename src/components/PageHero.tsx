import Link from "next/link";
import { HeroLight } from "./Effects";
import LiquidArt from "./LiquidArt";
import { RevealLines } from "./Motion";

export default function PageHero({ title, lead, crumbs, seed }: { title: string[]; lead?: string; crumbs?: { href: string; label: string }[]; seed?: string }) {
  return (
    <section className="page-hero">
      <LiquidArt seed={seed ?? `hero-${title.join(" ")}`} className="liquid-hero" intensity={1.3} />
      <div className="streaks-anim" />
      <HeroLight />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mono" style={{ fontSize: 12, color: "#f3d9c8", marginBottom: 18 }}>
            {crumbs.map((c, i) => <span key={c.href}>{i > 0 && " / "}<Link href={c.href}>{c.label}</Link></span>)}
          </nav>
        )}
        <RevealLines as="h1" lines={title} grad={title.length > 1 ? title.length - 1 : -1} />
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
