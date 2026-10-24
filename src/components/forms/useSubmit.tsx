"use client";
import { useState, type FormEvent } from "react";

export type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

/** Posts a form to one of the /api endpoints and tracks the result. */
export function useSubmit(endpoint: string, okMessage: string) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("page", window.location.pathname);
    const utm = new URLSearchParams(window.location.search);
    data.set("utm", ["utm_source", "utm_medium", "utm_campaign"].map((k) => utm.get(k)).filter(Boolean).join(" / "));
    setStatus({ kind: "sending" });
    try {
      const r = await fetch(endpoint, { method: "POST", body: data });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (r.ok && j.ok) {
        form.reset();
        setStatus({ kind: "ok", message: okMessage });
      } else {
        setStatus({ kind: "error", message: j.error || "Something went wrong. Please email hello@amphin.com." });
      }
    } catch {
      setStatus({ kind: "error", message: "No connection. Please try again, or email hello@amphin.com." });
    }
  }
  return { status, onSubmit };
}

export function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
