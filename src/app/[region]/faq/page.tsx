import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import LiquidArt from "@/components/LiquidArt";
import PageHero from "@/components/PageHero";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { EMAILS } from "@/lib/site";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/faq", { title: "FAQ", description: "Answers to common questions about working with Amphin." });
}

const FAQ: [string, string][] = [
  ["What does Amphin do?", "We are a creative growth agency: branding, social media, content and video production, websites and apps, SEO and paid media, PR and influencer marketing, plus the IT systems behind them."],
  ["Where are you based?", "Our head office is in London, with studios in Kochi (India) and Abu Dhabi (UAE). We work with clients across the UK, Europe, India, the Middle East and North America."],
  ["How much does a project cost?", "Each service has its own pricing page showing starting prices in your currency. Where no price is listed, we quote after a short call because scope varies widely."],
  ["How long does a branding or website project take?", "A brand identity usually takes 3 to 6 weeks; a marketing website 4 to 8 weeks; e-commerce and apps longer. You get a timeline with the proposal."],
  ["Do you work with small businesses?", "Yes. Much of our work is with restaurants, cafés, retailers, gyms and service businesses. Packages start small and grow with you."],
  ["Can you manage our social media every month?", "Yes. Monthly packages cover planning, design, reels, posting, community management and a monthly report, with an optional shoot each month."],
  ["Who owns the work?", "Once paid in full, you own the final deliverables we create for you. Third-party fonts, stock and software stay under their own licences."],
  ["How do we get started?", "Send a few details through the quote form or WhatsApp us. We reply within one working day with next steps."],
];

export default function Faq({ params }: { params: { region: RegionCode } }) {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <>
      <PageHero title={["Frequently asked", "questions"]} />
      <section className="section">
        <div className="wrap with-sidebar">
          <div className="faq">
            <div className="rule"><Eyebrow>faq</Eyebrow></div>
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
          <aside className="sidebar">
            <div className="side-cta">
              <LiquidArt seed="faq-cta" className="liq" style={{ position: "absolute", inset: 0 }} />
              <h3 style={{ fontSize: 22 }}>Still have a question?</h3>
              <p style={{ fontSize: 14, margin: "8px 0 14px" }}>Email <a href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a> or send us a message.</p>
              <Link href={`/${params.region}/contact`} className="link-arrow" style={{ color: "#fff" }}>Contact us <Arrow /></Link>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand region={params.region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
