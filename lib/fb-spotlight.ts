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

/** Build the post text + link for a service, matching the manual spotlight style. */
export function buildSpotlightPost(service: Service): { message: string; link: string } {
  const bullets = service.bullets.map((b) => `✅ ${b}`).join("\n");
  const link = `${SITE_URL}/services/${service.slug}`;
  const message =
    `🔦 Service Spotlight: ${service.title}\n\n` +
    `${service.desc}\n\n` +
    `What you get:\n${bullets}\n\n` +
    `👉 Learn more: ${link}\n` +
    `📩 info@boasystemz.com`;
  return { message, link };
}
