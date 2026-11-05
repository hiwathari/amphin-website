// Industries Amphin has worked in. A project counts toward an industry when its client or title matches
// the pattern, so the counts always come from the real portfolio (nothing here is typed in by hand).
import type { Project } from "./content";

export interface Industry { slug: string; name: string; line: string; blurb: string; match: RegExp }

export const INDUSTRIES: Industry[] = [
  { slug: "food-hospitality", name: "Food & hospitality", line: "From first look to full tables.",
    blurb: "Restaurants, cafés, bakeries and food brands live on appetite and repeat visits. We shape the identity, the menu, the website and the feed that fill the room.",
    match: /chai|chayak|cake|koko bites|bar-b|saravana|navaruchi|emir mandi|zayt|mashawi|restaurant|eatzr|flavourgram|fish hub/i },
  { slug: "retail-consumer", name: "Retail & consumer brands", line: "From shelf to cart.",
    blurb: "Fashion, bags, beauty and everyday products compete in seconds. We build brands, packaging and stores that get picked up and bought again.",
    match: /fashion|bags|kaylah|saanvira|florai|glam strands|diva|chat2kart|jim beam|e-?commerce|shopify/i },
  { slug: "property-real-estate", name: "Property & real estate", line: "Brands that build trust.",
    blurb: "Buyers and tenants commit large sums, so trust comes first. We design property brands, sites and software that make the decision feel safe.",
    match: /properties|reality|real estate|topline|propkit/i },
  { slug: "travel-tourism", name: "Travel & tourism", line: "Inspiring journeys before they begin.",
    blurb: "Travellers choose long before they book. We create the sites and identities that make a destination or an experience easy to picture and easy to reserve.",
    match: /indimate|travel/i },
  { slug: "industrial-b2b", name: "Industrial & B2B", line: "Long cycles, high stakes.",
    blurb: "Logistics, agriculture, technology and professional services sell through proof and patience. We make complex businesses clear, credible and easy to contact.",
    match: /sasco|logistics|tolwatts|nexgro|soundkraft|invero/i },
  { slug: "technology-software", name: "Technology & software", line: "Products people understand at a glance.",
    blurb: "Software wins when people grasp it in seconds. We design the brand, the website and the product story, and sometimes build the product too.",
    match: /logbench|mailmesh|displaypilot|propkit|agency os|platform|software/i },
  { slug: "health-care-wellness", name: "Health, care & wellness", line: "Trust, in every touchpoint.",
    blurb: "Care homes, wellness studios and community organisations earn trust slowly. We give them calm, clear brands and sites people feel safe contacting.",
    match: /carenest|care nest|yoga|wellness|fellowship/i },
];

export const industryOf = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
export const projectsInIndustry = (projects: Project[], i: Industry) => projects.filter((p) => i.match.test(`${p.client} ${p.title}`));
