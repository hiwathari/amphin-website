import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import { Arrow } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { getJobs } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { EMAILS, PHONES } from "@/lib/site";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/careers", { title: "Careers", description: "Join Amphin's creative team in London, Kochi or remotely." });
}

export default function Careers({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const jobs = getJobs();
  return (
    <>
      <PageHero title={["Build your career", "at Amphin"]} lead="We hire designers, editors, videographers, marketers and developers who care about craft. Remote and studio roles across the UK and India." />
      <section className="section">
        <div className="wrap">
          <div className="rule"><Eyebrow>current openings</Eyebrow></div>
          <div className="table-rows">
            {jobs.map((j) => (
              <Link key={j.slug} href={`/${region}/careers/${j.slug}`}>
                <span className="mono muted">{j.type}</span>
                <span style={{ fontSize: 18 }}>{j.title}</span>
                <span className="muted">{j.location}{j.salary ? ` · ${j.salary}` : ""}</span>
                <span className="link-arrow" style={{ justifySelf: "end" }}>Apply <Arrow /></span>
              </Link>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 30 }}>
            No role that fits? Send your CV and portfolio to <a className="link-arrow" style={{ display: "inline", border: 0 }} href={`mailto:${EMAILS.hello}?subject=Speculative application`}>{EMAILS.hello}</a>.
            HR (India and UK): <a href={`tel:${PHONES.hr.replace(/[^+\d]/g, "")}`}>{PHONES.hr}</a>
          </p>
        </div>
      </section>
      <CtaBand region={region} title="Join the team" />
    </>
  );
}
