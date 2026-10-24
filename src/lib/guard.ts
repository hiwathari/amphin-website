import "server-only";
import { headers } from "next/headers";

// Shared protection for every public form endpoint.

const hits = new Map<string, number[]>();

/** Best-effort per-instance limit: `max` submissions per IP per window. */
export function rateLimited(key: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

export function clientIp(): string {
  const h = headers();
  return (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

export function requestContext() {
  const h = headers();
  return {
    country: h.get("x-vercel-ip-country") || "",
    referer: (h.get("referer") || "").slice(0, 500),
    userAgent: (h.get("user-agent") || "").slice(0, 300),
  };
}

/** Cloudflare Turnstile check. Skipped (allowed) until TURNSTILE_SECRET is configured. */
export async function verifyTurnstile(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: clientIp() });
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const j = (await r.json().catch(() => ({}))) as { success?: boolean };
  return !!j.success;
}

export const clean = (v: unknown, max = 500) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
export const cleanText = (v: unknown, max = 5000) => String(v ?? "").replace(/\u0000/g, "").trim().slice(0, max);
export const isEmail = (v: string) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i.test(v);
