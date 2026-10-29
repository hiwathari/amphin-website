// Demo screens for each AmOS edition. They are drawn in code with made-up businesses and people, so
// nothing here is a real customer's data. Every window is labelled "Demo data".
import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { EditionKey, ServiceKey } from "@/lib/amosProduct";

type Tone = "g" | "r" | "a" | "b" | "";
const Badge = ({ t = "", children }: { t?: Tone; children: ReactNode }) => <span className={`badge ${t}`}>{children}</span>;
const Kpi = ({ label, value, delta, bad }: { label: string; value: string; delta?: string; bad?: boolean }) => (
  <div className="demo-kpi"><small>{label}</small><strong>{value}</strong>{delta && <em className={bad ? "bad" : ""}>{delta}</em>}</div>
);
const Card = ({ title, aside, children }: { title: string; aside?: string; children: ReactNode }) => (
  <div className="demo-card"><h4>{title}{aside && <small>{aside}</small>}</h4>{children}</div>
);
function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <table className="demo-table">
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}
function Win({ title, menu, on, children }: { title: string; menu: string[]; on: number; children: ReactNode }) {
  return (
    <figure className="demo" style={{ margin: 0 }} aria-label={`${title}, demo screen with made-up data`}>
      <div className="demo-bar">
        <span className="demo-dots"><i /><i /><i /></span>
        <span className="demo-title">{title}</span>
        <span className="demo-flag">Demo data</span>
      </div>
      <div className="demo-body">
        <aside className="demo-side">
          <b>{title.split(" · ")[0]}</b>
          {menu.map((m, i) => <span key={m} className={i === on ? "on" : undefined}>{m}</span>)}
        </aside>
        <div className="demo-main">{children}</div>
      </div>
    </figure>
  );
}

function Core() {
  return (
    <Win title="AmOS · Northlight Studio" menu={["Dashboard", "Leads", "Clients", "Projects", "Tasks", "Calendar", "Invoices", "Chat"]} on={0}>
      <div className="demo-kpis">
        <Kpi label="Active clients" value="24" delta="+3" />
        <Kpi label="Open tasks" value="118" delta="-12" />
        <Kpi label="Pipeline" value="£82.4k" delta="+9%" />
        <Kpi label="Invoices due" value="£11.2k" delta="4 late" bad />
      </div>
      <div className="demo-split">
        <Card title="Lead pipeline" aside="This month">
          <div className="demo-bars">
            {[["New", "86%", "41"], ["Contacted", "62%", "29"], ["Proposal", "38%", "18"], ["Won", "22%", "10"]].map(([n, w, v]) => (
              <div key={n}><span>{n}</span><i style={{ "--w": w } as CSSProperties} /><b>{v}</b></div>
            ))}
          </div>
        </Card>
        <Card title="Due today">
          <Table head={["Task", "Owner"]} rows={[["Brand deck for Alder & Finch", "Maya"], ["Reel edit, Juniper Bakery", "Tomas"], ["Invoice 0142", "Priya"]]} />
        </Card>
      </div>
    </Win>
  );
}

function Care() {
  return (
    <Win title="CareOS · Willow Court Care Home" menu={["Overview", "Shift board", "Staff", "Compliance", "Timesheets", "Residents' rota", "Reports"]} on={1}>
      <div className="demo-kpis">
        <Kpi label="Shifts this week" value="124" />
        <Kpi label="Filled" value="118" delta="95%" />
        <Kpi label="Open" value="6" delta="cover needed" bad />
        <Kpi label="Compliance alerts" value="3" delta="expiring" bad />
      </div>
      <div className="demo-split">
        <Card title="Today's shifts" aside="Mon 29">
          <Table head={["Carer", "Role", "Shift", "Status"]} rows={[
            ["Maya Okafor", "Senior carer", "07:00–15:00", <Badge key="a" t="g">Clocked in</Badge>],
            ["Daniel Reyes", "Carer", "07:00–15:00", <Badge key="b" t="g">Clocked in</Badge>],
            ["Priya Nair", "Nurse", "14:00–22:00", <Badge key="c" t="b">Confirmed</Badge>],
            ["Tomas Berg", "Carer", "22:00–07:00", <Badge key="d" t="r">Open, needs cover</Badge>],
          ]} />
        </Card>
        <Card title="Compliance">
          <Table head={["Check", "Due"]} rows={[["DBS, R. Alvarez", <Badge key="a" t="r">12 days</Badge>], ["Manual handling, D. Reyes", <Badge key="b" t="a">30 days</Badge>], ["First aid, M. Okafor", <Badge key="c" t="g">Valid</Badge>]]} />
        </Card>
      </div>
    </Win>
  );
}

