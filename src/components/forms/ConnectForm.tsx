"use client";
import { useState } from "react";
import { Honeypot, useSubmit } from "./useSubmit";

export default function ConnectForm({ region }: { region: string }) {
  const [type, setType] = useState<"influencer" | "brand">("influencer");
  const { status, onSubmit } = useSubmit("/api/connect", "You're on the list. The Amphin Connect team will review your details and get back to you.");
  return (
    <form onSubmit={onSubmit} className="form-grid" style={{ position: "relative" }}>
      <div className="chips" role="tablist" aria-label="I am">
        {(["influencer", "brand"] as const).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={type === t} className="chip" aria-current={type === t} onClick={() => setType(t)} style={{ cursor: "pointer", background: type === t ? "#fff" : "transparent", color: type === t ? "#111" : undefined }}>
            {t === "influencer" ? "I'm an influencer" : "I'm a brand"}
          </button>
        ))}
      </div>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="region" value={region} />
      <Honeypot />
      <div className="form-grid two">
        <div className="field"><label htmlFor="cn-name">Your name *</label><input id="cn-name" name="name" required /></div>
        <div className="field"><label htmlFor="cn-email">Email *</label><input id="cn-email" name="email" type="email" required /></div>
        <div className="field"><label htmlFor="cn-phone">Phone</label><input id="cn-phone" name="phone" type="tel" /></div>
        <div className="field"><label htmlFor="cn-loc">City, country</label><input id="cn-loc" name="location" /></div>
      </div>
      {type === "influencer" ? (
        <div className="form-grid two">
          <div className="field"><label htmlFor="cn-h">Social handles</label><input id="cn-h" name="handles" placeholder="@instagram, @youtube…" /></div>
          <div className="field"><label htmlFor="cn-f">Total followers</label><input id="cn-f" name="followers" /></div>
          <div className="field"><label htmlFor="cn-n">Niche</label><input id="cn-n" name="niche" placeholder="Food, travel, tech…" /></div>
        </div>
      ) : (
        <div className="form-grid two">
          <div className="field"><label htmlFor="cn-b">Brand</label><input id="cn-b" name="brand" /></div>
          <div className="field"><label htmlFor="cn-bud">Campaign budget</label><input id="cn-bud" name="budget" /></div>
        </div>
      )}
      <div className="field"><label htmlFor="cn-g">{type === "brand" ? "What do you want to achieve?" : "Tell us about your audience"}</label><textarea id="cn-g" name="goal" rows={3} /></div>
      <label className="form-note" style={{ display: "flex", gap: 10 }}>
        <input type="checkbox" name="consent" required />
        <span>I agree that Amphin may contact me about Amphin Connect.</span>
      </label>
      <button className="btn-pill btn-accent" type="submit" style={{ width: "fit-content" }} disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : "Join Amphin Connect"}
      </button>
      {status.message && <p className="form-status" role="status">{status.message}</p>}
    </form>
  );
}
