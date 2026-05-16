"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Sparkles,
  ShieldCheck,
  Cloud,
  Server,
  Cpu,
  Activity,
  CircleCheckBig,
  Briefcase,
  CalendarCheck2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[700px] bg-hero-glow" />
        <div className="absolute -left-40 top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-navy-600/30 blur-3xl" />
      </div>

      <div className="container-px mx-auto max-w-7xl pt-16 sm:pt-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Career acceleration for IT professionals
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="h-display mt-5"
            >
              <span className="text-navy-950 dark:text-white">Stop applying to </span>
              <span className="gradient-text">hundreds of jobs</span>
              <span className="text-navy-950 dark:text-white"> without hearing back.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            >
              Boasystemz helps IT professionals land interviews and offers faster through
              career strategy, infrastructure mentorship, cloud engineering coaching,
              resume optimization, and real-world interview preparation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/contact" className="btn-primary">
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/upload-resume" className="btn-secondary">
                <Upload className="h-4 w-4" /> Upload resume
              </Link>
              <Link
                href="/onboarding"
                className="btn-ghost !text-navy-700 dark:!text-cyan-300"
              >
                Start your career transformation →
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-10 grid max-w-xl grid-cols-2 gap-3 text-sm"
            >
              {[
                { icon: CircleCheckBig, text: "90% increased interview callbacks" },
                { icon: ShieldCheck, text: "Senior enterprise IT mentors" },
                { icon: Briefcase, text: "Offers from Fortune 500 employers" },
                { icon: CalendarCheck2, text: "Strategy → offer in 60–120 days" },
              ].map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-400/15 text-cyan-600 dark:text-cyan-300">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {text}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["#0ea5e9", "#22d3ee", "#3b82f6", "#06b6d4"].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-navy-950"
                    style={{ background: `linear-gradient(135deg, ${c}, #0b1730)` }}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Trusted by <span className="font-semibold text-navy-900 dark:text-white">500+ engineers</span> working
                at AWS, Microsoft, Google, Cisco, IBM, Capital One, Booz Allen, and more.
              </p>
            </motion.div>
          </div>

          <HeroVisual />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative mx-auto w-full max-w-[560px] rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-2xl shadow-cyan-500/10 backdrop-blur dark:border-white/10 dark:bg-navy-900/70">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[10px] font-medium text-cyan-300">
              boasystemz · career dashboard
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-[11px]">
            {[
              { label: "Applications", value: "147", trend: "+38%", icon: Activity, c: "text-cyan-300" },
              { label: "Interviews", value: "23", trend: "+9", icon: Cpu, c: "text-emerald-300" },
              { label: "Offers", value: "4", trend: "+2", icon: Briefcase, c: "text-amber-300" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div className="flex items-center justify-between text-white/70">
                  <span>{m.label}</span>
                  <m.icon className={`h-3.5 w-3.5 ${m.c}`} />
                </div>
                <div className="mt-2 text-xl font-semibold">{m.value}</div>
                <div className="text-[10px] text-emerald-300">{m.trend} this week</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span>Career velocity</span>
              <span className="text-cyan-300">90 days · accelerating</span>
            </div>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {[18, 24, 22, 30, 28, 34, 40, 46, 52, 58, 64, 72, 80, 88].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                  className="w-full rounded-sm bg-gradient-to-t from-cyan-500/40 to-cyan-300"
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/50">
              <span>Wk 1</span>
              <span>Wk 14</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-cyan-400/15 text-cyan-300">
                <Cloud className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-white">AWS Solutions Arch.</p>
                <p className="text-white/60">Mentorship · 4/12 sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-400/15 text-emerald-300">
                <Server className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-white">VMware vSphere Lab</p>
                <p className="text-white/60">In progress · 67%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute -left-3 top-10 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-navy-900 sm:block"
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
            <CircleCheckBig className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="font-medium text-navy-900 dark:text-white">Offer received</p>
            <p className="text-[11px] text-slate-500">Sr. Cloud Engineer · $182k</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute -right-3 bottom-8 hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-navy-900 sm:block"
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-500/15 text-cyan-500">
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="font-medium text-navy-900 dark:text-white">Resume optimized</p>
            <p className="text-[11px] text-slate-500">ATS score 96 / 100</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
