import type { Metadata } from "next";
import { CheckCircle2, FileText, Target, MessageSquareQuote, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { LeadCapture } from "@/components/lead-capture";
import { getLeadMagnet } from "@/lib/content/lead-magnets";

const MAGNET = getLeadMagnet("it-career-toolkit")!;

export const metadata: Metadata = {
  title: "Free IT Career Toolkit: Resume, Interview & Job-Search Playbook",
  description:
    "Download the free IT Career Toolkit: an ATS-proof resume template, the 40 interview questions IT hiring managers ask, a 90-day applying-to-offer roadmap, and salary negotiation scripts.",
  alternates: { canonical: "/resources/it-career-toolkit" },
  openGraph: {
    title: "The IT Career Toolkit (Free)",
    description:
      "The resume, interview, and job-search playbook our mentors use with paying clients.",
    url: "/resources/it-career-toolkit",
    type: "article",
  },
};

const SECTIONS = [
  {
    icon: FileText,
    title: "ATS-proof resume template",
    body: "A single-column, parseable layout plus 30 outcome-driven bullet examples for cloud, infrastructure, DevOps, and security roles. Lead with the result, mirror the job's keywords, and keep it machine-readable.",
  },
  {
    icon: MessageSquareQuote,
    title: "The 40 questions IT hiring managers actually ask",
    body: "Behavioral, systems-design, and live-debug prompts with the structure interviewers want to hear. Includes the Present → Past → Future framework for \"tell me about yourself.\"",
  },
  {
    icon: Target,
    title: "The 90-day applying-to-offer roadmap",
    body: "Weeks 1–3: fix the resume and brand. Weeks 4–8: targeted applications + interview reps. Weeks 9–12: negotiation. It's a strategy game, not a numbers game.",
  },
  {
    icon: TrendingUp,
    title: "Salary negotiation scripts for engineers",
    body: "Word-for-word scripts for the recruiter screen, the offer call, and the counter — so you don't leave 10–20% on the table.",
  },
];

export default function ToolkitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free toolkit"
        title={<>The <span className="gradient-text">IT Career Toolkit</span>.</>}
        description={MAGNET.pitch}
      />

      <section className="section pt-0">
        <div className="container-px mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            {SECTIONS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-navy-950 dark:text-white">{s.title}</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <LeadCapture
              magnet={MAGNET.id}
              source="toolkit-page"
              heading="Send me the toolkit"
              subcopy="Drop your email and we'll send the editable templates, the question bank, and the 90-day plan."
              cta="Email me the toolkit"
            />
            <ul className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
              {MAGNET.includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
