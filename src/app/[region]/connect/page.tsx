import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ConnectForm from "@/components/forms/ConnectForm";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { EMAILS } from "@/lib/site";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/connect", { title: "Amphin Connect", description: "Amphin Connect brings influencers and brands together for authentic campaigns." });
}

const FEATURES = [
  ["Influencer recruitment", "Create a profile with your interests, social links and past collaborations, then apply for campaigns that fit."],
  ["Brand outreach", "Brands find influencers who match their audience, then manage campaigns and track results."],
  ["Collaboration tools", "Direct messaging between influencers and brands, plus group collaborations to widen reach."],
  ["Marketing support", "Content guidance for creators and campaign analytics for brands."],
  ["Community", "Regular events and forums for creators and brands, with support for start-ups."],
  ["Sustainability & CSR", "Tree planting and charity partnerships that give campaigns a positive impact."],
];

export default function Connect({ params }: { params: { region: RegionCode } }) {
  return (
    <>
      <PageHero title={["Amphin Connect"]} lead="Partner. Create. Influence. A space where influencers and brands meet, collaborate and grow together." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>how it works</Eyebrow></div>
          <div className="grid cols-3">
            {FEATURES.map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 0.06}><div className="feature"><span className="stat-num" style={{ fontSize: 40 }}>0{i + 1}</span><h4>{t}</h4><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>join</Eyebrow></div>
            <RevealLines lines={["Influencer or brand,", "start here"]} />
            <p className="muted" style={{ marginTop: 22 }}>Questions about Connect? Email <a href={`mailto:${EMAILS.marketing}`} style={{ color: "var(--accent)" }}>{EMAILS.marketing}</a>.</p>
          </div>
          <ConnectForm region={params.region} />
        </div>
      </section>
      <CtaBand region={params.region} />
    </>
  );
}
