// Read side of the site's content. Today it serves the seed exported from amphin.com; when the
// AMOS web_* tables are live these functions query the read-only `web_public` views instead, and
// the page code does not change.
import pillarsSeed from "@content/seed/pillars.json";
import servicesSeed from "@content/seed/services.json";
import projectsSeed from "@content/seed/projects.json";
import jobsSeed from "@content/seed/jobs.json";
import postsSeed from "@content/seed/posts.json";
import pricesSeed from "@content/seed/prices.json";
import type { RegionCode } from "./regions";

export interface Seo { title?: string; description?: string; focus_keyword?: string }

export interface Pillar {
  slug: string; title: string; icon: string; pitch: string; order: number; serviceSlugs: string[];
}
export interface Service {
  slug: string; pillar: string; order: number; title: string; intro: string; body: string[]; seo?: Seo; oldUrls: string[];
}
export interface Project {
  slug: string; title: string; client: string; year: number; status: "published" | "draft";
  categories: string[]; summary: string; body: string[]; featuredImage: string | null; images: string[];
  services: string[]; seo?: Seo; oldUrl: string;
}
export interface Job {
  slug: string; title: string; type: string; location: string; salary: string;
  description: string[]; responsibilities: string[]; qualifications: string[]; deadline: string | null; oldUrl: string;
}
export interface Post {
  slug: string; title: string; date: string; categories: string[]; excerpt: string; body: string[];
  featuredImage: string | null; seo?: Seo; oldUrl: string;
}
export interface PriceRow {
  item: string; label: string; pillar: string; service: string; period: string; prefix: string;
  features: string[]; highlight?: boolean; prices: Partial<Record<RegionCode, number>>;
}

const pillars = pillarsSeed as Pillar[];
const services = servicesSeed as Service[];
const projects = (projectsSeed as Project[]).filter((p) => p.status === "published");
const jobs = jobsSeed as Job[];
const posts = (postsSeed as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date));
const prices = pricesSeed as PriceRow[];

export const getPillars = () => pillars.slice().sort((a, b) => a.order - b.order);
export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);
export const getServices = (pillar?: string) =>
  services.filter((s) => !pillar || s.pillar === pillar).sort((a, b) => a.order - b.order);
export const getService = (pillar: string, slug: string) => services.find((s) => s.pillar === pillar && s.slug === slug);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const PROJECT_CATEGORIES = ["Branding", "Graphic Design", "Websites", "Social Media Marketing", "Content Creation"];
export const getProjects = (category?: string) =>
  projects
    .filter((p) => !category || p.categories.includes(category))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
/** Projects that used any sub-service of a pillar, or one specific sub-service. */
export const projectsForService = (serviceSlugs: string[]) =>
  getProjects().filter((p) => p.services.some((s) => serviceSlugs.includes(s)));

export const getJobs = () => jobs;
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

export const getPosts = () => posts;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const getPrices = (filter?: { pillar?: string; service?: string }) =>
  prices.filter((p) => (!filter?.pillar || p.pillar === filter.pillar) && (!filter?.service || p.service === filter.service));

/** The lowest set price for a pillar in a region, or null when the region shows "contact us". */
export function startingPrice(pillar: string, region: RegionCode): number | null {
  const set = prices
    .filter((p) => p.pillar === pillar && p.features.length > 0)
    .map((p) => p.prices[region])
    .filter((v): v is number => typeof v === "number");
  return set.length ? Math.min(...set) : null;
}

/** Old WordPress image URLs; served through next/image until the media moves to R2. */
export function imageUrl(url: string | null | undefined): string | null {
  return url || null;
}
