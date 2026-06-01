import { Resend } from "resend";

// Single place that talks to Resend. No-ops (and warns) when RESEND_API_KEY is
// unset so callers never crash in unconfigured environments.

const API_KEY = process.env.RESEND_API_KEY;
export const FROM = process.env.CONTACT_FROM || "Boasystemz <onboarding@resend.dev>";
export const TEAM_RECIPIENT = process.env.CONTACT_RECIPIENT || "info@boasystemz.com";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email to", opts.to);
    return false;
  }
  try {
    const resend = new Resend(API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: opts.to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      console.error("Resend error", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend threw", err);
    return false;
  }
}
