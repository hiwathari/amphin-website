// llms.txt: a plain-text guide for AI assistants and answer engines (GEO/AEO), listing who Amphin is,
// what it offers and the canonical pages to cite. Rebuilt with the rest of the site.
import { getContent } from "@/lib/content";
import { buildLandings } from "@/lib/landing";
import { COMPANY, EMAILS, PHONES, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function GET() {
  const c = await getContent();
  const u = (p: string) => `${SITE_URL}/uk${p}`;
  const lines = [
    `# ${COMPANY.brand}`,
    "",
    "> Amphin is a growth marketing and creative agency with offices in London (UK), Kochi (India) and Abu Dhabi (UAE). It offers branding, social media marketing, content and video production, web and app development, e-commerce, SEO and performance marketing, PR and influencer marketing, IT systems and marketing strategy. Tagline: Empowering Brands, Redefining Possibilities.",
    "",
    `Contact: ${EMAILS.hello}. Sales: ${PHONES.salesUk} (UK and international), ${PHONES.salesIndia} (India). Regional sites: /uk (GBP), /eu (EUR), /us (USD), /in (INR), /ae (AED).`,
    `Full text of every article and service page for AI assistants: ${SITE_URL}/llms-full.txt. Blog feed: ${SITE_URL}/rss.xml.`,
    "",
    "## Key pages",
    `- [Home](${u("")})`,
    `- [About Amphin](${u("/about")})`,
    `- [Make Me a Celebrity, signature personal branding and PR programme](${u("/make-me-a-celebrity")})`,
    `- [AmOS, Amphin's agency operating system (CRM, projects, HR, payroll, website CMS)](${u("/amos")})`,
    `- [Services](${u("/services")})`,
    `- [Pricing](${u("/pricing")})`,
    `- [Portfolio](${u("/work")})`,
    `- [Locations](${u("/locations")})`,
    `- [FAQ](${u("/faq")})`,
    `- [Contact](${u("/contact")})`,
    "",
    "## Services",
    ...c.pillars.map((p) => `- [${p.title}](${u(`/services/${p.slug}`)}): ${p.pitch}`),
    "",
    "## Local pages",
    ...buildLandings(c.pillars, c.services).filter((l) => l.kind === "pillar").map((l) => `- [${l.phrase} in ${l.city.name}](${SITE_URL}/${l.city.region}/${l.slug})`),
    "",
    "## Recent articles",
    ...c.posts.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30).map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.excerpt.slice(0, 160)}`),
    "",
    "## Policies",
    ...c.legal.map((l) => `- [${l.title}](${u(`/legal/${l.slug}`)}): ${l.summary}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
