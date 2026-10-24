// Server-rendered parts of the frame: top info bar, CTA band and footer.
import Link from "next/link";
import { COMPANY, EMAILS, OFFICES, SOCIALS, officeFor, salesPhone } from "@/lib/site";
import type { RegionCode } from "@/lib/regions";
import NewsletterForm from "./forms/NewsletterForm";

export function TopBar({ region }: { region: RegionCode }) {
  const phone = salesPhone(region);
  return (
    <div className="topbar">
      <div>
        Have any questions? <b><a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a></b>
        <span className="sep" />
        Mail us <b><a href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></b>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/login">Login</Link>
        <span>Follow us</span>
        <span className="sep" style={{ margin: 0 }} />
        {SOCIALS.slice(0, 5).map((s) => (
          <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="mono" style={{ textTransform: "uppercase", color: "var(--text)" }}>
            {s.short}
          </a>
        ))}
      </div>
    </div>
  );
}

export function CtaBand({ region, title = "Get in touch!" }: { region: RegionCode; title?: string }) {
  return (
    <section className="wrap" style={{ paddingBottom: "clamp(40px, 6vw, 80px)" }}>
      <div className="cta-band">
        <h2>{title}</h2>
        <Link href={`/${region}/quote`} className="btn-circle">Get in touch</Link>
      </div>
    </section>
  );
}

export function Footer({ region }: { region: RegionCode }) {
  const home = officeFor(region);
  const others = OFFICES.filter((o) => o.slug !== home.slug && !o.comingSoon);
  const base = `/${region}`;
  const year = new Date().getFullYear();
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/amphin-logo.png" alt="Amphin" width={150} height={48} style={{ height: 30, width: "auto" }} />
        <div className="socials">
          {SOCIALS.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>{s.short}</a>
          ))}
        </div>
      </div>
      <div className="footer-cols">
        <div>
          <h5>{home.city}</h5>
          <p>{home.address.map((l) => <span key={l}>{l}<br /></span>)}</p>
          {home.phone && <p><a href={`tel:${home.phone.replace(/[^+\d]/g, "")}`}>{home.phone}</a></p>}
          <h5 style={{ marginTop: 22 }}>Other offices</h5>
          <ul>
            {others.map((o) => <li key={o.slug}><Link href={`${base}/contact/${o.slug}`}>{o.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li>Sales: <a href={`tel:${salesPhone(region).replace(/[^+\d]/g, "")}`}>{salesPhone(region)}</a></li>
            <li><a className="accent-link" href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></li>
            <li><a href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a> (clients)</li>
            <li><a href={`mailto:${EMAILS.marketing}`}>{EMAILS.marketing}</a> (partnerships)</li>
          </ul>
        </div>
        <div>
          <h5>Main menu</h5>
          <ul>
            <li><Link href={`${base}/services`}>Services</Link></li>
            <li><Link href={`${base}/work`}>Work</Link></li>
            <li><Link href={`${base}/pricing`}>Pricing</Link></li>
            <li><Link href={`${base}/about`}>About</Link></li>
            <li><Link href={`${base}/blog`}>Blog</Link></li>
            <li><Link href={`${base}/careers`}>Careers</Link></li>
            <li><Link href={`${base}/connect`}>Amphin Connect</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>
        <div>
          <h5>Newsletter</h5>
          <p className="muted">Growth ideas and new work, once a month.</p>
          <NewsletterForm region={region} />
        </div>
      </div>
      <div className="footer-legal">
        <span>
          © {year} {COMPANY.ukEntity}. {COMPANY.trademark} is a registered trademark. {COMPANY.ukRegistration}, company no. {COMPANY.ukCompanyNumber}. {COMPANY.indiaRegistration}.
        </span>
        <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href={`${base}/legal/privacy-policy`}>Privacy</Link>
          <Link href={`${base}/legal/cookie-policy`}>Cookies</Link>
          <Link href={`${base}/legal/terms-of-use`}>Terms</Link>
          <Link href={`${base}/legal`}>All legal</Link>
        </span>
      </div>
    </footer>
  );
}
