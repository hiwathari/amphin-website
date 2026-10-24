import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import { Footer, TopBar } from "@/components/Chrome";
import { BackToTop } from "@/components/Motion";
import { CursorGlow, ScrollProgress, SmoothScroll } from "@/components/Effects";
import { getContent, getPillars } from "@/lib/content";
import { REGION_CODES, isRegion } from "@/lib/regions";
import { COMPANY, EMAILS, SITE_URL, salesPhone } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return REGION_CODES.map((region) => ({ region }));
}

export default async function RegionLayout({ children, params }: { children: React.ReactNode; params: { region: string } }) {
  if (!isRegion(params.region)) notFound();
  const region = params.region;
  const [c, pillars] = await Promise.all([getContent(), getPillars()]);
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.brand,
    legalName: COMPANY.ukEntity,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/amphin-logo.png`,
    email: EMAILS.hello,
    slogan: "Empowering Brands, Redefining Possibilities",
    sameAs: c.socials.map((s) => s.url),
    department: c.offices.map((o) => ({
      "@type": "LocalBusiness", name: o.name, telephone: o.phone,
      address: { "@type": "PostalAddress", streetAddress: o.address.slice(0, -1).join(", "), addressCountry: o.country },
    })),
  };
  return (
    <>
      <Preloader />
      <a href="#main" className="skip">Skip to content</a>
      <SmoothScroll />
      <ScrollProgress />
      <CursorGlow />
      <div className="frame-glow" />
      <div className="frame">
        <TopBar region={region} socials={c.socials} />
        <Header region={region} phone={salesPhone(region)} pillars={pillars.map((p) => ({ slug: p.slug, title: p.title }))} />
        <main id="main">{children}</main>
        <Footer region={region} offices={c.offices} socials={c.socials} />
      </div>
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
