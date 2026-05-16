"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileText,
  TrendingUp,
  Search,
  Wand2,
} from "lucide-react";

const SCORES = [
  { label: "ATS Compatibility", value: 92, hint: "Excellent — parses cleanly across all major systems." },
  { label: "Keyword Match", value: 87, hint: "Matched 27 of 31 target keywords for Sr. Cloud Engineer roles." },
  { label: "Outcome Density", value: 74, hint: "Most bullets describe activity, not outcome. Reframe 6 lines." },
  { label: "Action-Verb Strength", value: 84, hint: "Solid. Replace 'responsible for' (3x) with stronger verbs." },
  { label: "Formatting Cleanliness", value: 96, hint: "Clean structure, consistent spacing, no parsing risks." },
  { label: "Story Coherence", value: 81, hint: "Clear trajectory. Strengthen the 2022→2024 leap with metrics." },
];

const ISSUES = [
  { sev: "high", title: "6 bullets describe what you did, not what changed", fix: "Convert activity-bullets to outcomes: uptime, latency, $ saved, MTTR, etc." },
  { sev: "med", title: "Keyword 'IaC' missing — appears in 78% of target JDs", fix: "Add 'Terraform · IaC' alongside your AWS work in 2023–2024." },
  { sev: "med", title: "LinkedIn headline misaligned with resume target", fix: "Sync headline to 'Sr. Cloud Engineer | Terraform | AWS | Kubernetes'." },
  { sev: "low", title: "Two bullets exceed two lines", fix: "Trim 3rd and 5th bullets in 2022 role for scanability." },
];

export default function AIResumeReviewPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-hero-glow opacity-50" />
      <div className="container-px mx-auto max-w-7xl py-12">
        <Link href="/resources" className="link-muted inline-flex items-center gap-1.5 text-sm">
          <ArrowLeft className="h-4 w-4" /> Resources
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><Sparkles className="h-3 w-3" />AI Resume Review</span>
            <h1 className="h-display mt-3 text-navy-950 dark:text-white">
              Your resume, <span className="gradient-text">diagnosed</span>.
            </h1>
            <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Analysis for <span className="font-semibold text-navy-950 dark:text-white">adaeze_nwosu_resume_v6.pdf</span> · 1 page · target: Sr. Cloud Engineer
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/upload-resume" className="btn-secondary">Re-upload</Link>
            <Link href="/contact" className="btn-primary">Get mentor rewrite <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overall Score</p>
                  <p className="text-3xl font-semibold tracking-tight text-navy-950 dark:text-white">86<span className="text-base text-slate-500"> / 100</span></p>
                </div>
              </div>
              <div className="text-right text-xs">
                <p className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><TrendingUp className="h-3.5 w-3.5" />+12 since last scan</p>
                <p className="text-slate-500">Last analyzed 2 min ago</p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {SCORES.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-xl border border-slate-200 p-4 dark:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-900 dark:text-white">{s.label}</p>
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">{s.value}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{s.hint}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                <Wand2 className="h-3.5 w-3.5" /> Priority fixes
              </div>
              <ul className="mt-4 space-y-3">
                {ISSUES.map((i) => (
                  <li key={i.title} className="rounded-xl border border-slate-200 p-3.5 dark:border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-navy-950 dark:text-white">{i.title}</p>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          i.sev === "high"
                            ? "bg-rose-500/15 text-rose-600 dark:text-rose-300"
                            : i.sev === "med"
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-300"
                            : "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                        }`}
                      >
                        {i.sev}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">{i.fix}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-cyan-500/0 p-6 dark:border-cyan-400/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                <CheckCircle2 className="h-3.5 w-3.5" /> Wins
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>• Bullets quantify production outcomes in 60% of roles</li>
                <li>• ATS-friendly structure with no parsing risks</li>
                <li>• Strong action verbs in the most recent role</li>
                <li>• Certifications and projects positioned correctly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Suggested rewrites</p>
              <h2 className="mt-1 text-xl font-semibold text-navy-950 dark:text-white">Before vs after — three sample bullets</h2>
            </div>
            <Link href="/contact" className="btn-secondary">Apply rewrites with a mentor</Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[
              {
                before: "Responsible for managing the company's AWS environment and supporting various workloads.",
                after: "Owned a 250-account AWS organization across 6 regions; cut idle compute spend by 31% ($410k / yr) via Spot scheduling and right-sizing automation.",
              },
              {
                before: "Worked on Terraform automation for cloud resources.",
                after: "Authored 40+ Terraform modules adopted by 3 engineering teams; eliminated 90% of manual cloud provisioning and reduced new-stand-up time from 5 days to 2 hours.",
              },
              {
                before: "Helped improve security posture across the infrastructure.",
                after: "Drove cross-team migration to SCP guardrails + Splunk SIEM rules; reduced high-severity findings by 64% in two quarters.",
              },
            ].map((c, i) => (
              <div key={i} className="grid gap-3">
                <div className="rounded-xl border border-rose-200/60 bg-rose-50/40 p-4 text-sm text-navy-900 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-100">
                  <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300"><AlertTriangle className="h-3 w-3" /> Before</p>
                  {c.before}
                </div>
                <div className="rounded-xl border border-cyan-300/60 bg-cyan-50/60 p-4 text-sm text-navy-950 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-white">
                  <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-300"><Sparkles className="h-3 w-3" /> After</p>
                  {c.after}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Search className="h-3.5 w-3.5" /> Analysis powered by Boasystemz AI · reviewed by a senior engineer before delivery
          </div>
        </div>
      </div>
    </section>
  );
}
