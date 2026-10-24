import Link from "next/link";
import { Art, Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getPosts } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/blog", { title: "Blog", description: "Marketing, branding, digital and technology insights from the Amphin team." });
}

export default function Blog({ params, searchParams }: { params: { region: RegionCode }; searchParams: { category?: string } }) {
  const region = params.region;
  const all = getPosts();
  const cats = Array.from(new Set(all.flatMap((p) => p.categories))).filter((c) => c !== "Blog").sort();
  const cat = cats.includes(searchParams.category || "") ? searchParams.category : undefined;
  const posts = cat ? all.filter((p) => p.categories.includes(cat)) : all;
  return (
    <>
      <PageHero title={["Insights and updates", "from our agency"]} lead={`${all.length} articles on marketing, branding, digital and technology.`} />
      <section className="section">
        <div className="wrap">
          <div className="rule" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <Eyebrow>blog</Eyebrow>
            <nav className="chips" aria-label="Filter by category">
              <Link className="chip" href={`/${region}/blog`} aria-current={!cat}>All</Link>
              {cats.map((c) => <Link key={c} className="chip" href={`/${region}/blog?category=${encodeURIComponent(c)}`} aria-current={cat === c}>{c}</Link>)}
            </nav>
          </div>
          <div className="grid cols-3" style={{ rowGap: 40 }}>
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <Link href={`/${region}/blog/${p.slug}`} className="project-card">
                  <div className="thumb">
                    {p.featuredImage
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={p.featuredImage} alt="" loading="lazy" />
                      : <Art seed={p.slug} style={{ position: "absolute", inset: 0 }} />}
                  </div>
                  <div className="meta">{p.date.slice(0, 10)} · {p.categories.filter((c) => c !== "Blog")[0] || "Blog"}</div>
                  <h3 style={{ fontSize: 19 }}>{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
