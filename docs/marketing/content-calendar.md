# 90-Day Content Calendar

Human-readable mirror of `lib/content/calendar.ts` (the machine-readable source the AI engine reads). 13 themed weeks. Generate the actual drafts for any week with:

```bash
npm run content:generate -- --week 3
```

Each week produces one YouTube video + blog post (SEO twin), a LinkedIn post/carousel, 1–2 Instagram reels/carousels, and a Facebook post. Funnel arc: weeks 1–4 establish authority and capture leads (toolkit), 5–9 deepen with technical/role content, 10–13 push conversion (plans, negotiation, proof → consultations).

| Wk | Theme | Lead CTA focus |
|---:|---|---|
| 1 | Why you're not getting interviews (positioning over volume) | Toolkit |
| 2 | The ATS-proof resume | Toolkit |
| 3 | Writing outcome-driven bullets | Toolkit |
| 4 | LinkedIn that gets you found by recruiters | Toolkit |
| 5 | Cracking the technical interview (mindset + structure) | Consult |
| 6 | "Tell me about yourself" + behavioral answers | Toolkit / Consult |
| 7 | Cloud careers: the roadmap | Toolkit |
| 8 | DevOps & platform engineering | Consult |
| 9 | Cybersecurity careers | Toolkit |
| 10 | The 90-day applying-to-offer plan | **Consult** |
| 11 | Salary negotiation | **Consult** |
| 12 | Breaking in & career changes | Toolkit |
| 13 | Proof, momentum, and the ask (case studies) | **Consult** |

## How to run a week
1. `npm run content:generate -- --week N` (needs `ANTHROPIC_API_KEY`). Add `--model sonnet` to cut cost on bulk runs.
2. Review/edit the draft in `content/drafts/week-NN.md`. The AI drafts; a human approves.
3. Record/shoot the YouTube + reels; schedule LinkedIn/IG/FB; publish the blog post (add it to `lib/blog.ts`).
4. Post with UTM-tagged links so leads attribute correctly.

## Per-week detail
Each calendar entry in `lib/content/calendar.ts` carries, per post: `channel`, `format`, `hook`, `funnelStage`, `cta`, and `keyword`. Edit that file to retune the plan; the docs and engine both follow it. Target keywords roll up into `seo-keywords.md`.

## Beyond 90 days
At week 13, either: (a) re-run themes with fresh angles/case studies, (b) add weeks to `CONTENT_CALENDAR`, or (c) let performance data (GA4 + per-channel insights) pick which pillars to double down on. The structure is built to extend — append `ContentWeek` entries and the engine handles the rest.
