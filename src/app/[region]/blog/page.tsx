import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { RevealMedia } from "@/components/Effects";
import { Arrow } from "@/components/Icon";
import LiquidArt from "@/components/LiquidArt";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import { getPosts, type Post } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/blog", { title: "Blog", description: "Marketing, branding, digital and technology insights from the Amphin team." });
}

const PER_PAGE = 8;

export default async function Blog({ params, searchParams }: { params: { region: RegionCode }; searchParams: { category?: string; tag?: string; q?: string; page?: string } }) {
  const region = params.region;
  const base = `/${region}/blog`;
  const all = await getPosts();
  const cats = Array.from(new Set(all.flatMap((p) => p.categories))).filter((c) => c && c !== "Blog").sort();
  const tags = Array.from(new Set(all.flatMap((p) => p.tags))).filter(Boolean).slice(0, 24);
  const cat = cats.includes(searchParams.category || "") ? searchParams.category : undefined;
  const tag = tags.includes(searchParams.tag || "") ? searchParams.tag : undefined;
  const q = (searchParams.q || "").trim().toLowerCase().slice(0, 80);
  const filtered = all.filter((p) =>
    (!cat || p.categories.includes(cat)) && (!tag || p.tags.includes(tag)) &&
    (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(searchParams.page) || 1));
  const posts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const qs = (n: number) => `${base}?${new URLSearchParams({ ...(cat ? { category: cat } : {}), ...(tag ? { tag } : {}), ...(q ? { q } : {}), page: String(n) })}`;

  return (
    <>
      <PageHero title={["Insights and updates", "from our agency"]} lead={`${all.length} articles on marketing, branding, digital and technology.`} />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>blog posts</Eyebrow></div>
          <div className="with-sidebar">
            <div className="post-list">
              {posts.map((p) => <PostItem key={p.slug} post={p} region={region} />)}
              {posts.length === 0 && <p className="muted">No articles match. <Link href={base} style={{ color: "var(--accent)" }}>Show all</Link></p>}
              {pages > 1 && (
                <nav aria-label="Pages" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <Link key={n} href={qs(n)} className="chip" aria-current={n === page} style={{ minWidth: 40, textAlign: "center" }}>{n}</Link>
                  ))}
                </nav>
              )}
            </div>
            <aside className="sidebar">
              <form className="search" action={base} role="search">
                <input name="q" defaultValue={q} placeholder="Search…" aria-label="Search articles" />
                <button aria-label="Search">⌕</button>
              </form>
              <div>
                <h4>Categories</h4>
                <ul>
                  {cats.map((c) => (
                    <li key={c}><Link href={`${base}?category=${encodeURIComponent(c)}`} style={{ color: c === cat ? "var(--accent)" : undefined }}>{c}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Latest posts</h4>
                <ul style={{ gap: 14 }}>
                  {all.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <Link href={`${base}/${p.slug}`} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 12, alignItems: "center" }}>
                        <span style={{ position: "relative", width: 64, height: 64, borderRadius: 10, overflow: "hidden", display: "block" }}>
                          <LiquidArt seed={p.slug} style={{ position: "absolute", inset: 0 }} animate={false} />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {p.featuredImage && <img src={p.featuredImage} alt="" style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover", color: "transparent" }} />}
                        </span>
                        <span><small className="mono muted">{p.date.slice(0, 10)}</small><br />{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="side-cta">
                <LiquidArt seed="blog-sidebar-cta" className="liq" style={{ position: "absolute", inset: 0 }} />
                <h3 style={{ fontSize: 22 }}>Ready to collab with us?</h3>
                <p style={{ fontSize: 14, margin: "8px 0 14px" }}>Tell us about your brand and we&apos;ll come back with ideas.</p>
                <Link href={`/${region}/contact`} className="link-arrow" style={{ color: "#fff" }}>Contact us <Arrow /></Link>
              </div>
              {tags.length > 0 && (
                <div>
                  <h4>Tags</h4>
                  <div className="chips">{tags.map((t) => <Link key={t} className="chip" href={`${base}?tag=${encodeURIComponent(t)}`} aria-current={t === tag}>{t}</Link>)}</div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}

function PostItem({ post: p, region }: { post: Post; region: RegionCode }) {
  const cats = p.categories.filter((c) => c !== "Blog").slice(0, 2);
  return (
    <Reveal>
      <article className="post-item">
        <Link href={`/${region}/blog/${p.slug}`} aria-label={p.title}>
          <RevealMedia className="cover">
            <LiquidArt seed={p.slug} style={{ position: "absolute", inset: 0 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p.featuredImage && <img src={p.featuredImage} alt="" loading="lazy" />}
            {cats.length > 0 && <span className="cat-tags">{cats.map((c) => <span key={c}>{c}</span>)}</span>}
          </RevealMedia>
        </Link>
        <div className="mono muted" style={{ fontSize: 12 }}>{p.date.slice(0, 10)} / Amphin</div>
        <Link href={`/${region}/blog/${p.slug}`}><h2>{p.title}</h2></Link>
        {p.excerpt && <p className="muted" style={{ margin: 0 }}>{p.excerpt.slice(0, 260)}{p.excerpt.length > 260 ? "…" : ""}</p>}
        <Link href={`/${region}/blog/${p.slug}`} className="link-arrow">Read more <Arrow /></Link>
      </article>
    </Reveal>
  );
}
