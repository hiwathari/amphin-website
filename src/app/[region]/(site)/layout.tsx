import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import MotionPrefs from "@/components/MotionPrefs";
import { Footer, TopBar, WhatsAppButton } from "@/components/Chrome";
import { BackToTop } from "@/components/Motion";
import { CursorGlow, ScrollProgress, SmoothScroll } from "@/components/Effects";
import { getContent, getPillars } from "@/lib/content";
import { isRegion } from "@/lib/regions";
import { mainPhone } from "@/lib/site";

// The main Amphin website: dark frame, top bar, header and footer. The AmOS product pages live in the
// sibling (amos) group and bring their own header and footer.
export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: { region: string } }) {
  const region = isRegion(params.region) ? params.region : "uk";
  const [c, pillars] = await Promise.all([getContent(), getPillars()]);
  return (
    <>
      {c.settings.motion.animations && c.settings.motion.preloader && <Preloader />}
      <a href="#main" className="skip">Skip to content</a>
      {c.settings.motion.animations && c.settings.motion.smoothScroll && <SmoothScroll />}
      <ScrollProgress />
      {c.settings.motion.animations && c.settings.motion.cursorGlow && <CursorGlow />}
      <div className="frame-glow" />
      <div className="frame">
        <TopBar region={region} socials={c.socials} />
        <Header region={region} phone={mainPhone(region)} pillars={pillars.map((p) => ({ slug: p.slug, title: p.title }))} />
        <main id="main"><MotionPrefs off={!c.settings.motion.animations}>{children}</MotionPrefs></main>
        <Footer region={region} offices={c.offices} socials={c.socials} />
      </div>
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
