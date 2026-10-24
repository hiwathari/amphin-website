// Read side of the site's content. AMOS (os.amphin.agency) is the source of truth: everything comes
// from its public feed, refreshed when AMOS publishes (POST /api/revalidate) and at most every
// 5 minutes otherwise. If AMOS is unreachable or a section is still empty, that section falls back to
// the seed exported from the old amphin.com, so the site never renders blank.
import { cache } from "react";
import pillarsSeed from "@content/seed/pillars.json";
import servicesSeed from "@content/seed/services.json";
import projectsSeed from "@content/seed/projects.json";
import jobsSeed from "@content/seed/jobs.json";
import postsSeed from "@content/seed/posts.json";
import pricesSeed from "@content/seed/prices.json";
import type { RegionCode } from "./regions";
import { LEGAL, type LegalPage } from "./legal";
import { OFFICES, SOCIALS, type Office } from "./site";

export interface Seo { title?: string; description?: string; focus_keyword?: string }
export interface Pillar { slug: string; title: string; icon: string; pitch: string; order: number; favorite?: boolean }
export interface Service { slug: string; pillar: string; order: number; title: string; intro: string; body: string[]; seo?: Seo; favorite?: boolean }
export interface Project {
  slug: string; title: string; client: string; year: number; categories: string[]; summary: string; body: string[];
  featuredImage: string | null; images: string[]; services: string[]; seo?: Seo; favorite?: boolean;
}
export interface Job { slug: string; title: string; type: string; location: string; salary: string; description: string[]; responsibilities: string[]; qualifications: string[]; deadline: string | null }
export interface Post { slug: string; title: string; date: string; categories: string[]; tags: string[]; excerpt: string; body: string[]; featuredImage: string | null; seo?: Seo; favorite?: boolean }
export interface PriceRow { item: string; label: string; pillar: string; service: string; period: string; prefix: string; features: string[]; highlight?: boolean; prices: Partial<Record<RegionCode, number>> }
export interface TeamMember { name: string; title: string; word: string | null; founder: boolean; photo: string | null }
export interface ClientLogo { name: string; logo: string; website: string | null }
export interface Testimonial { quote: string; name: string; role: string; project?: string | null }
export interface Social { platform: string; url: string; short: string }

export interface Content {
  source: "amos" | "seed";
  pillars: Pillar[]; services: Service[]; projects: Project[]; jobs: Job[]; posts: Post[]; prices: PriceRow[];
  team: TeamMember[]; clients: ClientLogo[]; testimonials: Testimonial[]; offices: Office[]; socials: Social[]; legal: LegalPage[];
}

const AMOS_FEED = process.env.AMOS_FEED_URL || "https://os.amphin.agency/api/public/website/content";

const SEED_CLIENTS = [
  "nexgro-logo", "rayyan-logo", "saravan-bhavan-logo", "shan-prop-logo", "mallu-mechanics-logo", "dhe-chayakada-logo",
  "hello-chai-logo", "honey-cakes-logo", "ice-hub-logo-1", "riceclub-logo", "sulaimany-logo", "wonderwall-logo",
  "fresh-granules-logo", "hichki-logo-", "inout-stories-logo", "exmelt-logo", "dd-logo", "taxnest-logo-white-",
].map((l) => ({ name: l.replace(/-logo.*$/, "").replace(/-/g, " "), logo: `/clients/${l}.webp`, website: null }));

const SEED_TESTIMONIALS: Testimonial[] = [
  { name: "Abin Varghese", role: "MD & CEO, Polkadots Media (Canada & India)", project: "polkadots-media",
    quote: "Amphin has been a game-changer for our digital presence. Their team developed a sleek, functional website for Polkadots Media that perfectly reflects our brand. Their professionalism, attention to detail and technical expertise made the entire process seamless." },
  { name: "Shahid", role: "Owner, Chai Kadai UK", project: "chai-kadai-branding",
    quote: "From menu design to social media marketing and video production, they provided end-to-end solutions that significantly boosted our restaurant's visibility. Their event promotions and cost-efficient management have helped Chai Kadai expand in the competitive London market." },
  { name: "Shas", role: "Co-Founder, IG3 Fish Hub, Ilford", project: "ig3fishhub",
    quote: "Amphin's branding and graphic design expertise helped position IG3 Fish Hub as a standout name in the UK. Their branding strategy and website design captured our vision perfectly, and their company formation services ensured a smooth setup." },
];

