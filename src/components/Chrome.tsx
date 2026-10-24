// Server-rendered parts of the frame: top info bar, CTA band and footer. Offices and social accounts
// come from AMOS (Website → Offices / Socials) through the content feed.
import Link from "next/link";
import { COMPANY, EMAILS, PHONES, WHATSAPP, mainPhone, officeFor, salesPhone, type Office } from "@/lib/site";
import type { RegionCode } from "@/lib/regions";
import type { Social } from "@/lib/content";
import LiquidArt from "./LiquidArt";
import NewsletterForm from "./forms/NewsletterForm";

const tel = (p: string) => `tel:${p.replace(/[^+\d]/g, "")}`;

export function TopBar({ region, socials }: { region: RegionCode; socials: Social[] }) {
  const phone = mainPhone(region);
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

export function CtaBand({ region, title = "Get in touch!", href, cta = "Get in touch" }: { region: RegionCode; title?: string; href?: string; cta?: string }) {
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
        <Link href={href ?? `/${region}/quote`} className="btn-circle magnetic">{cta}</Link>
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
            <li>Call: <a href={tel(mainPhone(region))}>{mainPhone(region)}</a></li>
            <li>Sales: <a href={tel(salesPhone(region))}>{salesPhone(region)}</a></li>
            <li>WhatsApp: <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">{PHONES.london}</a></li>
            <li><a className="accent-link" href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></li>
            <li><a href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a> (clients)</li>
            <li><a href={`mailto:${EMAILS.marketing}`}>{EMAILS.marketing}</a> (partnerships)</li>
          </ul>
        </div>
        <div>
          <h5>Main menu</h5>
          <ul>
            {[["/services", "Services"], ["/work", "Work"], ["/pricing", "Pricing"], ["/about", "About"], ["/about/team", "Team"], ["/blog", "Blog"],
              ["/make-me-a-celebrity", "Make Me a Celebrity"], ["/amos", "AmOS agency OS"], ["/careers", "Careers"], ["/connect", "Amphin Connect"], ["/gallery", "Gallery"], ["/faq", "FAQ"], ["/locations", "Locations"]].map(([h, l]) => (
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

/** Floating WhatsApp chat button, bottom-left so it never covers the back-to-top button. */
export function WhatsAppButton() {
  return (
    <a className="wa-float" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Amphin, I'd like to talk about a project.")}`}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with Amphin on WhatsApp">
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.3.6 4.5 1.8 6.4L3 29l7.2-2c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.1-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.3 9.8 10.1 5.1 16 5.1s10.6 4.7 10.6 10.5S21.9 26.2 16 26.2zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
    </a>
  );
}
