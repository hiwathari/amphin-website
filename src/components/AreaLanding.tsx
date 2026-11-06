import Link from "next/link";
import { Eyebrow, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { AREA_CONTENT_DATE, buildAreaPages, type AreaPage } from "@/lib/areas";
import { getContent, projectsForService } from "@/lib/content";
import { shareCard } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

export function areaTitle(p: AreaPage) {
  return `${p.topic.phrase} in ${p.area.name}`;
}

export function areaDescription(p: AreaPage) {
  return `${p.topic.phrase} for businesses in ${p.area.full}, delivered online by Amphin. ${p.topic.deliverables.slice(0, 3).join(", ")} and clear reporting. Get a fixed quote.`.slice(0, 300);
}

export function areaMetadata(p: AreaPage) {
  const url = `/${p.area.region}/${p.slug}`;
  const t = areaTitle(p);
  return {
    title: t,
    description: areaDescription(p),
    keywords: [...p.topic.keywords.map((k) => `${k} ${p.area.name}`), ...p.area.places.slice(0, 4).map((pl) => `${p.topic.noun} ${pl}`), `${p.topic.noun} ${p.area.country}`, "Amphin"],
    authors: [{ name: "Abhishek Sajan" }],
    creator: "Abhishek Sajan",
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Amphin", url, title: t, description: areaDescription(p), images: [{ url: shareCard(url), width: 1200, height: 630, alt: t }] },
    twitter: { card: "summary_large_image", title: t, description: areaDescription(p), images: [shareCard(url)] },
  };
}

export default async function AreaLanding({ page: p, region }: { page: AreaPage; region: RegionCode }) {
  const { area, topic } = p;
  const c = await getContent();
  const base = `/${region}`;
  const work = (await projectsForService(topic.services)).slice(0, 3);
  const all = buildAreaPages();
  const sameArea = all.filter((x) => x.area.slug === area.slug && x.slug !== p.slug);
  const sameTopic = all.filter((x) => x.topic.slug === topic.slug && x.area.slug !== area.slug && x.area.region === area.region).slice(0, 5);
  const otherRegions = all.filter((x) => x.topic.slug === topic.slug && x.area.region !== area.region).slice(0, 4);
  const service = c.services.find((s) => s.slug === topic.services[0]);
  const servicePath = service ? `${base}/services/${service.pillar}/${service.slug}` : `${base}/services/${topic.pillar}`;
  const office = area.office ? c.offices.find((o) => o.slug === area.office) : undefined;
  const faq: [string, string][] = [
    ...topic.faq(area),
    [`How do we work together if you are not in ${area.name}?`, `Everything runs online. We work on ${area.tz}, share one project space, hold calls on video, and send written updates every week. ${office ? `Our ${office.city} office is also available for in-person meetings.` : "We can arrange an in-person meeting when a project needs one."}`],
  ];
  const url = `${SITE_URL}${base}/${p.slug}`;
  const crumbs = [{ href: base, label: "Home" }, { href: `${base}/locations`, label: "Locations" }, { href: `${base}/${p.slug}`, label: areaTitle(p) }];
  const schema = [
    {
      "@context": "https://schema.org", "@type": "Service", name: areaTitle(p), serviceType: topic.phrase, url,
      description: areaDescription(p), provider: { "@type": "Organization", name: "Amphin", url: SITE_URL, founder: { "@type": "Person", name: "Abhishek Sajan" } },
      areaServed: [{ "@type": "Place", name: area.full }, ...area.places.map((n) => ({ "@type": "Place", name: n }))], availableChannel: { "@type": "ServiceChannel", serviceType: "Online" },
    },
    { "@context": "https://schema.org", "@type": "WebPage", name: areaTitle(p), url, dateModified: AREA_CONTENT_DATE, inLanguage: "en", isPartOf: { "@type": "WebSite", name: "Amphin", url: SITE_URL } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((cr, i) => ({ "@type": "ListItem", position: i + 1, name: cr.label, item: `${SITE_URL}${cr.href}` })) },
  ];
  const pillarServices = c.services.filter((s) => topic.services.includes(s.slug));

  return (
    <>
      <PageHero seed={p.slug} title={[topic.phrase, `in ${area.name}`]} lead={topic.lead(area)} crumbs={crumbs} />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="rule"><Eyebrow>{`${topic.noun} · ${area.name.toLowerCase()}`}</Eyebrow></div>
          <h2>{`${topic.phrase} for ${area.full}`}</h2>
          {topic.why(area).map((t) => <p key={t.slice(0, 30)} className="muted" style={{ marginTop: 18 }}>{t}</p>)}
          <div style={{ display: "flex", gap: 22, marginTop: 26, flexWrap: "wrap", alignItems: "center" }}>
            <a href="#quote" className="btn-pill magnetic">Get a quote</a>
            <Link href={servicePath} className="link-arrow">About {service?.title ?? topic.noun} <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="rule"><Eyebrow>{`the ${area.name.toLowerCase()} market`}</Eyebrow></div>
          <h2>{`What ${topic.noun} looks like in ${area.name}`}</h2>
          <p className="muted" style={{ marginTop: 18 }}>{area.market}</p>
          <p className="muted" style={{ marginTop: 14 }}>In practice, {area.challenge}.</p>
          <p className="muted" style={{ marginTop: 14 }}>{area.search}</p>
          <ul className="landing-points" style={{ marginTop: 22 }}>
            {area.sectors.map((s) => <li key={s.name}><strong>{s.name}</strong> {s.hook}. {topic.tactic(s, area)}</li>)}
          </ul>
          <p className="muted" style={{ marginTop: 18 }}>Areas we regularly work with include {area.places.join(", ")} and the wider {area.country === "India" ? "region" : area.country}.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <div>
            <div className="rule"><Eyebrow>what you get</Eyebrow></div>
            <h2 style={{ marginBottom: 18 }}>{`${topic.phrase.replace(/ (Agency|Company|Studio)$/, "")} deliverables`}</h2>
            <ul className="landing-points">{topic.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div>
            <div className="rule"><Eyebrow>how it works</Eyebrow></div>
            <h2 style={{ marginBottom: 18 }}>Our process, step by step</h2>
            <ol style={{ paddingLeft: 20, display: "grid", gap: 12 }}>
              {topic.steps.map(([t, d]) => <li key={t}><strong>{t}.</strong> <span className="muted">{d}</span></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="rule"><Eyebrow>working online</Eyebrow></div>
          <h2>{`How we work with clients in ${area.name}`}</h2>
          <p className="muted" style={{ marginTop: 18 }}>
            Amphin delivers this service online. {office
              ? `Our team works from ${office.address.join(", ")}, and you can also reach us by phone, video or message.`
              : `We do not run a local office in ${area.name}; instead, you get a dedicated project lead, a shared project space and written weekly updates, so work is visible without anyone travelling.`}{" "}
            Our working hours are arranged around {area.tz}, and communication is in {area.lang}. Quotes are fixed before work starts, and you can pay in the currency that suits you.
          </p>
        </div>
      </section>

      {work.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>work</Eyebrow></div>
            <h2 style={{ marginBottom: 28 }}>Recent related work</h2>
            <div className="grid cols-3" style={{ rowGap: 44 }}>{work.map((w) => <ProjectCard key={w.slug} project={w} region={region} />)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="rule"><Eyebrow>questions</Eyebrow></div>
          <h2 style={{ marginBottom: 20 }}>{`${topic.phrase} in ${area.name}: FAQs`}</h2>
          <div className="faq">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid cols-2" style={{ gap: 48 }}>
          <nav aria-label={`More services in ${area.name}`}>
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>More services in {area.name}</h2>
            <ul className="landing-links">{sameArea.map((x) => <li key={x.slug}><Link href={`/${x.area.region}/${x.slug}`}>{x.topic.phrase} in {x.area.name}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Other areas">
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>{topic.phrase} elsewhere</h2>
            <ul className="landing-links">{[...sameTopic, ...otherRegions].map((x) => <li key={x.slug}><Link href={`/${x.area.region}/${x.slug}`}>{topic.phrase} in {x.area.name}</Link></li>)}</ul>
          </nav>
        </div>
      </section>

      <section className="section" id="quote">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>quote</Eyebrow></div>
            <RevealLines lines={["Tell us about", "your project"]} />
            <p className="muted" style={{ marginTop: 22 }}>We reply within one working day with next steps and a fixed quote for your {area.name} project.</p>
          </div>
          <ContactForm region={region} form="quote" defaultService={pillarServices[0]?.slug} services={pillarServices.map((s) => ({ value: s.slug, label: s.title }))} />
        </div>
      </section>

      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
