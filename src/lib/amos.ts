import "server-only";

// Hands a form submission to AMOS (os.amphin.agency), which owns leads, applications, Connect signups
// and the newsletter list. Signed with WEBSITE_SYNC_SECRET, shared only between the two Vercel projects.
const SUBMIT_URL = process.env.AMOS_SUBMIT_URL || "https://os.amphin.agency/api/public/website/submit";

export function amosConfigured(): boolean {
  return (process.env.WEBSITE_SYNC_SECRET || "").length >= 32;
}

export async function sendToAmos(kind: "lead" | "application" | "connect" | "newsletter", fields: Record<string, string | Blob | null | undefined>): Promise<boolean> {
  if (!amosConfigured()) {
    console.warn(`AMOS submit skipped (${kind}): WEBSITE_SYNC_SECRET is not set`);
    return false;
  }
  const body = new FormData();
  body.set("kind", kind);
  for (const [k, v] of Object.entries(fields)) if (v != null && v !== "") body.set(k, v);
  const r = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "x-website-secret": process.env.WEBSITE_SYNC_SECRET as string },
    body,
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`AMOS submit failed: ${r.status}`);
  return true;
}
