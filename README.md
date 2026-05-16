# Boasystemz — Career Acceleration for IT Professionals

A premium, enterprise-grade marketing + SaaS-mockup website for **Boasystemz** (boasystemz.com), an IT consulting and career acceleration company. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev   # http://localhost:3000
npm run build
npm run start
```

## Stack

- **Next.js 14** App Router, static generation
- **React 18**, **TypeScript** strict
- **Tailwind CSS 3** with custom navy/cyan enterprise palette
- **Framer Motion** for entrance, scroll, and counter animations
- **next-themes** for first-class dark mode
- **lucide-react** icons

## Pages

Marketing
- `/` Home — hero, services, tech stack, how it works, stats, testimonials, about, pricing, CTA
- `/services` All service offerings + tech stack + workflow
- `/about` Company story, values, team
- `/pricing` Six-tier pricing, comparison table, FAQ
- `/contact` Booking form, Calendly-style time slots, contact info, chat link
- `/blog` and `/blog/[slug]` (8 pre-rendered posts)
- `/resources` and `/resources/ai-resume-review` (AI resume review mockup)
- `/legal/privacy`, `/legal/terms`

SaaS app mockups
- `/login`, `/signup` Auth shell with split layout
- `/onboarding` 4-step wizard generating a personalized 90-day plan
- `/upload-resume` Drag-and-drop resume portal with simulated ATS analysis
- `/dashboard` Candidate dashboard: KPIs, pipeline, programs, activity, next session
- `/admin` Internal operations dashboard mockup

## Design system

- **Colors**: navy (50–950), cyan accents, white/black
- **Typography**: Inter (system fallback) with tight tracking on display headings
- **Components**: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.input`, `.eyebrow`, `.gradient-text`, `.card-surface`, `.glass`
- **Motion**: subtle entrance animations, animated counters, hover lifts, glowing accents
- **Dark mode**: default, with `next-themes` toggle in the nav

## Project layout

```
app/                 # Routes (App Router)
components/          # Reusable UI: nav, footer, hero, services, etc.
lib/                 # utils + blog data
public/              # (none — favicons emitted from app/icon.svg)
```

## Notes

- All forms are client-side mocks (resume upload simulates an ATS analysis, contact submits to a success state). Hook real endpoints into `/api/*` route handlers when integrating.
- Calendly integration is represented by a time-slot picker; replace with the Calendly inline embed when ready.
- The AI resume review uses static data — the structure is ready to bind to a real model output.
