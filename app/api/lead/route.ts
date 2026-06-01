import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { getLeadMagnet } from "@/lib/content/lead-magnets";
import { welcomeEmail, leadMagnetEmail } from "@/lib/email/templates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://boasystemz.com";

type LeadBody = {
  email?: string;
  firstName?: string;
  /** Lead-magnet id, if this capture is for a gated resource. */
  magnet?: string;
  /** Capture location, e.g. "blog-footer", "toolkit-page". */
  source?: string;
  /** UTM params forwarded from the client for attribution. */
  utm?: Record<string, string>;
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const firstName = body.firstName?.trim() || undefined;

  const magnet = body.magnet ? getLeadMagnet(body.magnet) : undefined;
  const source = body.source?.trim() || magnet?.id || "newsletter";

  const autoresponder = magnet
    ? leadMagnetEmail(magnet.title, `${SITE_URL}${magnet.resourcePath}`, firstName)
    : welcomeEmail(firstName);

  const utmProps = Object.fromEntries(
    Object.entries(body.utm ?? {}).map(([k, v]) => [`utm_${k}`, String(v)]),
  );

  const { ok } = await createLead({
    email,
    firstName,
    source,
    autoresponder,
    hubspotProperties: {
      ...(magnet ? { lead_magnet: magnet.title } : {}),
      ...utmProps,
    },
    notifyFields: magnet ? { Magnet: magnet.title } : {},
  });

  // ok is false only when both CRM and email are unconfigured/failed. Still
  // return success to the visitor — we logged the failure server-side and don't
  // want to surface infra issues to them.
  if (!ok) {
    console.warn("Lead captured but no integration succeeded:", email);
  }

  return NextResponse.json({ ok: true });
}
