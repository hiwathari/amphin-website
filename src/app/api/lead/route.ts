import { NextResponse } from "next/server";
import { hasDb, sql } from "@/lib/db";
import { clean, cleanText, clientIp, isEmail, rateLimited, requestContext, verifyTurnstile } from "@/lib/guard";
import { REGIONS, isRegion } from "@/lib/regions";

export const runtime = "nodejs";

// Contact, quote and "contact for pricing" forms. Each submission becomes a New lead in AMOS
// (source "website"), with the region, page and UTM tags kept in the notes for the sales team.
export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  if (!f) return NextResponse.json({ ok: false, error: "Invalid form." }, { status: 400 });
  if (clean(f.get("company_website"))) return NextResponse.json({ ok: true }); // honeypot: pretend success
  if (rateLimited(`lead:${clientIp()}`)) {
    return NextResponse.json({ ok: false, error: "Too many messages from this connection. Please try again later." }, { status: 429 });
  }
  if (!(await verifyTurnstile(clean(f.get("cf-turnstile-response"), 2048)))) {
    return NextResponse.json({ ok: false, error: "Please complete the security check." }, { status: 400 });
  }

  const name = clean(f.get("name"), 120);
  const email = clean(f.get("email"), 200).toLowerCase();
  const message = cleanText(f.get("message"), 4000);
  if (!name || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please add your name and a valid email." }, { status: 400 });
  }
  const regionCode = clean(f.get("region"), 4);
  const region = isRegion(regionCode) ? REGIONS[regionCode] : REGIONS.uk;
  const ctx = requestContext();
  const notes = [
    message,
    "",
    `Form: ${clean(f.get("form"), 40) || "contact"}`,
    `Region: /${region.code}/ (${ctx.country || "?"})`,
    `Page: ${clean(f.get("page"), 300)}`,
    `Budget: ${clean(f.get("budget"), 60) || "-"}`,
    `UTM: ${clean(f.get("utm"), 300) || "-"}`,
    `Consent: ${f.get("consent") ? "yes" : "no"} at ${new Date().toISOString()}`,
  ].join("\n");

  if (!hasDb()) {
    console.warn("lead received but WEBSITE_DATABASE_URL is not set", { email, region: region.code });
    return NextResponse.json({ ok: true, queued: false });
  }
  await sql()`
    insert into leads (name, company, email, phone, source, service_interest, value, currency, notes)
    values (${name}, ${clean(f.get("company"), 160)}, ${email}, ${clean(f.get("phone"), 40)},
      ${"website"}, ${clean(f.get("service"), 120)}, ${0}, ${region.currency}, ${notes})`;
  return NextResponse.json({ ok: true });
}
