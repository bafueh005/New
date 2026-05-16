"use client";

import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  CalendarCheck2,
  DollarSign,
  ArrowUpRight,
  GraduationCap,
  Activity,
} from "lucide-react";

const KPIS = [
  { label: "Active engineers", value: "284", delta: "+12 wk", icon: Users },
  { label: "Open programs", value: "53", delta: "+6 wk", icon: GraduationCap },
  { label: "Offers logged (30d)", value: "41", delta: "+9", icon: Briefcase },
  { label: "MRR", value: "$184k", delta: "+8.2%", icon: DollarSign },
];

const COHORTS = [
  { name: "Cloud Accelerator · Cohort 14", count: 22, progress: 62 },
  { name: "DevOps Bootcamp · Cohort 9", count: 18, progress: 41 },
  { name: "Cybersecurity Career Lab · Cohort 5", count: 16, progress: 78 },
  { name: "Infrastructure Mentorship · Rolling", count: 34, progress: 50 },
];

const RECENT = [
  { who: "Adaeze N.", action: "Logged offer: $182k Sr. Cloud Engineer · Capital One", time: "1h" },
  { who: "Marcus T.", action: "Completed mock interview · VMware Administrator", time: "3h" },
  { who: "Priya R.", action: "Resume v8 uploaded · ATS 94/100", time: "5h" },
  { who: "Oluwaseun A.", action: "Booked: 4 mentor sessions · Cloud track", time: "Today" },
  { who: "Sandra K.", action: "Closed application loop · 2 offers received", time: "Yesterday" },
];

export default function AdminPage() {
  return (
    <section className="bg-slate-50 dark:bg-navy-950">
      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">Admin · Internal preview</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white">Operations dashboard</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">High-level health for the Boasystemz mentor and engineer workspace.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-primary">New cohort</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{k.label}</p>
                <k.icon className="h-4 w-4 text-cyan-500" />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white">{k.value}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="h-3.5 w-3.5" /> {k.delta}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-navy-950 dark:text-white">Cohorts in flight</h2>
              <button className="text-xs font-semibold text-cyan-600 dark:text-cyan-300">View all</button>
            </div>
            <div className="mt-5 space-y-5">
              {COHORTS.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-navy-950 dark:text-white">{c.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{c.count} engineers</p>
                    </div>
                    <span className="text-xs text-slate-500">{c.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-base font-semibold text-navy-950 dark:text-white">Activity feed</h2>
            <ul className="mt-4 space-y-3">
              {RECENT.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-cyan-500/15 text-cyan-500">
                    <Activity className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-navy-900 dark:text-white"><span className="font-semibold">{r.who}</span> · <span className="text-slate-600 dark:text-slate-400">{r.action}</span></p>
                  </div>
                  <span className="text-[11px] text-slate-500">{r.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-navy-950 dark:text-white">Funnel · last 30 days</h2>
            <span className="text-xs text-slate-500"><CalendarCheck2 className="mr-1 inline h-3.5 w-3.5" />Apr 16 – May 16</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {[
              { stage: "Leads", value: "1,284", note: "Site, blog, referrals" },
              { stage: "Free Consults", value: "342", note: "30-min calls" },
              { stage: "Conversions", value: "73", note: "Started a program" },
              { stage: "Active", value: "284", note: "All programs combined" },
              { stage: "Offers", value: "41", note: "Logged this month" },
            ].map((f, i) => (
              <div key={f.stage} className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stage {i + 1}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-navy-950 dark:text-white">{f.value}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.stage} · {f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
