import { NextResponse } from "next/server";
import { sendToAmos } from "@/lib/amos";
import { clean, clientIp, isEmail, rateLimited } from "@/lib/guard";
import { isRegion } from "@/lib/regions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  if (!f) return NextResponse.json({ ok: false }, { status: 400 });
  if (clean(f.get("company_website"))) return NextResponse.json({ ok: true });
  if (rateLimited(`nl:${clientIp()}`, 4)) return NextResponse.json({ ok: false, error: "Please try again later." }, { status: 429 });
  const email = clean(f.get("email"), 200).toLowerCase();
  if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  const region = clean(f.get("region"), 4);
  try {
    await sendToAmos("newsletter", { email, region: isRegion(region) ? region : "uk" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
