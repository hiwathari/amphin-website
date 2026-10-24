import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PriceRows, ProjectCard } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { Reveal } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getPillar, getPrices, getService, getServices, projectsForService } from "@/lib/content";
import { cityForRegion } from "@/lib/landing";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export async function generateStaticParams() {
  const services = await getServices();
  return REGION_CODES.flatMap((region) => services.map((s) => ({ region, pillar: s.pillar, service: s.slug })));
}

export async function generateMetadata({ params }: { params: { region: string; pillar: string; service: string } }) {
  const s = await getService(params.pillar, params.service);
  return regionalMeta(params.region, `/services/${params.pillar}/${params.service}`, {
    title: s?.seo?.title || s?.title,
    description: s?.seo?.description || s?.intro.slice(0, 160),
  });
}

export default async function ServicePage({ params }: { params: { region: RegionCode; pillar: string; service: string } }) {
  const [pillar, service] = await Promise.all([getPillar(params.pillar), getService(params.pillar, params.service)]);
  if (!pillar || !service) notFound();
  const region = params.region;
  const base = `/${region}/services/${pillar.slug}`;
  const all = await getServices(pillar.slug);
  const siblings = all.filter((s) => s.slug !== service.slug);
  const work = (await projectsForService([service.slug])).slice(0, 3);
  const prices = await getPrices({ service: service.slug });
  const city = cityForRegion(region);

  return (
    <>
      <PageHero
        title={[service.title]}
        lead={service.intro}
        crumbs={[{ href: `/${region}/services`, label: "services" }, { href: base, label: pillar.slug }, { href: `${base}/${service.slug}`, label: service.slug }]}
      />
      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          <Reveal className="prose">
            {service.body.filter((l) => l !== service.intro).map((l, i) =>
              /^#{2,4}\s/.test(l) ? <h2 key={i}>{l.replace(/^#+\s/, "")}</h2> : /^- /.test(l) ? <p key={i}>• {l.slice(2)}</p> : <p key={i}>{l}</p>,
            )}
          </Reveal>
          <aside style={{ display: "grid", gap: 22, alignContent: "start", position: "sticky", top: 110 }}>
            <div className="row-card">
              <h3 style={{ fontSize: 20 }}>Pricing</h3>
              <p className="muted" style={{ fontSize: 14, margin: 0 }}>See starting prices for {service.title} in your currency, or ask for a quote.</p>
              <Link href={`${base}/${service.slug}/pricing`} className="link-arrow">View pricing <Arrow /></Link>
            </div>
            {city && service.slug !== "make-me-a-celebrity" && (
              <div className="row-card">
                <h3 style={{ fontSize: 20 }}>{service.title} in {city.name}</h3>
                <p className="muted" style={{ fontSize: 14, margin: 0 }}>Local team, office and prices for {city.name} and {city.area}.</p>
                <Link href={`/${region}/${service.slug}-${city.slug}`} className="link-arrow">See {city.name} page <Arrow /></Link>
              </div>
            )}
            <div className="row-card">
              <h3 style={{ fontSize: 20 }}>More in {pillar.title}</h3>
              <div className="chips">{siblings.map((s) => <Link key={s.slug} className="chip" href={`${base}/${s.slug}`}>{s.title}</Link>)}</div>
            </div>
          </aside>
        </div>
      </section>

      {prices.length > 0 && (
        <section className="section">
          <div className="wrap"><div className="rule"><Eyebrow>pricing</Eyebrow></div><PriceRows rows={prices} region={region} /></div>
        </section>
      )}

      {work.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>projects using this service</Eyebrow></div>
            <div className="grid cols-3" style={{ rowGap: 40 }}>{work.map((p) => <ProjectCard key={p.slug} project={p} region={region} />)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <ContactForm region={region} form="quote" title={`Get a quote for ${service.title}`} defaultService={service.title} services={all.map((s) => ({ value: s.slug, label: s.title }))} />
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
