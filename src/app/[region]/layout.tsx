import { notFound } from "next/navigation";
import SiteSettingsStyle, { analyticsIds } from "@/components/SiteSettings";
import Consent from "@/components/Consent";
import Tracker from "@/components/Tracker";
import { getContent } from "@/lib/content";
import { REGION_CODES, isRegion } from "@/lib/regions";
import { COMPANY, EMAILS, SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return REGION_CODES.map((region) => ({ region }));
}

// Search engine ownership checks entered in Studio → Settings → Analytics & search.
export async function generateMetadata() {
  const { settings } = await getContent();
  const other: Record<string, string> = {};
  if (settings.analytics.bingVerify) other["msvalidate.01"] = settings.analytics.bingVerify;
  return { verification: { google: settings.analytics.searchConsole || undefined, other } };
}

export default async function RegionLayout({ children, params }: { children: React.ReactNode; params: { region: string } }) {
  if (!isRegion(params.region)) notFound();
  const region = params.region;
  const c = await getContent();
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
    subOrganization: { "@type": "Organization", name: "Luvder", url: "https://luvder.com", description: "Advertising platform for bold ideas: online, offline, print, content, SEO, AEO and GEO." },
    department: c.offices.map((o) => ({
      "@type": "LocalBusiness", name: o.name, telephone: o.phone,
      address: { "@type": "PostalAddress", streetAddress: o.address.slice(0, -1).join(", "), addressCountry: o.country },
    })),
  };
  return (
    <>
      <SiteSettingsStyle s={c.settings} />
      <Tracker region={region} />
      {children}
      <Consent {...analyticsIds(c.settings)} region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
