import { NextResponse } from "next/server";
import { sendToAmos } from "@/lib/amos";
import { clean, cleanText, clientIp, isEmail, rateLimited, verifyTurnstile } from "@/lib/guard";
import { getJob } from "@/lib/content";

export const runtime = "nodejs";

const MAX_CV = 10 * 1024 * 1024;
// PDF and Word only; checked by magic bytes, not just the browser-supplied type.
function cvKind(buf: Uint8Array): string | null {
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return "application/pdf";
  if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return "application/msword";
  return null;
}

// Job applications → AMOS → Employees → Hiring (HR is notified; the CV is stored encrypted).
export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  if (!f) return NextResponse.json({ ok: false, error: "Invalid form." }, { status: 400 });
  if (clean(f.get("company_website"))) return NextResponse.json({ ok: true });
  if (rateLimited(`apply:${clientIp()}`, 3)) return NextResponse.json({ ok: false, error: "Too many applications. Please try later." }, { status: 429 });
  if (!(await verifyTurnstile(clean(f.get("cf-turnstile-response"), 2048)))) {
    return NextResponse.json({ ok: false, error: "Please complete the security check." }, { status: 400 });
  }
  const job = await getJob(clean(f.get("job"), 120));
  const name = clean(f.get("name"), 120);
  const email = clean(f.get("email"), 200).toLowerCase();
  if (!job || !name || !isEmail(email)) return NextResponse.json({ ok: false, error: "Please fill in your name, email and the role." }, { status: 400 });

  let cv: Blob | null = null;
  let cvName = "";
  const file = f.get("cv");
  if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
    if (file.size > MAX_CV) return NextResponse.json({ ok: false, error: "CV must be under 10 MB." }, { status: 400 });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = cvKind(bytes);
    if (!type) return NextResponse.json({ ok: false, error: "CV must be a PDF or Word file." }, { status: 400 });
    cvName = clean(file.name, 120) || "cv";
    cv = new File([bytes], cvName, { type });
  }
  try {
    await sendToAmos("application", {
      job: job.slug, job_title: job.title, name, email, phone: clean(f.get("phone"), 40), linkedin: clean(f.get("linkedin"), 300),
      portfolio: clean(f.get("portfolio"), 300), message: cleanText(f.get("message"), 3000), region: clean(f.get("region"), 4), cv,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "We couldn't send your application just now. Please email it to hello@amphin.com." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
