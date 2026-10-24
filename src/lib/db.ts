import "server-only";
import postgres from "postgres";

// Connection to AMOS's Supabase Postgres, using a dedicated low-privilege role for the website:
// it may INSERT form submissions (leads, web_applications, web_connect_signups, web_newsletter,
// web_events) and SELECT the published web_* views, and nothing else.
// Same pooler settings AMOS uses (see amos/src/lib/db.ts).
type Sql = ReturnType<typeof postgres>;
declare global {
  // eslint-disable-next-line no-var
  var _webSql: Sql | undefined;
}

export function hasDb(): boolean {
  return !!process.env.WEBSITE_DATABASE_URL;
}

export function sql(): Sql {
  if (global._webSql) return global._webSql;
  const url = (process.env.WEBSITE_DATABASE_URL || "").trim();
  if (!url) throw new Error("WEBSITE_DATABASE_URL is not set");
  const host = new URL(url).hostname;
  global._webSql = postgres(url, {
    prepare: false,
    ...({ max_pipeline: 1 } as Record<string, unknown>),
    ssl: host.includes("localhost") ? false : "require",
    max: 3,
    idle_timeout: 20,
    connect_timeout: 10,
    max_lifetime: 600,
    connection: { statement_timeout: 8000 },
  });
  return global._webSql;
}
