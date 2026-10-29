import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getPillar, getPrices, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/quote", { title: "Get a quote" });
}

export default async function Quote({ params, searchParams }: { params: { region: RegionCode }; searchParams: { service?: string; item?: string } }) {
  const [prices, services] = await Promise.all([getPrices(), getServices()]);
  const item = searchParams.item ? prices.find((p) => p.item === searchParams.item) : undefined;
  const pillar = searchParams.service ? await getPillar(searchParams.service) : undefined;
  const pre = item?.label || pillar?.title;
  return (
    <>
      <PageHero title={["Get a quote"]} lead="A few details about your project, and we'll reply with a proposal and a price for your region within one working day." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <ContactForm
            region={params.region}
            form="quote"
            title={pre ? `Quote for ${pre}` : "Tell us about your project"}
            defaultService={pre}
            services={[...(pre ? [{ value: "pre", label: pre }] : []), ...services.map((s) => ({ value: s.slug, label: s.title }))]}
          />
        </div>
      </section>
    </>
  );
}
