import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { Arrow } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { LEGAL } from "@/lib/legal";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/legal", { title: "Legal" });
}

export default function Legal({ params }: { params: { region: RegionCode } }) {
  return (
    <>
      <PageHero title={["Legal"]} lead="Policies, terms and company information for Amphin LTD (UK) and Amphin (India)." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="rule"><Eyebrow>documents</Eyebrow></div>
          <div className="table-rows">
            {LEGAL.map((l) => (
              <Link key={l.slug} href={`/${params.region}/legal/${l.slug}`}>
                <span className="mono muted">v{l.version.split(" ")[0]}</span>
                <span style={{ fontSize: 17 }}>{l.title}</span>
                <span className="muted">{l.summary}</span>
                <span className="link-arrow" style={{ justifySelf: "end" }}>Read <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
