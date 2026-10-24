import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Blocks";
import PageHero from "@/components/PageHero";
import ApplyForm from "@/components/forms/ApplyForm";
import { getJob, getJobs } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import { REGION_CODES, type RegionCode } from "@/lib/regions";
import { COMPANY, PHONES } from "@/lib/site";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return REGION_CODES.flatMap((region) => jobs.map((j) => ({ region, slug: j.slug })));
}
export async function generateMetadata({ params }: { params: { region: string; slug: string } }) {
  const j = await getJob(params.slug);
  return regionalMeta(params.region, `/careers/${params.slug}`, { title: j ? `${j.title} · Careers` : "Careers" });
}

export default async function JobPage({ params }: { params: { region: RegionCode; slug: string } }) {
  const j = await getJob(params.slug);
  if (!j) notFound();
  const region = params.region;
  const schema = {
    "@context": "https://schema.org", "@type": "JobPosting", title: j.title, employmentType: j.type.toUpperCase().replace(/[^A-Z]/g, "_"),
    hiringOrganization: { "@type": "Organization", name: COMPANY.brand, sameAs: "https://amphin.agency" },
    jobLocationType: /remote/i.test(j.location) ? "TELECOMMUTE" : undefined,
    description: [...j.description, ...j.responsibilities].join(" "),
  };
  return (
    <>
      <PageHero title={[j.title]} lead={`${j.type} · ${j.location}${j.salary ? ` · ${j.salary}` : ""}`} crumbs={[{ href: `/${region}/careers`, label: "careers" }, { href: `/${region}/careers/${j.slug}`, label: j.slug }]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          <div className="prose">
            <h2>About the role</h2>
            {j.description.map((d, i) => <p key={i}>{d}</p>)}
            {j.responsibilities.length > 0 && (<><h2>Responsibilities</h2><ul>{j.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul></>)}
            {j.qualifications.length > 0 && (<><h2>What we&apos;re looking for</h2><ul>{j.qualifications.map((r) => <li key={r}>{r}</li>)}</ul></>)}
            <p className="muted">Questions? Call HR on <a href={`tel:${PHONES.hr.replace(/[^+\d]/g, "")}`}>{PHONES.hr}</a>.</p>
          </div>
          <div>
            <div className="rule"><Eyebrow>apply</Eyebrow></div>
            <ApplyForm job={j.slug} title={j.title} region={region} />
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
