import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getProject, getProjects, serviceBySlug } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export async function generateStaticParams() {
  const projects = await getProjects();
  return REGION_CODES.flatMap((region) => projects.map((p) => ({ region, slug: p.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; slug: string } }) {
  const p = await getProject(params.slug);
  return regionalMeta(params.region, `/work/${params.slug}`, {
    title: p?.seo?.title || p?.title,
    description: p?.summary,
    openGraph: p?.featuredImage ? { images: [p.featuredImage] } : undefined,
  });
}

export default async function CaseStudy({ params }: { params: { region: RegionCode; slug: string } }) {
  const p = await getProject(params.slug);
  if (!p) notFound();
  const region = params.region;
  const all = await getProjects();
  const next = all[(all.findIndex((x) => x.slug === p.slug) + 1) % all.length];
  const services = (await Promise.all(p.services.map(serviceBySlug))).filter((s): s is NonNullable<typeof s> => !!s);
  const gallery = Array.from(new Set([p.featuredImage, ...p.images].filter((x): x is string => !!x))).slice(0, 24);
  const schema = {
    "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, about: p.summary,
    creator: { "@type": "Organization", name: "Amphin" }, dateCreated: String(p.year), image: p.featuredImage || undefined,
  };

  return (
    <>
      <PageHero title={[p.title]} lead={p.summary} crumbs={[{ href: `/${region}/work`, label: "work" }, { href: `/${region}/work/${p.slug}`, label: p.slug }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="table-rows" style={{ marginBottom: 50 }}>
            <div><span className="mono muted">client</span><span>{p.client}</span><span className="mono muted">year</span><span>{p.year}</span></div>
            <div>
              <span className="mono muted">services</span>
              <span className="chips">
                {services.map((s) => <Link key={s.slug} className="chip" href={`/${region}/services/${s.pillar}/${s.slug}`}>{s.title}</Link>)}
              </span>
              <span className="mono muted">type</span><span>{p.categories.join(", ")}</span>
            </div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
            <Reveal className="prose">
              {p.body.map((l, i) =>
                /^(Project Overview|Our Contribution|The Result|Results?|Outcome|Challenge|Solution)/i.test(l) && l.length < 60
                  ? <h2 key={i}>{l}</h2>
                  : <p key={i}>{l}</p>,
              )}
            </Reveal>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              {gallery.slice(0, 3).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`${p.title} artwork`} loading="lazy" style={{ width: "100%", borderRadius: 14 }} />
              ))}
            </div>
          </div>
          {gallery.length > 3 && (
            <div className="grid cols-2" style={{ marginTop: 40 }}>
              {gallery.slice(3).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={`${p.title} artwork`} loading="lazy" style={{ width: "100%", borderRadius: 14 }} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="rule" style={{ display: "flex", justifyContent: "space-between" }}>
            <Eyebrow>next project</Eyebrow>
            <Link className="link-arrow" href={`/${region}/work`}>All work <Arrow /></Link>
          </div>
          <div className="grid cols-3"><ProjectCard project={next} region={region} /></div>
        </div>
      </section>
      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
