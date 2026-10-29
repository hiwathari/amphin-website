import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { getPost, getPosts, getService } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";
import { opt } from "@/lib/img";
import VideoEmbed from "@/components/VideoEmbed";
import { PHONES, SITE_URL, WHATSAPP } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  return REGION_CODES.flatMap((region) => posts.map((p) => ({ region, slug: p.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; slug: string } }) {
  const p = await getPost(params.slug);
  return regionalMeta(params.region, `/blog/${params.slug}`, {
    title: p?.seo?.title || p?.title, description: p?.seo?.description || p?.excerpt,
    keywords: p?.seo ? [p.seo.focus_keyword, ...(p.seo.keywords ?? [])].filter((k): k is string => !!k) : undefined,
    openGraph: p?.featuredImage ? { type: "article", images: [p.featuredImage] } : undefined,
  });
}

export default async function PostPage({ params }: { params: { region: RegionCode; slug: string } }) {
  const p = await getPost(params.slug);
  if (!p) notFound();
  const region = params.region;
  const more = (await getPosts()).filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c) && c !== "Blog")).slice(0, 3);
  const layout = p.layout ?? "standard";
  const videos = p.videos ?? [];
  const gallery = p.gallery ?? [];
  const [svcPillar, svcSlug] = (p.seo?.service ?? "").split("/");
  const service = svcSlug ? await getService(svcPillar, svcSlug) : undefined;
  const faqs = p.seo?.faqs ?? [];
  const indian = (p.seo?.market ?? "").toLowerCase().startsWith("india") || region === "in";
  const schema = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, datePublished: p.date, description: p.seo?.description || p.excerpt,
    ...(p.seo?.focus_keyword ? { keywords: [p.seo.focus_keyword, ...(p.seo.keywords ?? [])].join(", ") } : {}),
    ...(service ? { about: { "@type": "Service", name: service.title, url: `${SITE_URL}/${region}/services/${service.pillar}/${service.slug}`, provider: { "@type": "Organization", name: "Amphin" } } } : {}),
    image: p.featuredImage || undefined, mainEntityOfPage: `${SITE_URL}/${region}/blog/${p.slug}`,
    author: p.author ? { "@type": "Person", name: p.author, jobTitle: p.authorTitle ?? undefined, worksFor: { "@type": "Organization", name: "Amphin" } } : { "@type": "Organization", name: "Amphin" },
    publisher: { "@type": "Organization", name: "Amphin", logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/amphin-logo.png` } },
    ...(videos.length ? { video: videos.map((v) => ({ "@type": "VideoObject", name: p.title, description: p.excerpt || p.title, contentUrl: v.url, thumbnailUrl: p.featuredImage || undefined, uploadDate: p.date })) } : {}),
  };
  const body = (
    <article className="prose" style={{ margin: "0 auto" }}>
      {p.body.map((l, i) => (/^#{2,4}\s/.test(l) ? <h2 key={i}>{l.replace(/^#+\s/, "")}</h2> : /^- /.test(l) ? <p key={i}>• {l.slice(2)}</p> : <p key={i}>{l}</p>))}
    </article>
  );
  const byline = (
    <p className="post-byline mono">
      {p.author ? <>by <b>{p.author}</b>{p.authorTitle ? ` · ${p.authorTitle}` : ""} · </> : null}{p.date.slice(0, 10)}
      {p.categories.filter((c) => c !== "Blog").slice(0, 2).map((c) => <span key={c}> · {c}</span>)}
    </p>
  );
  const cover = p.featuredImage && layout !== "minimal" && layout !== "feature" ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={opt(p.featuredImage, 1920)} alt={p.title} style={{ width: "100%", maxHeight: 560, objectFit: "cover", borderRadius: 18, marginBottom: 50 }} />
  ) : null;
  return (
    <>
      {layout === "feature" && p.featuredImage ? (
        <section className="post-feature">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={opt(p.featuredImage, 1920)} alt="" />
          <div className="wrap"><h1>{p.title}</h1>{byline}</div>
        </section>
      ) : (
        <PageHero title={[p.title]} crumbs={[{ href: `/${region}/blog`, label: "blog" }, { href: `/${region}/blog/${p.slug}`, label: p.date.slice(0, 10) }]} />
      )}
      <section className="section" style={{ paddingTop: layout === "feature" ? undefined : 0 }}>
        <div className="wrap">
          {layout !== "feature" && <div style={{ maxWidth: 760, margin: "0 auto 26px" }}>{p.seo?.subtitle && <p className="post-subtitle">{p.seo.subtitle}</p>}{byline}</div>}
          {layout === "video" && videos.length > 0 ? (
            <div className="post-videos">{videos.map((v) => <VideoEmbed key={v.url} video={v} title={p.title} />)}</div>
          ) : cover}
          {body}
          {service && (
            <aside className="post-service" aria-label="Related Amphin service">
              <span className="mono muted">/ related service /</span>
              <h3><Link href={`/${region}/services/${service.pillar}/${service.slug}`}>{service.title}</Link></h3>
              <p className="muted">{service.intro ? service.intro.slice(0, 180) + (service.intro.length > 180 ? "…" : "") : `Amphin can help with ${service.title.toLowerCase()}.`}</p>
              <div className="post-service-links">
                <Link className="link-arrow" href={`/${region}/services/${service.pillar}/${service.slug}`}>See the service <Arrow /></Link>
                <a href={`tel:${(indian ? PHONES.salesIndia : PHONES.salesUk).replace(/[^+\d]/g, "")}`}>Sales: {indian ? PHONES.salesIndia : PHONES.salesUk}</a>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">WhatsApp</a>
              </div>
            </aside>
          )}
          {layout !== "video" && videos.length > 0 && <div className="post-videos" style={{ marginTop: 40 }}>{videos.map((v) => <VideoEmbed key={v.url} video={v} title={p.title} />)}</div>}
          {gallery.length > 0 && (
            <div className={`post-gallery${layout === "gallery" ? " big" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {gallery.map((g) => <img key={g.url} src={g.url} alt={g.alt || p.title} loading="lazy" />)}
            </div>
          )}
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
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }) }} />
      )}
    </>
  );
}
