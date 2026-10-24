import Link from "next/link";
import { Eyebrow, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { PROJECT_CATEGORIES, getProjects } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/work", { title: "Work", description: "Branding, websites, content and social media projects by Amphin." });
}

export default function Work({ params, searchParams }: { params: { region: RegionCode }; searchParams: { category?: string } }) {
  const region = params.region;
  const cat = PROJECT_CATEGORIES.includes(searchParams.category || "") ? searchParams.category : undefined;
  const projects = getProjects(cat);
  return (
    <>
      <PageHero title={["Crafting brands and", "experiences that connect"]} lead={`${getProjects().length} projects across branding, websites, content and social media.`} />
      <section className="section">
        <div className="wrap">
          <div className="rule" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <Eyebrow>portfolio</Eyebrow>
            <nav className="chips" aria-label="Filter by category">
              <Link className="chip" href={`/${region}/work`} aria-current={!cat}>All</Link>
              {PROJECT_CATEGORIES.map((c) => (
                <Link key={c} className="chip" href={`/${region}/work?category=${encodeURIComponent(c)}`} aria-current={cat === c}>{c}</Link>
              ))}
            </nav>
          </div>
          <div className="grid cols-3" style={{ rowGap: 44 }}>
            {projects.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.06}><ProjectCard project={p} region={region} /></Reveal>)}
          </div>
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
