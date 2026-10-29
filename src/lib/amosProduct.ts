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
  { date: "2025-11-03", era: "Before AmOS · Research", title: "The problem is named", text: "Amphin, running its own agency, keeps hitting the same wall: leads in one tool, work in another, hours in a third, invoices in a fourth. The idea of one operating system for a service business is written down." },
  { date: "2025-11-24", era: "Before AmOS · Research", title: "Research with real businesses", text: "Conversations with agencies, care providers, property managers and staffing teams map where time and money leak: shifts, timesheets, compliance dates, rent, payroll and follow-ups." },
  { date: "2025-12-15", era: "Before AmOS · Research", title: "What teams already use", text: "A survey of the tools businesses depend on (accounting, HR, time tracking, messaging) shapes the rule that AmOS must connect to them and import their data instead of forcing a restart." },
  { date: "2026-01-19", era: "Before AmOS · Research", title: "Concept and first designs", text: "The first flows and screens are drawn: dashboard, pipeline, task board, attendance and payroll, with the visual language that becomes AmOS." },
  { date: "2026-02-23", era: "Before AmOS · Research", title: "First pitch", text: "The concept is pitched to a small circle of businesses. Their feedback decides what has to exist before anyone is invited: security, roles, audit trail and reliable payroll." },
  { date: "2026-04-13", era: "Before AmOS · Research", title: "Pilot conversations", text: "Care, property and agency businesses are interviewed again with early prototypes, which shapes the editions that become CareOS, PropOS and AmOS Core." },
  { date: "2026-06-22", era: "Before AmOS · Research", title: "Architecture decided", text: "The stack is chosen for security and scale: a relational database, signed sessions, encrypted credentials, object storage and a deployment pipeline with instant rollback." },
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
  ["Which tools does AmOS integrate with?", "WhatsApp Business API, Zoho Invoice, Google Sheets, a shared IMAP and SMTP inbox, Resend email and Cloudflare R2 storage are live today. Others, such as Xero, QuickBooks, BambooHR, Clockify and Toggl, connect on request through their public APIs or export files, and more are on the roadmap. The integrations section on this page shows each one with its status."],
  ["Can we move our data over from our current software?", "Yes. Employees, clients, leads, invoices, timesheets and tasks can be imported from CSV and Excel exports, with a preview before anything is saved. Teams usually run AmOS next to their current tools and switch one module at a time. A full export is available whenever you want it."],
  ["Is AmOS only for small businesses?", "No. AmOS is designed for teams of any size, from a few people to large organisations, with roles, approvals, organisation charts and audit logs. Large rollouts are scoped, tested and phased with the client before go-live."],
  ["How do I get AmOS?", "Book a demo below. We show it working on a business like yours and plan the setup, data migration and training with you."],
];

// ---- stack and integrations ---------------------------------------------------------------------
// STACK lists what AmOS actually runs on today. In INTEGRATIONS, "live" means the connector is built
// and in AmOS now; "ready" means it can be connected on request using the provider's public API or an
// import file; "roadmap" means planned. Keep these statuses accurate when a connector ships.

export const STACK: { group: string; items: string[] }[] = [
  { group: "Application", items: ["Next.js 14 (App Router)", "React 18", "TypeScript 5", "Server actions and signed API routes"] },
  { group: "Data", items: ["PostgreSQL", "Row-level role checks in the app layer", "Daily backups", "Audit trail for sensitive changes"] },
  { group: "Security", items: ["Signed sessions (JOSE / JWT)", "bcrypt password hashing", "AES encryption for stored credentials", "Rate limiting and consent controls"] },
  { group: "Files and media", items: ["Cloudflare R2 (S3-compatible)", "Presigned uploads", "Sharp image compression"] },
  { group: "Email and messaging", items: ["IMAP and SMTP shared inbox", "Resend transactional email", "WhatsApp Business API"] },
  { group: "Hosting", items: ["Vercel edge network and serverless", "Cloudflare DNS", "Instant rollback", "Separate production and preview environments"] },
];

export type IntStatus = "live" | "ready" | "roadmap";
export interface IntegrationGroup { group: string; blurb: string; items: { name: string; status: IntStatus }[] }

