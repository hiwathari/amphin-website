import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export async function generateStaticParams() {
  const { legal } = await getContent();
  return REGION_CODES.flatMap((region) => legal.map((l) => ({ region, slug: l.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; slug: string } }) {
  const l = (await getContent()).legal.find((x) => x.slug === params.slug);
  return regionalMeta(params.region, `/legal/${params.slug}`, { title: l?.title, description: l?.summary });
}

export default async function LegalPage({ params }: { params: { region: RegionCode; slug: string } }) {
  const l = (await getContent()).legal.find((x) => x.slug === params.slug);
  if (!l) notFound();
  return (
    <>
      <PageHero title={[l.title]} lead={l.summary} crumbs={[{ href: `/${params.region}/legal`, label: "legal" }, { href: `/${params.region}/legal/${l.slug}`, label: l.slug }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <article className="prose">
            <p className="mono muted" style={{ fontSize: 13 }}>Version {l.version} · last updated {l.updated}</p>
            {/draft/.test(l.version) && (
              <p className="form-status">This page is a draft pending legal review and may change before it takes effect.</p>
            )}
            {l.sections.map(([h, ps]) => (
              <div key={h}>
                <h2>{h}</h2>
                {ps.length > 1 ? <ul>{ps.map((p) => <li key={p}>{p}</li>)}</ul> : <p>{ps[0]}</p>}
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
