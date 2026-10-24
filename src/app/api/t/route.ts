import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { amosConfigured } from "@/lib/amos";

export const dynamic = "force-dynamic";

const BOT = /bot|crawl|spider|slurp|preview|lighthouse|headless|pingdom|uptime|facebookexternalhit|embedly/i;
const AMOS_TRACK = (process.env.AMOS_FEED_URL || "https://os.amphin.agency/api/public/website/content").replace(/\/content$/, "/track");

// Receives the browser beacon, drops bots, swaps the IP for a daily-rotating hash (so the same
// visitor counts once a day without being identifiable), and forwards to AMOS with the shared secret.
export async function POST(req: Request) {
  const h = headers();
  const ua = h.get("user-agent") || "";
  if (BOT.test(ua) || !amosConfigured()) return new Response(null, { status: 204 });
  const raw = await req.text();
  if (raw.length > 2000) return new Response(null, { status: 413 });
  let b: Record<string, unknown>;
  try { b = JSON.parse(raw); } catch { return new Response(null, { status: 400 }); }
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim();
  const day = new Date().toISOString().slice(0, 10);
  const visitor = createHash("sha256").update(`${ip}|${ua}|${day}|${process.env.WEBSITE_SYNC_SECRET}`).digest("hex").slice(0, 32);
  const body = {
    kind: b.kind === "click" ? "click" : "view", path: String(b.path ?? "/").slice(0, 300), ref: b.ref ? String(b.ref).slice(0, 120) : null,
    region: String(b.region ?? "").slice(0, 4), referrer: String(b.referrer ?? "").slice(0, 120), device: String(b.device ?? "").slice(0, 12), visitor,
  };
  try {
    await fetch(AMOS_TRACK, {
      method: "POST", body: JSON.stringify(body), signal: AbortSignal.timeout(3000),
      headers: { "content-type": "application/json", "x-website-secret": process.env.WEBSITE_SYNC_SECRET || "" },
    });
  } catch { /* counting is best-effort */ }
  return new Response(null, { status: 204 });
}
