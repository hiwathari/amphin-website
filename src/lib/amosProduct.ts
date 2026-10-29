// Content for the AmOS product pages: editions, features, the timeline and the questions people ask.
// Everything here is plain data so it can be edited without touching the page code.
// Demo names are fictional. Dates in TIMELINE come from AmOS's own records (first user account, first
// clients and tasks, first invoices, domains and storage set-up); see docs/AMOS-TIMELINE.md.

export type EditionKey = "core" | "care" | "prop" | "emply" | "rest" | "payroll" | "clock";

export interface Edition {
  key: EditionKey;
  name: string;
  tagline: string;
  forWho: string;
  builtFor?: string;
  demoBusiness: string;
  summary: string;
  features: string[];
}

export const EDITIONS: Edition[] = [
  {
    key: "core", name: "AmOS Core", tagline: "The operating system for agencies and service teams",
    forWho: "Marketing, creative and professional-service agencies", builtFor: "Amphin, which runs every client, project and payment on it",
    demoBusiness: "Northlight Studio",
    summary: "Leads, clients, projects, tasks, the content calendar, people, attendance, payroll, invoices, chat and the company website, all behind one login.",
    features: ["CRM and lead pipeline with due-today filters", "Clients, health scores and a client portal", "Projects, tasks, approvals and workload", "Content calendar and production tracking", "Invoices, expenses and finance reports", "Team chat, shared inbox and announcements"],
  },
  {
    key: "care", name: "CareOS", tagline: "Staff, placements and shifts for care providers",
    forWho: "Care homes and care-staffing agencies", builtFor: "Care Nest",
    demoBusiness: "Willow Court Care Home",
    summary: "Register carers, nurses and senior carers, match them to homes and shifts, track compliance dates and see who is on duty right now.",
    features: ["Staff register with role, rate and availability", "Shift board with open, offered and confirmed shifts", "Compliance dates and expiry alerts", "Clock in and out against each shift", "Timesheets that feed payroll and invoices", "Home and client records"],
  },
  {
    key: "prop", name: "PropOS", tagline: "Property management without the spreadsheets",
    forWho: "Lettings, estate agents and property managers", builtFor: "PropKit and Parrot Realty",
    demoBusiness: "Harbourview Estates",
    summary: "Properties, units, tenants, rent, viewings and maintenance in one place, with every job and conversation attached to the right building.",
    features: ["Portfolio of properties and units", "Tenants, tenancy dates and rent due", "Viewings and enquiry pipeline", "Maintenance tickets with owners and due dates", "Landlord and tenant documents", "Reports by property and by month"],
  },
  {
    key: "emply", name: "EmplyOS", tagline: "Employee management for staffing agencies",
    forWho: "Staffing and recruitment agencies",
    demoBusiness: "BrightHire Staffing",
    summary: "Candidates, clients and placements on one board, with timesheets approved by the client and passed straight to payroll and invoicing.",
    features: ["Candidate pipeline from new to placed", "Client accounts and open roles", "Placements, rates and margins", "Timesheet approvals", "Right-to-work and document tracking", "Hiring notes and feedback"],
  },
  {
    key: "rest", name: "RestOS", tagline: "Shifts and labour for restaurants and hospitality",
    forWho: "Restaurants, cafés, hotels and event venues",
    demoBusiness: "Saffron & Salt Kitchen",
    summary: "Build the weekly rota, let staff swap and clock in, and watch labour cost against sales while the shift is still running.",
    features: ["Weekly rota by role and station", "Shift swaps and time-off requests", "Clock in, breaks and clock out", "Labour cost against sales", "Late and no-show flags", "Hours that flow into payroll"],
  },
  {
    key: "payroll", name: "Payroll", tagline: "Salary runs from the hours you already recorded",
    forWho: "Every edition",
    demoBusiness: "Northlight Studio",
    summary: "Monthly payroll built from attendance, leave and agreed pay, with payslips for each person and sensitive pay data encrypted.",
    features: ["Pay runs from attendance and leave", "Payslips for each employee", "Allowances and deductions", "Approvals before a run is final", "Encrypted salary and bank fields", "Exports for your accountant"],
  },
  {
    key: "clock", name: "Clock in / out", tagline: "Attendance people actually use",
    forWho: "Every edition",
    demoBusiness: "Saffron & Salt Kitchen",
    summary: "One tap to start and finish the day or the shift, with leave, holidays and work-from-home days in the same record.",
    features: ["Clock in and clock out", "Breaks and overtime", "Leave and holiday calendar", "Work-from-home days", "Late and missing clock-in flags", "Daily and monthly attendance reports"],
  },
];

