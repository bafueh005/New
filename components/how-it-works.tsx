"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  FileText,
  Wrench,
  GraduationCap,
  Mic,
  Send,
  HandCoins,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Career Assessment",
    desc: "Deep dive on goals, target roles, salary band, and gaps. Output: a 90-day plan.",
  },
  {
    icon: FileText,
    title: "Resume & LinkedIn Optimization",
    desc: "Rewrites optimized for ATS, recruiters, and hiring managers — outcomes first.",
  },
  {
    icon: Wrench,
    title: "Technical Skills Evaluation",
    desc: "Real-world scenarios across cloud, infra, networking and security. We find the gaps.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & Hands-on Coaching",
    desc: "1:1 sessions, labs, and structured curriculum tailored to your target roles.",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    desc: "Live mock loops: technical, system design, behavioral. Recorded and reviewed.",
  },
  {
    icon: Send,
    title: "Strategic Job Applications",
    desc: "We pick the right roles, time the applications, and warm up referrals.",
  },
  {
    icon: HandCoins,
    title: "Offer Negotiation & Career Support",
    desc: "Salary negotiation, level calibration, and ramp-up coaching once you start.",
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title={<>A repeatable system for <span className="gradient-text">landing real offers</span>.</>}
          description="Most engineers are guessing. We replace random applications with a structured, mentor-led system that converts effort into interviews and interviews into offers."
        />

        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-7 top-2 bottom-2 hidden w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent lg:left-1/2 lg:-translate-x-1/2 lg:block"
          />

          <ol className="grid gap-4 lg:grid-cols-1">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <StepCard step={i + 1} {...s} alignRight={!!(i % 2)} />
                <StepVisual step={i + 1} />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  desc,
  alignRight,
}: {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  alignRight: boolean;
}) {
  return (
    <div className={`relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] ${alignRight ? "lg:text-right" : ""}`}>
      <div className={`flex items-center gap-3 ${alignRight ? "lg:flex-row-reverse" : ""}`}>
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan-600 text-white shadow-md shadow-cyan-500/20">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
            Step {String(step).padStart(2, "0")}
          </p>
          <h3 className="h-card text-navy-950 dark:text-white">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
    </div>
  );
}

function StepVisual({ step }: { step: number }) {
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-navy-50 via-white to-cyan-50 dark:border-white/10 dark:from-navy-900/60 dark:via-navy-900/40 dark:to-navy-950">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50 dark:opacity-30" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-6xl font-semibold text-cyan-500/30 dark:text-cyan-400/20">
          {String(step).padStart(2, "0")}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
        <span>Phase {step} / 7</span>
        <span>Live mentorship</span>
      </div>
    </div>
  );
}
