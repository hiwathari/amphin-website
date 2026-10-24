import { NextResponse } from "next/server";
import { hasDb, sql } from "@/lib/db";
import { clean, cleanText, clientIp, isEmail, rateLimited, verifyTurnstile } from "@/lib/guard";
import { getJob } from "@/lib/content";

export const runtime = "nodejs";

const MAX_CV = 10 * 1024 * 1024;
// PDF and Word only; checked by magic bytes, not just the browser-supplied type.
function cvKind(buf: Uint8Array): "pdf" | "docx" | "doc" | null {
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return "pdf";
  if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) return "docx";
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return "doc";
  return null;
}

// Job applications land in AMOS → Website → Careers → Applications for HR.
export async function POST(req: Request) {
  const f = await req.formData().catch(() => null);
  if (!f) return NextResponse.json({ ok: false, error: "Invalid form." }, { status: 400 });
  if (clean(f.get("company_website"))) return NextResponse.json({ ok: true });
  if (rateLimited(`apply:${clientIp()}`, 3)) return NextResponse.json({ ok: false, error: "Too many applications. Please try later." }, { status: 429 });
  if (!(await verifyTurnstile(clean(f.get("cf-turnstile-response"), 2048)))) {
    return NextResponse.json({ ok: false, error: "Please complete the security check." }, { status: 400 });
  }

  const job = getJob(clean(f.get("job"), 120));
  const name = clean(f.get("name"), 120);
  const email = clean(f.get("email"), 200).toLowerCase();
  if (!job || !name || !isEmail(email)) return NextResponse.json({ ok: false, error: "Please fill in your name, email and the role." }, { status: 400 });

  let cv: { bytes: Uint8Array; kind: string; name: string } | null = null;
  const file = f.get("cv");
  if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
    if (file.size > MAX_CV) return NextResponse.json({ ok: false, error: "CV must be under 10 MB." }, { status: 400 });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const kind = cvKind(bytes);
    if (!kind) return NextResponse.json({ ok: false, error: "CV must be a PDF or Word file." }, { status: 400 });
    cv = { bytes, kind, name: clean(file.name, 120) };
  }

  if (!hasDb()) {
    console.warn("application received but WEBSITE_DATABASE_URL is not set", { job: job.slug, email });
    return NextResponse.json({ ok: true, queued: false });
  }
  // CV storage on R2 is wired in phase 2 (AMOS module); until then only the metadata is stored.
  await sql()`
    insert into web_applications (job_slug, name, email, phone, linkedin, portfolio, message, cv_filename, status)
    values (${job.slug}, ${name}, ${email}, ${clean(f.get("phone"), 40)}, ${clean(f.get("linkedin"), 300)},
      ${clean(f.get("portfolio"), 300)}, ${cleanText(f.get("message"), 3000)}, ${cv?.name ?? null}, ${"new"})`;
  return NextResponse.json({ ok: true });
}