// Team members from the old /team page, used only until AMOS → Website → Team has people switched on.
const SEED_TEAM: TeamMember[] = [
  ["Abhishek", "Advisor & Operations", "strategy"], ["Amal CB", "Creative Head", "design"], ["Ananthu", "Marketing Head", "growth"],
  ["Rachana Jayachandran", "Senior Growth Manager", "growth"], ["Fayas Ahammed", "Senior Content Creator", "content"],
  ["Akshay Raveendran", "Business Development Manager", "sales"], ["Anjali Mohan", "Account Manager", "clients"],
  ["Amal", "Customer Relations", "clients"], ["Athira", "HR Executive", "people"], ["Lavrin Fernandez", "Video Editor", "video"],
].map(([name, title, word]) => ({ name, title, word, founder: false, photo: null }));

function seed(): Content {
  return {
    source: "seed",
    pillars: pillarsSeed as Pillar[],
    services: (servicesSeed as Service[]),
    projects: (projectsSeed as (Project & { status: string })[]).filter((p) => p.status === "published"),
    jobs: jobsSeed as Job[],
    posts: (postsSeed as Omit<Post, "tags">[]).map((p) => ({ ...p, tags: [] })),
    prices: pricesSeed as PriceRow[],
    team: SEED_TEAM, clients: SEED_CLIENTS, testimonials: SEED_TESTIMONIALS,
    offices: OFFICES, socials: SOCIALS, legal: LEGAL,
  };
}

type Raw = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
const SHORT: Record<string, string> = { instagram: "ig", facebook: "fb", linkedin: "in", x: "x", twitter: "x", youtube: "yt", tiktok: "tt", behance: "be" };

function fromFeed(f: Raw): Content {
  const s = seed();
  const pick = <T,>(mapped: T[], fallback: T[]) => (mapped.length ? mapped : fallback);
  return {
    source: "amos",
    pillars: pick((f.pillars ?? []).map((p: Raw, i: number) => ({ slug: p.slug, title: p.title, icon: p.icon, pitch: p.pitch, order: i, favorite: p.favorite })), s.pillars),
    services: pick((f.services ?? []).map((x: Raw, i: number) => ({ slug: x.slug, pillar: x.pillar, order: i, title: x.title, intro: x.intro, body: arr(x.body), seo: x.seo, favorite: x.favorite })), s.services),
    projects: pick((f.projects ?? []).map((p: Raw) => ({
      slug: p.slug, title: p.title, client: p.client, year: p.year, categories: arr(p.categories), summary: p.summary, body: arr(p.body),
      featuredImage: p.cover ?? null, images: (p.images ?? []).map((m: Raw) => m.url), services: arr(p.services), seo: p.seo, favorite: p.favorite,
    })), s.projects),
    jobs: pick((f.jobs ?? []).map((j: Raw) => ({ slug: j.slug, title: j.title, type: j.type, location: j.location, salary: j.salary,
      description: arr(j.description), responsibilities: arr(j.responsibilities), qualifications: arr(j.qualifications), deadline: j.deadline })), s.jobs),
    posts: pick((f.posts ?? []).map((p: Raw) => ({ slug: p.slug, title: p.title, date: String(p.published_at ?? "").slice(0, 19).replace("T", " "),
      categories: arr(p.categories), tags: arr(p.tags), excerpt: p.excerpt, body: arr(p.body), featuredImage: p.cover ?? null, seo: p.seo, favorite: p.favorite })), s.posts),
    prices: pick((f.prices ?? []).map((p: Raw) => ({ item: p.item, label: p.label, pillar: p.pillar, service: p.service, period: p.period, prefix: p.prefix,
      features: arr(p.features), highlight: p.highlight,
      prices: Object.fromEntries((["uk", "eu", "us", "in", "ae"] as const).filter((r) => p[`price_${r}`] != null).map((r) => [r, Number(p[`price_${r}`])])) })), s.prices),
    team: pick((f.team ?? []).map((t: Raw) => ({ name: t.name, title: t.title, word: t.word, founder: !!t.founder, photo: t.photo })), s.team),
    clients: pick((f.clients ?? []).filter((c: Raw) => c.logo).map((c: Raw) => ({ name: c.name, logo: c.logo, website: c.website })), s.clients),
    testimonials: pick((f.testimonials ?? []).map((t: Raw) => ({ quote: t.quote, name: t.person, role: t.role, project: t.project })), s.testimonials),
    offices: pick((f.offices ?? []).map((o: Raw) => ({ slug: o.slug, name: o.name, city: o.city, country: o.country, address: arr(o.address),
      phone: o.phone ?? undefined, email: o.email ?? "hello@amphin.com", mapQuery: o.map_query ?? o.name, regions: arr(o.regions) as RegionCode[] })), s.offices),
    socials: pick((f.socials ?? []).filter((x: Raw) => !x.office).map((x: Raw) => ({ platform: x.platform, url: x.url, short: SHORT[String(x.platform).toLowerCase()] ?? String(x.platform).slice(0, 2).toLowerCase() })), s.socials),
    legal: pick((f.legal ?? []).map((l: Raw) => ({ slug: l.slug, title: l.title, summary: l.summary, version: l.version, updated: String(l.effective_date ?? "").slice(0, 10) || "2026-10-24", sections: l.sections })), s.legal),
  };
}

