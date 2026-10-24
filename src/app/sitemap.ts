import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { REGIONS, REGION_CODES } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent();
  const paths = [
    "", "/about", "/about/team", "/services", "/pricing", "/work", "/blog", "/careers", "/connect", "/contact", "/quote", "/legal", "/gallery", "/faq",
    ...c.pillars.flatMap((p) => [`/services/${p.slug}`, `/services/${p.slug}/pricing`]),
    ...c.services.flatMap((s) => [`/services/${s.pillar}/${s.slug}`, `/services/${s.pillar}/${s.slug}/pricing`]),
    ...c.projects.map((p) => `/work/${p.slug}`),
    ...c.posts.map((p) => `/blog/${p.slug}`),
    ...c.jobs.map((j) => `/careers/${j.slug}`),
    ...c.offices.map((o) => `/contact/${o.slug}`),
    ...c.legal.map((l) => `/legal/${l.slug}`),
  ];
  return paths.map((p) => ({
    url: `${SITE_URL}/uk${p}`,
    alternates: { languages: Object.fromEntries(REGION_CODES.map((r) => [REGIONS[r].hreflang, `${SITE_URL}/${r}${p}`])) },
  }));
}
