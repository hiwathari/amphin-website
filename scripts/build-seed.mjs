// Builds content/seed/*.json from the amphin.com export (amphin-website-data/data).
// The seed is what the site renders until the AMOS web_* tables are live, and it is
// also the payload the AMOS import script loads into those tables.
// Usage: node scripts/build-seed.mjs [path-to-export-data-dir]
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] || "/home/user/amphin-website-data/data";
const OUT = path.join(process.cwd(), "content/seed");
fs.mkdirSync(OUT, { recursive: true });

const load = (n) => JSON.parse(fs.readFileSync(path.join(SRC, `${n}.json`), "utf8"));
const save = (n, v) => fs.writeFileSync(path.join(OUT, `${n}.json`), JSON.stringify(v, null, 2) + "\n");

const decode = (s = "") =>
  s.replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&#8211;|&ndash;/g, "–")
   .replace(/&#8212;|&mdash;/g, "—").replace(/&quot;/g, '"').replace(/&#039;|&#39;/g, "'")
   .replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Lines of WordPress page text that are theme chrome rather than content.
const NOISE = /^(services|read more|more info!?|explore more|see all services|see all projects|\d+|\.\d+|[•·\-]|load more)$/i;

function paragraphs(text = "") {
  return text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l && !NOISE.test(l));
}

// ---------- service pillars ----------
// Old service slug -> pillar. Duplicates (graphic-design-2, marketing-strategy-2,
// video-production-2) are merged into their first page.
const PILLARS = [
  { slug: "branding", title: "Branding & Identity", icon: "spark",
    pitch: "Distinctive brand identities, logo systems and design that make a business recognisable at a glance.",
    services: ["brand-identity-design", "graphic-design", "ui-design", "developing-organizational-culture"] },
  { slug: "social-media", title: "Social Media Marketing", icon: "orbit",
    pitch: "Always-on social content, community management and growth across every platform your customers use.",
    services: ["smm", "instagram", "facebook", "youtube", "twitterx", "instagram-automation", "youtube-automation"] },
  { slug: "content-video", title: "Content & Video Production", icon: "play",
    pitch: "Photography, video, reels and copy produced by an in-house creative team, from concept to final cut.",
    services: ["content-production", "video-production", "photography", "copywriting", "content-marketing"] },
  { slug: "web-development", title: "Web Design & Development", icon: "grid",
    pitch: "Fast, search-friendly websites designed around your brand and built to convert visitors into leads.",
    services: ["web-development", "custom-web-development", "wordpress-websites", "one-page-website"] },
  { slug: "ecommerce", title: "E-commerce", icon: "bag",
    pitch: "Online stores on Shopify, WooCommerce or custom stacks, set up to sell from day one.",
    services: ["shopify-stores", "woo-commerce-websites", "custom-e-commerce-website", "e-commerce-web-designing"] },
  { slug: "app-development", title: "App Development", icon: "phone",
    pitch: "iOS and Android apps with clean, intuitive interfaces and reliable back ends.",
    services: ["app-development", "android-app", "ios-app"] },
  { slug: "seo-performance", title: "SEO & Performance Marketing", icon: "chart",
    pitch: "Search, paid media and email campaigns measured against leads and revenue, not vanity metrics.",
    services: ["seo", "sem", "ppc-campaigns", "display-ads", "video-advertising", "mobile-marketing", "email-marketing", "advertising-solutions", "automation"] },
  { slug: "pr-influencer", title: "PR, Influencer & Reputation", icon: "mic",
    pitch: "Press, influencer partnerships and reputation management that put your brand in the right conversations.",
    services: ["brand-pr", "press-media", "influencer-management", "artist-management", "make-me-a-celebrity", "online-reputation-management", "csr"] },
  { slug: "it-systems", title: "IT & Business Systems", icon: "chip",
    pitch: "Email, workspace, security, POS and accounting systems set up and supported for growing teams.",
    services: ["technical-support", "cyber-security", "email-services", "web-mail", "gmail", "g-suite", "e-pos-system", "accounting-software-solutions", "account-recovery"] },
  { slug: "strategy", title: "Strategy & Consulting", icon: "compass",
    pitch: "Market analysis, growth strategy and performance reviews that give every campaign a clear direction.",
    services: ["marketing-strategy", "strategy-development", "market-analysis", "performance-optimization", "internal-audit"] },
];
const MERGED = { "graphic-design-2": "graphic-design", "marketing-strategy-2": "marketing-strategy", "video-production-2": "video-production" };

const oldServices = load("services");
const bySlug = Object.fromEntries(oldServices.map((s) => [s.slug, s]));

