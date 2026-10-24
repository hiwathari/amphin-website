import Link from "next/link";
import { RevealLines } from "./Motion";

export default function PageHero({ title, lead, crumbs }: { title: string[]; lead?: string; crumbs?: { href: string; label: string }[] }) {
  return (
    <section className="page-hero">
      <div className="streaks" />
      <div className="wrap">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mono" style={{ position: "relative", zIndex: 1, fontSize: 12, color: "#f3d9c8", marginBottom: 18 }}>
            {crumbs.map((c, i) => (
              <span key={c.href}>{i > 0 && " / "}<Link href={c.href}>{c.label}</Link></span>
            ))}
          </nav>
        )}
        <RevealLines as="h1" lines={title} />
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
