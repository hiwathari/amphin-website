import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="frame-glow" />
      <main className="frame" style={{ minHeight: "calc(100vh - 28px)", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
        <div style={{ display: "grid", gap: 22, justifyItems: "center" }}>
          <div className="stat-num" style={{ fontSize: "clamp(120px, 22vw, 260px)" }}>404</div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>This page has moved or never existed</h1>
          <Link href="/" className="btn-pill">Go to homepage</Link>
        </div>
      </main>
    </>
  );
}
