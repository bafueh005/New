// Client-side conversion tracking. Fans a single event out to whichever
// analytics tags are present (GA4 gtag, Meta Pixel fbq, LinkedIn lintrk).
// Safe to call when none are loaded — it just no-ops.

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, data?: unknown) => void;
  }
}

/** Map our semantic events to a Meta standard event where one fits. */
const META_EVENT: Record<string, string> = {
  lead_submitted: "Lead",
  consultation_booked: "Schedule",
  whatsapp_click: "Contact",
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
    const metaEvent = META_EVENT[event];
    if (metaEvent) window.fbq?.("track", metaEvent, params);
    window.lintrk?.("track", { conversion_id: event });
  } catch {
    // analytics must never break the UI
  }
}
