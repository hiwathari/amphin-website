/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { serverComponentsExternalPackages: ["postgres"] },
  images: {
    // Project and blog images still live on the old WordPress uploads until they move to R2.
    remotePatterns: [
      { protocol: "https", hostname: "amphin.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "files.amphin.agency" },
    ],
  },
  async redirects() {
    return [
      // The signature programme has its own page; the generic service URL points there so the two don't compete in search.
      { source: "/:region(uk|eu|us|in|ae)/services/pr-influencer/make-me-a-celebrity", destination: "/:region/make-me-a-celebrity", permanent: true },
      { source: "/admin", destination: "https://os.amphin.agency/website", permanent: false },
      { source: "/admin/:path*", destination: "https://os.amphin.agency/website", permanent: false },
    ];
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ];
    return [
      { source: "/:path*", headers: security },
      // Only amphin.agency should be indexed; preview and vercel.app copies stay out of search results.
      { source: "/:path*", has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }] },
      { source: "/clients/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }] },
    ];
  },
};
module.exports = nextConfig;
