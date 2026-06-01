# SEO Keyword Strategy

Topic clusters that align the blog, YouTube, and on-site pages. Each cluster has a pillar page (high-intent, broad) and supporting posts (long-tail). The blog posts in `lib/blog.ts` and the content calendar already target these.

## Why clusters
Google rewards topical authority. Instead of one-off posts, group content into clusters that internally link to a pillar. The pillar targets the broad term; supporting posts target long-tail variants and link up to the pillar.

## Clusters

### 1. IT resume / getting interviews (commercial-intent, highest priority)
- **Pillar:** `/resources/it-career-toolkit` + "Why your IT resume isn't getting interviews"
- Keywords: `IT resume not getting interviews`, `ATS friendly resume`, `ATS resume for IT`, `cloud engineer resume examples`, `sysadmin resume`, `devops resume`, `resume bullet points engineer`
- Maps to calendar weeks 1–3.

### 2. Technical interview prep
- **Pillar:** "IT technical interview prep" / interview-coaching service page
- Keywords: `IT technical interview tips`, `devops interview questions`, `tell me about yourself IT`, `STAR method engineer`, `vmware interview questions`, `system design interview infrastructure`
- Maps to weeks 5–6; service `/services/technical-mock-interviews`.

### 3. Cloud careers
- **Pillar:** "Cloud engineer roadmap"
- Keywords: `cloud engineer roadmap`, `azure vs aws careers`, `cloud engineer career tips`, `cloud projects portfolio`, `how to become a cloud engineer`
- Maps to week 7; programs `/programs`.

### 4. DevOps & platform
- Keywords: `kubernetes platform engineer`, `devops vs sysadmin`, `devops tools`, `terraform career`, `openshift kubernetes guide`
- Maps to week 8.

### 5. Cybersecurity careers
- Keywords: `cybersecurity career path`, `cybersecurity certifications`, `SOC analyst to engineer`, `cybersecurity career advice`
- Maps to week 9.

### 6. Job-search strategy & negotiation
- Keywords: `IT job search strategy`, `90 day job search`, `targeted job applications`, `salary negotiation tech`, `engineer salary negotiation`, `salary expectations question`
- Maps to weeks 10–11.

### 7. Breaking in / career change
- Keywords: `become systems engineer`, `help desk to engineer`, `career change to IT`, `network engineering career roadmap`, `linux administration tutorials`
- Maps to week 12.

## On-page SEO checklist (already wired in code)
- ✅ Per-page `<title>` + meta description (server pages + dynamic `generateMetadata`).
- ✅ Canonical URLs + OpenGraph on dynamic pages.
- ✅ `app/sitemap.ts` (static + blog/program/service slugs) and `app/robots.ts`.
- ✅ JSON-LD: `Organization`, `WebSite`, `Article` (blog), `Service` (services/programs), `FAQPage` (programs).

## Ongoing
- One blog post per calendar week, title = primary keyword, mirrors the YouTube video.
- Internal-link every new post to its cluster pillar and to a relevant service/program page.
- Match YouTube video titles/descriptions to the same keyword so search + video reinforce each other.
- After ~8 weeks, pull Search Console queries and GA4 landing-page data; expand the clusters that are gaining impressions.
