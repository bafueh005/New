// Server-side conversion forwarding. Used by the confirmed-booking webhook to
// report a real, completed consultation to GA4 (Measurement Protocol) and Meta
// (Conversions API). Both are env-gated and fault-tolerant — a missing config
// or a failed call no-ops and never throws.

import crypto from "node:crypto";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA4_API_SECRET = process.env.GA4_API_SECRET;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const META_API_VERSION = "v21.0";

/** Normalize + SHA-256, as required for Meta user-data matching. */
function hash(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export type Conversion = {
  email?: string;
  /** Stable id for cross-platform dedup. */
  eventId: string;
  value?: number;
  currency?: string;
};

/** GA4 Measurement Protocol — records a `consultation_booked` event. */
export async function sendGA4Conversion(c: Conversion): Promise<boolean> {
  if (!GA_ID || !GA4_API_SECRET) {
    console.warn("GA4 Measurement Protocol not configured — skipping.");
    return false;
  }
  // We don't have the visitor's original `_ga` client_id (the booking happens
  // off-site), so derive a stable pseudo client_id from the email — repeat
  // bookings group together, but this won't stitch to the original web session.
  const seed = c.email ? parseInt(hash(c.email).slice(0, 12), 16) : Math.floor(Math.random() * 1e12);
  const clientId = `${seed}.${Math.floor(Date.now() / 1000)}`;
  try {
    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_ID}&api_secret=${GA4_API_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          ...(c.email ? { user_id: hash(c.email) } : {}),
          events: [
            {
              name: "consultation_booked",
              params: {
                method: "microsoft_bookings",
                trigger: "confirmed",
                value: c.value ?? 0,
                currency: c.currency ?? "USD",
              },
            },
          ],
        }),
      },
    );
    if (!res.ok) {
      console.error("GA4 MP failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("GA4 MP threw", err);
    return false;
  }
}

/** Meta Conversions API — records a server-side "Schedule" event. */
export async function sendMetaConversion(c: Conversion): Promise<boolean> {
  if (!META_PIXEL_ID || !META_CAPI_TOKEN) {
    console.warn("Meta Conversions API not configured — skipping.");
    return false;
  }
  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: "Schedule",
              event_time: Math.floor(Date.now() / 1000),
              action_source: "system_generated",
              event_id: c.eventId,
              user_data: c.email ? { em: [hash(c.email)] } : {},
              custom_data: { value: c.value ?? 0, currency: c.currency ?? "USD" },
            },
          ],
        }),
      },
    );
    if (!res.ok) {
      console.error("Meta CAPI failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Meta CAPI threw", err);
    return false;
  }
}
