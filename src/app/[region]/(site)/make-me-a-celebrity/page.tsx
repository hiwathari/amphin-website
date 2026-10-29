import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Parallax } from "@/components/Effects";
import { Arrow } from "@/components/Icon";
import { Reveal, RevealLines, ScrollText } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";

const TITLE = "Make Me a Celebrity: Personal Branding & PR Programme";
const DESCRIPTION = "Amphin's signature programme for founders, creators and professionals: personal branding, media coverage, social growth, speaking slots and reputation management, run as one plan.";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/make-me-a-celebrity", {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ["make me a celebrity", "personal branding agency", "celebrity PR", "personal PR agency", "media relations", "thought leadership", "influencer growth", "reputation management"],
    openGraph: { images: [{ url: "/media/social/og-trend-boss.jpg", width: 1200, height: 630, alt: "Make Me a Celebrity by Amphin" }] },
  });
}

const PILLARS = [
  { n: "01", t: "Personal branding", d: "We define what you stand for and how you say it, then carry that identity across every profile and platform.",
    f: ["Brand identity development", "Messaging strategy", "Online presence management"] },
  { n: "02", t: "Media relations", d: "Our media contacts put your story in front of publications, TV, podcasts and online outlets that reach your audience.",
    f: ["Press releases", "Media pitching", "Interview coaching"] },
  { n: "03", t: "Social media growth", d: "Content, community and steady follower growth that builds a presence people come back to.",
    f: ["Content creation", "Follower growth", "Engagement management"] },
  { n: "04", t: "Events & speaking", d: "Stage time at conferences, seminars and industry events that positions you as the authority in your field.",
    f: ["Event planning", "Speaking engagements", "Audience engagement"] },
  { n: "05", t: "Reputation management", d: "We watch what is said about you, protect your image and step in quickly when something needs handling.",
    f: ["Online monitoring", "Crisis management", "Review management"] },
];

const WHY = [
  ["Tailored strategy", "A plan built around your goals, audience and field, not a template."],
  ["Expert team", "PR, content and growth specialists working as one team."],
  ["Everything joined up", "Branding, press, social and events pulling in the same direction."],
  ["Ongoing support", "Continuous guidance so your profile keeps growing after launch."],
];

const FAQ = [
  ["Who is Make Me a Celebrity for?", "Founders, business owners, creators, artists, doctors, coaches and other professionals who want to become a recognised name in their industry or community."],
  ["What does the programme include?", "Personal branding, media relations, social media growth, event and speaking opportunities, and reputation management, planned and run by one Amphin team."],
  ["How long before I see results?", "Most clients see a stronger online presence within the first month. Press coverage and speaking slots usually build over three to six months, depending on your field and goals."],
  ["Do you guarantee media coverage?", "No reputable PR agency can guarantee coverage. We pitch your story to relevant journalists and producers and coach you so you are ready when opportunities come."],
  ["Which countries do you work in?", "We run the programme from London, Kochi and Abu Dhabi for clients in the UK, Europe, India, the UAE and North America."],
];

export default async function Celebrity({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const base = `/${region}`;
  const services = await getServices();
  const pr = services.filter((s) => s.pillar === "pr-influencer");
  const url = `${SITE_URL}${base}/make-me-a-celebrity`;
  const schema = [
    {
      "@context": "https://schema.org", "@type": "Service", name: "Make Me a Celebrity", serviceType: "Personal branding and public relations",
      description: DESCRIPTION, url, provider: { "@type": "Organization", name: "Amphin", url: SITE_URL },
      areaServed: ["United Kingdom", "Europe", "India", "United Arab Emirates", "United States"],
      hasOfferCatalog: { "@type": "OfferCatalog", name: "Programme", itemListElement: PILLARS.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.t, description: p.d } })) },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${base}` },
        { "@type": "ListItem", position: 2, name: "Make Me a Celebrity", item: url },
      ],
    },
  ];

  return (
    <>
      <PageHero seed="make-me-a-celebrity" title={["Make me a", "celebrity"]} lead="Our signature service. We turn founders, creators and professionals into the names people recognise, with personal branding, press, social growth and stage time run as one plan."
        crumbs={[{ href: base, label: "Home" }, { href: `${base}/make-me-a-celebrity`, label: "Make Me a Celebrity" }]} />

      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <div className="rule"><Eyebrow>signature service</Eyebrow></div>
            <RevealLines lines={["Become the name", "your industry knows"]} grad={1} />
            <Reveal delay={0.1}>
              <p className="muted" style={{ marginTop: 22, maxWidth: 560 }}>
                Make Me a Celebrity raises your public profile and makes you a recognised name in your field. Our PR team combines strategic planning, media relations and personal branding so you get the visibility and recognition your work deserves.
              </p>
              <div style={{ display: "flex", gap: 22, marginTop: 28, flexWrap: "wrap", alignItems: "center" }}>
                <a href="#apply" className="btn-pill magnetic">Apply now</a>
                <Link href={`${base}/services/pr-influencer`} className="link-arrow">PR & influencer services <Arrow /></Link>
              </div>
            </Reveal>
          </div>
          <Parallax speed={-0.08}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/social/trend-boss.webp" alt="Personal branding campaign artwork by Amphin" style={{ width: "100%", borderRadius: 22, aspectRatio: "4 / 5", objectFit: "cover" }} />
          </Parallax>
        </div>
      </section>

      <ScrollText text="personal branding · media · stage · influence" />

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>the programme</Eyebrow></div>
          <h2 className="sr-only">What the Make Me a Celebrity programme includes</h2>
          <div className="celeb-pillars">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={(i % 3) * 0.06}>
                <article className="celeb-pillar">
                  <span className="stat-num" style={{ fontSize: 44 }}>{p.n}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <ul>{p.f.map((x) => <li key={x}>{x}</li>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>why amphin</Eyebrow></div>
          <RevealLines lines={["Why Make Me", "a Celebrity?"]} grad={1} />
          <div className="grid cols-4" style={{ marginTop: 40, gap: 28 }}>
            {WHY.map(([t, d], i) => <Reveal key={t} delay={i * 0.06}><div className="feature"><h3 style={{ fontSize: 17 }}>{t}</h3><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>questions</Eyebrow></div>
          <h2 style={{ marginBottom: 30 }}>Make Me a Celebrity: common questions</h2>
          <div className="faq">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      {pr.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>related services</Eyebrow></div>
            <div className="table-rows">
              {pr.filter((s) => s.slug !== "make-me-a-celebrity").map((s) => (
                <Link key={s.slug} href={`${base}/services/${s.pillar}/${s.slug}`}>
                  <span className="mono muted">PR</span><span>{s.title}</span><span className="muted">{s.intro?.slice(0, 80)}</span>
                  <span className="link-arrow" style={{ justifySelf: "end" }}>View <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" id="apply">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>apply</Eyebrow></div>
            <RevealLines lines={["Tell us who", "you want to become"]} />
            <p className="muted" style={{ marginTop: 22 }}>Share a little about you and your goals. We review every application and reply within one working day.</p>
          </div>
          <ContactForm region={region} form="quote" title="Apply for Make Me a Celebrity" defaultService="make-me-a-celebrity"
            services={[{ value: "make-me-a-celebrity", label: "Make Me a Celebrity" }, ...pr.filter((s) => s.slug !== "make-me-a-celebrity").map((s) => ({ value: s.slug, label: s.title }))]} />
        </div>
      </section>

      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
