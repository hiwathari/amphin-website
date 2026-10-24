"use client";
import { Honeypot, useSubmit } from "./useSubmit";
import type { RegionCode } from "@/lib/regions";

interface Props {
  region: RegionCode;
  services: { value: string; label: string }[];
  defaultService?: string;
  form?: "contact" | "quote" | "pricing";
  title?: string;
  showBudget?: boolean;
}

export default function ContactForm({ region, services, defaultService, form = "contact", title = "Send a message", showBudget }: Props) {
  const { status, onSubmit } = useSubmit("/api/lead", "Thanks. Your message is with our team, and we'll reply within one working day.");
  return (
    <form onSubmit={onSubmit} className="form-grid" style={{ position: "relative" }} noValidate={false}>
      <h3 style={{ fontSize: 24 }}>{title}</h3>
      <input type="hidden" name="region" value={region} />
      <input type="hidden" name="form" value={form} />
      <Honeypot />
      <div className="form-grid two">
        <div className="field"><label htmlFor="cf-name">Full name *</label><input id="cf-name" name="name" required autoComplete="name" maxLength={120} /></div>
        <div className="field"><label htmlFor="cf-email">Email *</label><input id="cf-email" name="email" type="email" required autoComplete="email" maxLength={200} /></div>
        <div className="field"><label htmlFor="cf-phone">Phone</label><input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
        <div className="field"><label htmlFor="cf-company">Company</label><input id="cf-company" name="company" autoComplete="organization" maxLength={160} /></div>
      </div>
      <div className="form-grid two">
        <div className="field">
          <label htmlFor="cf-service">Service</label>
          <select id="cf-service" name="service" defaultValue={defaultService || ""}>
            <option value="">Not sure yet</option>
            {services.map((s) => <option key={s.value} value={s.label}>{s.label}</option>)}
          </select>
        </div>
        {showBudget !== false && (
          <div className="field">
            <label htmlFor="cf-budget">Budget (optional)</label>
            <input id="cf-budget" name="budget" maxLength={60} placeholder="e.g. 1,500 a month" />
          </div>
        )}
      </div>
      <div className="field"><label htmlFor="cf-message">Message</label><textarea id="cf-message" name="message" rows={4} maxLength={4000} /></div>
      <label className="form-note" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input type="checkbox" name="consent" required style={{ marginTop: 3 }} />
        <span>I agree that Amphin may contact me about this enquiry. See the privacy policy for how we use your data.</span>
      </label>
      <button className="link-arrow" type="submit" disabled={status.kind === "sending"} style={{ background: "none", border: 0, borderBottom: "1px solid", cursor: "pointer" }}>
        {status.kind === "sending" ? "Sending…" : "Send a message"} <span aria-hidden>+</span>
      </button>
      {status.message && <p className="form-status" role="status">{status.message}</p>}
    </form>
  );
}
