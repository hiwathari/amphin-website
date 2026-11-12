"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARTNERS } from "@/lib/partners";

/** Footer row of partner badges. The home page already features Google Cloud in a large section, so it is not repeated there. */
export default function PartnerBadges({ base }: { base: string }) {
  const path = (usePathname() || "").replace(/\/$/, "");
  const onHome = path === base;
  const list = PARTNERS.filter((p) => p.logo && !(onHome && p.key === "google-cloud"));
  if (list.length === 0) return null;
  return (
    <div className="partner-row" aria-label="Our partners">
      <span className="partner-row-label">Partners</span>
      <div className="partner-row-badges">
        {list.map((p) => {
          const img = (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo!} alt={p.name} height={34} style={{ height: 34, width: "auto" }} />
          );
          return p.blog
            ? <Link key={p.key} href={`${base}/blog/amphin-joins-google-cloud-partner-advantage`} className="partner-badge partner-badge-sm" aria-label={p.name}>{img}</Link>
            : <span key={p.key} className="partner-badge partner-badge-sm">{img}</span>;
        })}
      </div>
    </div>
  );
}
