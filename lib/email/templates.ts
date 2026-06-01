// Branded transactional + nurture email templates (Resend-ready HTML).
// Style mirrors the inline-table look used in app/api/contact/route.ts so all
// Boasystemz email shares one visual language. Each builder returns the
// subject + html so callers stay declarative.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://boasystemz.com";
const BRAND = "Boasystemz";
const CYAN = "#0891b2";
const NAVY = "#0f172a";

function button(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block;background:${CYAN};color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:9999px;">${label}</a>`;
}

/** Wraps body content in the standard Boasystemz email shell. */
function shell(bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;padding:24px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
  <div style="background:${NAVY};padding:20px 24px;">
    <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.01em;">Boa<span style="color:#22d3ee;">systemz</span></span>
  </div>
  <div style="padding:24px;color:#334155;font-size:14px;line-height:1.6;">${bodyHtml}</div>
  <div style="padding:16px 24px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;">
    ${BRAND} · Career acceleration for IT professionals<br/>
    <a href="${SITE_URL}" style="color:${CYAN};text-decoration:none;">boasystemz.com</a>
    &nbsp;·&nbsp;<a href="${SITE_URL}/legal/privacy" style="color:#94a3b8;">Privacy</a>
  </div>
</div></body></html>`;
}

export type EmailContent = { subject: string; html: string };

/** Sent immediately after any lead is captured. */
export function welcomeEmail(firstName?: string): EmailContent {
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  return {
    subject: "Welcome to Boasystemz — let's get you into interviews",
    html: shell(`
      <h1 style="margin:0 0 12px;font-size:20px;color:${NAVY};">${hi}</h1>
      <p style="margin:0 0 14px;">Thanks for connecting with Boasystemz. We help IT professionals stop endlessly applying and start landing interviews and offers, through resume optimization, interview coaching, and senior-engineer mentorship.</p>
      <p style="margin:0 0 18px;">The fastest first step is a free 30-minute consultation. We'll diagnose what's blocking your interviews and map the path through it, even if it isn't with us.</p>
      <p style="margin:0 0 22px;">${button("Book your free consultation", `${SITE_URL}/contact`)}</p>
      <p style="margin:0;color:#64748b;">Or just reply to this email with where you are and where you want to go.</p>
    `),
  };
}

/** Delivers the requested lead magnet. */
export function leadMagnetEmail(
  magnetTitle: string,
  resourceUrl: string,
  firstName?: string,
): EmailContent {
  const hi = firstName ? `Hi ${firstName},` : "Hi there,";
  return {
    subject: `Your download: ${magnetTitle}`,
    html: shell(`
      <h1 style="margin:0 0 12px;font-size:20px;color:${NAVY};">${hi}</h1>
      <p style="margin:0 0 14px;">Here's <strong>${magnetTitle}</strong>, as promised. It's the same playbook our mentors use with paying clients.</p>
      <p style="margin:0 0 22px;">${button(`Open ${magnetTitle}`, resourceUrl)}</p>
      <p style="margin:0 0 8px;">Want a senior engineer to apply it to your specific situation? Book a free consultation and we'll review your resume live.</p>
      <p style="margin:14px 0 0;">${button("Book a free review", `${SITE_URL}/contact`)}</p>
    `),
  };
}

/** Internal notification to the team when a new lead arrives. */
export function leadNotificationEmail(
  email: string,
  source: string,
  extra: Record<string, string> = {},
): EmailContent {
  const rows = [["Email", email], ["Source", source], ...Object.entries(extra)]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 10px;color:#64748b;font-size:12px;text-transform:uppercase;">${k}</td><td style="padding:4px 10px;color:${NAVY};font-size:14px;">${v || "—"}</td></tr>`,
    )
    .join("");
  return {
    subject: `New lead: ${email} (${source})`,
    html: shell(
      `<h1 style="margin:0 0 12px;font-size:18px;color:${NAVY};">New lead captured</h1><table style="width:100%;border-collapse:collapse;">${rows}</table>`,
    ),
  };
}

// --- Nurture drip (sent on a schedule by the nurture cron) ----------------

export type NurtureStep = {
  /** Days after capture this step should send. */
  day: number;
  build: (firstName?: string) => EmailContent;
};

export const NURTURE_SEQUENCE: NurtureStep[] = [
  {
    day: 2,
    build: (n) => ({
      subject: "The #1 reason IT resumes get rejected (it's not skills)",
      html: shell(`
        <p style="margin:0 0 14px;">${n ? `Hi ${n},` : "Hi there,"}</p>
        <p style="margin:0 0 14px;">Most strong engineers get filtered out before a human ever reads their resume. The culprit is almost never your skills, it's how the ATS parses your bullets.</p>
        <p style="margin:0 0 14px;">Three quick fixes: lead every bullet with an outcome, mirror the job's exact keywords, and keep formatting parseable (no tables, no columns).</p>
        <p style="margin:0 0 0;">${button("Get your resume scanned free", `${SITE_URL}/upload-resume`)}</p>
      `),
    }),
  },
  {
    day: 5,
    build: (n) => ({
      subject: "How to answer \"tell me about yourself\" for IT roles",
      html: shell(`
        <p style="margin:0 0 14px;">${n ? `Hi ${n},` : "Hi there,"}</p>
        <p style="margin:0 0 14px;">The opening question decides the tone of the whole interview. Use the Present → Past → Future structure: what you do now, the experience that built it, and why this role is the next step.</p>
        <p style="margin:0 0 0;">${button("Practice with a mentor", `${SITE_URL}/services`)}</p>
      `),
    }),
  },
  {
    day: 9,
    build: (n) => ({
      subject: "A 90-day plan from \"applying\" to \"offer\"",
      html: shell(`
        <p style="margin:0 0 14px;">${n ? `Hi ${n},` : "Hi there,"}</p>
        <p style="margin:0 0 14px;">Landing a role is a strategy game, not a numbers game. Our mentees follow a 90-day plan: weeks 1–3 fix the resume and brand, weeks 4–8 targeted applications + interview reps, weeks 9–12 negotiation.</p>
        <p style="margin:0 0 0;">${button("See the programs", `${SITE_URL}/programs`)}</p>
      `),
    }),
  },
  {
    day: 14,
    build: (n) => ({
      subject: "Still applying without hearing back?",
      html: shell(`
        <p style="margin:0 0 14px;">${n ? `Hi ${n},` : "Hi there,"}</p>
        <p style="margin:0 0 14px;">If the last two weeks haven't changed your results, a 30-minute call will. We'll find the single biggest blocker and tell you exactly what to do next.</p>
        <p style="margin:0 0 0;">${button("Book your free consultation", `${SITE_URL}/contact`)}</p>
      `),
    }),
  },
];
