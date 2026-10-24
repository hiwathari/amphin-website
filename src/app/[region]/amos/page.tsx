import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import { Reveal, RevealLines, ScrollText } from "@/components/Motion";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { SITE_URL } from "@/lib/site";
import { AMOS_SHOTS } from "@/lib/amosShots";

const TITLE = "AmOS: the Agency Operating System by Amphin";
const DESCRIPTION = "AmOS is Amphin's agency operating system: CRM, clients, projects, tasks, content calendar, HR, attendance, payroll, invoicing, chat and a website CMS in one place. Built for agencies and any business that runs on people and work.";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/amos", {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ["agency operating system", "agency management software", "AmOS", "marketing agency CRM", "agency project management", "staff management software", "HR and payroll for agencies", "all-in-one business OS"],
  });
}

const MODULES: [string, string, string[]][] = [
  ["Sales & clients", "Leads move stage by stage with a Due Today filter, so nothing goes cold. Every client gets a health score, tier and monthly value.", ["CRM and lead pipeline", "Client accounts and client portal", "Sales reports", "Onboarding checklists"]],
  ["Work & delivery", "Projects, tasks and deliverables in one flow, from brief to approval, with workload and capacity views.", ["Projects and tasks", "Content calendar", "Production and deliveries", "Approvals and feedback"]],
  ["People & HR", "Everything about the team in one place, with the hiring pipeline built in.", ["Employees and org chart", "Attendance, leave and holidays", "Payroll and salary slips", "Hiring pipeline with notes"]],
  ["Money", "Know where the business stands today, not at month end.", ["Invoices", "Expenses", "Finance reports", "Executive dashboard"]],
  ["Communication", "Fewer apps to switch between.", ["Team chat (R-Chat)", "Shared email inbox", "Announcements", "Notifications"]],
  ["Website (Studio)", "Run the company website from the same login: blogs, portfolio, services, vacancies and approvals.", ["Website CMS with approvals", "Media library with compression", "Visitor analytics", "Fonts, colours and motion settings"]],
];

const PROCESS: [string, string][] = [
  ["Discover", "We map how your business runs today: your services, roles, approvals and the tools you want to replace."],
  ["Configure", "AmOS is set up around your structure: departments, roles and permissions, pipelines, services and pricing."],
  ["Migrate", "Clients, staff, projects and history move across from spreadsheets and old tools."],
  ["Train", "Hands-on sessions for owners, managers and staff, so every role knows its daily routine in AmOS."],
  ["Go live & support", "We run it alongside you for the first weeks and keep improving it as your business grows."],
];

const FAQ: [string, string][] = [
  ["What is AmOS?", "AmOS (A Marketer's OS) is an agency operating system built by Amphin. It brings CRM, clients, projects, tasks, HR, attendance, payroll, invoicing, chat and the company website into one secure system."],
  ["Who is AmOS for?", "Marketing and creative agencies first, and any business that runs on people, work and clients: studios, consultancies, care agencies, property managers and service companies."],
  ["Is AmOS already in use?", "Yes. Amphin runs its own agency on AmOS every day, and AmOS has been handed over to three agencies, which are currently testing it."],
  ["Can AmOS be customised?", "Yes. Roles, permissions, pipelines, services and modules are set up around each business, and Amphin builds new modules where needed. Care Nest's care-agency OS and PropKit OS for property management are built on the same foundations."],
  ["How do I get AmOS for my business?", "Book a demo below. We'll show it working on your kind of business and plan the setup, data migration and training with you."],
];

