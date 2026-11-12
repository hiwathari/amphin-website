import type { Content } from "./content";

// Clients Amphin has served (every client in AMOS, not just the ones with a logo on the wall). The AMOS feed
// supplies the live number; until it does, this is the count at the time of writing.
const CLIENTS_FALLBACK = 56;

export function clientCount(c: Content): number {
  return c.stats?.clients ?? Math.max(CLIENTS_FALLBACK, c.clients.length);
}
