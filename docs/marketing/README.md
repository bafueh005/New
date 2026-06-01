# Boasystemz Marketing System

An end-to-end lead-generation + content system: a website lead funnel, HubSpot CRM + email automation, WhatsApp, analytics/pixels, SEO, and an AI content engine — plus the strategy to run it.

## Start here
1. **[setup-guide.md](./setup-guide.md)** — the activation checklist (env vars, accounts, what only you can do). **Read this first.**
2. **[brand-voice.md](./brand-voice.md)** — positioning, personas, voice, visual identity, channel bios.
3. **[channel-strategy.md](./channel-strategy.md)** — per-channel objective, formats, cadence, funnel role.
4. **[content-calendar.md](./content-calendar.md)** — the 90-day plan + how to generate drafts.
5. **[seo-keywords.md](./seo-keywords.md)** — keyword clusters and on-page SEO status.
6. **[email-sequences.md](./email-sequences.md)** — welcome + 4-step nurture drip.

## Where the code lives
| Capability | Code |
|---|---|
| Shared lead pipeline | `lib/leads.ts` |
| HubSpot CRM | `lib/hubspot.ts` |
| Email (send + templates) | `lib/email/` |
| Lead capture API | `app/api/lead/route.ts` |
| Lead magnet UI | `components/lead-capture.tsx`, `app/resources/it-career-toolkit/` |
| Nurture cron | `app/api/cron/nurture/route.ts`, `vercel.json` |
| Confirmed-booking webhook | `app/api/webhooks/booking/route.ts`, `lib/conversions.ts` |
| WhatsApp button | `components/whatsapp-button.tsx` |
| Analytics + pixels | `components/analytics.tsx`, `lib/analytics.ts` |
| SEO | `app/sitemap.ts`, `app/robots.ts`, `components/json-ld.tsx` |
| AI content engine | `scripts/generate-content.ts`, `lib/content/` |

Everything is env-gated — see [setup-guide.md](./setup-guide.md) §0 for the variable table.