export default function AmosPage({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const base = `/${region}`;
  const url = `${SITE_URL}${base}/amos`;
  const schema = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AmOS", alternateName: ["A Marketer's OS", "Amphin AgencyOS"],
      applicationCategory: "BusinessApplication", operatingSystem: "Web", description: DESCRIPTION, url,
      publisher: { "@type": "Organization", name: "Amphin", url: SITE_URL },
      featureList: MODULES.flatMap(([, , f]) => f),
      ...(AMOS_SHOTS.length ? { screenshot: AMOS_SHOTS.map((s) => s.src) } : {}),
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];

  return (
    <>
      <PageHero seed="amos-agency-os" title={["AmOS, the agency", "operating system"]} lead="Our own operating system, built inside Amphin and running every client, project, person and payment we handle. Now we set it up for other businesses too."
        crumbs={[{ href: base, label: "Home" }, { href: `${base}/amos`, label: "AmOS" }]} />

      <section className="section">
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <div className="rule"><Eyebrow>why we built it</Eyebrow></div>
            <RevealLines lines={["One system for the", "whole business"]} grad={1} />
            <Reveal delay={0.1}>
              <p className="muted" style={{ marginTop: 20 }}>
                Agencies run on a patchwork of tools: one for leads, one for tasks, spreadsheets for attendance and payroll, chat apps for everything else.
                Information gets lost between them and nobody sees the whole picture. Amphin&apos;s founder set out to fix that inside our own agency first.
              </p>
              <p className="muted">
                The vision is simple: one place where the owner sees the business as it is today, managers can plan and approve, and every person on the team knows exactly what to do next.
                Every client we serve is run through AmOS, from the first enquiry to the final invoice.
              </p>
              <div className="stat-row">
                <div><span className="stat-num" style={{ fontSize: 56 }}>1</span><span className="stat-label">login for the whole team</span></div>
                <div><span className="stat-num" style={{ fontSize: 56 }}>3</span><span className="stat-label">agencies testing AmOS</span></div>
                <div><span className="stat-num" style={{ fontSize: 56 }}>30+</span><span className="stat-label">built-in modules</span></div>
              </div>
            </Reveal>
          </div>
          {AMOS_SHOTS[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={AMOS_SHOTS[0].src} alt={AMOS_SHOTS[0].alt} style={{ width: "100%", borderRadius: 18, border: "1px solid var(--line)" }} />
          )}
        </div>
      </section>

      <ScrollText text="crm · projects · people · payroll · website · one os" />

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>what&apos;s inside</Eyebrow></div>
          <h2 style={{ marginBottom: 30 }}>Everything a service business runs on</h2>
          <div className="celeb-pillars">
            {MODULES.map(([t, d, f], i) => (
              <Reveal key={t} delay={(i % 3) * 0.06}>
                <article className="celeb-pillar">
                  <span className="stat-num" style={{ fontSize: 40 }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3><p>{d}</p><ul>{f.map((x) => <li key={x}>{x}</li>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {AMOS_SHOTS.length > 1 && (
        <section className="section">
          <div className="wrap">
            <div className="rule"><Eyebrow>screens</Eyebrow></div>
            <h2 style={{ marginBottom: 30 }}>A look inside AmOS</h2>
            <div className="grid cols-2" style={{ gap: 22 }}>
              {AMOS_SHOTS.slice(1).map((s) => (
                <figure key={s.src} style={{ margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} loading="lazy" style={{ width: "100%", borderRadius: 16, border: "1px solid var(--line)" }} />
                  <figcaption className="mono muted" style={{ fontSize: 12, marginTop: 8 }}>{s.alt} (demo data)</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>how we roll it out</Eyebrow></div>
          <RevealLines lines={["From first call", "to go-live"]} grad={1} />
          <div className="grid cols-4" style={{ marginTop: 40, gap: 26 }}>
            {PROCESS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}><div className="feature"><span className="mono muted">/ {String(i + 1).padStart(2, "0")}</span><h3 style={{ fontSize: 18 }}>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>built on amos</Eyebrow></div>
          <h2 style={{ marginBottom: 24 }}>Systems we&apos;ve built on the same foundations</h2>
          <div className="table-rows">
            <Link href={`${base}/work/carenest-website-agency-os`}><span className="mono muted">care</span><span>Care Nest care-agency OS</span><span className="muted">Staff, placements and shifts for a nursing recruitment agency</span><span className="link-arrow" style={{ justifySelf: "end" }}>View <Arrow /></span></Link>
            <Link href={`${base}/work/propkit-os`}><span className="mono muted">property</span><span>PropKit OS</span><span className="muted">Property management software for our property clients</span><span className="link-arrow" style={{ justifySelf: "end" }}>View <Arrow /></span></Link>
            <Link href={`${base}/work/invero-wealth`}><span className="mono muted">delivery</span><span>Invero Wealth dashboard</span><span className="muted">Client dashboard, system rollout and staff training</span><span className="link-arrow" style={{ justifySelf: "end" }}>View <Arrow /></span></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>questions</Eyebrow></div>
          <h2 style={{ marginBottom: 24 }}>AmOS: common questions</h2>
          <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="section" id="demo">
        <div className="wrap grid cols-2" style={{ gap: 60 }}>
          <div>
            <div className="rule"><Eyebrow>demo</Eyebrow></div>
            <RevealLines lines={["See AmOS running", "your business"]} />
            <p className="muted" style={{ marginTop: 20 }}>Tell us about your team and how you work today. We&apos;ll book a walkthrough and show you what setup looks like.</p>
            <a className="link-arrow" href="https://os.amphin.agency/demo" target="_blank" rel="noopener">Try the public demo <Arrow /></a>
          </div>
          <ContactForm region={region} form="quote" title="Book an AmOS demo" defaultService="amos" services={[{ value: "amos", label: "AmOS agency operating system" }]} />
        </div>
      </section>

      <CtaBand region={region} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
