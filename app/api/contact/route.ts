import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createLead } from "@/lib/leads";
import { welcomeEmail } from "@/lib/email/templates";

const RECIPIENT = process.env.CONTACT_RECIPIENT || "info@boasystemz.com";
const FROM = process.env.CONTACT_FROM || "Boasystemz <onboarding@resend.dev>";

type ContactPayload = {
  name?: string;
  email?: string;
  currentRole?: string;
  targetRole?: string;
  program?: string;
  slot?: string;
  message?: string;
  uploadResume?: boolean;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSlackBlocks(payload: Required<ContactPayload>) {
  const fields = [
    ["Email", payload.email],
    ["Program", payload.program || "—"],
    ["Current role", payload.currentRole || "—"],
    ["Target role", payload.targetRole || "—"],
    ["Preferred time", payload.slot || "—"],
    ["Will upload resume", payload.uploadResume ? "Yes" : "No"],
  ];
  return {
    text: `New contact: ${payload.name}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `New contact: ${payload.name}` },
      },
      {
        type: "section",
        fields: fields.map(([label, value]) => ({
          type: "mrkdwn",
          text: `*${label}*\n${value}`,
        })),
      },
      ...(payload.message
        ? [
            {
              type: "section",
              text: { type: "mrkdwn", text: `*Message*\n${payload.message}` },
            },
          ]
        : []),
    ],
  };
}

async function sendSlack(payload: Required<ContactPayload>) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(renderSlackBlocks(payload)),
    });
    if (!res.ok) {
      console.error("Slack webhook failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("Slack webhook threw", err);
  }
}

function renderHtml(payload: Required<ContactPayload>) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Current role", payload.currentRole || "—"],
    ["Target role", payload.targetRole || "—"],
    ["Program", payload.program || "—"],
    ["Preferred time", payload.slot || "—"],
    ["Will upload resume", payload.uploadResume ? "Yes" : "No"],
  ];
  const rowHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(label)}</td><td style="padding:6px 12px;font-size:14px;color:#0f172a;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;"><div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;"><h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">New contact form submission</h2><table style="width:100%;border-collapse:collapse;">${rowHtml}</table><h3 style="margin:20px 0 8px;font-size:14px;color:#0f172a;">Message</h3><p style="margin:0;white-space:pre-wrap;font-size:14px;color:#334155;">${escapeHtml(payload.message || "—")}</p></div></body></html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const payload = {
    name,
    email,
    currentRole: body.currentRole?.trim() ?? "",
    targetRole: body.targetRole?.trim() ?? "",
    program: body.program?.trim() ?? "",
    slot: body.slot?.trim() ?? "",
    message: body.message?.trim() ?? "",
    uploadResume: Boolean(body.uploadResume),
  };

  const resend = new Resend(apiKey);
  const [emailResult] = await Promise.all([
    // Rich, contact-specific notification to the team (keeps the detailed table).
    resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `New contact: ${name}${payload.program ? ` — ${payload.program}` : ""}`,
      html: renderHtml(payload),
    }),
    sendSlack(payload),
    // Push the lead into the CRM and send the visitor a welcome autoresponder.
    // notifyTeam:false because the detailed email above already covers the team.
    createLead({
      email,
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || undefined,
      source: "contact-form",
      autoresponder: welcomeEmail(name.split(" ")[0]),
      notifyTeam: false,
      hubspotProperties: {
        ...(payload.program ? { program_interest: payload.program } : {}),
        ...(payload.currentRole ? { jobtitle: payload.currentRole } : {}),
      },
    }),
  ]);

  if (emailResult.error) {
    console.error("Resend error", emailResult.error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
