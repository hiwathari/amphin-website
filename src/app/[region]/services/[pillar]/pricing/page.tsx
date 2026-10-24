import { notFound } from "next/navigation";
import PricingPage from "@/components/PricingPage";
import { getPillar, getPillars, getPrices, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export function generateStaticParams() {
  return REGION_CODES.flatMap((region) => getPillars().map((p) => ({ region, pillar: p.slug })));
}
export function generateMetadata({ params }: { params: { region: string; pillar: string } }) {
  const p = getPillar(params.pillar);
  return regionalMeta(params.region, `/services/${params.pillar}/pricing`, { title: `${p?.title} pricing` });
}

export default function PillarPricing({ params }: { params: { region: RegionCode; pillar: string } }) {
  const p = getPillar(params.pillar);
  if (!p) notFound();
  const r = params.region;
  return (
    <PricingPage
      region={r}
      title={`${p.title} pricing`}
      path={`/services/${p.slug}/pricing`}
      rows={getPrices({ pillar: p.slug })}
      services={getServices(p.slug)}
      crumbs={[{ href: `/${r}/services`, label: "services" }, { href: `/${r}/services/${p.slug}`, label: p.slug }, { href: `/${r}/services/${p.slug}/pricing`, label: "pricing" }]}
    />
  );
}
