import { NextResponse } from "next/server";
import { hasDb, sql } from "@/lib/db";
import { clean, cleanText, clientIp, isEmail, rateLimited, verifyTurnstile } from "@/lib/guard";
import { isRegion } from "@/lib/regions";

export const runtime = "nodejs";

// Amphin Connect signups. Brands also become a lead (source "connect") for the sales team.
export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  if (!f) return NextResponse.json({ ok: false }, { status: 400 });
  if (clean(f.get("company_website"))) return NextResponse.json({ ok: true });
  if (rateLimited(`connect:${clientIp()}`, 3)) return NextResponse.json({ ok: false, error: "Please try again later." }, { status: 429 });
  if (!(await verifyTurnstile(clean(f.get("cf-turnstile-response"), 2048)))) {
    return NextResponse.json({ ok: false, error: "Please complete the security check." }, { status: 400 });
  }
  const type = clean(f.get("type"), 12) === "brand" ? "brand" : "influencer";
  const name = clean(f.get("name"), 120);
  const email = clean(f.get("email"), 200).toLowerCase();
  if (!name || !isEmail(email)) return NextResponse.json({ ok: false, error: "Please add your name and a valid email." }, { status: 400 });
  const region = clean(f.get("region"), 4);
  const details = {
    phone: clean(f.get("phone"), 40),
    location: clean(f.get("location"), 120),
    handles: clean(f.get("handles"), 400),
    followers: clean(f.get("followers"), 40),
    niche: clean(f.get("niche"), 120),
    brand: clean(f.get("brand"), 160),
    budget: clean(f.get("budget"), 60),
    goal: cleanText(f.get("goal"), 2000),
    region: isRegion(region) ? region : "uk",
  };
  if (!hasDb()) return NextResponse.json({ ok: true, queued: false });
  const db = sql();
  await db`insert into web_connect_signups (type, name, email, details, status) values (${type}, ${name}, ${email}, ${db.json(details)}, ${"pending"})`;
  if (type === "brand") {
    await db`
      insert into leads (name, company, email, phone, source, service_interest, value, currency, notes)
      values (${name}, ${details.brand}, ${email}, ${details.phone}, ${"connect"}, ${"Influencer marketing"}, ${0}, ${"GBP"},
        ${`Amphin Connect brand signup\nBudget: ${details.budget || "-"}\nGoal: ${details.goal || "-"}`})`;
  }
  return NextResponse.json({ ok: true });
}