export const INTEGRATIONS: IntegrationGroup[] = [
  { group: "Invoicing and accounting", blurb: "Keep AmOS as the billing record and sync to the books, or import existing invoices.", items: [
    { name: "Zoho Invoice", status: "live" }, { name: "Zoho Books", status: "ready" }, { name: "Xero", status: "ready" }, { name: "QuickBooks", status: "ready" },
    { name: "FreshBooks", status: "ready" }, { name: "Sage", status: "ready" }, { name: "Tally", status: "ready" }, { name: "Wave", status: "roadmap" }, { name: "Invoice Ninja", status: "roadmap" }, { name: "Stripe", status: "ready" }, { name: "Razorpay", status: "ready" }, { name: "PayPal", status: "roadmap" } ] },
  { group: "HR and people", blurb: "Bring employees, leave and documents across from the system you use now.", items: [
    { name: "BambooHR", status: "ready" }, { name: "Zoho People", status: "ready" }, { name: "Workday", status: "roadmap" }, { name: "Gusto", status: "roadmap" }, { name: "Deel", status: "roadmap" }, { name: "Keka", status: "ready" }, { name: "greytHR", status: "ready" }, { name: "Personio", status: "roadmap" }, { name: "CSV or Excel import", status: "live" } ] },
  { group: "Time tracking and attendance", blurb: "AmOS has its own clock in and out. Existing trackers can feed it or be replaced by it.", items: [
    { name: "AmOS clock in and out", status: "live" }, { name: "Google Sheets attendance export", status: "live" }, { name: "Clockify", status: "ready" }, { name: "Toggl Track", status: "ready" }, { name: "Harvest", status: "ready" }, { name: "Apploye", status: "ready" }, { name: "Hubstaff", status: "roadmap" }, { name: "Biometric and QR devices", status: "roadmap" } ] },
  { group: "Messaging and email", blurb: "Talk to clients and candidates from the record they belong to.", items: [
    { name: "WhatsApp Business API", status: "live" }, { name: "Shared inbox (IMAP and SMTP)", status: "live" }, { name: "Resend", status: "live" }, { name: "Gmail", status: "ready" }, { name: "Microsoft 365 Outlook", status: "ready" }, { name: "Slack", status: "roadmap" }, { name: "Microsoft Teams", status: "roadmap" }, { name: "Twilio SMS", status: "roadmap" } ] },
  { group: "Productivity and files", blurb: "Calendars, documents and storage the team already lives in.", items: [
    { name: "Google Sheets", status: "live" }, { name: "Cloudflare R2 storage", status: "live" }, { name: "Google Workspace", status: "ready" }, { name: "Google Calendar", status: "ready" }, { name: "Microsoft 365", status: "ready" }, { name: "Dropbox", status: "roadmap" }, { name: "Notion", status: "roadmap" }, { name: "Zoom and Google Meet", status: "roadmap" } ] },
  { group: "CRM, marketing and ads", blurb: "Leads from every channel land in one pipeline.", items: [
    { name: "Website forms (Amphin sites)", status: "live" }, { name: "Meta lead ads", status: "ready" }, { name: "Google Ads", status: "ready" }, { name: "HubSpot", status: "ready" }, { name: "Zoho CRM", status: "ready" }, { name: "Salesforce", status: "roadmap" }, { name: "Mailchimp", status: "roadmap" }, { name: "Zapier and Make", status: "ready" } ] },
  { group: "Industry systems", blurb: "For the editions: care, property, staffing and hospitality.", items: [
    { name: "DBS and compliance checks", status: "roadmap" }, { name: "Property portals (Rightmove, Zoopla)", status: "roadmap" }, { name: "Tenancy deposit schemes", status: "roadmap" }, { name: "Job boards (Indeed, LinkedIn)", status: "roadmap" }, { name: "POS systems (Square, Toast)", status: "roadmap" }, { name: "Payroll providers", status: "ready" } ] },
];

export const IMPORTS = [
  { t: "Import from anything", d: "Employees, clients, leads, invoices, timesheets and tasks come in from CSV and Excel exports, with a mapping step and a preview before anything is saved." },
  { t: "Switch without a restart", d: "Run AmOS next to your current tools while the team moves over. Each module can replace the tool it covers: invoicing, HR records, time tracking, chat." },
  { t: "Your data stays yours", d: "Credentials are encrypted, access is role-based, changes are logged, and a full export is available whenever you want to leave." },
  { t: "Connect through open APIs", d: "Where a tool has a public API we connect to it directly. Where it does not, AmOS reads its export files, so nothing is a dead end." },
];

export const SCALES = [
  { t: "Small teams", d: "From a handful of people. Core modules switched on, set up in days." },
  { t: "Growing agencies and groups", d: "Several offices, regions and currencies, with roles and approvals per team." },
  { t: "Large organisations", d: "Organisation charts, role-based access, audit logs and integrations through APIs. Large rollouts are scoped, load-tested and phased with the client before go-live." },
];
