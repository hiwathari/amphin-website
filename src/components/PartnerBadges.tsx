import Link from "next/link";
import { PARTNERS } from "@/lib/partners";

/** One partner: the official badge when the file exists, otherwise a clean text label. */
export function PartnerMark({ p, base, size = "sm" }: { p: (typeof PARTNERS)[number]; base: string; size?: "sm" | "lg" }) {
  const cls = `partner-badge ${size === "sm" ? "partner-badge-sm" : ""}${p.logo ? "" : " partner-chip"}`;
  const inner = p.logo
    // eslint-disable-next-line @next/next/no-img-element
    ? <img src={p.logo} alt={p.name} height={size === "sm" ? 34 : 52} style={{ height: size === "sm" ? 34 : 52, width: "auto" }} />
    : <span>{p.name}</span>;
  return p.blog
    ? <Link href={`${base}/blog/amphin-joins-google-cloud-partner-advantage`} className={cls} aria-label={p.name}>{inner}</Link>
    : <span className={cls}>{inner}</span>;
}

/** Footer row of partner badges, on every page. */
export default function PartnerBadges({ base }: { base: string }) {
  return (
    <div className="partner-row" aria-label="Our partners">
      <span className="partner-row-label">Partners</span>
      <div className="partner-row-badges">{PARTNERS.map((p) => <PartnerMark key={p.key} p={p} base={base} />)}</div>
    </div>
  );
}
