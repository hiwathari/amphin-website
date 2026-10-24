import { notFound } from "next/navigation";
import PricingPage from "@/components/PricingPage";
import { getPillar, getPrices, getService, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export async function generateStaticParams() {
  const services = await getServices();
  return REGION_CODES.flatMap((region) => services.map((s) => ({ region, pillar: s.pillar, service: s.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; pillar: string; service: string } }) {
  const s = await getService(params.pillar, params.service);
  return regionalMeta(params.region, `/services/${params.pillar}/${params.service}/pricing`, { title: `${s?.title} pricing` });
}

export default async function ServicePricing({ params }: { params: { region: RegionCode; pillar: string; service: string } }) {
  const [p, s] = await Promise.all([getPillar(params.pillar), getService(params.pillar, params.service)]);
  if (!p || !s) notFound();
  const r = params.region;
  const own = await getPrices({ service: s.slug });
  return (
    <PricingPage
      region={r}
      title={`${s.title} pricing`}
      path={`/services/${p.slug}/${s.slug}/pricing`}
      rows={own}
      services={await getServices(p.slug)}
      crumbs={[
        { href: `/${r}/services`, label: "services" }, { href: `/${r}/services/${p.slug}`, label: p.slug },
        { href: `/${r}/services/${p.slug}/${s.slug}`, label: s.slug }, { href: `/${r}/services/${p.slug}/${s.slug}/pricing`, label: "pricing" },
      ]}
    />
  );
}
