import Link from "next/link";
import { Eyebrow } from "@/components/Blocks";
import { CtaBand } from "@/components/Chrome";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { getContent, getServices } from "@/lib/content";
import { regionalMeta } from "@/lib/meta";
import type { RegionCode } from "@/lib/regions";
import { EMAILS, PHONES, officeFor } from "@/lib/site";

export function generateMetadata({ params }: { params: { region: string } }) {
  return regionalMeta(params.region, "/contact", { title: "Contact", description: "Contact Amphin in London, Kochi or Abu Dhabi." });
}

export default async function Contact({ params }: { params: { region: RegionCode } }) {
  const region = params.region;
  const [c, services] = await Promise.all([getContent(), getServices()]);
  const home = officeFor(region, c.offices);
  const offices = [home, ...c.offices.filter((o) => o.slug !== home.slug)];
  return (
    <>
      <PageHero title={["Contacts"]} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60 }}>
          <div>
            <h2>Get in touch</h2>
            <p className="muted" style={{ marginTop: 18, maxWidth: 480 }}>Tell us about your brand, your goals and your timeline. We reply to every enquiry within one working day.</p>
            <div className="grid cols-2" style={{ marginTop: 34, gap: 28 }}>
              {offices.map((o) => (
                <div key={o.slug}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0 }}><Link href={`/${region}/contact/${o.slug}`}>{o.city}</Link></h4>
                  <p style={{ fontSize: 14, margin: "8px 0" }}>{o.address.map((l) => <span key={l}>{l}<br /></span>)}</p>
                  {o.phone && <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} style={{ fontSize: 14 }}>{o.phone}</a>}
                </div>
              ))}
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0 }}>Email</h4>
                <p style={{ fontSize: 14, margin: "8px 0" }}>
                  <a style={{ color: "var(--accent)" }} href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a><br />
                  <a href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a> (clients)<br />
                  <a href={`mailto:${EMAILS.marketing}`}>{EMAILS.marketing}</a> (partnerships)
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0 }}>Phone</h4>
                <p style={{ fontSize: 14, margin: "8px 0" }}>
                  Sales India: {PHONES.salesIndia}<br />HR (India and UK): {PHONES.hr}
                </p>
                <div className="socials">{c.socials.map((s) => <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>{s.short}</a>)}</div>
              </div>
            </div>
          </div>
          <ContactForm region={region} services={services.map((s) => ({ value: s.slug, label: s.title }))} />
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: 40 }}>
        <iframe
          title={`Map: ${home.name}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(home.mapQuery)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ width: "100%", height: 420, border: 0, borderRadius: 18, filter: "grayscale(1) invert(.9) contrast(.9)" }}
        />
      </section>
      <CtaBand region={region} />
    </>
  );
}