/** All site content for this request (one fetch, shared by every component in the render). */
export const getContent = cache(async (): Promise<Content> => {
  try {
    const r = await fetch(AMOS_FEED, { next: { revalidate: 300, tags: ["amos"] }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(`feed ${r.status}`);
    return fromFeed(await r.json());
  } catch {
    return seed();
  }
});

// ---------- helpers used by the pages ----------
export const PROJECT_CATEGORIES = ["Branding", "Graphic Design", "Websites", "Social Media Marketing", "Content Creation"];
const favFirst = <T extends { favorite?: boolean }>(a: T, b: T) => Number(!!b.favorite) - Number(!!a.favorite);

export async function getPillars() { return (await getContent()).pillars.slice().sort((a, b) => favFirst(a, b) || a.order - b.order); }
export async function getPillar(slug: string) { return (await getContent()).pillars.find((p) => p.slug === slug); }
export async function getServices(pillar?: string) {
  return (await getContent()).services.filter((s) => !pillar || s.pillar === pillar).sort((a, b) => favFirst(a, b) || a.order - b.order);
}
export async function getService(pillar: string, slug: string) { return (await getContent()).services.find((s) => s.pillar === pillar && s.slug === slug); }
export async function serviceBySlug(slug: string) { return (await getContent()).services.find((s) => s.slug === slug); }

export async function getProjects(category?: string) {
  return (await getContent()).projects
    .filter((p) => !category || p.categories.includes(category))
    .sort((a, b) => favFirst(a, b) || b.year - a.year || a.title.localeCompare(b.title));
}
export async function getProject(slug: string) { return (await getContent()).projects.find((p) => p.slug === slug); }
/** Case studies that used any of these services (the service ↔ project link, both ways). */
export async function projectsForService(serviceSlugs: string[]) {
  return (await getProjects()).filter((p) => p.services.some((s) => serviceSlugs.includes(s)));
}

export async function getJobs() { return (await getContent()).jobs; }
export async function getJob(slug: string) { return (await getContent()).jobs.find((j) => j.slug === slug); }
export async function getPosts() { return (await getContent()).posts.slice().sort((a, b) => favFirst(a, b) || b.date.localeCompare(a.date)); }
export async function getPost(slug: string) { return (await getContent()).posts.find((p) => p.slug === slug); }

export async function getPrices(filter?: { pillar?: string; service?: string }) {
  return (await getContent()).prices.filter((p) => (!filter?.pillar || p.pillar === filter.pillar) && (!filter?.service || p.service === filter.service));
}
/** Lowest set price for a pillar in a region, or null when the region shows "contact us". */
export async function startingPrice(pillar: string, region: RegionCode): Promise<number | null> {
  const set = (await getPrices({ pillar })).filter((p) => p.features.length).map((p) => p.prices[region]).filter((v): v is number => typeof v === "number");
  return set.length ? Math.min(...set) : null;
}
export function startingPriceSync(prices: PriceRow[], pillar: string, region: RegionCode): number | null {
  const set = prices.filter((p) => p.pillar === pillar && p.features.length).map((p) => p.prices[region]).filter((v): v is number => typeof v === "number");
  return set.length ? Math.min(...set) : null;
}
