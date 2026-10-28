"use client";
// Cookie consent. Optional analytics (Google Analytics, Microsoft Clarity) only load after the visitor
// accepts them; the choice is kept in this browser. The banner only appears when Studio has an
// analytics ID set, and the footer's "Cookie settings" link reopens it at any time.
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "amphin_consent";
export const OPEN_EVENT = "amphin:cookie-settings";
type Choice = { analytics: boolean; at: string };

function read(): Choice | null {
  try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as Choice) : null; } catch { return null; }
}

export default function Consent({ ga, clarity, region }: { ga: string; clarity: string; region: string }) {
  const optional = Boolean(ga || clarity);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = read();
    setChoice(c);
    if (optional && !c) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, [optional]);

  const save = (analytics: boolean) => {
    const c = { analytics, at: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* private mode: choice lasts this page only */ }
    // Turning analytics off after it ran needs a reload so the scripts stop.
    if (choice?.analytics && !analytics) location.reload();
    setChoice(c);
    setOpen(false);
  };

  const allowed = optional && choice?.analytics === true;
  return (
    <>
      {allowed && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {allowed && clarity && (
        <Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}</Script>
      )}
      {open && (
        <div className="consent" role="dialog" aria-label="Cookie settings" aria-live="polite">
          {optional ? (
            <>
              <p>
                We use a few essential cookies to run this site. With your permission we would also like to use analytics cookies to see which pages are useful.{" "}
                <Link href={`/${region}/legal/cookie-policy`}>Cookie policy</Link>
              </p>
              <div className="consent-actions">
                <button type="button" className="btn-pill" onClick={() => save(false)}>Reject optional</button>
                <button type="button" className="btn-pill btn-accent" onClick={() => save(true)}>Accept analytics</button>
              </div>
            </>
          ) : (
            <>
              <p>
                This site only uses essential cookies (such as remembering your region). There are no optional cookies to switch on or off.{" "}
                <Link href={`/${region}/legal/cookie-policy`}>Cookie policy</Link>
              </p>
              <div className="consent-actions">
                <button type="button" className="btn-pill" onClick={() => setOpen(false)}>Close</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink() {
  return (
    <button type="button" className="link-button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
