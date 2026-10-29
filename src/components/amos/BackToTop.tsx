"use client";
import { useEffect, useState } from "react";

export default function AmosTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button className="am-top" aria-label="Back to top" style={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 4-4 4 4" /></svg>
    </button>
  );
}
