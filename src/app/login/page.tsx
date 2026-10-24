import type { Metadata } from "next";
import Link from "next/link";
import { AMOS_URL, EMAILS } from "@/lib/site";

export const metadata: Metadata = { title: "Login", robots: { index: false } };

// The public site has no accounts of its own. Both doors lead into AMOS, which owns authentication,
// roles and the Website dashboard, so there is no admin surface on amphin.agency to attack.
export default function Login() {
  const doors = [
    { title: "Staff", body: "Team members sign in to AMOS to manage clients, projects and the website (posts, services, portfolio, jobs, pricing).", href: `${AMOS_URL}/login`, cta: "Staff login" },
    { title: "Clients", body: "Clients sign in to the Amphin portal to see deliverables, approvals, invoices and reports.", href: `${AMOS_URL}/portal/login`, cta: "Client portal" },
  ];
  return (
    <>
      <div className="frame-glow" />
      <main className="frame" style={{ minHeight: "calc(100vh - 28px)", display: "grid", placeItems: "center", padding: "60px 16px" }}>
        <div style={{ width: "100%", maxWidth: 880, display: "grid", gap: 36 }}>
          <Link href="/" aria-label="Amphin home" style={{ justifySelf: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/amphin-logo.png" alt="Amphin" width={180} height={58} />
          </Link>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", textAlign: "center" }}>Sign in</h1>
          <div className="grid cols-2">
            {doors.map((d) => (
              <a key={d.title} href={d.href} className="row-card" rel="noopener">
                <h3>{d.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{d.body}</p>
                <span className="btn-pill" style={{ width: "fit-content" }}>{d.cta}</span>
              </a>
            ))}
          </div>
          <p className="muted" style={{ textAlign: "center", fontSize: 14 }}>
            Trouble signing in? Email <a style={{ color: "var(--accent)" }} href={`mailto:${EMAILS.support}`}>{EMAILS.support}</a>.
          </p>
        </div>
      </main>
    </>
  );
}
