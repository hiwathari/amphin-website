import { notFound } from "next/navigation";
import PricingPage from "@/components/PricingPage";
import { getPillar, getPillars, getPrices, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";

export async function generateStaticParams() {
  const pillars = await getPillars();
  return REGION_CODES.flatMap((region) => pillars.map((p) => ({ region, pillar: p.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; pillar: string } }) {
  const p = await getPillar(params.pillar);
  return regionalMeta(params.region, `/services/${params.pillar}/pricing`, { title: `${p?.title} pricing` });
}

export default async function PillarPricing({ params }: { params: { region: RegionCode; pillar: string } }) {
  const p = await getPillar(params.pillar);
  if (!p) notFound();
  const r = params.region;
  return (
    <PricingPage
      region={r}
      title={`${p.title} pricing`}
      path={`/services/${p.slug}/pricing`}
      rows={await getPrices({ pillar: p.slug })}
      services={await getServices(p.slug)}
      crumbs={[{ href: `/${r}/services`, label: "services" }, { href: `/${r}/services/${p.slug}`, label: p.slug }, { href: `/${r}/services/${p.slug}/pricing`, label: "pricing" }]}
    />
  );
}
