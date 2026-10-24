import Link from "next/link";
import { Eyebrow, PriceRows } from "./Blocks";
import { CtaBand } from "./Chrome";
import { Arrow } from "./Icon";
import PageHero from "./PageHero";
import ContactForm from "./forms/ContactForm";
import { REGIONS, REGION_CODES, type RegionCode } from "@/lib/regions";
import type { PriceRow, Service } from "@/lib/content";

const FAQ = [
  ["Why do prices differ by country?", "Costs, ad markets and competition vary by region, so each market has its own starting price rather than a currency conversion."],
  ["Is the starting price the final price?", "It is the lowest price for that package. Your quote depends on scope, number of platforms, shoots and timing, and is confirmed in writing before work starts."],
  ["Can I combine services?", "Yes. Most clients combine branding, content and growth; bundles are quoted together and usually cost less than separate services."],
  ["How do I pay?", "Monthly services are billed in advance each month; projects are billed in stages. Invoices come from Amphin LTD (UK) or Amphin (India) depending on your region."],
];

/** Shared body of every pricing page: the region's table, a region switcher, FAQs and a quote form. */
export default function PricingPage({
  region, title, path, rows, services, crumbs,
}: {
  region: RegionCode; title: string; path: string; rows: PriceRow[]; services: Service[];
  crumbs: { href: string; label: string }[];
}) {
  const r = REGIONS[region];
  const priced = rows.filter((p) => p.features.length);
  const addons = rows.filter((p) => !p.features.length && typeof p.prices[region] === "number");
  return (
    <>
      <PageHero title={[title]} lead={`Starting prices in ${r.currency} for ${r.label}. Every quote is tailored, and an empty price means we quote it for you.`} crumbs={crumbs} />
      <section className="section">
        <div className="wrap">
          <div className="rule" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <Eyebrow>pricing plans</Eyebrow>
            <div className="chips">
              {REGION_CODES.map((c) => (
                <a key={c} className="chip" href={`/${c}${path}`} aria-current={c === region}>{REGIONS[c].label} {REGIONS[c].symbol.trim()}</a>
              ))}
            </div>
          </div>
          {priced.length ? (
            <PriceRows rows={rows} region={region} />
          ) : (
            <div className="row-card">
              <h3 style={{ fontSize: 22 }}>Priced per project</h3>
              <p className="muted" style={{ margin: 0 }}>These services are scoped to your brief. Send us a few details and we&apos;ll reply with a price for {r.label} within one working day.</p>
              <Link href={`/${region}/quote`} className="link-arrow">Contact for pricing <Arrow /></Link>
            </div>
          )}
          {addons.length > 0 && (
            <div className="row-card" style={{ marginTop: 14 }}>
              <h3 style={{ fontSize: 18 }}>Add-ons</h3>
              <div className="chips">
                {addons.map((a) => <span key={a.item} className="chip">{a.label}: {r.symbol}{a.prices[region]} {a.period}</span>)}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="section">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>faq</Eyebrow></div>
            <div style={{ display: "grid" }}>
              {FAQ.map(([q, a]) => (
                <details key={q} style={{ borderBottom: "1px solid var(--line)", padding: "18px 0" }}>
                  <summary style={{ cursor: "pointer", fontSize: 17 }}>{q}</summary>
                  <p className="muted" style={{ marginTop: 10 }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
          <ContactForm region={region} form="pricing" title="Ask for a quote" services={services.map((s) => ({ value: s.slug, label: s.title }))} />
        </div>
      </section>
      <CtaBand region={region} />
    </>
  );
}
