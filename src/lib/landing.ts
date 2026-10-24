// Local landing pages: one per service area (and per individual service) in each city where Amphin has
// an office. Each lives only under its own region (/uk/branding-agency-london), uses the search phrase
// people type as its slug and H1, and carries real local detail: the office address, phone, prices
// in the local currency, and work from that service area. Cities without an office are deliberately
// left out; thin copies for places we don't serve are what search engines treat as doorway pages.
import type { Pillar, Service } from "./content";
import type { RegionCode } from "./regions";

export interface City { slug: string; name: string; region: RegionCode; office: string; area: string; nearby: string[] }

export const CITIES: City[] = [
  { slug: "london", name: "London", region: "uk", office: "london", area: "the UK", nearby: ["East London", "Stratford", "Ilford", "the City", "Essex"] },
  { slug: "kochi", name: "Kochi", region: "in", office: "kochi", area: "Kerala", nearby: ["Kakkanad", "Edappally", "Ernakulam", "Thrissur", "Trivandrum"] },
  { slug: "abu-dhabi", name: "Abu Dhabi", region: "ae", office: "abu-dhabi", area: "the UAE", nearby: ["Al Reem Island", "Dubai", "Al Ain", "Sharjah"] },
];

/** The phrase people search for each service area, in the singular "agency" form search engines favour. */
export const PILLAR_PHRASE: Record<string, { slug: string; phrase: string; noun: string }> = {
  branding: { slug: "branding-agency", phrase: "Branding Agency", noun: "branding" },
  "social-media": { slug: "social-media-marketing-agency", phrase: "Social Media Marketing Agency", noun: "social media marketing" },
  "content-video": { slug: "video-production-company", phrase: "Video & Content Production Company", noun: "video and content production" },
  "web-development": { slug: "web-design-company", phrase: "Web Design & Development Company", noun: "web design and development" },
  ecommerce: { slug: "ecommerce-website-development", phrase: "E-commerce Website Development", noun: "e-commerce development" },
  "app-development": { slug: "app-development-company", phrase: "App Development Company", noun: "app development" },
  "seo-performance": { slug: "seo-agency", phrase: "SEO & Performance Marketing Agency", noun: "SEO and performance marketing" },
  "pr-influencer": { slug: "pr-agency", phrase: "PR & Influencer Marketing Agency", noun: "PR and influencer marketing" },
  "it-systems": { slug: "it-services-company", phrase: "IT & Business Systems Company", noun: "IT and business systems" },
  strategy: { slug: "marketing-consultancy", phrase: "Marketing Strategy Consultancy", noun: "marketing strategy" },
};

// Services that already have a dedicated page of their own.
const SKIP_SERVICES = new Set(["make-me-a-celebrity"]);

export type Landing =
  | { kind: "pillar"; slug: string; city: City; pillar: Pillar; phrase: string; noun: string }
  | { kind: "service"; slug: string; city: City; pillar: Pillar; service: Service; phrase: string; noun: string };

export function pillarPhrase(p: Pillar) {
  return PILLAR_PHRASE[p.slug] ?? { slug: `${p.slug}-agency`, phrase: `${p.title} Agency`, noun: p.title.toLowerCase() };
}

export function buildLandings(pillars: Pillar[], services: Service[]): Landing[] {
  const out: Landing[] = [];
  for (const city of CITIES) {
    for (const pillar of pillars) {
      const ph = pillarPhrase(pillar);
      out.push({ kind: "pillar", slug: `${ph.slug}-${city.slug}`, city, pillar, phrase: ph.phrase, noun: ph.noun });
      for (const service of services.filter((s) => s.pillar === pillar.slug && !SKIP_SERVICES.has(s.slug))) {
        out.push({ kind: "service", slug: `${service.slug}-${city.slug}`, city, pillar, service, phrase: service.title, noun: service.title.toLowerCase() });
      }
    }
  }
  return out;
}

export function cityForRegion(region: RegionCode): City | undefined {
  return CITIES.find((c) => c.region === region);
}

/** Cover image for a landing page: the service's own artwork when there is one, else a share card. */
export function coverFor(l: Landing, available: Set<string>, pillarServices: string[] = []): string | null {
  const keys = l.kind === "service" ? [l.service.slug, l.pillar.slug, ...pillarServices] : [l.pillar.slug, ...pillarServices];
  for (const k of keys) if (available.has(k)) return `/media/services/${k}.webp`;
  return null;
}
