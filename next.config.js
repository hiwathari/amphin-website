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
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }] },
      { source: "/clients/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }] },
    ];
  },
};
module.exports = nextConfig;
