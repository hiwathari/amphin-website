import Link from "next/link";
import { Art, Eyebrow, LogoWall, TeamGrid } from "@/components/Blocks";
import { RevealMedia } from "@/components/Effects";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { Counter, Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getContent, getProjects } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { COMPANY } from "@/lib/site";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/about", { title: "About", description: "Amphin is a creative digital marketing agency based in London, with studios in Kochi and Abu Dhabi." });
}

const VALUES = [
  ["Creativity", "We turn ideas into visual stories. Designers, content creators and strategists work as one team to craft brands people remember."],
  ["Innovation", "We use the latest platforms, tools and AI-assisted workflows so your marketing stays ahead of the curve."],
  ["Collaboration", "We work closely with every client, so strategies fit your goals and results can be measured."],
];

export default async function About({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const [c, projects] = await Promise.all([getContent(), getProjects()]);
  return (
    <>
      <PageHero title={["About Amphin"]} lead="A creative digital marketing agency based in London, with studios in Kochi and Abu Dhabi, serving clients across the UK, Europe, India, the Middle East and North America." />
      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <div style={{ position: "relative", aspectRatio: "1", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, transform: "skewX(-14deg)" }}>
            {[0, 1, 2, 3].map((i) => (
              <RevealMedia key={i} delay={i * 0.12}>
                <Art seed={`about-${i}`} style={{ position: "relative", height: "100%", minHeight: 360, borderRadius: 999, overflow: "hidden" }} />
              </RevealMedia>
            ))}
          </div>
          <div>
            <RevealLines lines={["A modern agency", "for brands that", "want to grow"]} />
            <p className="muted" style={{ marginTop: 24 }}>
              We specialise in branding, social media management, web design, creative design, videography and digital marketing.
              Our mission is to empower businesses to reach their full potential through digital marketing strategy and dependable IT solutions.
            </p>
            <p className="muted">
              Our model is hybrid: strategy and client leadership in the UK, with production and support studios in Kerala, India and Abu Dhabi, UAE.
              That lets us deliver agency-quality work at a cost that suits new and growing businesses.
            </p>
            <div style={{ display: "flex", gap: 40, marginTop: 30, flexWrap: "wrap", alignItems: "flex-end" }}>
              <div><Counter to={projects.length} suffix="+" className="stat-num" /><div className="stat-label">Projects published</div></div>
              <div><Counter to={c.offices.length} className="stat-num" /><div className="stat-label">Offices</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track marquee-words">
          {[0, 1].map((k) => <span key={k}>innovative · creative · <em>collaborative</em> · </span>)}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>our values</Eyebrow></div>
          <div className="grid cols-3">
            {VALUES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}><div className="feature"><span className="stat-num" style={{ fontSize: 44 }}>0{i + 1}</span><h4 style={{ fontSize: 22 }}>{t}</h4><p>{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>vision</Eyebrow></div>
          <div className="grid cols-2" style={{ gap: 40 }}>
            <RevealLines lines={["Built for the businesses", "that power a high street"]} />
            <div>
              <p className="muted">Our vision is to become a leading provider of digital marketing and IT services for new and growing businesses in the UK, with expansion across Europe and the Middle East.</p>
              <p className="muted">We focus on restaurants, cafés, gyms, retailers and service businesses that need fresh, high-impact marketing without enterprise budgets.</p>
              <Link href={`/${region}/about/team`} className="link-arrow">Meet the team <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>team</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["Get to know our", "creative team"]} />
            <Link href={`/${region}/about/team`} className="link-arrow">Whole team <Arrow /></Link>
          </div>
          <TeamGrid team={c.team.slice(0, 4)} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>clients</Eyebrow></div>
          <LogoWall clients={c.clients} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>company</Eyebrow></div>
          <p className="muted" style={{ maxWidth: 760 }}>
            {COMPANY.trademark} is a registered trademark. {COMPANY.ukEntity} is {COMPANY.ukRegistration.toLowerCase()} under company number {COMPANY.ukCompanyNumber}.
            In India, {COMPANY.indiaEntity} is {COMPANY.indiaRegistration.toLowerCase().replace(/^registered/, "registered")}.
            {" "}<Link href={`/${region}/legal/company-information`} className="link-arrow" style={{ display: "inline-flex" }}>Company information</Link>
          </p>
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
