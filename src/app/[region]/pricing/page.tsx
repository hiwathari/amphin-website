import Link from "next/link";
import { Eyebrow, PriceRows } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { getPillars, getPrices, startingPrice } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGIONS, formatPrice, type RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/pricing", { title: "Pricing", description: "Starting prices for Amphin's services in your currency." });
}

export default function Pricing({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const r = REGIONS[region];
  const pillars = getPillars();
  return (
    <>
      <PageHero title={["Pricing that fits", "your market"]} lead={`Starting prices in ${r.currency}. Each service has its own pricing page; anything without a listed price is quoted for you.`} />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>by service</Eyebrow></div>
          <div className="table-rows">
            {pillars.map((p, i) => {
              const from = startingPrice(p.slug, region);
              return (
                <Link key={p.slug} href={`/${region}/services/${p.slug}/pricing`}>
                  <span className="mono muted">/ {String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 18 }}>{p.title}</span>
                  <span className="mono" style={{ color: from ? "var(--accent)" : "var(--muted)" }}>{from ? `from ${formatPrice(from, r)}` : "contact for pricing"}</span>
                  <span className="link-arrow" style={{ justifySelf: "end" }}>Pricing <Arrow /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {["seo-performance", "social-media"].map((slug) => {
        const rows = getPrices({ pillar: slug });
        const p = pillars.find((x) => x.slug === slug);
        return (
          <section className="section" key={slug}>
            <div className="wrap">
              <div className="rule"><Eyebrow>{p?.title.toLowerCase() || slug}</Eyebrow></div>
              <PriceRows rows={rows} region={region} />
            </div>
          </section>
        );
      })}
      <CtaBand region={region} />
    </>
  );
}
