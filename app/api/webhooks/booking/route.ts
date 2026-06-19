import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { sendGA4Conversion, sendMetaConversion } from "@/lib/conversions";
import { upsertContact } from "@/lib/hubspot";

// Confirmed-booking webhook. Hit by a Microsoft Bookings integration (Power
// Automate "When an appointment is created" → HTTP POST, or a Graph
// change-notification subscription) when a consultation is actually booked.
//
// On a valid notification it: (1) reports a server-side conversion to GA4 +
// Meta, and (2) marks the lead booked in HubSpot. All steps are env-gated and
// fault-tolerant. The endpoint is inert (401) until BOOKING_WEBHOOK_SECRET is
// set, so it's never an open endpoint.
//
// Auth: send the secret as the `x-webhook-secret` header, a `?token=` query
// param, or (for Graph) as each notification's `clientState`.
//
// Expected Power Automate JSON body (shape it in the flow):
//   { "email": "...", "name": "...", "value": 0, "currency": "USD",
//     "eventId": "<appointment id>" }

export const dynamic = "force-dynamic";

const SECRET = process.env.BOOKING_WEBHOOK_SECRET;

type Body = {
  email?: string;
  customerEmail?: string;
  name?: string;
  customerName?: string;
  value?: number | string;
  currency?: string;
  eventId?: string;
  appointmentId?: string;
  id?: string;
  [k: string]: unknown;
};

function isAuthorized(request: Request, body: Body): boolean {
  if (!SECRET) return false;
  const header = request.headers.get("x-webhook-secret");
  const token = new URL(request.url).searchParams.get("token");
  // Graph change-notification envelope: { value: [{ clientState, ... }] }.
  const graphValue = (body as unknown as { value?: unknown }).value;
  const graphStates = Array.isArray(graphValue)
    ? (graphValue as Array<{ clientState?: string }>).map((v) => v?.clientState)
    : [];
  return header === SECRET || token === SECRET || graphStates.includes(SECRET);
}

// Microsoft Graph subscription validation handshake: echo validationToken as
// plain text, no auth. Graph may send this on GET or POST at subscription time.
function validationResponse(request: Request): NextResponse | null {
  const token = new URL(request.url).searchParams.get("validationToken");
  if (!token) return null;
  return new NextResponse(token, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function GET(request: Request) {
  return validationResponse(request) ?? NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const validation = validationResponse(request);
  if (validation) return validation;

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    body = {};
  }

  if (!isAuthorized(request, body)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = String(body.email ?? body.customerEmail ?? "").trim();
  const name = String(body.name ?? body.customerName ?? "").trim();
  const value = Number(body.value ?? 0) || 0;
  const currency = String(body.currency ?? "USD");
  const eventId = String(body.eventId ?? body.appointmentId ?? body.id ?? crypto.randomUUID());

  // Only a shaped booking payload (Power Automate sends `email`) represents a
  // real confirmed booking. A bare Microsoft Graph change-notification envelope
  // (`{ value: [{ clientState, ... }] }`) carries no booking data and fires for
  // any change — including cancellations and reschedules. Firing a conversion
  // on those would log phantom `consultation_booked` events with no user data
  // and value 0, polluting GA4/Meta. Acknowledge and no-op instead.
  if (!email) {
    return NextResponse.json({ ok: true, skipped: "no booking payload" });
  }

  const conversion = { email, eventId, value, currency };

  const [ga4, meta] = await Promise.all([
    sendGA4Conversion(conversion),
    sendMetaConversion(conversion),
    // Mark the lead as booked in the CRM (best-effort; create the
    // `consultation_booked` boolean/text property in HubSpot first).
    upsertContact({
      email,
      firstname: name ? name.split(" ")[0] : undefined,
      properties: { consultation_booked: "true", hs_lead_status: "CONNECTED" },
    }),
  ]);

  return NextResponse.json({ ok: true, ga4, meta });
}
