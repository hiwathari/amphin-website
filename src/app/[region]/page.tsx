import Link from "next/link";
import { Eyebrow, LogoMarquee, PriceRows, ProjectCard, ServiceIndex, TeamGrid } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { HeroLight, Parallax } from "@/components/Effects";
import Icon, { Arrow } from "@/components/Icon";
import LiquidArt from "@/components/LiquidArt";
import { Counter, Reveal, RevealLines, ScrollText } from "@/components/Motion";
import HeroSlides from "@/components/HeroSlides";
import Testimonials from "@/components/Testimonials";
import { getContent, getPillars, getPosts, getPrices, getProjects } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/", { title: { absolute: "Amphin | Growth Marketing & Creative Agency" } });
}

export default async function Home({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const base = `/${region}`;
  const [c, pillars, projects, posts, pricing] = await Promise.all([
    getContent(), getPillars(), getProjects(), getPosts(), getPrices({ pillar: "seo-performance" }),
  ]);
  const featured = projects.slice(0, 6); // favourites (★ in AMOS) come first
  const team = c.team.slice(0, 4);

  return (
    <>
      <section className="hero">
        <LiquidArt seed="amphin-home-hero" className="liquid-hero" intensity={1.4} />
        <div className="streaks-anim" />
        <HeroLight />
        <Parallax className="hero-orb" speed={-0.18}><span /></Parallax>
        <HeroSlides
          tagline="Empowering Brands, Redefining Possibilities"
          slides={[
            { lines: ["Trusted agency with", "proven brand experience."], grad: 1, text: "Our team blends creativity with advanced strategies to drive impactful results, whether in branding, digital transformation or user experience design." },
            { lines: ["Turning ideas", "into results"], grad: 1, text: "Amphin is a creative growth agency in London, Kochi and Abu Dhabi. We build brands, websites and campaigns that people remember and that bring in customers." },
          ]}
          actions={
            <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
              <Link href={`${base}/quote`} className="btn-pill magnetic">Start a project</Link>
              <Link href={`${base}/work`} className="link-arrow">See our work <Arrow /></Link>
            </div>
          }
        />
      </section>

      <LogoMarquee clients={c.clients} />

      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "end" }}>
          <Reveal className="mission">
            <div className="eyebrow" style={{ marginBottom: 14 }}>mission</div>
            <p className="mission-text">where creativity<br />meets strategy<br />to elevate<br />your brand</p>
            <div className="mono" style={{ fontSize: "clamp(40px,5vw,64px)", marginTop: 18, letterSpacing: "-0.04em" }}>est.2023</div>
          </Reveal>
          <div>
            <RevealLines lines={["London's growth marketing", "and creative agency"]} grad={1} />
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 40, marginTop: 30, flexWrap: "wrap" }}>
                <div><Counter to={projects.length} suffix="+" className="stat-num" /><div className="stat-label">Case studies</div></div>
                <div><Counter to={c.clients.length} suffix="+" className="stat-num" /><div className="stat-label">Brands on our wall</div></div>
                <div><Counter to={c.offices.length} className="stat-num" /><div className="stat-label">Offices</div></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ScrollText text="where creativity meets strategy" />

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>services</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["Experienced, trusted services", "built around your growth"]} />
            <Link href={`${base}/services`} className="link-arrow">All services <Arrow /></Link>
          </div>
          <Reveal><ServiceIndex pillars={pillars} region={region} /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Link href={`${base}/make-me-a-celebrity`} className="celeb-spot">
            <div className="celeb-copy">
              <span className="celeb-badge">★ Signature service</span>
              <h2>Make me a <span className="grad-text">celebrity</span></h2>
              <p>Personal branding, media relations, social growth and stage time, run as one programme that turns you into the name people recognise in your field.</p>
              <span className="link-arrow">Explore the programme <Arrow /></span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/social/trend-boss.webp" alt="Make Me a Celebrity, Amphin's personal branding programme" loading="lazy" />
          </Link>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track marquee-words">
          {[0, 1].map((k) => <span key={k}>where <em>creativity</em> meets strategy · brands that stick · growth that thrills · </span>)}
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>work</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["Brands, websites and campaigns", "we've crafted"]} />
            <Link href={`${base}/work`} className="link-arrow">See all work <Arrow /></Link>
          </div>
          <div className="grid cols-3" style={{ rowGap: 44 }}>
            {featured.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.08}><ProjectCard project={p} region={region} /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>pricing</Eyebrow></div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
            <Parallax speed={-0.08}><LiquidArt seed="pricing-side" style={{ aspectRatio: "4 / 3", borderRadius: 18 }} /></Parallax>
            <RevealLines lines={["Clear starting prices,", "tailored to your market"]} />
          </div>
          <div style={{ marginTop: 40 }}><PriceRows rows={pricing} region={region} /></div>
          <div style={{ marginTop: 26 }}><Link href={`${base}/pricing`} className="link-arrow">All pricing <Arrow /></Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="quote-band">
            <LiquidArt seed="amphin-testimonials" className="art" intensity={1.2} />
            <Testimonials items={c.testimonials} title={["What our", "clients say", "about Amphin"]} stat={{ value: c.clients.length, suffix: "+", label: "happy clients" }} />
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
              <Reveal key={t} delay={n * 0.08}><div className="feature"><h4>{t}</h4><p>{d}</p><Icon name={i} className="svc-icon" /></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>team</Eyebrow></div>
            <div className="section-head">
              <RevealLines lines={["Get to know our", "creative team"]} />
              <Link href={`${base}/about/team`} className="link-arrow">Meet everyone <Arrow /></Link>
            </div>
            <TeamGrid team={team} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>insights</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={["The latest insights", "from our team"]} />
            <Link href={`${base}/blog`} className="link-arrow">All articles <Arrow /></Link>
          </div>
          <div className="table-rows">
            {posts.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`${base}/blog/${p.slug}`}>
                <span className="mono muted">{p.date.slice(0, 10)}</span>
                <span style={{ fontSize: 17 }}>{p.title}</span>
                <span className="muted">{p.categories.filter((x) => x !== "Blog").slice(0, 2).join(" · ")}</span>
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
