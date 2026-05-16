"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Cloud,
  FileText,
  GitBranch,
  GraduationCap,
  LayoutDashboard,
  Mic,
  Search,
  Server,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const KPIS = [
  { label: "Applications", value: 147, delta: "+38% wk", icon: Search, color: "text-cyan-500" },
  { label: "Interviews", value: 23, delta: "+9 wk", icon: Mic, color: "text-emerald-500" },
  { label: "Offers", value: 4, delta: "+2 wk", icon: Briefcase, color: "text-amber-500" },
  { label: "Resume score", value: 96, suffix: "/100", delta: "+8 since rewrite", icon: FileText, color: "text-violet-500" },
];

const PROGRAMS = [
  { icon: Cloud, name: "AWS Solutions Architect", progress: 33, label: "4 / 12 sessions" },
  { icon: Server, name: "VMware vSphere Lab", progress: 67, label: "Lab 4 of 6" },
  { icon: GitBranch, name: "DevOps Accelerator", progress: 50, label: "Sprint 6 of 12" },
];

const ACTIVITY = [
  { icon: CheckCircle2, color: "bg-emerald-500/15 text-emerald-500", title: "Mock interview completed", meta: "System design · Senior Cloud · 87/100", time: "2h ago" },
  { icon: FileText, color: "bg-cyan-500/15 text-cyan-500", title: "Resume v6 reviewed", meta: "Mentor: Bon O. · 4 suggested edits", time: "Today" },
  { icon: Calendar, color: "bg-violet-500/15 text-violet-500", title: "Mentor session booked", meta: "Tomi K. · Thu 3:00 PM PT", time: "Yesterday" },
  { icon: Sparkles, color: "bg-amber-500/15 text-amber-500", title: "AI resume rescan", meta: "ATS score: 96 (+3)", time: "2d ago" },
  { icon: Target, color: "bg-rose-500/15 text-rose-500", title: "12 targeted applications submitted", meta: "Cloud / Platform Engineer roles", time: "3d ago" },
];

const APPS = [
  { co: "Capital One", role: "Sr. Cloud Engineer", stage: "Onsite scheduled", status: "active", date: "May 21" },
  { co: "Microsoft", role: "Cloud Solution Architect", stage: "Tech screen 2/3", status: "active", date: "May 19" },
  { co: "Lockheed Martin", role: "VMware Engineer III", stage: "Recruiter call", status: "active", date: "May 17" },
  { co: "AWS", role: "DevOps Engineer", stage: "Offer pending", status: "offer", date: "May 15" },
  { co: "Cisco", role: "Platform Engineer", stage: "Rejected — under-leveled", status: "closed", date: "May 12" },
];

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Briefcase, label: "Applications" },
  { icon: Mic, label: "Interviews" },
  { icon: GraduationCap, label: "Mentorship" },
  { icon: FileText, label: "Resume" },
  { icon: Users, label: "Mentors" },
  { icon: Calendar, label: "Calendar" },
];

export default function DashboardPage() {
  return (
    <section className="bg-slate-50 dark:bg-navy-950">
      <div className="container-px mx-auto max-w-7xl py-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Workspace</p>
              <nav className="mt-2 space-y-1">
                {NAV.map((n) => (
                  <button key={n.label} className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${n.active ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-200" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"}`}>
                    <n.icon className="h-4 w-4" /> {n.label}
                  </button>
                ))}
              </nav>
              <div className="mt-4 rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-cyan-500/0 p-4">
                <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Premium · Active</p>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">Career Transformation · Day 41 of 90</p>
                <div className="mt-2 h-1.5 rounded-full bg-white/40 dark:bg-white/10">
                  <div className="h-full w-[45%] rounded-full bg-cyan-400" />
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <header className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">Candidate dashboard</p>
                <h1 className="mt-1 text-2xl font-semibold text-navy-950 dark:text-white">Good morning, Adaeze.</h1>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">You&apos;re on track. 2 interviews this week, 1 offer pending decision.</p>
              </div>
              <div className="flex gap-2">
                <Link href="/upload-resume" className="btn-secondary">Update resume</Link>
                <Link href="/resources/ai-resume-review" className="btn-primary">AI re-scan <Sparkles className="h-4 w-4" /></Link>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {KPIS.map((k, i) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{k.label}</p>
                    <k.icon className={`h-4 w-4 ${k.color}`} />
                  </div>
                  <p className="mt-4 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white">
                    {k.value}
                    {k.suffix && <span className="text-base text-slate-500">{k.suffix}</span>}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="h-3.5 w-3.5" /> {k.delta}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-white">Active pipeline</h2>
                  <button className="text-xs font-semibold text-cyan-600 dark:text-cyan-300">View all</button>
                </div>
                <div className="mt-4 divide-y divide-slate-200 dark:divide-white/10">
                  {APPS.map((a) => (
                    <div key={a.co + a.role} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-navy-950 dark:text-white">{a.role}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{a.co} · {a.date}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          a.status === "offer"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                            : a.status === "closed"
                            ? "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                            : "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300"
                        }`}
                      >
                        {a.stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-white">Programs</h2>
                  <Link href="/services" className="text-xs font-semibold text-cyan-600 dark:text-cyan-300">Add</Link>
                </div>
                <div className="mt-4 space-y-4">
                  {PROGRAMS.map((p) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                            <p.icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-navy-950 dark:text-white">{p.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.label}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{p.progress}%</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-navy-950 dark:text-white">Recent activity</h2>
                  <button className="text-xs font-semibold text-cyan-600 dark:text-cyan-300">View log</button>
                </div>
                <ul className="mt-4 space-y-3">
                  {ACTIVITY.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${a.color}`}>
                        <a.icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-navy-950 dark:text-white">{a.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{a.meta}</p>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-500">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Next session</p>
                <p className="mt-2 text-2xl font-semibold">Mock: System design</p>
                <p className="mt-1 text-sm text-slate-300">With Linh P. · Thu, May 23 · 3:00 PM PT</p>
                <p className="mt-4 text-xs text-slate-400">Prep doc:</p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
                  <li>• Multi-region failover for VMware to AWS</li>
                  <li>• HA design at 99.99% SLA</li>
                  <li>• Cost trade-off analysis</li>
                </ul>
                <div className="mt-5 flex gap-2">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-navy-950 hover:bg-cyan-300">Open prep <ArrowRight className="h-3.5 w-3.5" /></button>
                  <button className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white">Reschedule</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
