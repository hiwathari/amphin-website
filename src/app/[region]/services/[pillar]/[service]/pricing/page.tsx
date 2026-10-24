import { notFound } from "next/navigation";
import PricingPage from "@/components/PricingPage";
import { getPillar, getPrices, getService, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export function generateStaticParams() {
  return REGION_CODES.flatMap((region) => getServices().map((s) => ({ region, pillar: s.pillar, service: s.slug })));
}
export function generateMetadata({ params }: { params: { region: string; pillar: string; service: string } }) {
  const s = getService(params.pillar, params.service);
  return regionalMeta(params.region, `/services/${params.pillar}/${params.service}/pricing`, { title: `${s?.title} pricing` });
}

export default function ServicePricing({ params }: { params: { region: RegionCode; pillar: string; service: string } }) {
  const p = getPillar(params.pillar);
  const s = getService(params.pillar, params.service);
  if (!p || !s) notFound();
  const r = params.region;
  const own = getPrices({ service: s.slug });
  return (
    <PricingPage
      region={r}
      title={`${s.title} pricing`}
      path={`/services/${p.slug}/${s.slug}/pricing`}
      rows={own}
      services={getServices(p.slug)}
      crumbs={[
        { href: `/${r}/services`, label: "services" }, { href: `/${r}/services/${p.slug}`, label: p.slug },
        { href: `/${r}/services/${p.slug}/${s.slug}`, label: s.slug }, { href: `/${r}/services/${p.slug}/${s.slug}/pricing`, label: "pricing" },
      ]}
    />
  );
}
