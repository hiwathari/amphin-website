# amphin-website

The public website for Amphin® at **amphin.agency**: Next.js 14 on Vercel, with content and form
submissions living in AMOS (the Amphin Agency OS, `hiwathari/amos`, at os.amphin.agency).

## How it fits together

- **Regions.** Every page exists under `/uk`, `/eu`, `/us`, `/in` and `/ae`. `src/middleware.ts`
  sends visitors to their region from Vercel's `x-vercel-ip-country` header and remembers the choice in
  the `amphin_region` cookie. Crawlers get `/uk` plus `hreflang` alternates for every region.
- **Prices.** Each service and package has one price column per region (`content/seed/prices.json`
  today, `web_prices` in AMOS later). An empty price shows "Contact for pricing" with a quote form.
- **Content.** `src/lib/content.ts` is the only read path. It serves `content/seed/*.json` (built from
  the amphin.com export by `npm run seed:build`) until the AMOS `web_*` tables are live.
- **Forms.** `/api/lead`, `/api/apply`, `/api/connect` and `/api/newsletter` write into AMOS using a
  low-privilege database role (`WEBSITE_DATABASE_URL`). Contact and quote forms create **Leads** with
  source `website`. Every endpoint has a honeypot, a per-IP rate limit and an optional Cloudflare
  Turnstile check.
- **Admin.** There is no admin code here. `/login` links to AMOS for staff and the client portal;
  `/admin` redirects to AMOS → Website.
- **Publishing.** AMOS calls `POST /api/revalidate` with `x-revalidate-secret` and a list of paths
  after a publish, and those pages refresh in every region.

## Environment variables

| Name | Purpose |
| --- | --- |
| `WEBSITE_DATABASE_URL` | Supabase transaction-pooler URL for the `amphin_website` role (see `db/001_web_tables.sql`) |
| `REVALIDATE_SECRET` | Shared secret AMOS sends when it publishes |
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret; forms skip the check until it is set |

Without `WEBSITE_DATABASE_URL` the forms still answer "ok" and log a warning, so previews work.

## Develop

```
npm install
npm run dev          # http://localhost:3000 → redirects to /uk
npm run build
```

## Database

`db/001_web_tables.sql` creates the `web_*` tables and the `amphin_website` role in AMOS's
Supabase project. It has not been applied yet; apply it from the Supabase SQL editor, then set
the role's password in Supabase and put its connection string in Vercel.
