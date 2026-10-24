// The five regional versions of the site. Text is shared; currency, prices, the office shown
// first and the sales number change per region.

export type RegionCode = "uk" | "eu" | "us" | "in" | "ae";

export interface Region {
  code: RegionCode;
  label: string;
  currency: "GBP" | "EUR" | "USD" | "INR" | "AED";
  symbol: string;
  locale: string;
  office: "london" | "kochi" | "abu-dhabi";
  hreflang: string;
}

export const REGIONS: Record<RegionCode, Region> = {
  uk: { code: "uk", label: "United Kingdom", currency: "GBP", symbol: "£", locale: "en-GB", office: "london", hreflang: "en-GB" },
  eu: { code: "eu", label: "Europe", currency: "EUR", symbol: "€", locale: "en-IE", office: "london", hreflang: "en-IE" },
  us: { code: "us", label: "United States", currency: "USD", symbol: "$", locale: "en-US", office: "london", hreflang: "en-US" },
  in: { code: "in", label: "India", currency: "INR", symbol: "₹", locale: "en-IN", office: "kochi", hreflang: "en-IN" },
  ae: { code: "ae", label: "UAE", currency: "AED", symbol: "AED ", locale: "en-AE", office: "abu-dhabi", hreflang: "en-AE" },
};

export const REGION_CODES = Object.keys(REGIONS) as RegionCode[];
export const DEFAULT_REGION: RegionCode = "uk";
export const REGION_COOKIE = "amphin_region";

const EU = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IT", "LV", "LT", "LU",
  "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "CH",
]);
const IN_ROUTED = new Set(["IN", "LK", "NP", "BD"]);
const AE_ROUTED = new Set(["AE", "SA", "QA", "KW", "BH", "OM"]);
// Canada goes to /us/ until a /ca/ region exists.
const US_ROUTED = new Set(["US", "CA"]);

/** Country code (ISO 3166-1 alpha-2, from Vercel's x-vercel-ip-country) to region. */
export function regionForCountry(country: string | null | undefined): RegionCode {
  const c = (country || "").toUpperCase();
  if (IN_ROUTED.has(c)) return "in";
  if (AE_ROUTED.has(c)) return "ae";
  if (US_ROUTED.has(c)) return "us";
  if (EU.has(c)) return "eu";
  return DEFAULT_REGION;
}

export function isRegion(v: string | undefined): v is RegionCode {
  return !!v && (REGION_CODES as string[]).includes(v);
}

export function formatPrice(amount: number, region: Region): string {
  const n = new Intl.NumberFormat(region.locale, { maximumFractionDigits: 0 }).format(amount);
  return `${region.symbol}${n}`;
}
