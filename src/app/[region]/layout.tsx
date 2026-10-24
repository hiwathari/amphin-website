import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { Footer, TopBar } from "@/components/Chrome";
import { BackToTop } from "@/components/Motion";
import { getPillars } from "@/lib/content";
import { REGION_CODES, isRegion } from "@/lib/regions";
import { COMPANY, EMAILS, OFFICES, SITE_URL, SOCIALS, salesPhone } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return REGION_CODES.map((region) => ({ region }));
}

export default function RegionLayout({ children, params }: { children: React.ReactNode; params: { region: string } }) {
  if (!isRegion(params.region)) notFound();
  const region = params.region;
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brand,
    legalName: COMPANY.ukEntity,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/amphin-logo.png`,
    email: EMAILS.hello,
    sameAs: SOCIALS.map((s) => s.url),
    department: OFFICES.filter((o) => !o.comingSoon).map((o) => ({
      "@type": "LocalBusiness",
      name: o.name,
      telephone: o.phone,
      address: { "@type": "PostalAddress", streetAddress: o.address.slice(0, -1).join(", "), addressCountry: o.country },
    })),
  };
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <div className="frame-glow" />
      <div className="frame">
        <TopBar region={region} />
        <Header region={region} phone={salesPhone(region)} pillars={getPillars().map((p) => ({ slug: p.slug, title: p.title }))} />
        <main id="main">{children}</main>
        <Footer region={region} />
      </div>
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
