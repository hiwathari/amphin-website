"use client";
import { Honeypot, useSubmit } from "./useSubmit";

export default function ApplyForm({ job, title, region }: { job: string; title: string; region: string }) {
  const { status, onSubmit } = useSubmit("/api/apply", "Thanks for applying. Our HR team reviews every application and will be in touch.");
  return (
    <form onSubmit={onSubmit} className="form-grid" style={{ position: "relative" }} encType="multipart/form-data">
      <h3 style={{ fontSize: 24 }}>Apply for {title}</h3>
      <input type="hidden" name="job" value={job} />
      <input type="hidden" name="region" value={region} />
      <Honeypot />
      <div className="form-grid two">
        <div className="field"><label htmlFor="ap-name">Full name *</label><input id="ap-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="ap-email">Email *</label><input id="ap-email" name="email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="ap-phone">Phone</label><input id="ap-phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="field"><label htmlFor="ap-li">LinkedIn</label><input id="ap-li" name="linkedin" type="url" placeholder="https://" /></div>
      </div>
      <div className="field"><label htmlFor="ap-pf">Portfolio link</label><input id="ap-pf" name="portfolio" type="url" placeholder="https://" /></div>
      <div className="field"><label htmlFor="ap-cv">CV (PDF or Word, max 10 MB)</label><input id="ap-cv" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf" /></div>
      <div className="field"><label htmlFor="ap-msg">Why you?</label><textarea id="ap-msg" name="message" rows={4} maxLength={3000} /></div>
      <label className="form-note" style={{ display: "flex", gap: 10 }}>
        <input type="checkbox" name="consent" required />
        <span>I agree that Amphin may store my application for this and similar roles, as set out in the careers privacy notice.</span>
      </label>
      <button className="btn-pill btn-accent" type="submit" disabled={status.kind === "sending"} style={{ width: "fit-content" }}>
        {status.kind === "sending" ? "Sending…" : "Submit application"}
      </button>
      {status.message && <p className="form-status" role="status">{status.message}</p>}
    </form>
  );
}
