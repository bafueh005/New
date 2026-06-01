# Email Sequences

The copy mirrors `lib/email/templates.ts` (the code that actually sends). Edit the templates to change what goes out; this doc is the plain-English reference.

## Transactional (send immediately)

### Welcome (any lead)
- **Trigger:** any lead captured via the contact form or `/api/lead` (when no specific magnet).
- **Subject:** "Welcome to Boasystemz — let's get you into interviews"
- **Body:** what we do (resume, interviews, mentorship), the core message (strategy not volume), CTA to book a free consultation, invitation to just reply.
- **Code:** `welcomeEmail()`.

### Lead-magnet delivery (toolkit)
- **Trigger:** lead captured for a lead magnet (e.g. the IT Career Toolkit) via `/api/lead`.
- **Subject:** "Your download: The IT Career Toolkit"
- **Body:** deliver the resource link, then a soft CTA to book a free review.
- **Code:** `leadMagnetEmail()`.

### Team notification (internal)
- **Trigger:** every lead. Goes to `CONTACT_RECIPIENT`.
- **Code:** `leadNotificationEmail()`. (The contact form sends its own richer notification.)

## Nurture drip (scheduled)

Sent by the daily Vercel Cron (`/api/cron/nurture`), which reads each lead's `nurture_step` in HubSpot and sends the next email once enough days have passed since capture. Advance is automatic.

| Step | Day | Subject | Goal |
|---|---:|---|---|
| 1 | 2 | The #1 reason IT resumes get rejected (it's not skills) | Educate → upload resume (free scan) |
| 2 | 5 | How to answer "tell me about yourself" for IT roles | Educate → interview coaching |
| 3 | 9 | A 90-day plan from "applying" to "offer" | Frame the system → programs |
| 4 | 14 | Still applying without hearing back? | Direct CTA → book a consultation |

- **Code:** `NURTURE_SEQUENCE` in `lib/email/templates.ts`. Add/edit steps there; the cron picks them up automatically.
- **Cadence:** day offsets are from the contact's HubSpot `createdate`. Change the `day` values to retime.

## Two ways to run the drip
1. **The built-in cron (default in this repo).** Requires `HUBSPOT_TOKEN`, `RESEND_API_KEY`, and a `nurture_step` number property in HubSpot. `CRON_SECRET` protects the endpoint. Schedule is in `vercel.json` (daily 15:00 UTC).
2. **HubSpot native workflows.** If you prefer HubSpot to own the drip, build a workflow off `lifecyclestage = lead` and disable the cron (remove it from `vercel.json`). Use this doc's copy in the workflow emails. Don't run both or leads get double-emailed.

## Deliverability notes
- All mail sends via Resend from your verified `boasystemz.com` domain (`CONTACT_FROM`). Keep SPF/DKIM/DMARC green.
- Keep the unsubscribe path real — the nurture stops automatically once a contact finishes the sequence, but honor manual unsubscribes (set `nurture_step` past the sequence length or change lifecycle stage).