function Prop() {
  return (
    <Win title="PropOS · Harbourview Estates" menu={["Portfolio", "Units", "Tenants", "Rent", "Viewings", "Maintenance", "Documents"]} on={0}>
      <div className="demo-kpis">
        <Kpi label="Units" value="86" />
        <Kpi label="Occupied" value="81" delta="94%" />
        <Kpi label="Rent due" value="£94.3k" delta="3 late" bad />
        <Kpi label="Open jobs" value="9" />
      </div>
      <div className="demo-split">
        <Card title="Properties">
          <Table head={["Building", "Units", "Occupied", "Rent roll"]} rows={[
            ["Quay House", "32", "31", "£41.6k"], ["Mill Lane Terrace", "18", "17", "£19.8k"], ["Elm Court", "24", "22", "£27.4k"], ["Harbour Mews", "12", "11", "£13.1k"],
          ]} />
        </Card>
        <Card title="Maintenance" aside="Due this week">
          <Table head={["Job", "Due"]} rows={[["Boiler service, Elm Court 4", <Badge key="a" t="a">Thu</Badge>], ["Leak, Quay House 12", <Badge key="b" t="r">Today</Badge>], ["Gutter clear, Mill Lane", <Badge key="c">Fri</Badge>]]} />
        </Card>
      </div>
    </Win>
  );
}

function Emply() {
  const col = (t: string, n: number, chips: [string, string][]) => (
    <div className="demo-col" key={t}><h5>{t}<span>{n}</span></h5>{chips.map(([a, b]) => <div className="demo-chip" key={a}>{a}<small>{b}</small></div>)}</div>
  );
  return (
    <Win title="EmplyOS · BrightHire Staffing" menu={["Pipeline", "Candidates", "Clients", "Roles", "Placements", "Timesheets", "Payroll"]} on={0}>
      <div className="demo-kpis">
        <Kpi label="Candidates" value="212" delta="+18" />
        <Kpi label="Open roles" value="23" />
        <Kpi label="Placed this month" value="31" delta="+6" />
        <Kpi label="Timesheets to approve" value="14" delta="2 late" bad />
      </div>
      <div className="demo-cols">
        {col("New", 14, [["Lena Hart", "Warehouse operative"], ["Omar Siddiq", "Forklift driver"]])}
        {col("Screened", 9, [["Grace Obi", "Customer service"], ["Jon Pike", "Picker packer"]])}
        {col("Interview", 6, [["Nadia Roy", "Team leader"]])}
        {col("Placed", 6, [["Sam Weller", "Granite Logistics"], ["Ayo Bello", "Fenwick Foods"]])}
      </div>
    </Win>
  );
}

