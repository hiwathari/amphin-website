import type { MetadataRoute } from "next";
import { getJobs, getPillars, getPosts, getProjects, getServices } from "@/lib/content";
import { LEGAL } from "@/lib/legal";
import { REGIONS, REGION_CODES } from "@/lib/regions";
import { OFFICES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/about", "/about/team", "/services", "/pricing", "/work", "/blog", "/careers", "/connect", "/contact", "/quote", "/legal",
    ...getPillars().flatMap((p) => [`/services/${p.slug}`, `/services/${p.slug}/pricing`]),
    ...getServices().flatMap((s) => [`/services/${s.pillar}/${s.slug}`, `/services/${s.pillar}/${s.slug}/pricing`]),
    ...getProjects().map((p) => `/work/${p.slug}`),
    ...getPosts().map((p) => `/blog/${p.slug}`),
    ...getJobs().map((j) => `/careers/${j.slug}`),
    ...OFFICES.map((o) => `/contact/${o.slug}`),
    ...LEGAL.map((l) => `/legal/${l.slug}`),
  ];
  return paths.map((p) => ({
    url: `${SITE_URL}/uk${p}`,
    alternates: { languages: Object.fromEntries(REGION_CODES.map((r) => [REGIONS[r].hreflang, `${SITE_URL}/${r}${p}`])) },
  }));
}
