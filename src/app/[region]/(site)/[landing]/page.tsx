import { readdirSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PriceRows, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { Reveal, RevealLines } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getContent, getPrices, projectsForService } from "@/lib/content";
import { buildLandings, coverFor, type Landing } from "@/lib/landing";
import { shareCard } from "@/lib/meta";
import { REGIONS, formatPrice, type RegionCode } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

async function landings() {
  const c = await getContent();
  return buildLandings(c.pillars, c.services);
}

const COVERS = (() => {
  try {
    return new Set(readdirSync(join(process.cwd(), "public/media/services")).map((f) => f.replace(/\.webp$/, "")));
  } catch {
    return new Set<string>();
  }
})();

export async function generateStaticParams() {
  return (await landings()).map((l) => ({ region: l.city.region, landing: l.slug }));
}

async function find(region: string, slug: string): Promise<Landing | undefined> {
  return (await landings()).find((l) => l.slug === slug && l.city.region === region);
}

function title(l: Landing) {
  return `${l.phrase} in ${l.city.name}`;
}

function description(l: Landing) {
  const what = l.kind === "service" ? l.service.title : l.noun;
  return `Amphin is a ${l.noun} team with an office in ${l.city.name}. ${what.charAt(0).toUpperCase() + what.slice(1)} for businesses across ${l.city.area}, with clear starting prices, in-house creatives and reporting tied to results.`.slice(0, 300);
}

export async function generateMetadata({ params }: { params: { region: string; landing: string } }) {
  const l = await find(params.region, params.landing);
  if (!l) return {};
  const url = `/${l.city.region}/${l.slug}`;
  const c = await getContent();
  const cover = coverFor(l, COVERS, c.services.filter((s) => s.pillar === l.pillar.slug).map((s) => s.slug));
  const t = title(l);
  return {
    title: t,
    description: description(l),
    keywords: [`${l.noun} ${l.city.name}`, `${l.noun} agency ${l.city.name}`, `best ${l.noun} company in ${l.city.name}`, `${l.noun} ${l.city.area}`, ...l.city.nearby.map((n) => `${l.noun} ${n}`)],
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Amphin", url, title: t, description: description(l), images: [{ url: shareCard(url), width: 1200, height: 630, alt: t }, ...(cover ? [{ url: cover, alt: t }] : [])] },
    twitter: { card: "summary_large_image", title: t, description: description(l), images: [shareCard(url)] },
  };
}