function Rest() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows: [string, [string, string][]][] = [
    ["Aiko, Head chef", [["10–18", ""], ["10–18", ""], ["off", "off"], ["10–18", ""], ["12–22", "n"], ["12–22", "n"], ["off", "off"]]],
    ["Marco, Sous", [["off", "off"], ["12–22", "n"], ["12–22", "n"], ["12–22", "n"], ["off", "off"], ["12–22", "n"], ["10–18", ""]]],
    ["Lila, Server", [["17–23", "m"], ["17–23", "m"], ["17–23", "m"], ["off", "off"], ["17–23", "m"], ["12–23", "m"], ["12–20", "m"]]],
    ["Ben, Server", [["off", "off"], ["17–23", "m"], ["off", "off"], ["17–23", "m"], ["17–23", "m"], ["12–23", "m"], ["off", "off"]]],
    ["Zara, Bar", [["17–23", "o"], ["off", "off"], ["17–23", "o"], ["17–23", "o"], ["17–01", "o"], ["17–01", "o"], ["off", "off"]]],
  ];
  return (
    <Win title="RestOS · Saffron & Salt Kitchen" menu={["Rota", "Staff", "Swaps", "Clock-ins", "Labour cost", "Time off", "Payroll"]} on={0}>
      <div className="demo-kpis">
        <Kpi label="Hours this week" value="412" />
        <Kpi label="Labour cost" value="27.4%" delta="of sales" />
        <Kpi label="Swap requests" value="3" />
        <Kpi label="Late clock-ins" value="2" delta="this week" bad />
      </div>
      <Card title="Week rota" aside="Oct 26 to Nov 1">
        <div className="demo-grid">
          <span />{days.map((d) => <span key={d} className="h">{d}</span>)}
          {rows.map(([who, cells]) => (
            <Fragment key={who}>
              <span className="who">{who}</span>
              {cells.map(([t, k], i) => <span key={i} className={`s ${k}`.trim()}>{t}</span>)}
            </Fragment>
          ))}
        </div>
      </Card>
    </Win>
  );
}

function Payroll() {
  return (
    <Win title="Payroll · Northlight Studio" menu={["Pay runs", "Payslips", "Allowances", "Deductions", "Approvals", "Exports"]} on={0}>
      <div className="demo-kpis">
        <Kpi label="Pay period" value="Oct 2026" />
        <Kpi label="Employees" value="12" />
        <Kpi label="Gross" value="£31.8k" />
        <Kpi label="Net" value="£25.1k" delta="draft" />
      </div>
      <Card title="Pay run" aside="Ready for approval">
        <Table head={["Employee", "Days", "Gross", "Deductions", "Net", "Status"]} rows={[
          ["Maya Okafor", "22", "£3,400", "£760", "£2,640", <Badge key="a" t="g">Approved</Badge>],
          ["Tomas Berg", "21", "£2,950", "£640", "£2,310", <Badge key="b" t="g">Approved</Badge>],
          ["Priya Nair", "20", "£3,150", "£705", "£2,445", <Badge key="c" t="a">In review</Badge>],
          ["Jon Pike", "22", "£2,600", "£520", "£2,080", <Badge key="d" t="a">In review</Badge>],
        ]} />
      </Card>
      <p className="demo-note">Salary and bank fields are encrypted in AmOS. These figures are made up.</p>
    </Win>
  );
}

function Clock() {
  return (
    <Win title="Clock in / out · Saffron & Salt Kitchen" menu={["Today", "Timesheets", "Leave", "Holidays", "Reports"]} on={0}>
      <div className="demo-kpis">
        <Kpi label="In now" value="9" />
        <Kpi label="On break" value="2" />
        <Kpi label="Not in yet" value="1" delta="late" bad />
        <Kpi label="Hours today" value="61.5" />
      </div>
      <Card title="Who's in" aside="Live">
        <Table head={["Person", "Role", "In", "Break", "Status"]} rows={[
          ["Aiko", "Head chef", "09:58", "—", <span key="a" className="demo-live">Working</span>],
          ["Marco", "Sous chef", "11:55", "13:30", <Badge key="b" t="a">On break</Badge>],
          ["Lila", "Server", "16:57", "—", <span key="c" className="demo-live">Working</span>],
          ["Zara", "Bar", "—", "—", <Badge key="d" t="r">Late, due 17:00</Badge>],
        ]} />
      </Card>
    </Win>
  );
}

const SCREENS: Record<EditionKey | ServiceKey, () => ReactNode> = { core: Core, care: Care, prop: Prop, emply: Emply, rest: Rest, payroll: Payroll, clock: Clock };

export function DemoScreen({ edition }: { edition: EditionKey | ServiceKey }) {
  const Screen = SCREENS[edition];
  return (
    <>
      <Screen />
      <p className="demo-note">Demo data. Businesses and people on this screen are fictional.</p>
    </>
  );
}
