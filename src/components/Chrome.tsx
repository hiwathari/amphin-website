// Server-rendered parts of the frame: top info bar, CTA band and footer. Offices and social accounts
// come from AMOS (Website → Offices / Socials) through the content feed.
import Link from "next/link";
import { COMPANY, EMAILS, officeFor, salesPhone, type Office } from "@/lib/site";
import type { RegionCode } from "@/lib/regions";
import type { Social } from "@/lib/content";
import LiquidArt from "./LiquidArt";
import NewsletterForm from "./forms/NewsletterForm";

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, "")}`;

export function TopBar({ region, socials }: { region: RegionCode; socials: Social[] }) {
  const phone = salesPhone(region);
  return (
    <div className="topbar">
      <div>
        Have any questions? <b><a href={tel(phone)}>{phone}</a></b>
        <span className="sep" />
        Mail us <b><a href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></b>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/login">Login</Link>
        <span>Follow us</span>
        <span className="sep" style={{ margin: 0 }} />
        {socials.slice(0, 6).map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="mono" style={{ textTransform: "uppercase", color: "var(--text)" }}>
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
        <LiquidArt seed="amphin-cta-band" style={{ position: "absolute", inset: 0, opacity: 0.55, mixBlendMode: "overlay" }} />
        <h2>
          {title}
          <svg className="scribble" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6 26 C120 10 260 8 420 14 S560 22 594 18 M40 34 C180 24 330 22 470 28" pathLength={1} />
          </svg>
        </h2>
        <Link href={`/${region}/quote`} className="btn-circle magnetic">Get in touch</Link>
      </div>
    </section>
  );
}

export function Footer({ region, offices, socials }: { region: RegionCode; offices: Office[]; socials: Social[] }) {
  const home = officeFor(region, offices);
  const others = offices.filter((o) => o.slug !== home.slug);
  const base = `/${region}`;
  const year = new Date().getFullYear();
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/amphin-logo.png" alt="Amphin" width={150} height={48} style={{ height: 30, width: "auto" }} />
        <div className="socials">
          {socials.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>{s.short}</a>)}
        </div>
      </div>
      <div className="footer-cols">
        <div>
          <h5>{home.city}</h5>
          <p>{home.address.map((l) => <span key={l}>{l}<br /></span>)}</p>
          {home.phone && <p><a href={tel(home.phone)}>{home.phone}</a></p>}
          <h5 style={{ marginTop: 22 }}>Other offices</h5>
          <ul>{others.map((o) => <li key={o.slug}><Link href={`${base}/contact/${o.slug}`}>{o.name}</Link></li>)}</ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li>Sales: <a href={tel(salesPhone(region))}>{salesPhone(region)}</a></li>
            <li><a className="accent-link" href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></li>
            <li><a href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a> (clients)</li>
            <li><a href={`mailto:${EMAILS.marketing}`}>{EMAILS.marketing}</a> (partnerships)</li>
          </ul>
        </div>
        <div>
          <h5>Main menu</h5>
          <ul>
            {[["/services", "Services"], ["/work", "Work"], ["/pricing", "Pricing"], ["/about", "About"], ["/about/team", "Team"], ["/blog", "Blog"],
              ["/make-me-a-celebrity", "Make Me a Celebrity"], ["/careers", "Careers"], ["/connect", "Amphin Connect"], ["/gallery", "Gallery"], ["/faq", "FAQ"], ["/locations", "Locations"]].map(([h, l]) => (
              <li key={h}><Link href={`${base}${h}`}>{l}</Link></li>
            ))}
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
