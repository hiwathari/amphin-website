import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { REGION_CODES } from "@/lib/regions";

export const runtime = "nodejs";

// Called by AMOS when something is published: { paths: ["/services/branding", ...] }.
// Each path is refreshed in every region.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET || "";
  const given = req.headers.get("x-revalidate-secret") || "";
  const ok = secret.length > 0 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { paths?: unknown };
  const paths = Array.isArray(body.paths) ? body.paths.filter((p): p is string => typeof p === "string" && p.startsWith("/")).slice(0, 50) : [];
  for (const p of paths) for (const r of REGION_CODES) revalidatePath(`/${r}${p === "/" ? "" : p}`);
  return NextResponse.json({ ok: true, revalidated: paths.length });
}