export default async function LandingPage({ params }: { params: { region: RegionCode; landing: string } }) {
  const l = await find(params.region, params.landing);
  if (!l) notFound();
  const c = await getContent();
  const region = l.city.region;
  const base = `/${region}`;
  const office = c.offices.find((o) => o.slug === l.city.office) ?? c.offices[0];
  const pillarServices = c.services.filter((s) => s.pillar === l.pillar.slug);
  const work = (await projectsForService(l.kind === "service" ? [l.service.slug] : pillarServices.map((s) => s.slug))).slice(0, 3);
  const prices = (await getPrices(l.kind === "service" ? { service: l.service.slug } : { pillar: l.pillar.slug })).slice(0, 4);
  const from = prices.map((p) => p.prices[region]).filter((n): n is number => typeof n === "number").sort((a, b) => a - b)[0];
  const cover = coverFor(l, COVERS, pillarServices.map((s) => s.slug));
  const all = await landings();
  const here = all.filter((x) => x.city.slug === l.city.slug);
  const siblings = l.kind === "pillar"
    ? here.filter((x) => x.kind === "service" && x.pillar.slug === l.pillar.slug)
    : here.filter((x) => x.kind === "service" && x.pillar.slug === l.pillar.slug && x.slug !== l.slug);
  const otherAreas = here.filter((x) => x.kind === "pillar" && x.pillar.slug !== l.pillar.slug);
  const elsewhere = all.filter((x) => x.city.slug !== l.city.slug && x.kind === l.kind &&
    (l.kind === "service" ? x.kind === "service" && x.service.slug === l.service.slug : x.pillar.slug === l.pillar.slug));
  const pillarLanding = here.find((x) => x.kind === "pillar" && x.pillar.slug === l.pillar.slug);
  const servicePath = l.kind === "service" ? `${base}/services/${l.pillar.slug}/${l.service.slug}` : `${base}/services/${l.pillar.slug}`;
  const what = l.kind === "service" ? l.service.title : l.noun;
  const intro = l.kind === "service" ? l.service.intro : l.pillar.pitch;
  const points = l.kind === "service" ? l.service.body.filter((b) => /^#{2,4}\s/.test(b)).map((b) => b.replace(/^#+\s/, "")).slice(0, 6) : [];

  const faq: [string, string][] = [
    [`How much does ${what} cost in ${l.city.name}?`, from
      ? `${l.kind === "service" ? l.service.title : l.pillar.title} with Amphin in ${l.city.name} starts from ${formatPrice(from, REGIONS[region])}. The final price depends on scope; you get a fixed quote after a short call.`
      : `Pricing depends on scope. Tell us what you need and our ${l.city.name} team will send a fixed quote, usually within one working day.`],
    [`Do you have an office in ${l.city.name}?`, `Yes. Our ${l.city.name} team works from ${office.address.join(", ")}${office.phone ? ` and you can call us on ${office.phone}` : ""}.`],
    [`Do you work with businesses outside ${l.city.name}?`, `Yes. We work with clients across ${l.city.area}${l.city.nearby.length ? `, including ${l.city.nearby.slice(0, 3).join(", ")}` : ""}, and remotely with businesses in the UK, Europe, India, the UAE and North America.`],
    [`Why choose Amphin for ${what}?`, `One in-house team handles strategy, design, content and development, so your ${l.noun} is planned, made and measured in one place, with reporting tied to enquiries and sales.`],
  ];

  const crumbs = [{ href: base, label: "Home" }, { href: `${base}/locations`, label: "Locations" }];
  if (l.kind === "service" && pillarLanding) crumbs.push({ href: `${base}/${pillarLanding.slug}`, label: `${pillarLanding.phrase} in ${l.city.name}` });
  crumbs.push({ href: `${base}/${l.slug}`, label: title(l) });
  const url = `${SITE_URL}${base}/${l.slug}`;
  const schema = [
    {
      "@context": "https://schema.org", "@type": "ProfessionalService", name: `Amphin ${l.city.name}`, url, image: `${SITE_URL}${shareCard(`${base}/${l.slug}`)}`,
      telephone: office.phone, email: office.email, priceRange: from ? `From ${formatPrice(from, REGIONS[region])}` : undefined,
      address: { "@type": "PostalAddress", streetAddress: office.address.slice(0, -1).join(", "), addressLocality: l.city.name, addressCountry: office.country },
      areaServed: [l.city.name, l.city.area, ...l.city.nearby].map((n) => ({ "@type": "Place", name: n })),
      parentOrganization: { "@type": "Organization", name: "Amphin", url: SITE_URL },
    },
    {
      "@context": "https://schema.org", "@type": "Service", name: title(l), serviceType: l.kind === "service" ? l.service.title : l.pillar.title,
      description: description(l), provider: { "@type": "Organization", name: "Amphin", url: SITE_URL }, areaServed: { "@type": "City", name: l.city.name },
      ...(from ? { offers: { "@type": "Offer", priceCurrency: REGIONS[region].currency, price: from, description: "Starting price" } } : {}),
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((cr, i) => ({ "@type": "ListItem", position: i + 1, name: cr.label, item: `${SITE_URL}${cr.href}` })) },
  ];

  return (
    <>
      <PageHero seed={l.slug} title={[l.phrase, `in ${l.city.name}`]} lead={intro} crumbs={crumbs} />

      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <div className="rule"><Eyebrow>{`${l.city.name} · ${l.pillar.title.toLowerCase()}`}</Eyebrow></div>
            <h2>{`${l.kind === "service" ? l.service.title : l.pillar.title} for ${l.city.name} businesses`}</h2>
            <p className="muted" style={{ marginTop: 18 }}>
              Amphin&apos;s {l.city.name} team plans, creates and measures {l.noun} for businesses across {l.city.area}. Everything is made in-house by strategists, designers,
              writers and developers who work together, so your project moves quickly and stays consistent from first idea to launch.
            </p>
            {points.length > 0 && <ul className="landing-points">{points.map((p) => <li key={p}>{p}</li>)}</ul>}
            <div style={{ display: "flex", gap: 22, marginTop: 26, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#quote" className="btn-pill magnetic">Get a quote</a>
              <Link href={servicePath} className="link-arrow">About {l.kind === "service" ? l.service.title : l.pillar.title} <Arrow /></Link>
            </div>
          </div>
          {cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt={`${title(l)}: Amphin`} loading="lazy" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 20 }} />
          )}
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>services</Eyebrow></div>
            <h2 style={{ marginBottom: 28 }}>{l.kind === "pillar" ? `Our ${l.noun} services in ${l.city.name}` : `Related ${l.pillar.title.toLowerCase()} services in ${l.city.name}`}</h2>
            <div className="table-rows">
              {siblings.map((s) => s.kind === "service" && (
                <Link key={s.slug} href={`${base}/${s.slug}`}>
                  <span className="mono muted">{l.city.name.slice(0, 3).toUpperCase()}</span>
                  <span>{s.service.title} in {l.city.name}</span>
                  <span className="muted">{s.service.intro.slice(0, 70)}{s.service.intro.length > 70 ? "…" : ""}</span>
                  <span className="link-arrow" style={{ justifySelf: "end" }}>View <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>why amphin</Eyebrow></div>
          <RevealLines lines={[`Why ${l.city.name} businesses`, "choose Amphin"]} grad={1} />
          <div className="grid cols-4" style={{ marginTop: 40, gap: 28 }}>
            {[
              ["Local team", `Strategy and account management from our ${l.city.name} office, with time-zone friendly support.`],
              ["Everything in-house", "Branding, content, web and growth under one roof, so nothing gets lost between agencies."],
              ["Clear pricing", `Published starting prices in ${REGIONS[region].currency} and a fixed quote before work begins.`],
              ["Measured results", "Monthly reports tied to enquiries, sales and growth, not vanity metrics."],
            ].map(([t, d], i) => <Reveal key={t} delay={i * 0.06}><div className="feature"><h3 style={{ fontSize: 17 }}>{t}</h3><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      {prices.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>pricing</Eyebrow></div>
            <h2 style={{ marginBottom: 28 }}>{`${l.kind === "service" ? l.service.title : l.pillar.title} prices in ${l.city.name}`}</h2>
            <PriceRows rows={prices} region={region} />
          </div>
        </section>
      )}

      {work.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>work</Eyebrow></div>
            <h2 style={{ marginBottom: 28 }}>{`Recent ${l.noun} work`}</h2>
            <div className="grid cols-3" style={{ rowGap: 44 }}>{work.map((p) => <ProjectCard key={p.slug} project={p} region={region} />)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap grid cols-2" style={{ gap: 48 }}>
          <div>
            <div className="rule"><Eyebrow>visit us</Eyebrow></div>
            <h2>{`Our ${l.city.name} office`}</h2>
            <address className="muted" style={{ fontStyle: "normal", marginTop: 18, lineHeight: 1.7 }}>
              {office.name}<br />{office.address.map((a) => <span key={a}>{a}<br /></span>)}
              {office.phone && <a href={`tel:${office.phone.replace(/[^+\d]/g, "")}`} style={{ color: "var(--accent)" }}>{office.phone}</a>}
            </address>
            <p className="muted" style={{ marginTop: 14 }}>Serving {[l.city.name, ...l.city.nearby].join(", ")} and the rest of {l.city.area}.</p>
          </div>
          <div>
            <div className="rule"><Eyebrow>questions</Eyebrow></div>
            <h2 style={{ marginBottom: 20 }}>{`${l.kind === "service" ? l.service.title : l.pillar.title} in ${l.city.name}: FAQs`}</h2>
            <div className="faq">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid cols-2" style={{ gap: 48 }}>
          {otherAreas.length > 0 && (
            <nav aria-label={`More services in ${l.city.name}`}>
              <h2 style={{ fontSize: 22, marginBottom: 14 }}>More services in {l.city.name}</h2>
              <ul className="landing-links">{otherAreas.map((x) => <li key={x.slug}><Link href={`${base}/${x.slug}`}>{x.phrase} in {l.city.name}</Link></li>)}</ul>
            </nav>
          )}
          {elsewhere.length > 0 && (
            <nav aria-label="Other locations">
              <h2 style={{ fontSize: 22, marginBottom: 14 }}>{l.kind === "service" ? l.service.title : l.phrase} in other cities</h2>
              <ul className="landing-links">{elsewhere.map((x) => <li key={x.slug}><Link href={`/${x.city.region}/${x.slug}`}>{x.phrase} in {x.city.name}</Link></li>)}</ul>
            </nav>
          )}
        </div>
      </section>

      <section className="section" id="quote">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>quote</Eyebrow></div>
            <RevealLines lines={["Tell us about", "your project"]} />
            <p className="muted" style={{ marginTop: 22 }}>Our {l.city.name} team replies within one working day with next steps and a fixed quote.</p>
          </div>
          <ContactForm region={region} form="quote" defaultService={l.kind === "service" ? l.service.slug : pillarServices[0]?.slug}
            services={pillarServices.map((s) => ({ value: s.slug, label: s.title }))} />
        </div>
      </section>

      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}

