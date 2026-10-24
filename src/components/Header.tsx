"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { REGIONS, REGION_CODES, type RegionCode } from "@/lib/regions";

interface NavPillar { slug: string; title: string }

export default function Header({ region, pillars, phone }: { region: RegionCode; pillars: NavPillar[]; phone: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname() || "";
  const base = `/${region}`;
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const is = (p: string) => (path === `${base}${p}` || (p !== "" && path.startsWith(`${base}${p}/`)) ? "page" : undefined);
  const rest = path.replace(/^\/(uk|eu|us|in|ae)/, "") || "";

  return (
    <header className="header">
      <div className="header-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Icon name="menu" size={18} />
          </button>
          <Link href={base} className="logo" aria-label="Amphin home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/amphin-logo.png" alt="Amphin" width={160} height={51} />
          </Link>
        </div>

        <nav className="nav" aria-label="Main">
          <Link href={base} aria-current={path === base ? "page" : undefined}>Home</Link>
          <Link href={`${base}/about`} aria-current={is("/about")}>About</Link>
          <div className="has-menu">
            <Link href={`${base}/services`} aria-current={is("/services")}>Services <svg className="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg></Link>
            <div className="menu">
              <Link href={`${base}/make-me-a-celebrity`} className="menu-star">★ Make Me a Celebrity <small>signature</small></Link>
              {pillars.map((p) => (
                <Link key={p.slug} href={`${base}/services/${p.slug}`}>{p.title}</Link>
              ))}
            </div>
          </div>
          <Link href={`${base}/work`} aria-current={is("/work")}>Work</Link>
          <Link href={`${base}/blog`} aria-current={is("/blog")}>Blog</Link>
          <Link href={`${base}/careers`} aria-current={is("/careers")}>Careers</Link>
          <Link href={`${base}/contact`} aria-current={is("/contact")}>Contact</Link>
        </nav>

        <div className="header-tools">
          <a className="header-phone" href={`tel:${phone.replace(/[^+\d]/g, "")}`}><span>tel: </span>{phone}</a>
          <details className="region-switch">
            <summary aria-label="Change region">{REGIONS[region].code.toUpperCase()} {REGIONS[region].symbol.trim()}</summary>
            <div className="region-list">
              {REGION_CODES.map((c) => (
                <a key={c} href={`/${c}${rest}`} aria-current={c === region}>
                  <span>{REGIONS[c].label}</span><span className="mono muted">{REGIONS[c].symbol.trim()}</span>
                </a>
              ))}
            </div>
          </details>
          <Link href={`${base}/quote`} className="btn-pill" style={{ display: "var(--cta-display, inline-flex)" }}>Get in touch</Link>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" role="dialog" aria-label="Menu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/amphin-logo.png" alt="Amphin" width={130} height={42} />
            <button className="burger" aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" size={18} /></button>
          </div>
          {[
            ["", "Home"], ["/about", "About"], ["/services", "Services"], ["/make-me-a-celebrity", "Make Me a Celebrity ★"], ["/work", "Work"],
            ["/blog", "Blog"], ["/careers", "Careers"], ["/connect", "Amphin Connect"], ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link key={href} href={`${base}${href}`}>{label}</Link>
          ))}
          <Link href="/login" style={{ color: "var(--muted)", fontSize: 18 }}>Login</Link>
          <Link href={`${base}/quote`} className="btn-pill btn-accent" style={{ marginTop: 18, fontSize: 13 }}>Get a quote</Link>
        </div>
      )}
    </header>
  );
}
