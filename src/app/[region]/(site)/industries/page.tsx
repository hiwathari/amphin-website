import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { Arrow } from "@/components/Icon";
import { Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getProjects } from "@/lib/content";
import { INDUSTRIES, projectsInIndustry } from "@/lib/industries";
import { regionalMeta } from "@/lib/meta";
import { EMAILS } from "@/lib/site";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/industries", {
    title: "Industries",
    description: "Branding, websites and marketing for food and hospitality, retail, property, travel, industrial, technology and care businesses. See where Amphin's experience runs deepest.",
  });
}

export default async function Industries({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const projects = await getProjects();
  const rows = INDUSTRIES.map((i) => ({ ...i, n: projectsInIndustry(projects, i).length })).filter((i) => i.n > 0);
  return (
    <>
      <PageHero title={["Built for your", "industry."]}
        lead="Every industry plays by its own rules: buying cycle, audience, yardstick. Here is how we work across the ones where our experience runs deepest." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>industries</Eyebrow></div>
          <div className="ind-grid">
            {rows.map((i, k) => (
              <Reveal key={i.slug} delay={(k % 2) * 0.06}>
                <Link href={`/${region}/industries/${i.slug}`} className="ind-card">
                  <span className="mono ind-no">{String(k + 1).padStart(2, "0")}</span>
                  <h2>{i.name}</h2>
                  <p className="ind-line">{i.line}</p>
                  <div className="ind-foot"><span>{i.n} project{i.n === 1 ? "" : "s"}</span><span className="link-arrow">Explore industry <Arrow /></span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: "clamp(40px, 6vw, 80px)" }}>
        <div className="cta-band">
          <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 18 }}>
            <Eyebrow>start something</Eyebrow>
            <RevealLines as="h2" lines={["Shall we add your", "brand to the list?"]} />
            <p style={{ maxWidth: "46ch", margin: 0 }}>Tell us the goal. We&apos;ll reply within one working day.</p>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <Link href={`/${region}/quote`} className="btn-pill magnetic">Start a project</Link>
              <a className="link-arrow" href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
