import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { getPost, getPosts } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";
import { opt } from "@/lib/img";

export async function generateStaticParams() {
  const posts = await getPosts();
  return REGION_CODES.flatMap((region) => posts.map((p) => ({ region, slug: p.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; slug: string } }) {
  const p = await getPost(params.slug);
  return regionalMeta(params.region, `/blog/${params.slug}`, {
    title: p?.seo?.title || p?.title, description: p?.excerpt,
    openGraph: p?.featuredImage ? { type: "article", images: [p.featuredImage] } : undefined,
  });
}

export default async function PostPage({ params }: { params: { region: RegionCode; slug: string } }) {
  const p = await getPost(params.slug);
  if (!p) notFound();
  const region = params.region;
  const more = (await getPosts()).filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c) && c !== "Blog")).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, datePublished: p.date, image: p.featuredImage || undefined, author: { "@type": "Organization", name: "Amphin" } };
  return (
    <>
      <PageHero title={[p.title]} crumbs={[{ href: `/${region}/blog`, label: "blog" }, { href: `/${region}/blog/${p.slug}`, label: p.date.slice(0, 10) }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {p.featuredImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={opt(p.featuredImage, 1920)} alt={p.title} style={{ width: "100%", maxHeight: 560, objectFit: "cover", borderRadius: 18, marginBottom: 50 }} />
          )}
          <article className="prose" style={{ margin: "0 auto" }}>
            {p.body.map((l, i) => (/^#{2,4}\s/.test(l) ? <h2 key={i}>{l.replace(/^#+\s/, "")}</h2> : /^- /.test(l) ? <p key={i}>• {l.slice(2)}</p> : <p key={i}>{l}</p>))}
          </article>
        </div>
      </section>
      {more.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>keep reading</Eyebrow></div>
            <div className="table-rows">
              {more.map((m) => (
                <Link key={m.slug} href={`/${region}/blog/${m.slug}`}>
                  <span className="mono muted">{m.date.slice(0, 10)}</span><span>{m.title}</span><span /><span className="link-arrow" style={{ justifySelf: "end" }}>Read <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
