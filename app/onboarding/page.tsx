"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Cloud,
  ShieldCheck,
  GitBranch,
  Server,
  Network,
  Target,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const STEPS = ["Profile", "Goals", "Skills", "Plan"] as const;

const ROLES = [
  { icon: Cloud, label: "Cloud Engineer" },
  { icon: GitBranch, label: "DevOps / SRE" },
  { icon: ShieldCheck, label: "Cybersecurity" },
  { icon: Server, label: "Systems / VMware" },
  { icon: Network, label: "Network Engineer" },
  { icon: Briefcase, label: "Career Changer" },
];

const TIMEFRAMES = ["30 days", "60 days", "90 days", "6 months"];

const SKILLS = ["AWS", "Azure", "Kubernetes", "Terraform", "Linux", "Windows Server", "VMware", "Active Directory", "Python", "PowerShell", "Argo CD", "Splunk", "Palo Alto", "Cisco"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[2]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  function toggleSkill(s: string) {
    setSelectedSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow opacity-40" />
      <div className="container-px mx-auto max-w-3xl py-16">
        <Link href="/" className="link-muted inline-flex items-center gap-1.5 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="h-display mt-6">
          <span className="text-navy-950 dark:text-white">Let&apos;s build your</span>{" "}
          <span className="gradient-text">90-day plan</span>.
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Four short questions. We&apos;ll generate a personalized roadmap and match you with the right mentor.
        </p>

        <div className="mt-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold ${i <= step ? "bg-cyan-500 text-white" : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400"}`}>
                  {i + 1}
                </span>
                <span className={i <= step ? "text-navy-900 dark:text-white" : ""}>{s}</span>
                {i < STEPS.length - 1 && <span className={`mx-2 h-px w-8 ${i < step ? "bg-cyan-400" : "bg-slate-200 dark:bg-white/10"}`} />}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="p" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Tell us about you</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">A few basics — we&apos;ll keep this private.</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field label="Full name"><input className="input" placeholder="Adaeze Nwosu" /></Field>
                    <Field label="Work email"><input type="email" className="input" placeholder="you@company.com" /></Field>
                    <Field label="Current role"><input className="input" placeholder="Systems Engineer" /></Field>
                    <Field label="Years of experience"><input className="input" placeholder="5" /></Field>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="g" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-xl font-semibold text-navy-950 dark:text-white">What&apos;s your target?</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Pick the role you&apos;re working toward.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {ROLES.map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        onClick={() => setRole(r.label)}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                          role === r.label
                            ? "border-cyan-400 bg-cyan-400/10 text-navy-950 dark:text-white"
                            : "border-slate-200 hover:border-cyan-400/40 dark:border-white/10"
                        }`}
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-cyan-600 text-white">
                          <r.icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold">{r.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Target timeframe</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {TIMEFRAMES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeframe(t)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                            timeframe === t
                              ? "border-cyan-400 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200"
                              : "border-slate-200 text-slate-700 hover:border-cyan-400/40 dark:border-white/10 dark:text-slate-300"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <h2 className="text-xl font-semibold text-navy-950 dark:text-white">What do you already know?</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Pick anything you&apos;ve worked with in the last 12 months.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {SKILLS.map((s) => {
                      const active = selectedSkills.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSkill(s)}
                          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "border-cyan-400 bg-cyan-400/10 text-cyan-700 dark:text-cyan-200"
                              : "border-slate-200 text-slate-700 hover:border-cyan-400/40 dark:border-white/10 dark:text-slate-300"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="plan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                    <Sparkles className="h-3.5 w-3.5" /> Your plan
                  </span>
                  <h2 className="mt-3 text-xl font-semibold text-navy-950 dark:text-white">
                    {role ?? "Engineer"} · {timeframe} accelerator
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    A senior mentor reviewed your inputs and matched you to a plan. You can adjust anytime.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      { t: "Week 1–2", d: "Resume + LinkedIn rebuild · ATS-pass score 90+ target" },
                      { t: "Week 3–5", d: "Skills sprint · labs aligned to your gap areas" },
                      { t: "Week 6–8", d: "Live mock interviews · technical + behavioral + design" },
                      { t: "Week 9+", d: "Targeted application campaign · referral activation · negotiation" },
                    ].map((m) => (
                      <div key={m.t} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                        <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-navy-900 dark:text-white">{m.t}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{m.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    <Link href="/dashboard" className="btn-primary justify-center">Open my dashboard <ArrowRight className="h-4 w-4" /></Link>
                    <Link href="/contact" className="btn-secondary justify-center">Talk to my mentor</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 3 && (
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="btn-secondary disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                  className="btn-primary"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Target className="h-3.5 w-3.5" /> Outcome-focused. Mentor-led. Cancel anytime.
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
