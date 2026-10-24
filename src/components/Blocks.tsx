import Link from "next/link";
import Icon, { Arrow } from "./Icon";
import { formatPrice, REGIONS, type RegionCode } from "@/lib/regions";
import type { Pillar, PriceRow, Project } from "@/lib/content";

/** Procedural artwork for a card: layered gradients seeded from a name, so each
 *  pillar or project without a photo still gets its own distinctive warm abstract. */
export function Art({ seed, className, style }: { seed: string; className?: string; style?: React.CSSProperties }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const a = h % 360, x = 20 + (h % 60), y = 20 + ((h >> 5) % 60), r = 30 + ((h >> 9) % 40);
  const hue = [22, 12, 32, 4, 40][h % 5];
  const bg = [
    `radial-gradient(${r}% ${r + 20}% at ${x}% ${y}%, hsla(${hue + 18},100%,78%,.95), transparent 60%)`,
    `conic-gradient(from ${a}deg at ${100 - x}% ${100 - y}%, hsl(${hue},92%,56%), hsl(${hue - 10},85%,32%), #120806, hsl(${hue + 8},95%,60%), hsl(${hue},92%,56%))`,
  ].join(",");
  return (
    <div className={className} style={{ ...style }}>
      <div style={{ position: "absolute", inset: 0, background: bg }} />
      <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(${a % 180}deg, rgba(0,0,0,.28) 0 2px, transparent 2px ${10 + (h % 14)}px)`, mixBlendMode: "multiply" }} />
    </div>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <div className="eyebrow">{children}</div>;
}

export function ServiceCard({ pillar, index, region }: { pillar: Pillar; index: number; region: RegionCode }) {
  return (
    <Link href={`/${region}/services/${pillar.slug}`} className="svc-card">
      <div className="svc-copy">
        <Icon name={pillar.icon} className="svc-icon" />
        <div>
          <div className="svc-num">/ {String(index + 1).padStart(2, "0")}</div>
          <h3>{pillar.title}</h3>
        </div>
      </div>
      <Art seed={pillar.slug} className="svc-art" />
    </Link>
  );
}

export function ProjectCard({ project, region }: { project: Project; region: RegionCode }) {
  return (
    <Link href={`/${region}/work/${project.slug}`} className="project-card">
      <div className="thumb">
        {/* Generated art sits underneath, so a slow or missing photo never leaves an empty box. */}
        <Art seed={project.slug} style={{ position: "absolute", inset: 0 }} />
        {project.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.featuredImage} alt={project.title} loading="lazy" decoding="async" style={{ position: "relative" }} />
        )}
      </div>
      <div>
        <h3>{project.title}</h3>
        <div className="meta">{project.categories.slice(0, 2).join(" · ")} / {project.year}</div>
      </div>
    </Link>
  );
}

export function PriceRows({ rows, region }: { rows: PriceRow[]; region: RegionCode }) {
  const r = REGIONS[region];
  return (
    <div className="grid" style={{ gap: 14 }}>
      {rows.filter((p) => p.features.length).map((p) => {
        const amount = p.prices[region];
        return (
          <div key={p.item} className="row-card price">
            <div>
              {p.highlight && <span className="tag">Best value</span>}
              <h3 style={{ fontSize: 19 }}>{p.label.replace(/^.*?·\s*/, "")}</h3>
              <div className="mono muted" style={{ fontSize: 12, marginTop: 6 }}>{p.label.split("·")[0].trim()}</div>
            </div>
            <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <div className="price-amt">
              {typeof amount === "number" ? (
                <>
                  <small>{p.prefix}</small>
                  {formatPrice(amount, r)}
                  <small>{p.period}</small>
                </>
              ) : (
                <Link href={`/${region}/quote?item=${p.item}`} className="link-arrow" style={{ marginLeft: "auto" }}>
                  Contact for pricing <Arrow />
                </Link>
              )}
            </div>
          </div>
        );
      })}
      <p className="form-note">Starting prices in {r.currency}. Final quotes depend on scope, location and timing.</p>
    </div>
  );
}

const CLIENT_LOGOS = [
  "nexgro-logo", "rayyan-logo", "saravan-bhavan-logo", "shan-prop-logo", "mallu-mechanics-logo", "dhe-chayakada-logo",
  "hello-chai-logo", "honey-cakes-logo", "ice-hub-logo-1", "riceclub-logo", "sulaimany-logo", "wonderwall-logo",
  "fresh-granules-logo", "hichki-logo-", "inout-stories-logo", "exmelt-logo", "dd-logo", "taxnest-logo-white-",
];

export function LogoWall({ count = 12 }: { count?: number }) {
  return (
    <div className="logo-wall">
      {CLIENT_LOGOS.slice(0, count).map((l) => (
        <div key={l}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/clients/${l}.webp`} alt={l.replace(/-logo.*$/, "").replace(/-/g, " ")} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export const TESTIMONIALS = [
  {
    quote: "Amphin has been a game-changer for our digital presence. Their team developed a sleek, functional website for Polkadots Media that perfectly reflects our brand. Their professionalism, attention to detail and technical expertise made the entire process seamless.",
    name: "Abin Varghese", role: "MD & CEO, Polkadots Media (Canada & India)", project: "polkadots-media",
  },
  {
    quote: "From menu design to social media marketing and video production, they provided end-to-end solutions that significantly boosted our restaurant's visibility. Their event promotions and cost-efficient management have helped Chai Kadai expand in the competitive London market.",
    name: "Shahid", role: "Owner, Chai Kadai UK", project: "chai-kadai-branding",
  },
  {
    quote: "Amphin's branding and graphic design expertise helped position IG3 Fish Hub as a standout name in the UK. Their branding strategy and website design captured our vision perfectly, and their company formation services ensured a smooth setup.",
    name: "Shas", role: "Co-Founder, IG3 Fish Hub, Ilford", project: "ig3fishhub",
  },
];
