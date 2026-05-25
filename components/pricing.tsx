"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

type PricingTier = {
  id: string;
  name: string;
  price: number;
  cadence: string;
  summary: string;
  features: string[];
  cta: string;
  badge?: string;
  highlight?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "consultation",
    name: "Career Consultation",
    price: 0,
    cadence: "30-min session",
    summary: "A focused 30-minute session to diagnose what's blocking you and map your next move. No card required.",
    features: [
      "Career mapping for target roles",
      "Skill-gap analysis",
      "Salary band research",
      "Job application strategy",
      "Action plan & follow-up doc",
    ],
    cta: "Book free consultation",
  },
  {
    id: "resume",
    name: "Resume Review",
    price: 0,
    cadence: "one-time",
    summary: "Senior-engineer rewrite, ATS optimization, recruiter-tested format.",
    features: [
      "60-min strategy call",
      "Full resume rewrite",
      "ATS scoring & keyword tuning",
      "LinkedIn headline + summary",
      "1 round of revisions",
    ],
    cta: "Start with a resume review",
  },
  {
    id: "interview",
    name: "Interview Coaching",
    price: 0,
    cadence: "4 sessions",
    summary: "Live mock interviews with senior IC and hiring-manager feedback.",
    features: [
      "4 × 90-min mock interviews",
      "Technical + behavioral + design",
      "Recorded sessions with notes",
      "Personalized study plan",
      "Salary negotiation coaching",
    ],
    cta: "Start interview prep",
  },
  {
    id: "infrastructure",
    name: "Infrastructure Mentorship",
    price: 0,
    cadence: "ongoing",
    summary: "1:1 mentorship for sysadmin, network, VMware, and platform engineers.",
    features: [
      "Weekly 1:1 mentor sessions",
      "Hands-on labs (vSphere, Linux, AD)",
      "Architecture & troubleshooting",
      "Resume + LinkedIn included",
      "Async support 5 days/wk",
    ],
    cta: "Start mentorship",
  },
  {
    id: "accelerator",
    name: "Cloud & DevOps Accelerator",
    price: 0,
    cadence: "12-week program",
    badge: "Most popular",
    highlight: true,
    summary: "Become an AWS / Azure / Kubernetes engineer in 12 weeks.",
    features: [
      "Weekly 1:1 with cloud mentor",
      "Real labs: Terraform, Argo CD, K8s",
      "8 mock technical interviews",
      "Project portfolio reviews",
      "Job application + referral support",
      "Offer negotiation coaching",
    ],
    cta: "Apply to accelerator",
  },
  {
    id: "transformation",
    name: "Premium Career Transformation",
    price: 0,
    cadence: "end-to-end",
    summary: "Strategy, training, branding, applications, and negotiation — bundled.",
    features: [
      "Dedicated senior mentor",
      "Custom curriculum across cloud, infra, security",
      "Resume, LinkedIn, portfolio rebuild",
      "Targeted application campaign",
      "Unlimited mock interviews",
      "Negotiation + ramp-up support",
      "Offer guarantee*",
    ],
    cta: "Apply now",
  },
];

export function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <section id="pricing" className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="Programs"
          title={<>Programs for every <span className="gradient-text">stage of your career</span>.</>}
          description="Every program is free, mentor-led, and outcome-focused. Start with a single coaching session or go end-to-end — no card required."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PRICING_TIERS.map((t, i) => (
            <motion.div
              key={t.id}
              id={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 ${
                t.highlight
                  ? "border-cyan-400/40 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white shadow-2xl shadow-cyan-500/20"
                  : "border-slate-200 bg-white text-navy-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
              }`}
            >
              {t.highlight && (
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
                  <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
                </div>
              )}
              {t.badge && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-cyan-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
                  <Sparkles className="h-3 w-3" /> {t.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className={`mt-1 text-sm ${t.highlight ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>
                {t.summary}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">
                  {t.price === 0 ? "Free" : `$${t.price.toLocaleString()}`}
                </span>
                <span className={`${t.highlight ? "text-slate-300" : "text-slate-500 dark:text-slate-400"} text-sm`}>
                  {t.cadence}
                </span>
              </div>

              <ul className={`mt-6 space-y-2 text-sm ${t.highlight ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${t.highlight ? "bg-cyan-400/30 text-cyan-200" : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300"}`}>
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Link
                  href={`/contact?program=${t.id}`}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    t.highlight
                      ? "bg-cyan-400 text-navy-950 hover:bg-cyan-300"
                      : "bg-navy-950 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-950 dark:hover:bg-slate-200"
                  }`}
                >
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
            * Offer guarantee available to qualifying engineers in the Premium Career Transformation program. Terms apply.
          </p>
        )}
      </div>
    </section>
  );
}
