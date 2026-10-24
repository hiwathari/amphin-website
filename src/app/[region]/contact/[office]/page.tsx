import { notFound } from "next/navigation";
import { CtaBand } from "@/components/Chrome";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getContent, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";


export async function generateStaticParams() {
  const { offices } = await getContent();
  return REGION_CODES.flatMap((region) => offices.map((o) => ({ region, office: o.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; office: string } }) {
  const o = (await getContent()).offices.find((x) => x.slug === params.office);
  return regionalMeta(params.region, `/contact/${params.office}`, { title: o?.name });
}

export default async function OfficePage({ params }: { params: { region: RegionCode; office: string } }) {
  const [c, services] = await Promise.all([getContent(), getServices()]);
  const o = c.offices.find((x) => x.slug === params.office);
  if (!o) notFound();
  const region = params.region;
  const schema = {
    "@context": "https://schema.org", "@type": "LocalBusiness", name: o.name, telephone: o.phone, email: o.email,
    address: { "@type": "PostalAddress", streetAddress: o.address.slice(0, -1).join(", "), addressLocality: o.city, addressCountry: o.country },
  };
  return (
    <>
      <PageHero title={[o.name]} lead={o.address.join(", ")} crumbs={[{ href: `/${region}/contact`, label: "contact" }, { href: `/${region}/contact/${o.slug}`, label: o.slug }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <p>{o.address.map((l) => <span key={l}>{l}<br /></span>)}</p>
            {o.phone ? <p><a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`}>{o.phone}</a></p> : <p className="muted">Phone number coming soon.</p>}
            <p><a style={{ color: "var(--accent)" }} href={`mailto:${o.email}`}>{o.email}</a></p>
            <iframe title={`Map: ${o.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`} loading="lazy"
              style={{ width: "100%", height: 360, border: 0, borderRadius: 18, filter: "grayscale(1) invert(.9) contrast(.9)", marginTop: 20 }} />
          </div>
          <ContactForm region={region} services={services.map((s) => ({ value: s.slug, label: s.title }))} title={`Contact ${o.city}`} />
        </div>
      </section>
      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