const services = [];
for (const p of PILLARS) {
  p.services.forEach((slug, order) => {
    const s = bySlug[slug];
    if (!s) throw new Error(`service ${slug} missing from export`);
    const extra = Object.entries(MERGED).filter(([, to]) => to === slug).map(([from]) => bySlug[from]).filter(Boolean);
    const body = [s, ...extra].flatMap((x) => paragraphs(x.text));
    services.push({
      slug,
      pillar: p.slug,
      order,
      title: decode(s.title).replace(/\s*\(.*?\)\s*$/, (m) => m), // keep "(Search Engine Optimization)" style suffixes
      intro: body.find((l) => l.length > 80) || "",
      body: [...new Set(body)],
      seo: s.seo,
      oldUrls: [s.url, ...extra.map((x) => x.url)],
    });
  });
}
const pillars = PILLARS.map(({ services: list, ...p }, i) => ({ ...p, order: i, serviceSlugs: list }));
const mapped = new Set([...PILLARS.flatMap((p) => p.services), ...Object.keys(MERGED)]);
const unmapped = oldServices.filter((s) => !mapped.has(s.slug)).map((s) => s.slug);
if (unmapped.length) throw new Error(`unmapped services: ${unmapped.join(", ")}`);

// ---------- portfolio ----------
// Template demo drafts from the theme import are dropped; Momo Muse is real work kept as draft.
const WEB = /website|web development/i;
const projects = load("portfolio")
  .filter((p) => p.status === "publish" || p.slug === "momo-muse-branding")
  .map((p) => {
    const title = decode(p.title);
    const cats = new Set(p.terms.map((t) => decode(t)));
    if (WEB.test(title)) cats.add("Websites");
    if (/content creation/i.test(title)) cats.add("Content Creation");
    const info = Array.isArray(p.portfolio_info) ? p.portfolio_info : [];
    const client = (info.find((i) => /project/i.test(i.title || "")) || {}).title?.replace(/^project:\s*/i, "") || title.split(/[–-]/)[0].trim();
    return {
      slug: p.slug,
      title,
      client,
      year: Number(p.date.slice(0, 4)),
      status: p.status === "publish" ? "published" : "draft",
      categories: [...cats],
      summary: decode(p.seo?.description || "") || paragraphs(p.text).find((l) => l.length > 80) || "",
      body: paragraphs(decode(p.portfolio_details || "") ? p.portfolio_details.replace(/<\/(p|h\d|li)>/gi, "\n").replace(/<[^>]+>/g, "") : p.text),
      featuredImage: p.featured_image,
      images: p.images,
      services: [],
      seo: p.seo,
      oldUrl: p.url,
    };
  });

// Map projects to services from their categories and title, so the two-way links have a
// sensible starting point; the team refines them in AMOS.
const CAT_TO_SERVICES = {
  Branding: ["brand-identity-design"],
  "Graphic Design": ["graphic-design"],
  "Social Media Marketing": ["smm"],
  Websites: ["web-development"],
  "Content Creation": ["content-production"],
};
for (const p of projects) {
  const s = new Set(p.categories.flatMap((c) => CAT_TO_SERVICES[c] || []));
  if (/influencer/i.test(p.title)) s.add("influencer-management");
  if (/guideline/i.test(p.title)) s.add("brand-identity-design");
  p.services = [...s];
}

// ---------- careers ----------
const unserialize = (s) => {
  if (typeof s !== "string" || !s.startsWith("a:")) return {};
  const v = [...s.matchAll(/s:\d+:"(.*?)";/g)].map((m) => m[1]);
  return Object.fromEntries(v.reduce((acc, x, i) => (i % 2 ? acc : [...acc, [x, v[i + 1]]]), []));
};
const htmlList = (h = "") => h.split(/<\/li>/i).map((x) => decode(x)).filter((x) => x && x.length > 2);
const jobs = load("careers")
  .filter((c) => c.status === "publish")
  .map((c) => {
    const m = c.meta || {};
    const sal = unserialize(m.vacancy_salary);
    const desc = (m.vacancy_description || "").split(/<\/p>/i).map(decode).filter((x) => x && !/^company overview:?$/i.test(x));
    return {
      slug: c.slug.includes("%") ? slugify(c.title) : c.slug,
      title: decode(c.title),
      type: m.vacancy_occupation || "Full-time",
      location: m.vacancy_location || "",
      salary: [sal.value, sal.period].filter(Boolean).join(" "),
      description: desc,
      responsibilities: htmlList(m.vacancy_responsibilities),
      qualifications: htmlList(m.vacancy_qualifications),
      deadline: null,
      oldUrl: c.url,
    };
  });

// ---------- blog ----------
const posts = load("blog-posts").map((b) => ({
  slug: b.slug,
  title: decode(b.title),
  date: b.date,
  categories: b.terms.map(decode),
  excerpt: decode(b.seo?.description || b.excerpt || "") || paragraphs(b.text).find((l) => l.length > 80) || "",
  body: paragraphs(b.text),
  featuredImage: b.featured_image,
  seo: b.seo,
  oldUrl: b.url,
}));

save("pillars", pillars);
save("services", services);
save("projects", projects);
save("jobs", jobs);
save("posts", posts);
console.log({ pillars: pillars.length, services: services.length, projects: projects.length, jobs: jobs.length, posts: posts.length });
