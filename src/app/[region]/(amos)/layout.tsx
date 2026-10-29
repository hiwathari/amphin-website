import type { ReactNode } from "react";
import "./amos.css";
import AmosHeader from "@/components/amos/Header";
import AmosFooter from "@/components/amos/Footer";
import AmosTop from "@/components/amos/BackToTop";
import { WHATSAPP } from "@/lib/site";
import { isRegion } from "@/lib/regions";

// AmOS product pages: their own header, footer and light design, separate from the dark Amphin site
// (which lives in the sibling (site) group). The Amphin website is one click away from the header.
export default function AmosLayout({ children, params }: { children: ReactNode; params: { region: string } }) {
  const region = isRegion(params.region) ? params.region : "uk";
  const base = `/${region}`;
  return (
    <div className="am">
      {/* The page behind the rounded panels should be white, not the dark Amphin background. */}
      <style dangerouslySetInnerHTML={{ __html: "body{background:#fff}" }} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" />
      <a href="#main" className="am-skip">Skip to content</a>
      <AmosHeader base={base} />
      <main id="main">{children}</main>
      <AmosFooter base={base} region={region} />
      <a className="am-wa" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Amphin, I'd like a demo of AmOS.")}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Amphin on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.3.6 4.5 1.8 6.4L3 29l7.2-2c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.1-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.3 9.8 10.1 5.1 16 5.1s10.6 4.7 10.6 10.5S21.9 26.2 16 26.2zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
      </a>
      <AmosTop />
    </div>
  );
}
