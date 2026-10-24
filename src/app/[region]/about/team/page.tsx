import { Art, Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/about/team", { title: "Team" });
}

// From the current /team page. Photos and bios come from AMOS → Website → Team.
const TEAM = [
  ["Abhishek", "Advisor & Operations", "strategy"], ["Amal CB", "Creative Head", "design"], ["Ananthu", "Marketing Head", "growth"],
  ["Rachana Jayachandran", "Senior Growth Manager", "growth"], ["Fayas Ahammed", "Senior Content Creator", "content"],
  ["Akshay Raveendran", "Business Development Manager", "sales"], ["Anjali Mohan", "Account Manager", "clients"],
  ["Amal", "Customer Relations", "clients"], ["Athira", "HR Executive", "people"], ["Lavrin Fernandez", "Video Editor", "video"],
];

const MISSION = [
  ["Inspire creativity", "We push the boundaries of digital marketing with ideas that make brands stand out."],
  ["Empower clients", "Personalised support and strategies built around each client's goals."],
  ["Deliver excellence", "From web design to motion graphics, every deliverable is finished to a high standard."],
  ["Drive innovation", "We approach each challenge strategically and solve problems that move the business forward."],
];

export default function Team({ params }: { params: { region: RegionCode } }) {
  return (
    <>
      <PageHero title={["A result-driven", "creative team"]} lead="Strategists, designers, content creators, editors and developers across London, Kochi and Abu Dhabi." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>our mission</Eyebrow></div>
          <div className="grid cols-4">
            {MISSION.map(([t, d], i) => <Reveal key={t} delay={i * 0.06}><div className="feature"><h4>{t}</h4><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>team</Eyebrow></div>
          <RevealLines lines={["The people behind", "the work"]} />
          <div className="grid cols-4" style={{ marginTop: 44, rowGap: 34 }}>
            {TEAM.map(([name, role, word], i) => (
              <Reveal key={name} delay={(i % 4) * 0.06}>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ position: "relative", aspectRatio: "3 / 4", borderRadius: 14, overflow: "hidden", filter: "grayscale(.2)" }}>
                    <Art seed={name} style={{ position: "absolute", inset: 0 }} />
                    <span aria-hidden style={{ position: "absolute", right: 8, bottom: 10, writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: "clamp(34px, 4vw, 56px)", fontWeight: 600, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.85)", letterSpacing: "-0.03em" }}>{word}</span>
                  </div>
                  <div className="mono muted" style={{ fontSize: 11 }}>/ {role} /</div>
                  <div style={{ fontWeight: 500 }}>{name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand region={params.region} title="Join the team" />
    </>
  );
}
