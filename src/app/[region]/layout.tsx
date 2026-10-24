import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import SiteSettingsStyle from "@/components/SiteSettings";
import Tracker from "@/components/Tracker";
import MotionPrefs from "@/components/MotionPrefs";
import { Footer, TopBar, WhatsAppButton } from "@/components/Chrome";
import { BackToTop } from "@/components/Motion";
import { CursorGlow, ScrollProgress, SmoothScroll } from "@/components/Effects";
import { getContent, getPillars } from "@/lib/content";
import { REGION_CODES, isRegion } from "@/lib/regions";
import { COMPANY, EMAILS, SITE_URL, mainPhone } from "@/lib/site";

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
    subOrganization: { "@type": "Organization", name: "Luvder", url: "https://luvder.com", description: "Advertising platform for bold ideas: online, offline, print, content, SEO, AEO and GEO." },
    department: c.offices.map((o) => ({
      "@type": "LocalBusiness", name: o.name, telephone: o.phone,
      address: { "@type": "PostalAddress", streetAddress: o.address.slice(0, -1).join(", "), addressCountry: o.country },
    })),
  };
  return (
    <>
      <SiteSettingsStyle s={c.settings} />
      {c.settings.motion.animations && c.settings.motion.preloader && <Preloader />}
      <a href="#main" className="skip">Skip to content</a>
      {c.settings.motion.animations && c.settings.motion.smoothScroll && <SmoothScroll />}
      <ScrollProgress />
      {c.settings.motion.animations && c.settings.motion.cursorGlow && <CursorGlow />}
      <Tracker region={region} />
      <div className="frame-glow" />
      <div className="frame">
        <TopBar region={region} socials={c.socials} />
        <Header region={region} phone={mainPhone(region)} pillars={pillars.map((p) => ({ slug: p.slug, title: p.title }))} />
        <main id="main"><MotionPrefs off={!c.settings.motion.animations}>{children}</MotionPrefs></main>
        <Footer region={region} offices={c.offices} socials={c.socials} />
      </div>
      <BackToTop />
      <WhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
