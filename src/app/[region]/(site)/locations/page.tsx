import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { CITIES, buildLandings } from "@/lib/landing";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/locations", {
    title: "Locations: London, Kochi & Abu Dhabi",
    description: "Find Amphin's branding, social media, web, SEO and PR services in London, Kochi and Abu Dhabi, each with a local team and office.",
  });
}

export default async function Locations({ params }: { params: { region: RegionCode } }) {
  const c = await getContent();
  const all = buildLandings(c.pillars, c.services);
  // Visitors see their own market first.
  const cities = [...CITIES].sort((a, b) => Number(b.region === params.region) - Number(a.region === params.region));
  return (
    <>
      <PageHero title={["Where we", "work"]} lead="Local teams in London, Kochi and Abu Dhabi, working with businesses across the UK, Europe, India, the UAE and North America." />
      {cities.map((city) => {
        const office = c.offices.find((o) => o.slug === city.office);
        const here = all.filter((l) => l.city.slug === city.slug);
        return (
          <section key={city.slug} className="section">
            <div className="wrap">
              <div className="rule"><Eyebrow>{city.name.toLowerCase()}</Eyebrow></div>
              <h2>Amphin {city.name}</h2>
              {office && <p className="muted" style={{ margin: "12px 0 30px" }}>{office.address.join(", ")}{office.phone ? ` · ${office.phone}` : ""}</p>}
              <div className="grid cols-3" style={{ gap: 26 }}>
                {here.filter((l) => l.kind === "pillar").map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                    <div className="feature">
                      <h3 style={{ fontSize: 18 }}><Link href={`/${city.region}/${p.slug}`}>{p.phrase} in {city.name}</Link></h3>
                      <ul className="landing-links small">
                        {here.filter((s) => s.kind === "service" && s.pillar.slug === p.pillar.slug).map((s) => (
                          <li key={s.slug}><Link href={`/${city.region}/${s.slug}`}>{s.phrase}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <CtaBand region={params.region} />
    </>
  );
}
