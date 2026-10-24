import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_REGION, REGION_COOKIE, isRegion, regionForCountry } from "@/lib/regions";

// Paths that live outside the /{region}/ tree.
const UNPREFIXED = /^\/(api|_next|brand|clients|login|admin|sitemap\.xml|robots\.txt|favicon\.ico|apple-touch-icon\.png|manifest\.webmanifest)(\/|$)/;
const BOT = /bot|crawler|spider|crawling|slurp|facebookexternalhit|linkedinbot|whatsapp|embedly|preview/i;

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (UNPREFIXED.test(pathname) || /\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  const first = pathname.split("/")[1];
  if (isRegion(first)) {
    // Remember an explicit choice (switcher link or a shared regional URL).
    const res = NextResponse.next();
    if (req.cookies.get(REGION_COOKIE)?.value !== first) {
      res.cookies.set(REGION_COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax", secure: true });
    }
    return res;
  }

  // Crawlers get the default region without a geo hop, so every regional URL is indexed via hreflang.
  const ua = req.headers.get("user-agent") || "";
  const saved = req.cookies.get(REGION_COOKIE)?.value;
  const region = BOT.test(ua)
    ? DEFAULT_REGION
    : isRegion(saved)
      ? saved
      : regionForCountry(req.headers.get("x-vercel-ip-country"));

  const url = req.nextUrl.clone();
  url.pathname = `/${region}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: ["/((?!_next/static|_next/image).*)"] };
