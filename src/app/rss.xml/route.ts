// RSS feed of the latest blog articles, for feed readers, aggregators and AI crawlers.
import { getPosts } from "@/lib/content";
import { COMPANY, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = (await getPosts()).slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 50);
  const items = posts.map((p) => {
    const url = `${SITE_URL}/uk/blog/${p.slug}`;
    return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid>` +
      `<pubDate>${new Date(p.date.replace(" ", "T") + "Z").toUTCString()}</pubDate>` +
      p.categories.map((c) => `<category>${esc(c)}</category>`).join("") +
      `<description>${esc(p.excerpt || p.title)}</description></item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>` +
    `<title>${COMPANY.brand} blog</title><link>${SITE_URL}/uk/blog</link><description>Marketing, technology and growth ideas from ${COMPANY.brand}.</description>` +
    `<language>en-gb</language><atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
