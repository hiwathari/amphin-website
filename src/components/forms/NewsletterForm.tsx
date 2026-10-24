"use client";
import { Honeypot, useSubmit } from "./useSubmit";

export default function NewsletterForm({ region }: { region: string }) {
  const { status, onSubmit } = useSubmit("/api/newsletter", "Check your inbox to confirm.");
  return (
    <form onSubmit={onSubmit} style={{ position: "relative", marginTop: 14 }}>
      <input type="hidden" name="region" value={region} />
      <Honeypot />
      <div className="field" style={{ gridTemplateColumns: "1fr auto", display: "grid", alignItems: "end", gap: 12, borderBottom: "1px solid #3a3a3a" }}>
        <input name="email" type="email" required placeholder="Email" aria-label="Email" style={{ borderBottom: 0 }} />
        <button type="submit" className="accent-link" style={{ background: "none", border: 0, cursor: "pointer", paddingBottom: 10 }}>
          {status.kind === "sending" ? "…" : "Subscribe"}
        </button>
      </div>
      {status.message && <p className="form-note" role="status" style={{ marginTop: 10 }}>{status.message}</p>}
    </form>
  );
}
