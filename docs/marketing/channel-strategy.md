# Channel Strategy

How each channel earns its place in the funnel. All four feed one destination: the website, where the IT Career Toolkit captures the lead and the free consultation converts it.

```
YouTube / Instagram / Facebook / LinkedIn
        │  (authority + tips)
        ▼
   boasystemz.com  ──►  Lead magnet (IT Career Toolkit)  ──►  email nurture
        │                                                        │
        └────────────►  Free 30-min consultation  ◄─────────────┘
                                  │
                                  ▼
                    Resume / coaching / mentorship clients
```

## YouTube — authority engine (top of funnel)
- **Objective:** rank for "how-to" and roadmap searches; build deep trust.
- **Pillars:** career roadmaps (cloud, DevOps, security, network), resume teardowns, interview prep, technical tutorials.
- **Format/cadence:** 1 long video/week (8–15 min). Pin the toolkit link; verbal CTA at the natural midpoint and end.
- **Hook pattern:** specific number + outcome ("I reviewed 50 IT resumes. Here's why 90% never get a callback.").
- **Funnel role:** awareness + consideration. Drives toolkit downloads.

## LinkedIn — conversion engine (mid funnel)
- **Objective:** reach engineers + hiring managers; drive consultations.
- **Pillars:** hiring-manager POV, resume/interview frameworks, client wins, contrarian takes.
- **Format/cadence:** 3–4 posts/week — text posts, carousels, the occasional repurposed YouTube clip.
- **Hook pattern:** strong first line that stands alone in the feed; line breaks for skimmability.
- **Funnel role:** consideration + conversion. Most "book a consult" CTAs live here.

## Instagram — awareness engine (top of funnel)
- **Objective:** reach early-career / career-changers; quick wins.
- **Pillars:** punchy tips, reels, before/after, mini-roadmaps.
- **Format/cadence:** 3–5/week, reel-led; carousels for "5 mistakes" style.
- **Hook pattern:** pattern-interrupt in the first second ("Never start your interview answer like this.").
- **Funnel role:** awareness. CTA: follow + link in bio to the toolkit.

## Facebook — community + nurture (top/mid funnel)
- **Objective:** community, longer stories, Live Q&As.
- **Pillars:** mentee stories, behind-the-scenes, event promotion, discussion prompts.
- **Format/cadence:** 2–3/week + a monthly Live.
- **Funnel role:** awareness + nurture. CTA: toolkit or consult.

## Blog (on-site) — SEO compounding
- **Objective:** rank for the same keywords the YouTube videos target; capture organic search.
- **Format/cadence:** 1 long-form/week (1400–1700 words) mirroring that week's video.
- **Funnel role:** consideration. Every post ends with a toolkit or consult CTA (the `<LeadCapture>` band is already on the blog index).

## Repurposing flow (one theme → all channels)
Each week's theme produces: 1 YouTube video → blog post (same script, expanded) → LinkedIn carousel (key points) → 2–3 IG reels (single tips) → 1 Facebook story/prompt. The AI content engine drafts all of these from one calendar entry (`npm run content:generate -- --week N`).

## Posting rhythm (weekly)
| Day | YouTube | LinkedIn | Instagram | Facebook | Blog |
|---|---|---|---|---|---|
| Mon | | Post | Reel | | Publish |
| Tue | | | Carousel | Story | |
| Wed | Upload | Post | | | |
| Thu | | Post | Reel | Prompt | |
| Fri | | | Reel | Live (monthly) | |

Use UTM tags on every link so analytics attributes the lead (see `setup-guide.md`).
