import { SERVICES, type Service } from "@/lib/services-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://boasystemz.com";
const DAY_MS = 24 * 60 * 60 * 1000;

// Stateless rotation. Anchored to Mon 2024-01-01 (UTC), so each week maps to a
// fixed pair of slots and every Tue/Thu posting slot gets a unique, increasing
// index. We cycle through every service before any repeats — no datastore needed.
const EPOCH = Date.UTC(2024, 0, 1); // a Monday

/** Index into SERVICES for the spotlight that should run on `date`. */
export function spotlightIndexFor(date: Date = new Date()): number {
  const days = Math.floor((date.getTime() - EPOCH) / DAY_MS);
  const week = Math.floor(days / 7);
  const isLateWeek = date.getUTCDay() >= 4; // Thu(4)+ → second slot of the week; Tue → first
  const slot = week * 2 + (isLateWeek ? 1 : 0);
  const n = SERVICES.length;
  return ((slot % n) + n) % n;
}

/** Remove dashes from prose: split hyphenated words, turn em/en dashes into commas. */
function dashFree(s: string): string {
  return s
    .replace(/(\w)[—–-](\w)/g, "$1 $2") // intra-word hyphen/em/en dash -> space
    .replace(/\s*[—–]\s*/g, ", ") // remaining em/en dash -> comma
    .replace(/\s+-\s+/g, ", ") // " - " separator -> comma
    .replace(/-/g, " ") // any leftover hyphen -> space
    .replace(/ {2,}/g, " "); // collapse double spaces
}

/**
 * Build the post text + link for a service, matching the manual spotlight style.
 * The visible text is dash-free; the clickable link attachment still uses the
 * real (hyphenated) service URL so it resolves correctly.
 */
export function buildSpotlightPost(service: Service): { message: string; link: string } {
  const bullets = service.bullets.map((b) => `✅ ${dashFree(b)}`).join("\n");
  const link = `${SITE_URL}/services/${service.slug}`;
  const domain = SITE_URL.replace(/^https?:\/\//, ""); // bare domain, no hyphenated path
  const message =
    `🔦 Service Spotlight: ${dashFree(service.title)}\n\n` +
    `${dashFree(service.desc)}\n\n` +
    `What you get:\n${bullets}\n\n` +
    `👉 Learn more: ${domain}\n` +
    `📩 info@boasystemz.com`;
  return { message, link };
}
