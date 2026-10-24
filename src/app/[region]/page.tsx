import Link from "next/link";
import { Art, Eyebrow, LogoWall, PriceRows, ProjectCard, ServiceCard, TESTIMONIALS } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import Icon, { Arrow } from "@/components/Icon";
import { Counter, Reveal, RevealLines } from "@/components/Motion";
import Testimonials from "@/components/Testimonials";
import { getPillars, getPosts, getPrices, getProjects } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/", { title: { absolute: "Amphin | Growth Marketing & Creative Agency" } });
}

export default function Home({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const base = `/${region}`;
  const pillars = getPillars();
  const projects = getProjects();
  const featured = ["koko-bites-branding", "nexgro", "saanvira-fashion-website-design-development", "soundkraft-event-technology-website-design", "chengavi-brand-guidelines", "sasco-global-website-development"]
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const posts = getPosts().slice(0, 3);
  const pricing = getPrices({ pillar: "seo-performance" }).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="streaks" />
        <div className="hero-orb" />
        <div className="wrap hero-inner">
          <RevealLines as="h1" lines={["Turning ideas", "into results"]} />
          <Reveal className="hero-side" delay={0.3}>
            <p>Amphin is a creative growth agency in London, Kochi and Abu Dhabi. We build brands, websites and campaigns that people remember and that bring in customers.</p>
            <Link href={`${base}/services`} className="link-arrow">Explore services <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(40px,6vw,80px)" }}>
        <div className="wrap">
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40, alignItems: "end" }}>
            <Reveal>
              <div className="mono" style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                <span style={{ color: "var(--accent)" }}>where</span> creativity<br />meets <span style={{ color: "var(--accent)" }}>strategy</span><br />to grow your brand
              </div>
              <div className="mono" style={{ fontSize: "clamp(40px,5vw,64px)", marginTop: 18, letterSpacing: "-0.04em" }}>est.{2023}</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontSize: "clamp(28px,3.2vw,44px)" }}>London&apos;s growth marketing and creative agency, with studios in India and the UAE.</h2>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>services</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["Experienced, trusted services", "built around your growth"]} />
            <Link href={`${base}/services`} className="link-arrow">All services <Arrow /></Link>
          </div>
          <div className="grid cols-3">
            {pillars.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}><ServiceCard pillar={p} index={i} region={region} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track marquee-words">
          {[0, 1].map((k) => (
            <span key={k}>where <em>creativity</em> meets strategy · brands that stick · growth that thrills · </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>work</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["Brands, websites and campaigns", "we've crafted"]} />
            <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
              <div><Counter to={projects.length} suffix="+" className="stat-num" /><div className="stat-label">Case studies online</div></div>
            </div>
          </div>
          <div className="grid cols-3" style={{ rowGap: 40 }}>
            {featured.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.08}><ProjectCard project={p} region={region} /></Reveal>)}
          </div>
          <div style={{ marginTop: 40 }}><Link href={`${base}/work`} className="link-arrow">See all work <Arrow /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>pricing</Eyebrow></div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
            <div />
            <RevealLines lines={["Clear starting prices,", "tailored to your market"]} />
          </div>
          <div style={{ marginTop: 40 }}><PriceRows rows={pricing} region={region} /></div>
          <div style={{ marginTop: 26 }}><Link href={`${base}/pricing`} className="link-arrow">All pricing <Arrow /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="quote-band">
            <div className="art hot" />
            <Testimonials items={TESTIMONIALS} title={["What our", "clients say", "about Amphin"]} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>how we work</Eyebrow></div>
          <RevealLines lines={["One team for brand,", "content and growth"]} />
          <div className="grid cols-4" style={{ marginTop: 48, gap: 28 }}>
            {[
              ["Creative ideas", "Brand thinking and design that make you instantly recognisable.", "spark"],
              ["Content that performs", "Reels, shoots and posts produced in-house, every month.", "play"],
              ["Built to convert", "Websites and apps designed around enquiries and sales.", "grid"],
              ["Measured growth", "SEO, ads and reports tied to leads, not likes.", "chart"],
            ].map(([t, d, i], n) => (
              <Reveal key={t} delay={n * 0.08}>
                <div className="feature"><h4>{t}</h4><p>{d}</p><Icon name={i} className="svc-icon" /></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>clients</Eyebrow></div>
          <div className="section-head right" style={{ gridTemplateColumns: "1fr" }}>
            <RevealLines lines={["Trusted by growing brands", "across three continents"]} />
          </div>
          <LogoWall />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>insights</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["The latest insights", "from our team"]} />
            <Link href={`${base}/blog`} className="link-arrow">All articles <Arrow /></Link>
          </div>
          <div className="table-rows">
            {posts.map((p) => (
              <Link key={p.slug} href={`${base}/blog/${p.slug}`}>
                <span className="mono muted">{p.date.slice(0, 10)}</span>
                <span style={{ fontSize: 17 }}>{p.title}</span>
                <span className="muted" style={{ display: "var(--hide-sm, block)" }}>{p.categories.filter((c) => c !== "Blog").slice(0, 2).join(" · ")}</span>
                <span className="link-arrow" style={{ justifySelf: "end" }}>Read <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand region={region} />
    </>
  );
}
