# AmOS timeline: where the dates come from

The timeline on /amos (`src/lib/amosProduct.ts`, `TIMELINE`) only uses dates that can be checked.

| Entry | Source |
| --- | --- |
| 26 Jul 2026 first account | earliest user record in the AmOS database |
| 27 Jul, 30 Jul | first Vercel deployment and domain assignment dates |
| 4 Aug | first file stored in cloud storage |
| 19 Aug, 27 Aug, 30 Aug, 19 Sep | first chat message, first client/project/task, first lead/invoice, first email/integration record |
| 21-28 Oct | git history of `hiwathari/amos` (security review, website module, Studio, dashboard domain) |
| 29 Oct 2026 AmOS 2.0 | release date given by the founder |

Not yet confirmed by the founder: the real story of how AmOS began, what "AmOS 1.0" and "2.0" contain in the founder's words, and the real status of EmplyOS and RestOS. Edit `TIMELINE`, `ERAS` and `EDITIONS` to change what the page says.

## Entries from Nov 2025 to Jun 2026 (research era)

The seven "Before AmOS · Research" entries (3 Nov 2025 to 22 Jun 2026) were written from the founder's brief: research, first pitch, pilot conversations and architecture. The exact dates and wording are placeholders, not taken from system records, so the founder must confirm or correct them before the page is promoted. They deliberately name no clients, numbers or awards.

## Integration statuses

"live" means the connector exists in AmOS (src/lib/integrations.ts: Zoho Invoice, BotSailor WhatsApp, Google Sheets; plus IMAP/SMTP, Resend, R2). "ready" and "roadmap" are not shipped connectors and must stay labelled that way.