export const FEATURES: { name: string; text: string }[] = [
  { name: "Sales and CRM", text: "Leads move stage by stage, with a due-today view so nothing goes cold, and every client gets a health score and tier." },
  { name: "Clients and portal", text: "Client accounts, onboarding checklists, and a portal where clients see their own work, logos and invoices." },
  { name: "Projects and tasks", text: "From brief to approval: projects, tasks, deliverables, workload and capacity in one flow." },
  { name: "People and hiring", text: "Employees, org chart, a hiring pipeline with notes and feedback, and display names people choose for themselves." },
  { name: "Attendance and leave", text: "Clock in and out, holidays, leave and work-from-home days, with daily and monthly reports." },
  { name: "Payroll", text: "Salary runs built from the attendance and leave you already recorded, with payslips and encrypted pay fields." },
  { name: "Money", text: "Invoices, expenses, finance reports and an executive dashboard that shows where the business stands today." },
  { name: "Team chat and email", text: "R-Chat for the team, a shared inbox for the business and announcements everyone sees." },
  { name: "Inventory and deliveries", text: "Stock, assets and deliveries tracked against the people and projects that use them." },
  { name: "Website studio", text: "Run the company website from the same login: blogs, works, services, vacancies, approvals and visitor numbers." },
  { name: "Roles and security", text: "Role-based access, signed sessions, logged changes and encryption for sensitive employee data." },
];

// ---- timeline ---------------------------------------------------------------------------------

export interface TimelineEntry { date: string; era: string; title: string; text: string }

export const TIMELINE: TimelineEntry[] = [
  { date: "2026-07-26", era: "AmOS 1 · Foundation", title: "The first account is created", text: "AmOS starts as Amphin's own operating system. The database is set up and the first team account is created." },
  { date: "2026-07-27", era: "AmOS 1 · Foundation", title: "AmOS goes online", text: "The application is deployed on Vercel, so the team can sign in from anywhere." },
  { date: "2026-07-30", era: "AmOS 1 · Foundation", title: "Its own address", text: "AmOS gets its own addresses at os.amphin.agency and amos.amphin.com, ready for the whole team." },
  { date: "2026-08-04", era: "AmOS 1 · Foundation", title: "Files and photos", text: "Cloud file storage is connected for profile photos, documents and client logos." },
  { date: "2026-08-19", era: "AmOS 1 · Operations", title: "R-Chat, the team chat", text: "The first messages are sent in AmOS's built-in team chat, so conversations stay next to the work." },
  { date: "2026-08-27", era: "AmOS 1 · Operations", title: "Clients, projects and tasks", text: "Clients, projects and the task board go live, and day-to-day agency work moves into AmOS." },
  { date: "2026-08-30", era: "AmOS 1 · Operations", title: "Leads and invoices", text: "The lead pipeline and invoicing start, so selling and getting paid happen in the same system." },
  { date: "2026-09-19", era: "AmOS 1 · Operations", title: "Email and integrations", text: "The shared inbox and secure integrations are connected, with keys encrypted at rest." },
  { date: "2026-10-21", era: "AmOS 1 · Website and hiring", title: "Security hardening", text: "A review tightens server actions and public endpoints before AmOS opens to the public website." },
  { date: "2026-10-24", era: "AmOS 1 · Website and hiring", title: "Website module and hiring pipeline", text: "The company website now reads from AmOS: portfolio, blogs, services, vacancies, team photos and approvals, plus a hiring pipeline for HR." },
  { date: "2026-10-25", era: "AmOS 1 · Website and hiring", title: "Studio", text: "Studio, the website dashboard, arrives with its own login: media library with compression, visitor analytics, settings and approvals." },
  { date: "2026-10-28", era: "AmOS 1 · Website and hiring", title: "dashboard.amphin.agency", text: "Studio gets its own address, and the website feed is rebuilt to be fast and reliable." },
  { date: "2026-10-29", era: "AmOS 2.0", title: "AmOS 2.0", text: "One platform, several editions: AmOS Core plus CareOS, PropOS, EmplyOS and RestOS, with payroll and clock in and out shared across them. It is handed to three agencies for testing." },
];

export const ERAS = Array.from(new Set(TIMELINE.map((t) => t.era)));

export const FAQ: [string, string][] = [
  ["What is AmOS?", "AmOS (A Marketer's OS) is an operating system for businesses that run on people, work and clients. It brings CRM, projects, tasks, HR, attendance, payroll, invoicing, chat and the company website into one secure system. Amphin built it to run its own agency, and AmOS 2.0 adds editions for care providers, property managers, staffing agencies and restaurants."],
  ["What is the difference between AmOS Core, CareOS, PropOS, EmplyOS and RestOS?", "AmOS Core is the foundation for agencies and service teams. The other editions use the same foundation (people, attendance, payroll, invoices, chat) and add what a particular industry needs: shifts and compliance for care, properties and tenants for property management, candidates and placements for staffing, rotas and labour cost for restaurants."],
  ["Is AmOS being used today?", "Yes. Amphin runs its own agency on AmOS every day. CareOS was built for Care Nest, and PropOS for PropKit and Parrot Realty. AmOS has also been handed to three agencies, which are testing it now."],
  ["Are the demo screens real customer data?", "No. The screens on this page use made-up businesses and people (Northlight Studio, Willow Court Care Home, Harbourview Estates, BrightHire Staffing and Saffron & Salt Kitchen). The screenshots in the 'Real screens' section come from AmOS's public demo workspace, which holds sample data only."],
  ["Can AmOS be customised for my business?", "Yes. Roles, permissions, pipelines, services and modules are set up around each business, and Amphin builds new modules where they are needed."],
  ["How do I get AmOS?", "Book a demo below. We show it working on a business like yours and plan the setup, data migration and training with you."],
];
