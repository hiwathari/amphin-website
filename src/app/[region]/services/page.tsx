import Link from "next/link";
import { Eyebrow, ServiceCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getPillars, getServices, startingPrice } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGIONS, formatPrice, type RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/services", { title: "Services", description: "Branding, social media, content and video, websites, e-commerce, apps, SEO and paid media, PR and influencer marketing, IT systems and strategy." });
}

export default function Services({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const pillars = getPillars();
  return (
    <>
      <PageHero title={["Expert services from", "one creative team"]} lead="Ten service areas, one team. Pick a single service or let us run your brand, content and growth together." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>services</Eyebrow></div>
          <div className="grid cols-3">
            {pillars.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.06}><ServiceCard pillar={p} index={i} region={region} /></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>everything we do</Eyebrow></div>
          <div className="grid cols-2" style={{ gap: 0 }}>
            {pillars.map((p) => {
              const from = startingPrice(p.slug, region);
              return (
                <div key={p.slug} style={{ padding: "26px 0", borderBottom: "1px solid var(--line)", display: "grid", gap: 10, paddingRight: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                    <Link href={`/${region}/services/${p.slug}`}><h3 style={{ fontSize: 22 }}>{p.title}</h3></Link>
                    <span className="mono" style={{ fontSize: 12, color: from ? "var(--accent)" : "var(--muted)" }}>
                      {from ? `from ${formatPrice(from, REGIONS[region])}` : "contact for pricing"}
                    </span>
                  </div>
                  <p className="muted" style={{ margin: 0, fontSize: 14 }}>{p.pitch}</p>
                  <div className="chips">
                    {getServices(p.slug).map((s) => <Link key={s.slug} className="chip" href={`/${region}/services/${p.slug}/${s.slug}`}>{s.title}</Link>)}
                  </div>
                  <Link className="link-arrow" href={`/${region}/services/${p.slug}/pricing`} style={{ marginTop: 6 }}>Pricing <Arrow /></Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
