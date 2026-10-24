import type { Metadata } from "next";
import { REGIONS, REGION_CODES, type RegionCode } from "./regions";

/** Canonical + hreflang alternates for a path that exists in every region. */
export function regionalMeta(region: string, path: string, extra: Metadata = {}): Metadata {
  const p = path === "/" ? "" : path;
  const languages: Record<string, string> = { "x-default": `/uk${p}` };
  for (const r of REGION_CODES) languages[REGIONS[r].hreflang] = `/${r}${p}`;
  return { ...extra, alternates: { canonical: `/${region as RegionCode}${p}`, languages } };
}
