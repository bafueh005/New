"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Microsoft Bookings scheduler embed + conversion tracking.
//
// IMPORTANT: Bookings runs in a cross-origin iframe and does not expose a
// documented "booking confirmed" event to the parent window, so we cannot read
// the actual confirmation. The reliable client-side signal is "a qualified
// visitor reached the scheduler" — they already completed the contact form
// (name, email, role, goal) to get here, so this is a strong conversion proxy.
// We fire `consultation_booked` on that. For confirmed-booking counting, wire a
// Microsoft Bookings / Graph webhook to a server-side conversion (GA4
// Measurement Protocol / Meta CAPI) — see docs/marketing/setup-guide.md.

export function BookingEmbed({ url }: { url: string }) {
  useEffect(() => {
    track("consultation_booked", {
      method: "microsoft_bookings",
      trigger: "scheduler_opened",
    });

    // Best-effort: if Bookings (or a future config) ever posts a completion
    // message, capture it as a distinct, higher-confidence event. Harmless if
    // it never fires.
    function onMessage(e: MessageEvent) {
      let host = "";
      try {
        host = new URL(e.origin).hostname;
      } catch {
        return;
      }
      const isMicrosoft =
        /(?:^|\.)(?:office365|office|outlook|microsoft)\.com$/i.test(host) ||
        /(?:^|\.)cloud\.microsoft$/i.test(host);
      if (!isMicrosoft) return;
      const payload =
        typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      if (/confirm|booked|success|appointment/i.test(payload)) {
        track("consultation_confirmed", { method: "microsoft_bookings" });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
      <iframe
        title="Book your consultation"
        src={url}
        className="h-[760px] w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}
