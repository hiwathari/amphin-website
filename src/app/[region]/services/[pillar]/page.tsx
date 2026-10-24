import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PriceRows, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import Icon, { Arrow } from "@/components/Icon";
import { Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getPillar, getPillars, getPrices, getServices, projectsForService } from "@/lib/content";
import { cityForRegion, pillarPhrase } from "@/lib/landing";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export async function generateStaticParams() {
  const pillars = await getPillars();
  return REGION_CODES.flatMap((region) => pillars.map((p) => ({ region, pillar: p.slug })));
}

export async function generateMetadata({ params }: { params: { region: string; pillar: string } }) {
  const p = await getPillar(params.pillar);
  return regionalMeta(params.region, `/services/${params.pillar}`, { title: p?.title, description: p?.pitch });
}

const STEPS = [
  ["Discover", "A short call and audit to understand your goals, audience and competitors."],
  ["Plan", "A clear proposal with scope, timeline and the starting price for your region."],
  ["Create", "Our in-house team designs, writes, shoots and builds, with reviews at each stage."],
  ["Grow", "Launch, measure and improve, with a monthly report you can actually read."],
];

export default async function PillarPage({ params }: { params: { region: RegionCode; pillar: string } }) {
  const pillar = await getPillar(params.pillar);
  if (!pillar) notFound();
  const region = params.region;
  const base = `/${region}/services/${pillar.slug}`;
  const services = await getServices(pillar.slug);
  const work = (await projectsForService(services.map((s) => s.slug))).slice(0, 3);
  const prices = await getPrices({ pillar: pillar.slug });
  const city = cityForRegion(region);
  const phrase = pillarPhrase(pillar);

  return (
    <>
      <PageHero
        title={[pillar.title]}
        lead={pillar.pitch}
        crumbs={[{ href: `/${region}/services`, label: "services" }, { href: base, label: pillar.slug }]}
      />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>what&apos;s included</Eyebrow></div>
          <div className="grid cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`${base}/${s.slug}`} className="row-card" style={{ height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="mono muted" style={{ fontSize: 12 }}>/ {String(i + 1).padStart(2, "0")}</span>
                    <Icon name={pillar.icon} size={22} className="muted" />
                  </div>
                  <h3 style={{ fontSize: 20 }}>{s.title}</h3>
                  <p className="muted" style={{ fontSize: 14, margin: 0 }}>{s.intro.slice(0, 160)}{s.intro.length > 160 ? "…" : ""}</p>
                  <span className="link-arrow">Read more <Arrow /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {city && (
        <section className="wrap">
          <Link href={`/${region}/${phrase.slug}-${city.slug}`} className="local-strip">
            <span className="mono muted">/ {city.name.toLowerCase()}</span>
            <span>Looking for a {phrase.phrase.toLowerCase()} in {city.name}? Meet our local team <Arrow /></span>
          </Link>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>process</Eyebrow></div>
          <RevealLines lines={["How we work"]} />
          <div className="grid cols-4" style={{ marginTop: 40 }}>
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="feature"><span className="stat-num" style={{ fontSize: 48 }}>0{i + 1}</span><h4>{t}</h4><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>pricing</Eyebrow></div>
          <div className="section-head">
            <RevealLines lines={[`${pillar.title} pricing`]} />
            <Link href={`${base}/pricing`} className="link-arrow">Full pricing <Arrow /></Link>
          </div>
          {prices.some((p) => p.features.length) ? (
            <PriceRows rows={prices} region={region} />
          ) : (
            <div className="row-card">
              <p style={{ margin: 0 }}>Every {pillar.title.toLowerCase()} project is scoped to your brief. Tell us what you need and we&apos;ll send a price for your region within one working day.</p>
              <Link href={`/${region}/quote?service=${pillar.slug}`} className="link-arrow">Contact for pricing <Arrow /></Link>
            </div>
          )}
        </div>
      </section>

      {work.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>related work</Eyebrow></div>
            <div className="grid cols-3" style={{ rowGap: 40 }}>
              {work.map((p) => <ProjectCard key={p.slug} project={p} region={region} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>start a project</Eyebrow></div>
            <RevealLines lines={["Tell us about", "your project"]} />
          </div>
          <ContactForm region={region} form="quote" defaultService={services[0]?.title} services={services.map((s) => ({ value: s.slug, label: s.title }))} />
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
