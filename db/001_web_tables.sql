-- Website tables for AMOS's Supabase Postgres (project amphin-agency-os).
-- Phase 1: the tables the public site writes to, plus the content tables the AMOS Website
-- module will manage. Safe to run more than once.

create table if not exists web_applications (
  id bigserial primary key,
  job_slug text not null,
  name text not null,
  email text not null,
  phone text default '',
  linkedin text default '',
  portfolio text default '',
  message text default '',
  cv_filename text,
  cv_key text,                      -- Cloudflare R2 object key, set once uploads are wired
  status text not null default 'new' check (status in ('new','reviewing','shortlisted','interview','offer','hired','rejected')),
  created_at timestamptz not null default now()
);
create index if not exists web_applications_job_idx on web_applications (job_slug, created_at desc);

create table if not exists web_newsletter (
  id bigserial primary key,
  email text not null unique,
  region text not null default 'uk',
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists web_connect_signups (
  id bigserial primary key,
  type text not null check (type in ('influencer','brand')),
  name text not null,
  email text not null,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists web_events (
  id bigserial primary key,
  path text not null,
  region text,
  referrer text,
  utm text,
  lead_id bigint,
  created_at timestamptz not null default now()
);

-- Content managed from AMOS → Website. Every content table shares status / audit columns.
create table if not exists web_service_pillars (
  slug text primary key, title text not null, icon text default 'spark', pitch text default '', body text default '',
  sort int not null default 0, seo jsonb default '{}'::jsonb,
  status text not null default 'draft', created_by int, updated_by int, published_at timestamptz, deleted_at timestamptz,
  updated_at timestamptz not null default now()
);
create table if not exists web_services (
  slug text primary key, pillar text not null references web_service_pillars(slug), title text not null,
  intro text default '', body jsonb default '[]'::jsonb, faqs jsonb default '[]'::jsonb, old_urls text[] default '{}',
  sort int not null default 0, seo jsonb default '{}'::jsonb,
  status text not null default 'draft', created_by int, updated_by int, published_at timestamptz, deleted_at timestamptz,
  updated_at timestamptz not null default now()
);
create table if not exists web_prices (
  item text primary key, label text not null, pillar text references web_service_pillars(slug), service text references web_services(slug),
  period text default 'per month', prefix text default 'From', features jsonb default '[]'::jsonb, highlight boolean default false,
  price_uk numeric, price_eu numeric, price_us numeric, price_in numeric, price_ae numeric,  -- empty = "Contact for pricing"
  note text default '', sort int not null default 0, updated_by int, updated_at timestamptz not null default now()
);
create table if not exists web_projects (
  slug text primary key, title text not null, client text default '', year int, summary text default '', body jsonb default '[]'::jsonb,
  categories text[] default '{}', featured boolean default false, cover_key text, old_url text, seo jsonb default '{}'::jsonb,
  status text not null default 'draft', created_by int, updated_by int, published_at timestamptz, deleted_at timestamptz,
  updated_at timestamptz not null default now()
);
create table if not exists web_project_media (
  id bigserial primary key, project text not null references web_projects(slug) on delete cascade,
  r2_key text not null, alt text default '', width int, height int, sort int not null default 0
);
-- Two-way link: a project lists its services; a service page lists its projects.
create table if not exists web_project_services (
  project text not null references web_projects(slug) on delete cascade,
  service text not null references web_services(slug) on delete cascade,
  sort int not null default 0,
  primary key (project, service)
);
create table if not exists web_posts (
  slug text primary key, title text not null, excerpt text default '', body jsonb default '[]'::jsonb, author_id int,
  categories text[] default '{}', tags text[] default '{}', cover_key text, old_url text, seo jsonb default '{}'::jsonb,
  status text not null default 'draft', created_by int, updated_by int, published_at timestamptz, deleted_at timestamptz,
  updated_at timestamptz not null default now()
);
create table if not exists web_jobs (
  slug text primary key, title text not null, type text default 'Full-time', location text default '', region text default 'in',
  salary text default '', description jsonb default '[]'::jsonb, responsibilities jsonb default '[]'::jsonb, qualifications jsonb default '[]'::jsonb,
  deadline date, status text not null default 'draft', created_by int, updated_by int, published_at timestamptz, deleted_at timestamptz,
  updated_at timestamptz not null default now()
);
create table if not exists web_offices (
  slug text primary key, name text not null, city text, country text, address text[] default '{}', phone text, whatsapp text,
  email text, hours text, map_query text, regions text[] default '{}', active boolean default true, sort int default 0
);
create table if not exists web_social_accounts (
  id bigserial primary key, platform text not null, handle text, url text not null, office text references web_offices(slug)
);
create table if not exists web_social_posts (
  id bigserial primary key, platform text not null, url text not null, thumbnail_key text, caption text default '', posted_at date
);
create table if not exists web_social_links (
  social_post bigint not null references web_social_posts(id) on delete cascade,
  item_type text not null check (item_type in ('project','service','post')),
  item_id text not null,
  primary key (social_post, item_type, item_id)
);
create table if not exists web_clients (id bigserial primary key, name text not null, logo_key text, url text, sort int default 0, visible boolean default true);
create table if not exists web_testimonials (
  id bigserial primary key, person text not null, role text, company text, quote text not null, project text references web_projects(slug),
  approved boolean not null default false, sort int default 0
);
create table if not exists web_team (id bigserial primary key, name text not null, role text, photo_key text, bio text, sort int default 0, visible boolean default true);
create table if not exists web_legal_pages (
  slug text primary key, title text not null, summary text default '', body jsonb default '[]'::jsonb,
  version text not null default '0.1', effective_date date, updated_by int, updated_at timestamptz not null default now()
);
create table if not exists web_redirects (from_path text primary key, to_path text not null, code int not null default 301);
create table if not exists web_revisions (
  id bigserial primary key, table_name text not null, row_key text not null, data jsonb not null, edited_by int, created_at timestamptz not null default now()
);

-- Low-privilege role for the website (WEBSITE_DATABASE_URL). It can add form submissions and
-- read content tables; it cannot read staff, salaries, invoices, clients or other leads.
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'amphin_website') then
    create role amphin_website login password null;  -- set a password in the Supabase dashboard, never in this file
  end if;
end $$;
grant usage on schema public to amphin_website;
grant insert on leads, web_applications, web_newsletter, web_connect_signups, web_events to amphin_website;
grant usage on all sequences in schema public to amphin_website;
grant select on web_service_pillars, web_services, web_prices, web_projects, web_project_media, web_project_services,
  web_posts, web_jobs, web_offices, web_social_accounts, web_social_posts, web_social_links, web_clients,
  web_testimonials, web_team, web_legal_pages, web_redirects to amphin_website;
