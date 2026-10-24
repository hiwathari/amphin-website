import { NextResponse } from "next/server";
import { sendToAmos } from "@/lib/amos";
import { clean, cleanText, clientIp, isEmail, rateLimited, requestContext, verifyTurnstile } from "@/lib/guard";
import { REGIONS, isRegion } from "@/lib/regions";

export const runtime = "nodejs";

// Contact, quote and "contact for pricing" forms → a New lead in AMOS (source "website"), with the
// region, page and UTM tags in the notes for the sales team.
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
  if (!name || !isEmail(email)) return NextResponse.json({ ok: false, error: "Please add your name and a valid email." }, { status: 400 });
  const regionCode = clean(f.get("region"), 4);
  const region = isRegion(regionCode) ? REGIONS[regionCode] : REGIONS.uk;
  const ctx = requestContext();
  const notes = [
    cleanText(f.get("message"), 4000), "",
    `Form: ${clean(f.get("form"), 40) || "contact"}`,
    `Region: /${region.code}/ (${ctx.country || "?"})`,
    `Page: ${clean(f.get("page"), 300)}`,
    `Budget: ${clean(f.get("budget"), 60) || "-"}`,
    `UTM: ${clean(f.get("utm"), 300) || "-"}`,
    `Consent: ${f.get("consent") ? "yes" : "no"} at ${new Date().toISOString()}`,
  ].join("\n");
  try {
    await sendToAmos("lead", { name, email, phone: clean(f.get("phone"), 40), company: clean(f.get("company"), 160), service: clean(f.get("service"), 120), region: region.code, notes });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "We couldn't send that just now. Please email hello@amphin.com." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
