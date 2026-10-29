import { Counter, Reveal, RevealLines } from "@/components/Motion";
import { AmosMark } from "@/components/amos/Logo";
import { EditionList, FeatureList } from "@/components/amos/Lists";
import ProductShowcase from "@/components/amos/ProductShowcase";
import Timeline from "@/components/amos/Timeline";
import AmosFaq from "@/components/amos/Faq";
import DemoForm from "@/components/amos/DemoForm";
import { AMOS_SHOTS } from "@/lib/amosShots";
import Integrations from "@/components/amos/Integrations";
import { EDITIONS, FAQ, FEATURES, IMPORTS, SCALES, STACK, TIMELINE } from "@/lib/amosProduct";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { COMPANY, EMAILS, OFFICES, SITE_URL, mainPhone, salesPhone } from "@/lib/site";

const TITLE = "AmOS 2.0: the operating system for agencies, care, property, staffing and hospitality";
const DESCRIPTION = "AmOS by Amphin runs the people, work and money of a service business: CRM, projects, shifts, attendance, payroll, invoicing and chat. Editions for agencies, care providers (CareOS), property managers (PropOS), staffing agencies (EmplyOS) and restaurants (RestOS).";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/amos", {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ["AmOS", "agency operating system", "CareOS", "PropOS", "EmplyOS", "RestOS", "staffing agency software", "care home shift management software", "property management software", "restaurant rota software", "payroll and clock in software", "business operating system"],
  });
}

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
const Arrow = () => <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" /></svg>;

const STEPS: [string, string][] = [
  ["Discover", "We map how your business runs today: your roles, approvals, shifts and the tools you want to replace."],
  ["Configure", "AmOS is set up around your structure: departments, permissions, pipelines, pay rules and pricing."],
  ["Migrate", "People, clients, projects and history move across from spreadsheets and old tools."],
  ["Train", "Hands-on sessions for owners, managers and staff, so every role knows its daily routine."],
  ["Go live and support", "We run alongside you for the first weeks and keep improving AmOS as you grow."],
];

