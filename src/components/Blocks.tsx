import Link from "next/link";
import Icon, { Arrow } from "./Icon";
import LiquidArt from "./LiquidArt";
import { RevealMedia, Tilt } from "./Effects";
import { formatPrice, REGIONS, type RegionCode } from "@/lib/regions";
import type { ClientLogo, Pillar, PriceRow, Project, TeamMember } from "@/lib/content";
import { opt } from "@/lib/img";

/** Generated liquid artwork (kept under the old name so existing pages keep working). */
export function Art({ seed, className, style }: { seed: string; className?: string; style?: React.CSSProperties }) {
  return <LiquidArt seed={seed} className={className} style={style} />;
}

export function Eyebrow({ children }: { children: string }) {
  return <div className="eyebrow">{children}</div>;
}

/** Numbered list of pillars in large muted type; hovering rolls each line over into the colour grade. */
export function ServiceIndex({ pillars, region }: { pillars: Pillar[]; region: RegionCode }) {
  return (
    <nav className="svc-index" aria-label="Services">
      {pillars.map((p, i) => (
        <Link key={p.slug} href={`/${region}/services/${p.slug}`}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <span className="roll"><span>/{p.title}/</span><span aria-hidden="true">/{p.title}/</span></span>
          <span className="go"><Arrow /></span>
        </Link>
      ))}
    </nav>
  );
}

export function ServiceCard({ pillar, index, region }: { pillar: Pillar; index: number; region: RegionCode }) {
  return (
    <Tilt className="svc-tilt">
      <Link href={`/${region}/services/${pillar.slug}`} className="svc-card">
        <div className="svc-copy">
          <Icon name={pillar.icon} className="svc-icon" />
          <div>
            <div className="svc-num">/ {String(index + 1).padStart(2, "0")}{pillar.favorite ? " ★" : ""}</div>
            <h3>{pillar.title}</h3>
          </div>
        </div>
        <LiquidArt seed={pillar.slug} className="svc-art" />
      </Link>
    </Tilt>
  );
}

export function ProjectCard({ project, region }: { project: Project; region: RegionCode }) {
  return (
    <Link href={`/${region}/work/${project.slug}`} className="project-card">
      <RevealMedia className="thumb">
        {/* Generated art sits underneath, so a slow or missing photo never leaves an empty box. */}
        <LiquidArt seed={project.slug} style={{ position: "absolute", inset: 0 }} />
        {project.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={opt(project.featuredImage, 828)} alt={project.title} loading="lazy" decoding="async" style={{ position: "relative" }} />
        )}
      </RevealMedia>
      <div>
        <div className="meta">/ {project.categories.slice(0, 2).join(" · ")} /</div>
        <h3>{project.title}</h3>
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
          <Tilt key={p.item} max={2}>
            <div className="row-card price">
              <div>
                {p.highlight && <span className="tag">Best value</span>}
                <h3 style={{ fontSize: 19 }}>{p.label.replace(/^.*?·\s*/, "")}</h3>
                <div className="mono muted" style={{ fontSize: 12, marginTop: 6 }}>{p.label.split("·")[0].trim()}</div>
              </div>
              <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="price-amt">
                {typeof amount === "number" ? (
                  <><small>{p.prefix}</small>{formatPrice(amount, r)}<small>{p.period}</small></>
                ) : (
                  <Link href={`/${region}/quote?item=${p.item}`} className="link-arrow" style={{ marginLeft: "auto" }}>Contact for pricing <Arrow /></Link>
                )}
              </div>
            </div>
          </Tilt>
        );
      })}
      <p className="form-note">Starting prices in {r.currency}. Final quotes depend on scope, location and timing.</p>
    </div>
  );
}

/** Grid of client logos (synced from AMOS: every active client with a logo). */
export function LogoWall({ clients, count = 12 }: { clients: ClientLogo[]; count?: number }) {
  return (
    <div className="logo-wall">
      {clients.slice(0, count).map((c) => (
        <div key={c.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.logo} alt={c.name} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

/** Endless strip of client logos. */
export function LogoMarquee({ clients }: { clients: ClientLogo[] }) {
  const list = clients.length < 8 ? [...clients, ...clients] : clients;
  return (
    <div className="logo-marquee" aria-label="Clients">
      <div className="marquee-track">
        {[0, 1].map((k) => list.map((c, i) => (
          <div className="cell" key={`${k}-${i}`} aria-hidden={k === 1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.logo} alt={k === 0 ? c.name : ""} loading="lazy" />
          </div>
        )))}
      </div>
    </div>
  );
}

/** Team from AMOS: black and white photos that turn colour on hover; the founder leads. */
/** Anonymous founder card: a soft silhouette instead of a photo. */
function Silhouette() {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "linear-gradient(180deg,#2a2a2a,#151515)" }} aria-hidden="true">
      <circle cx="150" cy="150" r="62" fill="#3a3a3a" />
      <path d="M40 400c0-80 50-140 110-140s110 60 110 140z" fill="#3a3a3a" />
    </svg>
  );
}

/** Until someone uploads a photo: their initials on a quiet gradient. */
function Placeholder({ name }: { name: string }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "linear-gradient(160deg,#262626,#161616)", fontSize: "clamp(38px,5vw,64px)", fontWeight: 500, color: "#3d3d3d", letterSpacing: "-0.04em" }}>{initials}</span>
  );
}

export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <div className="grid cols-4" style={{ rowGap: 36 }}>
      {team.map((m) => (
        <div key={m.name} className={`team-card${m.founder ? " founder" : ""}`}>
          <RevealMedia className="photo">
            {m.photo
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={m.photo} alt={m.name} loading="lazy" />
              : m.silhouette ? <Silhouette /> : <Placeholder name={m.name} />}
            {m.word && <span className="word" aria-hidden>{m.word}</span>}
            {m.socials && Object.values(m.socials).some(Boolean) && (
              <span className="team-social">
                {(["linkedin", "instagram", "facebook", "x"] as const).filter((k) => m.socials?.[k]).map((k) => (
                  <a key={k} href={m.socials![k]} target="_blank" rel="noopener noreferrer me" aria-label={`${m.name} on ${k === "x" ? "X" : k}`}>
                    {{ linkedin: "in", instagram: "ig", facebook: "fb", x: "x" }[k]}
                  </a>
                ))}
              </span>
            )}
          </RevealMedia>
          <div className="role">/ {m.founder ? "Founder" : m.title} /</div>
          <div style={{ fontWeight: 500 }}>{m.name}</div>
        </div>
      ))}
    </div>
  );
}
