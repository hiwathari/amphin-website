import type { Metadata } from "next";
import { REGIONS, REGION_CODES, type RegionCode } from "./regions";

/** Share cards (1200×630) made from Amphin's campaign artwork; a page without its own image gets one. */
export const SHARE_CARDS = [
  "/media/social/og-marketing-made-easy.jpg",
  "/media/social/og-brands-that-convert.jpg",
  "/media/social/og-trend-boss.jpg",
];

/** The same page always gets the same card, so previews don't change between builds. */
export function shareCard(key: string): string {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return SHARE_CARDS[h % SHARE_CARDS.length];
}

/** Canonical + hreflang alternates for a path that exists in every region, plus Open Graph and
 *  Twitter cards that always carry an image (Next replaces the whole openGraph object when a page
 *  sets one, so the default image would otherwise vanish). */
export function regionalMeta(region: string, path: string, extra: Metadata = {}): Metadata {
  const p = path === "/" ? "" : path;
  const languages: Record<string, string> = { "x-default": `/uk${p}` };
  for (const r of REGION_CODES) languages[REGIONS[r].hreflang] = `/${r}${p}`;
  const url = `/${region as RegionCode}${p}`;
  const og = (extra.openGraph ?? {}) as NonNullable<Metadata["openGraph"]>;
  const images = og.images ?? [{ url: shareCard(p || "/"), width: 1200, height: 630, alt: "Amphin" }];
  const title = typeof extra.title === "string" ? extra.title : undefined;
  return {
    ...extra,
    alternates: { canonical: url, languages },
    openGraph: { type: "website", siteName: "Amphin", locale: REGIONS[region as RegionCode]?.hreflang.replace("-", "_"), url, title, description: extra.description ?? undefined, ...og, images },
    twitter: { card: "summary_large_image", site: "@helloamphin", title, description: extra.description ?? undefined, images: Array.isArray(images) ? images : [images] },
  };
}