export default function AmosPage({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const base = `/${region}`;
  const url = `${SITE_URL}${base}/amos`;
  const sales = salesPhone(region);
  const schema = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AmOS", alternateName: ["A Marketer's OS", "Amphin AgencyOS"],
      applicationCategory: "BusinessApplication", operatingSystem: "Web", softwareVersion: "2.0", description: DESCRIPTION, url,
      datePublished: TIMELINE[0].date, dateModified: TIMELINE[TIMELINE.length - 1].date,
      publisher: { "@type": "Organization", name: "Amphin", url: SITE_URL },
      featureList: [...FEATURES.map((f) => f.name), ...EDITIONS.map((e) => `${e.name}: ${e.tagline}`)],
      ...(AMOS_SHOTS.length ? { screenshot: AMOS_SHOTS.map((s) => s.src) } : {}),
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Amphin", item: `${SITE_URL}${base}` },
      { "@type": "ListItem", position: 2, name: "AmOS", item: url },
    ] },
  ];

  return (
    <>
      {/* ---------- hero ---------- */}
      <section id="overview" className="am-hero am-guides">
        <div className="am-wrap">
          <div className="am-hero-grid">
            <RevealLines as="h1" lines={["Run your whole", "business on one", "operating system"]} grad={2} />
            <Reveal delay={0.25}>
              <div className="am-hero-side">
                <div className="am-blob" aria-hidden="true" />
                <p>AmOS runs the people, work and money of a service business: leads, projects, shifts, attendance, payroll, invoices and chat. Version 2.0 adds editions for agencies, care, property, staffing and hospitality.</p>
                <a className="am-btn" href="#editions"><Arrow /> Discover</a>
                <br />
                <a className="am-watch" href="#showcase"><i><svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M1 0l9 5-9 5z" /></svg></i><span>See it working</span></a>
              </div>
            </Reveal>
          </div>
          <div className="am-stats">
            <Reveal><div className="am-stat"><b><Counter to={30} suffix="+" /></b><span>Built-in modules</span></div></Reveal>
            <Reveal delay={0.06}><div className="am-stat"><b><Counter to={EDITIONS.length} /></b><span>Editions and shared modules</span></div></Reveal>
            <Reveal delay={0.12}><div className="am-stat"><b><Counter to={3} /></b><span>Agencies testing AmOS today</span></div></Reveal>
            <Reveal delay={0.18}><div className="am-stat dark"><b>2.0</b><span>Released today</span></div></Reveal>
          </div>
        </div>
      </section>

      {/* ---------- why ---------- */}
      <section className="am-sec am-guides" aria-labelledby="why">
        <div className="am-wrap am-two">
          <div className="am-mark-big" aria-hidden="true"><AmosMark /></div>
          <div className="am-text">
            <span className="am-eyebrow">/ why we built it /</span>
            <div id="why"><RevealLines lines={["One system for the people,", "the work and the money"]} grad={1} /></div>
            <Reveal delay={0.1}>
              <p style={{ marginTop: 26 }}>Agencies and service businesses run on a patchwork of tools: one for leads, another for tasks, spreadsheets for attendance and payroll, chat apps for everything else. Information gets lost between them and nobody sees the whole picture.</p>
              <p>Amphin built AmOS to fix that inside its own agency first. Every client, project, person and payment at Amphin runs through it. The same foundation now powers editions for other kinds of business, because shifts, clock-ins, payroll and invoices work the same way whether you run a care home, a property portfolio, a staffing agency or a kitchen.</p>
              <p>AmOS has been handed to three agencies, which are testing it now.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- editions ---------- */}
      <section id="editions" className="am-sec" aria-labelledby="ed-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ editions /</span>
          <div id="ed-h"><RevealLines lines={["Pick the edition that", "fits your business"]} grad={1} /></div>
          <div style={{ marginTop: "clamp(26px, 3vw, 44px)" }}>
            <EditionList items={EDITIONS.map((e) => ({ key: e.key, name: e.name, meta: e.forWho }))} />
          </div>
        </div>
      </section>

      {/* ---------- dark showcase with demo screens ---------- */}
      <section id="showcase" className="am-dark" aria-label="AmOS editions in action">
        <div className="am-wrap"><ProductShowcase /></div>
      </section>

      {/* ---------- real screens ---------- */}
      {AMOS_SHOTS.length > 0 && (
        <section id="screens" className="am-sec" aria-labelledby="scr-h">
          <div className="am-wrap">
            <span className="am-eyebrow">/ real screens /</span>
            <div id="scr-h"><RevealLines lines={["A look inside AmOS"]} /></div>
            <p style={{ marginTop: 18, maxWidth: "58ch", fontSize: 15 }}>These screenshots come from AmOS's public demo workspace. It holds sample data only.</p>
            <div className="am-shots">
              {AMOS_SHOTS.map((s) => (
                <figure className="am-shot" key={s.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} loading="lazy" width={1440} height={900} />
                  <figcaption>{s.alt}<small>Demo workspace</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- features ---------- */}
      <section id="features" className="am-sec soft" aria-labelledby="ft-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ features /</span>
          <div id="ft-h"><RevealLines lines={["Everything a service", "business runs on"]} grad={1} /></div>
          <div style={{ marginTop: "clamp(26px, 3vw, 44px)" }}><FeatureList items={FEATURES} /></div>
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      {/* ---------- integrations ---------- */}
      <section id="integrations" className="am-sec" aria-labelledby="in-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ integrations /</span>
          <div id="in-h"><RevealLines lines={["Connects to the tools", "you already use"]} grad={1} /></div>
          <p style={{ marginTop: 18, marginBottom: 28, maxWidth: "64ch", fontSize: 15 }}>Invoicing, HR, time tracking, messaging, calendars, ads and industry systems. Connect them, import from them, or let AmOS replace them module by module.</p>
          <Integrations />
        </div>
      </section>

      {/* ---------- switch and import ---------- */}
      <section className="am-sec soft" aria-labelledby="sw-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ switch with confidence /</span>
          <div id="sw-h"><RevealLines lines={["Bring your data.", "Keep it safe."]} grad={1} /></div>
          <div className="am-two">
            {IMPORTS.map((x, i) => <Reveal key={x.t} delay={i * 0.05}><div style={{ background: "#fff" }}><h3>{x.t}</h3><p>{x.d}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      {/* ---------- built for every size ---------- */}
      <section className="am-sec" aria-labelledby="sc-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ every size of business /</span>
          <div id="sc-h"><RevealLines lines={["From a small team", "to a large organisation"]} grad={1} /></div>
          <div className="am-three">
            {SCALES.map((x, i) => <Reveal key={x.t} delay={i * 0.06}><div><h3>{x.t}</h3><p>{x.d}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      {/* ---------- stack ---------- */}
      <section id="stack" className="am-dark" aria-labelledby="st-h">
        <div className="am-wrap" style={{ padding: "clamp(56px, 7vw, 110px) 0" }}>
          <span className="am-eyebrow" style={{ color: "#ff6a72" }}>/ under the hood /</span>
          <div id="st-h"><RevealLines lines={["The technology AmOS", "runs on"]} /></div>
          <div className="am-stack">
            {STACK.map((g) => <div key={g.group}><h3>{g.group}</h3><ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      <section id="timeline" className="am-sec" aria-labelledby="tl-h">
        <div className="am-wrap" style={{ marginBottom: "clamp(30px, 4vw, 56px)" }}>
          <span className="am-eyebrow">/ timeline /</span>
          <div id="tl-h"><RevealLines lines={["From the first idea", "to AmOS 2.0"]} grad={1} /></div>
          <p style={{ marginTop: 18, maxWidth: "62ch", fontSize: 15 }}>Scroll to play AmOS's story, from the first research conversations to AmOS 2.0, or open the bars underneath to read each change.</p>
        </div>
        <div className="am-wrap" style={{ width: "min(1500px, calc(100% - 2 * clamp(8px, 1.4vw, 20px)))" }}>
          <Timeline />
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="am-sec soft" aria-labelledby="pr-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ how we roll it out /</span>
          <div id="pr-h"><RevealLines lines={["From first call", "to go-live"]} grad={1} /></div>
          <div className="am-steps">
            {STEPS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}><div className="am-step"><span>/ {String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- built on AmOS ---------- */}
      <section className="am-sec" aria-labelledby="bt-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ built on amos /</span>
          <div id="bt-h"><RevealLines lines={["Editions built for real", "businesses"]} grad={1} /></div>
          <div className="am-built">
            <a href={`${base}/work/carenest-website-agency-os`}><small>CareOS</small><h3>Care Nest</h3><p>A nursing and healthcare recruitment agency: staff, placements and shifts in one system.</p></a>
            <a href={`${base}/work/propkit-os`}><small>PropOS</small><h3>PropKit and Parrot Realty</h3><p>Property management software for property clients: portfolios, tenants, rent and maintenance.</p></a>
            <a href={`${base}/about`}><small>AmOS Core</small><h3>Amphin itself</h3><p>Amphin runs its own agency on AmOS every day, from the first enquiry to the final invoice.</p></a>
          </div>
        </div>
      </section>

      {/* ---------- about Amphin ---------- */}
      <section id="amphin" className="am-sec soft" aria-labelledby="am-h">
        <div className="am-wrap am-amphin">
          <div>
            <span className="am-eyebrow">/ built by amphin /</span>
            <div id="am-h"><RevealLines lines={["AmOS is made by Amphin"]} grad={0} /></div>
            <Reveal delay={0.1}>
              <p style={{ marginTop: 24, maxWidth: "56ch", fontSize: 15 }}>{COMPANY.trademark} is a growth marketing and creative agency with offices in London, Kochi and Abu Dhabi. We build brands, websites, apps and campaigns for businesses, and we build the software we use to run them.</p>
              <p style={{ maxWidth: "56ch", fontSize: 15 }}>Amphin's team uses AmOS every day. When a client needs a system that does not exist yet, we build it on the same foundation.</p>
              <div className="am-cta-row">
                <a className="am-btn" href={base}><Arrow /> Visit the Amphin website</a>
                <a className="am-btn outline" href={`${base}/about`}>About Amphin</a>
              </div>
            </Reveal>
          </div>
          <dl>
            <div><dt>Company</dt><dd>{COMPANY.ukEntity}, {COMPANY.ukRegistration}, company no. {COMPANY.ukCompanyNumber}. {COMPANY.indiaEntity}: {COMPANY.indiaRegistration}.</dd></div>
            {OFFICES.map((o) => <div key={o.slug}><dt>{o.city}</dt><dd>{(o.address.length > 1 ? o.address.slice(0, -1) : o.address).join(", ")}</dd></div>)}
            <div><dt>Sales</dt><dd><a href={tel(sales)}>{sales}</a></dd></div>
            <div><dt>Main line</dt><dd><a href={tel(mainPhone(region))}>{mainPhone(region)}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></dd></div>
            <div><dt>More</dt><dd><a href={`${base}/work`}>Our work</a> · <a href={`${base}/services`}>Services</a> · <a href={`${base}/careers`}>Careers</a></dd></div>
          </dl>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section id="faq" className="am-sec" aria-labelledby="fq-h">
        <div className="am-wrap">
          <span className="am-eyebrow">/ questions /</span>
          <div id="fq-h"><RevealLines lines={["AmOS: common questions"]} grad={0} /></div>
          <AmosFaq />
        </div>
      </section>

      {/* ---------- demo ---------- */}
      <section id="demo" className="am-form-sec" aria-labelledby="dm-h">
        <div className="am-wrap am-form-grid">
          <div>
            <span className="am-eyebrow" style={{ color: "#a9a9b2" }}>/ book a demo /</span>
            <div id="dm-h"><RevealLines lines={["See AmOS running", "your business"]} grad={1} /></div>
            <p>Tell us about your team and how you work today. We'll show AmOS set up for a business like yours and plan the setup, data migration and training with you.</p>
            <p style={{ marginTop: 10 }}>Prefer to talk? Call sales on <a href={tel(sales)} style={{ color: "#fff", textDecoration: "underline" }}>{sales}</a>.</p>
          </div>
          <DemoForm region={region} />
        </div>
      </section>

      {schema.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
    </>
  );
}
