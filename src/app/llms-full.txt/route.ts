// llms-full.txt: the full text of every service page and blog article in one plain-text file, so AI
// assistants and answer engines can read and cite Amphin without crawling hundreds of pages.
import { getContent, getPosts } from "@/lib/content";
import { COMPANY, EMAILS, PHONES, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export async function GET() {
  const c = await getContent();
  const posts = await getPosts();
  const u = (p: string) => `${SITE_URL}/uk${p}`;
  const out: string[] = [
    `# ${COMPANY.brand}: full text`,
    "",
    `> Growth marketing and creative agency with offices in London, Kochi and Abu Dhabi. Contact ${EMAILS.hello}, sales ${PHONES.salesUk} (UK and international) or ${PHONES.salesIndia} (India). Summary and key pages: ${SITE_URL}/llms.txt`,
    "",
    "# Services",
  ];
  for (const p of c.pillars) {
    out.push("", `## ${p.title}`, `URL: ${u(`/services/${p.slug}`)}`, "", p.pitch);
    for (const s of c.services.filter((x) => x.pillar === p.slug)) {
      out.push("", `### ${s.title}`, `URL: ${u(`/services/${p.slug}/${s.slug}`)}`, "", s.intro, ...s.body);
    }
  }
  out.push("", "# Articles");
  for (const p of posts) {
    out.push("", `## ${p.title}`, `URL: ${u(`/blog/${p.slug}`)}`, `Date: ${p.date.slice(0, 10)}${p.categories.length ? ` · ${p.categories.join(", ")}` : ""}`, "");
    if (p.excerpt) out.push(p.excerpt, "");
    out.push(...p.body.map((l) => (/^#{2,4}\s/.test(l) ? l.replace(/^#+/, "###") : l)));
  }
  return new Response(out.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
