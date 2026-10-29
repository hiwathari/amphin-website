import { Eyebrow, TeamGrid } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/about/team", { title: "Team" });
}

const MISSION = [
  ["Inspire creativity", "We push the boundaries of digital marketing with ideas that make brands stand out."],
  ["Empower clients", "Personalised support and strategies built around each client's goals."],
  ["Deliver excellence", "From web design to motion graphics, every deliverable is finished to a high standard."],
  ["Drive innovation", "We approach each challenge strategically and solve problems that move the business forward."],
];

// The people shown here are switched on in AMOS → Website → Team (founder first, then by order).
export default async function Team({ params }: { params: { region: RegionCode } }) {
  const { team } = await getContent();
  return (
    <>
      <PageHero title={["A result-driven", "creative team"]} lead="Strategists, designers, content creators, editors and developers across London, Kochi and Abu Dhabi." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>our mission</Eyebrow></div>
          <div className="grid cols-4">
            {MISSION.map(([t, d], i) => <Reveal key={t} delay={i * 0.06}><div className="feature"><span className="stat-num" style={{ fontSize: 44 }}>0{i + 1}</span><h4>{t}</h4><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>team</Eyebrow></div>
          <RevealLines lines={["The people behind", "the work"]} />
          <div style={{ marginTop: 44 }}><TeamGrid team={team} /></div>
        </div>
      </section>
      <CtaBand region={params.region} title="Join the team" href={`/${params.region}/careers`} cta="See careers" />
    </>
  );
}
