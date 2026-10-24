// Old WordPress uploads are full-size originals (often 2560px). Sending them through Vercel's image
// optimiser resizes them, converts to WebP/AVIF and caches the result, so visitors no longer pull
// files straight from amphin.com. Local and other URLs pass through untouched.
const WIDTHS = [640, 828, 1200, 1920] as const;

export function opt(src: string | null | undefined, width: (typeof WIDTHS)[number] = 1200): string {
  if (!src) return "";
  if (!/^https:\/\/(amphin\.com\/wp-content\/uploads|files\.amphin\.agency)\//.test(src)) return src;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}
