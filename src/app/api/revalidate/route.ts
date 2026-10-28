import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { forgetContent } from "@/lib/content";
import { timingSafeEqual } from "node:crypto";
import { REGION_CODES } from "@/lib/regions";

export const runtime = "nodejs";

// Called by AMOS after a publish, a visibility toggle, a team/client change or a new client logo.
// Refreshes the cached AMOS feed and the listed paths in every region.
export async function POST(req: Request) {
  const secret = process.env.WEBSITE_SYNC_SECRET || "";
  const given = req.headers.get("x-revalidate-secret") || "";
  const ok = secret.length >= 32 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { paths?: unknown };
  const paths = Array.isArray(body.paths) ? body.paths.filter((p): p is string => typeof p === "string" && p.startsWith("/")).slice(0, 50) : [];
  forgetContent();
  revalidateTag("amos");
  for (const p of paths) for (const r of REGION_CODES) revalidatePath(`/${r}${p === "/" ? "" : p}`, "layout");
  return NextResponse.json({ ok: true, revalidated: paths.length });
}
