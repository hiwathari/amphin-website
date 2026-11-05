import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getProjects } from "@/lib/content";
import { INDUSTRIES, industryOf, projectsInIndustry } from "@/lib/industries";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateStaticParams() { return INDUSTRIES.map((i) => ({ industry: i.slug })); }

export function generateMetadata({ params }: { params: { region: string; industry: string } }) {
  const i = industryOf(params.industry);
  if (!i) return {};
  return regionalMeta(params.region, `/industries/${i.slug}`, { title: `${i.name} marketing and branding`, description: `${i.line} ${i.blurb}` });
}

export default async function IndustryPage({ params }: { params: { region: RegionCode; industry: string } }) {
  const i = industryOf(params.industry);
  if (!i) notFound();
  const region = params.region;
  const projects = projectsInIndustry(await getProjects(), i);
  if (!projects.length) notFound();
  return (
    <>
      <PageHero title={[i.name, i.line]} lead={i.blurb}
        crumbs={[{ href: `/${region}`, label: "Home" }, { href: `/${region}/industries`, label: "Industries" }, { href: `/${region}/industries/${i.slug}`, label: i.name }]} />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>{`${projects.length} project${projects.length === 1 ? "" : "s"}`}</Eyebrow></div>
          <div className="grid cols-3" style={{ rowGap: 44 }}>
            {projects.map((p, k) => <Reveal key={p.slug} delay={(k % 3) * 0.06}><ProjectCard project={p} region={region} /></Reveal>)}
          </div>
          <p style={{ marginTop: 40 }}><Link className="link-arrow" href={`/${region}/industries`}>← All industries</Link></p>
        </div>
      </section>
      <CtaBand region={region} title="Shall we add your brand?" cta="Start a project" />
    </>
  );
}
