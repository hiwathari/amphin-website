"use client";
// Integration directory: filter by category and status, so a long list stays easy to scan.
import { useMemo, useState } from "react";
import { INTEGRATIONS, type IntStatus } from "@/lib/amosProduct";

const LABEL: Record<IntStatus, string> = { live: "Live now", ready: "Connect on request", roadmap: "Roadmap" };

export default function Integrations() {
  const [group, setGroup] = useState("All");
  const [status, setStatus] = useState<IntStatus | "all">("all");
  const groups = useMemo(() => ["All", ...INTEGRATIONS.map((g) => g.group)], []);
  const total = INTEGRATIONS.reduce((n, g) => n + g.items.length, 0);
  return (
    <div>
      <p className="am-int-count"><b>{total}</b> integrations and import paths across {INTEGRATIONS.length} categories</p>
      <div className="am-int-bar" role="group" aria-label="Filter integrations by category">
        {groups.map((g) => <button key={g} className="am-chip" data-on={group === g} onClick={() => setGroup(g)}>{g}</button>)}
      </div>
      <div className="am-int-bar" role="group" aria-label="Filter integrations by status">
        {(["all", "live", "ready", "roadmap"] as const).map((s) => (
          <button key={s} className="am-chip" data-on={status === s} onClick={() => setStatus(s)}>{s === "all" ? "Any status" : LABEL[s]}</button>
        ))}
      </div>
      <div className="am-int-grid">
        {INTEGRATIONS.filter((g) => group === "All" || g.group === group).map((g) => {
          const items = g.items.filter((i) => status === "all" || i.status === status);
          if (!items.length) return null;
          return (
            <div className="am-int-card" key={g.group}>
              <h3>{g.group}</h3>
              <p>{g.blurb}</p>
              <ul>{items.map((i) => <li key={i.name}><span>{i.name}</span><em data-s={i.status}>{LABEL[i.status]}</em></li>)}</ul>
            </div>
          );
        })}
      </div>
      <p className="am-int-note">Names are trademarks of their owners and are listed only to show what AmOS connects with. "Live now" connectors are built into AmOS today. "Connect on request" uses the provider's public API or an export file and is set up per client. "Roadmap" is planned, not shipped.</p>
    </div>
  );
}
