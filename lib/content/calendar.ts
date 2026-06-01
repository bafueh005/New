// 90-day content calendar — the single source consumed by both the AI content
// engine (scripts/generate-content.ts) and the human-readable
// docs/marketing/content-calendar.md. 13 themed weeks; each post is mapped to a
// channel, format, funnel stage, lead-gen CTA, and target keyword.

export type Channel = "YouTube" | "LinkedIn" | "Instagram" | "Facebook" | "Blog";
export type FunnelStage = "awareness" | "consideration" | "conversion";

export type ContentPost = {
  channel: Channel;
  format: string;
  /** The angle / hook for the piece. */
  hook: string;
  funnelStage: FunnelStage;
  /** The call to action that ties the post to a lead-gen goal. */
  cta: string;
  /** Primary SEO / discovery keyword. */
  keyword: string;
};

export type ContentWeek = {
  week: number;
  /** Monday of the week, ISO date. */
  theme: string;
  posts: ContentPost[];
};

const TOOLKIT_CTA = "Download the free IT Career Toolkit";
const BOOK_CTA = "Book a free 30-minute consultation";
const FOLLOW_CTA = "Follow for daily IT career tips";

export const CONTENT_CALENDAR: ContentWeek[] = [
  {
    week: 1,
    theme: "Why you're not getting interviews (positioning over volume)",
    posts: [
      { channel: "YouTube", format: "Talking-head + screen share, 10-12 min", hook: "I reviewed 50 IT resumes. Here's why 90% never get a callback.", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "why isn't my IT resume getting interviews" },
      { channel: "LinkedIn", format: "Text + carousel", hook: "Applying to 300 jobs isn't a strategy. Here's what hiring managers actually screen for.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "IT job search strategy" },
      { channel: "Instagram", format: "Reel, 30s", hook: "3 resume lines that get IT engineers interviews.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "IT resume tips" },
      { channel: "Blog", format: "Long-form, 1500 words", hook: "The real reason capable engineers don't get interviews (it isn't skills).", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "IT resume not getting interviews" },
    ],
  },
  {
    week: 2,
    theme: "The ATS-proof resume",
    posts: [
      { channel: "YouTube", format: "Screen-share teardown, 12 min", hook: "Build an ATS-proof IT resume live (cloud engineer example).", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "ATS resume for IT" },
      { channel: "LinkedIn", format: "Before/after carousel", hook: "Same engineer, two resumes. One got 0 callbacks, one got 6.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "ATS friendly resume" },
      { channel: "Instagram", format: "Carousel, 5 slides", hook: "5 formatting mistakes killing your ATS score.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "resume ATS mistakes" },
      { channel: "Facebook", format: "Story post", hook: "How a help-desk tech rewrote one bullet and landed a sysadmin interview.", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "sysadmin resume" },
    ],
  },
  {
    week: 3,
    theme: "Writing outcome-driven bullets",
    posts: [
      { channel: "YouTube", format: "Tutorial, 9 min", hook: "Turn 'responsible for' into outcomes recruiters love.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "resume bullet points engineer" },
      { channel: "LinkedIn", format: "Text post", hook: "Every IT bullet should answer: what changed because you were there?", funnelStage: "consideration", cta: BOOK_CTA, keyword: "engineer resume achievements" },
      { channel: "Instagram", format: "Reel, 45s", hook: "Weak bullet vs strong bullet (DevOps edition).", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "devops resume" },
      { channel: "Blog", format: "Long-form, 1400 words", hook: "30 outcome-driven resume bullets for cloud and infra engineers.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "cloud engineer resume examples" },
    ],
  },
  {
    week: 4,
    theme: "LinkedIn that gets you found by recruiters",
    posts: [
      { channel: "YouTube", format: "Walkthrough, 11 min", hook: "Optimize your LinkedIn so recruiters find you (IT roles).", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "LinkedIn for IT professionals" },
      { channel: "LinkedIn", format: "Meta carousel", hook: "Your headline is wasting prime real estate. Fix it in 2 minutes.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "LinkedIn headline engineer" },
      { channel: "Instagram", format: "Reel, 30s", hook: "The LinkedIn 'open to work' mistake.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "linkedin open to work" },
      { channel: "Facebook", format: "Tip post", hook: "3 LinkedIn keywords every cloud engineer should have.", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "linkedin keywords cloud" },
    ],
  },
  {
    week: 5,
    theme: "Cracking the technical interview (mindset + structure)",
    posts: [
      { channel: "YouTube", format: "Talking-head, 13 min", hook: "How IT technical interviews actually run (and how to think out loud).", funnelStage: "consideration", cta: BOOK_CTA, keyword: "IT technical interview tips" },
      { channel: "LinkedIn", format: "Story + lesson", hook: "The candidate who failed on skills they had. Here's what went wrong.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "technical interview preparation" },
      { channel: "Instagram", format: "Carousel", hook: "4 things interviewers want to hear you say.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "interview answers IT" },
      { channel: "Blog", format: "Long-form, 1600 words", hook: "DevOps interview prep: systems design and the live-debug round.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "devops interview questions" },
    ],
  },
  {
    week: 6,
    theme: "Tell me about yourself + behavioral answers",
    posts: [
      { channel: "YouTube", format: "Tutorial + examples, 10 min", hook: "'Tell me about yourself' for IT roles: the Present-Past-Future formula.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "tell me about yourself IT" },
      { channel: "LinkedIn", format: "Framework post", hook: "STAR is fine. Here's the version that actually lands for engineers.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "STAR method engineer" },
      { channel: "Instagram", format: "Reel, 40s", hook: "Never start your interview answer like this.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "interview mistakes" },
      { channel: "Facebook", format: "Live Q&A promo", hook: "Bring your toughest interview question to Friday's live.", funnelStage: "awareness", cta: BOOK_CTA, keyword: "interview coaching" },
    ],
  },
  {
    week: 7,
    theme: "Cloud careers: the roadmap",
    posts: [
      { channel: "YouTube", format: "Roadmap, 14 min", hook: "Zero to senior cloud engineer: skills, certs, and projects by quarter.", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "cloud engineer roadmap" },
      { channel: "LinkedIn", format: "Carousel", hook: "The Azure vs AWS question hiring managers actually care about.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "azure vs aws careers" },
      { channel: "Instagram", format: "Reel, 35s", hook: "The one cloud project that gets you hired.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "cloud projects portfolio" },
      { channel: "Blog", format: "Long-form, 1700 words", hook: "Azure and AWS career tips: what gets cloud resumes past ATS.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "cloud engineer career tips" },
    ],
  },
  {
    week: 8,
    theme: "DevOps & platform engineering",
    posts: [
      { channel: "YouTube", format: "Practical guide, 15 min", hook: "OpenShift & Kubernetes for platform engineers: a working tour.", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "kubernetes platform engineer" },
      { channel: "LinkedIn", format: "Insight post", hook: "Most 'DevOps engineers' are sysadmins with a new title. Here's the gap.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "devops vs sysadmin" },
      { channel: "Instagram", format: "Carousel", hook: "The DevOps toolchain on one slide.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "devops tools" },
      { channel: "Facebook", format: "Story post", hook: "From on-call burnout to platform lead: a mentee's path.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "platform engineer career" },
    ],
  },
  {
    week: 9,
    theme: "Cybersecurity careers",
    posts: [
      { channel: "YouTube", format: "Career map, 12 min", hook: "SOC to security engineer to architect: the real path.", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "cybersecurity career path" },
      { channel: "LinkedIn", format: "Myth-busting post", hook: "The cert traps keeping you stuck in the SOC.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "cybersecurity certifications" },
      { channel: "Instagram", format: "Reel, 30s", hook: "Security skills that actually move you up.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "cybersecurity skills" },
      { channel: "Blog", format: "Long-form, 1500 words", hook: "Cybersecurity career advice from someone who hires.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "cybersecurity career advice" },
    ],
  },
  {
    week: 10,
    theme: "The 90-day applying-to-offer plan",
    posts: [
      { channel: "YouTube", format: "System walkthrough, 13 min", hook: "My 90-day plan to go from applying to offer.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "job search plan IT" },
      { channel: "LinkedIn", format: "Carousel", hook: "Weeks 1-3 fix the resume. Weeks 4-8 interview reps. Here's the full plan.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "90 day job search" },
      { channel: "Instagram", format: "Reel, 45s", hook: "Stop applying to 200 jobs. Do this instead.", funnelStage: "consideration", cta: FOLLOW_CTA, keyword: "targeted job applications" },
      { channel: "Facebook", format: "Story + CTA", hook: "How a mentee went from 6 months of silence to 3 offers in 10 weeks.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "career coaching results" },
    ],
  },
  {
    week: 11,
    theme: "Salary negotiation",
    posts: [
      { channel: "YouTube", format: "Scripts + role-play, 11 min", hook: "Negotiate your IT offer: word-for-word scripts.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "salary negotiation tech" },
      { channel: "LinkedIn", format: "Script post", hook: "The recruiter asks your expected salary. Here's exactly what to say.", funnelStage: "consideration", cta: TOOLKIT_CTA, keyword: "salary expectations question" },
      { channel: "Instagram", format: "Reel, 30s", hook: "Don't leave 15% on the table.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "negotiate salary" },
      { channel: "Blog", format: "Long-form, 1400 words", hook: "Salary negotiation scripts for engineers (recruiter, offer, counter).", funnelStage: "conversion", cta: BOOK_CTA, keyword: "engineer salary negotiation" },
    ],
  },
  {
    week: 12,
    theme: "Breaking in & career changes",
    posts: [
      { channel: "YouTube", format: "Roadmap, 12 min", hook: "How to become a systems engineer in 12 months (from help desk).", funnelStage: "awareness", cta: TOOLKIT_CTA, keyword: "become systems engineer" },
      { channel: "LinkedIn", format: "Story post", hook: "Career-changer at 35. Here's the order that actually works.", funnelStage: "consideration", cta: BOOK_CTA, keyword: "career change to IT" },
      { channel: "Instagram", format: "Carousel", hook: "Help desk to engineer: the 4 skills to build first.", funnelStage: "awareness", cta: FOLLOW_CTA, keyword: "help desk to engineer" },
      { channel: "Facebook", format: "Community prompt", hook: "What's the one thing holding you back from your next IT role?", funnelStage: "awareness", cta: BOOK_CTA, keyword: "IT career help" },
    ],
  },
  {
    week: 13,
    theme: "Proof, momentum, and the ask",
    posts: [
      { channel: "YouTube", format: "Case study, 12 min", hook: "3 engineers, 3 offers: what we changed in 90 days.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "career coaching case study" },
      { channel: "LinkedIn", format: "Results carousel", hook: "The 5 moves that took these engineers from stuck to hired.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "IT career coaching" },
      { channel: "Instagram", format: "Reel, 40s", hook: "Your next role is a strategy game. Here's move one.", funnelStage: "consideration", cta: FOLLOW_CTA, keyword: "land IT job" },
      { channel: "Blog", format: "Long-form, 1500 words", hook: "What actually changes when you stop applying and start strategizing.", funnelStage: "conversion", cta: BOOK_CTA, keyword: "IT job search strategy" },
    ],
  },
];

export function getWeek(week: number): ContentWeek | undefined {
  return CONTENT_CALENDAR.find((w) => w.week === week);
}
