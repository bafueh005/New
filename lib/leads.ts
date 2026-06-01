// Shared lead pipeline. Every lead (contact form, lead magnet, newsletter)
// flows through createLead, which fans out to the CRM, the lead's autoresponder,
// the team notification, and Slack — in parallel, and without ever throwing, so
// a single failing integration can't break lead capture.

import { upsertContact } from "@/lib/hubspot";
import { sendEmail, TEAM_RECIPIENT } from "@/lib/email/send";
import type { EmailContent } from "@/lib/email/templates";
import { leadNotificationEmail } from "@/lib/email/templates";

export type LeadInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  /** Where the lead came from, e.g. "contact-form" or "it-career-toolkit". */
  source: string;
  /** Extra HubSpot contact properties (must exist in the portal). */
  hubspotProperties?: Record<string, string>;
  /** Extra fields shown in the team notification email. */
  notifyFields?: Record<string, string>;
  /** Email to send the lead (welcome / lead-magnet delivery). */
  autoresponder?: EmailContent;
  /** Whether to email the team. Defaults to true. */
  notifyTeam?: boolean;
};

async function sendToSlack(text: string, fields: Record<string, string>) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        blocks: [
          { type: "header", text: { type: "plain_text", text } },
          {
            type: "section",
            fields: Object.entries(fields).map(([k, v]) => ({
              type: "mrkdwn",
              text: `*${k}*\n${v || "—"}`,
            })),
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Slack webhook threw", err);
  }
}

export async function createLead(input: LeadInput): Promise<{
  ok: boolean;
  contactId: string | null;
}> {
  const notifyFields = {
    Source: input.source,
    ...(input.firstName ? { Name: `${input.firstName} ${input.lastName ?? ""}`.trim() } : {}),
    ...input.notifyFields,
  };

  const [contactId, autoresponderSent] = await Promise.all([
    // CRM
    upsertContact({
      email: input.email,
      firstname: input.firstName,
      lastname: input.lastName,
      properties: {
        lifecyclestage: "lead",
        hs_lead_status: "NEW",
        lead_source: input.source,
        ...input.hubspotProperties,
      },
    }),
    // Autoresponder to the lead
    input.autoresponder
      ? sendEmail({
          to: input.email,
          subject: input.autoresponder.subject,
          html: input.autoresponder.html,
        })
      : Promise.resolve(false),
    // Team notification
    input.notifyTeam === false
      ? Promise.resolve(false)
      : (() => {
          const note = leadNotificationEmail(input.email, input.source, notifyFields);
          return sendEmail({
            to: TEAM_RECIPIENT,
            replyTo: input.email,
            subject: note.subject,
            html: note.html,
          });
        })(),
    // Slack
    sendToSlack(`New lead: ${input.email} (${input.source})`, notifyFields),
  ]);

  return { ok: contactId !== null || autoresponderSent, contactId };
}
