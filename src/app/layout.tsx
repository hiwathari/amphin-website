import type { Metadata, Viewport } from "next";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Amphin | Growth Marketing & Creative Agency", template: "%s | Amphin" },
  description: "Amphin builds brands with confidence: branding, social media, web and app development, video and growth marketing. London · Kochi · Abu Dhabi.",
  applicationName: COMPANY.brand,
  icons: { icon: "/brand/amphin-icon.png", apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", siteName: "Amphin", images: ["/brand/og-default.jpg"] },
  twitter: { card: "summary_large_image", site: "@helloamphin" },
};

export const viewport: Viewport = { themeColor: "#0e0e0e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
