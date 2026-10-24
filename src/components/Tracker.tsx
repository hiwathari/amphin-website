"use client";
// Counts page views and service clicks for the Studio dashboard. No cookies and no personal data:
// the browser sends the path, region and device type, and the server turns the request into a
// daily-rotating anonymous visitor ID before passing it to AMOS.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function send(body: Record<string, string>) {
  try {
    const data = JSON.stringify(body);
    if (!navigator.sendBeacon?.("/api/t", new Blob([data], { type: "application/json" }))) {
      fetch("/api/t", { method: "POST", body: data, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
    }
  } catch { /* analytics must never break the page */ }
}

const device = () => (window.matchMedia("(max-width: 700px)").matches ? "mobile" : window.matchMedia("(max-width: 1100px)").matches ? "tablet" : "desktop");

export default function Tracker({ region }: { region: string }) {
  const path = usePathname() || "/";
  useEffect(() => {
    let ref = "";
    try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch { /* ignore */ }
    if (ref === location.hostname) ref = "";
    send({ kind: "view", path, region, referrer: ref, device: device() });
  }, [path, region]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const m = a.getAttribute("href")?.match(/^\/(?:uk|eu|us|in|ae)\/services\/([\w-]+)(?:\/([\w-]+))?/);
      if (m) send({ kind: "click", path: location.pathname, region, ref: `service:${m[2] && m[2] !== "pricing" ? m[2] : m[1]}`, device: device() });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [region]);
  return null;
}
