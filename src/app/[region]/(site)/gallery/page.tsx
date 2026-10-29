import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { RevealMedia } from "@/components/Effects";
import LiquidArt from "@/components/LiquidArt";
import PageHero from "@/components/PageHero";
import { getProjects } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { opt } from "@/lib/img";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/gallery", { title: "Gallery", description: "Highlights from Amphin's branding, web and content projects." });
}

// A visual wall of work: one image from each case study (favourites first), linking to the project.
export default async function Gallery({ params }: { params: { region: RegionCode } }) {
  const projects = await getProjects();
  const tiles = projects.map((p) => ({ slug: p.slug, title: p.title, img: p.featuredImage ?? p.images[0] ?? null }));
  return (
    <>
      <PageHero title={["Gallery"]} lead="A wall of recent work. Tap any image to see the full case study." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>gallery</Eyebrow></div>
          <div className="gallery">
            {tiles.map((t, i) => (
              <Link key={t.slug} href={`/${params.region}/work/${t.slug}`} aria-label={t.title}>
                <RevealMedia delay={(i % 3) * 0.08} className="g-inner">
                  <LiquidArt seed={t.slug} style={{ position: "absolute", inset: 0 }} animate={false} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {t.img && <img src={opt(t.img, 828)} alt={t.title} loading="lazy" />}
                </RevealMedia>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand region={params.region} />
    </>
  );
}
