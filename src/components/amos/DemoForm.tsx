"use client";
// "Book a demo" form for the AmOS pages. It posts to the same lead endpoint as the main site, so the
// enquiry lands in AmOS as a new lead tagged with the edition and business type.
import { EDITIONS } from "@/lib/amosProduct";
import { Honeypot, useSubmit } from "@/components/forms/useSubmit";

export default function DemoForm({ region }: { region: string }) {
  const { status, onSubmit } = useSubmit("/api/lead", "Thanks. We'll be in touch within one working day to plan your AmOS demo.");
  return (
    <form className="am-form" onSubmit={onSubmit}>
      <input type="hidden" name="region" value={region} />
      <input type="hidden" name="form" value="amos-demo" />
      <Honeypot />
      <div className="two">
        <label>Full name *<input name="name" required autoComplete="name" maxLength={120} /></label>
        <label>Work email *<input name="email" type="email" required autoComplete="email" maxLength={200} /></label>
      </div>
      <div className="two">
        <label>Phone<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        <label>Company<input name="company" autoComplete="organization" maxLength={160} /></label>
      </div>
      <label>Which edition are you interested in?
        <select name="service" defaultValue="AmOS Core">
          {EDITIONS.map((e) => <option key={e.key} value={`AmOS: ${e.name}`}>{e.name}, {e.forWho.toLowerCase()}</option>)}
          <option value="AmOS: not sure yet">Not sure yet</option>
        </select>
      </label>
      <label>Tell us about your team
        <textarea name="message" rows={4} maxLength={4000} placeholder="How many people, what you use today, and what you'd like AmOS to replace." />
      </label>
      <label className="check"><input type="checkbox" name="consent" required /><span>I agree that Amphin may contact me about this enquiry. See the privacy policy for how we use your data.</span></label>
      <button className="am-btn" type="submit" disabled={status.kind === "sending"}>{status.kind === "sending" ? "Sending…" : "Book my demo"}</button>
      {status.message && <p className={`status ${status.kind}`} role="status">{status.message}</p>}
    </form>
  );
}
