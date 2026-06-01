# Setup Guide — Activating the Marketing System

The code is built and **env-gated**: every integration is off until you set its environment variable, then it turns on with no code change. This guide is the human checklist for the parts only you can do. Work top to bottom.

> Set env vars in Vercel: `vercel env add <NAME> production` (and `preview`/`development` as needed), then redeploy. For local testing, put non-secret `NEXT_PUBLIC_*` vars in `.env.local`.

## 0. Environment variable reference

| Variable | Feature | Secret? | Where it's used |
|---|---|---|---|
| `RESEND_API_KEY` | All email (already set) | ✅ | `lib/email/send.ts` |
| `CONTACT_FROM` | Sender identity (already set) | | email |
| `CONTACT_RECIPIENT` | Team notifications (already set) | | email |
| `SLACK_WEBHOOK_URL` | Slack lead alerts (optional) | ✅ | `lib/leads.ts` |
| `NEXT_PUBLIC_BOOKING_URL` | Microsoft Bookings embed (consultations) | | contact page |
| `HUBSPOT_TOKEN` | CRM upsert + nurture | ✅ | `lib/hubspot.ts` |
| `CRON_SECRET` | Protects the nurture cron | ✅ | `/api/cron/nurture` |
| `ANTHROPIC_API_KEY` | AI content engine | ✅ | `scripts/generate-content.ts` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp click-to-chat button | | `components/whatsapp-button.tsx` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | | `components/analytics.tsx` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (FB/IG) Pixel | | analytics |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag | | analytics |
| `NEXT_PUBLIC_SITE_URL` | Canonical/base URL (defaults to boasystemz.com) | | SEO + email links |

## 1. HubSpot CRM
1. Create a free HubSpot account.
2. Settings → Integrations → **Private Apps** → Create. Scopes: `crm.objects.contacts.read` + `crm.objects.contacts.write`. Copy the token.
3. `vercel env add HUBSPOT_TOKEN production` → paste.
4. Create custom contact properties (Settings → Properties → Contact):
   - `lead_source` (single-line text)
   - `program_interest` (single-line text)
   - `lead_magnet` (single-line text)
   - `nurture_step` (**number**)
   - `utm_source`, `utm_medium`, `utm_campaign` (single-line text) — optional, for attribution
5. Redeploy. New contact-form and toolkit leads now upsert into HubSpot.

## 2. Nurture drip
- Already scheduled in `vercel.json` (daily 15:00 UTC → `/api/cron/nurture`).
- Set `CRON_SECRET` (`vercel env add CRON_SECRET production`, any long random string). Vercel Cron sends it automatically.
- Needs `HUBSPOT_TOKEN` + `RESEND_API_KEY` (both above) and the `nurture_step` property.
- Prefer HubSpot's own workflows instead? Build one off `lifecyclestage = lead` and delete the cron entry from `vercel.json` so leads aren't double-emailed. See `email-sequences.md`.

## 3. Microsoft Bookings (free consultations)
1. In Microsoft 365, create a Bookings page with a service that has **"Add online meeting" ON** (generates a Teams link per booking).
2. Make the booking page **public**.
3. `vercel env add NEXT_PUBLIC_BOOKING_URL production` → the public page URL. The contact page embeds it after submit.

## 4. WhatsApp click-to-chat
- `vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production` → your number, **digits only with country code, no `+`** (e.g. `12407843133`).
- The floating WhatsApp button appears automatically. No WhatsApp Business *API* needed.
- (Later, if you want automated WhatsApp messaging, that requires Meta Business verification + the WhatsApp Business API + a provider like Twilio — a separate project.)

## 5. Analytics & pixels
- **GA4:** create a property → copy the Measurement ID (`G-XXXXXXX`) → `NEXT_PUBLIC_GA_ID`.
- **Meta Pixel:** Meta Events Manager → create a pixel → copy the ID → `NEXT_PUBLIC_META_PIXEL_ID`. (One pixel covers Facebook + Instagram ads.)
- **LinkedIn Insight Tag:** LinkedIn Campaign Manager → Insight Tag → copy the Partner ID → `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`.
- **Vercel Analytics + Speed Insights:** on automatically once deployed to Vercel (enable Analytics in the Vercel dashboard).
- Conversion events already fire via `lib/analytics.ts`: `lead_submitted`, `whatsapp_click` (and `consultation_booked` is available to wire to the Bookings confirmation). Set these as conversions in GA4 / Meta / LinkedIn to optimize ad spend.

## 6. SEO (verify after deploy)
- `https://boasystemz.com/sitemap.xml` and `/robots.txt` resolve.
- Submit the sitemap in **Google Search Console** (and Bing Webmaster Tools).
- Validate structured data with Google's Rich Results Test.
- Set `NEXT_PUBLIC_SITE_URL` if the canonical domain differs from `boasystemz.com`.

## 7. AI content engine
- `vercel env add ANTHROPIC_API_KEY production` (and add it to your local `.env.local` to run the script locally).
- Generate a week: `npm run content:generate -- --week 1`. Bulk + cheaper: `npm run content:generate -- --all --model sonnet`.
- Drafts land in `content/drafts/` (gitignored). **Review and edit before publishing** — the engine drafts, a human approves.
- Retune the plan by editing `lib/content/calendar.ts`; retune the voice in `lib/content/brand.ts` (keep `docs/marketing/brand-voice.md` in sync).

## 8. Social channels (create + brand — only you can do this)
Create the four accounts and brand them with the specs from `brand-voice.md`. Image specs:

| Channel | Profile image | Banner / cover | Bio source |
|---|---|---|---|
| YouTube | 800×800 | 2560×1440 (safe area 1546×423) | brand-voice.md |
| LinkedIn (Company) | 300×300 | 1128×191 | brand-voice.md |
| Instagram | 320×320 | n/a (use highlights covers) | brand-voice.md |
| Facebook (Page) | 170×170 | 1640×624 | brand-voice.md |

After creating them:
1. Put the **toolkit link** in every bio/link-in-bio (use a UTM, e.g. `?utm_source=instagram&utm_medium=bio`).
2. Update the real channel URLs in `components/json-ld.tsx` (`sameAs` array) so structured data points search engines at your verified profiles.

## 9. UTM convention (so analytics attributes leads)
Tag every off-site link: `?utm_source=<channel>&utm_medium=<type>&utm_campaign=<theme>`
- Example: `https://boasystemz.com/resources/it-career-toolkit?utm_source=youtube&utm_medium=description&utm_campaign=week1-positioning`
- The lead capture forwards UTMs to HubSpot, so you can see which channel/campaign produced each lead.

## What's intentionally NOT built (needs you / external services)
- Creating + branding the social accounts (step 8).
- WhatsApp Business **API** automation (step 4 note).
- Actually publishing posts (the engine drafts; you record/shoot/schedule).
- Paid ad campaigns (the pixels are wired; campaign setup is in each ad platform).

## Quick activation order
1. `HUBSPOT_TOKEN` + custom properties → CRM live.
2. `CRON_SECRET` → nurture live.
3. `NEXT_PUBLIC_BOOKING_URL` → consultations live.
4. `NEXT_PUBLIC_WHATSAPP_NUMBER` → WhatsApp live.
5. GA4 / Meta / LinkedIn IDs → tracking live.
6. `ANTHROPIC_API_KEY` → run `content:generate`.
7. Create/brand channels, set bios + UTMs, update `sameAs`.
8. Submit sitemap to Search Console.
