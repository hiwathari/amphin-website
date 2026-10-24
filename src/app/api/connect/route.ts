import { NextResponse } from "next/server";
import { sendToAmos } from "@/lib/amos";
import { clean, cleanText, clientIp, isEmail, rateLimited, verifyTurnstile } from "@/lib/guard";
import { isRegion } from "@/lib/regions";

export const runtime = "nodejs";

// Amphin Connect signups → AMOS (Website → Connect); brands also become a lead for sales.
export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  if (!f) return NextResponse.json({ ok: false }, { status: 400 });
  if (clean(f.get("company_website"))) return NextResponse.json({ ok: true });
  if (rateLimited(`connect:${clientIp()}`, 3)) return NextResponse.json({ ok: false, error: "Please try again later." }, { status: 429 });
  if (!(await verifyTurnstile(clean(f.get("cf-turnstile-response"), 2048)))) {
    return NextResponse.json({ ok: false, error: "Please complete the security check." }, { status: 400 });
  }
  const name = clean(f.get("name"), 120);
  const email = clean(f.get("email"), 200).toLowerCase();
  if (!name || !isEmail(email)) return NextResponse.json({ ok: false, error: "Please add your name and a valid email." }, { status: 400 });
  const region = clean(f.get("region"), 4);
  const details = {
    phone: clean(f.get("phone"), 40), location: clean(f.get("location"), 120), handles: clean(f.get("handles"), 400),
    followers: clean(f.get("followers"), 40), niche: clean(f.get("niche"), 120), brand: clean(f.get("brand"), 160),
    budget: clean(f.get("budget"), 60), goal: cleanText(f.get("goal"), 2000),
  };
  try {
    await sendToAmos("connect", { type: clean(f.get("type"), 12) === "brand" ? "brand" : "influencer", name, email,
      region: isRegion(region) ? region : "uk", details: JSON.stringify(details) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
