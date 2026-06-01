import { NextResponse } from "next/server";
import { getNurtureLeads, setNurtureStep } from "@/lib/hubspot";
import { sendEmail } from "@/lib/email/send";
import { NURTURE_SEQUENCE } from "@/lib/email/templates";

// Daily nurture drip. Scheduled by Vercel Cron (see vercel.json). For each
// lead-stage HubSpot contact, sends the next sequence email whose `day` offset
// has elapsed since the contact was created, then advances `nurture_step`.
//
// Protected by CRON_SECRET: Vercel Cron sends `Authorization: Bearer <secret>`.
// No-ops cleanly when HubSpot/Resend are unconfigured.

export const dynamic = "force-dynamic";

const DAY_MS = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const leads = await getNurtureLeads();
  const now = Date.now();
  let sent = 0;

  for (const lead of leads) {
    if (!lead.email) continue;
    // Already finished the sequence?
    if (lead.nurtureStep >= NURTURE_SEQUENCE.length) continue;

    const daysSince = Math.floor((now - lead.createdAt) / DAY_MS);
    const next = NURTURE_SEQUENCE[lead.nurtureStep];
    if (daysSince < next.day) continue;

    const email = next.build(lead.firstName);
    const ok = await sendEmail({ to: lead.email, subject: email.subject, html: email.html });
    if (ok) {
      await setNurtureStep(lead.id, lead.nurtureStep + 1);
      sent += 1;
    }
  }

  return NextResponse.json({ ok: true, processed: leads.length, sent });
}
